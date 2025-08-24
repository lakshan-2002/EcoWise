package com.lakshan.ecowise.service;

import com.lakshan.ecowise.entity.FoodWasteLog;
import com.lakshan.ecowise.repository.FoodWasteLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodWasteLogService {

    private final FoodWasteLogRepository foodWasteLogRepository;
    private final RecommendationService recommendationService;

    @Autowired
    public FoodWasteLogService(FoodWasteLogRepository foodWasteLogRepository,
                               RecommendationService recommendationService
    ) {
        this.foodWasteLogRepository = foodWasteLogRepository;
        this.recommendationService = recommendationService;
    }

    public void addFoodWasteLog(FoodWasteLog foodWasteLog) {
        foodWasteLogRepository.save(foodWasteLog);
        String prompt = """
                "I wasted %f %s of %s because they are %s. 
                 Give me 3 recommendations related to reducing this type of food waste.
                 Each recommendation must be in JSON format and contain only the following fields: 
                 message and priority.
                 Only return the JSON array. Do not include any explanation, markdown, or additional text."
                """.formatted(
                foodWasteLog.getQuantity(),
                foodWasteLog.getUnit(),
                foodWasteLog.getItemName(),
                foodWasteLog.getReason()
        );
        recommendationService.saveRecommendations(prompt,
                foodWasteLog.getCategory(),
                foodWasteLog,
                foodWasteLog.getUser()
        );

    }

    public List<FoodWasteLog> getAllFoodWasteLogs() {
        return foodWasteLogRepository.findAll();
    }

    public FoodWasteLog getFoodWasteLogById(int id) {
        return foodWasteLogRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Food waste log not found with id: " + id)
        );
    }

    public void updateFoodWasteLog(FoodWasteLog foodWasteLog) {
        if (foodWasteLogRepository.existsById(foodWasteLog.getId())) {
            foodWasteLogRepository.save(foodWasteLog);
        } else {
            throw new RuntimeException("Food waste log not found with id: " + foodWasteLog.getId());
        }
    }

    public void deleteFoodWasteLog(int id) {
        if (foodWasteLogRepository.existsById(id)) {
            foodWasteLogRepository.deleteById(id);
        } else {
            throw new RuntimeException("Food waste log not found with id: " + id);
        }
    }

    public List<FoodWasteLog> getFoodWasteLogsByUserId(int userId) {
        var foodWasteLogs = foodWasteLogRepository.findByUserId(userId);
        if (foodWasteLogs.isEmpty()) {
            throw new RuntimeException("No food waste logs found for user with id: " + userId);
        }
        return foodWasteLogs;
    }
}
