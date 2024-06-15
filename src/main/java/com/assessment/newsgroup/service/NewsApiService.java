package com.assessment.newsgroup.service;

import com.assessment.newsgroup.model.NewsApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class NewsApiService {
    //TODO: Need to encrypt api key
    private final String EVERYTHING_API_URL = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=ccaf5d41cc5140c984818c344edcc14d";
    @Value("${newsapi.key}")
    private String apiKey;

    @Value("${newsapi.baseurl}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    public NewsApiResponse searchNews(String keyword) {
        String url = String.format("%s?q=%s&apiKey=%s", baseUrl, keyword, apiKey);
        NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
        return response;
    }
    public NewsApiResponse getNews(){
        var exchange = restTemplate.exchange(EVERYTHING_API_URL, HttpMethod.GET, null, new ParameterizedTypeReference<NewsApiResponse>() {
        });
        return  exchange.getBody();
    }
}
