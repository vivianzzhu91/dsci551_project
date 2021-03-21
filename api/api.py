import time
import datetime
import requests
import json
from flask import Flask

app = Flask(__name__)
ROOT_URL = 'https://dsci551-6a1f7-default-rtdb.firebaseio.com/project'
DATE_FORMAT = '%Y-%m-%dT%H:%M:%S.%fZ'


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/sentiment_over_time')
def get_sentiment_over_time():
    res = {}
    url = ''.join([ROOT_URL, '/', 'tweets.json'])
    data = requests.get(url=url).json()
    for key, value in data.items():
        for entry in value['data']:
            timestamp = int(
                time.mktime(datetime.datetime.strptime(entry['created_at'], DATE_FORMAT).date().timetuple()))
            sentiment = entry['sentiment']
            if timestamp in res:
                if sentiment in res[timestamp]:
                    res[timestamp][sentiment] += 1
                else:
                    res[timestamp] = {sentiment: 0}
            else:
                res.update({timestamp: {sentiment: 0}})
    return json.dumps(res)


@app.route('/sentiment_by_tags')
def get_sentiment_by_tags():
    pass


@app.route('/tags_over_time')
def get_tags_over_time():
    pass


if __name__ == '__main__':
    app.run()
