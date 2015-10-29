/**
 * Created by kimsungwoo on 2015. 10. 27..
 */
angular.module('cookers.services')
    .factory('searchService',[
        '$http',
        '$q',
        function($http, $q) {
            /**
             *
             *
             */
            var search = {};
            search.searchautocompleteHttpRequest= function(search_param){

                /**
                 * function searchautocompleteHttpRequest(search_param)
                 *  --> 검색의 자동완성 요청 메서드
                 * search_param : {
                 *      type : String (tag, cook, cookers),
                 *      search_text : String
                 * }
                 */
                var defer = $q.defer();
                $http({
                    url: "http://localhost:3000/rest/search",
                    method: 'POST',
                    data: search_param
                }).success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    $window.alert(data);
                });

                return defer.promise;
            };
            return search;
        }])
