$(document).ready(function(){
	getCookie();
	selectLocation();
	selectSkills();
	loadClient();
	loadAssignedManager(userId,roleId);
	var user = firstName;
	$('#loguserName').html( user  );
	//date pickers
	$("#completionDate").datepicker({
		format : 'dd/mm/yyyy',
		todayHighlight: true,
		changeMonth : true,
		changeYear : true,
		yearRange : '0Y:+1',
		minDate : "+0M +0D",
		maxDate : "+12M +0D",
		onClose: function() {$(this).valid();} 
	
	});
	
	$("#editCompletionDate").datepicker({
		format : 'dd/mm/yyyy',
		todayHighlight: true,
		changeMonth : true,
		changeYear : true,
		yearRange : '0Y:+1',
		minDate : "+0M +0D",
		maxDate : "+12M +0D",
		onClose: function() {$(this).valid();} 
		
	});
	
	var atrId=unescape(GetURLParameter("atrId"));
	if(atrId === "undefined"){
		$('#h5create,#addatrform').attr("hidden", false);
		if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
			if(roleId==2 || roleId==4 || roleId==5){
				//login sale executive roleid  load on sales manager.
				/*if(roleId==5){
					loadAssignedManager(userId,roleId);
					
				//login manager Role 	
				}else if(roleId==2 || roleId==4){
					loadAssignedManager(userId,roleId);
					
				}*/
			}else{
				$('#createAtrBtn').prop("disabled", true);
			}
			
		}else{
			window.location.replace("login.html");
		}
		
	}else{ // create atr details
		$("#h5edit,#updateAtrform").attr("hidden", false);
		getAtrDetail(atrId);
		if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
			if(roleId==2 || roleId==4 || roleId==5){
				//login sale executive roleid  load on sales manager.
				/*if(roleId==5){
					loadAssignedManager(userId,roleId);
					
				//login manager Role 	
				}else if(roleId==2 || roleId==4){
					loadAssignedManager(userId,roleId);
					
				}*/
			}else{
				
				$('#updateAtrBtn').prop("disabled", true);
			}
			
		}else{
			window.location.replace("login.html");
		}
	}
	
	/*if(e.which == 13) {
		$('#createAtrBtn').trigger('click');
		return false;
    }*/
	
	

	$('#addatrform').validate({ 
		rules : {
			//aTRID : {required : true },
			noOfPosition : {required : true , numericonlyallowed :true},
			jobDescription : {required : true ,minlength : 2},
			role : {required : true , minlength : 2 },
			skills : {required : true },
			completionDate : {required : true},
			location : {required : true },
			minSalary : {required : true , numericonlyallowed :true},
			maxSalary : {required : true , numericonlyallowed :true},
			experience : {required : true , numericonlyallowed :true},
			clientId : {required : true, selectcheck: true},
			assignedTo:{required : true, selectcheck: true},
		},
		messages : {
			//aTRID: {required : "Enter aTRID" , numericonlyallowed :"Enter valid number"},
			noOfPosition : {required : "Enter number of position" ,  numericonlyallowed : "Enter valid number"},
			jobDescription : {required : "Enter job description"},
			role : {required : "Enter role" , minlength :"Enter atleast 2 characters"},
			
			skills : {required : "Select skills"},
			completionDate : {required : "Select date"},
			
			location : {required : "Enter location"},
			minSalary : {required : "Enter minimum salary" , numericonlyallowed :"Enter valid number"},
			maxSalary : {required : "Enter maximum salary" , numericonlyallowed :"Enter valid number"},
			experience : {required : "Enter experience (in years)" , numericonlyallowed :"Enter valid number"},
			clientId : {required : "Select client" , selectcheck: true },
			assignedTo : {required : "Select assigned to" , selectcheck: true },
		}
	});
	
});

$("form #addatrform").bind("keypress", function(e) {
    if (e.keyCode == 13) return false;
});

$("form #updateAtrform").bind("keypress", function(e) {
    if (e.keyCode == 13) return false;
});

function selectLocation() {
	var data=ajaxCall('GET',contextPath()+"master/viewLocation");
	console.log(data);
	if(data.length !=0){
		$("#location option:gt(0)").remove();
		$("#editLocation option:gt(0)").remove();
		for (var i = 0; i < data.length; i++) {
			 opt = "<option class='text-capitalize' value='" + data[i].id + "'>"
					+ data[i].name + "</option>";
			$('#location').append(opt);
			$('#editLocation').append(opt);
		}	
	}
}

function selectSkills() {
	var data=ajaxCall('GET',contextPath()+"master/viewSkills");
	console.log(data);
	if(data.length !=0){
		$("#skills option:gt(0)").remove();
		$("#editSkills option:gt(0)").remove();
		for (var i = 0; i < data.length; i++) {
			 opt = "<option class='text-capitalize' value='" + data[i].id + "'>"
					+ data[i].name + "</option>";
			$('#skills').append(opt);
			$('#editSkills').append(opt);
		}	
	}
}


