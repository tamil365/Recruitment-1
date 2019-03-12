$(function(){
	getCookie();
	var user = firstName;
	$('#loguserName').html( user  );
	
	if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
		displayClient();
		if(roleId==2 || roleId==4 || roleId==5){
			$('#createClientBtn').attr("disabled", false);
			
		}else{
			$('#createClientBtn').attr("disabled", true);
			$('#inactiveClient').attr("disabled", true);
		}
	}else{
		window.location.replace("login.html");
	}
	
	
	$('#addClientform').validate({ 
		rules : {
			clientName : {required : true },
			clientKey : {required : true },
		},
		messages : {
			clientName: {required : "Enter clientName" },
			clientKey : {required : "Enter clientkey" },
			
		}
	});
	
	$('#updateClientform').validate({ 
		rules : {
			clientName : {required : true },
			clientKey : {required : true },
		},
		messages : {
			clientName: {required : "Enter clientName" },
			clientKey : {required : "Enter clientkey" },
			
		}
	});
});
function resetClientFunction() {
	var validator1 = $( "#addClientform" ).validate();
	validator1.resetForm();
	$("#addClientform")[0].reset();
}


function displayClient(){
	var result=ajaxCall('GET',contextPath()+"client/viewClient");
	if(result.length !=0){
		var j=1;
		$('#clientDisplay tr:gt(0)').remove();
		for(var i in result){
			$('#clientDisplay').append("<tr id=clientRowId"+i+"></tr>");
			$('#clientRowId'+i).append("<td>"+ result[i].clientName +"</td>");
			$('#clientRowId'+i).append("<td>"+ result[i].clientKey +"</td>");
			$('#clientRowId'+i).append("<td><button class='btn btn-success' id='editClientBtn"+i+"' onclick='getClientDetail("+ result[i].id +")'><span class='fa  fa-eye'></span> View</button><button class='btn btn-danger'  id='deleteClientBtn"+i+"' onclick='deleteClientDetail("+ result[i].id +")'> Remove</button></td>");
		
			if(roleId==2 || roleId==4 || roleId==5){
				$('#editClientBtn'+i).prop("disabled", false);
				$('#deleteClientBtn'+i).prop("disabled", false);
			}else{
				$('#editClientBtn'+i).prop("disabled", true);
				$('#deleteClientBtn'+i).prop("disabled", true);
				
			}
		}
	}	
}

function createClient(){
	var formdata=$('#addClientform').serializeJSON();
	if ($('#addClientform').valid() == false) return false;
	  $.ajax({
		type:"POST",
		url:contextPath()+"client/addClient",
		contentType: 'application/json',
		data: JSON.stringify(formdata),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	if(data=="success"){
	    		resetClientFunction();
		    	$('#addClientModal').modal('hide');
		    	displayClient();
	    	}else{
	    		alert("New client is not created. Pls check inactive clients before trying again.")
	    		
	    	}
	    	
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    } 
		
	})  
	
}

function getClientDetail(id){
	var result=ajaxCall('GET',contextPath()+"client/getClient/"+id+"");
	if(result.length !=0){
		$('#editClientModal').modal('show');	
		$('#editbaseClientId').val(result.id);
		$('#editClientName').val(result.clientName);
		$('#editClientKey').val(result.clientKey);
	}	
}

function updateClient(){
	var editFormdata=$('#updateClientform').serializeJSON();
	if ($('#updateClientform').valid() == false) return false;
	$.ajax({
		type:"PUT",
		url:contextPath()+"client/updateClient/"+$('#editbaseClientId').val()+"",
		contentType: 'application/json',
		data: JSON.stringify(editFormdata),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	displayClient();
			$('#editClientModal').modal('hide');
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	})
	
}

function deleteClientDetail(id){
	var result=confirm("Are you sure?");
    if (result) {
    	$.ajax({
    		type:"DELETE",
    		url:contextPath()+"client/deleteClient/"+id+"",
    		contentType: 'application/json',
    	    processData: false,
    	    success: function( data, textStatus, jQxhr ){
    	    	alert("Client deleted successfully")
    		    	displayClient();
    	    },
    	    error: function( jqXhr, textStatus, errorThrown ){
    	        console.log( errorThrown );
    	    }
    		
    	})
    	
    }else {
    	return false;
    }
	
	
}