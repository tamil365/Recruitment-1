package com.metadata.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.metadata.dao.UserDao;
 



@RestController
@RequestMapping("/role")
public class RoleController {

	
	@Autowired
	UserDao userDao;
	
//	@Autowired
//	User user;
	
	// add person
	@RequestMapping(value = "get/{id}", method=RequestMethod.GET)
	public String getRolebyId(@PathVariable int id) {
		String response = "";
		try { 
//			userDao.saveOrUpdate(user);
//			Connection connection = getConnection();
//			Statement stmt = connection.createStatement();
//			String fname = user.getFirstName();
//			String lname = user.getLastName(); 
//			String sql = "INSERT into user (firstName,lastName) values('" + fname + "','" + lname + "')";
//			int rs = stmt.executeUpdate(sql);
			response = "success";
		} catch (Exception e) {
			response = e.getMessage();
		}
return response;
	}
	

}
