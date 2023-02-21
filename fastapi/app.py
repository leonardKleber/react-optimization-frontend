import json
from fastapi import FastAPI


UID_LIST = ['abcd1']


app = FastAPI()


@app.get('/')
def index():
    return {'status': 200}


# *********************************************************************
#
# ALL METHODS FOR THE SETTINGS VIEW
#
# check_uid()
# - Checks if there is a settings form for a given uid.
#
# provide_settings_form()
# - Recieves a UID sting from the frontend.
# - Sends a JSON file with the parameter settings form for the 
#   optimization process to the front end.
#
# get_optimization_parameters()
# - Recieves the users chosen parameters from the parameter settings 
#   form from the backend.
# - Sends a confirmation response, that data could be read.
#  
# *********************************************************************
@app.post('/check_uid')
def check_uid(uid: str):
    if uid in UID_LIST:
        return {
            'status': 200,
            'data': True
        }
    else:
        return {
            'status': 200,
            'data': False
        }


@app.post('/provide_settings_form')
def provide_settings_form(uid: str):
    # TODO: This code assumes that the ID is always the example UID.
    settings = json.load(open('./examples/example_settings.json', 'r'))
    return {
        'status': 200,
        'data': settings
    }


@app.post('/get_optimization_parameters')
def get_optimization_parameters(values: dict):
    # TODO: Store or process the parameters for the optimization.
    return {'status': 200}