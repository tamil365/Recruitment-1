package com.metadata.dao;

import java.util.List;

import com.metadata.dto.Candidate;

public interface CandidateDao {
	
	public long insert(Candidate candidate) throws Exception;
	
	public List<Candidate> getCandidateId(int id);
	
	public List<Candidate> getCandidateList(int atrId,int posId);
	
	public long update(Candidate c,int updatedBy);
	
	public List<Candidate> getOfferedCandidateList(int atrId,int posId);
	
	public List<Candidate> getFulfillCandidateList(int atrId,int posId);
	
	public List<Candidate> checkOfferedCandidateList(long atrId,long posId);
	
	public List<Candidate> getCandiPositionDeclined(int id, int userId, int roleId, int statusId);
	
	

}
