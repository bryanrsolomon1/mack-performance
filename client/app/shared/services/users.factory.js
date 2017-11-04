(function() {
    "use strict";
    
    function Users($http, API_SERVER, $cacheFactory, $q) {
        
        var usersCache = $cacheFactory("users");
        
        return {
            clearCache: clearCache,
            addUser: addUser,
            batchGetClients: batchGetClients
        };
        
        function clearCache() {
            usersCache.removeAll();
        }
        
        function addUser(newUser) {
            return $http({
                 method: "POST",
                 url: API_SERVER + "/users",
                 data: angular.toJson(newUser)
             }).then(function (response) {
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
        
        function batchGetClients() {
            return $http({
                url: API_SERVER + "/users",
                cache: usersCache
             }).then(function (response) {
                 return response.data;
             }, function (err) {
                 console.error("Users factory:\n", err);
             });
        }
    }
    
    angular.module("mack").factory("Users", Users);
    
})();