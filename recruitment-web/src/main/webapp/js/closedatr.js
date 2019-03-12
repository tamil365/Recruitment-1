$(document).ready(function(){
	getCookie();
	
	var user = firstName;
	$('#loguserName').html( user  );
	if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
		closeAtrDetail();
		
	}else{
		window.location.replace("login.html");
	}
	
});


function closeAtrDetail(){
	var result=ajaxCall('GET',contextPath()+"atr/closedatr");
	if(result.length !=0){
		var j=1;
		$('#closedatrDisplay tr:gt(0)').remove();
		for(var i in result){
			$('#closedatrDisplay').append("<tr id=closedatrRowId"+i+"></tr>");
			$('#closedatrRowId'+i).append("<td>"+ j++ +"</td>");
			$('#closedatrRowId'+i).append("<td>"+ result[i].jobDescription +"</td>");
			$('#closedatrRowId'+i).append("<td>"+ result[i].noOfPosition +"</td>");
			$('#closedatrRowId'+i).append("<td>"+ result[i].role +"</td>");
			$('#closedatrRowId'+i).append("<td>"+ result[i].clientName +"</td>");
			$('#closedatrRowId'+i).append("<td>"+ result[i].location +"</td>");
		}
	}

}