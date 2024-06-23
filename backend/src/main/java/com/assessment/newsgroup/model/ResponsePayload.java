package com.assessment.newsgroup.model;

import java.util.List;
import java.util.Map;

public record ResponsePayload(Map<String, List<Article>> result, String headerMessage){
}
