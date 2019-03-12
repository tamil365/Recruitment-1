package com.metadata.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.metadata.dto.Atr;
import com.metadata.dto.AtrMapper;
import com.metadata.dto.Status;
import com.metadata.dto.User;
import com.metadata.util.DateUtil;
import com.metadata.util.UserUtil;

@Repository
public class AtrDAOImpl implements AtrDao {
	private static final Logger LOGGER = Logger.getLogger(AtrDAOImpl.class.getName());
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	public AtrDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	DateUtil du = new DateUtil();
	UserUtil uu = new UserUtil();

	@Override
	public long insert(Atr atr) throws Exception {
		atr.setCreatedDate(du.setDateTimeNow());
		atr.setActive(1);
		//atr.setCompletionDate(du.StringToSqlDate(atr.getCompletionDate()));
		
		String insertQuery = "INSERT INTO atr (JobDescription,NoOfPosition,Role,Location,MinSalary,MaxSalary,Experience,clientId,createdBy,createdDate,active,skills,completionDate) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
				
				KeyHolder keyHolder = new GeneratedKeyHolder();
				jdbcTemplate.update(new PreparedStatementCreator() {
							@Override
							public java.sql.PreparedStatement createPreparedStatement(Connection con) throws SQLException {
								PreparedStatement ps =(PreparedStatement) con.prepareStatement(insertQuery,Statement.RETURN_GENERATED_KEYS);
								ps.setString(1, atr.getJobDescription());
								ps.setLong(2, atr.getNoOfPosition());
								ps.setString(3, atr.getRole());
								ps.setString(4, atr.getLocation());
								ps.setLong(5, atr.getMinSalary());
								ps.setLong(6, atr.getMaxSalary());
								ps.setLong(7, atr.getExperience());
								ps.setLong(8, atr.getClientId());
								ps.setLong(9, atr.getCreatedBy());
								ps.setString(10, atr.getCreatedDate());
								ps.setLong(11, atr.getActive());
								ps.setString(12, atr.getSkills());
								ps.setDate(13, convertDate(atr.getCompletionDate()));
								return ps;
							}
						},
						keyHolder);
				return (Long)keyHolder.getKey();		
				
	}

	

	public List<Atr> getAtrList(){
		//String sql = "SELECT * FROM atr as a left join client as c on a.clientId=c.id where a.active=1 and c.active=1;";
		String sql="select * from atr_view;";
		RowMapper<Atr> rowMapper = new AtrMapper();
		return this.jdbcTemplate.query(sql, rowMapper);
	}
	
