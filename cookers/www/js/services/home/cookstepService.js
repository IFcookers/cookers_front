/**
 * Created by kimsungwoo on 2015. 10. 14..
 */
angular.module('cookers.services')
    .factory('cookstepService',[
        '$http',
        '$q',
        function($http, $q) {
            /**
             * function getcookStep ()
             * 유저가 선택한 쿡의 스탭을 보여 줌
             */
            var cookStep = {};
            cookStep.getcookStep = function(cook_id){

                var defer = $q.defer();
                $http({
                    url: "http://localhost:3000/rest/cooks/cookSteps/"+cook_id,
                    method: 'POST'
                }).success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    $window.alert(data);
                });

                return defer.promise;
            };
            return cookStep;
        }]);
