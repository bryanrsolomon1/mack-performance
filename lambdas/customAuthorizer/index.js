var jwt = require("jsonwebtoken");

/* this must match what is in the LOGIN lambda function */
var SIGNATURE_SECRET = "white_hat_only";

module.exports.handler = (event, context, callback) => {
    
    var token = event.authorizationToken;
    
    if (!token) {
        console.log("No token could be extracted from the event object");
        callback("Unauthorized");
        return;
    }
    
    token = cleanToken(token);

    /* verify the token */
    jwt.verify(token, SIGNATURE_SECRET, { maxAge: "1 day" }, function(err, decoded) {
        if (err) {
            if (err.name === "TokenExpiredError") {
                console.log("The token expired:", err.expiredAt);
            }
            callback("Unauthorized");
        } else {
            /* the user is valid */
            callback(null, generatePolicy(decoded));
        }
    });
};

function cleanToken(token) {
    var keyPhrase = "Bearer ";
    var startIndex = token.indexOf(keyPhrase);
    if (startIndex !== -1) {
        return token.substring(startIndex + keyPhrase.length);
    }
}

function generatePolicy(decodedToken) {
    var authResponse = {};
    
    authResponse.principalId = "user";
    
    var policyDocument = {};
    policyDocument.Version = '2012-10-17'; // default version
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke'; // default action
    statementOne.Effect = 'Allow';
    statementOne.Resource = "arn:aws:execute-api:us-west-2:679908472422:*";
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
    
    // to be used in the back-end. This essentially deserializes the user like an auth middleware would
    authResponse.context = decodedToken;
    return authResponse;
}