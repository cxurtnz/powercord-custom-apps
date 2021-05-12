const { Plugin } = require('powercord/entities');
const { getAllModules } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');

module.exports = class CustomActivity extends Plugin {
  constructor () {
    super();

    this.customApps = {
      '832012586023256104': { newFrame: 'https://www.addictinggames.com/embed/html5-games/23687' }
    }
  }

  startPlugin() {
    this.findAndModifyActivity()
  }

  async findAndModifyActivity() {
    const getActivityUrl = await getAllModules((m) => m?.default?.toString().includes(`if(i.default.inTestModeForEmbeddedApplication(e))return i.default.testModeOriginURL;`))[0];

    inject('custom-activity', getActivityUrl, 'default', (args, res) => {
      const activityId = args[0];
      this.log(`[ACTIVITY URL] https://${activityId}.discordsays.com`);
      const customApplication = this.customApps[activityId];
      if (customApplication) {
        this.log(`Custom application ID found for ${activityId} - iframe url: https://${activityId}.discordsays.com -> ${customApplication.newFrame}`);
        res = customApplication.newFrame;
      }
      return res;
    }, false); //? Ensure the code runs *after* the regular, as we want to return a custom url if the activityId matches.
  }

  pluginWillUnload() {
    uninject('custom-activity');
  }
}