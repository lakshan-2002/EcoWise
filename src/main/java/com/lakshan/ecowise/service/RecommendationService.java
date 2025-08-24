package com.lakshan.ecowise.service;

import com.lakshan.ecowise.entity.FoodWasteLog;
import com.lakshan.ecowise.entity.Recommendation;
import com.lakshan.ecowise.entity.User;
import com.lakshan.ecowise.model.AiRecommendationDTO;
import com.lakshan.ecowise.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecommendationService {

    private final RecommendationRepository recommendationRepository;
    private final AiService aiService;
    private final AiRecommendationDTO aiRecommendationDTO;

    @Autowired
    public RecommendationService(RecommendationRepository recommendationRepository,
                                 AiService aiService,
                                 AiRecommendationDTO aiRecommendationDTO
    ) {
        this.recommendationRepository = recommendationRepository;
        this.aiService = aiService;
        this.aiRecommendationDTO = aiRecommendationDTO;
    }

    @Async
    public void saveRecommendations(String prompt,
                                    String category,
                                    FoodWasteLog foodWasteLog,
                                    User user
    ) {
        String chatResponse = aiService.chat(prompt);
        var dataList = aiRecommendationDTO.parseRecommendations(chatResponse);

        for (var data : dataList) {
            addNewRecommendation(data, category, foodWasteLog, user);
        }

    }

    public void addNewRecommendation(AiRecommendationDTO recommendationDTO,
                                     String category,
                                     FoodWasteLog foodWasteLog,
                                     User user
    ) {
        Recommendation recommendation = new Recommendation();
        recommendation.setFoodWasteLog(foodWasteLog);
        recommendation.setUser(user);
        recommendation.setCategory(category);
        recommendation.setMessage(recommendationDTO.getMessage());
        recommendation.setPriority(recommendationDTO.getPriority());

        recommendationRepository.save(recommendation);
    }

    public List<Recommendation> getAllRecommendations() {
        return recommendationRepository.findAll();
    }

    public List<Recommendation> getRecommendationsByWasteLogId(int id) {
        var recommendations = recommendationRepository.findByFoodWasteLogId(id);
        if (recommendations.isEmpty()) {
            throw new RuntimeException("No recommendations found for food waste log with id: " + id);
        }
        return recommendations;
    }

    public List<Recommendation> getRecommendationsByUserId(int userId) {
        var recommendations = recommendationRepository.findByUserId(userId);
        if (recommendations.isEmpty()) {
            throw new RuntimeException("No recommendations found for user with id: " + userId);
        }
        return recommendations;
    }
}
