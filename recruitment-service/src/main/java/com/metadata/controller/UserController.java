package com.metadata.controller;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.metadata.dao.UserDao;
//import com.metadata.modal.User;
import com.metadata.dto.Role;
import com.metadata.dto.User;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserDao userDao;

	// add user
	@RequestMapping(value = "addUser", method = RequestMethod.POST)
	public String addUser(@RequestBody User user) {
		String response = "";
		try {
			userDao.saveOrUpdate(user); 
			response = "success";
		}
		catch(DataIntegrityViolationException ex){
			response = "Username - "+user.getUserName() +" or Email Id - "+ user.getEmail() + " exists aleady";
		}
		catch(Exception ex){
			response = ex.getMessage();
		}
		 
		return response;
	}
	
	@RequestMapping(value = "updateUser/{id}", method = RequestMethod.PUT)
	public String updateUser(@RequestBody User user,@PathVariable int id) {
		String response = "";
		try {
			userDao.updateUser(user,id); 
			response = "success";
		}
		catch(DataIntegrityViolationException ex){
			response = "Username - "+user.getUserName() +" or Email Id - "+ user.getEmail() + " exists aleady";
		}
		catch(Exception ex){
			response = ex.getMessage();
		}
		 
		return response;
	}
	
	//get User list
	@RequestMapping(value = "getUserList", method = RequestMethod.GET)
	public List<User> getUserList() {
		List<User> userList = new ArrayList<User>();
		try {
			
			userList = userDao.userList();
			 
		} catch (Exception e) {
//			response = e.getMessage();
		}
		return userList;
	}
	//get single user
	@RequestMapping(value = "getUserById/{id}", method = RequestMethod.GET)
	public User getUserbyRoleId(@PathVariable int id) {
		User user = new User();
		try {
			 user = userDao.getUserById(id);
		} catch (Exception e) {
//			response = e.getMessage();
		}
		return user;
	}
	
	//get roleList
	@RequestMapping(value = "getRoleList", method = RequestMethod.GET)
	public List<Role> getRole() {
		List<Role> roleList = new ArrayList<Role>();
		try {
			roleList = userDao.getRoleList();
		} catch (Exception e) {
			//String response = e.getMessage();
		}
		return roleList;
	}
	//get manager list
	@RequestMapping(value = "getManagerList/{roleId}", method = RequestMethod.GET)
	public List<User> getManagerUserList(@PathVariable int roleId) {
		List<User> userManagerList = new ArrayList<User>();
		try {
			 userManagerList = userDao.getManagerList(roleId);
		} catch (Exception e) {
			String response = e.getMessage();
		}
		return userManagerList;
	}
	
	
	


	// delet person view.
	@RequestMapping(value = "deleteUser/{id}", method = RequestMethod.DELETE)
	public void deleteUsers(@PathVariable int id) throws URISyntaxException {
		try {
			int deleteUser=userDao.delete(id);
			if(deleteUser == 1) {
				userDao.deleteManager(id); 
			}
			
			
		} catch (Exception e) {
			String response = e.getMessage();
		}
	}

	

}
