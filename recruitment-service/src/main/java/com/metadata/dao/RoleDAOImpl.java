package com.metadata.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

//import org.springframework.dao.DataAccessException;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.jdbc.core.ResultSetExtractor;
//import org.springframework.jdbc.core.RowMapper;
//import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
//import com.metadata.modal.User;

import com.metadata.dto.Role; 

@Repository
public class RoleDAOImpl implements RoleDao {
	private JdbcTemplate jdbcTemplate;

	public RoleDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	public boolean saveOrUpdate(Role role) {
		/*
		 * if (person.getId() > 0) { // update String sql =
		 * "UPDATE Person SET first_name=?, last_name=?"; jdbcTemplate.update(sql,
		 * person.getFirst_name(), person.getLast_name()); } else { // insert String sql
		 * = "INSERT INTO Person (first_name, last_name)" + " VALUES (?, ?)";
		 * jdbcTemplate.update(sql, person.getFirst_name(), person.getLast_name()); }
		 */
//		return this.jdbcTemplate.update("INSERT INTO user(first_name,last_name) values(?,?)", role.get(),
//				role.getLastName()) > 0;
		return false;

	}

	public void delete(int id) {
		String sql = "DELETE FROM person WHERE Person_id=?";
		jdbcTemplate.update(sql, id);
	}
 
	@Override
	public Role getRoleById(int id) {
		String sql = "SELECT * FROM role WHERE id=" + id;
		return jdbcTemplate.query(sql, new ResultSetExtractor<Role>() {
			
			public Role extractData(ResultSet rs) throws SQLException, DataAccessException {
				if (rs.next()) {
					Role role = new Role();
					role.setId(rs.getInt("id"));
					role.setRoleName(rs.getString("roleName"));
					role.setRoleDesc(rs.getString("roleDesc"));
					return role;
				}

				return null;
			}

		});
	}

	@Override
	public List<Role> getAllRoles() {
		String sql = "SELECT * FROM role";
		List<Role> listRoles = jdbcTemplate.query(sql, new RowMapper<Role>() {

			public Role mapRow(ResultSet rs, int rowNum) throws SQLException {
				Role role = new Role(); 
				role.setId(rs.getInt("id"));
				role.setRoleName(rs.getString("roleName"));
				role.setRoleDesc(rs.getString("roleDesc")); 
				return role;
			}

		});

		return listRoles;
	}

 
	}
  