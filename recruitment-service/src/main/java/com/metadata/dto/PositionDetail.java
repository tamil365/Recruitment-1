package com.metadata.dto;

public class PositionDetail {
	private long atsId;
	private long atrId;
	private long posId;
	private long posStatusId;
	private String atrposLink;
	private String posStatus;
	private String jobDescription;
	private long  assignedTo;
	private String assignedToUser;
	private String comment;
	private String role;
	private String statusChangeDate;
	private long experience;
	private String location;
	private long minsalary;
	private long maxsalary;
	private String[] skills;
	private String clientName;
	
	public long getAtsId() {
		return atsId;
	}
	public void setAtsId(long atsId) {
		this.atsId = atsId;
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
	public long getPosStatusId() {
		return posStatusId;
	}
	public void setPosStatusId(long posStatusId) {
		this.posStatusId = posStatusId;
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
	public String getJobDescription() {
		return jobDescription;
	}
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}
	
	public long getAssignedTo() {
		return assignedTo;
	}
	public void setAssignedTo(long assignedTo) {
		this.assignedTo = assignedTo;
	}
	public String getAssignedToUser() {
		return assignedToUser;
	}
	public void setAssignedToUser(String assignedToUser) {
		this.assignedToUser = assignedToUser;
	}

	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getStatusChangeDate() {
		return statusChangeDate;
	}
	public void setStatusChangeDate(String statusChangeDate) {
		this.statusChangeDate = statusChangeDate;
	}
	public long getExperience() {
		return experience;
	}
	public void setExperience(long experience) {
		this.experience = experience;
	}
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public long getMinsalary() {
		return minsalary;
	}
	public void setMinsalary(long minsalary) {
		this.minsalary = minsalary;
	}
	public long getMaxsalary() {
		return maxsalary;
	}
	public void setMaxsalary(long maxsalary) {
		this.maxsalary = maxsalary;
	}
	public String[] getSkills() {
		return skills;
	}
	public void setSkills(String[] string) {
		this.skills = string;
	}
	public String getClientName() {
		return clientName;
	}
	public void setClientName(String clientName) {
		this.clientName = clientName;
	}
	
	
	
}
