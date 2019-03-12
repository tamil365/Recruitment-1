package com.metadata.dao;

import java.util.List;

import com.metadata.dto.Client;

public interface ClientDao {
	
	public boolean saveOrUpdate(Client client) throws Exception;
	public List<Client> getClientList();
	public Client getClientbyId(int id);
	
	public int update(Client client,int id) throws Exception;
	
	public int delete(int id);
	public List<Client> getIaClientList();

	public int resetIaClient(int id);

}
