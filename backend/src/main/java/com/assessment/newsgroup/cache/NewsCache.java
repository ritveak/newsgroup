package com.assessment.newsgroup.cache;


import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.FetchArticleResponse;
import com.assessment.newsgroup.service.ScheduledTasks;

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

    public FetchArticleResponse getFromCache(String keyword) {
        List<Article> articles;
        String headerMessage;
        if(cache.containsKey(keyword)){
            articles = cache.get(keyword);
            headerMessage = "Fetched results for "+keyword+" from cache.";
        }else{
            articles = cache.getOrDefault(ScheduledTasks.TOP_HEADLINES,List.of());
            headerMessage = "Could not find results for "+keyword;
            if(!articles.isEmpty()){
                headerMessage+="\nEnjoy the headlines for now.";
            }
        }
        return new FetchArticleResponse(articles,headerMessage);
    }

}
