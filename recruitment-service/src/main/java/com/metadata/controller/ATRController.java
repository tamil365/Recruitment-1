package com.metadata.controller;

import java.net.URISyntaxException;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ParseException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.metadata.dao.AtrDao;
import com.metadata.dao.AtrStatusDao;
import com.metadata.dao.PositionDao;
import com.metadata.dto.Atr;
import com.metadata.dto.AtrStatus;
import com.metadata.dto.Position;
import com.metadata.dto.Status;
import com.metadata.dto.User;


@RestController
@RequestMapping("/atr")
public class ATRController {
	private static final Logger logger = Logger.getLogger(ATRController.class.getCanonicalName());
	@Autowired
	AtrDao atrDao;
	
	@Autowired
	PositionDao posDao;
	
	@Autowired
	AtrStatusDao arsDao;
	
	
	@RequestMapping(value="/addAtrForm", method=RequestMethod.POST)
	public String addAtr(@RequestBody Atr atr,@RequestParam int createdBy) {
		
		String response = "";
		try {
			if(atr !=null) {
				logger.info("Atr creating start");
				atr.setCreatedBy(createdBy);
				long atrId= atrDao.insert(atr); 
				if(!isEmptyNumber(atrId)) {
					long NoOfPosition=atr.getNoOfPosition();
					for(int i=1; i<=NoOfPosition;i++) {
						//add position details
						Position pos = new Position();
						pos.setAtrId(atrId);
						pos.setPosId(i);
						pos.setAtrposLink("atr"+atrId+"-pos"+i);
						long positionId=posDao.insert(pos);
						
						//add atr_statusDetails
						AtrStatus ars= new AtrStatus();
						ars.setAtrId(atrId);
						ars.setPositionId(i);
						ars.setAssignedBy(createdBy);
						ars.setAssignedTo(atr.getAssignedTo());
						ars.setCreatedBy(createdBy);
						long ats_statusId=arsDao.insert(ars);
						
					}
					response = "success";
					logger.info("Atr created succesfully with Position");
				}
			}else {
				logger.severe("Atr Not created");
			}
			
			} catch (Exception ex) {
				response = ex.getMessage();
			}
		return response;
		}
	
	
		//all atr view.
		@RequestMapping(value = "/viewatr", method = RequestMethod.GET)
		public List<Atr> getAtr() throws URISyntaxException {
			List<Atr> atrList = new ArrayList<Atr>();
			try {
				
				atrList = atrDao.getAtrList();
	        } catch (Exception e) {
//				response = e.getMessage();
			}
			return atrList;
		}
		
		//single atr view.
		@RequestMapping(value="/singleAtr/{id}", method=RequestMethod.GET)
		public Atr  getAtrById(@PathVariable int id){
			Atr atrList = new Atr();
			try {
				if(id!=0) {
					logger.info("Get AtrById Method with atrId--"+id);
					atrList = atrDao.getAtrbyId(id);
				}else {
					logger.severe("Get AtrById With list not working");
				}
			} catch (Exception e) {
				logger.severe("Get AtrById Exception"+e);
			}
			return atrList;
		}
		//update atr.
		@RequestMapping(value = "/updateAtr/{id}", method = RequestMethod.PUT)
		public String updateATR(@RequestBody Atr atr,@PathVariable int id, @RequestParam int createdBy , @RequestParam int roleId) throws URISyntaxException {
			String response = "";
			try {
				if(atr !=null) {
					logger.info("Update with atrId--"+id);
					atrDao.updateAtr(atr, id);
					logger.info("Atr Updated with atrId--"+id);
					if(roleId==5) {
						long NoOfPosition=atr.getNoOfPosition();
						for(int i=1; i<=NoOfPosition;i++) {
							//add atr_statusDetails
							AtrStatus ars= new AtrStatus();
							ars.setAtrId(id);
							ars.setPositionId(i);
							ars.setAssignedBy(createdBy);
							ars.setAssignedTo(atr.getAssignedTo());
							ars.setCreatedBy(createdBy);
							long ats_statusId=arsDao.insert(ars);
							
						}
					}
					response = "success";
				}
				} catch (Exception ex) {
					response = ex.getMessage();
				}
			return response;
		}
		
		//delet atr.
		@RequestMapping(value = "/deleteAtr/{id}", method = RequestMethod.DELETE)
		public void deleteAtr(@PathVariable int id) throws URISyntaxException {
			try {
	            atrDao.delete(id);
	        } catch (Exception ex) {
	             ex.printStackTrace(); ;
	        }
		}
		
		//get status list.
		@RequestMapping(value = "/statusList", method = RequestMethod.GET)
		public List<Status> getStatusList() throws URISyntaxException {
			List<Status> statusList = new ArrayList<Status>();
			try {
				
				statusList = atrDao.getStatusList();
	        } catch (Exception e) {
	//								response = e.getMessage();
			}
			return statusList;
		}
		
		//get atr assigned to select box
		@RequestMapping(value = "/assignManagerList", method = RequestMethod.GET)
		public List<User> getAssinedManagerList(@RequestParam int userId, @RequestParam int roleId ) throws URISyntaxException {
			List<User> statusList = new ArrayList<User>();
			try {
				statusList = atrDao.getAssinedManagerList(userId,roleId);
	        } catch (Exception e) {
	//								response = e.getMessage();
			}
			return statusList;
		}
		
		@RequestMapping(value = "/userRolebasedatr", method = RequestMethod.GET)
		public List<Atr> userRolebasedatrList(@RequestParam int userId, @RequestParam int roleId ) throws URISyntaxException {
		List<Atr> atrList = new ArrayList<Atr>();
			try {
				atrList = atrDao.userRolebasedatrList(userId,roleId);
	        } catch (Exception e) {
//				response = e.getMessage();
			}
			return atrList;
		}
		
		
		@RequestMapping(value = "/closedatr", method = RequestMethod.GET)
		public List<Atr> closeAtrList() throws URISyntaxException {
		List<Atr> atrList = new ArrayList<Atr>();
			try {
				atrList = atrDao.closeAtrList();
	        } catch (Exception e) {
//				response = e.getMessage();
			}
			return atrList;
		}
		
		
		public boolean isEmptyNumber(Long number){

	         if(number==null || number==0)  {
	           return true; 
	         } else {
	            return false; 
	          }
	      
		}
		
		private static java.sql.Date dateConversion(Object dateObject) {
			Date convertedDate = null;
			DateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
			try {
				convertedDate = (Date) dateFormat.parse(dateObject.toString());
			} catch (ParseException e) {
				e.printStackTrace();
			} catch (java.text.ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return new java.sql.Date(convertedDate.getTime());
		}
		
}


	
