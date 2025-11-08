package com.calmmind.backend.service;
import com.calmmind.backend.model.Affirmation;
import com.calmmind.backend.model.AttachmentStyle;

public interface IAffirmationService {
    Affirmation getRandomAffirmation(); // pick any random affirmation
    Affirmation getRandomAffirmationPerStyle(AttachmentStyle style);
    // fallback if return null
    Affirmation createDefaultAffirmation();
}
