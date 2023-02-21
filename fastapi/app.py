import json
from fastapi import FastAPI


app = FastAPI()


@app.get('/')
def index():
    return {'data': 'Optimization API'}


# ---------------------------------------------------------------------
#
# ALL METHODS FOR THE SETTINGS VIEW
#
# send_settings()
# - Recieves a UID sting from the frontend.
# - Sends a JSON file with the parameter settings form for the 
#   optimization process to the front end.
#
# recieve_settings()
# - Recieves the users chosen parameters from the parameter settings 
#   form from the backend.
# - Sends a confirmation response, that data could be read.
#  
# ---------------------------------------------------------------------
@app.post('/send_settings')
def send_settings(uid: str):
    # TODO: Check if there is a form for the UID
    # TODO: This code assumes that the ID is always the example UID.
    if uid == 'abcd1':
        settings = json.load(open('./examples/example_settings.json', 'r'))
        return settings
    else:
        return {'error': 'No preset with this UID can be found.'}


@app.post('/recieve_settings')
def recieve_settings(settings: dict):
    # TODO: Start optimization process with the given values.
    # TODO: Return a success message.
    return settings