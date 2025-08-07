package com.lakshan.ecowise.repository;

import com.lakshan.ecowise.entity.FoodWasteLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoodWasteLogRepository extends JpaRepository<FoodWasteLog, Integer> {
}
