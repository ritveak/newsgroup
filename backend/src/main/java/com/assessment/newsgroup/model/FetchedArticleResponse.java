package com.assessment.newsgroup.model;

import java.util.List;

public record FetchedArticleResponse(List<Article> articles, String headerMessage) {
}
