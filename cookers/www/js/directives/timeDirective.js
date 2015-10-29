/**
 * Created by kimsungwoo on 2015. 10. 15..
 */
angular.module('cookers.directives')
    .directive('timeDirective',function() {
        return {
            restrict: 'E',
            scope: {
                gettimeData: '=timeData'

            },
            template: '<span style="float:right; font-size:12px; color:lightslategrey;">{{time_result}}</span>',

            link: function (scope, element, attributes, controller) {

                var date = new Date(scope.gettimeData);

                var cal_month = date.getMonth()+ 1,
                    cal_date= date.getDate(),
                    cal_hour = date.getHours(),
                    cal_min = date.getMinutes();

                scope.time_result = cal_month + "월 " + cal_date + "일 " + cal_hour + "시 " + cal_min + "분"
            }
        }
    });
