package com.metadata.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class AtrMapper implements RowMapper<Atr> {	

	@Override
	public Atr mapRow(ResultSet rs, int rowNum) throws SQLException {
		Atr atr = new Atr();
		atr.setId(rs.getLong("Id"));
		atr.setaTRID(rs.getLong("aTRID"));
		atr.setJobDescription(rs.getString("jobDescription"));
		//atr.setAtrStatus(rs.getLong("atrStatus"));
		atr.setClientId(rs.getLong("clientId"));
		atr.setClientName(rs.getString("clientName"));
		atr.setExperience(rs.getLong("experience"));
		atr.setActive(rs.getLong("active"));
		atr.setLocation(rs.getString("location"));
		atr.setMinSalary(rs.getLong("minSalary"));
		atr.setMaxSalary(rs.getLong("maxSalary"));
		atr.setNoOfPosition(rs.getLong("noOfPosition"));
		atr.setRole(rs.getString("role"));
		atr.setUpdatedBy(rs.getLong("updatedBy"));
		atr.setUpdatedDate(rs.getString("updatedDate"));
		atr.setCreatedBy(rs.getLong("createdBy"));
		atr.setCreatedDate(rs.getString("createdDate"));
		atr.setStatusId(rs.getLong("statusId"));
		atr.setStatus(rs.getString("status"));
		atr.setAssignedTo(rs.getLong("assignedTo"));
		atr.setAssignedByUser(rs.getString("assignedByUser"));
		atr.setAssignedToUser(rs.getString("assignedToUser"));
		atr.setCreatedByUser(rs.getString("createdByUser"));
		atr.setUpdatedByUser(rs.getString("updatedByUser"));
		/*atr.setSkills(rs.getString("skills"));
		atr.setCompletionDate(rs.getString("completionDate"));*/
		return atr;
	}

}
