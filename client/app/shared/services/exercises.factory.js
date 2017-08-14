(function () {
    'use strict';

    function Exercises($http, $cacheFactory, $q, API_SERVER, USE_TEST_DATA, $mdDialog) {

        var exercisesCache = $cacheFactory("trainer-exercises");

        var testData = [{"videoId":"gKGY921BrIc","thumbnailUrl":"https://i.ytimg.com/vi/gKGY921BrIc/default.jpg","description":"Cuba","name":"Havana has many islands","createdByTrainerId":"1","player":"<iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/gKGY921BrIc\" frameborder=\"0\" allowfullscreen></iframe>"},{"videoId":"bkgre8Re8Tc","thumbnailUrl":"https://i.ytimg.com/vi/bkgre8Re8Tc/default.jpg","description":"There","name":"Hello","createdByTrainerId":"1","player":"<iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/bkgre8Re8Tc\" frameborder=\"0\" allowfullscreen></iframe>"},{"videoId":"gKGY921BrIc","thumbnailUrl":"https://i.ytimg.com/vi/gKGY921BrIc/default.jpg","description":"Test","name":"Test","createdByTrainerId":"1","player":"<iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/gKGY921BrIc\" frameborder=\"0\" allowfullscreen></iframe>"},{"videoId":"aea5BGj9a8Y","thumbnailUrl":"https://i.ytimg.com/vi/aea5BGj9a8Y/default.jpg","description":"Do some thrusting","name":"Thruster","createdByTrainerId":"1","player":"<iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/aea5BGj9a8Y\" frameborder=\"0\" allowfullscreen></iframe>"},{"videoId":"gKGY921BrIc","thumbnailUrl":"https://i.ytimg.com/vi/gKGY921BrIc/default.jpg","description":"Cuba","name":"Havana has many islands","createdByTrainerId":"1","player":"<iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/gKGY921BrIc\" frameborder=\"0\" allowfullscreen></iframe>"},{"videoId":"bkgre8Re8Tc","thumbnailUrl":"https://i.ytimg.com/vi/bkgre8Re8Tc/default.jpg","description":"There","name":"Hello","createdByTrainerId":"1","player":"<iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/bkgre8Re8Tc\" frameborder=\"0\" allowfullscreen></iframe>"},{"videoId":"gKGY921BrIc","thumbnailUrl":"https://i.ytimg.com/vi/gKGY921BrIc/default.jpg","description":"Test","name":"Test","createdByTrainerId":"1","player":"<iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/gKGY921BrIc\" frameborder=\"0\" allowfullscreen></iframe>"},{"videoId":"aea5BGj9a8Y","thumbnailUrl":"https://i.ytimg.com/vi/aea5BGj9a8Y/default.jpg","description":"Do some thrusting","name":"Thruster","createdByTrainerId":"1","player":"<iframe width=\"480\" height=\"270\" src=\"//www.youtube.com/embed/aea5BGj9a8Y\" frameborder=\"0\" allowfullscreen></iframe>"}];
        
        return {
            clearCache: clearCache,
            saveExercise: saveExercise,
            getExercises: getExercises,
            watchVideo: watchVideo
        };
        
        function clearCache() {
            exercisesCache.removeAll();
        }
                
        function saveExercise(exercise) {
             return $http({
                 url: API_SERVER + "/exercises",
                 cache: exercisesCache,
                 method: "POST",
                 data: angular.toJson(exercise)
             }).then(function (response) {
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
        
        function getExercises() {
            if (USE_TEST_DATA) {
                return $q(function(resolve) {
                    resolve(testData);
                });
            } else {
                 return $http({
                     url: API_SERVER + "/exercises/",
                     cache: exercisesCache
                 }).then(function (response) {
                     return response.data;
                 }, function (err) {
                     console.error(err);
                 });
            }
        }
        
        function watchVideo(exercise) {
            $mdDialog.show(
                {
                    templateUrl: "app/components/watchExercise/watchExerciseDialog.html",
                    locals: {exercise: exercise},
                    bindToController: true,
                    controller: function($mdDialog, $sce){
                        this.hide = function(){
                            $mdDialog.hide();
                        };
                        this.$sce = $sce;
                    },
                    multiple: true,
                    controllerAs: "Watch",
                    clickOutsideToClose: false
                }
            );
        }
    }

    angular.module("mack").factory("Exercises", Exercises);

})();