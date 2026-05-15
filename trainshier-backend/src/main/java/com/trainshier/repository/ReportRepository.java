package com.trainshier.repository;

import com.trainshier.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @param report repository
 */
public interface ReportRepository extends JpaRepository<Report, Long> {
}