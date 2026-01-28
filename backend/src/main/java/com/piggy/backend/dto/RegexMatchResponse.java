package com.piggy.backend.dto;

public class RegexMatchResponse {
    private boolean success;
    private String message;
    private String matchedText;

    public RegexMatchResponse() {}

    public RegexMatchResponse(boolean success, String message, String matchedText) {
        this.success = success;
        this.message = message;
        this.matchedText = matchedText;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMatchedText() {
        return matchedText;
    }

    public void setMatchedText(String matchedText) {
        this.matchedText = matchedText;
    }
}
