
//set cookie value.
 function setCookie(value, time) {
		document.cookie = "Loginuser=" + escape(value) + ";expires=" + time+ "; path=/";
}
 //update cookie value.
 function updateCookie(data) {
	// alert(JSON.stringify(data));
	var userId = data[0].userId;
	var email = data[0].email;
	var userName = data[0].userName;
	var firstName = data[0].firstName;
	var manager = data[0].manager;
	var roleId = data[0].roleId;
	var value = "email:" + email + ",userId :" + userId + ",userName:"
			+ userName + ",firstName :" + firstName + ",manager:" + manager
			+ ",roleId:" + roleId + "";
	//alert(JSON.stringify(value));
	var today = new Date();
	// 1000 milliseconds and 60 seconds and 30 minutes
	var expire = new Date();
	expire.setTime(today.getTime() + 1000 * 60 * 60);
	setCookie(value, expire.toGMTString());
	
}

	var expire = new Date();
 function updateCookieTimeout() { 
		var today = new Date();
		// 1000 milliseconds and 60 seconds and 30 minutes
		expire.setTime(today.getTime() + 1000 * 60 * 60);
		var cookieValue=GetCookies("Loginuser");
		setCookie(cookieValue, expire.toGMTString()); 
	}
   
 //delete cookie
 function deleteCookie() {
//		var expire = new Date();
//		setCookie("deleted", expire.toGMTString());
		//document.cookie = 'Loginuser=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		setCookie("Loginuser","Thu, 01 Jan 1970 00:00:01 GMT");
} 
 
//Retrieve the value of the cookie with the specified name.
 function GetCookies(sName) {
 	// cookies are separated by semicolons
 	var aCookie = document.cookie.split("; ");
 	for (var i=0; i < aCookie.length; i++) {
 	  // a name/value pair (a crumb) is separated by an equal sign
 	  var aCrumb = aCookie[i].split("=");
 	  if (sName == aCrumb[0]) 
 	    return unescape(aCrumb[1]);
 	}
 	// a cookie with the requested name does not exist
 	return null;
 } 
 var userName,firstName,manager,roleId,userId,email;

 function getCookie() {
 	var cookieValue=GetCookies("Loginuser");
 	if(cookieValue!=null){
 		 email=cookieValue.split(",")[0].split(":")[1];
 		 userId=cookieValue.split(",")[1].split(":")[1];
 		 userName=cookieValue.split(",")[2].split(":")[1];
 		 firstName=cookieValue.split(",")[3].split(":")[1];
 		 manager=cookieValue.split(",")[4].split(":")[1];
 		 roleId=cookieValue.split(",")[5].split(":")[1];
 		 
 		 
 	}
 } 
