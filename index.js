const { Plugin } = require('powercord/entities');
const { getAllModules } = require('powercord/webpack');
const { inject, uninject } = require('powercord/injector');
const Settings = require('./Settings');

module.exports = class CustomActivity extends Plugin {
  constructor () {
    super();
  }

  startPlugin() {
    powercord.api.settings.registerSettings('custom-activity', {
      category: this.entityID,
      label: 'Custom Activities',
      render: Settings
    });

    this.findAndModifyActivity()
  }

  async findAndModifyActivity() {
    const getActivityUrl = await getAllModules((m) => m?.default?.toString().includes(`if(i.default.inTestModeForEmbeddedApplication(e))return i.default.testModeOriginURL;`))[0];

    inject('custom-activity', getActivityUrl, 'default', (args, res) => {
      if (!this.settings.get('enabled', false)) return res;

      const activityId = args[0];
      if (this.settings.get(`activity-${activityId}`, `https://${activityId}.discordsays.com`) === `https://${activityId}.discordsays.com`) return res;

      this.log(`[ACTIVITY URL] Custom activity found - ${activityId} - wants ${this.settings.get(`activity-${activityId}`, null)}`);
      res = this.settings.get(`activity-${activityId}`, null);

      return res;
    }, false); //? Ensure the code runs *after* the regular, as we want to return a custom url if the activityId matches.
  }

  pluginWillUnload() {
    uninject('custom-activity');
    powercord.api.settings.unregisterSettings('custom-activity');
  }
}