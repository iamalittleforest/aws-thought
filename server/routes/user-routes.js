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

// Set table value to Thoughts
const table = "Thoughts";

// Retrieve users' thoughts
router.get('/users', (req, res) => {
  const params = {
    TableName: table
  };
  // Scan return all items in the table
  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(data.Items)
    }
  });
})

module.exports = router;