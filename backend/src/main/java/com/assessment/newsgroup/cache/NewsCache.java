package com.assessment.newsgroup.cache;


import com.assessment.newsgroup.model.Article;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NewsCache {

    private final Map<String, List<Article>> cache = new HashMap<>();
    private final Map<String, Long> cacheTimestamps = new HashMap<>();

    public void addToCache(String keyword, List<Article> articles) {
        cache.put(keyword, articles);
        cacheTimestamps.put(keyword, System.currentTimeMillis());
    }

    public List<Article> getFromCache(String keyword) {
        return cache.getOrDefault(keyword, List.of());
    }

    public boolean isCacheValid(String keyword, long cacheDuration) {
        Long timestamp = cacheTimestamps.get(keyword);
        return timestamp != null && (System.currentTimeMillis() - timestamp) < cacheDuration;
    }
}
