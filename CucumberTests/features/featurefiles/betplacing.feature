Feature: To test Bet Placement functionality in jennings website
  @SmokeTest @SanityTest
  Scenario: User can be able to place bet successfully
    Given user is logged in and navigates to event page for soccer sport
    When user adds odd from the soccer page to betslip
    And user enters stakeamount on the betslip and user clicks on Bet Now button
    Then verify the return amount is displayed and it is equal to the return amount displayed in bottom of betslip
    Then verify the user entered stake amount and the stake amount displayed in bottom of betslip are same
    Then verify the betcount displayed in betslip
    And click on Placebet button
    Then verify the elements displayed in bet receipt after successfull bet placing
    Then verify the account balance updating after successfull bet placing
    Then Verify that the user is able to retain selections in bet receipt