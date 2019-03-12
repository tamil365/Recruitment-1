package com.metadata.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.metadata.dto.Client;
import com.metadata.dto.ClientMapper;
import com.metadata.util.DateUtil;
import com.metadata.util.UserUtil;
@Repository
public class ClientDaoImpl implements ClientDao {
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	public ClientDaoImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	DateUtil du = new DateUtil();
	UserUtil uu = new UserUtil();
	
	@Override
	public boolean saveOrUpdate(Client client) throws Exception {
		boolean isUpdated = false;
		client.setCreatedDate(du.setDateTimeNow());
		client.setUpdatedDate(du.setDateTimeNow());
		client.setActive(1);
		isUpdated = this.jdbcTemplate.update(
				"INSERT INTO client(clientName,clientKey,active,createdDate,updatedDate) values(?,?,?,?,?)",
				client.getClientName(), client.getClientKey(), client.getActive(), client.getCreatedDate(), client.getUpdatedDate()) > 0;
		return isUpdated;
	}

	@Override
	public List<Client> getClientList() {
		String sql = "SELECT * FROM client where active=1";
		List<Client> clientlist = jdbcTemplate.query(sql, new RowMapper<Client>() {

			public Client mapRow(ResultSet rs, int rowNum) throws SQLException {
				Client client= new Client();

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

		});

		return clientlist;
	}

	@Override
	public Client getClientbyId(int id) {
		String sql = "SELECT * FROM client where id="+id+"";
		Client client =  this.jdbcTemplate .queryForObject(
					sql, new Object[] {  }, new ClientMapper());
		
		return client;
	}

	@Override
	public int update(Client client, int id) throws Exception {
		int updated = 0;
		if(client.getId()==id) {
			client.setUpdatedDate(du.setDateTimeNow());
			String sql= "UPDATE client SET clientName=?,clientKey=?,updatedDate=? WHERE id = ?";
			updated = jdbcTemplate.update(sql,new Object[] { client.getClientName(), client.getClientKey(), client.getUpdatedDate(),id});
		}
		return updated;
	}

	@Override
	public int delete(int id) {
		 String sql = "UPDATE client SET active=0 WHERE id=?";
		  int deleteClient=jdbcTemplate.update(sql, id);
		return deleteClient;
		// TODO Auto-generated method stub

	}
	
	@Override
	public List<Client> getIaClientList() {
		String sql = "SELECT * FROM client where active=0";
		List<Client> clientlist = jdbcTemplate.query(sql, new RowMapper<Client>() {

			public Client mapRow(ResultSet rs, int rowNum) throws SQLException {
				Client client= new Client();

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
		});
		return clientlist;
	}

	@Override
	public int resetIaClient(int id) {
		 String sql = "UPDATE client SET active=1 WHERE id=?";
		  int resetClient=jdbcTemplate.update(sql, id);
		return resetClient;
		// TODO Auto-generated method stub

	}
	
}
