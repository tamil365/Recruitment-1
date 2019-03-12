$(function(){
	getCookie();
	var user = firstName;
	$('#loguserName').html( user  );
	
	if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
		displayIaClient();
	}else{
		window.location.replace("login.html");
	}
	
});
function displayIaClient(){
	var result=ajaxCall('GET',contextPath()+"client/viewIaClient");
	if(result.length !=0){
		var j=1;
		$('#IaclientView tr:gt(0)').remove();
		for(var i in result){
			$('#IaclientView').append("<tr id=clientRowId"+i+"></tr>");
			$('#clientRowId'+i).append("<td>"+ result[i].clientName +"</td>");
			$('#clientRowId'+i).append("<td>"+ result[i].clientKey +"</td>");
			$('#clientRowId'+i).append("<td><button class='btn btn-primary' id='reactivateClientBtn"+i+"' onclick='ResetIaClient("+ result[i].id +")'> Reactivate </button></td>");
		
			if(roleId==2 || roleId==4 || roleId==5){
				$('#reactivateClientBtn'+i).prop("disabled", false);
			}else{
				$('#reactivateClientBtn'+i).prop("disabled", true);
				
			}
		}
	}	
}

function ResetIaClient(id){
	var result=confirm("Are you sure?");
 
	        if (result) {
	        
	        		$.ajax({
					type:"GET",
					url:contextPath()+"client/resetIaClient/"+id+"",
					contentType: 'application/json',
					processData: false,
					success: function( data, textStatus, jQxhr ){
						alert("Client is reactivated successfully");
						window.location.replace('client.html');
						},					    
						error: function( jqXhr, textStatus, errorThrown ){
							alert("Client is not able reactivate")
							console.log( errorThrown );
					    }
							
				})
	        }
	        else{
	        	alert("New client is not created. Pls check inactive clients before trying again.");
	   }
	
}