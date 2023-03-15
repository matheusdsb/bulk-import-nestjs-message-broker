## Description

Parallel bulk import of data from github users API using NestJS microservice, Typescript and RabbitMQ as Message broker service and save data into a MongoDB database

## Prerequisites

In order to run the application it is necessary to have NodeJS (16+), npm, Docker and docker-compose installed.

## Installing dependencies 

```bash
# install dependencies
$ npm run install

# build dist
$ npm run build
```

## Creating Docker Images

Run `docker-compose up -d` at the root folder to create all containers used in the project. It may take a while to start running the node containers since it is need to install their 
dependencies. In order to check if they are already running, run `docker logs import-service`.

# Executing the Import

After creating and having all docker containers running it will be possible to import the users from Github API to the Mongo Database.

In order to execute the import, make a `POST` request to the following URL: `localhost:4000/import` providing the required fields. You may found more information about by running the import-service in develop mode and opening this URL in the browser: `http://localhost:3000/api`.

