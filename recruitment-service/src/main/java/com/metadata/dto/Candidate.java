package com.metadata.dto;


public class Candidate {
	private long id;
	private String firstName;
	private String lastName;
	private String email;
	private String mobile;
	private String resumePath;
	private long candidateStatus;
	private long atrId;
	private long posId;
	private long createdBy;
	private long updatedBy;
	private String createdDate;
	private String updatedDate;
	private long active;
	private String joiningDate;
	private String offeredDate;
	
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getResumePath() {
		return resumePath;
	}
	public void setResumePath(String resumePath) {
		this.resumePath = resumePath;
	}
	public long getCandidateStatus() {
		return candidateStatus;
	}
	public void setCandidateStatus(long candidateStatus) {
		this.candidateStatus = candidateStatus;
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
	
	public String getJoiningDate() {
		return joiningDate;
	}
	public void setJoiningDate(String joiningDate) {
		this.joiningDate = joiningDate;
	}
	public String getOfferedDate() {
		return offeredDate;
	}
	public void setOfferedDate(String offeredDate) {
		this.offeredDate = offeredDate;
	}
	
	
	
	
	/*
	public MultipartFile getDocument() {
		return document;
	}
	public void setDocument(MultipartFile document) {
		this.document = document;
	}*/
	
	
}
