Feature: Registration of the User on Jennings website

  @SmokeTest @SanityTest
  Scenario Outline: As a user, I can access the Jennings site and Register

    Given user is on Registration Screen launched from Signup button on Homepage for registration validation in jennings
    When select the title "<Title>"
    And Fill the personal Details and select date of birth in Registration Form and Click on Continue Button for signup in jennings
    And Fill the Account details and click on complete button
    Then Verify that "<Registration Complete>" is displayed
    Then verify the message displayed in registration complete screen and buttons displyed in screen
    Then verify the functionality of Deposit Cash button
    Then verify user is logged in
    Examples:
|Title  | Registration Complete |
| Mr    | Registration Complete |
