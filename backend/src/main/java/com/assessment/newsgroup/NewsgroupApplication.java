package com.assessment.newsgroup;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;


@SpringBootApplication
@EnableScheduling
public class NewsgroupApplication {
	public static void main(String[] args) {
		SpringApplication.run(NewsgroupApplication.class, args);
	}

}
