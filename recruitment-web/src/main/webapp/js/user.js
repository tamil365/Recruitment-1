$(document).ready(function(){
	getCookie();
	var user = firstName;
	$('#loguserName').html( user  );
	if(typeof userId!=="undefined" && typeof roleId!=="undefined" ){
		loadRoleList();
		loadUserDetails();
		
		if(roleId==2 || roleId==4 || roleId==5){
			$('#createUserBtn').attr("disabled", false);
			
		}else{
			$('#createUserBtn').attr("disabled", true);
		}
	}else{
		window.location.replace("login.html");
	}
	
	
	$('#userRegisterForm').validate({ 
		rules : {
			firstName : {required : true ,minlength : 4,firstalpha:true ,numbervalidation:true,splvalidation:true },
			lastName : {required : true ,minlength : 1, firstalpha : true,numbervalidation:true,splvalidation:true  },
			userName : {required : true ,minlength : 4},
			email : {required : true,email:true },
			userPassword : {required : true ,password :true},
			userRepassword : {required : true ,equalTo: "#userPassword"},
			roleId : {required : true, selectcheck : true},
			manager : {required : true, selectcheck : true },
		},
		messages : {
			firstName: {required : "Enter First Name" ,minlength :"Enter atleast 4 character", firstalpha : "Enter valid character", numbervalidation:"Number not allowed ",splvalidation:"Special character not allowed"},
			lastName : {required : "Enter Last Name" , minlength :"Enter atleast 1 character" , firstalpha : "Enter valid character",numbervalidation:"Number not allowed ",splvalidation:"Special character not allowed"},
			userName : {required : "Enter User Name", minlength :"Enter atleast 4 character" },
			email : {required : "Enter Email",email:"Enter valid Email address"},
			userPassword : {required : "Enter Password" , password :"Enter Min 6 characters with atleast one letter and number"},
			userRepassword : {required : "Re-Enter Password" , equalTo :"Both Password should be same"},
			roleId : {required : "Select Role", selectcheck : true},
			manager : {required : "Select Manager", selectcheck : true},
			
		}
	});
	
	//validation update user
	$('#updateUserForm').validate({ 
		rules : {
			firstName : {required : true ,minlength : 4,lettersonly:true },
			lastName : {required : true ,minlength : 1,lettersonly:true},
			userName : {required : true ,minlength : 4},
			email : {required : true,email:true },
			roleId : {required : true,selectcheck : true},
			manager : {required : true, selectcheck : true },
		},
		messages : {
			firstName: {required : "Enter First Name" ,minlength :"Enter atleast 4 character",lettersonly:"Letters only allowed"},
			lastName : {required : "Enter Last Name" , minlength :"Enter atleast 1 character" ,lettersonly:"Letters only allowed"},
			userName : {required : "Enter User Name", minlength :"Enter atleast 4 character" },
			email : {required : "Enter Email",email:"Enter valid Email address"},
			roleId : {required : true, selectcheck : "Select role"},
			manager : {required : true, selectcheck : "Select Manager"},	
			
		}
	});
	
	
	
});


function loadUserDetails(){
var result=ajaxCall('GET',contextPath()+"user/getUserList");
if(result.length !=0){
	var j=1;
	$('#userDisplay tr:gt(0)').remove();
	for(var i in result){
		$('#userDisplay').append("<tr id=userDisplayRowId"+i+"></tr>");
		$('#userDisplayRowId'+i).append("<td>"+ j++ +"</td>");
		$('#userDisplayRowId'+i).append("<td class='text-capitalize'>"+ result[i].firstName +"</td>");
		$('#userDisplayRowId'+i).append("<td class='text-capitalize'>"+ result[i].lastName +"</td>");
		$('#userDisplayRowId'+i).append("<td class='text-capitalize'>"+ result[i].userName +"</td>");
		$('#userDisplayRowId'+i).append("<td>"+ result[i].email +"</td>");
		$('#userDisplayRowId'+i).append("<td><button class='btn btn-success' id='editUserBtn"+i+"' onclick='getUserDetail("+ result[i].userId +")'><span class='fa fa-eye'></span> View</button><button class='btn btn-danger' id='deleteUserBtn"+i+"' onclick='deleteUserDetail("+ result[i].userId +")'> Remove</button></td>");
	
		if(roleId==2 || roleId==4 || roleId==5){
			$('#editUserBtn'+i).prop("disabled", false);
			$('#deleteUserBtn'+i).prop("disabled", false);
		}else{
			$('#editUserBtn'+i).prop("disabled", true);
			$('#deleteUserBtn'+i).prop("disabled", true);
			
		}
	}
}



}

function loadRoleList(){
	$.ajax({
		type : "GET",
		url : contextPath()+"user/getRoleList",
		success: function(data){
			for (var i = 0; i < data.length; i++) {
				 opt = "<option value='" + data[i].id + "'>"
						+ data[i].roleName + "</option>";
				$('#role').append(opt);
				$('#editRoleList').append(opt);
				
			}
		},
		error : function(e) {
			$("#role").html("<strong>Error</strong>");
		}
	});	
}

