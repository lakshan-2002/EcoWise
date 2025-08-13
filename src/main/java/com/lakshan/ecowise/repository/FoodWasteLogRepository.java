package com.lakshan.ecowise.repository;

import com.lakshan.ecowise.entity.FoodWasteLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodWasteLogRepository extends JpaRepository<FoodWasteLog, Integer> {
    List<FoodWasteLog> findByUserId(int userId);
}
