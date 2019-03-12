package com.metadata.util;

import java.sql.Date;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class DateUtil {
	 
	public String setDateTimeNow() {
		java.util.Date dt = new java.util.Date();

		java.text.SimpleDateFormat sdf = 
		     new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

		return sdf.format(dt);
	}
	

	// return sql date
	public static java.sql.Date objectToDate(Object dateObject){
		if(dateObject==null|| dateObject.equals(""))
			return null;
		return dateConversion(dateObject);
	}
	// return sql date as a single quoted string
	public static String StringToDate(Object dateObject){
		if(dateObject==null|| dateObject.equals(""))
			return null;
		return "'"+dateConversion(dateObject)+"'";
	}
	// return sql date as a string
	public static String StringToSqlDate(Object dateObject){
		if(dateObject==null|| dateObject.equals(""))
			return null;
		return ""+dateConversion(dateObject)+"";
	}
	
	private static java.sql.Date dateConversion(Object dateObject) {
		Date convertedDate = null;
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		try {
			convertedDate = (Date) dateFormat.parse(dateObject.toString());
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return new java.sql.Date(convertedDate.getTime());
	}
	
	public static java.sql.Date convertDate(String date) {
		 
		Date utilDate;
		java.sql.Date sqlDate = null;
		try {
			utilDate = (Date) new SimpleDateFormat("dd/MM/yyyy").parse(date);
			 sqlDate = new java.sql.Date(utilDate.getTime());
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
	
		return sqlDate;
	}
}
