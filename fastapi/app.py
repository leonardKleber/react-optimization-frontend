import json
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from scripts.chart_generation import *


UID_LIST = ['abcd1']


class UID(BaseModel):
    uid: str


class SettingsFormValues(BaseModel):
    values: dict


class TwoDChartValues(BaseModel):
    value1: int
    value2: int


class ThreeDChartValues(BaseModel):
    value1: int
    value2: int
    value3: int
    width: int


class TimelineValues(BaseModel):
    value_number: int
    tardiness: bool


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
    if uid.uid in UID_LIST:
        # This code assumes that the ID is always the example UID.
        settings = json.load(
            open('./examples/example_settings.json', 'r')
        )
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


# *********************************************************************
#
# ALL METHODS FOR THE EVALUATION VIEW
#
# provide_2d_scatter_chart()
# - Recieves two objective values from 0 - 4 each.
# - Generates JSON to generate a 2D scatter chart in the frontend.
#
# provide_3d_scatter_chart()
# - Recieves three objective values from 0 - 4 each.
# - Generates JSON to generate a 3D scatter chart in the frontend.
#
# provide_timeline_chart()
# - Recieves the number of values to display and weather tardiness
#   should be included.
# - Generates JSON to generate a gant chart in the frontend.
#
# *********************************************************************
@app.post('/provide_2d_scatter_chart')
def provide_2d_scatter_chart(values: TwoDChartValues):
    # TODO: generate chart with the two given values.
    return generate_2d_scatter_chart(
        values.value1, 
        values.value2
    )


@app.post('/provide_3d_scatter_chart')
def provide_3d_scatter_chart(values: ThreeDChartValues):
    # TODO: generate chart with the three given values.
    return generate_3d_scatter_chart(
        values.value1, 
        values.value2, 
        values.value3, 
        values.width
    )


@app.post('/provide_timeline_chart')
def provide_timeline_chart(values: TimelineValues):
    return generate_timeline_chart(
        values.value_number, 
        values.tardiness
    )