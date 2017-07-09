(function() {
    "use strict";

    function ClientsCtrl(Clients) {
        
        var self = this;
        
        var fakeTrainerId = "1";
        
        self.menuItems = menuItems();
        
        self.selectClient = selectClient;
        self.deselectClient = deselectClient;
        self.selectMenuItem = selectMenuItem;
        
        Clients.getClients(fakeTrainerId).then(function(response) {
            self.clients = response.clients;
        });
        
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
    }
    
    angular.module("mack").controller("ClientsCtrl", ClientsCtrl);
    
})();