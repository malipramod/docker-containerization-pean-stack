# docker-containerization-pean-stack

    Docker Containerization of PEAN (PostgreSQL, Express, AngularJS, NodeJS) Stack and D3js

## Prerequisite steps

1. Navigate to /nodejs-backend/api/db/
2. Import parkinglotdb.sql file in PostgresSQL server
3. Navigate to /nodejs-backend/ and do npm install

## How to Run (Backend Project)

1. Navigate to /nodejs-backend/
2. Run command npm start on terminal

## How to Run (Frontend Project)

1. Navigate to Root Directory
2. Run http-server in terminal (npm i http-server -g <https://www.npmjs.com/package/http-server>)
3. Step 2 will provide setup of IP address, open any of them.
4. Navigate to <http://127.0.0.1:8080/angularjs-frontend/> (Here http://127.0.0.1:8080 is one of IP addresses).

![image](https://user-images.githubusercontent.com/13375870/54083135-df51df80-4345-11e9-90bf-517a2085240e.png)

## Project Structure

    angularjs-frontend                              --- AngularJS Frontend Prject
        HTML,CSS and JavaScript
    data                                            --- JSON file
    nodejs-backend                                  --- NodeJS Backend Project
        api                                         --- ExpressJS api directory
            config                                  --- Configuration (database and app configuration) files
            db                                      --- DB backup
            routes                                  --- Route handlers for express
                controllers                         --- Route controllers
                Helper                              --- Helper methods for Route Controllers
    server.js                                       --- Server file for nodejs
    Dockerfile                                      --- Docker configurations
    package.json                                    --- Node packages

## PostgresSQL Database snapshot

![image](https://user-images.githubusercontent.com/13375870/54083423-137acf80-4349-11e9-9e60-2c4fb17d7fca.png)

## List of NodeJS APIs

    1. Store Data (stores data to PostgresSQL)
        URL: <host>/api/dataService/store
        Payload:
            {
                "table": "shipments_data",
                "data": [
                    {
                        "shipment_id": "11",
                        "source_id": "11",
                        "destination_id": "11",
                        "date": "10-2-2018",
                        "weight": "11",
                        "cost": "11",
                        "new_shipment_id": "11",
                        "new_weight": "11",
                        "new_cost": "1",
                        "total_tls": "1"
                    },
                    {
                        "shipment_id": "11",
                        "source_id": "11",
                        "destination_id": "11",
                        "date": "10-2-2018",
                        "weight": "11",
                        "cost": "11",
                        "new_shipment_id": "11",
                        "new_weight": "11",
                        "new_cost": "1",
                        "total_tls": "1"
                    }
                ]
            }
    2. Get Data
        URL: <host>/api/dataService/getdata
        Payload:
            {
                "table":"shipments_data",
                "fields": [
                    "shipment_id",
                    "source_id",
                    "destination_id",
                    "date",
                    "weight",
                    "cost",
                    "new_shipment_id",
                    "new_weight",
                    "new_cost",
                    "total_tls"
                ]
            }
    3. Store data to Json
        URL: <host>/api/fileService/updateJson
        Body:
        {
            "name": "parking-lot-graph1",
            "children": [
                {
                    "name": "a123",
                    "value": "a123",
                    "children": [
                        {
                            "name": "280",
                            "value": "2",
                            "children": [
                                {
                                    "size": 22000,
                                    "name": "275",
                                    "value": 2
                                },
                                {
                                    "name": "280",
                                    "value": 3,
                                    "size": 16000
                                }
                            ]
                        },
                        {
                            "name": "295",
                            "value": "3",
                            "children": [
                                {
                                    "size": 15000,
                                    "name": "295",
                                    "value": 4
                                }
                            ]
                        },
                        {
                            "name": "290",
                            "value": "4",
                            "children": [
                                {
                                    "size": 44000,
                                    "name": "290",
                                    "value": 5
                                }
                            ]
                        },
                        {
                            "name": "560",
                            "value": "5",
                            "children": [
                                {
                                    "size": 22000,
                                    "name": "275",
                                    "value": 6
                                },
                                {
                                    "name": "275",
                                    "value": 7,
                                    "size": 18000
                                },
                                {
                                    "name": "285",
                                    "value": 8,
                                    "size": 20000
                                }
                            ]
                        },
                        {
                            "name": "250",
                            "value": "1",
                            "children": [
                                {
                                    "size": 25000,
                                    "name": "250",
                                    "value": 1
                                }
                            ]
                        }
                    ]
                }
            ]
        }
Download Postman collection: <https://www.getpostman.com/collections/7fdc668468e403ead60b>
