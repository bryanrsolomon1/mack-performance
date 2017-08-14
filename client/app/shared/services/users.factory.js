(function() {
    "use strict";
    
    function Users($http, API_SERVER, $cacheFactory, $q, ENVIRONMENT, ENVIRONMENT_TYPES) {
        
        var clientCache = $cacheFactory("clients");
        
        return {
            addUser: addUser,
            batchGetUsers: batchGetUsers
        };
        
        function addUser(newUser) {
            return $http({
                 method: "POST",
                 url: API_SERVER + "/user",
                 data: {newUser: angular.toJson(newUser)}
             }).then(function (response) {
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
        
        function batchGetUsers(userEmails) {
            return $http({
                     url: API_SERVER + "/users/" + usersEmail,
                     cache: usersCache
                 }).then(function (response) {
                     return response.data;
                 }, function (err) {
                     console.error(err);
                 });
        }
    }
    
    angular.module("mack").factory("Users", Users);
    
})();