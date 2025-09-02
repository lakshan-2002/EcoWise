package com.lakshan.ecowise.service;

import com.lakshan.ecowise.entity.User;
import com.lakshan.ecowise.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetUserByIdSuccess(){
        User mockUser = new User();
        mockUser.setId(5);
        mockUser.setName("Alice");
        mockUser.setEmail("alice567@gmail.com");
        mockUser.setPassword("alice567567");
        when(userRepository.findById(5)).thenReturn(Optional.of(mockUser));

        User result = userService.getUserById(5);

        assertNotNull(result);
        assertEquals("Alice", result.getName());
        assertEquals("alice567@gmail.com", result.getEmail());
    }

    @Test
    void testGetUserByEmailNotFound() {
        when(userRepository.findByEmail("alice@gmail.com")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.getUserByEmail("alice@gmail.com");
        });

        assertEquals("User not found with email: alice@gmail.com", exception.getMessage());
    }


}
