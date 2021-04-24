from tweepy import OAuthHandler
from tweepy import Stream
from kafka import KafkaProducer
from datetime import datetime, timezone
from dateutil.tz import tzlocal

from tweepy.streaming import StreamListener
import json

# toolchains related
ACCESS_TOKEN = '2742496888-fINdHoxVW6UVxDHj14Kvqe8bcBxYFzakysyUAZb'
ACCESS_TOKEN_SECRET = '6TLUo7i7jKBJZbaZHVJHJ89wJhB7OkGICneJLbxLiEIFi'
API_KEY = 'Eq6l9WuEAylcx8suSQrEDXBHH'
API_SECRET = 'HkyPATudXLgcn7LUryVzO38ehfvoGICftU6b28whcaiRMVwCgq'
KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'

# const strings
TAGS = ['#Coronavirus', '#SARSCoV2', '#quarantinelife', '#stayathomechallenge',
        '#canceleverything', '#flattenthecurve', '#lockdown', '#pandemic', 'workfromhome',
        '#frontlineworkers', '#wearamask', 'WearAMask', '#OnlineClasses', '#Onlineclass']


def clean(tweet):
    rawtweet = json.loads(tweet)
    tweet = {'date': datetime.strptime(rawtweet["created_at"], '%a %b %d %H:%M:%S %z %Y')
             .replace(tzinfo=tzlocal()).astimezone(tz=None).strftime('%Y-%m-%d %H:%M:%S'),
             "user": rawtweet["user"]["screen_name"],
             "tags": [hashtag['text'] for hashtag in rawtweet["entities"]["hashtags"]]}
    if "extended_tweet" in rawtweet:
        tweet["text"] = rawtweet["extended_tweet"]["full_text"]
    else:
        tweet["text"] = rawtweet["text"]
    print(tweet)
    return json.dumps(tweet)


class TwitterStreamListener(StreamListener):
    def __init__(self, producer, topic):
        super().__init__()
        self.producer = producer
        self.topic = topic

    def on_data(self, data):
        data = clean(data)
        print(data)
        self.producer.send(self.topic, data.encode('utf-8'))

    def on_error(self, status_code):
        print(status_code)


if __name__ == '__main__':
    auth = OAuthHandler(API_KEY, API_SECRET)
    auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    producer = KafkaProducer(
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS, api_version=(0, 10, 1))
    listener = TwitterStreamListener(producer=producer, topic='twitter-stream')
    stream = Stream(auth=auth, listener=listener)
    stream.filter(track=TAGS, languages=['en'])
