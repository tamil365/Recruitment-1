package com.metadata.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class CandidateMapper implements RowMapper<Candidate> {

	@Override
	public Candidate mapRow(ResultSet rs, int rowNum) throws SQLException {
		Candidate candidate = new Candidate();
		candidate.setId(rs.getLong("id"));
		candidate.setFirstName(rs.getString("firstName"));
		candidate.setLastName(rs.getString("lastName"));
		candidate.setEmail(rs.getString("email"));
		candidate.setMobile(rs.getString("mobile"));
		candidate.setCandidateStatus(rs.getLong("candidateStatus"));
		candidate.setAtrId(rs.getLong("atrId"));
		candidate.setPosId(rs.getLong("posId"));
		candidate.setCreatedBy(rs.getLong("createdBy"));
		candidate.setUpdatedBy(rs.getLong("updatedBy"));
		candidate.setCreatedDate(rs.getString("createdDate"));
		candidate.setUpdatedDate(rs.getString("updatedDate"));
		candidate.setActive(rs.getLong("active"));
		candidate.setJoiningDate(rs.getString("joiningDate"));
		candidate.setOfferedDate(rs.getString("offeredDate"));
		
		return candidate;
	}

}
