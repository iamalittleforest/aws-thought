// Import the express package and create routes
const express = require('express');
const router = express.Router();

// Import the aws-sdk package
const AWS = require("aws-sdk");

// Modify the AWS config object
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

// Create the DynamoDB service object
const dynamodb = new AWS.DynamoDB.DocumentClient();
const table = "Thoughts";