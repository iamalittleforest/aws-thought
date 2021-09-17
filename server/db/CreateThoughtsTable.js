// Import the aws-sdk package
const AWS = require('aws-sdk');

// Modify the AWS config object
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

// Create the DynamoDB service object
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// Create a params object
const params = {
  TableName: "Thoughts",
  KeySchema: [
    // Partition key
    { AttributeName: "username", KeyType: "HASH" },
    // Sort key
    { AttributeName: "createdAt", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [
    // String data type
    { AttributeName: "username", AttributeType: "S" },
    // Number data type
    { AttributeName: "createdAt", AttributeType: "N" }
  ],
  ProvisionedThroughput: {
    // Maximum capacities
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};