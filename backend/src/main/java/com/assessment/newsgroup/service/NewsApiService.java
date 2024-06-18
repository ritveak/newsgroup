package com.assessment.newsgroup.service;

import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.CustomChronoUnit;
import com.assessment.newsgroup.model.NewsApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class NewsApiService {
    @Value("${newsapi.key}")
    private String apiKey;

    @Value("${newsapi.baseurl}")
    private String baseUrl;

    @Value("${newsapi.cacheduration}")
    private long cacheDuration;
    private final RestTemplate restTemplate;
    private final NewsCache newsCache;

    public NewsApiService(RestTemplate restTemplate, NewsCache newsCache) {
        this.restTemplate = restTemplate;
        this.newsCache = newsCache;
    }

    public Map<String, List<Article>> searchNews(String keyword, long interval, CustomChronoUnit customChronoUnit, Boolean isOfflineMode) {
        var chronoUnit = customChronoUnit.toChronoUnit();
        List<Article> articles;
        if(isOfflineMode){
            articles = newsCache.getFromCache(keyword);
        }else {
            try {
                articles = fetchArticlesFromApi(keyword);
            } catch (HttpServerErrorException | ResourceAccessException e) {
                articles = newsCache.getFromCache(keyword);
            }
        }

        // Grouping logic
        return articles.stream()
                .collect(Collectors.groupingBy(article -> getIntervalKey(article.publishedAt(), interval, chronoUnit, ZonedDateTime.now())));
    }


    private List<Article> fetchArticlesFromApi(String keyword) {
        String url = String.format("%s/everything?q=%s&apiKey=%s", baseUrl, keyword, apiKey);
        NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
        List<Article> articles;
        if(Objects.nonNull(response) && !CollectionUtils.isEmpty(response.articles())){
            articles = response.articles();
            newsCache.addToCache(keyword, articles);
        }else{
            articles = newsCache.getFromCache(keyword);
        }
        return articles;
    }

    private String getIntervalKey(String publishedAt, long interval, ChronoUnit unit, ZonedDateTime now) {
        ZonedDateTime publishedDate = ZonedDateTime.parse(publishedAt);

        long periods = unit.between(publishedDate, now) / interval;
         now = now.minus(periods * interval, unit);

        return now.truncatedTo(ChronoUnit.HOURS).toString();
    }
}