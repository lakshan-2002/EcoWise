package com.lakshan.ecowise.controller;

import com.lakshan.ecowise.entity.Recommendation;
import com.lakshan.ecowise.service.RecommendationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/recommendations")
public class RecommendationController {

    private final RecommendationService recommendationService;

    @Autowired
    public RecommendationController(RecommendationService recommendationService) {
        this.recommendationService = recommendationService;
    }

    @GetMapping("/getAllRecommendations")
    public List<Recommendation> getRecommendations() {
        return recommendationService.getAllRecommendations();
    }

    @GetMapping("/getRecommendationsByWasteLogId/{wasteLogId}")
    public List<Recommendation> getRecommendationsByWasteLogId(@PathVariable int wasteLogId) {
        return recommendationService.getRecommendationsByWasteLogId(wasteLogId);
    }
}
