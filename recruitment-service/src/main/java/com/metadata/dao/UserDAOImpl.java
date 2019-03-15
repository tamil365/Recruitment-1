package com.metadata.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import javax.sql.DataSource;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.metadata.dto.Role;
import com.metadata.dto.User;
import com.metadata.dto.UserMapper;
import com.metadata.util.DateUtil;
import com.metadata.util.PasswordUtil;
import com.metadata.util.UserUtil;

@Repository
public class UserDAOImpl implements UserDao {
	private JdbcTemplate jdbcTemplate;

	public UserDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	DateUtil du = new DateUtil();
	UserUtil uu = new UserUtil();
	//PasswordUtil pu = new PasswordUtil();

	
	
	
	public boolean saveOrUpdate(User user) throws Exception {
		boolean isUpdated = false;
		user.setCreatedDate(du.setDateTimeNow());
		user.setUpdatedDate(du.setDateTimeNow());
		user.setActive(1);
		
		isUpdated = this.jdbcTemplate.update(
				"INSERT INTO users(firstName,lastName,userName,userPassword,email,roleId,manager,createdDate,updatedDate,active) values(?,?,?,?,?,?,?,?,?,?)",
				user.getFirstName(), user.getLastName(), user.getUserName(), user.getUserPassword(), user.getEmail(),
				user.getRoleId(), user.getManager(), user.getCreatedDate(), user.getUpdatedDate(), user.getActive()) > 0;
		return isUpdated;

	}
	
	@Override
	public int updateUser(User user,int id) {
		String sql = "UPDATE users SET userName=?, firstName=?, lastName=?, email=?, roleId =?, manager=? WHERE userId=?";
		int updated =jdbcTemplate.update(sql,new Object[]{ user.getUserName(), user.getFirstName(), user.getLastName(), user.getEmail(),user.getRoleId(), user.getManager(),id});
		return updated;

	}

	

	public List<User> userList() {
		String sql = "SELECT * FROM users where active=1";
		RowMapper<User> rowMapper = new UserMapper();
		return this.jdbcTemplate.query(sql, rowMapper);
	}
	
	@Override
	public User getUserById(int id) {
		String sql = "SELECT * FROM users WHERE active=1 and userId=" + id;
		
		
		
		return jdbcTemplate.query(sql, new ResultSetExtractor<User>() {

			public User extractData(ResultSet rs) throws SQLException, DataAccessException {
				if (rs.next()) {
					User user = new User();
					user.setUserId(rs.getInt("userId"));
					user.setUserName(rs.getString("userName"));
					user.setFirstName(rs.getString("firstName"));
					user.setLastName(rs.getString("lastName"));
					user.setUserPassword(rs.getString("userPassword"));
					user.setEmail(rs.getString("email"));
					user.setRoleId(rs.getInt("roleId"));
					user.setManager(rs.getInt("manager"));
					return user;
				}

				return null;
			}

		});
	}

	

	@Override
	public List<Role> getRoleList() {
		//String sql = "SELECT * FROM role where roleName not in('CEO');";
		String sql = "SELECT * FROM role";
		List<Role> roleList = jdbcTemplate.query(sql, new RowMapper<Role>() {

			public Role mapRow(ResultSet rs, int rowNum) throws SQLException {
				Role role = new Role();

				role.setId(rs.getInt("id"));
				role.setRoleName(rs.getString("roleName"));
				role.setRoleDesc(rs.getString("roleDesc"));

				return role;
			}

		});

		return roleList;
	}

	@Override
	public List<User> getManagerList(int roleId ) {
		String sql="";
		if(roleId == 3) {
			 sql = "SELECT * FROM users where roleID ='2'";
		}else if(roleId == 5) {
			sql = "SELECT * FROM users where roleID ='4'";
		}else if(roleId==2 || roleId==4) {
			sql="select * from users where roleID='1'";
		}
		
		List<User> userList = jdbcTemplate.query(sql, new RowMapper<User>() {
			public User mapRow(ResultSet rs, int rowNum) throws SQLException {
				User user = new User();

				user.setUserId(rs.getInt("userId"));
				user.setUserName(rs.getString("userName"));

				return user;
			}

		});	
		return userList;
	}
	
	public int delete(int id) {
		//String sql = "DELETE FROM users WHERE userId=?";
		  String sql = "UPDATE users SET active=0 WHERE userId=?";
		  int deleteUser=jdbcTemplate.update(sql, id);
		  
		  return deleteUser;
		
	}

	@Override
	public void deleteManager(int id) {
		String sql = "UPDATE users SET manager=NULL WHERE manager=?";
		  jdbcTemplate.update(sql, id);		
	}
	

	@Override
	public User validateUser(User user) {
		String sql = "select * from users where active=1 and email='" + user.getEmail() + "' and userPassword='"+user.getUserPassword()+"'";
		List<User> users = jdbcTemplate.query(sql, new UserMapper());
		return users.size() > 0 ? users.get(0) : null;
	}

	@Override
		public User validateEmail(User user) {
		String sql = "select * from users where active=1 and email='" + user.getEmail()+ "'";
		List<User> users = jdbcTemplate.query(sql, new UserMapper());
		return users.size() > 0 ? users.get(0) : null;
	}

	@Override
	public List<User> getUserdetails(User user) {
		String sql = "select * from users where active=1 and email='" + user.getEmail()+"'";
		List<User> users = jdbcTemplate.query(sql, new UserMapper());
		return users;
	}

	@Override
	public int changePassword(User user) {
	
		String sql = "UPDATE users SET userPassword=? where userId=?";
		int user1= jdbcTemplate.update(sql, new Object[]{user.getUserPassword(),user.getUserId()});
		return user1;
	}

	@Override
	public List<Map<String, Object>> getUserList(Map<String, Object> params) {
		String sql ="select * from users u,role r where u.roleID=r.id; ";
		return jdbcTemplate.queryForList(sql);
	}

	/*class UserMapper implements RowMapper<User> {
			public User mapRow(ResultSet rs, int arg1) throws SQLException {
			User user = new User();
			user.setUserId(rs.getInt("userid"));
			user.setUserName(rs.getString("userName"));
			user.setUserPassword(rs.getString("userPassword"));
			user.setFirstName(rs.getString("firstName"));
			user.setLastName(rs.getString("lastName"));
			user.setRoleId(rs.getInt("roleId"));
			user.setManager(rs.getInt("manager"));
			user.setEmail(rs.getString("email"));
	
			return user;
		}
	
		
	}*/

}
