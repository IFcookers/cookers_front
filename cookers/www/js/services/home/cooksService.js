/**
 * Created by kimsungwoo on 2015. 10. 11..
 */
angular.module('cookers.services')
    .factory('cooksService',[
        '$http',
        '$q',
        function($http, $q) {
            /**
             * function getcookslist ()
             * 홈에서 팔로우 한 사람들의 레시피들을 가져옴.
             */
            var cooksList = {};
            cooksList.getcooksList = function(following_list){

                var temp = [];

                for(var i in following_list){
                    temp.push(following_list[i]._id);
                }

                var defer = $q.defer();
                $http({
                    url: "http://localhost:3000/rest/cooks",
                    method: 'POST',
                    data: temp
                }).success(function (data, status, headers, config) {
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                    $window.alert(data);
                });

                return defer.promise;
            };
            return cooksList;
        }])
    .factory('cookmodelManage',[function(){
        var cook = undefined;
        return {
            set_cookmodel : function(model_item){
                cook = model_item;
            },
            get_cookmodel : function(){
                return cook;
            }
        }
    }]);
