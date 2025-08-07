package com.lakshan.ecowise.controller;

import com.lakshan.ecowise.entity.FoodWasteLog;
import com.lakshan.ecowise.service.FoodWasteLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/food_waste_logs")
public class FoodWasteLogController {

    private final FoodWasteLogService foodWasteLogService;

    @Autowired
    public FoodWasteLogController(FoodWasteLogService foodWasteLogService) {
        this.foodWasteLogService = foodWasteLogService;
    }

    @PostMapping("/addFoodWasteItem")
    public ResponseEntity<FoodWasteLog> addFoodWasteLog(@RequestBody FoodWasteLog foodWasteLog) {
        foodWasteLogService.addFoodWasteLog(foodWasteLog);
        return ResponseEntity.ok(foodWasteLog);
    }

    @GetMapping("/getFoodWasteItem/{id}")
    public FoodWasteLog getFoodWasteLog(@PathVariable int id) {
        return foodWasteLogService.getFoodWasteLogById(id);
    }

    @GetMapping("/getAllFoodWasteItems")
    public List<FoodWasteLog> getFoodWasteLogs() {
        return foodWasteLogService.getAllFoodWasteLogs();
    }

    @PutMapping("/updateFoodWasteItem")
    public ResponseEntity<FoodWasteLog> updateFoodWasteLog(@RequestBody FoodWasteLog foodWasteLog) {
        foodWasteLogService.updateFoodWasteLog(foodWasteLog);
        return ResponseEntity.ok(foodWasteLog);
    }

    @DeleteMapping("/deleteFoodWasteItem/{id}")
    public void deleteFoodWasteLog(@PathVariable int id) {
        foodWasteLogService.deleteFoodWasteLog(id);
    }
}
