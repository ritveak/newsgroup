package com.assessment.newsgroup.service;

import com.assessment.newsgroup.cache.NewsCache;
import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.NewsApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.SmartLifecycle;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class ScheduledTasks  implements SmartLifecycle {
    private static final Logger logger = LoggerFactory.getLogger(ScheduledTasks.class);
    public static final String TOP_HEADLINES = "TOP_HEADLINES";
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
        logger.info("Triggered by Scheduler, fetching top headlines");
        try {
            NewsApiResponse response = restTemplate.getForObject(url, NewsApiResponse.class);
            if (response != null && response.articles() != null) {
                List<Article> articles = response.articles();
                newsCache.addToCache(TOP_HEADLINES, articles);
                logger.info("Successfully fetched and cached top headlines");
            } else {
                logger.warn("No articles found in the response");
            }
        } catch (Exception e) {
            logger.error("Error occurred while fetching top headlines", e);
        }
    }
    @Scheduled(fixedRateString = "${newsapi.cacheduration}")
    public void cleanupCache() {
        logger.info("Running cache cleanup");
        newsCache.cleanupCache();
        logger.info("Cache cleanup completed");
    }
    @Override
    public void start() {
        logger.info("Starting ScheduledTasks");
        fetchTopHeadlines();
        isRunning = true;
    }

    @Override
    public void stop() {
        logger.info("Stopping ScheduledTasks");
        isRunning = false;
    }

    @Override
    public boolean isRunning() {
        return isRunning;
    }
}
