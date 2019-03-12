package com.metadata.dto;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class ClientMapper implements RowMapper<Client> {

	@Override
	public Client mapRow(ResultSet rs, int rowNum) throws SQLException {
		Client client = new Client();
		client.setId(rs.getInt("Id"));
		client.setClientName(rs.getString("clientName"));
		client.setClientKey(rs.getString("clientKey"));
		client.setActive(rs.getInt("active"));
		
		client.setUpdatedBy(rs.getInt("updatedBy"));
		client.setUpdatedDate(rs.getString("updatedDate"));
		client.setCreatedBy(rs.getInt("createdBy"));
		client.setCreatedDate(rs.getString("createdDate"));
		return client;
	}

}
