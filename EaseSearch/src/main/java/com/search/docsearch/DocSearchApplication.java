package com.search.docsearch;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DocSearchApplication {

	public static void main(String[] args) {
		SpringApplication.run(DocSearchApplication.class, args);
	}

}
