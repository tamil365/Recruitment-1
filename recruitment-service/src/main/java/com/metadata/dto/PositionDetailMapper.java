package com.metadata.dto;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

import org.springframework.jdbc.core.RowMapper;

public class PositionDetailMapper implements RowMapper<PositionDetail> {

	@Override
	public PositionDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
			PositionDetail p = new PositionDetail();
			p.setAtrId(rs.getInt("atrId"));
			p.setAtsId(rs.getLong("atsId"));
			p.setPosId(rs.getLong("posId"));
			p.setClientName(rs.getString("clientName"));
			p.setExperience(rs.getLong("experience"));
			p.setLocation(rs.getString("location"));
			p.setMinsalary(rs.getLong("minsalary"));
			p.setMaxsalary(rs.getLong("maxsalary"));
			p.setPosStatus(rs.getString("posStatus"));
			p.setPosStatusId(rs.getLong("posStatusId"));
			p.setAtrposLink(rs.getString("atrposLink"));
			p.setJobDescription(rs.getString("jobDescription"));
			p.setRole(rs.getString("role"));
			p.setSkills(rs.getString("skills").split("-"));
			p.setAssignedTo(rs.getLong( "assignedTo"));
			p.setAssignedToUser(rs.getString("assignedToUser"));
			return p;
	}

}
