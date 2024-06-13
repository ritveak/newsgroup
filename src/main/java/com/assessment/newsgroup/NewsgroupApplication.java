package com.assessment.newsgroup;

import com.assessment.newsgroup.service.NewsApiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class NewsgroupApplication {
	private static final Logger LOG =LoggerFactory.getLogger(NewsgroupApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(NewsgroupApplication.class, args);
	}

	@Bean
	RestTemplate restTemplate(){
		return  new RestTemplate();
	}

	@Bean
	CommandLineRunner commandLineRunner(NewsApiService newsApiService){
		return args -> {
			//when the application loads, get the news articles
			var response = newsApiService.getNews();
			System.out.println(response.totalResults());
			LOG.info("News fetched from News API, total count received : "+ response.totalResults());
		};
	}
}
