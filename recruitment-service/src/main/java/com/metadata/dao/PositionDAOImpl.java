package com.metadata.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

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

import com.metadata.dto.Position;
import com.metadata.dto.PositionAndCandidate;
import com.metadata.dto.PositionDetail;
import com.metadata.dto.PositionDetailMapper;
import com.metadata.dto.PositionStatus;
import com.metadata.dto.Status;
import com.metadata.dto.User;
import com.metadata.util.DateUtil;
@Repository
public class PositionDAOImpl implements PositionDao {
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	public PositionDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	
	DateUtil du = new DateUtil();
	
	@Override
	public long insert(Position pos) throws Exception {
		pos.setCreatedDate(du.setDateTimeNow());
		pos.setActive(1);
		
		String insertQuery = "INSERT INTO position (atrId,posId,atrposLink,createdDate,active) values(?,?,?,?,?)";
				
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator() {
					@Override
					public java.sql.PreparedStatement createPreparedStatement(Connection con) throws SQLException {
						PreparedStatement ps =(PreparedStatement) con.prepareStatement(insertQuery,Statement.RETURN_GENERATED_KEYS);
						ps.setLong(1, pos.getAtrId());
						ps.setLong(2, pos.getPosId());
						ps.setString(3, pos.getAtrposLink());
						ps.setString(4, pos.getCreatedDate());
						ps.setLong(5, pos.getActive());
						return ps;
					}
				},
				keyHolder);
		return (Long)keyHolder.getKey();
	
	}

	@Override
	public List<PositionDetail> getPositionListByAtrId(int id) {
		String sql = "select  distinct ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.NoOfPosition,p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus from atr a,position p, atr_statusdetails ats, status s where a.id=p.atrId and p.posId=ats.positionId and ats.posStatusId=s.id and s.type=2 and ats.atrId="+id+" and p.atrId="+id+";";

		/*List<Position> PositionList = jdbcTemplate.query(sql, new PositionMapper());
		return PositionList;*/
		
		List<PositionDetail> statusList = jdbcTemplate.query(sql, new RowMapper<PositionDetail>() {

			public PositionDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
				PositionDetail p = new PositionDetail(); 
				p.setAtrId(rs.getInt("atrId"));
				p.setAtsId(rs.getLong("atsId"));
				p.setPosId(rs.getLong("posId"));
				
				p.setPosStatus(rs.getString("posStatus"));
				p.setPosStatusId(rs.getLong("posStatusId"));
				p.setAtrposLink(rs.getString("atrposLink"));
				p.setJobDescription(rs.getString("jobDescription"));
		
				return p;
			}

		});
		return statusList;
		
		
	}
	
	//Drop Down Postion status;
	@Override
	public List<PositionStatus> getPositionStatus() {
		String sql="SELECT * FROM status where type=2";
		List<PositionStatus> positionStatusList = jdbcTemplate.query(sql, new RowMapper<PositionStatus>() {

			public PositionStatus mapRow(ResultSet rs, int rowNum) throws SQLException {
				PositionStatus p = new PositionStatus(); 
				p.setId(rs.getLong("id"));
				p.setStatus(rs.getString("status"));
				p.setDescription(rs.getString("description"));
				p.setType(rs.getLong("type"));
				p.setActive(rs.getLong("active"));
				return p;
			}

		});
		return positionStatusList;
	}

	@Override
	public List<User> getRecruiterList() {
		
		String sql = "SELECT * FROM users where roleID ='3'"; 
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
	public PositionDetail getPositionDetailsByAtrIdAndAtsId(int id, int atsId) {
	
		 //String sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.NoOfPosition,a.Experience,a.Location,a.MaxSalary,a.MinSalary,a.Role,a.skills,c.clientName, p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus,ats.assignedTo,u.firstName as assignedToUser from atr a left join position p on a.id=p.atrId left join client c on a.clientId=c.id left join atr_statusdetails ats on p.posId=ats.positionId left join status s on ats.posStatusId=s.id left join users u on ats.assignedTo=u.userId where s.type=2 and ats.atrId=31 and p.atrId=31  and ats.positionId=2 ORDER BY ats.id DESC LIMIT 1;";
		String sql="select ats.id as atsId, a.id as atrId,a.JobDescription AS jobDescription,a.Role AS role ,a.MinSalary AS minsalary,a.MaxSalary AS maxsalary,m1.name AS location,a.Experience AS experience,a.clientId AS clientId,p.posId,ats.posStatusId,m2.name AS skills,p.atrposLink,c.clientName AS clientName,s.status as posStatus,ats.assignedTo,u.firstName as assignedToUser from atr a left join position p on a.id=p.atrId left join atr_statusdetails ats on p.posId=ats.positionId LEFT JOIN client c ON a.clientId = c.id LEFT JOIN mastertable m1 ON a.Location = m1.id LEFT JOIN mastertable m2 ON a.skills = m2.id left join status s on ats.posStatusId=s.id left join users u on ats.assignedTo=u.userId where s.type=2 and ats.atrId="+id+" and p.atrId="+id+" and ats.id="+atsId+"";
		
		return jdbcTemplate.query(sql, new ResultSetExtractor<PositionDetail>() {
		@Override
		public PositionDetail extractData(ResultSet rs) throws SQLException,DataAccessException {
			if (rs.next()) {
				PositionDetail p = new PositionDetail(); 
				p.setAtrId(rs.getInt("atrId"));
				p.setAtsId(rs.getLong("atsId"));
				p.setPosId(rs.getLong("posId"));
				
				p.setPosStatus(rs.getString("posStatus"));
				p.setPosStatusId(rs.getLong("posStatusId"));
				p.setAtrposLink(rs.getString("atrposLink"));
				p.setClientName(rs.getString("clientName"));
				p.setExperience(rs.getLong("experience"));
				p.setLocation(rs.getString("location"));
				p.setMinsalary(rs.getLong("minsalary"));
				p.setMaxsalary(rs.getLong("maxsalary"));
				p.setRole(rs.getString("role"));
				p.setSkills(rs.getString("skills").split("-"));
				p.setJobDescription(rs.getString("jobDescription"));
				p.setAssignedTo(rs.getLong( "assignedTo"));
				p.setAssignedToUser(rs.getString("assignedToUser"));
				return p;
			}
			
			return null;
		}
		
	});
		
		/*PositionDetail positionDetail =  this.jdbcTemplate .queryForObject(
				sql, new Object[] {  }, new PositionDetailMapper());
			
		return positionDetail;*/
	}
	
	@Override
	public List<PositionDetail> getUserBasedPositionList(int id, int userId, int roleId) {
		String  sql="";
		 if(roleId==5) {
			 sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.Role as role,a.NoOfPosition,p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus from atr a,position p, atr_statusdetails ats, users u, status s where a.id=p.atrId and p.posId=ats.positionId and ats.posStatusId=s.id and u.userId=ats.createdBY and s.type=2 and ats.atrId="+id+" and p.atrId="+id+" and u.userId="+userId+"";
		 }
		 else if(roleId==3) {
		 sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.Role as role,a.NoOfPosition,p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus from atr a,position p, atr_statusdetails ats, users u, status s where a.id=p.atrId and p.posId=ats.positionId and ats.posStatusId=s.id and u.userId=ats.assignedTo  and s.type=2 and ats.atrId="+id+" and p.atrId="+id+" and u.userId="+userId+"";
		 }
		 else if(roleId==4) {
			 sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.Role as role,a.NoOfPosition,p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus from atr a,position p, atr_statusdetails ats, users u, status s where a.id=p.atrId and p.posId=ats.positionId and ats.posStatusId=s.id and u.userId=ats.assignedBY and s.type=2 and ats.atrId="+id+" and p.atrId="+id+" and u.userId="+userId+"";
		 }
		 else if(roleId==2) {
			 sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.Role as role,a.NoOfPosition,p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus from atr a,position p, atr_statusdetails ats, users u, status s where a.id=p.atrId and p.posId=ats.positionId and ats.posStatusId=s.id and u.userId=ats.assignedTo and s.type=2 and ats.atrId="+id+" and p.atrId="+id+" and u.userId="+userId+"";
		 }
		/*List<Position> PositionList = jdbcTemplate.query(sql, new PositionMapper());
		return PositionList;*/
		
		List<PositionDetail> userstatusList = jdbcTemplate.query(sql, new RowMapper<PositionDetail>() {

			public PositionDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
				PositionDetail p = new PositionDetail(); 
				p.setAtrId(rs.getInt("atrId"));
				p.setAtsId(rs.getLong("atsId"));
				p.setPosId(rs.getLong("posId"));
				
				p.setPosStatus(rs.getString("posStatus"));
				p.setPosStatusId(rs.getLong("posStatusId"));
				p.setAtrposLink(rs.getString("atrposLink"));
				p.setJobDescription(rs.getString("jobDescription"));
				p.setRole(rs.getString("role"));	
				return p;
			}

		});
		return userstatusList;
	}
	
	@Override
	public List<PositionDetail> getPositionbyStatus(int id, int userId, int roleId, int statusId) {
		String  sql="";
		 if(roleId==5) {
			 sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.Role as role,a.NoOfPosition,p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus from atr a,position p, atr_statusdetails ats, users u, status s where a.id=p.atrId and p.posId=ats.positionId and ats.posStatusId=s.id and u.userId=ats.createdBY and s.type=2 and ats.atrId="+id+" and p.atrId="+id+" and u.userId="+userId+" and ats.posStatusId = "+statusId+"";
		 }
		 else if(roleId==3) {
		 sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.Role as role,a.NoOfPosition,p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus from atr a,position p, atr_statusdetails ats, users u, status s where a.id=p.atrId and p.posId=ats.positionId and ats.posStatusId=s.id and u.userId=ats.assignedTo  and s.type=2 and ats.atrId="+id+" and p.atrId="+id+" and u.userId="+userId+" and ats.posStatusId = "+statusId+"";
		 }
		 else if(roleId==4) {
			 sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.Role as role,a.NoOfPosition,p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus from atr a,position p, atr_statusdetails ats, users u, status s where a.id=p.atrId and p.posId=ats.positionId and ats.posStatusId=s.id and u.userId=ats.assignedBY and s.type=2 and ats.atrId="+id+" and p.atrId="+id+" and u.userId="+userId+" and ats.posStatusId = "+statusId+"";
		 }
		 else if(roleId==2) {
			 sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.Role as role,a.NoOfPosition,p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus from atr a,position p, atr_statusdetails ats, users u, status s where a.id=p.atrId and p.posId=ats.positionId and ats.posStatusId=s.id and u.userId=ats.assignedTo and s.type=2 and ats.atrId="+id+" and p.atrId="+id+" and u.userId="+userId+" and ats.posStatusId = "+statusId+"";
		 }
		/*List<Position> PositionList = jdbcTemplate.query(sql, new PositionMapper());
		return PositionList;*/
		
		List<PositionDetail> userstatusList = jdbcTemplate.query(sql, new RowMapper<PositionDetail>() {

			public PositionDetail mapRow(ResultSet rs, int rowNum) throws SQLException {
				PositionDetail p = new PositionDetail(); 
				p.setAtrId(rs.getInt("atrId"));
				p.setAtsId(rs.getLong("atsId"));
				p.setPosId(rs.getLong("posId"));
				
				p.setPosStatus(rs.getString("posStatus"));
				p.setPosStatusId(rs.getLong("posStatusId"));
				p.setAtrposLink(rs.getString("atrposLink"));
				p.setJobDescription(rs.getString("jobDescription"));
				p.setRole(rs.getString("role"));	
				return p;
			}

		});
		return userstatusList;
	}
	

	@Override
	public long updatedManagerAtrStatus(PositionDetail pod,int updatedBy) {
		long updated = 0;
		String sql="update atr_statusdetails set posStatusId="+pod.getPosStatusId()+",updatedDate=now(),comment='"+pod.getComment()+"', statusChangeDate='"+convertDate(pod.getStatusChangeDate())+"'  where id="+pod.getAtsId()+"";
		//String sql="insert into atr_statusdetails (atrId,positionId,atrStatusId,posStatusId,assignedBy,assignedTo,createdBy,"
			//	+ "createdDate,comment,active) select atrId,positionId,atrStatusId,"+pod.getPosStatusId()+",assignedBy,"+pod.getAssignedTo()+",  "+updatedBy+", now(),'"+pod.getComment()+"',active from atr_statusdetails where id="+pod.getAtsId()+"";  
		updated=jdbcTemplate.update(sql);
		
		return updated;
	}
	
	@Override
	public long update(PositionDetail pod,int updatedBy) {
		long updated = 0;
		String sql="insert into atr_statusdetails (atrId,positionId,atrStatusId,posStatusId,assignedBy,assignedTo,createdBy,"
				+ "createdDate,comment,active,statusChangeDate) select atrId,positionId,atrStatusId,"+pod.getPosStatusId()+",assignedBy,"+pod.getAssignedTo()+",  "+updatedBy+", now(),'"+pod.getComment()+"',active,'"+convertDate(pod.getStatusChangeDate())+"' from atr_statusdetails where id="+pod.getAtsId()+"";  
		updated=jdbcTemplate.update(sql);
		
		return updated;
	}


	@Override
	public List<Status> getCandidateStatusList() {
		String sql="SELECT * FROM status where type=4;";
		List<Status> candidatestatusList = jdbcTemplate.query(sql, new RowMapper<Status>() {

			public Status mapRow(ResultSet rs, int rowNum) throws SQLException {
				Status s = new Status(); 
				s.setId(rs.getInt("id"));
				s.setStatus(rs.getString("status"));
				s.setDescription(rs.getString("description"));
				s.setType(rs.getInt("type"));
				s.setActive(rs.getInt("active"));
				return s;
			}

		});
		return candidatestatusList;
	}

	@Override
	public List<PositionDetail> getAssignToList(long atrId, long positionId, long assignedTo) {
		
		String sql="select * from atr_statusdetails where atrId="+atrId+" and positionId="+positionId+" and assignedTo="+assignedTo+";";
		RowMapper<PositionDetail> rowMapper = new PositionDetailMapper();
		return this.jdbcTemplate.query(sql, rowMapper);
		
	}

	@Override
	public long updatedManagerInprogressPositionStatusToOther(PositionDetail pod, int updatedBy) {
		long updated = 0;
		String sql="update atr_statusdetails set posStatusId="+pod.getPosStatusId()+" , updatedBy="+updatedBy+", updatedDate=now(),   statusChangeDate='"+convertDate(pod.getStatusChangeDate())+"' where atrId="+pod.getAtrId()+" and positionId="+pod.getPosId()+"";
		updated=jdbcTemplate.update(sql);
		
		return updated;
	}

	@Override
	public long updatedRecruiterInprogressPositionStatusToOther(PositionDetail pod, int updatedBy) {
		long updated = 0;
		String sql="update atr_statusdetails set posStatusId="+pod.getPosStatusId()+" ,updatedBy="+updatedBy+" , updatedDate=now(),  statusChangeDate='"+convertDate(pod.getStatusChangeDate())+"'  where atrId="+pod.getAtrId()+" and positionId="+pod.getPosId()+"";
		updated=jdbcTemplate.update(sql);
		
		return updated;
	}
	
	@Override
	public long updatedManagerAtrStatusDH(PositionDetail pod,int updatedBy) {
		long updated = 0;
		String sql="update atr_statusdetails set posStatusId="+pod.getPosStatusId()+",updatedDate=now(),comment='"+pod.getComment()+"', statusChangeDate='"+convertDate(pod.getStatusChangeDate())+"'  where id="+pod.getAtsId()+"";
		updated=jdbcTemplate.update(sql);
		
		return updated;
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

	@Override
	public PositionDetail getPositionDetailsByAtrIdAndPosId(int id, int posId) {
		String sql="select ats.id as atsId, a.id as atrId,a.JobDescription as jobDescription,a.NoOfPosition,a.Experience as experience,m1.name as location,a.MaxSalary as maxsalary,a.MinSalary as minsalary,a.Role as role,m2.name AS skills,c.clientName, p.posId,ats.posStatusId, p.atrposLink,s.status as posStatus,ats.assignedTo,u.firstName as assignedToUser from atr a left join position p on a.id=p.atrId left join client c on a.clientId=c.id left join atr_statusdetails ats on p.posId=ats.positionId left join status s on ats.posStatusId=s.id LEFT JOIN mastertable m1 ON a.Location = m1.id LEFT JOIN mastertable m2 ON a.skills = m2.id left join users u on ats.assignedTo=u.userId where s.type=2  and ats.atrId="+id+" and p.atrId="+id+"  and ats.positionId="+posId+" and m1.active=1 and m1.type='location' and m2.active=1 and m2.type='skills' ORDER BY ats.id DESC LIMIT 1";
		PositionDetail positionDetail =  this.jdbcTemplate .queryForObject(
				sql, new Object[] {  }, new PositionDetailMapper());
			
		return positionDetail;
	}

	

}
