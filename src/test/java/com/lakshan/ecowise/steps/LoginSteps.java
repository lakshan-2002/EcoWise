package com.lakshan.ecowise.steps;

import com.lakshan.ecowise.controller.UserController;
import com.lakshan.ecowise.entity.User;
import com.lakshan.ecowise.service.UserService;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class LoginSteps {
    private UserController userController;
    private UserService userService;
    private User dbUser;
    private ResponseEntity<?> response;

    @Given("a registered user with email {string} and password {string}")
    public void a_registered_user_with_email_and_password(String email, String password) {
        userService = mock(UserService.class);
        userController = new UserController(userService);

        User dbUser = new User();
        dbUser.setEmail(email);
        dbUser.setPassword(DigestUtils.sha256Hex(password));

        when(userService.getUserByEmail(email)).thenReturn(dbUser);
    }

    @When("the user logs in with email {string} and password {string}")
    public void the_user_logs_in_with_email_and_password(String email, String password) {
        User inputUser = new User();
        inputUser.setEmail(email);
        inputUser.setPassword(password);

        response = userController.login(inputUser);

    }

    @Then("the login should be successful")
    public void the_login_should_be_successful() {
        assertEquals(200, response.getStatusCodeValue());
        //assertEquals(dbUser, response.getBody());
    }

    @Then("the login should fail with status {int}")
    public void the_login_should_fail_with_status(int status) {
        assertEquals(status, response.getStatusCodeValue());
    }


}
