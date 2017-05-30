(function(){
    "use strict";

    function NavBarCtrl($state, Navigator, $scope){

        var self = this;

        self.navigators = Navigator.navigators;
        self.select = select;
        self.selectedNavigator = Navigator.selectedNavigator;

        function select(navigator) {
            $state.go(navigator.state);
        }
        
        $scope.$watch(function() { return Navigator.selectedNavigator; }, function (newValue, oldValue, scope) {
            self.selectedNavigator = newValue;
        });
    }

    angular.module('mack')
           .controller('NavBarCtrl', NavBarCtrl);

})();