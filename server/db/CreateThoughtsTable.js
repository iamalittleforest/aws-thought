// Import the aws-sdk package
const AWS = require('aws-sdk');

// MOdify the AWS config object
AWS.config.update({
  region: "us-east-2",
  endpoint: "http://localhost:8000"
});