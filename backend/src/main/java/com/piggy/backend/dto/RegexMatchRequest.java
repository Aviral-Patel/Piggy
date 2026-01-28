package com.piggy.backend.dto;

public class RegexMatchRequest {
    private String regexPattern;
    private String sampleMessage;

    public RegexMatchRequest() {}

    public RegexMatchRequest(String regexPattern, String sampleMessage) {
        this.regexPattern = regexPattern;
        this.sampleMessage = sampleMessage;
    }

    public String getRegexPattern() {
        return regexPattern;
    }

    public void setRegexPattern(String regexPattern) {
        this.regexPattern = regexPattern;
    }

    public String getSampleMessage() {
        return sampleMessage;
    }

    public void setSampleMessage(String sampleMessage) {
        this.sampleMessage = sampleMessage;
    }
}
