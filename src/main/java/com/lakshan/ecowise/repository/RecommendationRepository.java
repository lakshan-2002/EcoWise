package com.lakshan.ecowise.repository;

import com.lakshan.ecowise.entity.Recommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecommendationRepository extends JpaRepository<Recommendation, Integer> {
    List<Recommendation> findByFoodWasteLogId(int wasteLogId);
}
