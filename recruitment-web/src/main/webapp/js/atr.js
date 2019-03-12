$(document).ready(function(){
	getCookie();
	
	var user = firstName;
	$('#loguserName').html( user  );
	
	//date pickers
	/*$("#completionDate").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth : true,
		changeYear : true,
		yearRange : '0Y:+1',
		minDate : "+0M +0D",
		maxDate : "+12M +0D",
		onClose: function() {$(this).valid();} 
	});*/
	
	if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
		userRoleBasedatr(userId,roleId);
		loadClient();
		loadStatus();
		
		if(roleId==2 || roleId==4 || roleId==5){
			$('#createAtrBtn').attr("disabled", false);
			//login sale executive roleid  load on sales manager.
			if(roleId==5){
				loadAssignedManager(userId,roleId);
				
			//login manager Role 	
			}else if(roleId==2 || roleId==4){
				loadAssignedManager(userId,roleId);
				
			}
		}else{
			$('#createAtrBtn').attr("disabled", true);
		}
		
	}else{
		window.location.replace("login.html");
	}
	
});
	
	




function loadAssignedManager(userId,roleId){
	var data=ajaxCall('GET',contextPath()+"atr/assignManagerList?userId="+userId+"&roleId="+roleId+"");
	if(data !=undefined){
	    $("#assignedToList option:gt(0)").remove();
	    $("#editAssignedToList option:gt(0)").remove();
		for (var i = 0; i < data.length; i++) {
			console.log(data[i].userName);
			var  opt = "<option value='" + data[i].userId + "'>"
					+ data[i].userName + "</option>";
			$('#assignedToList').append(opt);
			$('#editAssignedToList').append(opt);
			
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
			 opt = "<option value='" + data[i].id + "'>"
					+ data[i].clientName + "</option>";
			$('#clientId').append(opt);
			$('#editClientId').append(opt);
		}	
	}
		
}
//load status list
function loadStatus(){
	var data=ajaxCall('GET',contextPath()+"atr/statusList");
		if(data.length !=0){
			$("#statusId option:gt(0)").remove();
			$("#editStatusId option:gt(0)").remove();
			for (var i = 0; i < data.length; i++) {
				 opt = "<option value='" + data[i].id + "'>"
						+ data[i].status + "</option>";
				$('#statusId').append(opt);
				$('#editStatusId').append(opt);
			}	
		}
		
}

//load atr list
function loadAtr(){
 var result=ajaxCall('GET',contextPath()+"atr/viewatr");
	if(result.length !=0){
		var last_element = result[result.length - 1];
		var j=1;
		$('#atrDisplay tr:gt(0)').remove();
		for(var i in result){
			$('#atrDisplay').append("<tr id=atrRowId"+i+"></tr>");
			$('#atrRowId'+i).append("<td>"+ j++ +"</td>");
			/*$('#atrRowId'+i).append("<td>"+ result[i].aTRID +"</td>");*/
			$('#atrRowId'+i).append("<td><a href='atrDetail.html?atrId="+ result[i].id +"'>"+ result[i].jobDescription +"</a></td>");
			$('#atrRowId'+i).append("<td>"+ result[i].noOfPosition +"</td>");
			$('#atrRowId'+i).append("<td>"+ result[i].role +"</td>");
			$('#atrRowId'+i).append("<td>"+ result[i].location +"</td>");
			$('#atrRowId'+i).append("<td>"+ result[i].clientName+"</td>");
			$('#atrRowId'+i).append("<td class='text-capitalize'>"+ isNull(result[i].assignedByUser)+"</td>");
			$('#atrRowId'+i).append("<td class='text-capitalize'>"+ isNull(result[i].assignedToUser)+"</td>");
			$('#atrRowId'+i).append("<td><button class='btn btn-success' id='editAtrBtn"+i+"' onclick='editAtrDetail("+ result[i].id +")'><i class='fa fa-pencil'></i> Edit</button><button class='btn btn-danger' id='deleteAtrBtn"+i+"' onclick='deleteAtrDetail("+ result[i].id +")'> Close</button></td>");
			$('#atrRowId'+i).append("<td>"+result[i].status+"</td>");
			
			
			if(roleId==2 || roleId==4 || roleId==5){
				$('#editAtrBtn'+i).prop("disabled", false);
				$('#deleteAtrBtn'+i).prop("disabled", false);
			}else{
				$('#editAtrBtn'+i).prop("disabled", true);
				$('#deleteAtrBtn'+i).prop("disabled", true);
				
			}
			
		}
	}	
}