//load client list
function loadClient(){
	var data=ajaxCall('GET',contextPath()+"client/viewClient");
	if(data.length !=0){
		$("#clientId option:gt(0)").remove();
		$("#editClientId option:gt(0)").remove();
		for (var i = 0; i < data.length; i++) {
			 opt = "<option class='text-capitalize' value='" + data[i].id + "'>"
					+ data[i].clientName + "</option>";
			$('#clientId').append(opt);
			$('#editClientId').append(opt);
		}	
	}
		
}
// assigned To list load
function loadAssignedManager(userId,roleId){
	var data=ajaxCall('GET',contextPath()+"atr/assignManagerList?userId="+userId+"&roleId="+roleId+"");
	if(data !=undefined){
	    $("#assignedToList option:gt(0)").remove();
	    $("#editAssignedToList option:gt(0)").remove();
		for (var i = 0; i < data.length; i++) {
			var  opt = "<option class='text-capitalize' value='" + data[i].userId + "'>"
					+ data[i].userName + "</option>";
			$('#assignedToList').append(opt);
			$('#editAssignedToList').append(opt);
			
		}
    } 
}
//reset the value after added form
function resetAtrFunction() {
	var validator1 = $( "#addatrform" ).validate();
	validator1.resetForm();
	$("#addatrform")[0].reset();
}

//atr creation
function createAtr(){
	var noOfPosition = $('#noOfPosition').val(); 
	var jobDescription = $('#jobDescription').val(); 
	var role = $('#role').val(); 
	var skills = $('#skills').val(); 
	var completionDate = $('#completionDate').val(); 
	var location = $('#location').val(); 
	var minSalary = $('#minSalary').val(); 
	var maxSalary = $('#maxSalary').val(); 
	var experience = $('#experience').val(); 
	var clientId = $('#clientId').val(); 
	var assignedTo =$('#assignedToList').val(); 
	
	if ($('#addatrform').valid() == false) return false;
	  $.ajax({
		type:"POST",
		url:contextPath()+"atr/addAtrForm?createdBy="+userId+"",
		contentType: 'application/json',
		data: JSON.stringify({noOfPosition:noOfPosition,jobDescription:jobDescription,skills:skills,role:role,completionDate:completionDate,location:location,minSalary:minSalary, maxSalary:maxSalary,experience:experience,clientId:clientId,assignedTo:assignedTo}),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	if(data=="success"){
  			resetAtrFunction();
  			window.location.replace("atr.html?return=1");
	    	}
	    	else{
	    		alert("Not able to create. Pls try again");
	    	}
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	   	alert("Not able to create. Pls try again");
	    	//console.log( errorThrown );
	    } 
		
	})
}

function getAtrDetail(id){
		var result=ajaxCall('GET',contextPath()+"atr/singleAtr/"+id+"");
		console.log(result);
		if(result.length !=0){
			$('#editbaseAtrId').val(result.id);
			$('#editNoOfPosition').val(result.noOfPosition);
			$('#editJobDescription').val(result.jobDescription);
			$('#editRole').val(result.role);
			$("#editSkills option[value='"+result.skills+"']").prop('selected','selected');
			$('#editCompletionDate').val(dateDisplay(result.completionDate));
			$("#editLocation option[value='"+result.location+"']").prop('selected','selected');
			$('#editMinSalary').val(result.minSalary);
			$('#editMaxSalary').val(result.maxSalary);
			$('#editExperience').val(result.experience);
			$("#editClientId option[value='"+result.clientId+"']").prop('selected','selected');
			$("#editAssignedToList option[value='"+result.assignedTo+"']").prop('selected','selected');
		}
		
}

function updateATRDetails(){
	
	//var editFormdata=$('#updateAtrform').serializeJSON();
	//alert(JSON.stringify(editFormdata));
	var noOfPosition = $('#editNoOfPosition').val(); 
	var jobDescription = $('#editJobDescription').val(); 
	var role = $('#editRole').val(); 
	var skills = $('#editSkills').val(); 
	var completionDate = $('#editCompletionDate').val(); 
	var location = $('#editLocation').val(); 
	var minSalary = $('#editMinSalary').val(); 
	var maxSalary = $('#editMaxSalary').val(); 
	var experience = $('#editExperience').val(); 
	var clientId = $('#editClientId').val(); 
	var assignedTo = $('#editAssignedToList').val();
	var id = $('#editbaseAtrId').val();
	
	$.ajax({
		type:"PUT",
		url:contextPath()+"atr/updateAtr/"+$('#editbaseAtrId').val()+"?createdBy="+userId+"&roleId="+roleId+"",
		contentType: 'application/json',
		data: JSON.stringify({id:id,noOfPosition:noOfPosition,jobDescription:jobDescription,skills:skills,role:role,completionDate:completionDate,location:location,minSalary:minSalary, maxSalary:maxSalary,experience:experience,clientId:clientId,assignedTo:assignedTo}),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	alert("ATR updated Successfully")
	    	window.location.replace("atr.html?return=1");
	    		
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	        alert("ATR not updated ")
	    }
		
	})
	
	
}


