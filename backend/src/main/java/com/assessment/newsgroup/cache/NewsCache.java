package com.assessment.newsgroup.cache;


import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.FetchedArticleResponse;
import com.assessment.newsgroup.service.ScheduledTasks;
import org.springframework.beans.factory.annotation.Value;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NewsCache {
    @Value("${newsapi.cacheduration}")
    private long cacheDuration;

    private final Map<String, List<Article>> cache = new HashMap<>();
    private final Map<String, Long> cacheTimestamps = new HashMap<>();

    public synchronized void addToCache(String keyword, List<Article> articles) {
        cache.put(keyword.toUpperCase(), articles);
        cacheTimestamps.put(keyword.toUpperCase(), System.currentTimeMillis());
    }

    public synchronized FetchedArticleResponse getFromCache(String keyword) {
        List<Article> articles;
        String headerMessage;

        if(isCacheValid(keyword)){
            articles = cache.get(keyword.toUpperCase());
            headerMessage = "Fetched results for "+keyword+" from cache.";
        }else{
            articles = cache.getOrDefault(ScheduledTasks.TOP_HEADLINES,List.of());
            headerMessage = "Could not find results for "+keyword+".";
            if(!articles.isEmpty()){
                headerMessage+="enjoy the headlines for now.";
            }
        }
        return new FetchedArticleResponse(articles,headerMessage);
    }
    public synchronized boolean isCacheValid(String keyword) {
        Long timestamp = cacheTimestamps.get(keyword.toUpperCase());
        if (timestamp == null) {
            return false;
        }
        boolean isValid = (System.currentTimeMillis() - timestamp) < cacheDuration;
        if (!isValid) {
            removeExpiredCacheEntry(keyword);
        }
        return isValid;
    }
    private synchronized void removeExpiredCacheEntry(String keyword) {
        cache.remove(keyword.toUpperCase());
        cacheTimestamps.remove(keyword.toUpperCase());
    }

    public synchronized void cleanupCache() {
        long currentTime = System.currentTimeMillis();
        var iterator = cacheTimestamps.entrySet().iterator();

        while (iterator.hasNext()) {
            var entry = iterator.next();
            if(entry.getKey().equalsIgnoreCase(ScheduledTasks.TOP_HEADLINES)){
                continue;
            }
            if ((currentTime - entry.getValue()) >= cacheDuration) {
                String keyword = entry.getKey();
                cache.remove(keyword.toUpperCase());
                iterator.remove();
            }
        }
    }


}
