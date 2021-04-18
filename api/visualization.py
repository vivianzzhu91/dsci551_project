from elasticsearch import Elasticsearch, helpers

esclient = Elasticsearch(['localhost:9200'], timeout=30)


def data2elastic(doc, index, dtype):
    cnt = 0
    actions = []
    for row in doc:
        actions.append({
            "_op_type": "index",
            "_index": index,
            "_type": dtype,
            "_source": row
        })

    for ok, response in helpers.streaming_bulk(esclient, actions=actions, index=index,
                                               max_retries=5, raise_on_error=False, raise_on_exception=False):
        if not ok:
            print(response)
        else:
            cnt += 1
    return cnt
