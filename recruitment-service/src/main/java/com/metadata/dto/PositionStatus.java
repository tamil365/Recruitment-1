package com.metadata.dto;

public class PositionStatus {
	
	private long id;
	private String status;
	private String description;
	private long type;
	private long active;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public long getType() {
		return type;
	}
	public void setType(long type) {
		this.type = type;
	}
	public long getActive() {
		return active;
	}
	public void setActive(long active) {
		this.active = active;
	}
	
	

}
