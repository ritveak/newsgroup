package com.assessment.newsgroup.service;

import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.controller.NewsNotFoundException;
import com.assessment.newsgroup.model.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
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
        FetchedArticleResponse fetchedArticleResponse;
        if(isOfflineMode || newsCache.isCacheValid(keyword)){
            fetchedArticleResponse = newsCache.getFromCache(keyword);
        }else {
            fetchedArticleResponse = fetchArticleResponseFromAPIOrCache(keyword);
        }
        // Grouping logic
        var articleMap =  fetchedArticleResponse.articles().stream()
                .collect(Collectors.groupingBy(article -> getIntervalKey(article.publishedAt(), interval, chronoUnit, ZonedDateTime.now())));
        return new ResponsePayload(articleMap, fetchedArticleResponse.headerMessage());
    }

    private FetchedArticleResponse fetchArticleResponseFromAPIOrCache(String keyword) {
        FetchedArticleResponse fetchedArticleResponse;
        try {
            fetchedArticleResponse = fetchArticlesFromApi(keyword);
        } catch (HttpServerErrorException | ResourceAccessException |NewsNotFoundException e) {
            fetchedArticleResponse = newsCache.getFromCache(ScheduledTasks.TOP_HEADLINES);
        }
        return fetchedArticleResponse;
    }
    private void deleteRemovedArticles(NewsApiResponse response) throws NewsNotFoundException {
        if(Objects.isNull(response) || CollectionUtils.isEmpty(response.articles())){
            throw new NewsNotFoundException("No Records Found");
        }
        var removedArticles = response.articles().stream().filter(article -> article.title().equalsIgnoreCase("[Removed]")).toList();
        if(!CollectionUtils.isEmpty(removedArticles)){
            response.articles().removeAll(removedArticles);
        }

    }


    private FetchedArticleResponse fetchArticlesFromApi(String keyword) throws NewsNotFoundException {
        String url = String.format("%s/everything?q=%s&apiKey=%s", baseUrl, keyword, apiKey);
        NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
        deleteRemovedArticles(response);
        //if after removing all removed articles, the result becomes empty then fetch top headlines from cache
        if(Objects.nonNull(response) && !CollectionUtils.isEmpty(response.articles())){
            var articles = response.articles();
            newsCache.addToCache(keyword, articles);
            return new FetchedArticleResponse(articles,"Fetched results for "+keyword +" from Everything API");
        }else {
            throw new NewsNotFoundException("No Records Found");
        }
    }

    private String getIntervalKey(String publishedAt, long interval, ChronoUnit unit, ZonedDateTime now) {
        ZonedDateTime publishedDate = ZonedDateTime.parse(publishedAt);

        long periods = unit.between(publishedDate, now) / interval;
         now = now.minus(periods * interval, unit);

        return now.truncatedTo(ChronoUnit.HOURS).toString();
    }
}