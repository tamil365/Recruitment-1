$(function(){
	getCookie();
	var user = firstName;
	$('#loguserName').html( user  );
	
	if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
		selectReport();
	}else{
		window.location.replace("login.html");
	}
		
});

function selectRecruiter (recruiter) { 

	 $('#container-statuscategory').attr("hidden", true); 
$.get( contextPath()+"/report/getStatusReportListByRecruiter/"+recruiter, function( data ) {
	var reportArr =[];
	for(var i=0; i< data.length; i++){
		var report = [];
		var atrUID = data[i].atrpos;
		var atrId = data[i].atrId;
		var positionId = data[i].positionId;
		var atrStatus = data[i].atrStatus;
		var positionStatus = data[i].positionStatus; 
		var userName = data[i].userName;
		var location = data[i].location;
		var client = data[i].client;
		report = [atrId,positionId,atrStatus,positionStatus,userName, location, client]; 
		reportArr.push(report);
	}  
	$('#example').empty();
	$('#example').DataTable( {
	    data: reportArr,
	    "bDestroy": true,
	    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
	    columns: [
	    	
	        { title: "ATR ID" },
	        { title: "Position ID" },
	        { title: "ATR Status" },
	        { title: "Position Status" },
	        { title: "Assigned To" },
	        { title: "Location" },
	        { title: "Client" }
	    ]
	} );
	 
	});
}


function selectClient (client) { 

	 $('#container-statuscategory').attr("hidden", true); 
$.get( contextPath()+"/report/getStatusReportListByClient/"+client, function( data ) {
	var reportArr =[];
	for(var i=0; i< data.length; i++){
		var report = [];
		var atrUID = data[i].atrpos;
		var atrId = data[i].atrId;
		var positionId = data[i].positionId;
		var atrStatus = data[i].atrStatus;
		var positionStatus = data[i].positionStatus; 
		var userName = data[i].userName;
		var location = data[i].location;
		var client = data[i].client;
		report = [atrId,positionId,atrStatus,positionStatus,userName, location, client]; 
		reportArr.push(report);
	}  
	$('#example').empty();
	$('#example').DataTable( {
	    data: reportArr,
	    "bDestroy": true,
	    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
	    columns: [
	    	
	        { title: "ATR ID" },
	        { title: "Position ID" },
	        { title: "ATR Status" },
	        { title: "Position Status" },
	        { title: "Assigned To" },
	        { title: "Location" },
	        { title: "Client" }
	    ]
	} );
	 
	});
}


function selectLocation (location) {
	debugger;

	 $('#container-statuscategory').attr("hidden", true); 
$.get( contextPath()+"/report/getReportByLocation/"+location, function( data ) {
	var reportArr =[];
	for(var i=0; i< data.length; i++){
		var report = [];
		var atrUID = data[i].atrpos;
		var atrId = data[i].atrId;
		var positionId = data[i].positionId;
		var atrStatus = data[i].atrStatus;
		var positionStatus = data[i].positionStatus; 
		var userName = data[i].userName;
		var location = data[i].location;
		var client = data[i].client;
		report = [atrId,positionId,atrStatus,positionStatus,userName, location, client]; 
		reportArr.push(report);
	} 
	 
	$('#example').empty();
	debugger;
	$('#example').DataTable( {
	    data: reportArr,
	    "bDestroy": true,
	    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
	    columns: [
	    	
	        { title: "ATR ID" },
	        { title: "Position ID" },
	        { title: "ATR Status" },
	        { title: "Position Status" },
	        { title: "Assigned To" },
	        { title: "Location" },
	        { title: "Client" }
	    ]
	} );
	 
	});
}

