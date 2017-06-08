(function() {
    "use strict";
    
    function Client($http, API_SERVER, $cacheFactory, CACHE_NAMES, $q, ENVIRONMENT, ENVIRONMENT_TYPES) {
        
        var clientCache = $cacheFactory(CACHE_NAMES.CLIENT);
        
        return {
            signUp: signUp
        };
        
        function signUp(newUser) {
            if (ENVIRONMENT === ENVIRONMENT_TYPES.BETA) {
                return $q(function(resolve) {
                    resolve({email: "bsolo@test.com"});
                });
            } else {
                return $http({
                     method: "POST",
                     url: API_SERVER + "/client",
                     data: newUser,
                     cache: clientCache
                 }).then(function (response) {
                     return response.data;
                 }, function (err) {
                     console.error(err);
                 });
            }
        }
    }
    
    angular.module("mack").factory("Client", Client);
    
})();