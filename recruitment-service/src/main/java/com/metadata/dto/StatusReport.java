package com.metadata.dto;

public class StatusReport {
	
	private int id;
	public String getATRPOS() {
		return ATRPOS;
	}
	public void setATRPOS(String aTRPOS) {
		ATRPOS = aTRPOS;
	}
	public int getAtrId() {
		return atrId;
	}
	public void setAtrId(int atrId) {
		this.atrId = atrId;
	}
	public int getPositionId() {
		return positionId;
	}
	public void setPositionId(int positionId) {
		this.positionId = positionId;
	}
	public String getAtrStatus() {
		return atrStatus;
	}
	public void setAtrStatus(String atrStatus) {
		this.atrStatus = atrStatus;
	}
	public String getPositionStatus() {
		return positionStatus;
	}
	public void setPositionStatus(String positionStatus) {
		this.positionStatus = positionStatus;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	private String ATRPOS;
	private int atrId;
	private int positionId;
	private String atrStatus;
	private String positionStatus;
	private String userName;
	private String location;
	private String client;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getClient() {
		return client;
	}
	public void setClient(String client) {
		this.client = client;
	}
	 
	 
	

}
