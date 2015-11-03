/**
 * Created by kimsungwoo on 2015. 10. 21..
 */
angular.module('cookers.controllers')
    .controller('replymodalCtrl',[
        '$scope',
        '$ionicScrollDelegate',
        '$ionicPopover',
        'cookmodelManage',
        'userinfoService',
        'addreplyService',
        'getreplyinitialdataService',
        'datechangeService',
        function($scope, $ionicScrollDelegate, $ionicPopover, cookmodelManage, userinfoService, addreplyService, getreplyinitialdataService, datechangeService) {

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


            /**
             * moreinfoPopover
             * --> 댓글 팝오버.
             *      본인의 댓글일 땐 수정, 삭제 기능
             *      타인의 댓글일 땐 신고 기능
             */
            $ionicPopover.fromTemplateUrl('views/home/moreinfopopoverTemplate.html', {
                scope: $scope,
            }).then(function(popover) {
                $scope.moreinfoPopover = popover;
            });

            $scope.openmoreinfoPopover = function($event) {
                $scope.moreinfoPopover.show($event);
            };
            $scope.closemoreinfoPopover = function() {
                $scope.moreinfoPopover.hide();
            };

            /**
             * tagPopover
             * --> 태그 팝오버
             *      @사용자명
             *      #태그명
             */

            $ionicPopover.fromTemplateUrl('views/home/tagpopoverTemplate.html', {
                scope: $scope
            }).then(function(popover) {
                $scope.tagPopover = popover;
            });

            $scope.keyUpTag = function($event){
                /**
                 * keyCode == 50 --> @
                 * keyCode == 51 --> #
                 */
                if($event.keyCode === 50){
                    $scope.opentagPopover($event);
                } else if($event.keyCode === 51){
                    $scope.opentagPopover($event);
                }

                /*if(event.keyCode===13 || event.keyCode===188){
                    $scope.cook.inputStuff = $scope.cook.inputStuff.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi,'');
                    $scope.cook.inputStuff = $scope.cook.inputStuff.replace(/\s+/gi,' ');
                    //$scope.cook.inputStuff = $scope.cook.inputStuff.replace(/\d[0-3]\S*!/gi,'');

                    if($scope.cook.inputStuff.length>0){
                        for(var i in $scope.cook.stuffs){
                            if($scope.cook.inputStuff === $scope.cook.stuffs[i].stuff_name){
                                angular.element(document.querySelector( '#input_stuff' )).css("color","red");
                                return;
                            }
                        }
                        cookSummaryService.addStuff($scope.cook.inputStuff);
                        cookSummaryService.initInputStuff();
                    }
                }
                angular.element(document.querySelector( '#input_stuff' )).css("color","black");*/
            }

            $scope.opentagPopover = function($event) {
                $scope.moreinfoPopover.show($event);
            };

            $scope.closetagPopover = function() {
                $scope.moreinfoPopover.hide();
            };
        }]);
