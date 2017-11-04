(function() {
    "use strict";
    
    function PasswordResetCtrl($stateParams, AuthFactory, $state, Session, USER_ROLES, STATES, $mdDialog) {
        var self = this;
                
        // the server requires the token in the POST body
        self.user = {token: $stateParams.token};
        
        self.submit = submit;
        
        function submit(user){
            if (user.password !== self.confirmPassword) {
                self.alertMessage = "The passwords do not match";
            } else {
                AuthFactory.reset(user)
                           .then(function(){
                                var confirm = $mdDialog.confirm()
                                      .title('Password reset successfully!')
                                      .ok('Great');

                                $mdDialog.show(confirm).then(function() {
                                    navigateToHomePage();
                                }, function() {
                                    navigateToHomePage();
                                });
                           }, function(errMessage) {
                               self.alertMessage = errMessage;
                           });
            }
            
            function navigateToHomePage() {
                if (Session.userRole === USER_ROLES.TRAINER) {
                    $state.go(STATES.TRAINER.MAIN);
                } else if (Session.userRole === USER_ROLES.CLIENT) {
                    $state.go(STATES.CLIENT.MAIN);
                }
            }
        }
    }
    
    angular.module("mack").controller("PasswordResetCtrl", PasswordResetCtrl);
    
})();