package com.assessment.newsgroup.service;

import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.NewsApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.SmartLifecycle;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ScheduledTasks  implements SmartLifecycle {

    public static final String TOP_HEADLINES = "top-headlines";
    @Value("${newsapi.key}")
    private String apiKey;

    @Value("${newsapi.baseurl}")
    private String baseUrl;

    @Value("${newsapi.cacheduration}")
    private long cacheDuration;

    private final RestTemplate restTemplate;
    private final NewsCache newsCache;
    private boolean isRunning = false;
    public ScheduledTasks(RestTemplate restTemplate, NewsCache newsCache) {
        this.restTemplate = restTemplate;
        this.newsCache = newsCache;
    }

    @Scheduled(fixedRateString = "${newsapi.cacheduration}")
    public void fetchTopHeadlines() {
        String url = String.format("%s/top-headlines?sources=bbc-news&apiKey=%s", baseUrl, apiKey);
        try {
            NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
            if (response != null && response.articles() != null) {
                List<Article> articles = response.articles();
                newsCache.addToCache(TOP_HEADLINES, articles);
            }
        } catch (Exception e) {
            // Handle exceptions (log the error, etc.)
        }
    }
    @Override
    public void start() {
        fetchTopHeadlines();
        isRunning = true;
    }

    @Override
    public void stop() {
        isRunning = false;
    }

    @Override
    public boolean isRunning() {
        return isRunning;
    }
}
