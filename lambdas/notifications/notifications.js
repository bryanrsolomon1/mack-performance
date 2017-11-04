var q = require("q");

module.exports.get = (event) => {

    var deferred = q.defer();
    
    var user = event.requestContext.authorizer;
    
    var notifications = [];
    
    /* notify the user that they should fill out the intake form */
    if (user.userStatus === "INTAKE") {
        notifications.push({
            title: "New Client Intake Form",
            content: "Complete the new client intake form to get started on a training plan",
            actions: []
        }); 
    }
    
    return deferred.promise;
}

function buildSuccessResponse(items) {
    return {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: JSON.stringify(items)
    };
}

function buildClientSideErrorResponse(errorMessage, statusCode) {
    statusCode = statusCode | 400;
    return {
        statusCode: statusCode,
        headers: {"Access-Control-Allow-Origin": "*"},
        body: errorMessage
    }
}