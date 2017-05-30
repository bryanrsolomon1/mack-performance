var AWS = require("aws-sdk");
var uuid = require("uuid");

exports.handler = (event, context, callback) => {

    var newUser = JSON.parse(event.newUser);
    
    var docClient = new AWS.DynamoDB.DocumentClient();
    
    var queryParams = {
        TableName : "Client",
        IndexName : "email-index",
        KeyConditionExpression: "#email = :email",
        ExpressionAttributeNames:{
            "#email" : "email"
        },
        ExpressionAttributeValues: {
            ":email" : newUser.email
        }
    };

    docClient.query(queryParams, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
            callback(new Error("Could not save user"));
        } else {
            if (data.Items.length > 0) {
                callback(new Error("A user already exists with that email address"));
            } else {
                var saveParams = {
                    TableName: "Client",
                    Item:{
                        "id": uuid.v1(),
                        "firstName": newUser.firstName,
                        "lastName": newUser.lastName,
                        "email": newUser.email
                    }
                };
    
                docClient.put(saveParams, function(err, data) {
                    if (err) {
                        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
                    } else {
                        callback(null, JSON.stringify(data, null, 2));
                    }
                });
            }
        }
    });
};