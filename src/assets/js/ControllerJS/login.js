myapp.controller("LoginController",function($scope,$http,$state,$stateParams,$location,dataShare){
	var loginType = $location.search()['id'];	
	//alert(loginType);
	if(loginType=='Candidate'){
		$scope.pagename='Candidate';
	}
	if(loginType=='Evaluator'){
		$scope.pagename='Evaluator';
	}
	if(loginType=='Company'){
		$scope.pagename='Company';
	}
	
// declaration
	$scope.errorMessage="";


	$scope.IsvisibleLogin=true;
	$scope.IsvisibleForgotPwd=false;
	
	$scope.LoginAccount=function(Login){			
	
		$scope.LoginDetails=[];

		if(Login!=undefined){
          
			if(Login.username && Login.password)
			{		
				$scope.LoginDetails=Login;
				var user=$scope.LoginDetails.username;			
				//Auth.setUser(user);				
				var data = {						
						emailid:Login.username,						
						password:Login.password
					};
					$http.post('http://138.68.16.205:3000/evaluators/getuser', data) 
						.success(
							function(success){
								var emailid=success[0].emailid;
								var usertype=success[0].usertype;
								if (usertype=='Candidate')
								{
            //dataShare.sendData(emailid);
						dataShare.sendData(success);    
								$state.go('Candidate');
								}
								else if (usertype=='Evaluator')
								{
									$state.go('Company');
								}
								//console.log(success);
							})
						.error(function(error){
								$scope.err_login="Invalid Username and Password";
							});	
			}		
			else{
			    	
					$scope.err_login="Username or Password should not be empty";
			}	
		}
        else{
				
					$scope.err_login="Username and Password should not be empty";
			}	

	}
	$scope.ForgotPassword=function(){
		$scope.IsvisibleLogin=false;
		$scope.IsvisibleForgotPwd=true;
	}

	$scope.btnSignup=function(){
		var nextpage=$scope.pagename;
	$state.go('Signup', {id: nextpage});
	}
	$scope.SendMail=function(){
		$scope.IsvisibleLogin=true;
		$scope.IsvisibleForgotPwd=false;
		
		var email= $scope.forgotPassword.email;		
	//	alert(email);
		/*mail sending Code will be here*/
		$scope.forgotPassword.email="";
	}
});

myapp.factory('dataShare',function($rootScope,$timeout){
  var service = {};
  service.data = false;
  service.sendData = function(data){
      this.data = data;
      $timeout(function(){
         $rootScope.$broadcast('data_shared');
      },100);
  };
  service.getData = function(){
    return this.data;
  };
  return service;
});

/* myapp.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (!Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            $location.path('/home');
        }
    });
}]);

myapp.factory('Auth', function(){
var user;

return{
    setUser : function(aUser){
        user = aUser;
    },
    isLoggedIn : function(){
        return(user)? user : false;
    }
  }
}) */





/* myapp.factory("authenticationSvc", function($http, $q, $window) {
  var userInfo;

  function login(userName, password) {
    var deferred = $q.defer();

    $http.post("/api/login", {
      userName: userName,
      password: password
    }).then(function(result) {
      userInfo = {
        accessToken: result.data.access_token,
        userName: result.data.userName
      };
      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      deferred.resolve(userInfo);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    login: login
  };
}); */



/* myapp.directive('passwordValidate', function () {
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
   
}); */