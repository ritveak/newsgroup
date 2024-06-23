package com.assessment.newsgroup.controller;

public class NewsNotFoundException extends Exception{
    public NewsNotFoundException(String noRecordsFound) {
        super(noRecordsFound);
    }
}
