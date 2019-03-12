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

import com.metadata.dao.ClientDao;
import com.metadata.dto.Atr;
import com.metadata.dto.Client;

@RestController
@RequestMapping("/client")
public class ClientController {
	@Autowired
	ClientDao clientDao;
	
	@RequestMapping(value="addClient", method=RequestMethod.POST)
	public String addPerson(@RequestBody Client client) {
		
		String response = "";
		try {
			clientDao.saveOrUpdate(client); 
			response = "success";
			} catch (Exception ex) {
				response = ex.getMessage();
			}
		return response;
	}
	
	@RequestMapping(value = "viewClient", method = RequestMethod.GET)
	public List<Client> getClient() throws URISyntaxException {
		List<Client> clientList = new ArrayList<Client>();
		try {
			
			clientList = clientDao.getClientList();
        } catch (Exception e) {
//			response = e.getMessage();
		}
		return clientList;
	}
	
	@RequestMapping(value = "getClient/{id}", method = RequestMethod.GET)
	public Client getClientById(@PathVariable int id) throws URISyntaxException {
		Client clientList = new Client();
		try {
			
			clientList = clientDao.getClientbyId(id);
        } catch (Exception e) {
//			response = e.getMessage();
		}
		return clientList;
	}
	
	//update client.
	@RequestMapping(value = "updateClient/{id}", method = RequestMethod.PUT)
	public String updateClient(@RequestBody Client client,@PathVariable int id) throws URISyntaxException {
		String response = "";
		try {
			clientDao.update(client, id); 
			response = "success";
			} catch (Exception ex) {
				response = ex.getMessage();
			}
		return response;
	}
			
	//delet Client.
	@RequestMapping(value = "deleteClient/{id}", method = RequestMethod.DELETE)
	public void deleteAtr(@PathVariable int id) throws URISyntaxException {
		try {
			clientDao.delete(id);
        } catch (Exception ex) {
             ex.printStackTrace(); ;
        }
	}
	
	// display Inactive clients
	@RequestMapping(value = "viewIaClient", method = RequestMethod.GET) 
	public List<Client> getIaClient() throws URISyntaxException {
		List<Client> clientList = new ArrayList<Client>();
		try {
			
			clientList = clientDao.getIaClientList();
        } catch (Exception e) {
//			response = e.getMessage();
		}
		return clientList;
	}
	// Reset Inactive clients
		@RequestMapping(value = "resetIaClient/{id}", method = RequestMethod.GET) 
		public void resetIaClient(@PathVariable int id) throws URISyntaxException {
			
			try {
			clientDao.resetIaClient(id);
	        } catch (Exception e) {
//				response = e.getMessage();
			}
			
			
		}
}
