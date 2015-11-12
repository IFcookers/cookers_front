/**
 * Created by kimsungwoo on 2015. 11. 11..
 */
angular.module('cookers.controllers')
    .controller('showsummaryCtrl',[
        '$scope',
        '$ionicSlideBoxDelegate',
        'cookmodelManage',
        function($scope, $ionicSlideBoxDelegate, cookmodelManage) {

            var cook_model = cookmodelManage.get_cookmodel();

            console.log(cook_model);

            $scope.gotoslide = function(param){
                $ionicSlideBoxDelegate.slide(param);
                $scope.showsummarymodal.hide();

            }

            $scope.closeModal = function() {
                $scope.showsummarymodal.hide();
            };
        }]);
