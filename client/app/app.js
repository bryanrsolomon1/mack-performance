(function(){
    'use strict';

    // Declare app level module which depends on the 3rd party libraries
    angular
        .module('mack', [
            'ui.router',
            'ngMaterial',
            'ngMessages',
            'ngAria',
            'ngIdle',
            'ngAnimate',
            'dndLists'
        ])
        .config(
            function(ENVIRONMENT, ENVIRONMENT_TYPES, $logProvider, LOGIN_TIMEOUT_MIN, LOGOUT_WARNING_SECONDS){

                /** this sets whether $log.debug message should be displayed. We only want to display said messages
                 * in a development environment. Most logs should be debug logs. Logs that you want displayed in
                 * ITG/Production should be .log or .error
                 */
                $logProvider.debugEnabled(ENVIRONMENT === ENVIRONMENT_TYPES.BETA);

                /** this is where we set how long the definition of an idle session is and how long the user has to
                 *  interrupt the countdown to logout sequence. Takes in constants
                 * for their values which are set in /config/local.env.json by the gulp build by gulp-ng-config
                 * 
                 * See ngIdle 3rd party library online for API information
                 */
//                IdleProvider.idle(Number(LOGIN_TIMEOUT_MIN) * 60);
//                IdleProvider.timeout(LOGOUT_WARNING_SECONDS);
                
                /** TODO: can use this libarary to send keepAlive heartbeats to the server. Need to research their
                 * API and develop this logic
                 */
                //KeepaliveProvider.interval(10);

            })
        .run(function($rootScope, $transitions){
            $transitions.onStart({ }, function(trans) {
                var Navigator = trans.injector().get('Navigator');
                trans.promise.finally(Navigator.calculateSelected);
            });
        });
})();