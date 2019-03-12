package com.metadata.dto;

public class Position {
	
	private long id ;
	private long atrId;
	private long posId;
	private String atrposLink;
	private String posStatus;
	private long assignedBy;
	private long assignedTo;
	private long active;
	private String createdDate;
	private String updatedDate;
	
	private long atsId;
	private long posStatusId;
	
	public long getAtsId() {
		return atsId;
	}
	public void setAtsId(long atsId) {
		this.atsId = atsId;
	}
	public long getPosStatusId() {
		return posStatusId;
	}
	public void setPosStatusId(long posStatusId) {
		this.posStatusId = posStatusId;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getAtrId() {
		return atrId;
	}
	public void setAtrId(long atrId) {
		this.atrId = atrId;
	}
	public long getPosId() {
		return posId;
	}
	public void setPosId(long posId) {
		this.posId = posId;
	}
	public String getAtrposLink() {
		return atrposLink;
	}
	public void setAtrposLink(String atrposLink) {
		this.atrposLink = atrposLink;
	}
	
	public String getPosStatus() {
		return posStatus;
	}
	public void setPosStatus(String posStatus) {
		this.posStatus = posStatus;
	}
	public long getAssignedBy() {
		return assignedBy;
	}
	public void setAssignedBy(long assignedBy) {
		this.assignedBy = assignedBy;
	}
	public long getAssignedTo() {
		return assignedTo;
	}
	public void setAssignedTo(long assignedTo) {
		this.assignedTo = assignedTo;
	}
	public long getActive() {
		return active;
	}
	public void setActive(long active) {
		this.active = active;
	}
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	public String getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}
	
	
	
	
	
	

}