//reset the value after added form
function resetAtrFunction() {
	var validator1 = $( "#addatrform" ).validate();
	validator1.resetForm();
	$("#addatrform")[0].reset();
}

function createAtr(){
	document.location.href = "createatr.html";
}

function editAtrDetail(id){
	
	document.location.href = "createatr.html?atrId="+id+"";
	
}


function deleteAtrDetail(id){
	var result=confirm("Are you sure?");
        if (result) {
        	$.ajax({
        		type:"DELETE",
        		url:"atr/deleteAtr/"+id+"",
        		contentType: 'application/json',
        	    processData: false,
        	    success: function( data, textStatus, jQxhr ){
        	    	alert("ATR is Closed")
        	    		userRoleBasedatr(userId,roleId);
            		
        	    	
        	    },
        	    error: function( jqXhr, textStatus, errorThrown ){
        	        console.log( errorThrown );
        	    }
        		
        	})
        }else{
        	return false;
        }

}


function userRoleBasedatr(userId,roleId){	
	$.get( contextPath()+"atr/userRolebasedatr?userId="+userId+"&roleId="+roleId+"", function( data ) {
	var resultDataArr=[];
	console.log(data);
	if(data.length !=0){
		var j=1;
		
		for(var i=0; i< data.length; i++){
			resultData=[];
				var sNo =  j++;
		        var id = data[i].id;
		        var jobDescp = data[i].jobDescription;
		        var noofposition = data[i].noOfPosition; 
		        var role=data[i].role;
		        var location=data[i].location;
		        var client=data[i].clientName;
		        var assignedby=isNull(data[i].assignedByUser);
		        var assignedto= isNull(data[i].assignedToUser);
		        var status= data[i].status;
		        resultData = [sNo,jobDescp,noofposition,role,location,client, assignedby, assignedto,status,id]; 
		        resultDataArr.push(resultData);
				
			}
		if(roleId==2 || roleId==4 || roleId==5){
		$('#atrDisplay').empty();
		$('#atrDisplay').DataTable( {
		    data: resultDataArr,
		    "bDestroy": true,
	       columns: [
		        { title: "S.no" },
		        { title: "Job Description",
		        	"render": function (row, data, type, meta) {
		                return '<a href="atrDetail.html?atrId='+type[9]+'">' + row + '</a>';}},
		        { title: "No Of Positions" },
		        { title: "Role" },
		        { title: "Location" },
		        { title: "Client" },
		        { title: "Assigned By" },
		        { title: "Assigned To" },
		        { title: "Status" },
		        { title: "Action",
		        	"data": null,		        
		        	"render": function (row, data, type, meta) {
		                return '<button class="btn btn-success" id="editAtrBtn" onclick="editAtrDetail('+type[9]+')"><i class="fa fa-eye"></i> View</button><button class="btn btn-danger" id="deleteAtrBtn" onclick="deleteAtrDetail('+type[9]+')"> Close</button>';
		                
		        	}
		        }
		  ]
		});
	}
		else{
			$('#atrDisplay').empty();
			$('#atrDisplay').DataTable( {
			    data: resultDataArr,
			    "bDestroy": true,
		        columns: [
			        { title: "S.no" },
			        { title: "Job Description",
			        	"render": function (row, data, type, meta) {
			                return '<a href="atrDetail.html?atrId='+type[9]+'">' + row + '</a>';}},
			        { title: "No Of Positions" },
			        { title: "Role" },
			        { title: "Location" },
			        { title: "Client" },
			        { title: "Assigned By" },
			        { title: "Assigned To" },
			        { title: "Status" },
			        { title: "Action",
			        	"data": null,		        
			        	"render": function (row, data, type, meta) {
			                return '<button class="btn btn-success" id="editAtrBtn" onclick="editAtrDetail('+type[9]+')" disabled><i class="fa fa-eye"></i> View</button><button class="btn btn-danger" id="deleteAtrBtn" onclick="deleteAtrDetail('+type[9]+')" disabled> Close</button>';
			                
			        	}
			        }
			  ]
			});
		}
		
	}		
			
	});
	if(window.location.href.split('?')[1] != undefined)
	{ 
	
	 $("html, body").animate({ scrollTop: $(document).height()-$(window).height()},'slow');
	  
	}
}
	
