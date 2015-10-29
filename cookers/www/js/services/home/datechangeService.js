/**
 * Created by kimsungwoo on 2015. 10. 25..
 */
angular.module('cookers.services')
    .factory('datechangeService',[function() {
        var date_result= {};
        date_result.changedate= function(getDate){
            var date = new Date(getDate);

            var cal_year = date.getFullYear();
            cal_month = date.getMonth()+ 1,
                cal_date= date.getDate(),
                cal_hour = date.getHours(),
                cal_min = date.getMinutes();

            /*var currentdate = new Date();
             var current_month = currentdate.getMonth() + 1,
             current_date = currentdate.getDate(),
             current_hour = currentdate.getHours(),
             current_min = currentdate.getMinutes();

             console.log("get Date : ");
             console.log("get Month : " + cal_month);
             console.log("get Date : " + cal_date);
             console.log("get hour : " + cal_hour);
             console.log("get minute : " + cal_min);

             console.log("current Date : ");
             console.log("current Month" + current_month);
             console.log("current Date : " + current_date);
             console.log("current hour : " + current_hour);
             console.log("current minute : " + current_min);*/

            return cal_year + "." + cal_month + "." + cal_date + " " + cal_hour + ":" + cal_min
        };
        return date_result;
    }]);