function selectStatus (APStatus) {
	var APType=$("#statuscategory").val();
	console.log(APType);
	if(APType !="1"){
	 $('#container-statuscategory').attr("hidden", false); 
	 $.get( contextPath()+"/report/getReportByType?APType="+APType+"&APStatus="+APStatus+"", function( data ) {
	var reportArr =[];
	for(var i=0; i< data.length; i++){
		var report = [];
		var atrUID = data[i].atrpos;
		var atrId = data[i].atrId;
		var positionId = data[i].positionId;
		var atrStatus = data[i].atrStatus;
		var positionStatus = data[i].positionStatus; 
		var userName = data[i].userName;
		var location = data[i].location;
		var client = data[i].client;
		report = [atrId,positionId,atrStatus,positionStatus,userName, location, client]; 
		reportArr.push(report);
	} 
	 
	$('#example').empty();
	$('#example').DataTable( {
	    data: reportArr,
	    "bDestroy": true,
	    dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ],
	    columns: [
	    
	        { title: "ATR ID" },
	        { title: "Position ID" },
	        { title: "ATR Status" },
	        { title: "Position Status" },
	        { title: "Assigned To" },
	        { title: "Location" },
	        { title: "Client" }
	    ]
	} );
	 
	});
 }
}


function hideAllDropdown()
{
	 $('#container-statuscategory').attr("hidden", true); 	
	 $('#container-location').attr("hidden", true);
	 $('#container-client').attr("hidden", true);
	 $('#container-recruiter').attr("hidden", true); 
  
}
function selectReport (id) {
//  id = 1 : Status
//	id = 2 : Location
//	id = 3 : Client
//	id = 4 : Recruiter
	
	hideAllDropdown();
	if(id == 1)
	{
		$('#container-statuscategory').attr("hidden", false); 
		$.get( contextPath()+"/report/getStatusReport", function( data ) {
		var reportArr =[];
		for(var i=0; i< data.length; i++){
			var report = [];
			var atrUID = data[i].atrpos;
			var atrId = data[i].atrId;
			var positionId = data[i].positionId;
			var atrStatus = data[i].atrStatus;
			var positionStatus = data[i].positionStatus; 
			var userName = data[i].userName;
			var location = data[i].location;
			var client = data[i].client;
			report = [atrId,positionId,atrStatus,positionStatus,userName,location, client]; 
			reportArr.push(report);
		} 
		 
		$('#example').empty();
		debugger;
		$('#example').DataTable( {
		    data: reportArr,
		    "bDestroy": true,
		    dom: 'Bfrtip',
	        buttons: [
	            'copy', 'csv', 'excel', 'pdf', 'print'
	        ],
	        columns: [
		    	
		        { title: "ATR ID" },
		        { title: "Position ID" },
		        { title: "ATR Status" },
		        { title: "Position Status" },
		        { title: "Assigned To" },
		        { title: "Location" },
		        { title: "Client" }
		    ]
		} );
		 
		});
	}
	
	
	else if (id =="2")
	{
		$('#container-location').attr("hidden", false);
		 $('#type').attr("hidden", true);
		 $('#atr_status').attr("hidden", true); 
		 $('#container-statustype').attr("hidden", true);
		 $('#container-statuscategory').attr("hidden", true); 
		 
		$.get( contextPath()+"/report/getLocationList", function( data ) {
			
			var locationArr =[]; 
			debugger;
			 $('#location').empty(); 
			 var div_data="<option class='text-capitalize' selected='selected' value=''>Select location</option><option value='All'>All</option>";
			 $(div_data).appendTo('#location');
			 $.each(data,function(i,obj)
		                { 
				        div_data ="<option class='text-capitalize' value="+obj+">"+obj+"</option>"; 
		                $(div_data).appendTo('#location'); 
		                });   
			});
	}
	else if (id =="3")
	{
		$('#container-client').attr("hidden", false);
		 $('#type').attr("hidden", true);
		 $('#atr_status').attr("hidden", true); 
		 $('#container-statustype').attr("hidden", true);
		 $('#container-statuscategory').attr("hidden", true); 
		 
		$.get( contextPath()+"/report/getClientList", function( data ) {
			
			$('#client').empty();  
			var div_data="<option class='text-capitalize' selected='selected' value=''>Select client</option><option value='All'>All</option> "; 
			$(div_data).appendTo('#client'); 
			for (var count =0; count<data.length; count++)
				{
				 for (var p in data[count]) {
					    if( data[count].hasOwnProperty(p) ) {
					     var result = p + " , " + data[count][p] + "\n";
					     div_data="<option class='text-capitalize' value="+p+">"+data[count][p]+"</option>"; 
					     $(div_data).appendTo('#client'); 
					    }}
				} 
			});
	}
	else if (id =="4")
	{
		$('#container-recruiter').attr("hidden", false);
		 $('#type').attr("hidden", true);
		 $('#atr_status').attr("hidden", true); 
		 $('#container-statustype').attr("hidden", true);
		 $('#container-statuscategory').attr("hidden", true); 
		 
		$.get( contextPath()+"/report/getRecruiterList", function( data ) {
			
			$('#recruiter').empty();
			 var div_data="<option class='text-capitalize' selected='selected' value=''>Select recruiter</option><option value='All'>All</option> "; 
		     $(div_data).appendTo('#recruiter'); 
			for (var count =0; count<data.length; count++)
				{
				 for (var p in data[count]) {
					    if( data[count].hasOwnProperty(p) ) {
					     var result = p + " , " + data[count][p] + "\n";
					     div_data="<option class='text-capitalize' value="+p+">"+data[count][p]+"</option>"; 
					     $(div_data).appendTo('#recruiter'); 
					    }}
				} 
			});
	}
	
	 if (id == "1") { // Status 
		 $('#type').attr("hidden", false); 
	 }
	 else{
		 $('#type').attr("hidden", true);
		 $('#atr_status').attr("hidden", true); 
		 $('#container-statustype').attr("hidden", true); 
		 
	 } 
}
function showStatus (id) { 
	 if (id=="2") {  // ATR
		 $('#container-statustype').attr("hidden", false); 
		 $('#statustype').empty().append('<option value="">Select a status:</option><option value="0">All</option><option value="1">Open</option><option value="3">Closed</option>');
	  }
	 else if (id=="3"){ 
		 $('#container-statustype').attr("hidden", false);
		 $('#statustype').empty().append('<option value="">Select a status:</option><option value="0">All</option><option value="2">Yet to Start</option><option value="4">In Progress</option><option value="6">Offered</option><option value="8">Fulfilled</option><option value="21">Dropped</option><option value="22">Hold</option>');
 		  	
	 } 
	 else if (id =="1"){ // All 
		 $('#container-statustype').attr("hidden", true); 
		 $('#container-statuscategory').attr("hidden", false); 
			$.get( contextPath()+"/report/getStatusReport", function( data ) {
			var reportArr =[];
			for(var i=0; i< data.length; i++){
				var report = [];
				var atrUID = data[i].atrpos;
				var atrId = data[i].atrId;
				var positionId = data[i].positionId;
				var atrStatus = data[i].atrStatus;
				var positionStatus = data[i].positionStatus; 
				var userName = data[i].userName;
				var location = data[i].location;
				var client = data[i].client;
				report = [atrId,positionId,atrStatus,positionStatus,userName,location, client]; 
				reportArr.push(report);
			} 
			 
			$('#example').empty();
			debugger;
			$('#example').DataTable( {
			    data: reportArr,
			    "bDestroy": true,
			    dom: 'Bfrtip',
		        buttons: [
		            'copy', 'csv', 'excel', 'pdf', 'print'
		        ],
		        columns: [
			    	
			        { title: "ATR ID" },
			        { title: "Position ID" },
			        { title: "ATR Status" },
			        { title: "Position Status" },
			        { title: "Assigned To" },
			        { title: "Location" },
			        { title: "Client" }
			    ]
			} );
			 
			});
	 }
}


 
$(document).ready(function() {

} );
	