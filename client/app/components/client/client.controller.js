(function() {
    
    function ClientCtrl($state, STATES) {
        var self = this;
        
        self.menuItems = menuItems();
        
        self.selectMenuItem = selectMenuItem;
        
        function selectMenuItem(menuItem) {
            self.selectedMenuItem = menuItem;
            $state.go(menuItem.state);
        }
        
        selectMenuItem(self.menuItems[0]);
        
        function menuItems() {
            return [
                {
                    name: "Overview",
                    state: STATES.CLIENT.OVERVIEW
                },
                {
                    name: "Calendar",
                    state: STATES.CLIENT.CALENDAR
                },
                {
                    name: "Training Plan",
                    state: STATES.CLIENT.TRAINING_PLAN
                },
                {
                    name: "Meal Plan",
                    state: STATES.CLIENT.MEAL_PLAN
                }
            ];
        }
    }
    
    angular.module("mack").controller("ClientCtrl", ClientCtrl);
    
})();