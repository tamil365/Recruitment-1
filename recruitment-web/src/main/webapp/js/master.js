$(function(){
	getCookie();
	var user = firstName;
	$('#loguserName').html( user  );
	
	if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
		displayMaster();
		if(roleId==2 || roleId==4 || roleId==5){
			$('#createMasterBtn').attr("disabled", false);
			
		}else{
			$('#createMasterBtn').attr("disabled", true);
		}
	}else{
		window.location.replace("login.html");
	}
	
	
	$('#addMasterform').validate({ 
		rules : {
			type : {required : true,selectcheck : true },
			name : {required : true, minlength : 4 },
			description : {description : true },
		},
		messages : {
			type : {required : "Select master type",selectcheck : true },
			name: {required : "Enter master name",  minlength :"Enter atleast 4 character"  },
			description: {description:"Enter valid description" },
			
		}
	});
});

function resetMasterFunction() {
	var validator1 = $( "#addMasterform" ).validate();
	validator1.resetForm();
	$("#addMasterform")[0].reset();
}



function displayMaster(){
	var result=ajaxCall('GET',contextPath()+"master/viewMaster");
	
	if(result.length !=0){
		
		var j=1;
		$('#masterDisplay tr:gt(0)').remove();
		for(var i in result){
			$('#masterDisplay').append("<tr id=masterRowId"+i+"></tr>");
			$('#masterRowId'+i).append("<td class='text-capitalize'>"+ result[i].name +"</td>");
			$('#masterRowId'+i).append("<td class='text-capitalize'>"+ result[i].type +"</td>");
			$('#masterRowId'+i).append("<td class='text-capitalize'>"+ result[i].description +"</td>");
			$('#masterRowId'+i).append("<td><button class='btn btn-success' id='editMasterBtn"+i+"' onclick='getMasterDetail("+ result[i].id +")'><span class='fa  fa-eye'></span> View</button><button class='btn btn-danger' id='deleteMasterBtn"+i+"' onclick='deleteMasterDetail("+ result[i].id +")'> Remove</button></td>");
		
			if(roleId==2 || roleId==4 || roleId==5){
				$('#editMasterBtn'+i).prop("disabled", false);
				$('#deleteMasterBtn'+i).prop("disabled", false);
			}else{
				$('#editMasterBtn'+i).prop("disabled", true);
				$('#deleteMasterBtn'+i).prop("disabled", true);
				
			}
		}
	}	
}

function createMaster(){
	var formdata=$('#addMasterform').serializeJSON();
	
	var Uid=userId;
	
	if ($('#addMasterform').valid() == false) return false;
	  $.ajax({
		type:"POST",
		url:contextPath()+"master/addMaster/"+Uid+"",
		contentType: 'application/json',
		data: JSON.stringify(formdata),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	if(data=="success"){
	    		resetMasterFunction();
		    	$('#addMasterModal').modal('hide');
		    	displayMaster();
	    	}
	    	else{
	    		alert("Not able to create. Please check Inactive Master before adding this data" );
	    	}
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    } 
		
	})  
	
}

function getMasterDetail(id){
	console.log(id);
	var result=ajaxCall('GET',contextPath()+"master/getMaster/"+id+"");
	console.log(result);
	if(result.length !=0){
		$('#editMasterModal').modal('show');	
		$('#editbaseMasterId').val(result.id);
		$('#editMasterName').val(result.name);
		$('#editMasterType').val(result.type); 
		$('#editmasterdescript').val(result.description);
	}	
}

function updateMaster(){
	var editFormdata=$('#updateMasterform').serializeJSON();
	$.ajax({
		type:"PUT",
		url:contextPath()+"master/updateMaster/"+$('#editbaseMasterId').val()+"",
		contentType: 'application/json',
		data: JSON.stringify(editFormdata),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	displayMaster();
			$('#editMasterModal').modal('hide');
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	})
	
}

function deleteMasterDetail(id){
	var result=confirm("Are you sure?");
	    if (result == true) {
	        	$.ajax({
	        		type:"DELETE",
	        		url:contextPath()+"master/deleteMaster/"+id+"",
	        		contentType: 'application/json',
	        	    processData: false,
	        	    success: function( data, textStatus, jQxhr ){
	        	    	alert("Masterdata deleted successfully")
	        		    	displayMaster();
	        	    },
	        	    error: function( jqXhr, textStatus, errorThrown ){
	        	    	alert("Masterdata is not able to delete")
	        	    	console.log( errorThrown );
	        	    }
	        		
	       	})
	    }
	    else{
	    	return false;
	    }
	
}


