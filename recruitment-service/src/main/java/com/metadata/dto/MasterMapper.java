package com.metadata.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class MasterMapper implements RowMapper<Master> {
	@Override
	public Master mapRow(ResultSet rs, int rowNum) throws SQLException {
		Master master = new Master();
		master.setId(rs.getInt("id"));
		master.setType(rs.getString("type"));
		master.setName(rs.getString("name"));
		master.setDescription(rs.getString("description"));
		master.setActive(rs.getInt("active"));
		master.setCreatedBy(rs.getInt("createdBy"));
		master.setUpdatedBy(rs.getInt("updatedBy")); 
		
		return master;
	}
}
