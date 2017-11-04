(function() {
    
    function NewFromTemplateDialogCtrl($mdDialog, Generic, TRAINING_PLAN_TEMPLATE) {
        var self = this;
        var url = TRAINING_PLAN_TEMPLATE.URL;
        
        self.validTrainingPlan = validTrainingPlan;
        self.save = save;
        self.cancel = cancel;
        
        Generic.get(url).then(function(templates) {
            self.templates = templates;
        });
        
        function validTrainingPlan(trainingPlan) {
            return self.selectedTemplate && self.selectedTemplate.startDate && self.selectedTemplate.endDate;
        }
        
        function save(template) {
            if (validTrainingPlan(template)) {
                $mdDialog.hide(template);
            }
        }
        
        function cancel() {
            $mdDialog.cancel();
        }
    }
    
    angular.module("mack").controller("NewFromTemplateDialogCtrl", NewFromTemplateDialogCtrl);
    
})();