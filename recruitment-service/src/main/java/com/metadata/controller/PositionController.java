package com.metadata.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.metadata.dao.CandidateDao;
import com.metadata.dao.PositionDao;
import com.metadata.dto.Candidate;
import com.metadata.dto.PositionAndCandidate;
import com.metadata.dto.PositionDetail;
import com.metadata.dto.PositionStatus;
import com.metadata.dto.Status;
import com.metadata.dto.User;

@RestController
@RequestMapping("/position")
public class PositionController {
	
	@Autowired
	PositionDao posDao;
	
	@Autowired
	CandidateDao canDao;
	
	@RequestMapping(value = "viewPosition/{id}", method = RequestMethod.GET)
	public List<PositionDetail> getPositionList(@PathVariable int id ) throws URISyntaxException {
		List<PositionDetail> positionList = new ArrayList<PositionDetail>();
		try {
			positionList = posDao.getPositionListByAtrId(id);
        } catch (Exception e) {
			e.printStackTrace();
		}
		return positionList;
	}
	
	@RequestMapping(value = "viewManagerBasedPosition/{id}", method = RequestMethod.GET)
	public List<PositionDetail> getManagerPositionList(@PathVariable int id,@RequestParam int userId, @RequestParam int roleId) throws URISyntaxException {
		List<PositionDetail> positionList = new ArrayList<PositionDetail>();
		try {
			positionList = posDao.getUserBasedPositionList(id,userId,roleId);
        } catch (Exception e) {
			e.printStackTrace();
		}
		return positionList;
	}
	
	
	@RequestMapping(value = "viewRecruiterBasedPosition/{id}", method = RequestMethod.GET)
	public List<PositionDetail> getRecruiterBasedPositionList(@PathVariable int id,@RequestParam int userId, @RequestParam int roleId) throws URISyntaxException {
		List<PositionDetail> positionList = new ArrayList<PositionDetail>();
		try {
			positionList = posDao.getUserBasedPositionList(id,userId,roleId);
        } catch (Exception e) {
			e.printStackTrace();
		}
		return positionList;
	}
	
	@RequestMapping(value = "getPositionbyStatus/{id}", method = RequestMethod.GET)
	public List<PositionDetail> getPositionbyStatus(@PathVariable int id,@RequestParam int userId, @RequestParam int roleId, @RequestParam int statusId) throws URISyntaxException {
		List<PositionDetail> positionList = new ArrayList<PositionDetail>();
		try {
			positionList = posDao.getPositionbyStatus(id,userId,roleId, statusId);
        } catch (Exception e) {
			e.printStackTrace();
		}
		return positionList;
	}
	
	@RequestMapping(value = "positionStatus", method = RequestMethod.GET)
	public List<PositionStatus> getPositionStatus() throws URISyntaxException {
		List<PositionStatus> positionStatusList = new ArrayList<PositionStatus>();
		try {
			positionStatusList = posDao.getPositionStatus();
        } catch (Exception e) {
			e.printStackTrace();
		}
		return positionStatusList;
	}
	
	@RequestMapping(value = "getRecruiterList", method = RequestMethod.GET)
	public List<User> getRecruiterList() throws URISyntaxException {
		List<User> recruiterList = new ArrayList<User>();
		try {
			recruiterList = posDao.getRecruiterList();
        } catch (Exception e) {
			e.printStackTrace();
		}
		return recruiterList;
	}
	
	@RequestMapping(value = "getCandidateStatusList", method = RequestMethod.GET)
	public List<Status> getCandidateStatusList() throws URISyntaxException {
		List<Status> candidateStatusList = new ArrayList<Status>();
		try {
			candidateStatusList = posDao.getCandidateStatusList();
        } catch (Exception e) {
			e.printStackTrace();
		}
		return candidateStatusList;
	}
	
	
	
	
	@RequestMapping(value = "getPositionDetails/{id}", method = RequestMethod.GET)
	public PositionDetail getPositionDetails(@PathVariable int id,@RequestParam int atsId ) throws URISyntaxException {
		PositionDetail positionList = new PositionDetail();
		try {
			positionList = posDao.getPositionDetailsByAtrIdAndAtsId(id,atsId);
        } catch (Exception e) {
			e.printStackTrace();
		}
		return positionList;
	}
	


	
	@RequestMapping(value = "getInPositionDetails/{id}", method = RequestMethod.GET)
	public PositionDetail getInPositionDetails(@PathVariable int id,@RequestParam int posId ) throws URISyntaxException {
		PositionDetail positionList = new PositionDetail();
		try {
			positionList = posDao.getPositionDetailsByAtrIdAndPosId(id,posId);
        } catch (Exception e) {
			e.printStackTrace();
		}
		return positionList;
	}
	
