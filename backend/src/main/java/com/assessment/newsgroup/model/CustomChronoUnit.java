package com.assessment.newsgroup.model;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.temporal.ChronoUnit;

public enum CustomChronoUnit {
    @Schema(description = "Seconds", example = "SECONDS")
    SECONDS(ChronoUnit.SECONDS),
    @Schema(description = "Minutes", example = "MINUTES")
    MINUTES(ChronoUnit.MINUTES),
    @Schema(description = "Hours", example = "HOURS")
    HOURS(ChronoUnit.HOURS),
    @Schema(description = "Days", example = "DAYS")    DAYS(ChronoUnit.DAYS),
    @Schema(description = "Weeks", example = "WEEKS")    WEEKS(ChronoUnit.WEEKS),
    @Schema(description = "Months", example = "MONTHS")    MONTHS(ChronoUnit.MONTHS),
    @Schema(description = "Years", example = "YEARS")    YEARS(ChronoUnit.YEARS);

    private final ChronoUnit chronoUnit;

    CustomChronoUnit(ChronoUnit chronoUnit) {
        this.chronoUnit = chronoUnit;
    }

    public ChronoUnit toChronoUnit() {
        return this.chronoUnit;
    }
}