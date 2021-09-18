// Import the aws-sdk and fs packages
const AWS = require("aws-sdk");
const fs = require('fs');

// Modify the AWS config object
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});

// Create the DynamoDB service object
const dynamodb = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

// Read the users.json file and assign to allUsers
console.log("Importing thoughts into DynamoDB. Please wait.");
const allUsers = JSON.parse(fs.readFileSync('./server/seed/users.json', 'utf8'));

// Loop over the allUsers array
allUsers.forEach(user => {
  const params = {
    TableName: "Thoughts",
    Item: {
      "username": user.username,
      "createdAt": user.createdAt,
      "thought": user.thought
    }
  };

  dynamodb.put(params, (err, data) => {
    if (err) {
      console.error("Unable to add thought", user.username, ". Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded:", user.username);
    }
  });
})