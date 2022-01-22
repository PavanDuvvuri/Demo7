Feature: Cashout of the User on Jennings website

  @SmokeTest @SanityTest
  Scenario Outline: As a user, I can cashout a placed bet

    Given user logged in to the application for validating cashout
    When user placed a bet to cashout
    And Navigate to My Bets section through account icon
    And Click on cashout menu
    And Click on cashout button and perform cashout functionality
    Then verify the successful cashout message displayed in popup
    Then verify the account balance update after cashout 
