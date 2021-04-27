from elasticsearch import Elasticsearch, helpers
from datetime import datetime
import pandas as pd
import numpy as np


def unnest_json(df, column_name):
    return pd.concat([df, pd.json_normalize(df[column_name]).add_prefix(f'{column_name}.')], axis=1).drop(column_name,
                                                                                                          axis=1)


esclient = Elasticsearch(['localhost:9200'], timeout=30)
twitter_stream = esclient.search(index='twitter-stream', body={"query": {"match_all": {}}, "size": 10000})
covid = esclient.search(index='covid', body={"query": {"match_all": {}}, "size": 10000})

twitter_df = pd.DataFrame([hit['_source'] for hit in twitter_stream['hits']['hits']])
twitter_df['date'] = twitter_df['date'].apply(lambda x: datetime.strptime(x, "%Y-%m-%dT%H:%M:%S").date())
twitter_df = unnest_json(twitter_df, column_name='sentiment')
twitter_df.drop(columns=['user', 'text', 'sentiment.compound'], inplace=True)
twitter_df = twitter_df.explode(column='tags')
twitter_df.dropna(inplace=True)
twitter_df.reset_index(inplace=True)
twitter_df.drop(columns=['index'], inplace=True)
result_twitter_df = twitter_df.groupby('date').agg(
    {'tags': lambda x: twitter_df.loc[np.argmax(x)]['tags'], 'sentiment.pos': np.mean, 'sentiment.neg': np.mean,
     'sentiment.neu': np.mean,
     'emotion': lambda x: twitter_df.loc[np.argmax(x)]['emotion']})

covid_df = pd.DataFrame([hit['_source'] for hit in covid['hits']['hits']])
covid_df['date'] = covid_df['date'].apply(lambda x: datetime.strptime(x, "%Y-%m-%dT%H:%M:%S").date())
final_df = twitter_df.merge(covid_df, on="date")
final_df.rename(columns={'sentiment.pos': 'sentiment.pos.avg', 'sentiment.neu': 'sentiment.neu.avg',
                         'sentiment.neg': 'sentiment.neg.avg',
                         'tags': 'tags.max', 'emotion': 'emotion.max'}, inplace=True)

actions = []
for idx in final_df.index:
    d = dict(final_df.loc[idx])
    actions.append({
        "_op_type": "index",
        "_index": "merged",
        "_source": d
    })

for ok, response in helpers.streaming_bulk(client=esclient, actions=actions, index='merged',
                                           max_retries=5, raise_on_error=False, raise_on_exception=False):
    if not ok:
        print(response)