function getManagerList(selectedRoleId){
	if(selectedRoleId==1){
		alert("CEO already Exist. Please Choose another Role");
	}
	
	else if(selectedRoleId==3){
    	var roleId=selectedRoleId;
    	var data=ajaxCall('GET',contextPath()+"user/getManagerList/"+roleId+"");
	    if(data !=undefined){
		    $("#managerList option:gt(0)").remove();
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].userName);
				var  opt = "<option value='" + data[i].userId + "'>"
						+ data[i].userName + "</option>";
				$('#managerList').append(opt);
			}
	    } 
	}
	

    else if(selectedRoleId==5){
    	var roleId=selectedRoleId;
    	var data=ajaxCall('GET',contextPath()+"user/getManagerList/"+roleId+"");
	    if(data !=undefined){
		    $("#managerList option:gt(0)").remove();
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].userName);
				var  opt = "<option value='" + data[i].userId + "'>"
						+ data[i].userName + "</option>";
				$('#managerList').append(opt);
			}
	    } 
	}
    	
    else if(selectedRoleId==2 || selectedRoleId==4 ){
    	var roleId=selectedRoleId;
    	var data=ajaxCall('GET',contextPath()+"user/getManagerList/"+roleId+"");
	    if(data !=undefined){
		    $("#managerList option:gt(0)").remove();
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].userName);
				var  opt = "<option value='" + data[i].userId + "'>"
						+ data[i].userName + "</option>";
				$('#managerList').append(opt);
			}
	    } 
	}
    	
}

function editGetManagerList(selectedRoleId){
	if(selectedRoleId==1){
		alert("CEO already Exist. Please Choose another Role");
	}
	else if(selectedRoleId==3){
    	var roleId=selectedRoleId;
    	var data=ajaxCall('GET',contextPath()+"user/getManagerList/"+roleId+"");
	    if(data !=undefined){
			$("#editManagerList option:gt(0)").remove();
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].userName);
				var  opt = "<option value='" + data[i].userId + "'>"
						+ data[i].userName + "</option>";
				$('#editManagerList').append(opt);
			}
	    } 
	}
	
    else if(selectedRoleId==5){
    	var roleId=selectedRoleId;
    	var data=ajaxCall('GET',contextPath()+"user/getManagerList/"+roleId+"");
	    if(data !=undefined){
			$("#editManagerList option:gt(0)").remove();
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].userName);
				var  opt = "<option value='" + data[i].userId + "'>"
						+ data[i].userName + "</option>";
				$('#editManagerList').append(opt);
			}
	    } 
	}
    	
    else if(selectedRoleId==2 || selectedRoleId==4 ){
    	var roleId=selectedRoleId;
    	var data=ajaxCall('GET',contextPath()+"user/getManagerList/"+roleId+"");
	    if(data !=undefined){
			$("#editManagerList option:gt(0)").remove();
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].userName);
				var  opt = "<option value='" + data[i].userId + "'>"
						+ data[i].userName + "</option>";
				$('#editManagerList').append(opt);
			}
	    } 
	}
  
}


function editManagerList(selectedManagerId){
	var id=selectedManagerId;
	var data=ajaxCall('GET',contextPath()+"user/getUserById/"+id+"");
    if(data !=undefined){
    	$("#editManagerList option:gt(0)").remove();
		var  opt = "<option value='" + data.userId + "'selected>"
					+ data.userName + "</option>";
			$('#editManagerList').append(opt);
		
    } 
}

//create user function
function registerUser(){
	var formdata=$('#userRegisterForm').serializeJSON();
	if ($('#userRegisterForm').valid() == false) return false;
	  $.ajax({
		type:"POST",
		url:contextPath()+"user/addUser",
		contentType: 'application/json',
		data: JSON.stringify(formdata),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	if(data=="success"){
	    		alert("User created Successfully")
	    			resetUserFunction();
		    		$('#addUserModal').modal('hide');
		    		loadUserDetails();
	    	}
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    } 
		
	}); 
	
}
//reset the value after added form
function resetUserFunction() {
	var validator1 = $( "#userRegisterForm" ).validate();
	validator1.resetForm();
	$("#userRegisterForm")[0].reset();
}
// particular user detail loaded 
function getUserDetail(id){
	var result=ajaxCall('GET',contextPath()+"user/getUserById/"+id+"");
	if(result.length !=0){
		$('#editUserModal').modal('show');
		$("#editManagerList option:gt(0)").remove();
		$('#editUserId').val(result.userId);
		$('#editFirstName').val(result.firstName);
		$('#editLastName').val(result.lastName);
		$('#editUserName').val(result.userName);
		$('#editEmail').val(result.email);
		$("#editRoleList option[value='"+result.roleId+"']").prop('selected','selected');
		editManagerList(result.manager);
		$("#editGetManagerList option[value='"+result.roleId+"']").prop('selected','selected');
		
	}	

}


// update user detail function.
function updateUserDetails(){
	var editFormdata=$('#updateUserForm').serializeJSON();
	if ($('#updateUserForm').valid() == false) return false;
	$.ajax({
		type:"PUT",
		url:contextPath()+"user/updateUser/"+$('#editUserId').val()+"",
		contentType: 'application/json',
		data: JSON.stringify(editFormdata),
	    processData: false,
	    success: function( data, textStatus, jQxhr ){
	    	$('#editUserModal').modal('hide');
	    	loadUserDetails();
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	})
	
}

function deleteUserDetail(id){
	
	var result=confirm("Are you sure?");
    if (result == true) {
    	$.ajax({
    		type:"DELETE",
    		url:contextPath()+"user/deleteUser/"+id+"",
    		contentType: 'application/json',
    	    processData: false,
    	    success: function( data, textStatus, jQxhr ){
    	    	alert("User deleted successfully");
    	    		loadUserDetails();
    	    },
    	    error: function( jqXhr, textStatus, errorThrown ){
    	        console.log( errorThrown );
    	    }
    		
    	})
    }
    else{
    	return false;
    }
	
	
}


