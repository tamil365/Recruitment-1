package com.metadata.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class PositionMapper implements RowMapper<Position> {

	@Override
	public Position mapRow(ResultSet rs, int rowNum) throws SQLException {
		Position p = new Position();
		p.setId(rs.getLong("id"));
		p.setAtrId(rs.getLong("atrId"));
		p.setActive(rs.getLong("active"));
		p.setAssignedBy(rs.getLong("assignedBy"));
		p.setAssignedTo(rs.getLong("assignedTo"));
		p.setPosId(rs.getLong("posId"));
		p.setPosStatus(rs.getString("posStatus"));
		p.setAtrposLink(rs.getString("atrposLink"));
		p.setCreatedDate(rs.getString("createdDate"));
		p.setUpdatedDate(rs.getString("updatedDate"));
		
		p.setAtsId(rs.getLong("atsId"));
		p.setPosStatusId(rs.getLong("posStatusId"));
		
		return p;
	}

}
