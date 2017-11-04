(function() {
    "use strict";
    
    function TrainingPlanTemplateCtrl(Generic, $mdDialog, Workouts, $scope, $transitions, STATES, TRAINING_PLAN_TEMPLATE) {
        var self = this;
        
        var url = TRAINING_PLAN_TEMPLATE.URL;
        
        self.sidenavName = "trainer-training-plan-template-sidenav";
        
        self.selectTemplate = selectTemplate;
        self.create = create;
        self.deleteWorkout = deleteWorkout;
        self.addWorkoutsToTemplate = addWorkoutsToTemplate;
        self.save = save;
        
        /* initial download */
        downloadTemplates();
        
        $transitions.onBefore( { exiting: STATES.TRAINER.TRAINING_PLAN_TEMPLATES }, function(trans) {
            var $q = trans.injector().get('$q');
            var deferred = $q.defer();
            if (self.dataHasChanged) {
                var $mdDialog = trans.injector().get('$mdDialog');
                var confirm = getConfirmLeaveDialog();
                $mdDialog.show(confirm).then(function() {
                    deferred.resolve(true);
                }, function() {
                    deferred.resolve(false);
                });
            } else {
                deferred.resolve(true);
            }
            return deferred.promise;
        });
        
        function getConfirmLeaveDialog() {
            return $mdDialog.confirm()
                              .title('You have unsaved changes')
                              .textContent("Are you sure you want to leave?")
                              .ok("Yes")
                              .cancel("Stay");
        }
        
        function downloadTemplates() {
            Generic.get(url).then(function(data) {
                self.templates = data;
                
                if (self.templates.length >= 1) {
                    selectTemplate(self.templates[0]);
                }
            });
        }
        
        function selectTemplate(template) {
            if (self.dataHasChanged) {
                var confirm = getConfirmLeaveDialog();
                $mdDialog.show(confirm).then(function() {
                    doSelect();
                }, function() {
                    // do nothing
                });
            } else {
                doSelect();
            }
            
            function doSelect() {
                self.selectedTemplate = template;
                self.selectedOriginal= angular.copy(template);

                configureFormWatcher();
            }
        }
        
        var currentWatchDeregisterer = function() {};
        
        function configureFormWatcher() {
            currentWatchDeregisterer(); // deregister the previous watch
            /* set the new watch */
            currentWatchDeregisterer = $scope.$watch(function() {
                return self.selectedTemplate;
            }, function(newValue, oldValue) {
                /* was the change real or did they just change something back to its original for example? */
                self.dataHasChanged = !angular.equals(self.selectedTemplate, self.selectedOriginal);
            }, true); // true here means angular will use .equals() for comparison in the watch
        }
        
        function create() {
            $mdDialog.show({
                    templateUrl: "app/components/trainer/trainingPlanTemplate/createTrainingPlanTemplateDialog.html",
                    locals: {},
                    bindToController: true,
                    controller: function($mdDialog, TRAINING_PLAN_TEMPLATE, Generic) {
                        var self = this;
                        self.url = TRAINING_PLAN_TEMPLATE.URL;
                        self.template = {};
                        self.save = function(template) {
                            if (self.validTemplate(template)) {
                                Generic.save(url, template).then(function(response) {
                                    $mdDialog.hide(response);
                                    var confirm = $mdDialog.confirm()
                                                  .title('Template created!')
                                                  .ok('Great');
                                    $mdDialog.show(confirm);
                               });
                            }
                        }

                        self.validTemplate = function(template) {
                            return template.name;
                        }

                        self.cancel = function() {
                            $mdDialog.hide();
                        }
                    },
                    controllerAs: "CTPT"
            }).then(function() {
                downloadTemplates();
            });
        }
        
        function deleteWorkout(workout) {
            var confirm = $mdDialog.confirm()
                              .title('Are you sure you want to delete this workout?')
                              .ok('Yes')
                              .cancel("Cancel");
            $mdDialog.show(confirm).then(function() {
                delete self.selectedTemplate.calendar[workout.objectId];
                self.selectedTemplate.$$workouts = self.selectedTemplate.$$workouts.filter(function(workoutObj) {
                   if (workoutObj.objectId !== workout.objectId) {
                       return true;
                   } 
                });
            });
        }
        
        function addWorkoutsToTemplate() {
            $mdDialog.show({
                    templateUrl: "app/components/trainer/trainingPlanTemplate/addWorkoutsDialog.html",
                    locals: {trainingPlan: self.selectedTemplate},
                    bindToController: true,
                    controller: "AddWorkoutsDialogCtrl as AW"
            }).then(function(newWorkouts) {
                newWorkouts.forEach(function(workout) {
                    self.selectedTemplate.workouts.push(workout);
                    self.selectedTemplate.calendar[workout.objectId] = [];
                });
            });
        }
        
        function save(template) {
            Generic.update(url, template).then(function() {
                self.dataHasChanged = false;
                var confirm = $mdDialog.confirm()
                              .title('Template saved!')
                              .ok('Great');
                $mdDialog.show(confirm);
            });
        }
    }
    
    angular.module("mack").controller("TrainingPlanTemplateCtrl", TrainingPlanTemplateCtrl);
    
})();