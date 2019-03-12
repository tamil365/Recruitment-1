$(document).ready(function(){
	 getCookie();
	 	var user = firstName;
		$('#loguserName').html( user  );
	 if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
		 atrId=unescape(GetURLParameter("atrId"));
		 
		 loadPositionStatus();
		 getRecruiterList();
		 loadCandidateStatusList();
		 if(roleId!=3){
			 
			 displayManagerPosition();
			 $('#managerDiv').show();
			 $('#recruiterDiv').hide();
			
		 }else{//display recruiter
			 
			 displayRecruiterPosition();
			 //loadCandidateStatusList();
			 $('#recruiterDiv').show();
			 $('#managerDiv').hide();
			
		 }
		 
	 }else{
			window.location.replace("login.html");
	}
	 
	 $("[data-toggle=tooltip]").tooltip();
	 
	 
	 $('#recruiter_add_candidateDetailForm').validate({ 
			rules : {
				firstName : {required : true , minlength :3},
				lastName : {required : true ,minlength : 1},
				email : {required : true , email : true },
				mobile : {required : true , mobile :true,maxlength:10},
				candidateStatus : {required : true , selectcheck: true},
				uploadfile:{required : true, fileType: true},
			},
			messages : {
				firstName : {required : "Enter first name" ,  minlength : "Enter atleat 3 char"},
				lastName : {required : "Enter last name",minlength : "Enter atleat 1 char"},
				email : {required : "Enter email" , email:"Enter valid Email address"},
				mobile : {required : "Enter mobile" , mobile :"Enter valid mobile",maxlength:"Enter valid mobile number"},
				candidateStatus : {required : "Select status" , selectcheck: true},
				uploadfile : {required : "Select file" , fileType: "Select valid file type" },
			}
		});
	 
	 
	 $('#manager_add_candidateDetailForm').validate({ 
			rules : {
				firstName : {required : true , minlength :3},
				lastName : {required : true ,minlength : 1},
				email : {required : true , email : true },
				mobile : {required : true , mobile :true, maxlength:10},
				candidateStatus : {required : true , selectcheck: true},
				uploadfile:{required : true, fileType: true},
			},
			messages : {
				firstName : {required : "Enter first name" ,  minlength : "Enter atleat 3 char"},
				lastName : {required : "Enter last name",minlength : "Enter atleat 1 char"},
				email : {required : "Enter email" , email:"Enter valid Email address"},
				mobile : {required : "Enter mobile" , mobile :"Enter valid mobile",maxlength:"Enter valid mobile number"},
				candidateStatus : {required : "Select status" , selectcheck: true},
				uploadfile : {required : "Select file" , fileType: "Select valid file type" },
			}
		});
	 
	 $('#positionStatusForm').validate({ 
			rules : {
				posStatusId : {required : true , selectcheck :true},
				assignedTo : {required : true ,selectcheck : true},
				statusChangeDate : {required : true  },
				
			},
			messages : {
				posStatusId : {required : "Select position" ,  selectcheck : "Select position"},
				assignedTo : {required : "Select recruiter",selectcheck : "Select recruiter"},
				statusChangeDate : {required : "Select status update date"},
			}
		});
	 
	 
	 $('#InProgressToOtherPositionStatusForm').validate({ 
		 rules : {
				posStatusId : {required : true , selectcheck :true},
				statusChangeDate : {required : true  },
				candidateStatus:{required : true,selectcheck :true},
				joiningDate:{required : true},
			},
			messages : {
				posStatusId : {required : "Select position" ,  selectcheck : "Select position"},
				statusChangeDate : {required : "Select status update date"},
				candidateStatus:{required : "Select candidate status", selectcheck :"Select Candidate status"},
				joiningDate:{required : "select candidate joining date"},
			}
		});
	 
	 $('#managerOfferedPositionStatusForm').validate({ 
			rules : {
				posStatusId : {required : true , selectcheck :true},
				statusChangeDate : {required : true  },
				candidateStatus:{required : true,selectcheck :true},
				joiningDate:{required : true},
			},
			messages : {
				posStatusId : {required : "Select position" ,  selectcheck : "Select position"},
				statusChangeDate : {required : "Select status update date"},
				candidateStatus:{required : "Select candidate status", selectcheck :"Select Candidate status"},
				joiningDate:{required : "select candidate joining date"},
			}
		});
	 
	 $('#RecInProgressToOtherPositionStatusForm').validate({ 
		 rules : {
				posStatusId : {required : true , selectcheck :true},
				statusChangeDate : {required : true  },
				candidateStatus:{required : true,selectcheck :true},
				joiningDate:{required : true},
			},
			messages : {
				posStatusId : {required : "Select position" ,  selectcheck : "Select position"},
				statusChangeDate : {required : "Select status update date"},
				candidateStatus:{required : "Select candidate status", selectcheck :"Select Candidate status"},
				joiningDate:{required : "select candidate joining date"},
			}
		});
	 
	 $('#recOfferedPositionStatusForm').validate({ 
			rules : {
				posStatusId : {required : true , selectcheck :true},
				statusChangeDate : {required : true  },
				candidateStatus:{required : true,selectcheck :true},
				joiningDate:{required : true},
			},
			messages : {
				posStatusId : {required : "Select position" ,  selectcheck : "Select position"},
				statusChangeDate : {required : "Select status update date"},
				candidateStatus:{required : "Select candidate status", selectcheck :"Select Candidate status"},
				joiningDate:{required : "select candidate joining date"},
			}
		});
	 
	 
	 
 	  var date = new Date();
	  var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	  var end = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	  
	  
	  $("#ToStatusChangeDate").datepicker({
			
			format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d',
			
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
	  
	 $("#InprogressStatusChangeDate,.statusDate").datepicker({
			
			format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d',
			 
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
	 

	 $("#offeredStatusChangeDate").datepicker({
			
			format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d',
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");

	 
	 
	 $(".candidateOfferedDate").datepicker({
			
		 	format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-10d',
			endDate: '+0d',
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
	 
	 $(".candidateExpectedJoiningDate").datepicker({
			
		 	format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '+0d',
			endDate: '+90d',
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
		
	 
	 
	 
	 $("#joiningDate").datepicker({
			
		 	format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d',
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
	 
	 $(".offeredDate").datepicker({
			
			format : 'dd/mm/yyyy',
			todayHighlight: true,
			changeMonth : true,
			changeYear : true,
			yearRange : '0Y:+1',
			minDate : "+0M +0D",
			maxDate : "+12M +0D",
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
	 
	 $("#recStatusChangeDate").datepicker({
			
			format : 'dd/mm/yyyy',
			todayHighlight: true,
			changeMonth : true,
			changeYear : true,
			yearRange : '0Y:+1',
			minDate : "+0M +0D",
			maxDate : "+12M +0D",
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
	 
	 $("#miJoiningDate").datepicker({
			
		 	format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d',
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
	 
	 $("#mJoiningDate").datepicker({
			
		 format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d',
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
	 
	 
	 $("#recJoiningDate").datepicker({
			
		 	format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d',
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0");
	 
	 $(".recInprogressStatusChangeDate").datepicker({
		 	format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d',
			 
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
	 }).datepicker("setDate", "0");
	 
});

function resetTodoPositionFormFunction() {
	var formset = $( "#positionStatusForm" ).validate();
	formset.resetForm();
	$("#positionStatusForm")[0].reset();
	 $("#ToStatusChangeDate").datepicker({ 
			format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d', 
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0"); 
}

function resetFormFunction() {
	var validator1 = $( "#manager_add_candidateDetailForm" ).validate();
	validator1.resetForm();
	$("#manager_add_candidateDetailForm")[0].reset();
}

// load position status
function loadPositionStatus(){
 var data=ajaxCall('GET',contextPath()+"position/positionStatus");
 //////console.log(data);
 if(data.lenght !=0){
		$("#positionStatus option:gt(0)").remove();
		$("#inprogressPositionStatusForManager option:gt(0)").remove();
		$("#offeredPositionStatusForManager option:gt(0)").remove();
		$("#inprogressPositionStatusForRecruiter option:gt(0)").remove();
		$("#offeredPositionStatusForRecruiter option:gt(0)").remove();
		for (var i = 0; i < data.length; i++) {
			 opt = "<option value='" + data[i].id + "'>"
					+ data[i].status + "</option>";
			$('#positionStatus').append(opt);
			$('#inprogressPositionStatusForManager').append(opt);
			$('#offeredPositionStatusForManager').append(opt);
			$('#inprogressPositionStatusForRecruiter').append(opt);
			$('#offeredPositionStatusForRecruiter').append(opt); 
		}
		var removepostionOptions = [2,6,8]; 
		removePositionStatusOption(removepostionOptions);
		
	}
}

function removePositionStatusOption(arr){	
	for(var val in arr)
		{
			$("#positionStatus option[value='"+arr[val]+"']").remove();
		}
}
//load recruiter executive
function getRecruiterList(){
 var data=ajaxCall('GET',contextPath()+"position/getRecruiterList");
 if(data.length !=0){
		$("#assigneeList option:gt(0)").remove();
		$("#iassigneeList option:gt(0)").remove();
		for (var i = 0; i < data.length; i++) {
			 opt = "<option class='text-capitalize' value='" + data[i].userId + "'>"
					+ data[i].userName + "</option>";
			$('#assigneeList').append(opt);
			$('#iassigneeList').append(opt);
		}	
	}
}

//load candidateStatus list
function loadCandidateStatusList(classId){ 
	 var data=ajaxCall('GET',contextPath()+"position/getCandidateStatusList");
	 if(data.length !=0){
		
			if (classId != undefined || classId != null){
	 	$("#canstatus"+classId+" option:gt(0)").remove();
			}
			else
			{
				$("#manager_add_candidateStatusList option:gt(0)").remove();
				$("#rec_add_candidateStatusList option:gt(0)").remove();
				
				$(".editcandidateStatus option:gt(0)").remove(); 
			}
			
			for (var i = 0; i < data.length; i++) {
				 opt = "<option value='" + data[i].id + "'>"
						+ data[i].status + "</option>";
				
				if (classId != undefined || classId != null){
					$('#canstatus'+classId).append(opt);
				}
				else
				{
				$('#rec_add_candidateStatusList').append(opt); 
				$('#manager_add_candidateStatusList').append(opt);
				$('.editcandidateStatus').append(opt);
				} 
			}	
		}
	}


//display manager based position details.
function displayManagerPosition(){
	var result=ajaxCall('GET',contextPath()+"position/viewManagerBasedPosition/"+atrId+"/?userId="+userId+"&roleId="+roleId+"");
	//////console.log(result);
	if(result.length !=0){
		var todocount=0;
		var inpCount=0;
		var offerCount=0;
		var fulfilledCount=0;
		$('#jobDescription').append("ATR "+result[0].atrId+" : "+result[0].jobDescription);
		for(var i in result){
			//$('#positionDisplay').append("<div class='col-md-3' id='todoDiv"+i+"' style='box-sizing: border-box; width: 300px;height: 100px;padding: 50px;border: 1px solid grey';></div> <div class='col-md-3' id='inpragressDiv"+i+"' style='box-sizing: border-box; width: 300px;height: 100px;padding: 50px;border: 1px solid grey';></div> <div class='col-md-3' id='offeredDiv"+i+"' style='box-sizing: border-box; width: 300px;height: 100px;padding: 50px;border: 1px solid grey';></div>");
			
			if(result[i].posStatusId==2){
				todocount++;
				
				//var drag =result[i].atsId;
				//$('#toDo').append("<li id="+drag+" data-toggle='tooltip' data-placement='top' title='"+result[i].jobDescription+"'>"+result[i].atrposLink+"</li>");
				$('#toDo').append('<div style="cursor: pointer" onclick=getToPositionDetail('+result[i].atsId+') data-toggle="tooltip"  data-placement="top" data-html="true" title="'+result[i].jobDescription+' -</br> '+result[i].role+'">Position '+result[i].posId+'</div>');
				
			}
			else if(result[i].posStatusId==4){
				inpCount++;
				//var drag =result[i].atsId;
				$('#inprogress').append('<div style="cursor: pointer" onclick=getInProgressPositionDetail('+result[i].posId+')  data-toggle="tooltip"  data-placement="top" data-html="true" title="'+result[i].jobDescription+' -</br> '+result[i].role+'">Position '+result[i].posId+'</div>');
			}
			else if(result[i].posStatusId==6){
				offerCount++;
				$('#offer').append('<div style="cursor: pointer" onclick=getOfferedPositionDetail('+result[i].posId+')  data-toggle="tooltip"  data-placement="top" data-html="true" title="'+result[i].jobDescription+' -</br> '+result[i].role+'">Position '+result[i].posId+'</div>');
			}
			else if(result[i].posStatusId==8){
				fulfilledCount++;
				$('#closed').append('<div style="cursor: pointer" onclick=getFulfilledPositionDetail('+result[i].posId+') data-toggle="tooltip"  data-placement="top" data-html="true" title="'+result[i].jobDescription+' -</br> '+result[i].role+'">Position '+result[i].posId+'</div>');
			}
		}
		$('#todocount').append(todocount);
		$('#inpCount').append(inpCount);
		$('#offerCount').append(offerCount);
		$('#fulfilledCount').append(fulfilledCount);
	}	
	else{
		$('#todocount').append(0);
		$('#inpCount').append(0);
		$('#offerCount').append(0);
		$('#fulfilledCount').append(0);
	}
}

//display recruiter position display
function displayRecruiterPosition(){
	var result=ajaxCall('GET',contextPath()+"position/viewRecruiterBasedPosition/"+atrId+"/?userId="+userId+"&roleId="+roleId+"");
	if(result.length !=0){
		var todocount=0;
		var inpCount=0;
		var offerCount=0;
		var fillCount=0;
		$('#jobDescription').append("ATR "+result[0].atrId+" : "+result[0].jobDescription);
		for(var i in result){
			if(result[i].posStatusId==4){
				inpCount++;
				$('#rec-inprogress').append('<div style="cursor: pointer" onclick=recruiterInprogressPositionDetail('+result[i].posId+') data-toggle="tooltip"  data-placement="top" data-html="true" title="'+result[i].jobDescription+' -</br> '+result[i].role+'">Position '+result[i].posId+'</div>');
				}
			else if(result[i].posStatusId==6){
				offerCount++;
				$('#rec-offer').append('<div style="cursor: pointer" onclick=recruiterOfferedCandidateDetail('+result[i].posId+') data-toggle="tooltip"  data-placement="top" data-html="true" title="'+result[i].jobDescription+' -</br> '+result[i].role+'">Position '+result[i].posId+'</div>');
			}
			else if(result[i].posStatusId==8){
				fillCount++;
				$('#rec-fulfill').append('<div style="cursor: pointer" onclick=recruiterFulfillCandidateDetail('+result[i].posId+') data-toggle="tooltip"  data-placement="top" data-html="true" title="'+result[i].jobDescription+' -</br> '+result[i].role+'">Position '+result[i].posId+'</div>');
			}
		}
		$('#rec_todocount').append(todocount);
		$('#rec_inpCount').append(inpCount);
		$('#rec_offerCount').append(offerCount);
		$('#rec_fulFillCount').append(fillCount);
	}	
	else{
		$('#rec_todocount').append(0);
		$('#rec_inpCount').append(0);
		$('#rec_offerCount').append(0);
		$('#rec_fullFillCount').append(0);
	}
}
 
function showHoldPositions(id){
	if(id == 22){
	var result=ajaxCall('GET',contextPath()+"position/getPositionbyStatus/"+atrId+"/?userId="+userId+"&roleId="+roleId+"&statusId="+id+"");
		$('#otherPositionsModal').modal('show');
		$('#displayDropPositionsDiv').hide();
		$('#displayCanPositionsDiv').hide();
		 $(".lineModalLabel").html("Hold Positions");
		if(result.length !=0){
			var j=1;
			$('#displayNrecord').hide();
			$('#displayPositionsDiv').show();
			$('#displayPositions tr:gt(0)').remove();
				for(var i in result){
				$('#displayPositions').append("<tr id=posRowId"+i+"></tr>");
				$('#posRowId'+i).append("<td>"+ j++ +"</td>");
				$('#posRowId'+i).append("<td>Position - "+ result[i].posId +"</td>");
				$('#posRowId'+i).append("<td>"+ result[i].posStatus +"</td>"); 
				$('#posRowId'+i).append("<td><select class='form-control' name='posStatusId' id='inprogressPositionStatusForManager' onchange='changeHoldPosition(this.parentElement.nextSibling.value, this.parentElement.nextSibling.nextSibling.value,this.value)'> <option> Select Status</option> <option value='2'>Yet to Start</option><option value='21'>Dropped</option></select></td>"); 
				$('#posRowId'+i).append("<input type='hidden' id='atrId' value='"+ result[i].atrId +"'>"); 
				$('#posRowId'+i).append("<input type='hidden' id='posId' value='"+ result[i].posId +"'>"); 
			
			}
		}
		else{
			$('#displayPositionsDiv').hide();
			$('#displayNrecord').show();
			$('#displayNrecord').html("<div><h5 style='color:red;'>No records found.</h5></div>");
		
		}

	}
	else if(id == 21){
			var result=ajaxCall('GET',contextPath()+"position/getPositionbyStatus/"+atrId+"/?userId="+userId+"&roleId="+roleId+"&statusId="+id+"");
			$('#otherPositionsModal').modal('show');
			$('#displayCanPositionsDiv').hide();
			$('#displayPositionsDiv').hide();
			$('.lineModalLabel').html('Dropped Positions');
			if(result.length !=0){
				var j=1;
				$('#displayNrecord').hide();
				$('#displayDropPositionsDiv').show();
				$('#displayDropPositions tr:gt(0)').remove();
			for(var i in result){
				$('#displayDropPositions').append("<tr id=posRowId"+i+"></tr>");
				$('#posRowId'+i).append("<td>"+ j++ +"</td>");
				$('#posRowId'+i).append("<td>Position - "+ result[i].posId +"</td>");
				$('#posRowId'+i).append("<td>"+ result[i].posStatus +"</td>"); 
			}
		}
		else{
			$('#displayDropPositionsDiv').hide();
			$('#displayNrecord').show();
			$('#displayNrecord').html("<div><h5 style='color:red;'>No records found.</h5></div>");
	
		}
	}
	else if(id==19){
		var result=ajaxCall('GET',contextPath()+"candidate/getCandiPositionDeclined/"+atrId+"/?userId="+userId+"&roleId="+roleId+"&statusId="+id+"");
		$('#otherPositionsModal').modal('show');
		$('#displayPositionsDiv').hide();
		$('#displayDropPositionsDiv').hide();
		$('.lineModalLabel').html('Declined Candidates');
		if(result.length !=0){
			var j=1;
			$('#displayNrecord').hide();
			$('#displayCanPositionsDiv').show();
			$('#displayCanPositions tr:gt(0)').remove();
			for(var i in result){
			$('#displayCanPositions').append("<tr id=canRowId"+i+"></tr>");
			$('#canRowId'+i).append("<td>"+ j++ +"</td>");
			$('#canRowId'+i).append("<td>"+ result[i].atrId +"</td>");
			$('#canRowId'+i).append("<td>"+ result[i].posId +"</td>");
			$('#canRowId'+i).append("<td class='text-capitalize'>"+ result[i].firstName +"</td>"); 
			$('#canRowId'+i).append("<td class='text-capitalize'>"+ result[i].email +"</td>");
			$('#canRowId'+i).append("<td class='text-capitalize'>"+ result[i].mobile +"</td>");
			}
		}else{
			$('#displayCanPositionsDiv').hide();
			$('#displayNrecord').show();
			$('#displayNrecord').html("<div><h5 style='color:red;'>No records found</h5></div>");
		}
	}	
}

function changeHoldPosition(atrId,posId, id){
	$.ajax({
		type:"PUT",
		url:contextPath()+"position/updateInprogressPositionToOtherAndCandidate?updatedBy="+userId+"",
		contentType: 'application/json',
		data: JSON.stringify({atrId:atrId,posId:posId,posStatusId:id,statusChangeDate:'1/02/2019'}),
		processData: false,
		async: false,
		success: function( data, textStatus, jQxhr ){
		//alert(data);
		if(data=="success"){
			$('#otherPositionsModal').modal('hide');
			
			}
		location.reload();
		},
		error: function( jqXhr, textStatus, errorThrown ){
		//////console.log( errorThrown );
		} 
	})

}

//get ToDo list to Inprogerss
function getToPositionDetail(id){
	var result=ajaxCall('GET',contextPath()+"position/getPositionDetails/"+atrId+"?atsId="+id+"");
	$('#editYetToPosModal').modal('show');
	$('#atrposLink').html(result.atrposLink);
	//$('#positionStatus')
	$("#positionStatus option[value='4']").attr('selected','selected');
	$('#reporter').html(result.assignedToUser);
	$('#atrId').val(result.atrId);
	$('#posId').val(result.posId);
	$('#atsId').val(result.atsId);
	
	$('#PclientName').html(result.clientName);
	$('#Pexperience').html(result.experience + " years");
	$('#Plocation').html(result.location);
	$('#Pmaxsalary').html(result.maxsalary + " Lakhs" );
	$('#Pminsalary').html(result.minsalary + " Lakhs");
	$('#Prole').html(result.role);
	$('#Pskills').html(result.skills);
	
}

//get Inprogress to other status
function getInProgressPositionDetail(id){
	var result=ajaxCall('GET',contextPath()+"position/getInPositionDetails/"+atrId+"?posId="+id+"");
	console.log(result);
	$('#editInprogressToOtherModal').modal('show');
	$('#iatrposLink').html(result.atrposLink);
	$('#iclientName').html(result.clientName);
	$('#iexperience').html(result.experience  +" years");
	$('#ilocation').html(result.location);
	$('#imaxsalary').html(result.maxsalary +" lacs");
	$('#iminsalary').html(result.minsalary  +" lacs");
	$('#irole').html(result.role);
	$('#iskills').html(result.skills);
	
	$("#inprogressPositionStatusForManager option[value='2']").remove();
	$("#inprogressPositionStatusForManager option[value='4']").remove();
	$("#inprogressPositionStatusForManager option[value='8']").remove();
	/*$("#inprogressPositionStatusForManager option[value='21']").remove();
	$("#inprogressPositionStatusForManager option[value='22']").remove();*/
	//$('#positionStatus')
	//$("#inprogressPositionStatusForManager option[value='4']").attr('selected','selected');
	$('#ireporter').html(result.assignedToUser);
	$('#iatrId,#icatrId').val(result.atrId);
	$('#iposId,#icposId').val(result.posId);
	$('#iatsId').val(result.atsId);
	$('.inprogressCandidateStatusAndJoinDateDiv').hide();
	$('#ManagerCandidateDetailDivDisplay').hide();
	//getCandidateDetailListManager();
	
}

//candidate list show in manager role
function getCandidateDetailListManager(){
	var result=ajaxCall('GET',contextPath()+"candidate/getCandidateList?atrId="+$('#icatrId').val()+"&posId="+$('#icposId').val()+"");
	//alert("candidate information======"+JSON.stringify(result[0]));
	if(result.length !=0){
		var j=1;
		$('#ManagerCandidateDetailDivDisplay').show();
			$('#candidateId').val(result[0].id);
			$('#cFirstName').html(result[0].firstName);
			$('#cLastName').html(result[0].lastName);
			$('#cEmail').html(result[0].email);
			$('#cMobile').html(result[0].mobile);
			$('#cOffered').html(dateDisplay(result[0].offeredDate));
			
			$("#inprogressPositionStatusForManager option[value='6']").attr('selected','selected');
			$('#managerAddCandidateDetailDiv').attr("hidden", true);
			$('.inprogressCandidateStatusAndJoinDateDiv').hide();
			/*if($('#inprogressPositionStatusForManager').val()==6){
				debugger;
				$('#managerAddCandidateDetailDiv').attr("hidden", true);	
			}*/
	}else{
		$('#ManagerCandidateDetailDivDisplay').hide();
		
	}	
}

//get Offered to other status
function getOfferedPositionDetail(id){
var result=ajaxCall('GET',contextPath()+"position/getInPositionDetails/"+atrId+"?posId="+id+"");
	
	$('#managerOfferedStatusModal').modal('show');
	$('#closeatrposLink').html(result.atrposLink);
	
	$('#mofclientName').html(result.clientName);
	$('#mofexperience').html(result.experience);
	$('#moflocation').html(result.location);
	$('#mofmaxsalary').html(result.maxsalary);
	$('#mofminsalary').html(result.minsalary);
	$('#mofrole').html(result.role);
	$('#mofskills').html(result.skills);
	$('#mofrecruiter').html(result.assignedToUser);
	
	//$("#inprogressPositionStatusForManager option[value='4']").attr('selected','selected');
	$('#managerOfferedAtrId').val(result.atrId);
	$('#managerOfferedPosId').val(result.posId);
	$('#managerOfferedAtsId').val(result.atsId);
	
	$("#offeredPositionStatusForManager option[value='2']").remove();
	//$("#offeredPositionStatusForManager option[value='4']").remove();
	$("#offeredPositionStatusForManager option[value='6']").remove();
	getOfferdCandidateListViewByManager(result.atrId,result.posId);
	
}

function getOfferdCandidateListViewByManager(atrId,posId){
	var result=ajaxCall('GET',contextPath()+"candidate/getOfferedCandidateList?atrId="+atrId+"&posId="+posId+"");
	console.log(result);
	if(result.length !=0){
		$('#managerOfferedCandidateDetailDivDisplay').show();
		$('#manager_offerPos_OffercandidateId').val(result[0].id);
		$('#manager_offerPos_CandidateFirstName').html(result[0].firstName);
		$('#manager_offerPos_CandidateLastName').html(result[0].lastName);
		$('#manager_offerPos_CandidateEmail').html(result[0].email);
		$('#manager_offerPos_CandidateMobile').html(result[0].mobile);
		$('#manager_offerPos_CandidateOfferedDate').html(dateDisplay(result[0].offeredDate));
	}else{
		$('#managerOfferedCandidateDetailDivDisplay').hide();
		
	}
}

//get fulfilled Status Candidate Info By manager
function getFulfilledPositionDetail(id){
	var result=ajaxCall('GET',contextPath()+"position/getInPositionDetails/"+atrId+"?posId="+id+"");
//	
	//alert(JSON.stringify(result));
	$('#managerFulfilledStatusModal').modal('show');
	$('#fulfillatrposLink').html(result.atrposLink);
	
	$('#fulfillclientName').html(result.clientName);
	$('#fufilllexperience').html(result.experience);
	$('#fullfilllocation').html(result.location);
	$('#fulfillmaxsalary').html(result.maxsalary);
	$('#fulfillminsalary').html(result.minsalary);
	$('#fulfillrole').html(result.role);
	$('#fulfillskills').html(result.skills);
	$('#fulfillrecruiter').html(result.assignedToUser);
	
	//$('#fulfillreporter').html(result.assignedToUser);
	$('#fulfillatrId').val(result.atrId);
	$('#fulfillposId').val(result.posId);
	$('#fulfillatsId').val(result.atsId);
	getFulfilledCandidateDetailListByManager();
	
}

function getFulfilledCandidateDetailListByManager(){
	var result=ajaxCall('GET',contextPath()+"candidate/getFulfilledCandidateList?atrId="+$('#fulfillatrId').val()+"&posId="+$('#fulfillposId').val()+"");
	if(result.length !=0){
		var j=1;
		//$('#ManagerCandidateDetailDivDisplay').show();
			$('#fullfillCandidateId').val(result[0].id);
			$('#fullFillCandidateFirstName').html(result[0].firstName);
			$('#fullFillCandidateLastName').html(result[0].lastName);
			$('#fullFillCandidateEmail').html(result[0].email);
			$('#fullFillCandidateMobile').html(result[0].mobile);
			$('#fullFillCandidateOfferedDate').html(dateDisplay(result[0].offeredDate));
			$('#fullFillCandidateJoiningDate').html(dateDisplay(result[0].joiningDate))
	}else{
		$('#ManagerCandidateDetailDivDisplay').hide();
		
	}	
}



//recruiter inprogress and candidate create modal
function recruiterInprogressPositionDetail(id){
	//var result=ajaxCall('GET',contextPath()+"position/getPositionDetails/"+atrId+"?atsId="+id+"");
	var result=ajaxCall('GET',contextPath()+"position/getInPositionDetails/"+atrId+"?posId="+id+"");
	//alert(JSON.stringify(result));
	$('#recruiterInprogressPositionModal').modal('show');
	$('#rec_inp_atrposLink').html(result.atrposLink);
	
	$('#rec_inp_clientName').html(result.clientName);
	$('#rec_inp_experience').html(result.experience  +" years");
	$('#rec_inp_location').html(result.location);
	$('#rec_inp_maxsalary').html(result.maxsalary +" lacs");
	$('#rec_inp_minsalary').html(result.minsalary  +" lacs");
	$('#rec_inp_role').html(result.role);
	$('#rec_inp_skills').html(result.skills);
	
	$("#inprogressPositionStatusForRecruiter option[value='2']").remove();
	$("#inprogressPositionStatusForRecruiter option[value='4']").remove();
	$("#inprogressPositionStatusForRecruiter option[value='8']").remove();
	
	$('#rec_atrId').val(result.atrId);
	$('#rec_posId').val(result.posId);
	$('#rec_catsId').val(result.atsId);
	$('#rec_inp_reporter').html(result.assignedToUser);
	$('.rec_InprogressCandidateStatusAndJoinDateDiv').hide();
	$('#recruiterCandidateDetailDivDisplay').hide();
	//getCandidateDetailList();
}

function getCandidateDetailList(){
	var result=ajaxCall('GET',contextPath()+"candidate/getCandidateList?atrId="+$('#catrId').val()+"&posId="+$('#cposId').val()+"");
	if(result.length !=0){
		var j=1;
		$('#displayCandidate tr:gt(0)').remove();
		for(var i in result){
			$('#displayCandidate').append("<tr id=candidateRowId"+i+"></tr>");
			$('#candidateRowId'+i).append("<td>"+ j++ +"</td>");
			$('#candidateRowId'+i).append("<td class='text-capitalize'>"+ result[i].firstName +"</td>");
			$('#candidateRowId'+i).append("<td class='text-capitalize'>"+ result[i].lastName +"</td>");
			$('#candidateRowId'+i).append("<td>"+ result[i].email +"</td>");
			$('#candidateRowId'+i).append("<td>"+ result[i].mobile +"</td>");
			 
	     	$('#candidateRowId'+i).append("<td><select id='canstatus"+result[i].id+"' class='editCandidateStatus'></select></td>");
	    	loadCandidateStatusList(result[i].id);
			
			$('#canstatus'+ result[i].id+' option[value='+result[i].candidateStatus+']').prop('selected', 'selected');
		
		}
	}	
}

//recruiter offerd candidate fun and modal load
function recruiterOfferedCandidateDetail(id){
	var result=ajaxCall('GET',contextPath()+"position/getInPositionDetails/"+atrId+"?posId="+id+"");
	//alert(JSON.stringify(result));
	$('#recruiterOfferedCandidateModal').modal('show');
	
	$('#recOfferedPosLink').html(result.atrposLink);
	$('#recOfferedAtrId').val(result.atrId);
	$('#recOfferedPosId').val(result.posId);
	$('#recOfferedAtsId').val(result.atsId);
	$('#recOfferedRecruiter').html(result.assignedToUser);
	
	$('#recOfferedClientName').html(result.clientName);
	$('#recOfferedExperience').html(result.experience);
	$('#recOfferedLocation').html(result.location);
	$('#recOfferedMaxsalary').html(result.maxsalary);
	$('#recOfferedMinsalary').html(result.minsalary);
	$('#recOfferedRole').html(result.role);
	$('#recOfferedSkills').html(result.skills);
	
	//$("#inprogressPositionStatusForManager option[value='4']").attr('selected','selected');
	
	$("#offeredPositionStatusForRecruiter option[value='2']").remove();
	//$("#offeredPositionStatusForRecruiter option[value='4']").remove();
	$("#offeredPositionStatusForRecruiter option[value='6']").remove();
	
	getRecruiterOfferedCandidateDetailList(result.atrId,result.posId);
}

function getRecruiterOfferedCandidateDetailList(atrId,posId){
	var result=ajaxCall('GET',contextPath()+"candidate/getOfferedCandidateList?atrId="+atrId+"&posId="+posId+"");
	//alert(JSON.stringify(result));
	if(result.length !=0){
		$('#recOfferedDiv').show();
		$('#recOfferedCandidateId').val(result[0].id);
		$('#recOfferedCandidateFirstName').html(result[0].firstName);
		$('#recOfferedCandidateLastName').html(result[0].lastName);
		$('#recOfferedCandidateEmail').html(result[0].email);
		$('#recOfferedCandidateMobile').html(result[0].mobile);
		$('#recOfferedCandidateOfferedDate').html(dateDisplay(result[0].offeredDate));
		$('#recOfferedCandidateJoiningDate').html(dateDisplay(result[0].joiningDate))
		
	}else{
		$('#recOfferedDiv').hide();
	}		
}


function recruiterFulfillCandidateDetail(id){
	var result=ajaxCall('GET',contextPath()+"position/getInPositionDetails/"+atrId+"?posId="+id+"");					
	$('#recruiterFulfilledCandidateModal').modal('show');
	$('#recFulfilledPosLink').html(result.atrposLink);
	$('#recFulfilledatrId').val(result.atrId);
	$('#recFulfilledposId').val(result.posId);
	$('#recFulfilledatsId').val(result.atsId);
	$('#recFulfilledreporter').html(result.assignedToUser);
	getRecruiterFulfilledCandidateDetailList(result.atrId,result.posId);
}

function getRecruiterFulfilledCandidateDetailList(atrId,posId){
	var result=ajaxCall('GET',contextPath()+"candidate/getFulfilledCandidateList?atrId="+atrId+"&posId="+posId+"");
	//alert("candidate information======"+JSON.stringify(result[0]));
	if(result.length !=0){
		var j=1;
			$('#recruiterFulfilledCandidateId').val(result[0].id);
			$('#recruiterFulfilledCandidateFirstName').html(result[0].firstName);
			$('#recruiterFulfilledCandidateLastName').html(result[0].lastName);
			$('#recruiterFulfilledCandidateEmail').html(result[0].email);
			$('#recruiterFulfilledCandidateMobile').html(result[0].mobile);
			$('#recruiterFulfilledCandidateOfferedDate').html(dateDisplay(result[0].offeredDate));
			$('#recruiterFulfilledCandidateJoiningDate').html(dateDisplay(result[0].joiningDate))
		
	}else{
		$('#recFulfillDiv').hide()
	}		
}

function editCandidateStatusList(selectedManagerId){
	var id=selectedManagerId;
	var data=ajaxCall('GET',contextPath()+"user/getUserById/"+id+"");
    if(data !=undefined){
    	$("#editManagerList option:gt(0)").remove();
		var  opt = "<option value='" + data.userId + "'selected>"
					+ data.userName + "</option>";
			$('#editManagerList').append(opt);
		
    } 
}

function changePositionStatus(id){
	if( id == '21' || id == '22'){
		$('.DHhide').hide();
	}
	else{
			$('.DHhide').show();
		}
}

function resetTodoPositionFormFunction() {
	var formset = $( "#positionStatusForm" ).validate();
	formset.resetForm();
	$("#positionStatusForm")[0].reset();
	$('.DHhide').show();
	 $("#ToStatusChangeDate").datepicker({ 
			format : 'dd/mm/yyyy',
			todayHighlight: true,
			startDate: '-15d',
			endDate: '+0d', 
			onClose: function() {
				  var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none
		    	  var max = new Date(min.getTime());
		          /   min.setMonth(max.getMonth());  /
		            max.setDate(max.getDate() + 30);
		            $('#to_date').datepicker('option', {minDate: min, maxDate: max});
		      }
		}).datepicker("setDate", "0"); 
}

function updatePositionDetail(){
	var stId=$('#positionStatus').val();
	if(stId =='4'){
	var editFormdata=$('#positionStatusForm').serializeJSON();
	if ($('#positionStatusForm').valid() == false) return false;
	$.ajax({
		type:"PUT",
		url:contextPath()+"position/updatePositionStatus?updatedBy="+userId+"",
		contentType: 'application/json',
		data: JSON.stringify(editFormdata),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	if(data=="success"){
	    		//alert("Position updated Successfully")
		    		//displayManagerPosition();
		    		location.reload();
			    	$('#editYetToPosModal').modal('hide');
	    	}
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        //////console.log( errorThrown );
	    }
		
	})
 }
	else{
		 
			$.ajax({
				type:"PUT",
				url:contextPath()+"position/updatePositionStatusDH?updatedBy="+userId+"",// YTS to Drop or Hold
				contentType: 'application/json',
				data: JSON.stringify({atrId:$('#atrId').val(), posId:$('#posId').val(), atsId:$('#atsId').val(),posStatusId:$('#positionStatus').val(),statusChangeDate:$('#ToStatusChangeDate').val(),comment:$('#comment').val()}),
			    processData: false,
			    success: function( data, textStatus, jQxhr ){
			    	if(data=="success"){
			    			location.reload();
					    	$('#editYetToPosModal').modal('hide');
			    	}
			    },
			    error: function( jqXhr, textStatus, errorThrown ){
			        //////console.log( errorThrown );
			    }
			
			});
		}
}


//update position for inprogress position and offered candidate information
function updateInprogressPositionByManager(){
	
	//validation inprogress position by manager
	if ($('#InProgressToOtherPositionStatusForm').valid() == false) return false;
		//update offered position with candidate add.
	if($('#inprogressPositionStatusForManager').val()==6  && $('#cFirstName').text()!="" ){
		$.ajax({
			type:"PUT",
			url:contextPath()+"position/updatePositionAndInsertCandidate?updatedBy="+userId+"",
			contentType: 'application/json',
			data: JSON.stringify({atrId:$('#iatrId').val(),posId:$('#iposId').val(),posStatusId:$('#inprogressPositionStatusForManager').val(),statusChangeDate:$('#InprogressStatusChangeDate').val(),firstName : $('#cFirstName').text(), lastName : $('#cLastName').text(), email :$('#cEmail').text(), mobile : $('#cMobile').text(),candidateStatus : 18,joiningDate:$('#cJoiningDate').text(),offeredDate:$('#cOfferedDate').text()}),
		    processData: false,
		    async: false,
		    success: function( data, textStatus, jQxhr ){
		    	location.reload();
		    },
		    error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
			
		})
	 
		//update drop or hold position.
	}else if( $('#inprogressPositionStatusForManager').val()==21 || $('#inprogressPositionStatusForManager').val()==22){
		$.ajax({
			type:"PUT",
			url:contextPath()+"position/updatePositionAndInsertCandidate?updatedBy="+userId+"",
			contentType: 'application/json',
			data: JSON.stringify({atrId:$('#iatrId').val(),posId:$('#iposId').val(),posStatusId:$('#inprogressPositionStatusForManager').val(),statusChangeDate:$('#InprogressStatusChangeDate').val()}),
		    processData: false,
		    async: false,
		    success: function( data, textStatus, jQxhr ){
		    	location.reload();
		    },
		    error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
			
		})
	}	
	
	
}



function updateInprogerssCandidateStatusByManager(){
	
	$.ajax({
		type:"PUT",
		url:contextPath()+"candidate/updateCandidateStatus?updatedBy="+userId+"",
		contentType: 'application/json',
		data: JSON.stringify({atrId:$('#iatrId').val(),posId:$('#iposId').val(),joiningDate:$('#miJoiningDate').val(),candidateStatus:$('#inprogressCandidateStatusByManager').val(), id:$('#candidateId').val()}),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	if(data=="success"){
	    		//alert("Position updated Successfully")
		    		//displayManagerPosition();
			    	$('#editInprogressToOtherModal').modal('hide');
			    	location.reload();
	    	}
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	})
}

function updateOfferedPositionToOtherByManager(){
	
		if ($('#managerOfferedPositionStatusForm').valid() == false) return false;
		
		if($('#offeredPositionStatusForManager').val()==4  &&  $('#manager_offerPos_OffercandidateId').val()!='' ){
			$.ajax({
				type:"PUT",
				url:contextPath()+"position/updateInprogressPositionToOtherAndCandidate?updatedBy="+userId+"",
				contentType: 'application/json',
				data: JSON.stringify({atrId:$('#managerOfferedAtrId').val(),posId:$('#managerOfferedPosId').val(),posStatusId:$('#offeredPositionStatusForManager').val(),statusChangeDate:$('.statusDate').val()}),
			    processData: false,
			    async: false,
			    success: function( data, textStatus, jQxhr ){
			    	updateOfferedCandidateStatusByManager();
			    },
			    error: function( jqXhr, textStatus, errorThrown ){
			        console.log( errorThrown );
			    }
				
			})
		}
		
		else if($('#offeredPositionStatusForManager').val()==8  &&  $('#manager_offerPos_OffercandidateId').val()!='' ){
			$.ajax({
				type:"PUT",
				url:contextPath()+"position/updateInprogressPositionToOtherAndCandidate?updatedBy="+userId+"",
				contentType: 'application/json',
				data: JSON.stringify({atrId:$('#managerOfferedAtrId').val(),posId:$('#managerOfferedPosId').val(),posStatusId:$('#offeredPositionStatusForManager').val(),statusChangeDate:$('.statusDate').val()}),
			    processData: false,
			    async: false,
			    success: function( data, textStatus, jQxhr ){
			    	updateOfferedCandidateStatusByManager();
			    },
			    error: function( jqXhr, textStatus, errorThrown ){
			        console.log( errorThrown );
			    }
				
			})
		}else if($('#offeredPositionStatusForManager').val()==21 || $('#offeredPositionStatusForManager').val()==22){
			$.ajax({
				type:"PUT",
				url:contextPath()+"position/updateInprogressPositionToOtherAndCandidate?updatedBy="+userId+"",
				contentType: 'application/json',
				data: JSON.stringify({atrId:$('#managerOfferedAtrId').val(),posId:$('#managerOfferedPosId').val(),posStatusId:$('#offeredPositionStatusForManager').val(),statusChangeDate:$('.statusDate').val()}),
			    processData: false,
			    async: false,
			    success: function( data, textStatus, jQxhr ){
			    	location.reload();
			    },
			    error: function( jqXhr, textStatus, errorThrown ){
			        console.log( errorThrown );
			    }
				
			})
		}
}

function updateOfferedCandidateStatusByManager(){
	$.ajax({
		type:"PUT",
		url:contextPath()+"candidate/updateCandidateStatus?updatedBy="+userId+"",
		contentType: 'application/json',
		data: JSON.stringify({atrId:$('#managerOfferedAtrId').val(),posId:$('#managerOfferedPosId').val(),joiningDate:$('#mJoiningDate').val(),candidateStatus:$('#managerOfferedCandidateStatus').val(), id:$('#manager_offerPos_OffercandidateId').val()}),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	location.reload();
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	})
}

function updateInprogressPositionByRecruiter(){
	if ($('#RecInProgressToOtherPositionStatusForm').valid() == false) return false;
	
	if($('#inprogressPositionStatusForRecruiter').val()==6  && $('#rec_DisplayCan_FirstName').text()!="" ){
		
		$.ajax({
			type:"PUT",
			url:contextPath()+"position/updatePositionAndInsertCandidate?updatedBy="+userId+"",
			contentType: 'application/json',
			data: JSON.stringify({atrId:$('#rec_atrId').val(),posId:$('#rec_posId').val(),posStatusId:$('#inprogressPositionStatusForRecruiter').val(),statusChangeDate:$('.recInprogressStatusChangeDate').val(),firstName : $('#rec_DisplayCan_FirstName').text(), lastName : $('#rec_DisplayCan_LastName').text(), email :$('#rec_DisplayCan_Email').text(), mobile : $('#rec_DisplayCan_Mobile').text(),candidateStatus : 18,joiningDate:$('#rec_DisplayCan_JoiningDate').text(),offeredDate:$('#rec_DisplayCan_OfferedDate').text()}),
		    processData: false,
		    async: false,
		    success: function( data, textStatus, jQxhr ){
		    	location.reload();
		    },
		    error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
			
		})
	 
		
	}else if( $('#inprogressPositionStatusForRecruiter').val()==21 || $('#inprogressPositionStatusForRecruiter').val()==22){
		$.ajax({
			type:"PUT",
			url:contextPath()+"position/updatePositionAndInsertCandidate?updatedBy="+userId+"",
			contentType: 'application/json',
			data: JSON.stringify({atrId:$('#rec_atrId').val(),posId:$('#rec_posId').val(),posStatusId:$('#inprogressPositionStatusForRecruiter').val(),statusChangeDate:$('.recInprogressStatusChangeDate').val()}),
		    processData: false,
		    async: false,
		    success: function( data, textStatus, jQxhr ){
		    	location.reload();
		    },
		    error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
			
		})
	}	
	
	
}

function updateOfferedPositionToOtherByRecruiter(){
	
	if ($('#recOfferedPositionStatusForm').valid() == false) return false;
	
	if($('#offeredPositionStatusForRecruiter').val()==4  &&  $('#recOfferedCandidateId').val()!='' ){
		$.ajax({
			type:"PUT",
			url:contextPath()+"position/updateInprogressPositionToOtherAndCandidate?updatedBy="+userId+"",
			contentType: 'application/json',
			data: JSON.stringify({atrId:$('#managerOfferedAtrId').val(),posId:$('#managerOfferedPosId').val(),posStatusId:$('#offeredPositionStatusForManager').val(),statusChangeDate:$('.statusDate').val()}),
		    processData: false,
		    async: false,
		    success: function( data, textStatus, jQxhr ){
		    	updateCandidateStatusByRecruiter();
		    },
		    error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
			
		})
	}
	
	else if($('#offeredPositionStatusForRecruiter').val()==8  &&  $('#recOfferedCandidateId').val()!='' ){
		
		$.ajax({
			type:"PUT",
			url:contextPath()+"position/updateInprogressPositionToOtherAndCandidate?updatedBy="+userId+"",
			contentType: 'application/json',
			data: JSON.stringify({atrId:$('#recOfferedAtrId').val(),posId:$('#recOfferedPosId').val(),posStatusId:$('#offeredPositionStatusForRecruiter').val(),statusChangeDate:$('#recStatusChangeDate').val()}),
		    processData: false,
		    async: false,
		    success: function( data, textStatus, jQxhr ){
		    	updateCandidateStatusByRecruiter();
		    },
		    error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
			
		})
	}else if($('#offeredPositionStatusForRecruiter').val()==21 || $('#offeredPositionStatusForRecruiter').val()==22){
		$.ajax({
			type:"PUT",
			url:contextPath()+"position/updateInprogressPositionToOtherAndCandidate?updatedBy="+userId+"",
			contentType: 'application/json',
			data: JSON.stringify({atrId:$('#recOfferedAtrId').val(),posId:$('#recOfferedPosId').val(),posStatusId:$('#offeredPositionStatusForRecruiter').val(),statusChangeDate:$('#recStatusChangeDate').val()}),
		    processData: false,
		    async: false,
		    success: function( data, textStatus, jQxhr ){
		    	location.reload();
		    },
		    error: function( jqXhr, textStatus, errorThrown ){
		        console.log( errorThrown );
		    }
			
		})
	}
	
	
}


function updateCandidateStatusByRecruiter(){
	$.ajax({
		type:"PUT",
		url:contextPath()+"candidate/updateCandidateStatus?updatedBy="+userId+"",
		contentType: 'application/json',
		data: JSON.stringify({atrId:$('#recOfferedAtrId').val(),posId:$('#recOfferedPosId').val(),joiningDate:$('#recJoiningDate').val(),candidateStatus:$('#recOfferedCandidateStatus').val(), id:$('#recOfferedCandidateId').val()}),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	location.reload();
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	})
} 

function selectStatus(id){
	if(id==16){
		$('#attachment').attr("hidden", false); 
	}else{
		$('#attachment').attr("hidden", true);
	}
}

function changeInprogressPositionStatusByManager(id){
	if(id==6){
		$('#managerAddCandidateDetailDiv').attr("hidden", false); 
		$('#iComment').val("");
		$('.inprogressCandidateStatusAndJoinDateDiv').hide();
		
	}else if(id==8){
		if(id==8 && $('#candidateId').val()!=""){
			$('.inprogressCandidateStatusAndJoinDateDiv').show();
			$("#inprogressCandidateStatusByManager option[value='23']").attr('selected','selected');
		}else{
			//$("#managerOfferedCandidateStatus option[value='23']").attr('selected','selected');
			alert("please select offered status and create candidate");
			$("#inprogressCandidateStatusByManager").prop("selected", false);
		}
	}else if(id==21 || id==22){
		$('#managerAddCandidateDetailDiv').attr("hidden", true); 
		$('.inprogressCandidateStatusAndJoinDateDiv').hide();
	}
	
	else{
		$('#managerAddCandidateDetailDiv').attr("hidden", true); 
	}
}

function changeInprogressCandidateStatusByManager(id){
	if(id==23){
		if(id==23){
			$("#inprogressPositionStatusForManager option[value='8']").attr('selected','selected');
		}else{
			$("#inprogressPositionStatusForManager").prop("selected", false);
		}
	
	}else if(id==19){
		if(id==19){
			$("#inprogressPositionStatusForManager option[value='4']").attr('selected','selected');
		}else{
			$("#inprogressPositionStatusForManager").prop("selected", false);
		}
		
	}
}

function changeOfferedPositionStatusByManager(id){
	if(id==4){
		$("#managerOfferedCandidateStatus option[value='19']").attr('selected','selected');
		$('.offeredCandidateStatusAndJoinDateDiv').show();
		$('#candidateJoiningDateDiv').hide();
		
	}else if(id==8){
		if(id==8){
			$("#managerOfferedCandidateStatus option[value='23']").attr('selected','selected');
			$('.offeredCandidateStatusDiv').show();
			$('.offeredCandidateJoinDateDiv').show();
		}else{
			//$("#managerOfferedCandidateStatus option[value='23']").attr('selected','selected');
			$("#managerOfferedCandidateStatus").prop("selected", false);
		}
		
		
	}
	else if(id==21){
		$('.offeredCandidateStatusDiv').hide();
		$('.offeredCandidateJoinDateDiv').hide();
	}
	else if(id==22){
		$('.offeredCandidateJoinDateDiv').hide();
	}
	
	else{
		$('#managerAddCandidateDetailDiv').attr("hidden", true); 
	}
}
function changeOfferedCandidateStatusByManager(id){
	if(id==23){
		if(id==23){
			$("#offeredPositionStatusForManager option[value='8']").attr('selected','selected');
		}else{
			$("#offeredPositionStatusForManager").prop("selected", false);
		}
	
	}else if(id==19){
		if(id==19){
			$("#offeredPositionStatusForManager option[value='4']").attr('selected','selected');
			$('#candidateJoiningDateDiv').hide();
		}else{
			$("#offeredPositionStatusForManager").prop("selected", false);
		}
		
	}
}
function changeInprogressPositionStatusByRecruiter(id){
	if(id==6){
		$('#recruiterAddCandidateDetailDiv').attr("hidden", false); 
		$('#iComment').val("");
		$('.rec_InprogressCandidateStatusAndJoinDateDiv').hide();
		
	}else if(id==8){
		if(id==8 && $('#candidateId').val()!=""){
			$('.inprogressCandidateStatusAndJoinDateDiv').show();
			$("#inprogressCandidateStatusByManager option[value='23']").attr('selected','selected');
		}else{
			//$("#managerOfferedCandidateStatus option[value='23']").attr('selected','selected');
			alert("please select offered status and create candidate");
			$("#inprogressCandidateStatusByManager").prop("selected", false);
		}
	}else if(id==21 || id==22){
		$('#recruiterAddCandidateDetailDiv').attr("hidden", true); 
		$('.offeredCandidateStatusAndJoinDateDiv').hide();
	}
	
	else{
		$('#recruiterAddCandidateDetailDiv').attr("hidden", true); 
	}
}
function changeOfferedPositionStatusByRecruiter(id){
	if(id==4){
		$('#recOfferedCandidateStatus').prop('selectedIndex',0);
		$("#recOfferedCandidateStatus option[value='19']").attr('selected','selected');
		$('.recOfferedCandidateStatusAndJoinDateDiv').show();
		$('#candidateJoiningDateDiv').hide();
		
	}else if(id==8){
		if(id==8){
			$('#recOfferedCandidateStatus').prop('selectedIndex',0);
			$("#recOfferedCandidateStatus option[value='23']").attr('selected','selected');
			$('.recOfferedCandidateStatusAndJoinDateDiv').show();
		}else{
			//$("#managerOfferedCandidateStatus option[value='23']").attr('selected','selected');
			$('#recOfferedCandidateStatus').prop('selectedIndex',0);
		}
		
		
	}
	else if(id==21 || id==22){
		$('.recOfferedCandidateStatusAndJoinDateDiv').hide();
	}
	
	
}

function changeOfferedCandidateStatusByRecruiter(id){
	if(id==23){
		if(id==23){
			$('#offeredPositionStatusForRecruiter').prop('selectedIndex',0);
			$("#offeredPositionStatusForRecruiter option[value='8']").attr('selected','selected');
			//$("#offeredPositionStatusForRecruiter option[value='4']").prop("selected", false)
		}else{
			$('#offeredPositionStatusForRecruiter').prop('selectedIndex',0);
			$("#offeredPositionStatusForRecruiter option[value='4']").attr('selected','selected');
			//$("#offeredPositionStatusForRecruiter option[value='8']").prop("selected", false)
		}
		
	}else if(id==19){
		if(id==19){
			$('#offeredPositionStatusForRecruiter').prop('selectedIndex',0);
			$("#offeredPositionStatusForRecruiter option[value='4']").attr('selected','selected');
			//$("#offeredPositionStatusForRecruiter option[value='8']").prop("selected", false)
		}else{
			$('#offeredPositionStatusForRecruiter').prop('selectedIndex',0);
			$("#offeredPositionStatusForRecruiter option[value='8']").attr('selected','selected');
			//$("#offeredPositionStatusForRecruiter option[value='4']").prop("selected", false)
		}
		
	}
}
//manager add candidate 
function mangerAddCandidate(){
	if ($('#manager_add_candidateDetailForm').valid() == false) return false;
	
	$('#ManagerCandidateDetailDivDisplay').show();
	//$('#candidateId').val(result[0].id);
	$('#cFirstName').html($('#manger_add_firstName').val());
	$('#cLastName').html($('#manger_add_lastName').val());
	$('#cEmail').html($('#manger_add_email').val());
	$('#cMobile').html($('#manger_add_mobile').val());
	$('#cOfferedDate').html($('#manger_add_candidateOfferedDate').val());
	$('#cJoiningDate').html($('#manger_add_candidateExpectedJoiningDate').val());
	$('#cFileAttachment').html($('#manger_add_attachment').val())
	
	$('#managerAddCandidateDetailDiv').attr("hidden", true); 
	
	
	//firstName : , lastName : , email : , mobile : ,candidateStatus : $('#candidateStatusList').val(),resumePath : resumePath
	/*
	var resumePath;
	if ($('#manager_add_candidateDetailForm').valid() == false) return false;
	
	$.ajax({
	    url: "candidate/uploadFile",
	    type: "POST",
	    data: new FormData($("#manager_add_candidateDetailForm")[0]),
	    enctype: 'multipart/form-data',
	    processData: false,
	    contentType: false,
	    cache: false,
	    async: false,
	    success: function (data) {
	      console.log(data);
	      resumePath=data.path
	    },
	    error: function () {
	     
	    }
	  });
	    

	$.ajax({
		type:"POST",
		url:"candidate/addCandidateByManager?createdBy="+userId+"",
		contentType: 'application/json',
    	processData: false,  
      cache: false,
      //data: JSON.stringify(candidateDetailForm),
      data :JSON.stringify( {atrId:$('#icatrId').val(),posId:$('#icposId').val(),firstName : $('#manger_add_firstName').val(), lastName : $('#manger_add_lastName').val(), email :$('#manger_add_email').val() , mobile : $('#manger_add_mobile').val(),candidateStatus : $('#manager_add_candidateStatusList').val(),resumePath : resumePath }),
	    success: function( data, textStatus, jQxhr ){
	    		//alert("Candidate added successfully")
	    		getCandidateDetailListManager();
	    		$("#manager_add_candidateDetailForm")[0].reset();
	    		
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	})*/
	 
}


//recruiter add candidate 
function recruiterAddCandidate(){
	if ($('#recruiter_add_candidateDetailForm').valid() == false) return false;
	
	$('#recruiterCandidateDetailDivDisplay').show();
	//$('#candidateId').val(result[0].id);
	$('#rec_DisplayCan_FirstName').html($('#recruiter_add_firstName').val());
	$('#rec_DisplayCan_LastName').html($('#recruiter_add_lastName').val());
	$('#rec_DisplayCan_Email').html($('#recruiter_add_email').val());
	$('#rec_DisplayCan_Mobile').html($('#recruiter_add_mobile').val());
	$('#rec_DisplayCan_OfferedDate').html($('#manger_add_candidateOfferedDate').val());
	$('#rec_DisplayCan_JoiningDate').html($('#manger_add_candidateExpectedJoiningDate').val());
	
	$('#recruiterAddCandidateDetailDiv').attr("hidden", true); 
	
	/*
	var resumePath;
	if ($('#recruiter_add_candidateDetailForm').valid() == false) return false;
	$.ajax({
	    url: "candidate/uploadFile",
	    type: "POST",
	    data: new FormData($("#recruiter_add_candidateDetailForm")[0]),
	    enctype: 'multipart/form-data',
	    processData: false,
	    contentType: false,
	    cache: false,
	    async: false,
	    success: function (data) {
	      console.log(data);
	      resumePath=data.path
	    },
	    error: function () {
	     
	    }
	  });
		    
	$.ajax({
		type:"POST",
		url:"candidate/addCandidate?createdBy="+userId+"",
		contentType: 'application/json',
    	processData: false,  // tell jQuery not to process the data
      cache: false,
      //data: JSON.stringify(candidateDetailForm),
      data :JSON.stringify( {atrId:$('#catrId').val(),posId:$('#cposId').val(),firstName : $('#firstName').val(), lastName : $('#lastName').val(), email :$('#email').val() , mobile : $('#mobile').val(),candidateStatus : $('#candidateStatusList').val(),resumePath : resumePath }),
	    success: function( data, textStatus, jQxhr ){
	    		//alert("Candidate added successfully")
	    		getCandidateDetailList();
	    		$("#recruiter_add_candidateDetailForm")[0].reset();
	    		
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	})*/
	 
}



function uploadFile() {
$.ajax({
  url: contextPath()+"candidate/uploadFile",
  type: "POST",
  data: new FormData($("#upload-file-form")[0]),
  enctype: 'multipart/form-data',
  processData: false,
  contentType: false,
  cache: false,
  success: function (data) {
    console.log(data);
  },
  error: function () {
   
  }
});
} 
