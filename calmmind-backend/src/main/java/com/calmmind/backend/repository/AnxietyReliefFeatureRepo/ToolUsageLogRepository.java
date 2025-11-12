package com.calmmind.backend.repository.AnxietyReliefFeatureRepo;

import com.calmmind.backend.AnxietyFeature.ToolUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToolUsageLogRepository extends JpaRepository<ToolUsageLog, Long> {
    // Additional query methods can be defined here if needed
}