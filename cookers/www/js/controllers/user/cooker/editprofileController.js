/**
 * Created by airnold on 15. 10. 21..
 */



angular.module('cookers.controllers')
    .controller('editprofileController',[
        '$scope',
        '$localStorage',
        '$state',
        'editcookerInfo',
        '$rootScope',
        'cookerService',
        '$ionicLoading',
        'cameraService',
        function($scope, $localStorage,$state,editcookerInfo,$rootScope,cookerService,$ionicLoading,cameraService){


            $scope.cooker_profile = editcookerInfo;
            $scope.profile_image_send = '';
            $scope.profileedit = {
                name : '',
                state_comment : '',
                change_pw : '',
                change_pw_check : '',
                change_pw_current : '',
                change_pw_current_status : false,
                imgdata : '',
                change_pw_status : false,
                change_pw_msg : '비밀번호가 일치하지 않아요',
                photo : ''
            };
            $scope.pwchange = false;

            $scope.backProfileEvent = function(){

                /**
                 * 초기화만해주고 다시 돌아가기
                 */
                $state.go('tabs.user', {userid : $localStorage.id});
            };

            $scope.completeProfileEvent = function(){
                if($scope.profileedit.change_pw == '' && $scope.profileedit.change_pw_status == false){
                    /**
                     * 암것도 안함 pw 지정해줄 필요 없음
                     */
                    alert('pw변경안함');
                }else{
                    /**
                     * pw 저장
                     */
                    alert('pw변경');
                }

                if($scope.profileedit.name == ''){
                    /**
                     * 이름 변경 안함, 원래것 너어줌
                     */
                    $scope.profileedit.name = $scope.cooker_profile.name;
                    alert('이름변경안함');

                }else{
                    /**
                     * 이름 변경함
                     */
                    alert('이름변경');
                }

                if($scope.profileedit.state_comment == ''){
                    /**
                     * 상태글 변경 안함, 원래것 너어줌
                     */
                    $scope.profileedit.state_comment = $scope.cooker_profile.state_comment;
                    alert('상태글 변경 안함');
                }else{
                    /**
                     * 상태글 변경
                     */
                    alert('상태글 변경');
                }
                if($scope.profile_image_send == ''){
                    /**
                     * 사진 변경 안함, 원래것 너어줌
                     */
                    $scope.profileedit.photo = $scope.cooker_profile.cooker_photo;
                    alert('사진 변경안함');
                }else{
                    /**
                     * 사진 변경
                     */
                    $scope.profileedit.photo = $localStorage.id + '.png';
                    alert('사진 변경');

                }

                if($scope.profileedit.change_pw_status == false ){
                    $ionicLoading.show({
                        template: '<i class="ion-android-cancel"></i> 비밀번호 입력을 확인해주세요'
                        , noBackdrop: true
                        , duration: 1000
                    });
                }else{
                    if($scope.profile_image_send != ''){

                        /**
                         * 돌리기
                         */

                        cookerService.uploadProfileImageHttpRequest($localStorage.id, $scope.profile_image_send).then(function(server_data){
                            cookerService.editProfileHttpRequest($scope.profileedit, $localStorage.id).then(function(result){
                                $state.go('tabs.user', {userid:$localStorage.id});
                            });
                        })
                    }else{
                        /**
                         * 그냥 변경만
                         */
                        cookerService.editProfileHttpRequest($scope.profileedit, $localStorage.id).then(function(result){
                            $state.go('tabs.user', {userid:$localStorage.id});
                        });
                    }

                }
            };


            if($scope.cooker_profile.cooker_photo == ''){
                $scope.profileedit.imgdata = 'img/chef31.png';
            }else{
                $scope.profileedit.imgdata = $scope.cooker_profile.cooker_photo;
            }

            $scope.getAlbum = function(){

                cameraService.optionSetting(0);
                cameraService.getPicture().then(function(img_data){
                    /**
                     * 이미지를 저장한다
                     */

                    $scope.profileedit.imgdata = "data:image/jpg;base64," +  img_data;
                    $scope.profile_image_send = "data:image/jpg;base64," + img_data;
                });
            };

            $scope.getCamera = function(){

                cameraService.optionSetting(1);
                cameraService.getPicture().then(function(img_data){

                    /**
                     * 이미지를 저장한다
                     */

                    $scope.profileedit.imgdata = "data:image/jpg;base64," + img_data;
                    $scope.profile_image_send = "data:image/jpg;base64," + img_data;
                });
            };

            $scope.pwchangetoggleEvent = function(){
                if($scope.pwchange == false){
                    $scope.pwchange = true;
                }else{
                    $scope.pwchange = false;
                }
            };

            $rootScope.$on('changepwstateChange', function (event, data) {
                $scope.profileedit.change_pw_status = data;
                if(data == false){
                    $scope.profileedit.change_pw_msg = "비밀번호가 일치하지 않습니다."
                }else{
                    if($scope.profileedit.change_pw == ''){

                    }else{
                        var str = $scope.profileedit.change_pw;
                        var patt = new RegExp(/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).*$/);
                        var res = patt.test(str);

                        if(res == true){

                        }else{
                            $scope.profileedit.change_pw_status = false;
                            $scope.profileedit.change_pw_msg = '비밀번호는 특수문자, 대문자, 소문자 및 숫자 포함 8자리 이상 으로 해주세요';
                        }
                    }
                }

            });



        }
    ]);
