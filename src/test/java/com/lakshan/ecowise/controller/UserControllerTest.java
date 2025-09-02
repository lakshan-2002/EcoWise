package com.lakshan.ecowise.controller;

import com.lakshan.ecowise.entity.User;
import com.lakshan.ecowise.service.UserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testLogin_Success() {
        User inputUser = new User();
        inputUser.setEmail("alice567@gmail.com");
        inputUser.setPassword("alice567567");

        User dbUser = new User();
        dbUser.setEmail("alice567@gmail.com");
        dbUser.setPassword(DigestUtils.sha256Hex("alice567567"));

        when(userService.getUserByEmail("alice567@gmail.com")).thenReturn(dbUser);

        ResponseEntity<?> response = userController.login(inputUser);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(dbUser, response.getBody());
    }

    @Test
    void testLogin_InvalidPassword() {
        User inputUser = new User();
        inputUser.setEmail("alice567@gmail.com");
        inputUser.setPassword("alice");

        User dbUser = new User();
        dbUser.setEmail("alice567@gmail.com");
        dbUser.setPassword(DigestUtils.sha256Hex("alice567567"));

        when(userService.getUserByEmail("alice567@gmail.com")).thenReturn(dbUser);

        ResponseEntity<?> response = userController.login(inputUser);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Invalid email or password", response.getBody());
    }
//
    @Test
    void testLogin_UserNotFound() {
        User inputUser = new User();
        inputUser.setEmail("alice567@gmail.com");
        inputUser.setPassword("alice567567");

        when(userService.getUserByEmail("alice567@gmail.com")).thenReturn(null);

        ResponseEntity<?> response = userController.login(inputUser);

        assertEquals(401, response.getStatusCodeValue());
        assertEquals("Invalid email or password", response.getBody());
    }

    @Test
    void testLogin_EmptyEmail() {
        User inputUser = new User();
        inputUser.setEmail("");
        inputUser.setPassword("alice567567");

        ResponseEntity<?> response = userController.login(inputUser);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Email and password must not be empty", response.getBody());
    }
//
    @Test
    void testLogin_InvalidEmailFormat() {
        User inputUser = new User();
        inputUser.setEmail("alice567gmail.com");
        inputUser.setPassword("alice567567");

        ResponseEntity<?> response = userController.login(inputUser);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Invalid email format", response.getBody());
    }
//
    @Test
    void testLogin_EmptyPassword() {
        User inputUser = new User();
        inputUser.setEmail("alice567@gmail.com");
        inputUser.setPassword("");

        ResponseEntity<?> response = userController.login(inputUser);

        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Email and password must not be empty", response.getBody());
    }

}
