package com.lakshan.ecowise.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import org.springframework.stereotype.Component;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Component
public class AiRecommendationDTO {

    @JsonProperty("message")
    private String message;

    @JsonProperty("priority")
    private String priority;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public List<AiRecommendationDTO> parseRecommendations(String jsonResponse) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readValue(jsonResponse, new TypeReference<List<AiRecommendationDTO>>() {
            });
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse recommendations" + e.getMessage());
        }

    }
}
