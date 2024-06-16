package com.assessment.newsgroup.controller;

import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.service.NewsApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@RestController
public class NewsController {
    @Autowired
    private NewsApiService newsService;

    @GetMapping("/search")
    public Map<String, List<Article>> searchNews(@RequestParam String keyword,
                                                 @RequestParam(required = false, defaultValue = "12") long interval,
                                                 @RequestParam(required = false, defaultValue = "HOURS") ChronoUnit unit) {
        return newsService.searchNews(keyword, interval, unit);
    }
}
