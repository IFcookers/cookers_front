/**
 * Created by kimsungwoo on 2015. 10. 21..
 */
angular.module('cookers.controllers')
    .controller('replymodalCtrl',[
        '$scope',
        'cookmodelManage',
        'userinfoService',
        'addreplyService',
        'getreplyinitialdataService',
        '$ionicScrollDelegate',
        'datechangeService',
        function($scope, cookmodelManage, userinfoService, addreplyService, getreplyinitialdataService, $ionicScrollDelegate, datechangeService) {



            $scope.myProfile = userinfoService.getuserInfo().cooker_profile;
            $scope.cook_model = cookmodelManage.get_cookmodel();

            /**
             * 현재 이 cook에는 댓글 단 사용자들의 id만 있음.
             * 초기 페이지 로딩시 populate를 통해 사용자 정보를 가져와야함. (nick_name cooker_photo)
             */

            var initial_object = {};
            initial_object.reply_id = $scope.cook_model.reply._id;
            initial_object.cook_id = $scope.cook_model._id;

            getreplyinitialdataService.initialreplydataHttpRequest(initial_object).then(function(data){
                /**
                 * reply 초기 요청.
                 * 이 cook의 댓글 대이터를 가져옴.
                 */

                $scope.cookers = data.cookers; //댓글 단 사용자들

                if($scope.cookers.length == 0){
                    $scope.comments_check = true;
                } else {
                    $scope.comments_check = false;
                }
            })

            $scope.apply_comment = function(){

                var reply_object = {};
                reply_object.reply_id = $scope.cook_model.reply._id;
                reply_object.cooker_id = $scope.myProfile._id;
                reply_object.comment = $scope.write_comment;

                addreplyService.addreplyHttpRequest(reply_object).then(function(data){
                    $scope.cookers = data.cookers;
                    $scope.write_comment = "";

                    if($scope.cookers.length == 0){
                        $scope.comments_check = true;
                    } else {
                        $scope.comments_check = false;
                    }

                    $ionicScrollDelegate.$getByHandle('mainScroll').scrollBottom();
                });
            }

            $scope.change_date = function(date){
                return datechangeService.changedate(date);
            }

            $scope.closeModal = function() {
                $scope.modal.hide();
            };
        }]);
