$(document).ready(function(){
	
    $(".btn-primary").click(function(){
        
       $.ajax({
   		type:"POST",
   		url:"user/add",
   		contentType: 'application/json',
   	    data: JSON.stringify( 
   	    	{   "firstName": $('#firstName').val(),
    			"lastName": $('#lastName').val(),
    			"email":$('#inputEmail').val(),
    			"password": $('#inputPassword').val(),
    			"role": $('#role').val(),
    			"manager":$('#reporter').val()
   	    	} ),
   	    processData: false,
   	    success: function( data, textStatus, jQxhr ){
//   	    	alert(data);
   	    	if(data == "success")
   	    		{
   	    		$( '#register' ).each(function(){
   	    		    this.reset();
   	    		});
   	    		$( '#role' ).selectpicker("refresh");
   	    		$( '#reporter' ).selectpicker("refresh");
   	    		window.location="/index.html"
   	    		}
   	    	else{
   	    		alert(data);
   	    	}
   	    	
//   	        $('#response pre').html( JSON.stringify( data ) );
   	    	
   	    },
   	    error: function( jqXhr, textStatus, errorThrown ){
   	        console.log( errorThrown );
   	    }
   		
   	}) 
    });
    
//    $('#role').selectpickerAjax({
//        ajax: 'https://jsonplaceholder.typicode.com/todos/1',
//        ajaxCallback: function(q, cb){
//            $.get('http://php-iqbalfn.rhcloud.com/bsa/', {q: q}, function(res){
//                console.log('ajax done');
//                cb(res);
//            });
//        }
//    });
    
    $("#role").change(function() {  
        var role_id = $(this).find(":selected").val();
        var request = $.ajax({
            type: 'GET',
            url: '/user/getUserByRoleId/' + role_id,
        });
        request.done(function(data){ 
            $("#reporter").empty();
            for (var i = 0; i < data.length; i++) {
                $("#reporter").append(
                    $("<option></option>").attr(
                        "value", data[i]['id']).text(data[i]['firstName'] + " " + data[i]['lastName'])
                );
            }
            $('#reporter').selectpicker("refresh");
        });
    });
    
    function addPersonDetails(){
    	$.ajax({
    		type:"POST",
    		url:"data/person/add",
    		contentType: 'application/json',
    	    data: JSON.stringify( { "first_name": $('#first_name').val(), "last_name": $('#last_name').val() } ),
    	    processData: false,
    	    success: function( data, textStatus, jQxhr ){
    	        $('#response pre').html( JSON.stringify( data ) );
    	    },
    	    error: function( jqXhr, textStatus, errorThrown ){
    	        console.log( errorThrown );
    	    }
    		
    	}) 
    	loadPerson();
    }
    
//    function clearRegister(){
//    	$('#firstName').val() = "";
//		$('#lastName').val()= "";
//		$('#inputEmail')= "";
//		$('#inputPassword').val()= "";
//		$('#role').val()= "";
//		$('#reporter').val()= "";
//    }

});

