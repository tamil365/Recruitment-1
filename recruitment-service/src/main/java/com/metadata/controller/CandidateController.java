package com.metadata.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.metadata.dao.CandidateDao;
import com.metadata.dto.Candidate;

@RestController
@RequestMapping("/candidate")
public class CandidateController {
	
	@Autowired
	private Environment env;
	
	@Autowired
	CandidateDao candidateDao;
	
	@Autowired
    private HttpServletRequest request;
	
	//recruiter candidate add method from atrDetails in candidate form
	@RequestMapping(value="addCandidate", method=RequestMethod.POST)
	public String addCandidate(@RequestBody Candidate candidate,@RequestParam int createdBy) {
		String response = "";
		/* if (!file.isEmpty()) {
             try {
                 String uploadsDir = "F:/CompanyProjects/ATR/FileLocation";
                 String realPathtoUploads =  request.getServletContext().getRealPath(uploadsDir);
                 if(! new File(realPathtoUploads).exists())
                 {
                     new File(realPathtoUploads).mkdir();
                 }



                 String orgName = file.getOriginalFilename();
                 String filePath = realPathtoUploads + orgName;
                 System.out.println("CandidateController.addCandidate()==="+filePath);
                 File dest = new File(filePath);
                 file.transferTo(dest);
             }*/
         try {
        	 List<Candidate> checkAssignedToList=candidateDao.checkOfferedCandidateList(candidate.getAtrId(), candidate.getPosId());
 			if(checkAssignedToList.isEmpty()) {
				candidate.setCreatedBy(createdBy);
				long candidateId= candidateDao.insert(candidate); 
				if(candidateId==1) {
					response = "success";
						
				}
 			}else {
 				response = "alreadyadded";
 			}
			
				
			} 
		
			catch (Exception ex) {
				response = ex.getMessage();
			}
		return response;
	}
	
	@RequestMapping(value="addCandidateByManager", method=RequestMethod.POST)
	public String addCandidateByManager(@RequestBody Candidate candidate,@RequestParam int createdBy) {
		String response = "";
         try { 
        	 	//candidate offered
        	 	candidate.setCandidateStatus(18);
				candidate.setCreatedBy(createdBy);
				long candidateId= candidateDao.insert(candidate); 
				if(candidateId==1) {
					response = "success";
						
				}
			
				
			} 
		
			catch (Exception ex) {
				response = ex.getMessage();
			}
		return response;
	}
	@RequestMapping(value = "getCandidateList", method = RequestMethod.GET)
	public List<Candidate> getCandidateList(@RequestParam int atrId, @RequestParam int posId) throws URISyntaxException {
		List<Candidate> candidateList = new ArrayList<Candidate>();
		try {
			candidateList = candidateDao.getCandidateList(atrId,posId);
        } catch (Exception e) {
			e.printStackTrace();
		}
		return candidateList;
	}
	
	@RequestMapping(value = "getOfferedCandidateList", method = RequestMethod.GET)
	public List<Candidate> getOfferedCandidateList(@RequestParam int atrId, @RequestParam int posId) throws URISyntaxException {
		List<Candidate> offeredCandidateList = new ArrayList<Candidate>();
		try {
			offeredCandidateList = candidateDao.getOfferedCandidateList(atrId,posId);
        } catch (Exception e) {
			e.printStackTrace();
		}
		return offeredCandidateList;
	}
	
	@RequestMapping(value = "getFulfilledCandidateList", method = RequestMethod.GET)
	public List<Candidate> getFulfilledCandidateList(@RequestParam int atrId, @RequestParam int posId) throws URISyntaxException {
		List<Candidate> fulfilledCandidateList = new ArrayList<Candidate>();
		try {
			fulfilledCandidateList = candidateDao.getFulfillCandidateList(atrId,posId);
        } catch (Exception e) {
			e.printStackTrace();
		}
		return fulfilledCandidateList;
	}
	
	
	@RequestMapping(value = "updateCandidateStatus", method = RequestMethod.PUT)
	public String updateCandidateStatus(@RequestBody Candidate c,@RequestParam int updatedBy ) throws URISyntaxException {
		String response = "";
		try {
			//List<PositionDetail> checkAssignedTo=new ArrayList<PositionDetail>();
			
				//update manager position status
				long updatedManagerCandidateStatus=candidateDao.update(c, updatedBy);
				if(updatedManagerCandidateStatus==1) {
					// insert new record with recruiter position status
						 response="success";
				
				}else {
					response="alreadyAdded";
				}
        } catch (Exception e) {
			e.printStackTrace();
		}
		return response;
	}
	
	@RequestMapping(value = "getCandiPositionDeclined/{id}", method = RequestMethod.GET)
	public List<Candidate> getCandiPositionDeclined(@PathVariable int id,@RequestParam int userId, @RequestParam int roleId, @RequestParam int statusId) throws URISyntaxException {
		List<Candidate> candidateList = new ArrayList<Candidate>();
		try {
		candidateList = candidateDao.getCandiPositionDeclined(id,userId,roleId, statusId);
		} catch (Exception e) {
		e.printStackTrace();
	}
	return candidateList;
	}
	
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> uploadFile(
	    @RequestParam("uploadfile") MultipartFile uploadfile) {
	   Map<String, String> documentPath= new HashMap<>();
	  try {
	    // Get the filename and build the local file path (be sure that the 
	    // application have write permissions on such directory)
	    String filename = uploadfile.getOriginalFilename();
	    //String directory = "F:/CompanyProjects/ATR/FileLocation";
	    String directory=env.getProperty("spring.servlet.multipart.location");
	    String filepath = Paths.get(directory, filename).toString();
	    System.out.println("CandidateController.addCandidate()"+filepath);
	    // Save the file locally
	    BufferedOutputStream stream =
	        new BufferedOutputStream(new FileOutputStream(new File(filepath)));
	    stream.write(uploadfile.getBytes());
	    stream.close();
	    documentPath.put("path", filepath);
	    
	  }
	  catch (Exception e) {
	    System.out.println(e.getMessage());
	    return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	  }
	  return new ResponseEntity<>(documentPath,HttpStatus.OK);
	} // method uploadFile
	
	
	//private mehtod for file upload
	private void saveUploadedFile(MultipartFile file) throws IOException {
		System.out.println("CandidateController.saveUploadedFile()"+file);
		//String UPLOADED_FOLDER = "F:/CompanyProjects/ATR/FileLocation";
		
		String UPLOADED_FOLDER=env.getProperty("spring.servlet.multipart.location");
        if (!file.isEmpty()) {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(path, bytes);
        }
    }
}
