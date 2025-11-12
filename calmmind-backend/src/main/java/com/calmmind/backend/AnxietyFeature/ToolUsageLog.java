package com.calmmind.backend.AnxietyFeature;

import java.time.LocalDate;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
@Entity
@Table(name = "tool_usage_logs")
public class ToolUsageLog {
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;
    private Long toolId;
    private LocalDate usedAt;
    private Integer durationSeconds; // in minutes

    public ToolUsageLog() {}

    public ToolUsageLog(Long id, Long userId, Long toolId, LocalDate usedAt, Integer durationSeconds) {
        this.id = id;
        this.userId = userId;
        this.toolId = toolId;
        this.usedAt = usedAt;
        this.durationSeconds = durationSeconds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getToolId() {
        return toolId;
    }

    public void setToolId(Long toolId) {
        this.toolId = toolId;
    }

    public LocalDate getUsedAt() {
        return usedAt;
    }

    public void setUsedAt(LocalDate usedAt) {
        this.usedAt = usedAt;
    }

    public Integer getdurationSeconds() {
        return durationSeconds;
    }

    public void setdurationSeconds(Integer durationSeconds) {
        this.durationSeconds = durationSeconds;
    }
}