package com.calmmind.backend.AnxietyFeature;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.List;


@Entity
@Table(name = "anxiety_relief_features")
public class AnxietyReliefFeature {
   @Id 
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id; // main key
   @Column(nullable = false)
   private String featureName; // name of the feature
   @Column(columnDefinition = "TEXT")
   private String description; // description of the feature
   @Enumerated(EnumType.STRING)
   @Column(nullable = false)
   private AnxietyReliefAttachmentType category; // could be someone who taken an exam or not
   @Enumerated(EnumType.STRING)
   @Column(nullable = false)
   private AnxietyReliefFeatures featureType; // the process a user like to practice
   @Column(columnDefinition = "TEXT")
   private String content; // instructors , steps, or text content 
   private String audioUrl; // audio url if any
   private Integer duration; // duration in minutes if any

   public AnxietyReliefFeature () {}

   public AnxietyReliefFeature(Long id, String featureName, String description, AnxietyReliefAttachmentType category,
        AnxietyReliefFeatures featureType, String content, String audioUrl, Integer duration) {
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

    public AnxietyReliefAttachmentType getCategory() {
        return category;
    }

    public void setCategory(AnxietyReliefAttachmentType category) {
        this.category = category;
    }

    public AnxietyReliefFeatures getFeatureType() {
        return featureType;
    }

    public void setFeatureType(AnxietyReliefFeatures featureType) {
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