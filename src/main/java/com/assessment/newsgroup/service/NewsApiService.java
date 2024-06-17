package com.assessment.newsgroup.service;

import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.NewsApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
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

    @Value("${newsapi.cacheduration}")
    private long cacheDuration;
    private final RestTemplate restTemplate = new RestTemplate();
    private final NewsCache newsCache = new NewsCache();
    public Map<String, List<Article>> searchNews(String keyword, long interval, ChronoUnit unit) {
        List<Article> articles;

        try {
            articles = fetchArticlesFromApi(keyword);
            newsCache.addToCache(keyword, articles);
        } catch (HttpServerErrorException | ResourceAccessException e) {
            if (newsCache.isCacheValid(keyword, cacheDuration)) {
                articles = newsCache.getFromCache(keyword);
            } else {
                return Collections.emptyMap(); // No cached data and API is unavailable
            }
        }

        // Grouping logic
        return articles.stream()
                .collect(Collectors.groupingBy(article -> getIntervalKey(article.publishedAt(), interval, unit, ZonedDateTime.now())));
    }

    private List<Article> fetchArticlesFromApi(String keyword) {
        String url = String.format("%s?q=%s&apiKey=%s", baseUrl, keyword, apiKey);
        NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
        return response != null ? response.articles() : List.of();
    }

    private String getIntervalKey(String publishedAt, long interval, ChronoUnit unit, ZonedDateTime now) {
        ZonedDateTime publishedDate = ZonedDateTime.parse(publishedAt);

        long periods = unit.between(publishedDate, now) / interval;
         now = now.minus(periods * interval, unit);

        return now.toString();
    }
}