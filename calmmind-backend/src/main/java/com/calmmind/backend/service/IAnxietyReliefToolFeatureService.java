package com.calmmind.backend.service;

import java.util.List;

import com.calmmind.backend.AnxietyFeature.AnxietyReliefAttachmentType;
import com.calmmind.backend.model.AttachmentStyle;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefFeature;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefFeatures;

public interface IAnxietyReliefToolFeatureService {
    // get tools for user 
    List<AnxietyReliefFeature> getToolsForUser(Long userId);
    // Get tools by feature type (BREATHING, MEDITATION, etc.)
    List<AnxietyReliefFeature> getToolsByFeatureType(AnxietyReliefFeatures featureType);
    // Get a specific tool by ID
    AnxietyReliefFeature getToolById(Long toolId);
    // display available AnxietyReliefAttachmentType 
    List<AnxietyReliefAttachmentType> getAllAttachmentCategories();
    // disaply available AnxietyReliefFeatures
    List<AnxietyReliefFeatures> getAllFeatureTypes();
}