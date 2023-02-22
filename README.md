# React Optimization Frontend
A React frontend for a Python optimization application backend.

This app is the refactored code of a university software project. It was intended to create a frontend for an already existing optimization application backend written in Python. The original project was a collaboration with @jomino141 and @Aposelix and has been graded with a 1.3 (95%).

The project consists of three views:

| Settings View | Live View | Evaluation View |
| :-: | :-: | :-: |
| Starts and parameterizes the optimization application. | Privides live monitoring of the running optimization process. | Visualizes, analyses and evaluates the results of the optimization process. |

For further information, see the slides of the final presentation provided in the repository.

## Set up FastAPI
### 1. Install requirements
Navigate into the *fastapi* folder and install all requirements with the following command:
```
pip3 install -r requirements.txt
```
### 2. Run the API
Run the API like the following:
```
uvicorn app:app --reload
```

## Set up React
### 1. Install requirements
Navigate into the *react* folder and install all requirements with the following command:
```
npm install
```
### 2. Run React
Run the React app like the following:
```
npm start
```
