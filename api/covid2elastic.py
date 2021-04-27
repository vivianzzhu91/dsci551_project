import pandas as pd
from datetime import datetime
from elasticsearch import Elasticsearch, helpers

columns = ['date', 'total_cases', 'new_cases',
           'total_deaths', 'new_deaths',
           'icu_patients', 'hosp_patients',
           'new_tests', 'total_tests',
           'total_vaccinations', 'new_vaccinations',
           'median_age',
           'cardiovasc_death_rate', 'diabetes_prevalence']

esclient = Elasticsearch(['localhost:9200'], timeout=30)

df = pd.read_csv('data/owid-covid-data.csv')
df = df[df['iso_code'] == 'USA']
df = df[columns]
df.dropna(inplace=True)

actions = []
for idx in df.index:
    d = dict(df.loc[idx])
    d['date'] = datetime.strptime(d['date'], '%Y-%m-%d')
    actions.append({
        "_op_type": "index",
        "_index": "covid",
        "_source": d
    })

for ok, response in helpers.streaming_bulk(client=esclient, actions=actions, index='covid',
                                               max_retries=5, raise_on_error=False, raise_on_exception=False):
    if not ok:
        print(response)
