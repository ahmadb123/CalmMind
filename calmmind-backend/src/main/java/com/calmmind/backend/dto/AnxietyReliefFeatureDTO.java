package com.calmmind.backend.dto;

public class AnxietyReliefFeatureDTO {
    private Long id;
    private String featureName;
    private String description;
    private String category;
    private String featureType;
    private String content;
    private String audioUrl;
    private Integer duration;

    public AnxietyReliefFeatureDTO(Long id, String featureName, String description, String category,
            String featureType, String content, String audioUrl, Integer duration) {
        this.id = id;
        this.featureName = featureName;
        this.description = description;
        this.category = category;
        this.featureType = featureType;
        this.content = content;
        this.audioUrl = audioUrl;
        this.duration = duration;
    }
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFeatureName() {
        return featureName;
    }

    public void setFeatureName(String featureName) {
        this.featureName = featureName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFeatureType() {
        return featureType;
    }

    public void setFeatureType(String featureType) {
        this.featureType = featureType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAudioUrl() {
        return audioUrl;
    }

    public void setAudioUrl(String audioUrl) {
        this.audioUrl = audioUrl;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }
}