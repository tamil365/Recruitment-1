package com.metadata.controller;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.metadata.dao.ReportDao;
import com.metadata.dto.StatusReport;  

@RestController
@RequestMapping("/report")
public class ReportController {

	@Autowired 
	ReportDao reportDao;
 
	//get User list
	@RequestMapping(value = "getStatusReport", method = RequestMethod.GET)
	public List<StatusReport> getStatusReport() {
		List<StatusReport> statusReportList = new ArrayList<StatusReport>();
		try { 
			statusReportList = reportDao.getStatusReportList();
			 
		} catch (Exception e) {
			 e.getMessage();
		}
		return statusReportList;
	}
		
	@RequestMapping(value = "getReportByType", method = RequestMethod.GET)
	public List<StatusReport> getReportByType(@RequestParam int APType, @RequestParam int APStatus ) {
		List<StatusReport> reportList = new ArrayList<StatusReport>();
		try { 
			reportList = reportDao.getStatusReportListByType(APType,APStatus);
			 
		} catch (Exception e) {
			 e.getMessage();
		}
		return reportList;
	}
	
	@RequestMapping(value = "getReportByLocation/{location}", method = RequestMethod.GET)
	public List<StatusReport> getReportByLocation(@PathVariable String location ) {
		List<StatusReport> reportList = new ArrayList<StatusReport>();
		try { 
			reportList = reportDao.getStatusReportListByLocation(location);
			 
		} catch (Exception e) {
			 e.getMessage();
		}
		return reportList;
	}
	// getStatusReportListByClient
	@RequestMapping(value = "getStatusReportListByClient/{client}", method = RequestMethod.GET)
	public List<StatusReport> getStatusReportListByClient(@PathVariable String client ) {
		List<StatusReport> reportList = new ArrayList<StatusReport>();
		try { 
			reportList = reportDao.getStatusReportListByClient(client);
			 
		} catch (Exception e) {
			 e.getMessage();
		}
		return reportList;
	}
	
	// getStatusReportListByClient
	@RequestMapping(value = "getStatusReportListByRecruiter/{recruiter}", method = RequestMethod.GET)
	public List<StatusReport> getStatusReportListByRecruiter(@PathVariable String recruiter ) {
		List<StatusReport> reportList = new ArrayList<StatusReport>();
		try { 
			reportList = reportDao.getStatusReportListByRecruiter(recruiter);
			 
		} catch (Exception e) {
			 e.getMessage();
		}
		return reportList;
	}
	
	//get location list
		@RequestMapping(value = "getLocationList", method = RequestMethod.GET)
		public List<String> getLocationList() {
			List<String> locationList = new ArrayList<String>();
			try { 
				locationList = reportDao.getLocationList();
				 
			} catch (Exception e) {
				 e.getMessage();
			}
			return locationList;
		}

		//get client list
		@RequestMapping(value = "getClientList", method = RequestMethod.GET)
		public List<Map> getClientList() {
			List<Map> clientList = new ArrayList<Map>();
			try { 
				clientList = reportDao.getClientList();
				 
			} catch (Exception e) {
				 e.getMessage();
			}
			return clientList;
		}

		//get recruiter list
		@RequestMapping(value = "getRecruiterList", method = RequestMethod.GET)
		public List<Map> getRecruiterList() {
			List<Map> recruiterList = new ArrayList<Map>();
			try { 
				recruiterList = reportDao.getRecruiterList();
				 
			} catch (Exception e) {
				 e.getMessage();
			}
			return recruiterList;
		}
		
		
}
