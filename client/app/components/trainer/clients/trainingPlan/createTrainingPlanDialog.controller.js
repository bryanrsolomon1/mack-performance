(function() {
    "use strict";
    
    function CreateTrainingPlanDialogCtrl(Generic, $mdDialog, TRAINER_CLIENT_TRAINING_PLAN) {
        
        var self = this;
        var url = TRAINER_CLIENT_TRAINING_PLAN.URL;
        
        self.trainingPlan = {};
        
        self.save = save;
        self.validTrainingPlan = validTrainingPlan;
        self.cancel = cancel;
        
        function save(trainingPlan) {
            if (self.validTrainingPlan(trainingPlan)) {
                trainingPlan.startDate = trainingPlan.startDate.toISOString();
                trainingPlan.endDate = trainingPlan.endDate.toISOString();
                Generic.save(url, trainingPlan).then(function(response) {
                    $mdDialog.hide(response);
                    var confirm = $mdDialog.confirm()
                                  .title('Training Plan created!')
                                  .ok('Great');
                    $mdDialog.show(confirm);
               });
            }
        }
        
        function validTrainingPlan(trainingPlan) {
            return trainingPlan.name && trainingPlan.startDate && trainingPlan.endDate;
        }
        
        function cancel() {
            $mdDialog.cancel();
        }
    }
    
    angular.module("mack").controller("CreateTrainingPlanDialogCtrl", CreateTrainingPlanDialogCtrl);
    
})();