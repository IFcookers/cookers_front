angular.module('cookers.services')
    .factory('cookSummaryService',[
        '$http',
        '$q',
        'userinfoService',
        'cookers_config',
        function($http, $q, userinfoService, cookers_config){

            /**
             * cook : cookSummary, cookStepGallery, inputDetailStep 에서 사용되는 객체.
             * httpCook : $http 모듈 이용해 서버에 데이터 보낼때 사용되는 객체.
             */
            var cook = {};
            var httpCook = {};
            var initImage = 'img/food3.jpg';
            var init = function(){
                cook = {
                    _id : "",
                    update_flag : false,
                    summary : [{
                        title : '',
                        desc : '',
                        input_stuff : '',
                        stuffs : [],
                        input_tag : '',
                        tags : [],
                        photo : 'img/cooksummary.png'
                    },
                    {
                        plus_button : true
                    }]
                };
            }
            init();

            var stringValidationCheck = function(property, title){
                if(property ==undefined || property.trim()==''){
                    alert(title+"을 입력해주세요.");
                    return true;
                }
                return false;
            }

            var tagValidationCheck = function(property, title){
                if(property ==undefined || property.length ==0){
                    alert(title + "을 입력해주세요.");
                    return true;
                }
                return false;
            }

            var stepValidationCheck = function(property, title){
                if(property ==undefined || property.length == 2){
                    alert('최소 1개 이상의'+ title + "이 필요합니다.");
                    return true;
                }else{
                    for(var i in property){
                        if(i==0 || i ==property.length-1) continue;
                        if(stringValidationCheck(property[i].content, 'Step.'+ i +'의 내용')) return true;
                        if(stringValidationCheck(property[i].photo, 'Step.'+ i +'의 사진')) return true;
                    }
                }
                return false;
            }

            return {
                init : function(){
                    init();
                },
                /**
                 * return summary[0] : title, stuffs, desc, tag, photo<complete_photo>
                 * @returns {*}
                 */
                getMainSummary : function(){
                    return cook.summary[0];
                },

                getCook : function(){
                    return cook;
                },

                initInputStuff : function(){
                    cook.summary[0].inputStuff = '';
                },

                addStuff : function(stuff){
                    if(stuff===undefined) stuff = cook.summary[0].inputStuff;
                    cook.summary[0].stuffs.push({
                        stuff_name : stuff
                    });
                },

                removeStuff : function(index){
                    if(index ===undefined){
                        cook.summary[0].stuffs.splice(cook.stuffs.length-1,1);
                    }else{
                        cook.summary[0].stuffs.splice(index,1);
                    }
                },

                initInputTag : function(){
                    cook.summary[0].inputTag = '';
                },

                addTag : function(tag_name){
                    cook.summary[0].tags.push({
                        tag_name : tag_name
                    })
                },

                removeTag : function(index){
                    if(index ===undefined){
                        cook.summary[0].tags.splice(cook.stuffs.length-1,1);
                    }else{
                        cook.summary[0].tags.splice(index,1);
                    }
                },

                addSummary : function(){
                    cook.summary.splice(cook.summary.length-1, 0,{
                        content : '',
                        photo : initImage,
                    });
                },

                removeSummary : function(index){
                    cook.summary.splice(index, 1);
                },

                getSummary : function(index){
                    return cook.summary[index];
                },

                validationCheck : function(){
                    if(stringValidationCheck(cook.summary[0].title, "제목") || stringValidationCheck(cook.summary[0].desc, "간단설명")
                        || tagValidationCheck(cook.summary[0].stuffs,"재료") || tagValidationCheck(cook.summary[0].tags,"태그")
                        || stepValidationCheck(cook.summary, "Step")){
                        return true;
                    }
                    return false;
                },

                setHttpCook : function(){
                    var tempSteps = [];
                    for(var i = 1 ; i < cook.summary.length-1; i++){
                        tempSteps.push({
                            step : i,
                            photo : '',
                            content : cook.summary[i].content
                        });
                    }

                    httpCook = {
                        w_cooker : userinfoService.getuserInfo().cooker_profile._id,
                        title : cook.summary[0].title,
                        desc : cook.summary[0].desc,
                        stuffs : cook.summary[0].stuffs,
                        tags : cook.summary[0].tags,
                        steps : tempSteps
                    }
                },

                submitCook : function(){
                    var url = '';
                    if(!cook.update_flag){
                        url = cookers_config.url+"/rest/recipe/register";
                    }else{
                        url = cookers_config.url+"/rest/recipe/modify/"+cook._id;
                    }

                    var defer = $q.defer();
                    $http({
                        url: url,
                        method: 'POST',
                        data : httpCook
                    }).success(function (data, status, headers, config) {
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        defer.resolve(data);
                    });
                    return defer.promise;

                },

                submitPhoto : function(_id){
                    var tempSteps = [];
                    for(var i = 1 ; i < cook.summary.length-1; i++){
                        tempSteps.push({
                            step : i,
                            photo : cook.summary[i].photo,
                        });
                    }

                    var url = cookers_config.url+'/rest/photo/upload/';

                    var defer = $q.defer();
                    $http({
                        url: url + _id,
                        method: 'POST',
                        data : tempSteps
                    }).success(function (data, status, headers, config) {
                        defer.resolve(data);
                    }).error(function (data, status, headers, config) {
                        defer.resolve(data);
                    });
                    return defer.promise;

                },
                getuserinfo : function(){
                    return userinfoService.getuserInfo().cooker_profile._id;
                },

                setCook : function(new_cook){
                    cook = new_cook;
                }


            }
        }
    ]);
