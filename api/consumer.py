from visualization import data2elastic
from pyspark.sql.types import StringType, StructType, StructField, ArrayType
from pyspark.sql.functions import from_json, udf
from pyspark.sql import SparkSession
from nltk.sentiment import SentimentIntensityAnalyzer
import json
from datetime import datetime
import nltk
nltk.download('vader_lexicon')


KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'

JSON_SCHEMA = StructType([
    StructField("date", StringType()),
    StructField("user", StringType()),
    StructField("text", StringType()),
    StructField("tags", ArrayType(StringType())),
])


def sentiment(tweet):
    print(tweet)
    if not tweet:
        return '{}'
    scores = dict([('pos', 0), ('neu', 0), ('neg', 0), ('compound', 0)])
    sid = SentimentIntensityAnalyzer()
    ss = sid.polarity_scores(tweet)
    for k in sorted(ss):
        scores[k] += ss[k]

    return json.dumps(scores)


def emotion(field):
    e = 'positive'
    scores = json.loads(field)
    max_val = max(abs(scores['pos']), abs(scores['neg']), abs(scores['neu']))
    if max_val == abs(scores['neg']):
        e = 'negative'
    elif max_val == abs(scores['neu']):
        e = 'neutral'

    return e


def process(df, id):
    results = df.toJSON().map(lambda j: json.loads(j)).collect()
    for result in results:
        result["date"] = datetime.strptime(result["date"], "%Y-%m-%d %H:%M:%S")
        result["sentiment"] = json.loads(result["sentiment"])
    data2elastic(results, "twitter-stream", "doc")


if __name__ == '__main__':
    spark = SparkSession.builder.appName("TwitterSparkStreaming").getOrCreate()
    # .config(
    # "spark.driver.host", "172.20.50.98").config("spark.driver.bindAddress", "172.20.50.98")
    spark.sparkContext.setLogLevel("ERROR")

    print("kafka consumer start...")

    raw_df = spark \
        .readStream \
        .format("kafka") \
        .option("kafka.bootstrap.servers", "localhost:9092") \
        .option("subscribe", "twitter-stream").load()

    # convert raw_df value column using json formatter to convert into json struct
    json_df = raw_df.select(
        from_json(raw_df.value.cast('string'), JSON_SCHEMA).alias('json'))

    # flatten the json_df's columns for further processing
    json_flatten_df = json_df.selectExpr(
        'json.date', 'json.user', 'json.text', 'json.tags')

    # filter out retweets
    filtered_df = json_flatten_df.filter("text not like 'RT @%'")

    # create a function to extract polarity scores from tweets
    udf_func = udf(lambda x: sentiment(x), returnType=StringType())

    # create a new column by applying the function to each tweet
    res_df = json_flatten_df.withColumn(
        "sentiment", udf_func(json_flatten_df.text))

    # create a function to extra emotion from tweets
    emotion_func = udf(lambda x: emotion(x), returnType=StringType())

    # create a new column to extract the emotion in text
    res_df = res_df.withColumn("emotion", emotion_func(res_df.sentiment))

    # output to console
    console_output = res_df.writeStream.foreachBatch(process).start()

    console_output.awaitTermination()

    spark.stop()
    print("spark streaming stop")
