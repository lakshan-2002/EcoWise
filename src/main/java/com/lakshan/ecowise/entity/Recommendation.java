package com.lakshan.ecowise.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "recommendations")
public class Recommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "category")
    private String category;

    @Column(name = "message")
    private String message;

    @Column(name = "priority")
    private String priority;

    @ManyToOne
    @JoinColumn(name = "waste_log_id")
    private FoodWasteLog foodWasteLog;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

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

    public FoodWasteLog getFoodWasteLog() {
        return foodWasteLog;
    }

    public void setFoodWasteLog(FoodWasteLog foodWasteLog) {
        this.foodWasteLog = foodWasteLog;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
