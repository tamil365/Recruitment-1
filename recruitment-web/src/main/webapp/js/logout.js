$(document).ready(function(){
	
	$("#logoutbtn").click(function(){
		deleteCookie();
		window.location.replace("login.html");
	 });
});