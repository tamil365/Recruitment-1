package com.metadata.dto;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class UserMapper implements RowMapper<User> {

	@Override
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		User user=new User();
		user.setUserId(rs.getInt("userId"));
		user.setUserName(rs.getString("userName"));
		user.setFirstName(rs.getString("firstName"));
		user.setLastName(rs.getString("lastName"));
		user.setEmail(rs.getString("email"));
		user.setUserPassword(rs.getString("userPassword"));
		user.setRoleId(rs.getInt("roleId"));
		user.setManager(rs.getInt("manager"));
		
		user.setCreatedDate(rs.getString("createdDate"));
		user.setUpdatedDate(rs.getString("updatedDate"));
		user.setActive(rs.getInt("active"));
		return user;
	}

}
