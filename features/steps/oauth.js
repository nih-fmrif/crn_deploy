module.exports = function () {
  this.When(/^I load the main page$/, async function () {
    browser.switchTab(browser.getTabIds(0));
    browser.url('https://localhost');
    expect(browser.getTitle()).toEqual('NIDO');
  });

  this.When(/^I click on the Sign In button$/, async function () {
    const signInButton = '.sign-in-nav-btn';
    browser.waitForExist(signInButton);
    browser.click(signInButton);
    browser.switchTab(browser.getTabIds()[1]);
    expect(browser.getTitle()).toEqual('Log In using Globus');
  });

  this.When(/^I click on the Sign In with Google button$/, async function () {
    const signInButton = '#google_signin_btn';
    browser.waitForExist(signInButton);
    browser.click(signInButton);
    expect(browser.getTitle()).toEqual('Sign in - Google Accounts');
  });

  this.When(/^I sign in with my Google credentials$/, async function () {
    expect(browser.getTitle()).toEqual('Sign in - Google Accounts');
    const emailField = '#identifierId';
    const emailNextButton = '#identifierNext';
    const passwordField = '#password input';
    const passwordNextButton = '#passwordNext';
    const userMenu = '#user-menu';

    browser.waitForExist(emailField);
    browser.setValue(emailField, 'dslabcomp@gmail.com');
    browser.click(emailNextButton);
    browser.waitForExist(passwordField);
    browser.pause(500);
    browser.setValue(passwordField, 'MCgOlPsN');
    browser.click(passwordNextButton);
    browser.switchTab(browser.getTabIds()[0]);
    browser.waitForExist(userMenu, 10000);
    expect(browser.getTitle()).toEqual('NIDO');
  });

};