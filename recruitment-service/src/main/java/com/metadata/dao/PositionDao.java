package com.metadata.dao;

import java.util.List;

import com.metadata.dto.Position;
import com.metadata.dto.PositionAndCandidate;
import com.metadata.dto.PositionDetail;
import com.metadata.dto.PositionStatus;
import com.metadata.dto.Status;
import com.metadata.dto.User;

public interface PositionDao {
	public long insert(Position pos) throws Exception;
	
	public List<PositionDetail> getPositionListByAtrId(int id);
	
	public List<PositionStatus> getPositionStatus();
	
	public List<User> getRecruiterList();
	
	public List<Status>getCandidateStatusList();
	
	public PositionDetail getPositionDetailsByAtrIdAndAtsId(int id, int atsId);
	
	public PositionDetail getPositionDetailsByAtrIdAndPosId(int id, int posId);
	
	
	public List<PositionDetail> getUserBasedPositionList(int id, int userId, int roleId);
	
	public long update(PositionDetail pod,int updatedBy);
	
	public long updatedManagerAtrStatus(PositionDetail pod,int updatedBy);
	
	public long updatedManagerAtrStatusDH(PositionDetail pod,int updatedBy);
	
	public List<PositionDetail> getAssignToList(long atrId, long positionId, long assignedTo);
	
	//public long updatedManagerInprogressPositionStatusToOther(PositionAndCandidate pod,int updatedBy);
	
	public long updatedManagerInprogressPositionStatusToOther(PositionDetail pod,int updatedBy);
	
	//public long updatedRecruiterInprogressPositionStatusToOther(PositionAndCandidate pod,int updatedBy);
	
	public long updatedRecruiterInprogressPositionStatusToOther(PositionDetail pod,int updatedBy);
 
	List<PositionDetail> getPositionbyStatus(int id, int userId, int roleId, int statusId);
}
