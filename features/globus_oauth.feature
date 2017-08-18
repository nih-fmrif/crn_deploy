@watch
  Feature: Main page
    Scenario: User clicks on the Sign-in icon
      Given I load the main page
      When I click on the Sign In button
      And I click on the Sign In with Google button
      And I sign in with my Google credentials

