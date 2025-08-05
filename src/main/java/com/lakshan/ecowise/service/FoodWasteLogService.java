package com.lakshan.ecowise.service;

import com.lakshan.ecowise.entity.FoodWasteLog;
import com.lakshan.ecowise.repository.FoodWasteLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodWasteLogService {

    private final FoodWasteLogRepository foodWasteLogRepository;

    @Autowired
    public FoodWasteLogService(FoodWasteLogRepository foodWasteLogRepository) {
        this.foodWasteLogRepository = foodWasteLogRepository;
    }

    public void addFoodWasteLog(FoodWasteLog foodWasteLog) {
        foodWasteLogRepository.save(foodWasteLog);
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
}
