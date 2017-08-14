(function () {
    'use strict';

    function Workouts($http, $cacheFactory, $q, API_SERVER, USE_TEST_DATA) {

        var workoutsCache = $cacheFactory("trainer-workouts");
        
        return {
            clearCache: clearCache,
            saveWorkout: saveWorkout,
            getWorkouts: getWorkouts
        };
        
        function clearCache() {
            workoutsCache.removeAll();
        }
                
        function saveWorkout(workout) {
             return $http({
                 url: API_SERVER + "/workouts",
                 cache: workoutsCache,
                 method: "POST",
                 data: angular.toJson(workout)
             }).then(function (response) {
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
        
        function getWorkouts() {
            if (USE_TEST_DATA) {
                return $q(function(resolve) {
                    resolve(testData);
                });
            } else {
                 return $http({
                     url: API_SERVER + "/workouts/",
                     cache: workoutsCache
                 }).then(function (response) {
                     return response.data;
                 }, function (err) {
                     console.error(err);
                 });
            }
        }
    }

    angular.module("mack").factory("Workouts", Workouts);

})();