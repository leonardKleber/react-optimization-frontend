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