$(document).ready(function(){
		displayAtr();
		
    	var clientId=unescape(GetURLParameter("id"));
    	var clientName=decodeURIComponent(GetURLParameter("clientName"));
    	var clientKey=GetURLParameter("clientKey");
    	
    	$('#clientId').val(clientId);
    	$('#clientName').html(clientName);
    	$('#displayClientName').val(clientName)
    	
    	$('#addClientAtrForm').validate({ 
    		rules : {
    			aTRID : {required : true },
    			noOfPosition : {required : true , numericonlyallowed :true},
    			jobDescription : {required : true ,minlength : 2 ,firstalpha :true},
    			role : {required : true , minlength : 2 ,firstalpha :true},
    			location : {required : true , minlength : 2 ,firstalpha :true},
    			minSalary : {required : true , numericonlyallowed :true},
    			maxSalary : {required : true , numericonlyallowed :true},
    			experience : {required : true , numericonlyallowed :true},
    			client : {required : true , firstalpha :true},
    		},
    		messages : {
    			aTRID: {required : "Enter aTRID" , numericonlyallowed :"Enter valid number"},
    			noOfPosition : {required : "Enter noOfPosition" , minlength :"Enter atleast 2 character" , firstalpha : "Enter valid part name"},
    			jobDescription : {required : "Enter jobDescription" , numericonlyallowed :"Enter valid number"},
    			role : {required : "Enter role" , numericonlyallowed :"Enter valid number"},
    			location : {required : "Enter location" , numericonlyallowed :"Enter valid number"},
    			minSalary : {required : "Enter minumum salary" , numericonlyallowed :"Enter valid number"},
    			maxSalary : {required : "Enter maximum salary" , numericonlyallowed :"Enter valid number"},
    			experience : {required : "Enter experience" , numericonlyallowed :"Enter valid number"},
    			client : {required : "Enter client" , firstalpha :"Enter character"},
    		}
    	});
    	
    	
});
    
    
function GetURLParameter(sParam) {
	if(window.location.search == "") return "";
    var sPageURL = window.location.search.substring(1); 
	var sURLVariables = sPageURL.split('&'); 
    for (var i = 0; i < sURLVariables.length; i++) { 
        var sParameterName = sURLVariables[i].split('='); 
        if (sParameterName[0] == sParam) { 
        	return sParameterName[1]; 
        } 
    } 
    return "";
}

function createAtr(){
	var formdata=$('#addClientAtrForm').serializeJSON();
	if ($('#addClientAtrForm').valid() == false) return false;
	  $.ajax({
		type:"POST",
		url:"atr/addAtrForm",
		contentType: 'application/json',
		data: JSON.stringify(formdata),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	$('#addClientModal ').modal('hide');
	    	displayAtr();
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    } 
		
	})  
}

function displayAtr(){
	$.ajax({
		type : "GET",
		url : "atr/viewatr",
		success: function(result){
				
				if(result.lenght !=0){
					var j=1;
					//$('#atrDisplay tr:gt(0)').remove();
					for(var i in result){
						$('#atrDisplay').append("<h5 class='page-header'>"+ result[i].aTRID+"</h5>");
						
						/*$('#personDisplay').append("<tr id=pesrsonRowId"+i+"></tr>");
						$('#pesrsonRowId'+i).append("<td>"+ j++ +"</td>");
						$('#pesrsonRowId'+i).append("<td>"+ result[i].aTRID +"</td>");
						$('#pesrsonRowId'+i).append("<td>"+ result[i].jobDescription +"</td>");
						$('#pesrsonRowId'+i).append("<td>"+ result[i].noOfPosition +"</td>");
						$('#pesrsonRowId'+i).append("<td>"+ result[i].role +"</td>");
						$('#pesrsonRowId'+i).append("<td>"+ result[i].location +"</td>");
						$('#pesrsonRowId'+i).append("<td>"+ result[i].client +"</td>");
						$('#pesrsonRowId'+i).append("<td><button class='btn btn-success' onclick='getAtrDetail("+ result[i].id +")'><span class='glyphicon glyphicon-pencil'></span> Edit</button><button class='btn btn-danger' onclick='deleteAtrDetail("+ result[i].id +")'><span class='glyphicon glyphicon-trash'></span> Delete</button></td>");
						$('#pesrsonRowId'+i).append("<td><select class='form-control'><option value=''>Change Status</option><option value='assignTo'>assignTo</option><option value='Inprogress'>Inprogress</option><option value='YetToStart'>YetToStart</option></select></td>");*/
					}
				}	
				console.log("Success: ", result);
		},
		error : function(e) {
			$("#personDisplay").html("<strong>Error</strong>");
			console.log("ERROR: ", e);
		}
	});	
}