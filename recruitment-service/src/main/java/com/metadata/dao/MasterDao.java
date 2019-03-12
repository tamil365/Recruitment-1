package com.metadata.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import com.metadata.dto.Master;



public interface MasterDao {
	public List<Master> getMasterList();

	public boolean add(Master master,int Uid);

	public Master getMasterbyId(int id);

	public int update(Master master, int id);

	public int delete(int id);

	public List<Master> getIaMasterList();

	public int resetIaMaster(int id);

	public List<Master> getLocationList();

	public List<Master> getSkillsList();

	
}
