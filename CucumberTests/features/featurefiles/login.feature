Feature: Login of the User on Jennings website

  @SmokeTest @SanityTest
  Scenario Outline: User login in with valid credentials
    Given user is on login page of jennings
    When user enters Username "test123" and Password as "Qwerty123" and clicks on login button
    Then verify whether deposit button is displayed in screen
    Then verify the user profile and balance displayed in page