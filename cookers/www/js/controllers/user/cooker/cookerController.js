/**
 * Created by airnold on 15. 10. 16..
 */


angular.module('cookers.controllers')
    .controller('cookerController',[
        '$scope',
        '$localStorage',
        'userStatus',
        'cookerinfoService',
        'cookerService',
        '$state',
        '$rootScope',
        '$window',
        '$ionicHistory',
        function($scope, $localStorage, userStatus, cookerinfoService,cookerService,$state,$rootScope,$window,$ionicHistory){

            $scope.cooker_profile = cookerinfoService.getcookerInfo();
            $scope.cooker_zimmy = cookerinfoService.getcookerZimmy();
            $scope.cooker_mycook = cookerinfoService.getcookerMycook();

            /**
             * userStatus => false -> 다른 유저 보기
             * userStatus => true -> 같은 유저 보기
             */

            $scope.cooker_state_comment = $scope.cooker_profile.state_comment;

            if($scope.cooker_profile.cooker_photo == ''){
                $scope.imgdata = 'img/chef31.png';
            }else{
                $scope.imgdata = $scope.cooker_profile.cooker_photo;
            }

            /**
             * $scope.follow_status 로 팔로우끊기와 팔로우하기 로직때 사용
             */
            $scope.follow_status = cookerinfoService.followerStatus($localStorage.id);
            $scope.profile_btn = '';
            if(userStatus == true){
                $scope.profile_btn = '정보수정';
            }else{
                if($scope.follow_status == true){
                    /**
                     * 다른유저의 프로필을 보고 있는 상황에서 팔로우중
                     */
                    $scope.profile_btn = '팔로우끊기';
                }else{
                    /**
                     * 다른유저의 프로필을 보고 있는 상황에서 팔로우중이지 않음
                     */
                    $scope.profile_btn = '팔로우하기';
                }
            }

            $scope.mycook_zimmy = 'mycook';

            $scope.mycookEvent = function(){

                $scope.mycook_zimmy = 'mycook';

            };
            $scope.zimmyEvent = function(){
                $scope.mycook_zimmy = 'zimmy';
            };

            $scope.profileBtnEvent = function(){
                if(userStatus == true){
                    /**
                     * 정보수정
                     */
                    $state.go('tabs.edit',{userid:$localStorage.id});

                }else{
                    if($scope.follow_status == true){
                        /**
                         * 다른유저의 프로필을 보고 있는 상황에서 팔로우중
                         */
                        cookerService.cancelFollowerHttpRequest($localStorage.id, $scope.cooker_profile._id).then(function(data){

                            $state.go($state.current, {userid : $scope.cooker_profile._id}, {reload: true});

                        })

                    }else{
                        /**
                         * 다른유저의 프로필을 보고 있는 상황에서 팔로우중이지 않음
                         * 로컬스토리지 -> 현재 다른 유저를 보고있는 해당 앱 유저의 id
                         * $scope.cookr_profile._id -> 팔로우 당할 쿠커의 아이디
                         */
                        cookerService.makeFollowerHttpRequest($localStorage.id,$localStorage.nick_name,$localStorage.cooker_photo,$scope.cooker_profile._id, $scope.cooker_profile.nick_name, $scope.cooker_profile.cooker_photo).then(function(follow_status){

                            $state.go($state.current, {userid : $scope.cooker_profile._id}, {reload: true});

                        })
                    }
                }
            };

            $scope.followEvent = function(){
                $state.go('tabs.follow',{userid : $scope.cooker_profile._id});
            };
            $scope.followerEvent = function(){
                $state.go('tabs.follower',{userid : $scope.cooker_profile._id});
            };

            $scope.back_view_go = function(){
                var backView = $ionicHistory.backView();
                backView.go();
            }
        }
    ]);
