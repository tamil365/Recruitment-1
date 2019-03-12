package com.metadata.dao;

import java.util.List;

import com.metadata.dto.Atr;
import com.metadata.dto.Status;
import com.metadata.dto.User;

public interface AtrDao {
	public long insert(Atr atr) throws Exception;
//	public User get(int id);
	public List<Atr> getAtrList();
	public Atr getAtrbyId(int id);
	
	public int updateAtr(Atr atr,int id) throws Exception;
	
	public void delete(int id);
	
	public List<Status> getStatusList();
	
	public List<User> getAssinedManagerList(int userId,int roleId);
	
	public List<Atr> userRolebasedatrList(int userId, int roleId);
	
	public List<Atr> closeAtrList(); 
}
