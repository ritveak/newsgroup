package com.assessment.newsgroup.service;

import com.assessment.newsgroup.model.NewsApiResponse;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsApiService {
    private final String EVERYTHING_API_URL = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=ccaf5d41cc5140c984818c344edcc14d";
    private final RestTemplate restTemplate;

    public NewsApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public NewsApiResponse getNews(){
        var exchange = restTemplate.exchange(EVERYTHING_API_URL, HttpMethod.GET, null, new ParameterizedTypeReference<NewsApiResponse>() {
        });
        return  exchange.getBody();
    }
}
