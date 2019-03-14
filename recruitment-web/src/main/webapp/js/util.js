function contextPath() {
//	return "http://"+location.host+"/rec/";
	return "http://"+location.hostname+":7072/rec/";
}
function ajaxCall(method,url) {
	//var loading = $.loading();//used for ajax-loading image in every ajax request time.
	$.ajax({
		type : method,
		url  : url,
		async: false,
		cache: false,
		//data : {jsonArray:data},
		success:function(data)
		{
			if(data != undefined){
				successData=data;
			}
			
			updateCookieTimeout();
			/*if(data.userEmail!=null)
				updateCookie(data);
			else
				if(data.user=="invalid"){
					deleteCookie();
					return $(location).attr("href",contextPath()+"/college/login");
				}*/
			
		},
		error: function (xhr, ajaxOptions, thrownError) {
			updateCookieTimeout();
			/*if(GetCookies("college")==null)
			    return $(location).attr("href",contextPath()+"/college/login");
			if(xhr.status=="401")
				return $(location).attr("href",contextPath()+"/college/"+collegeRecId+"/page/unauthorized");*/
	    }
	});
	return successData;
}

function ajaxCall(method,url,data) {
	//var loading = $.loading();//used for ajax-loading image in every ajax request time.
	$.ajax({
		type : method,
		url  : url,
		async: false,
		cache: false,
		data : {jsonArray:data},
		success:function(data)
		{
			updateCookieTimeout();
			if(data != undefined){
				successData=data;
			}
			
			/*if(data.userEmail!=null)
				updateCookie(data);
			else
				if(data.user=="invalid"){
					deleteCookie();
					return $(location).attr("href",contextPath()+"/college/login");
				}*/
			
		},
		error: function (xhr, ajaxOptions, thrownError) {
			updateCookieTimeout();
			/*if(GetCookies("college")==null)
			    return $(location).attr("href",contextPath()+"/college/login");
			if(xhr.status=="401")
				return $(location).attr("href",contextPath()+"/college/"+collegeRecId+"/page/unauthorized");*/
	    }
	});
	return successData;
}




function GetURLParameter(sParam){
var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split('&');
for (var i = 0; i < sURLVariables.length; i++){
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam){
			return sParameterName[1];
		}
	}
}

function isNull(string){
	if(string == null || string == "" || string == "null")
		return "";
	return string;
}

function dateDisplay(date){
	if(date==null) return "";
	var splitDate = new Array(3);
	splitDate=date.split("-");
	day=splitDate[2];
	month =splitDate[1] ;
	year=splitDate[0];
	return ""+day+"/"+month+"/"+year;
}
