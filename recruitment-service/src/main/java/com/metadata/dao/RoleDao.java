package com.metadata.dao;

import java.util.List;

import com.metadata.dto.Role; 

//import com.metadata.modal.User;
 

public interface RoleDao {
//	public boolean saveOrUpdate(Role role);
	public Role getRoleById(int id);
	public List<Role> getAllRoles();
//	public void delete(int id);
}
