package com.metadata.dto;

public class PositionAndCandidate {
	private long atrId;
	private long posId;
	private long posStatusId;
	private String statusChangeDate;
	private String firstName;
	private String lastName;
	private String email;
	private String mobile;
	private long candidateStatus;
	private String joiningDate;
	private String offeredDate;
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
	public long getPosStatusId() {
		return posStatusId;
	}
	public void setPosStatusId(long posStatusId) {
		this.posStatusId = posStatusId;
	}
	public String getStatusChangeDate() {
		return statusChangeDate;
	}
	public void setStatusChangeDate(String statusChangeDate) {
		this.statusChangeDate = statusChangeDate;
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
	public long getCandidateStatus() {
		return candidateStatus;
	}
	public void setCandidateStatus(long candidateStatus) {
		this.candidateStatus = candidateStatus;
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
	
	
}
