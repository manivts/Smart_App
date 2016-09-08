var myapp = angular.module('myapp', ["ui.router"])
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
		.state('loginCand', {
              url: "/loginCand",              
              views: {
				'header': {
					templateUrl: 'assets/layout/header.html'
					//controller: 'HeaderController'
				},
				'content': {
					templateUrl: 'login.html'
					//controller: 'ContentController' 
				},
				'footer': {
					templateUrl: 'assets/layout/footer.html'
					//controller: 'FooterController'
				}
			}
          })
		  .state('loginEval', {
              url: "/loginEval",              
              views: {
				'header': {
					templateUrl: 'assets/layout/header.html'
					//controller: 'HeaderController'
				},
				'content': {
					templateUrl: 'login.html'
					//controller: 'ContentController' 
				},
				'footer': {
					templateUrl: 'assets/layout/footer.html'
					//controller: 'FooterController'
				}
			}
          })
		  .state('loginComp', {
              url: "/loginComp",              
              views: {
				'header': {
					templateUrl: 'assets/layout/header.html'
					//controller: 'HeaderController'
				},
				'content': {
					templateUrl: 'login.html'
					//controller: 'ContentController' 
				},
				'footer': {
					templateUrl: 'assets/layout/footer.html'
					//controller: 'FooterController'
				}
			}
          })
		   .state('Signup', {
              url: "/registration",              
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
		
		
	 
	
    })

	.run(['$state', '$stateParams',
    function($state, $stateParams) {
        //this solves page refresh and getting back to state
}]);
