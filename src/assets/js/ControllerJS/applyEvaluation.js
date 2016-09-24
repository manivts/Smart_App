myapp.controller("EvaluationController",function($scope,$http){
	$scope.applyEvaluation_zone='(GMT-12:00) International Date Line West';
	/* DatePicker */	

	$scope.applyEvaluation_date = new Date();
	$scope.applyEvaluation_time = new Date();
	
	/* End DatePicker */
	//$scope.applyEvalZone='1';
	//$scope.applyEvaluation_zone='1';
	
	
	$scope.ApplyEvaluation=function(applyEvaluation){
        //alert(applyEvaluation.date);
        $scope.dt=angular.element('#aplEvalDate').val();
		$scope.tym=angular.element('#aplEvalTime').val();
		$scope.zone=$scope.applyEvaluation_zone;
		$scope.keySpec=$scope.applyEvaluation_keySpecialization;
		
		var data = {
            emailid:'prabhu@vts.in',
			applyeddate:$scope.dt,
			applyedtime:$scope.tym,
			applyedzone:$scope.zone,
			keyspecialization:$scope.keySpec,
			id:'ddf1-er354'
		
		};
		//http://localhost:3000/evaluators/removeEvaluator/567  \\\\\\\\\ Delete the record \\\\\\\\\\\\\\\\\

		$http.post('http://138.68.16.205:3000/evaluators/applyevaluation', data) 
			.success(
				function(success){
					alert("test");
					console.log(success);
				})
			.error(
				function(error){
					alert("fail");
					console.log(error);
				});
							 
	}
});