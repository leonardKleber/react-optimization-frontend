from fastapi import FastAPI
from pymongo import MongoClient


app = FastAPI()
connectionString = "mongodb://localhost:27023/"
client = MongoClient(connectionString)


@app.get('/')
def index():
    return {}


@app.get('/list_databases')
def list_databases():
    return client.list_database_names()


@app.get('/list_all_results')
def list_all_results():
    db = client.experimentdb
    collection = db.exampleresults
    result = []
    for document in collection.find({}, {'_id': 0}):
        result.append(document)
    return result