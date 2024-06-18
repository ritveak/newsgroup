package com.assessment.newsgroup.controller;

import com.assessment.newsgroup.model.Article;
import com.assessment.newsgroup.model.CustomChronoUnit;
import com.assessment.newsgroup.service.NewsApiService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
public class NewsController {
    @Autowired
    private NewsApiService newsService;
    @Operation(summary = "Search for news articles",
            description = "Search for news articles based on a keyword and group the results by date intervals")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
            @ApiResponse(responseCode = "400", description = "Invalid input parameters"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping("/search")
    public Map<String, List<Article>> searchNews(
            @Parameter(description = "Keyword to search for", required = true)
            @RequestParam(required = true, defaultValue = "Breaking News") String keyword,
            @Parameter(description = "Interval for grouping results", required = false)
            @RequestParam(required = false, defaultValue = "12") long interval,
            @Parameter(description = "Unit for the interval", required = false,schema = @Schema(implementation = CustomChronoUnit.class))
            @RequestParam(required = false, defaultValue = "HOURS") CustomChronoUnit unit,
            @Parameter(description = "Is Offline mode or not", required = false)
            @RequestParam(required = false, defaultValue = "false") Boolean isOfflineMode
            ) {

        return newsService.searchNews(keyword, interval, unit,isOfflineMode);
    }
}