/*function userRoleBasedatr(userId,roleId){	
	var result=ajaxCall('GET',contextPath()+"atr/userRolebasedatr?userId="+userId+"&roleId="+roleId+"");
	if(result.length !=0){
		var j=1;
		$('#atrDisplay tr:gt(0)').remove();
		for(var i in result){
			$('#atrDisplay').append("<tr id=atrRowId"+i+"></tr>");
			$('#atrRowId'+i).append("<td>"+ j++ +"</td>");
			$('#atrRowId'+i).append("<td>"+ result[i].aTRID +"</td>");
			$('#atrRowId'+i).append("<td><a href='atrDetail.html?atrId="+ result[i].id +"'>"+ result[i].jobDescription +"</a></td>");
			$('#atrRowId'+i).append("<td>"+ result[i].noOfPosition +"</td>");
			$('#atrRowId'+i).append("<td>"+ result[i].role +"</td>");
			$('#atrRowId'+i).append("<td>"+ result[i].location +"</td>");
			$('#atrRowId'+i).append("<td>"+ result[i].clientName+"</td>");
			$('#atrRowId'+i).append("<td class='text-capitalize'>"+ isNull(result[i].assignedByUser)+"</td>");
			$('#atrRowId'+i).append("<td class='text-capitalize'>"+ isNull(result[i].assignedToUser)+"</td>");
			$('#atrRowId'+i).append("<td><button class='btn btn-success' id='editAtrBtn"+i+"' onclick='editAtrDetail("+ result[i].id +")'><i class='fa fa-eye'></i> View</button><button class='btn btn-danger' id='deleteAtrBtn"+i+"' onclick='deleteAtrDetail("+ result[i].id +")'> Close</button></td>");
			$('#atrRowId'+i).append("<td>"+result[i].status+"</td>");
			
			
			if(roleId==2 || roleId==4 || roleId==5){
				$('#editAtrBtn'+i).prop("disabled", false);
				$('#deleteAtrBtn'+i).prop("disabled", false);
			}else{
				$('#editAtrBtn'+i).prop("disabled", true);
				$('#deleteAtrBtn'+i).prop("disabled", true);
				
			}
			
		}
	}
	if(window.location.href.split('?')[1] != undefined)
	{ 
	
	 $("html, body").animate({ scrollTop: $(document).height()-$(window).height()},'slow');
	  
	}
}

 {
		        	"title": "Action",
		        	"data": null,
//		            "defaultContent": "<button class='btn btn-success' id='editAtrBtn' onclick='editAtrDetail()'><i class='fa fa-eye'></i> View</button><button class='btn btn-danger' id='deleteAtrBtn' onclick='deleteAtrDetail()'> Close</button>",
	            	"render": function (row, data, type, meta) {
		                return "<button class='btn btn-success' id='editAtrBtn' onclick='editAtrDetail()'><i class='fa fa-eye'></i> View</button><button class='btn btn-danger' id='deleteAtrBtn' onclick='deleteAtrDetail()'> Close</button>";}}
		        }
*/
	



