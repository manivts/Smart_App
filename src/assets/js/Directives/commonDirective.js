myapp.directive('passwordValidate', function () {
    return { 
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {

                scope.pwdValidLength = (viewValue && (viewValue.length >= 8 && viewValue.length <= 16) ? 'valid' : undefined);
                scope.pwdHasLowerLetter = (viewValue && /[a-z]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasUpperLetter = (viewValue && /[A-Z]/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasNumber = (viewValue && /\d/.test(viewValue)) ? 'valid' : undefined;
                scope.pwdHasSpecialCharacter = (viewValue && /[$@#!%*?&]/.test(viewValue)) ? 'valid' : undefined;

                if (scope.pwdValidLength && scope.pwdHasLowerLetter && scope.pwdHasUpperLetter && scope.pwdHasNumber && scope.pwdHasSpecialCharacter) {
                    ctrl.$setValidity('pwd', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('pwd', false);
                    return undefined;
                }

            });
        }
    };
});
myapp.directive('emailValidate', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {

                scope.emailHasAt = (viewValue && /[@]/.test(viewValue)) ? 'valid' : undefined;
                scope.emailHasDot = (viewValue && /[.]/.test(viewValue)) ? 'valid' : undefined;
                scope.emailValid = (viewValue && /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test(viewValue)) ? 'valid' : undefined;

                if (scope.emailHasAt && scope.emailHasDot && scope.emailValid) {
                    ctrl.$setValidity('email', true);
                    return viewValue;
                } else {
                    ctrl.$setValidity('email', false);
                    return undefined;
                }

            });
        }
    };
});
myapp.directive("compareTo",  function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function (scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
				//scope.errormsg="Error";
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }
    };
   
});

