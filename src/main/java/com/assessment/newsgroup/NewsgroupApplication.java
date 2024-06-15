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
	//TODO: check if there are better ways to call api, is this secure?
	//Todo: store the value in memory and keep a global object and see the repercussions of keeping static of such huge data.
	private static final Logger LOG =LoggerFactory.getLogger(NewsgroupApplication.class);
	public static void main(String[] args) {
		SpringApplication.run(NewsgroupApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(NewsApiService newsApiService){
		return args -> {
			//when the application loads, get the news articles
			var response = newsApiService.searchNews("apple");
			System.out.println(response.totalResults());
			LOG.info("News fetched from News API, total count received : "+ response.totalResults());
		};
	}
}
