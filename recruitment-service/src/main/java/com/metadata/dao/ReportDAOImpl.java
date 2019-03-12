package com.metadata.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.metadata.dto.StatusReport;

@Repository
public class ReportDAOImpl implements ReportDao {
	private JdbcTemplate jdbcTemplate;

	public ReportDAOImpl(DataSource dataSource) {
		jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public List<StatusReport> getStatusReportList() {

		String sql = "SELECT * FROM status_report_view_group";
		List<StatusReport> listStatusReport = jdbcTemplate.query(sql, new RowMapper<StatusReport>() {

			public StatusReport mapRow(ResultSet rs, int rowNum) throws SQLException {
				StatusReport statusReport = new StatusReport();
				statusReport.setId(rs.getInt("id"));
				statusReport.setAtrId(rs.getInt("atrId"));
				statusReport.setPositionId(rs.getInt("positionId"));
				statusReport.setATRPOS(rs.getString("ATRPOS"));
				statusReport.setAtrStatus(rs.getString("ATRStatus"));
				statusReport.setPositionStatus(rs.getString("PositionStatus"));
				statusReport.setUserName(rs.getString("userName"));
				statusReport.setLocation(rs.getString("location"));
				statusReport.setClient(rs.getString("client"));
				return statusReport;
			}
		});
		return listStatusReport;
	}
	
	@Override
	public List<StatusReport> getStatusReportListByType(int APType,int APStatus) {
		String sql = "";
		if(APType == 1) {
			sql = "SELECT * FROM status_report_view_group";
		}
		else if(APType == 2) {
			if(APStatus != 0) {
			sql = "SELECT * FROM status_report_view_group where ATRStatusID = '" + APStatus + "'";
			}
			else {
				sql = "SELECT * FROM status_report_view_group";
			}
		}
		else if(APType == 3) {
			if(APStatus != 0) {
						sql = "SELECT * FROM status_report_view_group where PositionStatusID = '" + APStatus + "'";
			}
			else {
			sql = "SELECT * FROM status_report_view_group";
			}
		}
		
		List<StatusReport> listStatusReport = jdbcTemplate.query(sql, new RowMapper<StatusReport>() {

			public StatusReport mapRow(ResultSet rs, int rowNum) throws SQLException {
				StatusReport statusReport = new StatusReport();
				statusReport.setId(rs.getInt("id"));
				statusReport.setAtrId(rs.getInt("atrId"));
				statusReport.setPositionId(rs.getInt("positionId"));
				statusReport.setATRPOS(rs.getString("ATRPOS"));
				statusReport.setAtrStatus(rs.getString("ATRStatus"));
				statusReport.setPositionStatus(rs.getString("PositionStatus"));
				statusReport.setUserName(rs.getString("userName"));
				statusReport.setLocation(rs.getString("location"));
				statusReport.setClient(rs.getString("client"));
				return statusReport;
			}
		});
		return listStatusReport;
	}

	@Override
	public List<StatusReport> getStatusReportListByLocation(String location) {
		String sql = "";
		if (location.matches("All")) {
			sql = "SELECT * FROM status_report_view_group";
		} else
			sql = "SELECT * FROM status_report_view_group where location = '" + location + "'";
		List<StatusReport> listStatusReport = jdbcTemplate.query(sql, new RowMapper<StatusReport>() {

			public StatusReport mapRow(ResultSet rs, int rowNum) throws SQLException {
				StatusReport statusReport = new StatusReport();
				statusReport.setId(rs.getInt("id"));
				statusReport.setAtrId(rs.getInt("atrId"));
				statusReport.setPositionId(rs.getInt("positionId"));
				statusReport.setATRPOS(rs.getString("ATRPOS"));
				statusReport.setAtrStatus(rs.getString("ATRStatus"));
				statusReport.setPositionStatus(rs.getString("PositionStatus"));
				statusReport.setUserName(rs.getString("userName"));
				statusReport.setLocation(rs.getString("location"));
				statusReport.setClient(rs.getString("client"));
				return statusReport;
			}
		});
		return listStatusReport;
	}

	@Override
	public List<StatusReport> getStatusReportListByClient(String client) {
		String sql = "";
		if (client.matches("All")) {
			sql = "SELECT * FROM status_report_view_group";
		} else
			sql = "SELECT * FROM status_report_view_group where clientId = '" + client + "'";
		List<StatusReport> listStatusReport = jdbcTemplate.query(sql, new RowMapper<StatusReport>() {

			public StatusReport mapRow(ResultSet rs, int rowNum) throws SQLException {
				StatusReport statusReport = new StatusReport();
				statusReport.setId(rs.getInt("id"));
				statusReport.setAtrId(rs.getInt("atrId"));
				statusReport.setPositionId(rs.getInt("positionId"));
				statusReport.setATRPOS(rs.getString("ATRPOS"));
				statusReport.setAtrStatus(rs.getString("ATRStatus"));
				statusReport.setPositionStatus(rs.getString("PositionStatus"));
				statusReport.setUserName(rs.getString("userName"));
				statusReport.setLocation(rs.getString("location"));
				statusReport.setClient(rs.getString("client"));
				return statusReport;
			}
		});
		return listStatusReport;
	}
	
	@Override
	public List<StatusReport> getStatusReportListByRecruiter(String recruiter) {
		String sql = "";
		if (recruiter.matches("All")) {
			sql = "SELECT * FROM status_report_view where roleId = 3 ";
		} else
			sql = "SELECT * FROM status_report_view where roleId = 3 and userId = '" + recruiter + "'";
		List<StatusReport> listStatusReport = jdbcTemplate.query(sql, new RowMapper<StatusReport>() {

			public StatusReport mapRow(ResultSet rs, int rowNum) throws SQLException {
				StatusReport statusReport = new StatusReport();
				statusReport.setId(rs.getInt("id"));
				statusReport.setAtrId(rs.getInt("atrId"));
				statusReport.setPositionId(rs.getInt("positionId"));
				statusReport.setATRPOS(rs.getString("ATRPOS"));
				statusReport.setAtrStatus(rs.getString("ATRStatus"));
				statusReport.setPositionStatus(rs.getString("PositionStatus"));
				statusReport.setUserName(rs.getString("userName"));
				statusReport.setLocation(rs.getString("location"));
				statusReport.setClient(rs.getString("client"));
				return statusReport;
			}
		});
		return listStatusReport;
	}

	@Override
	public List<String> getLocationList() {
		String sql = "SELECT distinct name FROM `mastertable` WHERE `type`='location'";
		List<String> locationList = jdbcTemplate.query(sql, new RowMapper<String>() {

			public String mapRow(ResultSet rs, int rowNum) throws SQLException {
				String location = new String();
				location = rs.getString("name");
				return location;
			}
		});
		return locationList;

	}

	@Override
	public List<Map> getClientList() {
		String sql = "select id,clientName from client where active=1";
		List<Map> clientList = jdbcTemplate.query(sql, new RowMapper<Map>() {

			public Map mapRow(ResultSet rs, int rowNum) throws SQLException {
				Map client = new HashMap();
				client.put(rs.getString("id"), rs.getString("clientName"));
				return client;
			}
		});
		return clientList;

	}

	@Override
	public List<Map> getRecruiterList() {
		String sql = "SELECT concat(firstName, ' ', lastName ) as name, userId as id FROM users where roleID = 3;";
		List<Map> recruiterList = jdbcTemplate.query(sql, new RowMapper<Map>() {

			public Map mapRow(ResultSet rs, int rowNum) throws SQLException {
				Map recruiter = new HashMap();
				recruiter.put(rs.getString("id"), rs.getString("name"));
				return recruiter;
			}
		});
		return recruiterList;

	}

	
	
}
