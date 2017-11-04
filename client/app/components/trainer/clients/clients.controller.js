(function() {
    "use strict";

    function ClientsCtrl(Users, $mdDialog, STATES, $state) {
        
        var self = this;
        
        self.menuItems = menuItems();
        
        self.selectClient = selectClient;
        self.deselectClient = deselectClient;
        self.selectMenuItem = selectMenuItem;
        self.addClient = addClient;
        
        downloadClients();
        
        function downloadClients() {
            Users.batchGetClients().then(function(data) {
                self.clients = data;
            });
        }
                
        function selectClient(client) {
            self.selectedClient = client;
            selectMenuItem(self.menuItems[0]);
        }
        
        function deselectClient() {
            self.selectedClient = null;
        }
        
        function selectMenuItem(menuItem) {
            self.selectedMenuItem = menuItem;
            $state.go(menuItem.state, {client: self.selectedClient});
        }
        
        function menuItems() {
            return [
                {
                    name: "Training Plan",
                    state: STATES.TRAINER.CLIENTS.TRAINING_PLAN
                },
                {
                    name: "Meal Plan",
                    state: STATES.TRAINER.CLIENTS.MEAL_PLAN
                },
                {
                    name: "Calendar",
                    state: STATES.TRAINER.CLIENTS.CALENDAR
                }
            ];
        }
        
        function addClient() {
            $mdDialog.show(
                {
                    templateUrl: "app/components/trainer/clients/addClientDialog.html",
                    locals: {},
                    bindToController: true,
                    controller: "AddClientCtrl",
                    controllerAs: "Add",
                    clickOutsideToClose: false
                }
            ).then(function() {
                downloadClients();
            });
        }
    }
    
    angular.module("mack").controller("ClientsCtrl", ClientsCtrl);
    
})();