	public Atr getAtrbyId(int id) {
		//String sql="SELECT * FROM atr as a left join client as c on a.clientId=c.id where a.active=1 and c.active=1 and a.id="+id+";";
		//String sql ="SELECT distinct `a`.`id` AS `id`,`a`.`ATRID` AS `ATRID`,`a`.`JobDescription` AS `JobDescription`,`a`.`NoOfPosition` AS `NoOfPosition`,`a`.`Role` AS `Role`,`a`.`MinSalary` AS `MinSalary`,`a`.`MaxSalary` AS `MaxSalary`,`a`.`Location` AS `Location`,`a`.`Experience` AS `Experience`,`a`.`clientId` AS `clientId`,`a`.`createdBy` AS `createdBy`,`a`.`updatedBy` AS `updatedBy`,`a`.`approvedBy` AS `approvedBy`,`a`.`assignedTo` AS `assignedTo`,`a`.`createdDate` AS `createdDate`, `a`.`updatedDate` AS `updatedDate`,`a`.`active` AS `active`,`c`.`clientName` AS `clientName`, `s`.`id` AS `statusId`,`s`.`status` AS `status` FROM `atr` `a` LEFT JOIN `client` `c` ON `a`.`clientId` = `c`.id LEFT JOIN atr_statusdetails as ats ON a.id = ats.atrId LEFT JOIN status s ON s.id = ats.atrStatusId WHERE a.active = 1 AND c.active = 1 AND a.id="+id+";";
		String sql="SELECT distinct a.id AS id, a.JobDescription AS JobDescription,a.NoOfPosition AS NoOfPosition,a.Role AS Role ,a.MinSalary AS MinSalary,a.MaxSalary AS MaxSalary,a.location AS Location,a.skills AS Skills, a.completionDate as completionDate,a.Experience AS Experience, a.clientId AS clientId, ats.createdBy AS createdBy,ats.updatedBy AS updatedBy,ats.assignedBy AS approvedBy,ats.assignedTo AS assignedTo,ats.createdDate AS createdDate, ats.updatedDate AS updatedDate,a.active AS active,c.clientName AS clientName, s.id AS statusId,s.status AS status,u1.firstName as assignedByUser,u2.firstName as assignedToUser,u3.firstName as createdByUser,u4.firstName as updatedByUser FROM atr a LEFT JOIN client c ON a.clientId = c.id LEFT JOIN atr_statusdetails as ats ON a.id = ats.atrId LEFT JOIN status s ON s.id = ats.atrStatusId left join users u1 on ats.assignedBy=u1.userId left join users u2 on ats.assignedTo=u2.userId left join users u3 on ats.createdBy=u3.userId left join users u4 on ats.updatedBy=u4.userId WHERE a.active = 1 AND c.active = 1 AND a.id="+id+" group by a.id"; 

		return jdbcTemplate.query(sql, new ResultSetExtractor<Atr>() {
		@Override
		public Atr extractData(ResultSet rs) throws SQLException,DataAccessException {
			if (rs.next()) {
				Atr p = new Atr(); 
				p.setId(rs.getLong("id"));
				p.setNoOfPosition(rs.getLong("noOfPosition"));
				p.setJobDescription(rs.getString("jobDescription"));
				p.setRole(rs.getString("role"));
				p.setMinSalary(rs.getLong("minSalary"));
				p.setMaxSalary(rs.getLong("maxSalary"));
				p.setLocation(rs.getString("location"));
				p.setSkills(rs.getString("skills"));
				p.setCompletionDate(rs.getString("completionDate"));
				p.setExperience(rs.getLong("experience"));
				p.setClientId(rs.getLong("clientId"));
				p.setCreatedBy(rs.getLong("createdBy"));
				p.setUpdatedBy(rs.getLong("updatedBy"));
				p.setAssignedTo(rs.getLong( "approvedBy"));
				p.setAssignedTo(rs.getLong( "assignedTo"));
				p.setCreatedDate(rs.getString("createdDate"));
				p.setUpdatedDate(rs.getString("updatedDate"));
				p.setAssignedToUser(rs.getString("assignedToUser"));
				p.setStatusId(rs.getLong("statusId"));
				p.setClientName(rs.getString("clientName"));
				p.setStatus(rs.getString("status"));
				p.setAssignedToUser(rs.getString("assignedToUser"));
				p.setCreatedByUser(rs.getString("createdByUser"));
				p.setUpdatedByUser(rs.getString("updatedByUser"));
		
				return p;
			}
		return null;
		}
	});
}

		@Override
	public int updateAtr(Atr atr, int id) throws Exception {
		int updated = 0;
		if(atr.getId()==id) {
		atr.setUpdatedDate(du.setDateTimeNow());
		String sql = "update atr set ATRID='"+atr.getaTRID()+"' , JobDescription='"+atr.getJobDescription()+"', NoOfPosition='"+atr.getNoOfPosition()+"', Role = '"+atr.getRole()+"', Location ='"+atr.getLocation()+"', MinSalary ='"+atr.getMinSalary()+"' , MaxSalary = '"+atr.getMaxSalary()+"', Experience = '"+atr.getExperience()+"', clientId = '"+atr.getClientId()+"', updatedDate = '"+atr.getUpdatedDate()+"', skills='"+atr.getSkills()+"', completionDate='"+convertDate(atr.getCompletionDate())+"'where id="+id+" ";
		updated=jdbcTemplate.update(sql);

		/*String sql = "UPDATE atr SET ATRID = ?, JobDescription = ?, NoOfPosition = ?, Role = ?, Location = ?, MinSalary = ?, MaxSalary = ?, Experience = ?, clientId = ?, updatedDate = ? , skills=?, completionDate=? WHERE id = ?";
		updated = jdbcTemplate.update(sql,new Object[] { atr.getaTRID(), atr.getJobDescription(), atr.getNoOfPosition(), atr.getRole(), atr.getLocation(),atr.getMinSalary(), atr.getMaxSalary(), atr.getExperience(), atr.getClientId(), atr.getUpdatedDate(),Arrays.toString(atr.getSkills()).replace("[", "").replace("]", "").trim(),convertDate(atr.getCompletionDate()), id});*/
		}

		return updated;	
		}
	

	@Override
	public void delete(int id) {
		//when close atr,update two table.1.atr table active=0 and 2. atr_statusdetail table atrStatusId=3
		String SQL="UPDATE atr as a, atr_statusdetails as ats SET a.active=0, a.updatedDate=now(), ats.atrStatusId=3 ,ats.updatedDate=now()  WHERE a.id=ats.atrId AND ats.atrId = "+id+"";
		
		jdbcTemplate.update(SQL);
		
	}

