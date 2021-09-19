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

// GET thoughts from users
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

// GET thoughts from a user
router.get('/users/:username', (req, res) => {
  console.log(`Querying for thought(s) from ${req.params.username}.`);
  const params = {
    TableName: table,
    // determines which attributes to return
    ProjectionExpression: "#th, #ca",
    // specifies the search criteria
    KeyConditionExpression: "#un = :user",
    // define aliases for attribute names
    ExpressionAttributeNames: {
      "#un": "username",
      "#ca": "createdAt",
      "#th": "thought"
    },
    // define aliases for attribute values
    ExpressionAttributeValues: {
      ":user": req.params.username
    }
  };
  // Retrieve user's thoughts from the db
  dynamodb.query(params, (err, data) => {
    if (err) {
      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    } else {
      console.log("Query succeeded.");
      res.json(data.Items)
    }
  });
});

// Create new user
router.post('/users', (req, res) => {
  const params = {
    TableName: table,
    Item: {
      "username": req.body.username,
      "createdAt": Date.now(),
      "thought": req.body.thought
    }
  };
  // Add user to db
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      res.status(500).json(err);
    } else {
      console.log("Added item:", JSON.stringify(data, null, 2));
      res.json({ "Added": JSON.stringify(data, null, 2) });
    }
  });
});

module.exports = router;