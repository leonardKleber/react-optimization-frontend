import json


EXAMPLE_RESULTS = json.load(
    open('./examples/example_results.json', 'r')
)
EXAMPLE_RESULTS_TIMELINE = json.load(
    open('./examples/example_results_timeline.json', 'r')
)
VALUE_NAMES = [
    'Makespan', 
    'Total tardiness',
    'Penalties',
    'Major setup S1',
    'Major setup S2'
]


def generate_2d_scatter_chart(val1, val2):
    all_values1 = []
    all_values2 = []
    for i in range(len(EXAMPLE_RESULTS)):
        all_values1.append(EXAMPLE_RESULTS[i][0][val1])
        all_values2.append(EXAMPLE_RESULTS[i][0][val2])
    data_points = []
    for i in range(len(all_values1)):
        data_points.append([all_values1[i], all_values2[i]])
    json_string = {
        'series': [
            {
                'name': 'SAMPLE',
                'data': data_points
            }
        ],
        'options': {
            'chart': {
                'height': 350,
                'type': 'scatter',
                'zoom': {
                    'enabled': True,
                    'type': 'xy'
                }
            },
            'xaxis': {
                'tickAmount': 10,
                'title': {
                    'text': VALUE_NAMES[val1]
                }
            },
            'yaxis': {
                'tickAmount': 7,
                'title': {
                    'text': VALUE_NAMES[val2]
                }
            }
        }
    }
    return json_string


def generate_3d_scatter_chart(val1, val2, val3, width):
    all_values1 = []
    all_values2 = []
    all_values3 = []
    object_width = width * 0.5
    object_height = width * 0.4
    for i in range(len(EXAMPLE_RESULTS)):
        all_values1.append(EXAMPLE_RESULTS[i][0][val1])
        all_values2.append(EXAMPLE_RESULTS[i][0][val2])
        all_values3.append(EXAMPLE_RESULTS[i][0][val3])
    json_dict = {
        'x': all_values1,
        'y': all_values2,
        'z': all_values3,
        'mode': 'markers',
        'type': 'scatter3d',
        'marker': {
            'size': 2,
            'opacity': 0.8
        },
        'layout' : {
            'width': object_width,
            'height': object_height,
            'scene' : {
                'xaxis': { 
                    'title': VALUE_NAMES[val1] 
                },
                'yaxis': { 
                    'title': VALUE_NAMES[val2] 
                },
                'zaxis': { 
                    'title': VALUE_NAMES[val3] 
                }
            }
        }
    }
    json_list = [json_dict]
    return json_list


def generate_timeline_chart(value_number, tardiness):
    series = [
        {
            'name': 'Stage 1',
            'data': []
        },
        {
            'name': 'Stage 2',
            'data': []
        },
        {
            'name': 'Stage 3',
            'data': []
        },
        {
            'name': 'Stage 4',
            'data': []
        },
    ]

    displayed_results = 0
    for i in EXAMPLE_RESULTS_TIMELINE:
        if tardiness == True and i[21] == 0:
            continue
        displayed_results = displayed_results + 1
        series[0]['data'].append({
            'x': str(i[0]),
            'y': [i[4], i[5]]
        })
        series[1]['data'].append({
            'x': str(i[0]),
            'y': [i[8], i[9]]
        })
        series[2]['data'].append({
            'x': str(i[0]),
            'y': [i[12], i[13]]
        })
        series[3]['data'].append({
            'x': str(i[0]),
            'y': [i[16], i[17]]
        })
        if displayed_results == value_number:
            break

    options = {
        'chart': {
            'height': 50 * displayed_results + 110,
            'type': 'rangeBar'
        },
        'plotOptions': {
            'bar': {
                'horizontal': True,
                'barHeight': '80%'
            }
        },
        'stroke': {
            'type': 'solid',
            'opacity': 0.6
        },
        'legend': {
            'position': 'top',
            'horizontalAlign': 'left'
        },
        'xaxis': {'tickAmount': 10,'title': {'text': 'time'}},
        'yaxis': {'tickAmount': 7, 'title': {'text': 'ID'}}
    }

    data = {
        'series': series,
        'options': options
    }

    return data