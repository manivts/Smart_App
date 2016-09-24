var myapp = angular.module('myapp', ["ui.router",'ngSanitize', 'MassAutoComplete', 'mgcrea.ngStrap'])
myapp.controller("layoutController",function($scope,$http,dataShare){

});

myapp.controller("header_1",function($scope,$http,dataShare){
         //  $scope.$on('data_shared',function(){
      		 var data = dataShare.data;//dataShare.getData();
					 $scope.sessionusername='';
           $scope.sessionemail=data[0].emailid;
					 
					// $scope.emailid=data;
			
});
//});


myapp.config(function($stateProvider, $urlRouterProvider){

$urlRouterProvider.otherwise('/home');

$stateProvider
	
	// HOME STATES AND NESTED VIEWS ========================================
	.state('home', {
		url: '/home',           
		views: {
		'header': {
				templateUrl: 'assets/layout/header.html'
			//	controller: 'index.html'
			},
			'content': {
				templateUrl: 'home.html'
			//	controller: 'assets/libraries/bootstrap-fileinput/js/fileinput.min.js' 
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
			//	controller: 'index.html'
			}
		}
	})
	.state('login', {
		url: "/login?id",              
		views: {
			'header': {
				templateUrl: 'assets/layout/header.html'
				//controller: 'HeaderController'
			},
			'content': {
				templateUrl: 'login.html',
				controller: 'LoginController'			
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
				//controller: 'FooterController'
			}
		}		 
	  })	  
	   .state('Signup', {
		  url: "/registration?id",              
		  views: {
			'header': {
				templateUrl: 'assets/layout/header.html'
				//controller: 'HeaderController'
			},
			'content': {
				templateUrl: 'registration.html'
				//controller: 'ContentController' 
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
				//controller: 'FooterController'
			}
		}
	  })
	  .state('Candidate', {
		  url: "/CreateProfile",              
		  views: {
			'header': {
				templateUrl: 'assets/layout/headerLoggedin2.html'
				//controller: 'HeaderController'
			},
			'content': {
				templateUrl: 'create-resume.html'//,
				//controller: 'ContentController' 
				/* controller:'CandidateController',
				resolve: {
					auth: ["$q", "authenticationSvc", function($q, authenticationSvc) {
					  var userInfo = authenticationSvc.getUserInfo();

					  if (userInfo) {
						return $q.when(userInfo);
					  } else {
						return $q.reject({ authenticated: false });
					  }
					}]
				} */
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
				//controller: 'FooterController'
			}
		}			
	  })
	  .state('Evaluator', {
		  url: "/CreateProfile",              
		  views: {
			'header': {
				templateUrl: 'assets/layout/headerLoggedin2.html'
				//controller: 'HeaderController'
			},
			'content': {
				templateUrl: 'create-resume.html'
				//controller: 'ContentController'
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
				//controller: 'FooterController'
			}
		}			
	  })
	  .state('Company', {
		  url: "/CreateProfile",              
		  views: {
			'header': {
				templateUrl: 'assets/layout/headerLoggedin.html'
				//controller: 'HeaderController'
			},
			'content': {
				templateUrl: 'candidates.html'
				//controller: 'ContentController'				
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
				//controller: 'FooterController'
			}
		}			
	  })
	  .state('ApplyEval', {
		  url: "/ApplyEvaluation",              
		  views: {
			'header': {
				templateUrl: 'assets/layout/headerLoggedin2.html'
				//controller: 'HeaderController'
			},
			'content': {
				templateUrl: 'apply-evaluation.html'
				//controller: 'ContentController'				
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
				//controller: 'FooterController'
			}
		}			
	  })
	  .state('Dashboard', {
		  url: "/Dashboard",              
		  views: {
			'header': {
				templateUrl: 'assets/layout/headerLoggedin2.html'
				//controller: 'HeaderController'
			},
			'content': {
				templateUrl: 'dashboard1.html'
				//controller: 'ContentController'				
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
				//controller: 'FooterController'
			}
		}			
	  })
	  .state('BankDetails', {
		  url: "/BankDetails",              
		  views: {
			'header': {
				templateUrl: 'assets/layout/headerLoggedin2.html'
				//controller: 'HeaderController'
			},
			'content': {
				templateUrl: 'bank-details.html'
				//controller: 'ContentController'				
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
				//controller: 'FooterController'
			}
		}			
	  })
	   .state('Eval', {
		  url: "/Evaluator",              
		  views: {
			'header': {
				templateUrl: 'assets/layout/headerLoggedin.html'
				//controller: 'HeaderController'
			},
			'content': {
				templateUrl: 'evaluator.html'
				//controller: 'ContentController'				
			},
			'footer': {
				templateUrl: 'assets/layout/footer.html'
				//controller: 'FooterController'
			}
		}			
	  })
})