	@RequestMapping(value = "updatePositionStatus", method = RequestMethod.PUT)
	public String updatePositionDetails(@RequestBody PositionDetail pod,@RequestParam int updatedBy ) throws URISyntaxException {
		String response = "";
		try {
			//List<PositionDetail> checkAssignedTo=new ArrayList<PositionDetail>();
			List<PositionDetail> checkAssignedToList=posDao.getAssignToList(pod.getAtrId(), pod.getPosId(),pod.getAssignedTo());
			if(checkAssignedToList.isEmpty()) {
				//update manager position status
				long updatedManagerAtrStatus=posDao.updatedManagerAtrStatus(pod,updatedBy);
				if(updatedManagerAtrStatus==1) {
					// insert new record with recruiter position status
					long updated= posDao.update(pod,updatedBy);
					 if(updated==1) {
						 response="success";
					 }
				}
				
			}else {
				response="alreadyAdded";
			}
        } catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	@RequestMapping(value = "updatePositionStatusDH", method = RequestMethod.PUT)
	public String updatePositionDetailsDH(@RequestBody PositionDetail pod,@RequestParam int updatedBy ) throws URISyntaxException {
		String response = "";
		try {
					
				long updated= posDao.updatedManagerAtrStatusDH(pod,updatedBy);
				 if(updated==1) {
				 response="success";
				}
				
	    	}
		catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	/*
	@RequestMapping(value = "updateInprogressPositionToOther", method = RequestMethod.PUT)
	public String updateInprogressPosition(@RequestBody PositionDetail pod,@RequestParam int updatedBy ) throws URISyntaxException {
		String response = "";
		try {
			//List<PositionDetail> checkAssignedTo=new ArrayList<PositionDetail>();
			
				//update manager position status
				long updatedManagerAtrStatus=posDao.updatedManagerInprogressPositionStatusToOther(pod,updatedBy);
				if(updatedManagerAtrStatus==1) {
					// insert new record with recruiter position status
					long updated= posDao.updatedRecruiterInprogressPositionStatusToOther(pod,updatedBy);
					 if(updated==1) {
						 response="success";
					 }
				
			}else {
				response="alreadyAdded";
			}
        } catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}*/
	
	@RequestMapping(value = "updateInprogressPositionToOtherAndCandidate", method = RequestMethod.PUT )
	public String updateInprogressPositionToOtherANdCandidate(@RequestBody PositionDetail pod,@RequestParam int updatedBy) throws URISyntaxException {
		String response = "";
		try {
			
			
			//update manager position status
			long updatedManagerAtrStatus=posDao.updatedManagerInprogressPositionStatusToOther(pod,updatedBy);
			if(updatedManagerAtrStatus==1) {
				//long updated= posDao.updatedRecruiterInprogressPositionStatusToOther(pod,updatedBy);
				
				 response="success";
			}else {
				response="alreadyAdded";
			}
			
        } catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	@RequestMapping(value = "updatePositionAndInsertCandidate", method = RequestMethod.PUT)
	public Object PositionDetailAndCandidate(@RequestBody PositionAndCandidate pod,@RequestParam int updatedBy ) throws URISyntaxException {
		String response = "";
		try {
			 
			PositionDetail pd=new PositionDetail();
			pd.setAtrId(pod.getAtrId());
			pd.setPosId(pod.getPosId());
			pd.setPosStatusId(pod.getPosStatusId());
			pd.setStatusChangeDate(pod.getStatusChangeDate());
			
			Candidate c=new Candidate();
			c.setAtrId(pod.getAtrId());
			c.setPosId(pod.getPosId());
			c.setFirstName(pod.getFirstName());
			c.setLastName(pod.getLastName());
			c.setEmail(pod.getEmail());
			c.setMobile(pod.getMobile());
			c.setCandidateStatus(pod.getCandidateStatus());
			c.setOfferedDate(pod.getOfferedDate());
			c.setJoiningDate(pod.getJoiningDate());
			c.setCreatedBy(updatedBy);
			c.setResumePath(null);
			
			//c.setOfferedDate(pod.get);
			
			//update manager position status and recruiter status. that only return value 2
			long updatedManagerAtrStatus=posDao.updatedManagerInprogressPositionStatusToOther(pd,updatedBy);
			if(updatedManagerAtrStatus==2) {
				//candidate added
				long insertCandidate= canDao.insert(c);
				
				 response="success";
			}else {
				response="alreadyAdded";
			}
        } catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	
	
	

}
