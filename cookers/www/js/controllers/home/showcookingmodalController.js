/**
 * Created by kimsungwoo on 2015. 10. 6..
 */
angular.module('cookers.controllers')
    .controller('showcookingmodalCtrl',[
        '$scope',
        '$ionicModal',
        '$ionicLoading',
        '$timeout',
        'cookstepService',
        'currentinfoService',
        'userinfoService',
        'yummyService',
        'cookmodelManage',
        'checkmyyummyService',
        function($scope, $ionicModal, $ionicLoading, $timeout, cookstepService, currentinfoService,
                 userinfoService, yummyService, cookmodelManage, checkmyyummyService) {

            $scope.current_cook={};
            $scope.cook_id = currentinfoService.get_currentcook_id();
            $scope.myProfile = userinfoService.getuserInfo().cooker_profile;
            $scope.yummyCheck = false;

            /**
             * 현재 컨트롤러는 모달의 컨트롤러이기 때문에 resolve 사용 불가능.
             * 따라서 컨트롤러 내에 데이터를 받아오는 callback을 추가.
             */
            cookstepService.getcookStep($scope.cook_id).then(function (data) {

                console.log(data[0]);
                /**
                 * setcook function()
                 * cookstepmodal로 들어와 서버를 통해 cook정보를 받으면 이를 set시킴.
                 */
                cookmodelManage.set_cookmodel(data[0]);

                /**
                 * $scope.current_cook --> 현재 쿡에대한 스탭정보를 가지고 있음
                 * $scope.yummycookers_list --> cooks model의 yummy_cookers. yummy에 대한 계산을 하기 위해 따로 스코프 변수로 만듬.
                 * $scope.yummy_flag --> 현재 로그인한 사용자가 이 cook의 yummy에 대해 활성화/비활성화 인지를 나타내는 변수
                 */

                $scope.current_cook = data[0];
                $scope.yummy_count = $scope.current_cook.yummy.cookers.length;
                $scope.reply_count = $scope.current_cook.reply.cookers.length


                var checkData = {};

                checkData.cooker_yummy_id = $scope.myProfile.yummy;
                checkData.cook_id = $scope.cook_id;


                checkmyyummyService.checkyummyHttpRequest(checkData).then(function(data){
                    $scope.yummyCheck = data;
                    if(!$scope.yummyCheck){
                        /**
                         * false --> 목록에 없음. 비활성화
                         */
                        $scope.yummyclickedStyle = {'color':'inherit'};
                    } else {
                        /**
                         * false --> 목록에 있음. 활성화
                         */
                        $scope.yummyclickedStyle = {'color':'deepskyblue'};
                    }
                });
            });

            $scope.yummyClicked = function(){

                var yummyData = {};
                yummyData.cook_yummy_id = $scope.current_cook.yummy._id;
                yummyData.cooker_yummy_id = $scope.myProfile.yummy;
                yummyData.cook_id = $scope.cook_id;
                yummyData.cooker_id = $scope.myProfile._id;


                yummyService.yummydataHttpRequest(yummyData).then(function(data){

                    var checkData = {};

                    checkData.cooker_yummy_id = $scope.myProfile.yummy;
                    checkData.cook_id = $scope.cook_id;

                    checkmyyummyService.checkyummyHttpRequest(checkData).then(function(data){
                        $scope.yummyCheck = data;
                        if(!$scope.yummyCheck){
                            /**
                             * false --> 목록에 없음. 비활성화
                             */
                            $scope.yummyclickedStyle = {'color':'inherit'};
                        } else {
                            /**
                             * false --> 목록에 있음. 활성화
                             */
                            $scope.yummyclickedStyle = {'color':'deepskyblue'};
                        }
                    });
                    $scope.yummy_count = data.cookers.length;
                });
            }

            $scope.addReply = function(){

                /**
                 * 모달 초기화 함수.
                 */
                $ionicLoading.show({
                    showBackdrop: false,
                    showDelay: 0,
                    template : '<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>'
                });

                $ionicModal.fromTemplateUrl('views/home/replymodalTemplate.html', {
                    scope: $scope

                }).then(function(modal) {
                    $scope.modal = modal;
                });

                $timeout(function () {
                    $ionicLoading.hide();

                    $scope.modal.show();
                }, 1000);

            }

            $scope.addZimmy = function(){
                $ionicLoading.show({
                    showBackdrop: false,
                    template : 'Zimmy에 추가되었습니다!!'
                });

                $timeout(function () {
                    $ionicLoading.hide();
                }, 2000);
            }
        }]);
