/**
 * Jerlin 06-12-2014
 */

$( function (){
		
		$.validator.addMethod("lettersonly", function(value, element) {
		  return this.optional(element) || /^[a-zA-Z]+$/i.test(value);
		}, "Letters only please");
	
		//first alpha or number	
		$.validator.addMethod("firstalphanumber",function(value, element) {
			 if(value =="") return true;
				return /^[a-zA-Z0-9]+/.test(value);
		        }, "First special char not allowed"
		);
		
		//first alpha 
		$.validator.addMethod("firstalpha",function(value, element) {
			 if(value =="") return true;
				return /^[a-zA-Z]+/.test(value);
		        },"First letter should be A-Z"
		);
		
		//upper case and number only allowed	
		$.validator.addMethod("uppercasenumber",function(value, element) {
			 if(value =="") return true;
				return /^([A-Z0-9])*$/.test(value);
		        }, "Enter valid number"
		);
		
		//name	
		$.validator.addMethod("alphaspacevalidation",function(value, element) {
			 if(value =="") return true;
				return /^[^\.][a-zA-Z][a-zA-Z. ]*$/.test(value);
		        }, "Enter valid name"
		);
		
		//city or place	
		$.validator.addMethod("placename",function(value, element) {
			if(value =="") return true;
				return /^[^ ][a-zA-Z ]*$/.test(value);
		        }, "Enter valid name"
		);
		
		$.validator.addMethod("namevalidation", function(value, element) {
			  if (value == "")
			   return true;
			  return /^[^\.][a-zA-Z. ]*$/.test(value);
			 }, "Enter valid name");
		
		//address 
		$.validator.addMethod("address",function(value, element) {
			if(value =="") return true;
				return /^(?=[a-zA-Z0-9])*[a-zA-Z0-9_ ()-/#,. ]*$/.test(value);
		        }, "Enter valid address"
		); 
		
		//nick name 
		$.validator.addMethod("nickname",function(value, element) {
			if(value =="") return true;
				return /^(?=[a-zA-Z0-9])*[a-zA-Z0-9_ ()-/#,.@'":;*$& ]*$/.test(value);
		        }, "Enter valid nickname"
		); 
		 
		//id card
		$.validator.addMethod("idcard",function(value, element) {
			if(value =="") return true;
				return /^[a-zA-Z0-9](?!.*[\#\-\_\/]{2})[a-zA-Z0-9-/_# ]*[a-zA-Z0-9]$/.test(value);
			}
		);
		 
		//qualification
		$.validator.addMethod("qualification",function(value, element) {
			if(value =="") return true;
				return /^[a-zA-Z0-9+][a-zA-Z0-9 ()-/,.&+]*[a-zA-Z0-9.()]$/.test(value);
		    }
		);
		 
		//hobbies
		$.validator.addMethod("hobbies",function(value, element) {
			if(value =="") return true;
				return /^[^ \,\.](?=[a-zA-Z])[a-zA-Z-,./ ]*[^ \,]$/.test(value);
		     }, "Enter valid characters"
		);
		 
		//only number not allow
		$.validator.addMethod("numbervalidation",function(value, element) {
			// if(value =="") return true;
			if(/^[0-9]*$/.test(value)== true)
				 return false;
			return true;
		 	},"Only numbers not allowed"
		 );
		 
		//special characters not allow	
		$.validator.addMethod ("splvalidation",function(value, element) {
			if(value =="") return true;
			if (/^[!`@#$%^&*()+=\\\';,./{}|\":<>?~_-]*$/.test(value)==true) return false;
			return true;
		 		}/*,"Only special charectors not allowed"*/
		);
		 
		$.validator.addMethod("description", function(value, element) {
			if(value =="") return true;
			if(/^[!`@#$%^&*()+=\\\';,./{}|\":<>?~_-]*$/.test(value)) return false;
			else if(/^[a-zA-Z0-9][a-zA-Z0-9 !`@#$%^&*()+=\\\';,./{}|\":<>?~_-]*$/.test(value)) return true;
		}, "Enter valid description");
		 
		//only special and number not allow
		$.validator.addMethod("numbersplvalidation",function(value, element) {
			if(value =="") return true;
			if(/^[0-9!`@#$%^&*()+=\\\';,./{}|\":<>?~_-]*$/.test(value)== true)
				return false;
			return true;
		 	},"Only special charectors and numbers not allowed"
		 );
		 
		//email 
		$.validator.addMethod("email",function(value, element) {
			if(value =="") return true;
			// return /^(((?=[a-z])*|(?=[0-9])*)(?!.*[\.\-\_]{2})[a-z0-9-._]*[a-z0-9]@[a-z0-9][a-z0-9-]*\.[a-z]+[[\.]?[a-z]+]*)$/i.test(value);     
			return /^((([a-zA-Z0-9]+[-._]*){0,2})[a-zA-Z0-9]+@[a-z0-9][a-z0-9-]*\.[a-z]+[[\.]?[a-z]+]*)$/i.test(value);
		 },"Enter valid E-mail"
		 ); 
			
		//multiple email 
		$.validator.addMethod("multipleemail",function(value, element) {
			if(value =="") return true;
			return /^((([a-zA-Z0-9,]+[-._]*){0,2})[a-zA-Z0-9,]+@[a-z0-9,][a-z0-9-,]*\.[a-z]+[[\.]?[a-z]+]*)$/i.test(value);
		        }, "Enter valid E-mail"
		); 
		 
	    //password 
		$.validator.addMethod("newpassword",function(value, element) {
			if(value =="") return true;
		    return  /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9*&%$#@!()+^-_.,; ]+)$/.test(value);
		 },"Enter atleast one letter,number must"
		 );
		 
		 $.validator.addMethod("password",function(value, element) {
				if(value =="") return true;
			    return  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value);
			 },"Enter Min 6, atleast one letter and one number must"
		 );
	
		//mobile number 
		 $.validator.addMethod("mobile",function(value, element) {
			 if(value =="") return true;
			 if( /^[0]/.test(value)) return false;
				return true;
		        }, "Enter valid mobile number"
		 ); 
		 
		 //website
		 $.validator.addMethod("website",function(value, element) {
			 if(value =="") return true;
			 return /^(((http|https)?:\/\/)|((http|https)?:\/\/www.)|(www.)|())(?!.*\-{2})[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]\.[a-z]+[[\.]?[a-z]+]*$/i.test(value);
			 
		 }, "Enter valid website name"
		 ); 
	
		//phone or fax 
		 $.validator.addMethod("phoneorfax",function(value, element) {
			 if(value =="") return true;
			    return /^[0-9](?!.*[\- ]{2})[0-9- ]*[0-9]$/.test(value);
		        }/*, "Enter valid number"*/
		 );
		 
		 //pin code 
		 $.validator.addMethod("pin",function(value, element) {
			 if(value =="") return true;
				return /^[0-9]{6}$/i.test(value);
		        }, "Enter valid pin code"
		 ); 
		 
		 //amount
		 $.validator.addMethod("amount",function(value, element) {
			 if(value =="") return true;
				return /^[^ \.][0-9]+([\.]?[0-9])*$/i.test(value);
		        }
		 );
		 
		//select option
		 $.validator.addMethod('selectcheck', function (value) {
		        return (value != 'null');
		    }/*, "Must select any one option"*/
		 );
		 
		 $.validator.addMethod("customvalidation",function(value, element) {
		 //allow a to z & A to Z & some special charecters (restrict some special charectors)
			return /^[a-zA-Z0-9_ ()-*.^&%$#@!~]*$/.test(value); //check
		 	}, "Special characters not allowed"
		);
		 
		 
		//trim
		$(':input').change(function() {
		    $(this).val($(this).val().trim());
		});
			
		//Check the greater date format
		$.validator.addMethod("greaterThan", function(value, element, params) {
			if(value =="") return true;
		    if (!/Invalid|NaN/.test(new Date(value))) {
		        return new Date(value) > new Date($(params).val());
		    }

		    return isNaN(value) && isNaN($(params).val()) 
		        || (Number(value) > Number($(params).val())); 
		},'Must be greater than {0}.');
		 
		// greater than
		$.validator.addMethod('greaterThan', function(value, element, param) {
			if(value =="") return true;
		     return ( value > jQuery(param).val() );
		}, 'Must be greater than start' );

		// lesser than
		$.validator.addMethod('lesserThan', function(value, element, param) {
			if(value =="") return true;
		     return ( value < jQuery(param).val() );
		}, 'Must be less than end' );
		 
		//karthik
		$.validator.addMethod("capsonlyallowed", function(value, element) {
			return /^[^ ][A-Z]*$/.test(value);
		}, "Uppercase only allowed");

		$.validator.addMethod("smallonlyallowed", function(value, element) {
			return /^[^ ][a-z]*$/.test(value);
		}, "Lowercase only allowed");

		$.validator.addMethod("alphaonlyallowed", function(value, element) {
			return /^[^ ][a-zA-Z]*$/.test(value);
		}, "Alpha only allowed");

		$.validator.addMethod("numericonlyallowed", function(value, element) {
			if(value=="") return  true;
			return /^[^ ][0-9]*$/.test(value);
		}, "Numbers only allowed");

		$.validator.addMethod("alphanumericonlyallowed", function(value, element) {
			return /^[^ ][a-zA-Z0-9]*$/.test(value);
		}, "Alphanumeric only allowed");

		$.validator.addMethod("alphanumeriwithspecial",function(value, element) {
			return /^[^ ][a-zA-Z0-9 !@#$%^&*()+=-\\\;,./{}|\:<>?~_]*$/.test(value);//check
	    }, "Only special characters not allowed");
	    
		
		$.validator.addMethod("SPLandNOnotallowed", function(value, element) {
			 if(value =="") return true;
			if(/^[!`@#$%^&*()+=\\\';,./{}|\":<>?~_-]*$/.test(value)) return false;
			else if(/^[0-9]*$/.test(value)) return false;
			return true;
		}, "Only numbers and special characters not allowed");
		
		$.validator.addMethod("splOnlynotallowed", function(value, element) {
			if(/^[_`()-*.^&%$#@!~]*$/.test(value)) return false;
			return true;
		}, "Special charecters not allowed");
		
		$.validator.addMethod("noOnlynotallowed", function(value, element) {
			if(/^[0-9]*$/.test(value)) return false;
			return true;
		}, "Nos only not allowed");
		
		$.validator.addMethod("searchName", function(value, element) {
			if(value=="") return  true;
			if(/^[a-zA-Z ]+$/.test(value)==true) return true;
			else if(/^[0-9]+$/.test(value)==true){
				if(value.length==10){
					 return true;
				}
			}
			else return false;
		});
			
		$.validator.addMethod("searchNameWithNo", function(value, element) {
			if(value=="") return  true;
			if(/^[a-zA-Z0-9 ]*[a-zA-Z0-9_ ()-/#,.@'":;*$& ]+$/.test(value)==true) return true;
			else if(/^[0-9]+$/.test(value)==true){
				if(value.length==10){
					 return true;
				}
			}
			else return false;
		});
		
		//image file type validation.
		$.validator.addMethod("fileType", function(value, element) {
			if (!(/\.(PDF|xls|docx)$/i).test(value))
				return false; 
			 return true; 
		},"<br>You must select a valid PDF,xls,docx file for upload");
		
		//date format validation dd/mm/yyyy
		$.validator.addMethod(  "DateFormat", function(value, element) {
		        // put your own logic here, this is just a (crappy) example
		        return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
		    },
		    "Please select date in the format dd/mm/yyyy."
		);
		
});