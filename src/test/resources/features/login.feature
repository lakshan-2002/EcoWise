Feature: User Login
  As a registered user
  I want to log in with my email and password
  So that I can access the system securely

  Scenario: Successful login with valid credentials
    Given a registered user with email "alice567@gmail.com" and password "alice567567"
    When the user logs in with email "alice567@gmail.com" and password "alice567567"
    Then the login should be successful

  Scenario: Login fails with incorrect password
    Given a registered user with email "alice567@gmail.com" and password "alice567567"
    When the user logs in with email "alice567@gmail.com" and password "alice567"
    Then the login should fail with status 401

