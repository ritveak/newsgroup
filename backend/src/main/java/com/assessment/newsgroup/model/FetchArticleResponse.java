package com.assessment.newsgroup.model;

import java.util.List;

public record FetchArticleResponse(List<Article> articles, String headerMessage) {
}
