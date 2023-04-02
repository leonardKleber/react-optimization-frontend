# MongoDB databse
This folder contains an init file to set up the database for the project and a Dockerfile for the containerization of the database.
Follow the guide at the end of this document to set up the database on your local machine.
The content of the init file is not final. However it does proof all necessary concepts for later integrations.
A basic API to interact with this database can be found in the folder *mongo_db_api*.
## Set up MongoDB in Docker container
### Create the image
```
sudo docker build -t <imagename> .
sudo docker create <imagename>
```
### Run the container
```
sudo docker run --name <containername> -d -p 27023:27017 <imagename>
```
The connection string to connect to API or Compass:
```
mongodb://localhost:27023/
```
### Stop the container
Get the container ID:
```
sudo docker ps
```
Stop the container:
```
sudo docker stop <containerid>
```