/**
 * Created by bryansolomon on 5/23/17.
 */
(function () {
    'use strict';

    function Youtube($http, $cacheFactory, $q, API_SERVER, ENVIRONMENT, ENVIRONMENT_TYPES) {

        var youtubeCache = $cacheFactory("youtube");
        
        var playlistsTestData = [{"kind":"youtube#playlist","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/1S4LA1KuyFaiWZpoZgl_vKxH-HM\"","id":"PLWPM9ejDcfdbZiits1_PvAaGuE3cF6K9O","snippet":{"publishedAt":"2017-06-12T17:23:42.000Z","channelId":"UCZtNRp4ocEGOHOJ3USQYeAQ","title":"TestBadPlaylistName","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/maxresdefault.jpg","width":1280,"height":720}},"channelTitle":"Mack Klink","localized":{"title":"TestBadPlaylistName","description":""}}},{"kind":"youtube#playlist","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/kItFgWeIqtr_08bLFI8RDpJN060\"","id":"PLWPM9ejDcfdYr0UGm_pBGj2z-uuIMWJh6","snippet":{"publishedAt":"2017-06-12T17:23:18.000Z","channelId":"UCZtNRp4ocEGOHOJ3USQYeAQ","title":"Exercises3","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/maxresdefault.jpg","width":1280,"height":720}},"channelTitle":"Mack Klink","localized":{"title":"Exercises3","description":""}}},{"kind":"youtube#playlist","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/FAqxJ2ygPisXK9uv2pM8UjjjVMk\"","id":"PLWPM9ejDcfdZyGV83ouita6JPSnhMcGCO","snippet":{"publishedAt":"2017-06-12T17:23:03.000Z","channelId":"UCZtNRp4ocEGOHOJ3USQYeAQ","title":"Exercises2","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/maxresdefault.jpg","width":1280,"height":720}},"channelTitle":"Mack Klink","localized":{"title":"Exercises2","description":""}}},{"kind":"youtube#playlist","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/o1NFT8nfixxnl3UiwtZGnxs8Lkw\"","id":"PLWPM9ejDcfdYKqDqycYmh5OWBpXWyiPjS","snippet":{"publishedAt":"2017-06-04T18:30:42.000Z","channelId":"UCZtNRp4ocEGOHOJ3USQYeAQ","title":"Exercises1","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/gKGY921BrIc/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/gKGY921BrIc/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/gKGY921BrIc/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/gKGY921BrIc/sddefault.jpg","width":640,"height":480}},"channelTitle":"Mack Klink","localized":{"title":"Exercises1","description":""}}}];
        
        var playlistItemsTestData = [{"kind":"youtube#playlistItem","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/36iREWjgQrcTf129G6fH5y9cuUs\"","id":"UExXUE05ZWpEY2ZkWXIwVUdtX3BCR2oyei11dUlNV0poNi41NkI0NEY2RDEwNTU3Q0M2","snippet":{"publishedAt":"2017-06-12T17:23:18.000Z","channelId":"UCZtNRp4ocEGOHOJ3USQYeAQ","title":"Every Hitman’s Worst Nightmare","description":"It's nothing a quick YouTube tutorial can't fix.\n\nSee more http://www.collegehumor.com\nLIKE us on: http://www.facebook.com/collegehumor\nFOLLOW us on: http://www.twitter.com/collegehumor\nFOLLOW us on: http://www.collegehumor.tumblr.com\n\nAssistant Editor: Marissa Melnyk\nEditor: Sam Geer\nVisual Effects and Graphics: Chris Rutherford\nPost Supervisor: Stephanie Zorn","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/sddefault.jpg","width":640,"height":480},"maxres":{"url":"https://i.ytimg.com/vi/bkgre8Re8Tc/maxresdefault.jpg","width":1280,"height":720}},"channelTitle":"Mack Klink","playlistId":"PLWPM9ejDcfdYr0UGm_pBGj2z-uuIMWJh6","position":0,"resourceId":{"kind":"youtube#video","videoId":"bkgre8Re8Tc"}}},{"kind":"youtube#playlistItem","etag":"\"m2yskBQFythfE4irbTIeOgYYfBU/vfwAGQGkZ8g7BQTnTrVi6SdEPsA\"","id":"UExXUE05ZWpEY2ZkWXIwVUdtX3BCR2oyei11dUlNV0poNi4yODlGNEE0NkRGMEEzMEQy","snippet":{"publishedAt":"2017-06-12T18:56:58.000Z","channelId":"UCZtNRp4ocEGOHOJ3USQYeAQ","title":"TestVideo","description":"","thumbnails":{"default":{"url":"https://i.ytimg.com/vi/gKGY921BrIc/default.jpg","width":120,"height":90},"medium":{"url":"https://i.ytimg.com/vi/gKGY921BrIc/mqdefault.jpg","width":320,"height":180},"high":{"url":"https://i.ytimg.com/vi/gKGY921BrIc/hqdefault.jpg","width":480,"height":360},"standard":{"url":"https://i.ytimg.com/vi/gKGY921BrIc/sddefault.jpg","width":640,"height":480}},"channelTitle":"Mack Klink","playlistId":"PLWPM9ejDcfdYr0UGm_pBGj2z-uuIMWJh6","position":1,"resourceId":{"kind":"youtube#video","videoId":"gKGY921BrIc"}}}];
        
        return {
            getPlaylistsByChannelId: getPlaylistsByChannelId,
            getPlaylistItems: getPlaylistItems,
            getVideos: getVideos
        };
                
        function getPlaylistsByChannelId(channelId) {
            if (ENVIRONMENT === ENVIRONMENT_TYPES.BETA) {
                return $q(function(resolve) {
                    resolve(playlistsTestData);
                });
            } else {
                 return $http({
                     url: API_SERVER + "/youtube/playlists",
                     cache: youtubeCache,
                     params: {channelId: channelId}
                 }).then(function (response) {
                     return response.data;
                 }, function (err) {
                     console.error(err);
                 });
            }
        }
        
        function getPlaylistItems(playlistId) {
            if (ENVIRONMENT === ENVIRONMENT_TYPES.BETA) {
                return $q(function(resolve) {
                    resolve(playlistItemsTestData);
                });
            } else {
                 return $http({
                     url: API_SERVER + "/youtube/playlistitems",
                     cache: youtubeCache,
                     params: {playlistId: playlistId}
                 }).then(function (response) {
                     return response.data;
                 }, function (err) {
                     console.error(err);
                 });
            }
        }
        
        function getVideos(videoIds) {
             return $http({
                 url: API_SERVER + "/youtube/videos",
                 cache: youtubeCache,
                 params: {videoIds: videoIds.join(",")}
             }).then(function (response) {
                 return response.data;
             }, function (err) {
                 console.error(err);
             });
        }
    }

    angular.module("mack").factory("Youtube", Youtube);

})();