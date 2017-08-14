(function() {
    "use strict";

    function ClientsCtrl(Clients, Session, $mdDialog) {
        
        var self = this;
        
        self.menuItems = menuItems();
        
        self.selectClient = selectClient;
        self.deselectClient = deselectClient;
        self.selectMenuItem = selectMenuItem;
        self.addClient = addClient;
        
        downloadClients(Session.trainerId);
        
        function downloadClients(trainerId) {
            Clients.getClients(trainerId).then(function(data) {
                self.clients = data;
            });
        }
        
        selectMenuItem(self.menuItems[0]);
        
        function selectClient(client) {
            self.selectedClient = client;
        }
        
        function deselectClient() {
            self.selectedClient = null;
        }
        
        function selectMenuItem(menuItem) {
            self.selectedMenuItem = menuItem;
        }
        
        function menuItems() {
            return [
                {
                    name: "Training Plan"
                },
                {
                    name: "Meal Plan"
                },
                {
                    name: "Calendar"
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
                downloadClients(Session.trainerId);
            });
        }
    }
    
    angular.module("mack").controller("ClientsCtrl", ClientsCtrl);
    
})();