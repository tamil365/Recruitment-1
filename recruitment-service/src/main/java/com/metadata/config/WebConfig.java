package com.metadata.config;

import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

public class WebConfig implements WebMvcConfigurer {
	private int maxUploadSizeInMb = 5 * 1024 * 1024; // 5 MB
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
//		registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
		//super.addResourceHandlers(registry);
	}
	
	@Bean
	public ViewResolver viewResolver() {
		UrlBasedViewResolver viewResolver=new UrlBasedViewResolver();
		viewResolver.setViewClass(InternalResourceView.class);
		return viewResolver;
		
	}
	
 	@Bean
    public CommonsMultipartResolver multipartResolver() {

        CommonsMultipartResolver cmr = new CommonsMultipartResolver();
        cmr.setMaxUploadSize(maxUploadSizeInMb * 2);
        cmr.setMaxUploadSizePerFile(maxUploadSizeInMb); //bytes
        return cmr;

    }
	
	

}
