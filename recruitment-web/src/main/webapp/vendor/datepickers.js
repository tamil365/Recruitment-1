function dateAndTime()
{
	$("#datepicker").datepicker({
		dateFormat : 'dd/mm/yyyy',
			changeMonth: true,
		      changeYear: true,
		   // yearRange: '1900:+1',
		  //  maxDate: "+0M +0D"
		    	yearRange: '-1:+1',
	});
	
	$("#datepicker1").datepicker({
		dateFormat : 'dd/mm/yyyy',
		changeMonth: true,
	      changeYear: true,
	      yearRange: '-1:+1',
		    
	});
	
	$(".toggleElement").datepicker({
		dateFormat : 'dd/mm/yy',
		changeMonth: true,
		changeYear: true,
		yearRange: '0Y:+1',
		minDate: "+0M +0D" ,
		maxDate: "+12M +0D" ,
	});
	
}



function timepickers()
{
	$('#timepicker').timepicker({
        showPeriod: true,
        showLeadingZero: true
    });
	
	$('#timepicker1').timepicker({
        showPeriod: true,
        showLeadingZero: true
    });
}

function messgaeCount() {
    $('#messagetxt').keyup(function() {
    	/*noOfMsg=($("#messagetxt").val().length)/160;
		if((($("#messagetxt").val().length)%160)>0){
			noOfMsg++;
		}
		$('#noOfMessages').html(Math.floor(noOfMsg));
        $('#message_feedback').html((($("#messagetxt").val().length)%160));*/
        
        
        var x=$("#messagetxt").val();
    	var newLines = x.match(/(\r\n|\n|\r)/g);
        var addition = 0;
        if (newLines != null) {
            addition = newLines.length;
        }
        var finalLength=(x.length + addition);
    	
    	$("#message_feedback").html(finalLength);
    	
    	noOfMsg=(finalLength)/160;
    	
    	if(((finalLength)%160)>0){
    		noOfMsg++;
    	}
    	$('#noOfMessages').html(Math.floor(noOfMsg));
        
    });
    
    $('#editMessage').keyup(function() {
    	/*noOfMsg=($("#editMessage").val().length)/160;
		if((($("#editMessage").val().length)%160)>0){
			noOfMsg++;
		}
		$('#noOfMessages_edit').html(Math.floor(noOfMsg));
        $('#message_feedback_edit').html((($("#editMessage").val().length)%160));*/
    	
    	 var x=$("#editMessage").val();
     	var newLines = x.match(/(\r\n|\n|\r)/g);
         var addition = 0;
         if (newLines != null) {
             addition = newLines.length;
         }
         var finalLength=(x.length + addition);
     	
     	$("#message_feedback_edit").html(finalLength);
     	
     	noOfMsg=(finalLength)/160;
     	
     	if(((finalLength)%160)>0){
     		noOfMsg++;
     	}
     	$('#noOfMessages_edit').html(Math.floor(noOfMsg));
    	
    });
}

function totalMessageCount() {
/*	var noOfMsg=($("#editMessage").val().length)/160;
	if((($("#editMessage").val().length)%160)>0){
		noOfMsg++;
	}
	$('#noOfMessages_edit').html(Math.floor(noOfMsg));
    $('#message_feedback_edit').html((($("#editMessage").val().length)%160));*/

    var x=$("#editMessage").val();
	var newLines = x.match(/(\r\n|\n|\r)/g);
    var addition = 0;
    if (newLines != null) {
        addition = newLines.length;
    }
    var finalLength=(x.length + addition);
	
	$("#message_feedback_edit").html(finalLength);
	
	noOfMsg=(finalLength)/160;
	
	if(((finalLength)%160)>0){
		noOfMsg++;
	}
	$('#noOfMessages_edit').html(Math.floor(noOfMsg));
	
}

$(function() {

	$("#datepicker").datepicker({
			dateFormat : 'yy-mm-dd',
				changeMonth: true,
			      changeYear: true,
			   // yearRange: '1900:+1',
			  //  maxDate: "+0M +0D"
			    	yearRange: '-1:+1',
		});
	
	$("#datepicker1").datepicker({
		dateFormat : 'yy-mm-dd',
		changeMonth: true,
	      changeYear: true,
	      yearRange: '-1:+1',
		    
	});
	
	$(".datepickerclass").datepicker({
		dateFormat : 'yy-mm-dd',
			changeMonth: true,
		      changeYear: true,
		   // yearRange: '1900:+1',
		  //  maxDate: "+0M +0D"
		    	yearRange: '-1:+1',
	});
	
	$('#timepicker').timepicker({
        showPeriod: true,
        showLeadingZero: true
    });
	
	$('#timepicker1').timepicker({
        showPeriod: true,
        showLeadingZero: true
    });
	        
});