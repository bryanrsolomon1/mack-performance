(function(){
    'use strict';

    // Declare app level module which depends on the 3rd party libraries
    angular
        .module('mack', [
            'ui.router',
            'ngMaterial',
            'ngMessages',
            'ngAria',
            'ngAnimate',
            'dndLists',
            'googleplus',
            'ngCookies',
            'ngStorage',
            'ui.calendar',
            'multipleDatePicker'
        ])
        .config(
            function(ENVIRONMENT, ENVIRONMENT_TYPES, $logProvider, GooglePlusProvider, $httpProvider){

                /** this sets whether $log.debug message should be displayed. We only want to display said messages
                 * in a development environment. Most logs should be debug logs. Logs that you want displayed in
                 * ITG/Production should be .log or .error
                 */
                $logProvider.debugEnabled(ENVIRONMENT === ENVIRONMENT_TYPES.BETA);
                
                GooglePlusProvider.init({
                    clientId: '4748194119-k0un4gt3utos3u40vrn2sbnvbbfuppa0.apps.googleusercontent.com',
                    apiKey: 'YOUR_API_KEY'
                });
                
                $httpProvider.interceptors.push(function($q, $state, STATES) {
                    return {
                        'responseError': function(rejection) {
                            if (rejection.status === 401) {
                                $state.go(STATES.LOGIN, {message: "Your session has expired. Please login"});
                                console.log("Login refresh required to call:", rejection.config.url);
                            }
                            return $q.reject(rejection);
                        }
                    };
                });
            })
        .run(function($rootScope, $transitions, $http, $cookies, COOKIES){
            $transitions.onStart({ }, function(trans) {
                var Navigator = trans.injector().get('Navigator');
                trans.promise.finally(Navigator.calculateSelected);
            });
        
            $http.defaults.headers.common.Authorization = "Bearer " + $cookies.get(COOKIES.SESSION_TOKEN);
        });
})();