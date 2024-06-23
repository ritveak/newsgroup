package com.assessment.newsgroup.service;

import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class NewsApiService {
    @Value("${newsapi.key}")
    private String apiKey;

    @Value("${newsapi.baseurl}")
    private String baseUrl;

    private final RestTemplate restTemplate;
    private final NewsCache newsCache;

    public NewsApiService(RestTemplate restTemplate, NewsCache newsCache) {
        this.restTemplate = restTemplate;
        this.newsCache = newsCache;
    }

    public ResponsePayload searchNews(String keyword, long interval, CustomChronoUnit customChronoUnit, Boolean isOfflineMode) {
        var chronoUnit = customChronoUnit.toChronoUnit();
        List<Article> articles;
        FetchArticleResponse fetchArticleResponse;
        String headerMessage;
        if(isOfflineMode){
            fetchArticleResponse = newsCache.getFromCache(keyword);
        }else {
            try {
                fetchArticleResponse = fetchArticlesFromApi(keyword);
            } catch (HttpServerErrorException | ResourceAccessException e) {
                fetchArticleResponse = newsCache.getFromCache(keyword);
            }
        }
        var removedArticles =fetchArticleResponse.articles().stream().filter(article -> article.title().equalsIgnoreCase("[Removed]")).toList();
        if(!CollectionUtils.isEmpty(removedArticles)){
            fetchArticleResponse.articles().removeAll(removedArticles);
        }
        if(fetchArticleResponse.articles().size()==0){
            fetchArticleResponse = newsCache.getFromCache(keyword);
        }
        // Grouping logic
        var articleMap =  fetchArticleResponse.articles().stream()
                .collect(Collectors.groupingBy(article -> getIntervalKey(article.publishedAt(), interval, chronoUnit, ZonedDateTime.now())));
        return new ResponsePayload(articleMap, fetchArticleResponse.headerMessage());
    }


    private FetchArticleResponse fetchArticlesFromApi(String keyword) {
        String url = String.format("%s/everything?q=%s&apiKey=%s", baseUrl, keyword, apiKey);
        NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
        List<Article> articles;
        FetchArticleResponse fetchArticleResponse;
        if(Objects.nonNull(response) && !CollectionUtils.isEmpty(response.articles())){
            articles = response.articles();
            fetchArticleResponse = new FetchArticleResponse(articles,"Fetched results for "+keyword +" from Everything API");
            newsCache.addToCache(keyword, articles);
        }else{
            fetchArticleResponse = newsCache.getFromCache(keyword);
        }
        return fetchArticleResponse;
    }

    private String getIntervalKey(String publishedAt, long interval, ChronoUnit unit, ZonedDateTime now) {
        ZonedDateTime publishedDate = ZonedDateTime.parse(publishedAt);

        long periods = unit.between(publishedDate, now) / interval;
         now = now.minus(periods * interval, unit);

        return now.truncatedTo(ChronoUnit.HOURS).toString();
    }
}