package com.metadata.dao;

import java.util.List;
import java.util.Map;

import com.metadata.dto.Role;
import com.metadata.dto.User;

//import com.metadata.modal.User;
 

public interface UserDao {
	public boolean saveOrUpdate(User user) throws Exception;
	public int updateUser(User user, int id);
	public List<User> userList();
	public User getUserById(int id);
	
	public List<Role> getRoleList();
	
	public List<User> getManagerList(int roleId);
	
	public int delete(int id);
	
	public void deleteManager(int id);
	
	public User validateUser(User user);
	public List<User> getUserdetails(User user);
	public User validateEmail(User user);
	public int changePassword(User user);
	
	public List<Map<String,Object>> getUserList(Map<String, Object> params);
	
}
