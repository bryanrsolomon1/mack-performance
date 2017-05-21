(function(){
    "use strict";

    function NavBarCtrl(STATES, $state){

        var self = this;

        self.navigators = navigators();
        self.select = select;
        self.selectedNavigator = calculateSelected();

        function select(navigator) {
            self.selectedNavigator = navigator;
            $state.go(navigator.state);
        }
        
        function navigators(){
            return [
                { name: "home",
                  state: STATES.HOME
                },
                { name: "blog",
                  state: STATES.BLOG
                },
                { name: "login",
                    state: STATES.LOGIN
                }
            ];
        }
        
        function calculateSelected() {
            self.navigators.forEach(function(navigator) {
                if (navigator.state === $state.current.name) {
                    self.selectedNavigator = navigator;
                }
            })
        }
    }

    angular.module('DCX')
           .controller('NavBarCtrl', NavBarCtrl);

})();