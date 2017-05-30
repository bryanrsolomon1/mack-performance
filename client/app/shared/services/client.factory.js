(function() {
    "use strict";
    
    function Client($http, API_SERVER, $cacheFactory) {
        
        var clientCache = $cacheFactory(CACHE_NAMES.CLIENT);
        
        return {};
        
        function signUp(newUser) {
            return $http({
                 url: API_SERVER + "/client",
                 params: newUser,
                 cache: clientCache
             }).then(function (response) {
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
    }
    
    angular.module("mack").factory("Client", Client);
    
})();