// src/main/java/com/echo/app/model/NoteMeta.java

package com.echo.app.model;

/**
 * Metadata associated with a note.
 */
public class NoteMeta {

    private String userAgent;
    private String clientId;

    public NoteMeta() {
    }

    public NoteMeta(String userAgent, String clientId) {
        this.userAgent = userAgent;
        this.clientId = clientId;
    }

    public String getUserAgent() {
        return userAgent;
    }

    public void setUserAgent(String userAgent) {
        this.userAgent = userAgent;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }
}
