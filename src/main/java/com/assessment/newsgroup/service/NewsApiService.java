package com.assessment.newsgroup.service;

import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.NewsApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class NewsApiService {
    @Value("${newsapi.key}")
    private String apiKey;

    @Value("${newsapi.baseurl}")
    private String baseUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public Map<String, List<Article>> searchNews(String keyword, long interval, ChronoUnit unit) {
        String url = String.format("%s?q=%s&apiKey=%s", baseUrl, keyword, apiKey);
        NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
        if (response == null || response.articles() == null) {
            return Collections.emptyMap();
        }

        List<Article> articles = response.articles();

        // Grouping logic
        var now  = ZonedDateTime.now();

        return articles.stream()
                .collect(Collectors.groupingBy(article -> getIntervalKey(article.publishedAt(), interval, unit,now)));
    }

    private String getIntervalKey(String publishedAt, long interval, ChronoUnit unit, ZonedDateTime now) {
        ZonedDateTime publishedDate = ZonedDateTime.parse(publishedAt);

        long periods = unit.between(publishedDate, now) / interval;
         now = now.minus(periods * interval, unit);

        return now.toString();
    }
}