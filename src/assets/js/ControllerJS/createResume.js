myapp.controller('CreateResumeController', function($scope, $location, $anchorScroll,$compile,dataShare,$http,anchorSmoothScroll) {
 
	$scope.email_session="";
	$scope.skills = [];
	$scope.experiences = [];
	$scope.educations = [];
	var data=[];
	
	//$scope.$on('data_shared',function(){
	//	data = dataShare.getData();
        data = dataShare.data;
		//$scope.basicDetails=dataShare.getData();
		$scope.sessionusername='';
		$scope.sessionemail=data[0].emailid;
		$scope.basicInfo_firstName=data[0].firstname;
		$scope.basicInfo_surname=data[0].lastname;
		$scope.contactInfo_email=data[0].emailid;
		$scope.email_session=data[0].emailid;
		$scope.basicInfo_uuid=data[0].id;	

	///for page load contactinfo

		var data = {emailid:data[0].emailid};
		$http.post('http://138.68.16.205:3000/evaluators/getcontactinfo',data) 
			.success(function(success){
				$scope.contactInfo_country=success[0].country;
				$scope.contactInfo_city=success[0].city;
				$scope.contactInfo_address=success[0].address;
				$scope.contactInfo_zipcode=success[0].zipcode;
				$scope.contactInfo_phone=success[0].phoneno;	
				$scope.contactInfo_uid=success[0].id;	
			})
			.error(function(error){							
				});		
											
	///for page load contactinfo


	///for page load Summary

		var data1 = {emailid:data.emailid};
		$http.post('http://138.68.16.205:3000/evaluators/getsummaryinfo',data1) 
			.success(function(success){
				$scope.summary_notes=success[0].summary;
				$scope.summary_uid=success[0].id;	
				//alert("sss");
			})
			.error(function(error){							
				});		
											
	///for page load summary

		$scope.loadkeyskills();
		$scope.loadexperience();
		$scope.loadeducation();

   // });


///for  load key skilsgetkeyskills
	$scope.loadkeyskills=function(){
		$http.post('http://138.68.16.205:3000/evaluators/getkeyskills',data = {emailid:$scope.email_session}) 
			.success(function(success){

			//alert('test');
			
			    //$scope.keyskill.indstry="33";
				//$scope.funcnlArea="46";
				
				//angular.element('#selectKeyskill').val("33");
				
				//$scope.indstry="33";
				//$scope.funcnlArea="81";
				
				$scope.keySkills_specialization=success[0].specialization;
			
				$scope.skills=[];

				//alert(success.length);
				if(success.length=='0')
				{
					$scope.skills=[{text: 'test'}];	
				}

				for(i=0;i<success.length;i++)
				{				
					var arraytest=[{ 
							industry:success[i].industry,     
							functionalarea:success[i].functionalarea,
							skillnames:success[i].skillname,             
							yoexp:parseInt(success[i].yearofexp).toString(),
							approved:success[i].approved, 
							rating:parseInt(success[i].rating).toString(), 
							//skillrate:parseInt(success[i].rating).toString(), 
							specialization:success[i].specialization,
						    uid:success[i].id}]	;
					$scope.skills.push(arraytest[0])	;		
				}		  

				var len=$scope.skills.length;
				
				if(len==1){
					$scope.skillsRemove=true;
				}
				if(len>1){
					$scope.skillsRemove=false;
				}	
			})
			.error(function(error){                            
			});     
	}   
///for page load  key skils



///for  load experience skilsgetkeyskills
	$scope.loadexperience=function(){
		$http.post('http://138.68.16.205:3000/evaluators/getuserexperience',data = {emailid:$scope.email_session}) 
			.success(function(success){

				$scope.experiences=[];

				if(success.length=='0')
				{
					$scope.experiences=[{text: 'test'}];						
				}

				for(i=0;i<success.length;i++)
				{
					var arraytest=[{     
							organizationName:success[i].organization,
							expradio:success[i].currentemployer,                     
							designationName:success[i].designation, 
							expShortDescription:success[i].description, 
							uid:success[i].id}]	;
					$scope.experiences.push(arraytest[0])	;		
				}
				var len=$scope.experiences.length;
				
				if(len==1){
					$scope.expRemove=true;
				}
				if(len>1){
					$scope.expRemove=false;
				}	
			})
			.error(function(error){                            
			});     
	}   
///for page load  experience skils


///for  load education 
	$scope.loadeducation=function(){
		$http.post('http://138.68.16.205:3000/evaluators/getusereducation',data = {emailid:$scope.email_session}) 
			.success(function(success){

				$scope.educations=[];

				if(success.length=='0')
				{
					$scope.educations=[{text: 'test'}];
				}

				for(i=0;i<success.length;i++)
				{
					var arraytest=[{     		
						   graduation:success[i].graduation,
						   specialization:success[i].specialization,                     
						  eduShortDescription:success[i].designation, 
						 //   expShortDescription:success[i].description, 
							uid:success[i].id}]	;
							$scope.educations.push(arraytest[0]);		
				}
				
				var len=$scope.educations.length;
				if(len==1){
					$scope.eduRemove=true;
				}
				if(len>1){
					$scope.eduRemove=false;
				}	

			})
			.error(function(error){                            
			});     
	}   
///for page load  education skils


///////////////////////////// added by prabhu   Update Profile////////////////////////

	$scope.UpdateBasicInfo=function(){
		var fname= $scope.basicInfo_firstName;
		var sname= $scope.basicInfo_surname;
		 
		$scope.basicinfo=false; 
	}

/////////// added by prabhu   contactinfo Profile//////////


	$scope.UpdateContactInfo=function(){
		var country= $scope.contactInfo_country;
		var city= $scope.contactInfo_city;
		var address= $scope.contactInfo_address;
		var zipcode= $scope.contactInfo_zipcode;
		var phone= $scope.contactInfo_phone;
		var email= $scope.contactInfo_email;
		var uid=$scope.contactInfo_uid;
	//	alert(uid);

		var ContactInfo={
			emailid:email,
		    country:country,
			city:city,
			address:address,
			phoneno:phone,			
			zipcode:zipcode,
			approved:'1',
			id:uid
		};
		$http.post('http://138.68.16.205:3000/evaluators/contactinfo',ContactInfo) 
			.success(function(success){
				$scope.contactInfo_uid=success.id;
				
					})
			.error(function(error){							
				});		
				
		$scope.contactinfo=false;
	}

/////////// added by prabhu   contactinfo Profile//////////

/////////// added by prabhu   summary Profile//////////


	$scope.UpdateSummary=function(){
	 
		var summary_notes= $scope.summary_notes;
		var uid=$scope.summary_uid;

		var SummaryInfo={
			emailid:$scope.email_session,
			summary:summary_notes,
			approved:'1',
			id:uid
		};
		$http.post('http://138.68.16.205:3000/evaluators/summaryinfo',SummaryInfo) 
			.success(function(success){
				$scope.summary_uid=success.id;												
				})
			.error(function(error){		
				alert("fail");					
				});	
				
		$scope.smry=false;
	}

/////////// added by prabhu   summary Profile//////////


///////////////////////////// added by prabhu Update Profile////////////////////////


 /*-Page Load-*/ 
	$scope.basicinfo=false;
	$scope.contactinfo=false;
	$scope.smry=false;
	$scope.keyskills=false;
	$scope.certificate=false;
	$scope.exp=false;
	$scope.edu=false;  
    $scope.skillsRemove=false;
	$scope.expRemove=false;
	$scope.eduRemove=false;
	$scope.certRemove=false;
	$scope.indstry="33";
	$scope.funcnlArea="81"; 

	//$scope.indstry="8";
	
	//$scope.yoexp="1";
/* 	$scope.skillrate="1";	[
		{text: 'test'}
	]; */
	//$scope.keySkills_specialization="Specialization";	
	
	/*-Autocomplete Skills-*/
	
	//$scope.skills = {};
	 var requiredskills = ['C#', '.Net', 'ASP.Net','ADO.Net','JAVA','JQuery','AngularJs','JavaScript','PHP'];

	  function suggest_skills(term) {
		var q = term.toLowerCase().trim();
		var results = [];
		// Find first 10 requiredskills that start with `term`.
		for (var i = 0; i < requiredskills.length && results.length < 10; i++) {	
		  var rqdskills = requiredskills[i];
		  if (rqdskills.toLowerCase().indexOf(q) === 0)
			results.push({ label: rqdskills, value: rqdskills });
		}
		return results;
	  }

	  $scope.autocomplete_skillOptions = {
		suggest: suggest_skills
	  };
	  
	/*-Autocomplete Certification-*/  
	
	  var certifications = ['JAVA', '.NET', 'ORACLE','CISCO'];

	  function suggest_certification(term) {
		var q = term.toLowerCase().trim();
		var results = [];
		// Find first 10 certifications that start with `term`.
		for (var i = 0; i < certifications.length && results.length < 10; i++) {	
		  var certificatn = certifications[i];
		  if (certificatn.toLowerCase().indexOf(q) === 0)
			results.push({ label: certificatn, value: certificatn });
		}
		return results;
	  }

	  $scope.autocomplete_certificationOptions = {
		suggest: suggest_certification
	  };
 
 /*-End Page Load-*/
 
 /*-Edit Profile-*/
	$scope.EditBasicInfo=function(){
		$scope.basicinfo=false; 
	}
	$scope.EditContactInfo=function(){
		$scope.contactinfo=false;
	}
	$scope.EditSummary=function(){
		$scope.smry=false;
	}
	$scope.EditKeyskills=function(){
		$scope.keyskills=false;
	}
	$scope.EditCertification=function(){
		$scope.certificate=false;
	}
	$scope.EditExperience=function(){
		$scope.exp=false;
	}
	$scope.EditEducation=function(){
		$scope.edu=false;
	} 
 /*-End Edit Profile-*/
  
 /*-Update Profile-*/
	$scope.UpdateBasicInfo=function(){
		var fname= $scope.basicInfo_firstName;
		var sname= $scope.basicInfo_surname;
		 
		$scope.basicinfo=false; 
	}

	
	$scope.UpdateKeySkills=function(keySkills){
		var industry=$scope.keyskill_Industry;
	    var functionalarea=$scope.keyskill_FunctionaArea;
		var specialization=$scope.keySkills_specialization;
        var arr=$scope.skills;


		//$scope.skills.length=0;
		angular.forEach(arr, function(value, key) {	
			
		//	alert(value.uid);
			var data={
					emailid:$scope.email_session,
					industry:industry,	
					functionalarea:functionalarea,
					skillname:value.skillnames,			
					yearofexp:value.yoexp,
					approved:'1',
					rating:value.rating,
					specialization:specialization,
					id:value.uid
					}
					$http.post('http://138.68.16.205:3000/evaluators/profilekeyskills', data) 
								.success(function(success){
							$scope.loadkeyskills();
							  //   alert("ss");							
									})
								.error(function(error){		
										alert("fail");					
									});		 
							
		});

/*			
		$scope.SkillArr=[];
		var arr=$scope.skills;
		angular.forEach(arr, function(value, key) {		
			var skll={};	
			skll.emailid=$scope.email_session;
			skll.industry=industry;	
			skll.functionalarea=functionalarea;
			skll.skillname=value.skillnames;			
			skll.yearofexp=value.yearsofexp;
			skll.approved='1';
			skll.rating=value.rating;
			skll.specialization=specialization;
			$scope.SkillArr.push(skll);
		});

		$http.post('http://localhost:3005/evaluators/profilekeyskills',$scope.SkillArr) 
						.success(function(success){
		                 alert("ss");							
							})
						.error(function(error){		
								alert("fail");					
							});		 
							*/
		$scope.keyskills=false;
	} 




	$scope.UpdateCertification=function(){
	    $scope.CertificationArr=[];
		var arr=$scope.certificationLists;
		angular.forEach(arr, function(value, key) {		
			var certifictn={};
			certifictn.industrycertification=value.IndustryCertification[key];	
			
			$scope.CertificationArr.push(certifictn);
		});
		
		$scope.certificate=false;
	}



/////////// Update the experience////////////////////////

	$scope.UpdateExperience=function(experience){
	//	$scope.ExpArr=[];
		var arr=$scope.experiences;	
		angular.forEach(arr, function(value, key) {
        
        var fromdate=angular.element(".expFromDate").val();
		var todate=angular.element(".expToDate").val();
		
		var data={
	        emailid:$scope.email_session,
			organization:value.organizationName,
			designation:value.designationName,		
			currentemployer:'yes',		//expradio	
			description:value.expShortDescription,
			approved:'yes',
			id:value.uid			
			}
		$http.post('http://138.68.16.205:3000/evaluators/profileexperience', data) 
			.success(function(success){
				$scope.loadexperience();						
			})
			.error(function(error){		
				alert("fail");					
			});
});
	 /*	angular.forEach(arr, function(value, key) {		
			var exprnce={};
			exprnce.org=value.organizationName;
			exprnce.desig=value.designationName;
			exprnce.fdate=value.fromDate;
			exprnce.tdate=value.toDate;
			exprnce.employer=value.expradio;			
			exprnce.shrtdesc=value.expShortDescription;
						
			$scope.ExpArr.push(exprnce);
		});
*/
		$scope.exp=false;
	}
/////////// Update the experience////////////////////////




/////////// Update the education///////////////////////
	$scope.UpdateEducation=function(education){
		$scope.EduArr=[];
		var arr=$scope.educations;	
		var fromdate=angular.element(".eduFromDate").val();
		var todate=angular.element(".eduToDate").val();

		angular.forEach(arr, function(value, key) {		
			var educatn={
			emailid:$scope.email_session,
			graduation:value.graduation,
			specialization:value.specialization,
		//	learningtype:'yes',			
		//institute:institute,
			description:value.eduShortDescription,
			approved:'1',
			id:value.uid
			};
			$http.post('http://138.68.16.205:3000/evaluators/profileeducation', educatn) 
						.success(function(success){
							alert("dd");
				//	$scope.loadexperience();						
							})
						.error(function(error){		
								alert("fail");					
		});
			
		});

		$scope.edu=false;
	}
 /*-End Update Profile-*/
  /////////// Update the education///////////////////////

 /*-Clone-*/ 
/*	$scope.skills = [
		{text: 'test'}
	];*/
	$scope.cloneSkills = function(skill){
		var skl=$compile(skill)($scope);
		$scope.skills.push(angular.copy(skl));	
        var len=$scope.skills.length;
		//alert(len);
		if(len==1){
			$scope.skillsRemove=true;
		}
		if(len>1){
			$scope.skillsRemove=false;
		}				
	}; 

	/*$scope.experiences = [
		{text: 'test'}
	];*/
	$scope.cloneExperience = function(experience){
		var expr=$compile(experience)($scope);
		$scope.experiences.push(angular.copy(expr));
		var len=$scope.experiences.length;
		//alert(len);
		if(len==1){
			$scope.expRemove=true;
		}
		if(len>1){
			$scope.expRemove=false;
		}			
	};   

/*	$scope.educations = [
		{text: 'test'}
	];*/
	$scope.CloneEducation = function(education){
		var educ=$compile(education)($scope);
		$scope.educations.push(angular.copy(educ));

		var len=$scope.educations.length;
		if(len==1){
			$scope.eduRemove=true;
		}
		if(len>1){
			$scope.eduRemove=false;
		}			
	};  
	
	$scope.certificationLists = [
		{text: 'test'}
	];
	$scope.cloneCertification = function(certification){
		var cert=$compile(certification)($scope);
		$scope.certificationLists.push(angular.copy(cert));	
        
        var len=$scope.certificationLists.length;
		if(len==1){
			$scope.certRemove=true;
		}
		if(len>1){
			$scope.certRemove=false;
		}			
	};  
	
 /*-End Clone Education-*/  
   
 /*-Remove Clone-*/ 
	$scope.removeSkills=function(indexno){
		var uid=$scope.skills[indexno].uid;
		$scope.skills.splice(indexno,1);
		var remdata={id:uid};
		//alert(uid);
		$http.post('http://138.68.16.205:3000/evaluators/deletekeyskils',remdata ) 
			.success(function(success){			
				if(success.length=='0')
				{
					$scope.skills=[{text: 'test'}];
				}
                var len=$scope.skills.length;
				
				if(len==1){
					$scope.skillsRemove=true;
				}
				if(len>1){
					$scope.skillsRemove=false;
				}				
			})
			.error(function(error){
							
		    });
        var len=$scope.skills.length;
		
		if(len==1){
			$scope.skillsRemove=true;
		}
		if(len>1){
			$scope.skillsRemove=false;
		}				
	}  
	
	$scope.removeExperience=function(indexno){
		$scope.experiences.splice(indexno,1);	

		var remdata={id:'uid'};
		//alert(id);
		$http.post('http://138.68.16.205:3000/evaluators/deletekeyskils',remdata ) 
			.success(function(success){			
				if(success.length=='0')
				{
					$scope.experiences=[{text: 'test'}];
				}
				var len=$scope.experiences.length;
				//alert(len);
				if(len==1){
					$scope.expRemove=true;
				}
				if(len>1){
					$scope.expRemove=false;
				}	
			})
			.error(function(error){								
			});
		
		var len=$scope.experiences.length;
		//alert(len);
		if(len==1){
			$scope.expRemove=true;
		}
		if(len>1){
			$scope.expRemove=false;
		}	
	} 
	
	$scope.removeEducation=function(indexno){
		$scope.educations.splice(indexno,1);	

		var remdata={id:'uid'};
		//alert(id);
		$http.post('http://138.68.16.205:3000/evaluators/deletekeyskils',remdata ) 
			.success(function(success){			
				if(success.length=='0')
				{
					$scope.educations=[{text: 'test'}];
				}
				var len=$scope.educations.length;				
				if(len==1){
					$scope.eduRemove=true;
				}
				if(len>1){
					$scope.eduRemove=false;
				}					
			})
			.error(function(error){							
			});
			
		var len=$scope.educations.length;				
		if(len==1){
			$scope.eduRemove=true;
		}
		if(len>1){
			$scope.eduRemove=false;
		}				
	} 
	
	$scope.removeCertification=function(indexno){
		$scope.certificationLists.splice(indexno,1);

        var len=$scope.certificationLists.length;
		if(len==1){
			$scope.certRemove=true;
		}
		if(len>1){
			$scope.certRemove=false;
		}					
	} 
 /*-End Remove Clone-*/
      
  
 /*-Check FILE Isvalid-*/
    $scope.ChechFileValid = function (file) {
        $scope.isValid = false;  
        if (file.length!=0) {
            for (i = 0; i < file.length; i++) {
                if (file[i] != "") {
                    if ((file[i].type == 'image/png' || file[i].type == 'image/jpeg' || file[i].type == 'image/gif') && file[i].size <= (512 * 1024)) {
                        $scope.isValid = "true";
                    }
                    else {
                        $scope.isValid = "false";
                        break;
                    }
                }
            }
        }
        $scope.IsFileValid = $scope.isValid;
    };
	
	$scope.CheckResumeValid = function (file) {
        $scope.isValidResume = false;  
        if (file.length!=0) {
            for (i = 0; i < file.length; i++) {
                if (file[i] != "") {
                    if (file[i].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
						//application/vnd.openxmlformats-officedocument.wordprocessingml.document
                        $scope.isValidResume = "true";
                    }
                    else {
                        $scope.isValidResume = "false";
                        break;
                    }
                }
            }
        }
        $scope.IsResumeValid = $scope.isValidResume;
    };
 /*-End Check File Valid-*/
	
	
 /*-File Uploading-*/
	$scope.SelectedFileForUpload = [];
	$scope.selectFileforUpload = function (file) {		
        $scope.FileForUpload = file[0];
		$scope.SelectedFileForUpload.push($scope.FileForUpload);
    }
	
	$scope.UploadedResume = [];
	$scope.UploadResume = function (file) {		
        $scope.FileForUploadResume = file[0];
		$scope.UploadedResume.push($scope.FileForUploadResume);
    }
 /*-End of File Uploading-*/ 
    
 /*-Scroll Navigation-*/  
  /* $scope.scrollTo = function(id) {
    $location.hash(id);
    console.log($location.hash());
    $anchorScroll();
  }; */
   $scope.scrollTo = function(id) {  
	 $location.hash(id);
     anchorSmoothScroll.scrollTo(id);
  };
 /*-End Scroll Navigation-*/ 
});

myapp.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);speed
        if (speed >= 20) speanchorSmoothScrolled = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
});

myapp.directive('isNumber', function () {
	return {
		require: 'ngModel',
		link: function (scope) {	
			scope.$watch('skill.yoexp', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] == '-' || arr[0] === '.' )) return;
                if (arr.length === 2 && newValue === '-.') return;
                if (isNaN(newValue)) {
                    scope.skill.yoexp = oldValue;
                }
            });
		}
	};
});

myapp.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'MM/dd/yyyy'//,
    //startWeek: 1
  });
})
