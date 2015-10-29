angular.module('cookers.controllers')
    .controller('cookStepGalleryCtrl2',[
        '$scope',
        'cookSummaryService',
        '$ionicScrollDelegate',
        '$state',
        '$ionicLoading',
        '$timeout',
        function($scope, cookSummaryService, $ionicScrollDelegate, $state, $ionicLoading, $timeout){
            console.log("hello, cookStep2");
            $scope.plus_button_condition = false;
            $scope.modifyCondition = false;
            $scope.cook = cookSummaryService.getCook();

            $scope.addCookSummary = function(){
                cookSummaryService.addSummary()
                //$timeout(, 1000);
                //var str = '#ani'+ ($scope.cook.summary.length-2);
                //console.log(str);
                ////$(str).addClass('animated fadeInDown');

                $ionicScrollDelegate.scrollBottom(true);

                if($scope.cook.summary.length ==12){
                    $scope.plus_button_condition = true;
                }
            }

            /**
             * toggle $scope.modifyCondition.
             */
            $scope.cookSummaryModify = function(){
                $scope.modifyCondition = !$scope.modifyCondition;
            }

            /**
             * $scope.modifyCondition : true 일 때만 동작.
             * step 삭제.
             * @param index
             */
            $scope.deleteStep = function(index){

                if(!$scope.modifyCondition) return;
                if($scope.cook.summary.length < 12){
                    $scope.plus_button_condition = false;
                }
                console.log("delete : " + index+"//"+ $scope.plus_button_condition);
                cookSummaryService.removeSummary(index);

            }

            /**
             *  $scope.modifyCondition : true 일 때만 동작.
             *  $state 이동.
             * @param index
             */
            $scope.selectStep = function(index){
                if($scope.modifyCondition) return;
                console.log("select : " + index +" go to detail page");
                if(index ==0 ){
                    $state.go("tabs.cooksummary");
                }else{
                    $state.go("tabs.inputDetailStep",{index:index});
                }
            }

            /**
             * 입력 완료를 위한 버튼
             * 완료 버튼누를 시, cook에 대한 정보를 Server로 이동하기 전에
             * 유효성 검사에 대한 로직.
             */
            $scope.cookSumarryComplete = function(){
                //console.log(cookSummaryService.getuserinfo());
                if(cookSummaryService.validationCheck()){
                    console.log("gallery don't setting");
                }else{
                    cookSummaryService.setHttpCook();
                    cookSummaryService.submitCook().then(function(result){

                        if(result.state == 200){

                            cookSummaryService.submitPhoto(result._id).then(function(result){
                                if(result.state== 200){
                                    $ionicLoading.show({
                                        showBackdrop: true,
                                        showDelay: 0,
                                        template : '<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>'
                                    });

                                    $state.go("tabs.home");
                                }else{
                                    $ionicLoading.show({
                                        showBackdrop: true,
                                        showDelay: 2000,
                                        template : '글쓰기 실패 ㅜㅜ 서버에 부하걸리나봐요.'
                                    });
                                }
                                $timeout(function () {
                                    $ionicLoading.hide();
                                }, 2000);
                            });

                        }else{
                            // insert 실패
                            $ionicLoading.show({
                                showBackdrop: true,
                                showDelay: 2000,
                                template : '네트워크 상태가 불안정합니다.'
                            });
                            $timeout(function () {
                                $ionicLoading.hide();
                            }, 2000);
                        }
                    });
                }
            }
        }
    ]);
