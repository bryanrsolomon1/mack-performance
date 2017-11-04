(function () {
    'use strict';

    function Generic($http, $cacheFactory, $q, API_SERVER) {
        
        return {
            save: save,
            get: get,
            update: update,
            batchGetByObjectIds: batchGetByObjectIds,
            deleteObj: deleteObj
        };
        
        function clearCache(url) {
            if ($cacheFactory.get(url)) {
                $cacheFactory.get(url).removeAll();
            }
        }
                
        function save(url, obj) {
             return $http({
                 url: API_SERVER + "/" + url,
                 method: "POST",
                 data: angular.toJson(obj)
             }).then(function (response) {
                 clearCache(url);
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
        
        function get(url, params) {
            var request = {
                 url: API_SERVER + "/" + url,
                 cache: $cacheFactory.get(url)
            };
            if (params) {
                request.params = params;
            }
             return $http(request).then(function (response) {
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
        
        function update(url, obj) {
             return $http({
                 url: API_SERVER + "/" + url,
                 method: "PUT",
                 data: angular.toJson(obj)
             }).then(function (response) {
                 clearCache(url);
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
        
        function batchGetByObjectIds(url, objectIds) {
            return $http({
                method: "GET",
                url: API_SERVER + "/" + url,
                params: {batchObjectIds: objectIds.join(",")},
                cache: $cacheFactory.get(url)
             }).then(function (response) {
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
        
        function deleteObj(url, obj) {
            return $http({
                 url: API_SERVER + "/" + url,
                 method: "DELETE",
                 data: angular.toJson(obj)
             }).then(function (response) {
                 clearCache(url);
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
    }

    angular.module("mack").factory("Generic", Generic);

})();