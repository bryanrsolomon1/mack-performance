(function(){
    "use strict";

    function AuthFactory(API_SERVER, Logger, $http, Session, $q, $cookies, COOKIES){

        var logger = new Logger("AuthFactory");
        
        return {
            login: login,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized,
            reset: reset
        };

        function login(emailAddress, password){
            return $http({
                method: "POST",
                url: API_SERVER + '/login/plain',
                data: {
                    emailAddress: emailAddress,
                    password: password
                }
            })
            .then(function(response){
                configureSessionToken(response);
                
                return response.data;
            }, function(response) {
                return $q.reject(response.data.message);
            });
        }
        
        function reset(passwordObj) {
            return $http({
                method: "POST",
                url: API_SERVER + '/login/reset',
                data: passwordObj
            })
            .then(function(response){
                configureSessionToken(response);
                return response.data;
            }, function(err) {
                return err;
            });
        }
        
        function configureSessionToken(response) {
            if (response.data.token && response.data.user) {
                    $cookies.put(COOKIES.SESSION_TOKEN, response.data.token);
                    /* create a new Session */
                    Session.create(response.data.user);
                    /* configure all requests to the backend to supply the token as a header */
                    $http.defaults.headers.common.Authorization = "Bearer " + response.data.token;
            }
        }

        /** is the user logged in? */
        function isAuthenticated(){
            return !!Session.username;
        }

        /** takes in the route's authorized roles and, using the current session information, determines whether
         * they are authorized to view the page calling this function
         */
        function isAuthorized(authorizedRoles){
            if(!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1;
        }

    }

    angular.module("mack")
           .factory("AuthFactory", AuthFactory);

})();