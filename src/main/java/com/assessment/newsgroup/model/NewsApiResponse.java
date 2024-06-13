package com.assessment.newsgroup.model;

import java.util.List;

public record NewsApiResponse (String status, Integer totalResults, List<Article> articleList) {

}
