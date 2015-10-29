/**
 * Created by airnold on 15. 10. 9..
 */


angular.module('cookers.directives')
    .directive("repeatPassword", function() {

        return {
            require: "ngModel",
            link: function(scope, elem, attrs, ctrl) {

                console.log('aaa');

                var otherInput = elem.inheritedData("$formController");
                console.log(otherInput[0]);


                ctrl.$parsers.push(function(value) {
                    if(value === otherInput.$viewValue) {
                        ctrl.$setValidity("repeat", true);
                        return value;
                    }
                    ctrl.$setValidity("repeat", false);
                });

                otherInput.$parsers.push(function(value) {
                    ctrl.$setValidity("repeat", value === ctrl.$viewValue);
                    return value;
                });
            }
        };
    });
