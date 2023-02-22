import json
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


UID_LIST = ['abcd1']


class UID(BaseModel):
    uid: str


class SettingsFormValues(BaseModel):
    values: dict


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins='http://localhost:3000',
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def index():
    return {}


# *********************************************************************
#
# ALL METHODS FOR THE SETTINGS VIEW
#
# provide_settings_form()
# - Checks if there is a settings form for a given uid.
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
@app.post('/provide_settings_form')
def provide_settings_form(uid: UID):
    # TODO: This code assumes that the ID is always the example UID.
    settings = json.load(open('./examples/example_settings.json', 'r'))
    if uid.uid in UID_LIST:
        return {
            'valid': True,
            'settings': settings
        }
    return {
        'valid': False,
        'settings': {}
    }


@app.post('/get_optimization_parameters')
def get_optimization_parameters(values: SettingsFormValues):
    # TODO: Store or process the parameters for the optimization.
    return {}