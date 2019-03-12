package com.metadata.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;


import com.metadata.dto.Master;
import com.metadata.dto.MasterMapper;
import com.metadata.util.DateUtil;
import com.metadata.util.UserUtil;
@Repository
public class MasterDAOImpl implements MasterDao {
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	public MasterDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	
	DateUtil du = new DateUtil();
	UserUtil uu = new UserUtil();
	
	@Override
	public List<Master> getMasterList() {
		  
		String sql = "SELECT * FROM mastertable where active=1";
		List<Master> masterlist = jdbcTemplate.query(sql, new RowMapper<Master>() { 
			public Master mapRow(ResultSet rs, int rowNum) throws SQLException {
				Master master= new Master();

				master.setId(rs.getInt("id"));
				master.setType(rs.getString("type"));
				master.setName(rs.getString("name"));
				master.setDescription(rs.getString("description"));
				master.setActive(rs.getInt("active"));
				master.setCreatedBy(rs.getInt("createdBy"));
				master.setUpdatedBy(rs.getInt("updatedBy")); 
		
				return master;
			}

		});

		return masterlist;
			
	}

	@Override // add data in master
	public boolean add(Master master, int Uid) {
		boolean isUpdated = false;
		master.setCreatedDate(du.setDateTimeNow());
		master.setUpdatedDate(du.setDateTimeNow());
		master.setActive(1);
		isUpdated = this.jdbcTemplate.update(
				"INSERT INTO mastertable(name,type,description,active,createdBy,createdDate) values(?,?,?,?,?,?)",
				master.getName(), master.getType(),master.getDescription(), master.getActive(),Uid, master.getCreatedDate()) > 0;
		return isUpdated;

	}

	@Override // view single data from master to edit 
	public Master getMasterbyId(int id) {
		String sql = "SELECT * FROM mastertable where id="+id+"";
		Master master =  this.jdbcTemplate .queryForObject(
					sql, new Object[] {  }, new MasterMapper());
		
		return master;
		
	}

	@Override
	public int update(Master master, int id) {
		int updated = 0;
		if(master.getId()==id) {
			master.setUpdatedDate(du.setDateTimeNow());
			String sql= "UPDATE mastertable SET name=?,type=?, description=?, updatedDate=? WHERE id = ?";
			updated = jdbcTemplate.update(sql,new Object[] { master.getName(), master.getType(),master.getDescription(), master.getUpdatedDate(),id});
		}
		return updated;
	}

	@Override
	public int delete(int id) {
		 String sql = "UPDATE mastertable SET active=0 WHERE id=?";
		  int deleteMaster=jdbcTemplate.update(sql, id);
		return deleteMaster;
		
	}

	@Override
	public List<Master> getIaMasterList() {
		String sql = "SELECT * FROM mastertable where active=0";
		List<Master> masterlist = jdbcTemplate.query(sql, new RowMapper<Master>() {

			public Master mapRow(ResultSet rs, int rowNum) throws SQLException {
				Master master= new Master();

				master.setId(rs.getInt("id"));
				master.setType(rs.getString("type"));
				master.setName(rs.getString("name"));
				master.setDescription(rs.getString("description"));
				master.setActive(rs.getInt("active"));
				master.setCreatedBy(rs.getInt("createdBy"));
				master.setUpdatedBy(rs.getInt("updatedBy")); 
		

				return master;
			}
		});
		return masterlist;
	}
	@Override
	public int resetIaMaster(int id) {
		 String sql = "UPDATE mastertable SET active=1 WHERE id=?";
		  int resetMaster=jdbcTemplate.update(sql, id);
		return resetMaster;
	}

	@Override
	public List<Master> getLocationList() {
		String sql = "SELECT * FROM mastertable where type='location' and active=1";
		List<Master> masterlist = jdbcTemplate.query(sql, new RowMapper<Master>() { 
			public Master mapRow(ResultSet rs, int rowNum) throws SQLException {
				Master master= new Master();

				master.setId(rs.getInt("id"));
				master.setType(rs.getString("type"));
				master.setName(rs.getString("name"));
				master.setDescription(rs.getString("description"));
				master.setActive(rs.getInt("active"));
				master.setCreatedBy(rs.getInt("createdBy"));
				master.setUpdatedBy(rs.getInt("updatedBy")); 
		
				return master;
			}

		});

		return masterlist;
	}

	@Override
	public List<Master> getSkillsList() {
		String sql = "SELECT * FROM mastertable where type='skills' and active=1";
		List<Master> masterlist = jdbcTemplate.query(sql, new RowMapper<Master>() { 
			public Master mapRow(ResultSet rs, int rowNum) throws SQLException {
				Master master= new Master();

				master.setId(rs.getInt("id"));
				master.setType(rs.getString("type"));
				master.setName(rs.getString("name"));
				master.setDescription(rs.getString("description"));
				master.setActive(rs.getInt("active"));
				master.setCreatedBy(rs.getInt("createdBy"));
				master.setUpdatedBy(rs.getInt("updatedBy")); 
		
				return master;
			}

		});

		return masterlist;
	}

}
