package com.metadata.dao;

import java.util.List;
import java.util.Map;

import com.metadata.dto.StatusReport; 

//import com.metadata.modal.User;
 

public interface ReportDao {
	public List<StatusReport> getStatusReportList();  
	public List<String> getLocationList();
	public List<StatusReport> getStatusReportListByLocation(String location);
	public List<StatusReport> getStatusReportListByClient(String client);
	public List<StatusReport> getStatusReportListByRecruiter(String recruiter);
	
	public List<Map> getClientList();
	public List<Map> getRecruiterList();
	public List<StatusReport> getStatusReportListByType(int APType,int APStatus);
	
}
