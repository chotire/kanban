package com.gsitm.kanban;

import java.io.File;

import org.apache.commons.io.FileUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;

@SpringBootApplication
public class Application {
	public static final String REPO = System.getProperty("user.home") + File.separator + "kanban";

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	@Bean
    CommandLineRunner init() {
        return (String[] args) -> {
        	File repo = new File(REPO);
        	repo.mkdir();
        	String filenames[] = new String[] {"IT0052.jpg", "IT0055.jpg", "IT0324.jpg", "IT0709.jpg"};
        	
        	for (String filename : filenames) {
            	ClassPathResource classPathResource = new ClassPathResource("sample/" + filename);
            	FileUtils.copyInputStreamToFile(classPathResource.getInputStream(), new File(repo, filename));
        	}
        };
    }
}