	@Override
	public List<Status> getStatusList() {
		String sql = "SELECT * FROM status where type=1";
		List<Status> statusList = jdbcTemplate.query(sql, new RowMapper<Status>() {

			public Status mapRow(ResultSet rs, int rowNum) throws SQLException {
				Status status = new Status(); 
				status.setId(rs.getInt("id"));
				status.setStatus(rs.getString("status"));
				status.setDescription(rs.getString("description"));
				status.setType(rs.getInt("type"));
				status.setActive(rs.getInt("active"));
				return status;
			}

		});

		return statusList;
	}
	
	//display assinged Manager role on ATR. using atr.js
	@Override
	public List<User> getAssinedManagerList(int userId,int roleId) {
		String sql="";
		 if(roleId==5) {
			sql = "SELECT * FROM users where roleID ='4'"; 
		}else if(roleId==2) {
			sql="select * from users where userId="+userId+" and roleID="+roleId+"";
		}else if(roleId==4) {
			//sql="select * from users where userId="+userId+" and roleID="+roleId+"";
			
			sql="select * from users where userId="+userId+" and roleID="+roleId+" union select * from users where roleID=5 order by userId";
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
	
	@Override
	public List<Atr> userRolebasedatrList(int userId,int roleId) {
		String  sql="";
		 if(roleId==5) {
			 sql="SELECT distinct a.id AS id, a.ATRID AS ATRID,a.JobDescription AS JobDescription,a.NoOfPosition AS NoOfPosition,a.Role AS Role ,a.MinSalary AS MinSalary,a.MaxSalary AS MaxSalary,m1.name AS Location,a.Experience AS Experience,a.clientId AS clientId,ats.createdBy AS createdBy,ats.updatedBy AS updatedBy,ats.assignedBy AS approvedBy,ats.assignedTo AS assignedTo,ats.createdDate AS createdDate, ats.updatedDate AS updatedDate,a.active AS active,c.clientName AS clientName, s.id AS statusId,s.status AS status,u1.firstName as assignedByUser,u2.firstName as assignedToUser,u3.firstName as createdByUser,u4.firstName as updatedByUser  FROM atr a LEFT JOIN client c ON  a.clientId = c.id LEFT JOIN mastertable m1 ON  a.Location = m1.id LEFT JOIN mastertable m2 ON  a.skills= m2.id LEFT JOIN  atr_statusdetails as ats ON a.id = ats.atrId LEFT JOIN status s ON  s.id = ats.atrStatusId left join users u1 on ats.assignedBy=u1.userId left join users u2 on ats.assignedTo=u2.userId  left join users u3 on ats.createdBy=u3.userId  left join users u4 on ats.updatedBy=u4.userId WHERE a.active = 1 AND c.active = 1 AND m1.active=1 AND m1.type='location' AND ats.createdBy="+userId+"";
		}
		 else if(roleId==3) {
			 sql="SELECT a.id AS id, count(a.id) AS NoOfPosition, a.ATRID AS ATRID,a.JobDescription AS JobDescription,a.Role AS Role ,a.MinSalary AS MinSalary,a.MaxSalary AS MaxSalary,m1.name AS Location,a.Experience AS Experience,a.clientId AS clientId,ats.createdBy AS createdBy,ats.updatedBy AS updatedBy,ats.assignedBy AS approvedBy,ats.assignedTo AS assignedTo,ats.createdDate AS createdDate, ats.updatedDate AS updatedDate,a.active AS active,c.clientName AS clientName, s.id AS statusId,s.status AS status,u1.firstName as assignedByUser,u2.firstName as assignedToUser,u3.firstName as createdByUser,u4.firstName as updatedByUser  FROM atr a LEFT JOIN client c ON  a.clientId = c.id  LEFT JOIN mastertable m1 ON  a.Location = m1.id LEFT JOIN mastertable m2 ON  a.skills= m2.id LEFT JOIN  atr_statusdetails as ats ON a.id = ats.atrId LEFT JOIN status s ON  s.id = ats.atrStatusId left join users u1 on ats.assignedBy=u1.userId left join users u2 on ats.assignedTo=u2.userId  left join users u3 on ats.createdBy=u3.userId  left join users u4 on ats.updatedBy=u4.userId WHERE a.active = 1 AND c.active = 1 AND m1.active=1 AND m1.type='location' AND ats.assignedTo="+userId+" GROUP BY a.id";
		}
		 else if(roleId==4) {
			 sql="SELECT a.id AS id, count(a.id) AS NoOfPosition, a.ATRID AS ATRID,a.JobDescription AS JobDescription,a.Role AS Role ,a.MinSalary AS MinSalary,a.MaxSalary AS MaxSalary,m1.name AS Location,a.Experience AS Experience,a.clientId AS clientId,ats.createdBy AS createdBy,ats.updatedBy AS updatedBy,ats.assignedBy AS approvedBy,ats.assignedTo AS assignedTo,ats.createdDate AS createdDate, ats.updatedDate AS updatedDate,a.active AS active,c.clientName AS clientName, s.id AS statusId,s.status AS status,u1.firstName as assignedByUser,u2.firstName as assignedToUser,u3.firstName as createdByUser,u4.firstName as updatedByUser  FROM atr a LEFT JOIN client c ON  a.clientId = c.id  LEFT JOIN mastertable m1 ON  a.Location = m1.id LEFT JOIN mastertable m2 ON  a.skills= m2.id LEFT JOIN  atr_statusdetails as ats ON a.id = ats.atrId LEFT JOIN status s ON  s.id = ats.atrStatusId left join users u1 on ats.assignedBy=u1.userId left join users u2 on ats.assignedTo=u2.userId  left join users u3 on ats.createdBy=u3.userId  left join users u4 on ats.updatedBy=u4.userId WHERE a.active = 1 AND c.active = 1 AND m1.active=1 AND m1.type='location'  AND ats.assignedTo="+userId+" OR ats.assignedBy="+userId+" GROUP BY a.id";
		}
		 else if(roleId==2) {
			 sql="SELECT a.id AS id, count(a.id) AS NoOfPosition, a.ATRID AS ATRID,a.JobDescription AS JobDescription,a.Role AS Role ,a.MinSalary AS MinSalary,a.MaxSalary AS MaxSalary,m1.name AS Location,a.Experience AS Experience,a.clientId AS clientId,ats.createdBy AS createdBy,ats.updatedBy AS updatedBy,ats.assignedBy AS approvedBy,ats.assignedTo AS assignedTo,ats.createdDate AS createdDate, ats.updatedDate AS updatedDate,a.active AS active,c.clientName AS clientName, s.id AS statusId,s.status AS status,u1.firstName as assignedByUser,u2.firstName as assignedToUser,u3.firstName as createdByUser,u4.firstName as updatedByUser  FROM atr a LEFT JOIN client c ON  a.clientId = c.id  LEFT JOIN mastertable m1 ON  a.Location = m1.id LEFT JOIN mastertable m2 ON  a.skills= m2.id LEFT JOIN  atr_statusdetails as ats ON a.id = ats.atrId LEFT JOIN status s ON  s.id = ats.atrStatusId left join users u1 on ats.assignedBy=u1.userId left join users u2 on ats.assignedTo=u2.userId  left join users u3 on ats.createdBy=u3.userId  left join users u4 on ats.updatedBy=u4.userId WHERE a.active = 1 AND c.active = 1 AND m1.active=1 AND m1.type='location'  AND ats.assignedTo="+userId+"  GROUP BY a.id";
		}
		 RowMapper<Atr> rowMapper = new AtrMapper();
			return this.jdbcTemplate.query(sql, rowMapper);
		}
 
	@Override
	public List<Atr> closeAtrList() {
			String sql="select a.id AS id,a.JobDescription AS JobDescription,a.NoOfPosition AS NoOfPosition,a.Role AS Role ,a.MinSalary AS MinSalary,a.MaxSalary AS MaxSalary,c.clientName AS clientName,m1.name AS Location,a.Experience AS Experience,a.clientId AS clientId,a.skills from atr a LEFT JOIN client c ON a.clientId = c.id left join mastertable m1 on a.Location=m1.id where a.active=0 and m1.active=1 and c.active = 1 and m1.type='location';";
		
			List<Atr> userList = jdbcTemplate.query(sql, new RowMapper<Atr>() {
			public Atr mapRow(ResultSet rs, int rowNum) throws SQLException {
				Atr atr = new Atr();
			
				atr.setId(rs.getLong("id"));
				atr.setJobDescription(rs.getString("jobDescription"));
				atr.setNoOfPosition(rs.getLong("noOfPosition"));
				atr.setRole(rs.getString("role"));
				atr.setLocation(rs.getString("location"));
				atr.setClientName(rs.getString("clientName"));
				atr.setMinSalary(rs.getLong("minSalary"));
				atr.setMaxSalary(rs.getLong("maxSalary"));
				atr.setExperience(rs.getLong("experience"));
				//atr.setSkills(rs.getString(("skills"));
				return atr;
				}

			});	
	return userList;
	}
	
	
	private java.sql.Date convertDate(String date) {
		 
		Date utilDate;
		java.sql.Date sqlDate = null;
		try {
			utilDate = new SimpleDateFormat("dd/MM/yyyy").parse(date);
			 sqlDate = new java.sql.Date(utilDate.getTime());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	
		return sqlDate;
	}
}
