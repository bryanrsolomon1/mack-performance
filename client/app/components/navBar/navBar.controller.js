(function(){
    "use strict";

    function NavBarCtrl(STATES, Session){

        var self = this;

        self.navigators = navigators();
        self.signup = signup;
        self.selectedNavigator = calculateSelected();

        function navigators(){
            return [
                { name: "home",
                  state: STATES.HOME
                },
                { name: "blog",
                  state: STATES.BLOG
                }
            ];
        }
        
        function calculateSelected() {
            
        }
        
        function signup() {
            
        }
    }

    angular.module('DCX')
           .controller('NavBarCtrl', NavBarCtrl);

})();