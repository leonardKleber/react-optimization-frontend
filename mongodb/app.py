from fastapi import FastAPI
from pymongo import MongoClient


app = FastAPI()
connectionString = "mongodb://localhost:27017"
client = MongoClient(connectionString)


@app.get('/')
def index():
    return {}


@app.get('/list_databases')
def list_databases():
    return client.list_database_names()


@app.get('/list_all_results')
def list_all_results():
    db = client.api_test
    collection = db.results
    db_response = collection.find({}, {'_id': 0})
    results = []
    for i in db_response:
        results = i['data']
    return results