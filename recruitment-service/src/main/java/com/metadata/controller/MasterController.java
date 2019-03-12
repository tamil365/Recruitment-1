package com.metadata.controller;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.metadata.dao.MasterDao;

import com.metadata.dto.Master;


@RestController
@RequestMapping("/master")
public class MasterController {
	
	@Autowired
	MasterDao masterdao;

	@RequestMapping(value = "viewMaster", method = RequestMethod.GET) // view master
	public List<Master> getMaster() throws URISyntaxException {
		List<Master> masterList = new ArrayList<Master>();
		try {
			
			masterList = masterdao.getMasterList();
        } catch (Exception e) {
//			response = e.getMessage();
		}
		return masterList;
	}
	
	
	@RequestMapping(value="addMaster/{Uid}", method=RequestMethod.POST) // add master
	public String addMasterdata(@RequestBody Master master,@PathVariable int Uid) {
		
		String response = "";
		try {
			masterdao.add(master,Uid); 
			response = "success";
			} catch (Exception ex) {
				response = ex.getMessage();
			}
		return response;
	}
	
	@RequestMapping(value = "getMaster/{id}", method = RequestMethod.GET)
	public Master getMasterById(@PathVariable int id) throws URISyntaxException {
		Master masterList = new Master();
		try {
			
			masterList = masterdao.getMasterbyId(id);
        } catch (Exception e) {
//			response = e.getMessage();
		}
		return masterList;
	}
	
	@RequestMapping(value = "updateMaster/{id}", method = RequestMethod.PUT)
	public String updateMaster(@RequestBody Master master,@PathVariable int id) throws URISyntaxException {
		String response = "";
		try {
			masterdao.update(master, id); 
			response = "success";
			} catch (Exception ex) {
				response = ex.getMessage();
			}
		return response;
	}
			
	//delet master data
	@RequestMapping(value = "deleteMaster/{id}", method = RequestMethod.DELETE)
	public void deletemaster(@PathVariable int id) throws URISyntaxException {
		try {
			masterdao.delete(id);
        } catch (Exception ex) {
             ex.printStackTrace(); ;
        }
	}
	
	// display Inactive masterdata
		@RequestMapping(value = "viewIaMaster", method = RequestMethod.GET) 
		public List<Master> getIaMaster() throws URISyntaxException {
			List<Master> masterList = new ArrayList<Master>();
			try {
				
				masterList = masterdao.getIaMasterList();
	        } catch (Exception e) {
//				response = e.getMessage();
			}
			return masterList;
		}
		// Reset Inactive clients
			@RequestMapping(value = "resetIaMaster/{id}", method = RequestMethod.GET) 
			public void resetIaMaster(@PathVariable int id) throws URISyntaxException {
				
				try {
					masterdao.resetIaMaster(id);
		        } catch (Exception e) {
//					response = e.getMessage();
				}
				
				
			}
			
			@RequestMapping(value = "viewLocation", method = RequestMethod.GET) // view location
			public List<Master> getLocation() throws URISyntaxException {
				List<Master> masterList = new ArrayList<Master>();
				try {
					
					masterList = masterdao.getLocationList();
		        } catch (Exception e) {
//					response = e.getMessage();
				}
				return masterList;
			}
			
			@RequestMapping(value = "viewSkills", method = RequestMethod.GET) // view location
			public List<Master> getSkills() throws URISyntaxException {
				List<Master> masterList = new ArrayList<Master>();
				try {
					
					masterList = masterdao.getSkillsList();
		        } catch (Exception e) {
//					response = e.getMessage();
				}
				return masterList;
			}
	
}
