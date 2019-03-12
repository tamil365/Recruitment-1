package com.metadata;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
 

@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class,
        DataSourceTransactionManagerAutoConfiguration.class })
/*@EnableTransactionManagement*/
@EnableAutoConfiguration
@ComponentScan("com.metadata")

public class RecruitmentServiceApplication extends SpringBootServletInitializer {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	public static void main(String[] args) {
		SpringApplication.run(RecruitmentServiceApplication.class, args);
	}
	

    @Bean
    public MultipartResolver multipartResolver() {
    	return new StandardServletMultipartResolver();        
    }
		
}
