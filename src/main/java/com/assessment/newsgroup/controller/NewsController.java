package com.assessment.newsgroup.controller;

import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.NewsApiResponse;
import com.assessment.newsgroup.service.NewsApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsController {
    @Autowired
    private NewsApiService newsService;

    @GetMapping("/search")
    public NewsApiResponse searchNews(@RequestParam String keyword) {
        return newsService.searchNews(keyword);
    }
}
