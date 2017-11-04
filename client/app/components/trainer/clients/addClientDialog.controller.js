(function() {
    
    function AddClientCtrl($mdDialog, Users, TIMEZONES, Timezones) {
                        
        var self = this;
        
        self.client = {};
        
        self.cancel = cancel;
        self.validClient = validClient;
        self.save = save;
        self.timezones = formatTimezones(timezones());

        function cancel() {
            $mdDialog.hide();
        };
        
        function validClient(client) {
            return client.emailAddress && client.firstName && client.lastName && client.timezone;
        }
        
        function save(client) {
            if (validClient(client)) {
                Users.addUser(client).then(function(response) {
                    Users.clearCache();
                    $mdDialog.hide();
                    var confirm = $mdDialog.confirm()
                                  .title('Client Added!')
                                  .ok('Great');
                    $mdDialog.show(confirm); 
               });
            }
        }
        
        function timezones() {
            return [TIMEZONES.US_PACIFIC, TIMEZONES.US_MOUNTAIN, TIMEZONES.US_CENTRAL, TIMEZONES.US_EASTERN];
        }
        
        function formatTimezones(timezoneObjects) {
            timezoneObjects.forEach(function(timezone) {
                timezone.gmt = Timezones.getCurrentTimezoneOffset(timezone.momentName);
            });
            
            return timezoneObjects;
        }
    }
    
    angular.module("mack").controller("AddClientCtrl", AddClientCtrl);
    
})();