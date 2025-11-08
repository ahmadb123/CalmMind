package com.calmmind.backend.repository;
import com.calmmind.backend.model.Affirmation;
import org.springframework.data.jpa.repository.JpaRepository;
import com.calmmind.backend.model.AttachmentStyle;
import java.util.List;
public interface AffirmationRepository extends JpaRepository<Affirmation, Long> {
    /*
     * first method: AttachmentStyle attachmentStyle(style);
        helps us allocate all styles and then pick a random one
     */
    List<Affirmation> findByAttachmentStyle(AttachmentStyle style);
}
