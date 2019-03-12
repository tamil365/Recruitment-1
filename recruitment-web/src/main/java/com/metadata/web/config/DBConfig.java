package com.metadata.web.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBConfig {
	static Connection con=null;
	public static Connection getConnection() {
		Properties props = new Properties();
		FileInputStream fis = null;
		try {
			fis = new FileInputStream("application.properties");
			props.load(fis);

			// load the Driver Class
			Class.forName(props.getProperty("spring.datasource.driver-class-name"));

			// create the connection now
			con = DriverManager.getConnection(props.getProperty("spring.datasource.url"),
					props.getProperty("spring.datasource.username"),
					props.getProperty("spring.datasource.password"));
		} catch (IOException | ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return con;
	}


}
