/**
 * Created by kimsungwoo on 2015. 10. 21..
 */
angular.module('cookers.services')
    .factory('addreplyService',[
        '$http',
        '$q',
        function($http, $q) {
            /**
             * function addreplyHttpRequest
             * 사용자가 댓글 등록을 누르면 서버로 요청
             */
            var reply = {};
            reply.addreplyHttpRequest = function(reply_object){

                var defer = $q.defer();
                $http({
                    url: "http://localhost:3000/rest/cooks/cookSteps/addreply",
                    method: 'POST',
                    data: reply_object
                }).success(function (data, status, headers, config) {
                    reply.getreplyData = data;
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    $window.alert(data);
                });

                return defer.promise;
            };
            return reply;
        }])
    .factory('getreplyinitialdataService',[
        '$http',
        '$q',
        function($http, $q) {
            /**
             * function initialreplydataHttpRequest
             * 초기 해당 cook에 대한 댓글 데이터를 가져옴
             */
            var reply = {};
            reply.initialreplydataHttpRequest = function(request_data){

                var defer = $q.defer();
                $http({
                    url: "http://localhost:3000/rest/cooks/cookSteps/initialreply",
                    method: 'POST',
                    data: request_data
                }).success(function (data, status, headers, config) {
                    console.log(data);
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    $window.alert(data);
                });

                return defer.promise;
            };
            return reply;
        }]);
