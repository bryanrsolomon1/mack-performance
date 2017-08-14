(function(){
    "use strict";

    function LoginCtrl(Logger, AuthFactory, $state, $stateParams, STATES, Session, GooglePlus, USER_ROLES){
        var logger = new Logger("LoginCtrl");
        var self = this;

        self.submit = submit;
        self.googleLogin = googleLogin;

        /* other states can pass a message to be displayed on this page. Example: when logging out from the navbar
           the message "You have been logged out." gets passed here as a stateParam. See Navbar controller for that
            exact example
         */
        if ($stateParams.alertMessage) {
            self.alertMessage = $stateParams.alertMessage;
        }

        /**
         * Does the actual submission of login form. AuthFactory handles the heavy lifting but error messages are
         * set in the negative promise handler function in case of error.
         */
        function submit(user){
            AuthFactory.login(user.emailAddress, user.password)
                       .then(function(){
                            if (Session.userRole === USER_ROLES.TRAINER) {
                                $state.go(STATES.TRAINER.MAIN);
                            } else if (Session.userRole === USER_ROLES.CLIENT) {
                                $state.go(STATES.CLIENT.MAIN);
                            }
                       }, function(errMessage) {
                           self.alertMessage = errMessage;
                       });
        }
        
        function googleLogin() {
            GooglePlus.login().then(function (authResult) {
                console.log(authResult);
                AuthFactory.authenticateGoogleUser(authResult.id_token)
                GooglePlus.getUser().then(function (user) {
                    console.log(user);
                });
            }, function (err) {
                console.error(err);
            });
        }
        
    }

    angular.module("mack")
           .controller("LoginCtrl", LoginCtrl);

})();