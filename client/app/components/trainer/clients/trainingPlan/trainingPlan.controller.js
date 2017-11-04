(function() {
    "use strict";
    
    function TrainerClientTrainingPlanCtrl(Generic, $mdDialog, Workouts, $scope, $transitions, STATES, $stateParams, TRAINER_CLIENT_TRAINING_PLAN, USERS, Global) {
        
        var self = this;
        var client = $stateParams.client;
        var url = TRAINER_CLIENT_TRAINING_PLAN.URL;
        
        self.sidenavName = "trainer-client-training-plan-sidenav";
        self.trainingPlans = [];
        
        self.selectPlan = selectPlan;
        self.create = create;
        self.createFromTemplate = createFromTemplate;
        self.scheduleWorkout = scheduleWorkout;
        self.deleteWorkout = deleteWorkout;
        self.addWorkoutsToPlan = addWorkoutsToPlan;
        self.save = save;
        
        /* initial download */
        downloadPlans();
        
        $transitions.onBefore( { exiting: STATES.TRAINER.CLIENTS.TRAINING_PLAN }, function(trans) {
            var $q = trans.injector().get('$q');
            var deferred = $q.defer();
            if (self.dataHasChanged) {
                var $mdDialog = trans.injector().get('$mdDialog');
                var confirm = $mdDialog.confirm()
                              .title('You have unsaved changes')
                              .textContent("Are you sure you want to leave?")
                              .ok("Yes")
                              .cancel("Stay");
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
        
        function downloadPlans() {
            if (client.trainingPlans.length > 0) {
                Generic.batchGetByObjectIds(url, client.trainingPlans).then(function(data) {
                    self.trainingPlans = data;

                    if (self.trainingPlans.length >= 1) {
                        selectPlan(self.trainingPlans[0]);
                    }
                });
            }
        }
        
        function selectPlan(trainingPlan) {
            self.selectedTrainingPlan = trainingPlan;
            self.selectedOriginal= angular.copy(trainingPlan);
            
            configureFormWatcher();
        }
        
        var currentWatchDeregisterer = function() {};
        
        function configureFormWatcher() {
            currentWatchDeregisterer(); // deregister the previous watch
            /* set the new watch */
            currentWatchDeregisterer = $scope.$watch(function() {
                return self.selectedTrainingPlan;
            }, function(newValue, oldValue) {
                /* was the change real or did they just change something back to its original for example? */
                self.dataHasChanged = !angular.equals(self.selectedTrainingPlan, self.selectedOriginal);
            }, true); // true here means angular will use .equals() for comparison in the watch
        }
        
        function create() {
            $mdDialog.show({
                    templateUrl: "app/components/trainer/clients/trainingPlan/createTrainingPlanDialog.html",
                    controller: "CreateTrainingPlanDialogCtrl as CTP"
            }).then(function(trainingPlan) {
                client.trainingPlans.push(trainingPlan.objectId);
                Generic.update(USERS.URL, client).then(function() {
                    downloadPlans();
                });
            });
        }
        
        function createFromTemplate() {
            $mdDialog.show({
                    templateUrl: "app/components/trainer/clients/trainingPlan/newFromTemplateDialog.html",
                    controller: "NewFromTemplateDialogCtrl as NFT"
            }).then(function(template) {
                Generic.save(url, template).then(function(savedPlan) {
                    client.trainingPlans.push(savedPlan.objectId);
                    Generic.update(USERS.URL, client).then(function() {
                        downloadPlans();
                    });
                });
            });
        }
        
        function scheduleWorkout(workout) {
            var dates = self.selectedTrainingPlan.calendar[workout.objectId].map(function(date) {
                return moment(date);    
            });
            $mdDialog.show({
                template: "<multiple-date-picker ng-model=\"Date.dates\"></multiple-date-picker>" + "<md-dialog-actions><md-button ng-click=\"Date.save()\">Done</md-button><md-button ng-click=\"Date.cancel()\">Cancel</md-button></md-dialog-actions>",
                locals: {dates: dates}, // dates for this workout
                bindToController: true,
                controller: function($mdDialog) {
                    var self = this;
                    self.cancel = function() {
                        $mdDialog.cancel();
                    }    
                    self.save = function() {
                        self.dates = self.dates.map(function(dateObj) {
                            if (moment.isMoment(dateObj)) {
                                return dateObj.toDate();
                            } else {
                                return dateObj;
                            }
                        });
                        $mdDialog.hide(self.dates);
                    }
                },
                controllerAs: "Date"
            }).then(function(dates) {
                self.selectedTrainingPlan.calendar[workout.objectId] = dates;
            });
        }
        
        function deleteWorkout(workout) {
            var confirm = $mdDialog.confirm()
                              .title('Are you sure you want to delete this workout?')
                              .ok('Yes')
                              .cancel("Cancel");
            $mdDialog.show(confirm).then(function() {
                delete self.selectedTrainingPlan.calendar[workout.objectId];
                self.selectedTrainingPlan.$$workouts = self.selectedTrainingPlan.$$workouts.filter(function(workoutObj) {
                   if (workoutObj.objectId !== workout.objectId) {
                       return true;
                   } 
                });
            });
        }
        
        function addWorkoutsToPlan() {
            $mdDialog.show({
                    templateUrl: "app/components/trainer/trainingPlanTemplate/addWorkoutsDialog.html",
                    locals: {trainingPlan: self.selectedTrainingPlan},
                    bindToController: true,
                    controller: "AddWorkoutsDialogCtrl as AW"
            }).then(function(newWorkouts) {
                newWorkouts.forEach(function(workout) {
                    self.selectedTrainingPlan.workouts.push(workout);
                    self.selectedTrainingPlan.calendar[workout.objectId] = [];
                });
            });
        }
        
        function save(trainingPlan) {
            Generic.update(url, trainingPlan).then(function() {
                self.dataHasChanged = false;
                var confirm = $mdDialog.confirm()
                              .title('Training Plan saved!')
                              .ok('Great');
                $mdDialog.show(confirm);
            });
        }
    }
    
    angular.module("mack").controller("TrainerClientTrainingPlanCtrl", TrainerClientTrainingPlanCtrl);
    
})();