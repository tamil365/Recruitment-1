package com.metadata.dto;

public class AtrStatus {
	
	private long id;
	private long atrId;
	private long positionId;
	private long atrStatusId;
	private long posStatusId;
	
	private long assignedBy;
	private long assignedTo;
	private long createdBy;
	private long updatedBy;
	private String createdDate;
	private String updatedDate;
	private long active;
	
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
	public long getPositionId() {
		return positionId;
	}
	public void setPositionId(long positionId) {
		this.positionId = positionId;
	}

	public long getAtrStatusId() {
		return atrStatusId;
	}
	public void setAtrStatusId(long atrStatusId) {
		this.atrStatusId = atrStatusId;
	}
	public long getPosStatusId() {
		return posStatusId;
	}
	public void setPosStatusId(long posStatusId) {
		this.posStatusId = posStatusId;
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
	public long getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(long createdBy) {
		this.createdBy = createdBy;
	}
	public long getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(long updatedBy) {
		this.updatedBy = updatedBy;
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
	public long getActive() {
		return active;
	}
	public void setActive(long active) {
		this.active = active;
	}
	
	
	

}
