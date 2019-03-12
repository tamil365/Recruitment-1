$(function(){
	getCookie();
	var user = firstName;
	$('#loguserName').html( user  );
	
	if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
		displayIaMaster();
	}else{
		window.location.replace("login.html");
	}
	
});
function displayIaMaster(){
	var result=ajaxCall('GET',contextPath()+"master/viewIaMaster");
	if(result.length !=0){
		var j=1;
		$('#IaMasterView tr:gt(0)').remove();
		for(var i in result){
			$('#IaMasterView').append("<tr id=masterRowId"+i+"></tr>");
			$('#masterRowId'+i).append("<td>"+ result[i].name +"</td>");
			$('#masterRowId'+i).append("<td>"+ result[i].type +"</td>");
			$('#masterRowId'+i).append("<td>"+ result[i].description +"</td>");
			$('#masterRowId'+i).append("<td><button class='btn btn-primary' id='reactivateMasterBtn"+i+"' onclick='ResetIaMaster("+ result[i].id +")'> Reactivate </button></td>");
			
			if(roleId==2 || roleId==4 || roleId==5){
				$('#reactivateMasterBtn'+i).prop("disabled", false);
			}else{
				$('#reactivateMasterBtn'+i).prop("disabled", true);
				
			}
		}
	}	
}

function ResetIaMaster(id){
	var result=confirm("Are you sure?");
	        if (result) {
	        
	        		$.ajax({
					type:"GET",
					url:contextPath()+"master/resetIaMaster/"+id+"",
					contentType: 'application/json',
					processData: false,
					success: function( data, textStatus, jQxhr ){
						alert("Master is reactivated successfully");
						 window.location.replace('master.html');
						},    
					 error: function( jqXhr, textStatus, errorThrown ){
				       	alert("Masterdata is not able reactivate")
				       	console.log( errorThrown );
				       }
				   	})
		    }else{
				    	return false;
			   }
}