module.exports = function () {
  this.BeforeFeatures(() => {
    try {

      // Close all tabs except the first one
      browser.getTabIds().slice(1).map(tabId => {
        console.log('Closing tab: ', tabId);
        browser.close(tabId);
      });

    } catch(err) {
      console.log(err);
    }
  });
};