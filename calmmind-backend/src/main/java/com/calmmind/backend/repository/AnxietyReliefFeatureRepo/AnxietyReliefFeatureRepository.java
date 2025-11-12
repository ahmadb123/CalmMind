package com.calmmind.backend.repository.AnxietyReliefFeatureRepo;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefAttachmentType;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefFeatures;
import com.calmmind.backend.AnxietyFeature.AnxietyReliefFeature;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnxietyReliefFeatureRepository extends JpaRepository<AnxietyReliefFeature, Long> {
    // Find by category (GENERAL, ANXIOUS_SPECIFIC, etc.)
    List<AnxietyReliefFeature> findByCategory(AnxietyReliefAttachmentType category);
    // find by feature type (BREATHING, MEDITATION, etc.)
    List<AnxietyReliefFeature> findByFeatureType(AnxietyReliefFeatures featureType);
    // find by category and feature type
    List<AnxietyReliefFeature> findByCategoryAndFeatureType(
        AnxietyReliefAttachmentType category, 
        AnxietyReliefFeatures featureType);
}