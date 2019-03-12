package com.metadata.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import com.metadata.dto.AtrStatus;
import com.metadata.util.DateUtil;

@Repository
public class AtrStatusDAOImpl implements AtrStatusDao {
	
	@Autowired
    private JdbcTemplate jdbcTemplate;
	
	public AtrStatusDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	DateUtil du = new DateUtil();
	
	@Override
	public long insert(AtrStatus ats) throws Exception {
		ats.setAtrStatusId(1);
		ats.setPosStatusId(2);
		ats.setCreatedDate(du.setDateTimeNow());
		ats.setActive(1);
		
		String insertQuery = "INSERT INTO atr_statusdetails (atrId,positionId,atrStatusId,posStatusId,assignedBy,assignedTo,createdBy,createdDate,active) values(?,?,?,?,?,?,?,?,?)";
				
		KeyHolder keyHolder = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator() {
					@Override
					public java.sql.PreparedStatement createPreparedStatement(Connection con) throws SQLException {
						PreparedStatement ps =(PreparedStatement) con.prepareStatement(insertQuery,Statement.RETURN_GENERATED_KEYS);
						ps.setLong(1, ats.getAtrId());
						ps.setLong(2, ats.getPositionId());
						ps.setLong(3, ats.getAtrStatusId());
						ps.setLong(4, ats.getPosStatusId());
						ps.setLong(5, ats.getAssignedBy());
						ps.setLong(6,ats.getAssignedTo());
						ps.setLong(7, ats.getCreatedBy());
						ps.setString(8, ats.getCreatedDate());
						ps.setLong(9, ats.getActive());
						
						return ps;
					}
				},
				keyHolder);
		return (Long)keyHolder.getKey();
	}

}
