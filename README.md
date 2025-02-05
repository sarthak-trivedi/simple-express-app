# Simple express app
This app fetches the API configured in `config.json` and expects this response:
```json
{
  "message": ""
}
```
The response message will then be stored in the MongoDB instance configured in the same `config.json`.

## Installation Guide
- Install NodeJS on your machine
- Install required packages
```sh
npm install
```
- Start the server
```sh
node server.js
```

The server will start listening on port 3000

## Pre-requisites
- MongoDB running on the host configured in `config.json`
- Internet connectivity to fetch the data from the API