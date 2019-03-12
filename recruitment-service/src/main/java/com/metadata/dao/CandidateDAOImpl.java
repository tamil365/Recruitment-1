package com.metadata.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.metadata.dto.Candidate;
import com.metadata.dto.CandidateMapper;
import com.metadata.dto.PositionAndCandidate;
import com.metadata.util.DateUtil;
@Repository
public class CandidateDAOImpl implements CandidateDao {
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	public CandidateDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	
	DateUtil du = new DateUtil();

	@Override
	public long insert(Candidate candidate) throws Exception {
		candidate.setCreatedDate(du.setDateTimeNow());
		candidate.setActive(1);
		String insertQuery = "INSERT INTO candidate (firstName,lastName,email,mobile,resumePath,candidateStatus,atrId,posId,joiningDate,offeredDate,createdBy,createdDate,active) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator() {
					@Override
					public java.sql.PreparedStatement createPreparedStatement(Connection con) throws SQLException {
						PreparedStatement ps =(PreparedStatement) con.prepareStatement(insertQuery,Statement.RETURN_GENERATED_KEYS);
						ps.setString(1, candidate.getFirstName());
						ps.setString(2, candidate.getLastName());
						ps.setString(3, candidate.getEmail());
						ps.setString(4, candidate.getMobile());
						ps.setString(5, candidate.getResumePath());
						ps.setLong(6, candidate.getCandidateStatus());
						ps.setLong(7, candidate.getAtrId());
						ps.setLong(8, candidate.getPosId());
						ps.setDate(9, convertDate(candidate.getJoiningDate()));
						ps.setDate(10, convertDate(candidate.getOfferedDate()));
						ps.setLong(11, candidate.getCreatedBy());
						ps.setString(12, candidate.getCreatedDate());
						ps.setLong(13, candidate.getActive());
						return ps;
					}
				},
				keyHolder);
		return (Long)keyHolder.getKey();
	}

	@Override
	public List<Candidate> getCandidateId(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Candidate> getCandidateList(int atrId,int posId) {
		String sql="select * from candidate where atrId="+atrId+" and posId="+posId+"";
		RowMapper<Candidate> rowMapper = new CandidateMapper();
		return this.jdbcTemplate.query(sql, rowMapper);
	}

	@Override
	public long update(Candidate c, int updatedBy) {
		
		long updated = 0;
		String sql="update candidate set candidateStatus="+c.getCandidateStatus()+" , updatedDate=now(),   joiningDate='"+convertDate(c.getJoiningDate())+"',updatedBy="+updatedBy+" where id="+c.getId()+"  and atrId="+c.getAtrId()+" and posId="+c.getPosId()+"";
		updated=jdbcTemplate.update(sql);
		
		return updated;
	}

	@Override
	public List<Candidate> getOfferedCandidateList(int atrId, int posId) {
		String sql="select * from candidate where atrId="+atrId+" and posId="+posId+" and candidateStatus=18 ";
		RowMapper<Candidate> rowMapper = new CandidateMapper();
		return this.jdbcTemplate.query(sql, rowMapper);
	}
	
	@Override
	public List<Candidate> getFulfillCandidateList(int atrId, int posId) {
		String sql="select * from candidate where atrId="+atrId+" and posId="+posId+" and candidateStatus=23 ";
		RowMapper<Candidate> rowMapper = new CandidateMapper();
		return this.jdbcTemplate.query(sql, rowMapper);
	}

	@Override
	public List<Candidate> checkOfferedCandidateList(long atrId, long posId) {
		String sql="select * from candidate where atrId="+atrId+" and posId="+posId+" ";
		RowMapper<Candidate> rowMapper = new CandidateMapper();
		return this.jdbcTemplate.query(sql, rowMapper);
	}
	
	@Override
	public List<Candidate> getCandiPositionDeclined(int id, int userId, int roleId, int statusId) {

		String sql="";
		sql="select * from candidate where atrId="+id+" and candidateStatus=19 ";
		RowMapper<Candidate> rowMapper = new CandidateMapper();
		return this.jdbcTemplate.query(sql, rowMapper);
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
