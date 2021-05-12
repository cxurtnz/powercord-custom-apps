const { React } = require('powercord/webpack');
const { SwitchItem, TextInput } = require('powercord/components/settings');

const activityData = [
  { name: 'Poker Night', id: '755827207812677713' },
  { name: 'Betrayal.io (Among Us clone)', id: '773336526917861400' },
  { name: 'Youtube together', id: '755600276941176913' },
  { name: 'Fishington.io', id: '814288819477020702' },
  { name: 'Chess (unfinished)', id: '832012586023256104' },
  { name: 'Game 2', id: '832012682520428625' },
  { name: 'Game 3', id: '832012730599735326' },
  { name: 'Game 4', id: '832012774040141894' },
  { name: 'Game 5', id: '832012815819604009' },
  { name: 'Game 6', id: '832012854282158180' },
  { name: 'Game 7', id: '832012894068801636' },
  { name: 'Game 8', id: '832012938398400562' },
  { name: 'Game 9', id: '832013003968348200' },
  { name: 'Game 10', id: '832013108234289153' },
  { name: 'Game 11', id: '832025061657280566' },
  { name: 'Game 12', id: '832025114077298718' },
  { name: 'Game 13', id: '832025144389533716' },
  { name: 'Game 14', id: '832025179659960360' },
  { name: 'Game 15', id: '832025219526033439' },
  { name: 'Game 16', id: '832025249335738428' },
  { name: 'Game 17', id: '832025333930524692' },
  { name: 'Game 18', id: '832025385159622656' },
  { name: 'Game 19', id: '832025431280320532' },
  { name: 'Game 20', id: '832025470685937707' },
  { name: 'Game 21', id: '832025799590281238' },
  { name: 'Game 22', id: '832025857525678142' },
  { name: 'Game 23', id: '832025886030168105' },
  { name: 'Game 24', id: '832025928938946590' },
  { name: 'Game 25', id: '832025993019260929' },
];

module.exports = class Settings extends React.Component {
  render() {
    const { getSetting, updateSetting, toggleSetting } = this.props;

    return (
      <div>
        <SwitchItem
          note='Override the default application urls for the applications below'
          value={getSetting('enabled', false)}
          onChange={() => toggleSetting('enabled')}
        >
          Enable custom activities
        </SwitchItem>
        {activityData.map((activity) => (
          <TextInput
            note={`The iframe url for this activity`}
            defaultValue={getSetting(`activity-${activity.id}`, `https://${activity.id}.discordsays.com`)}
            required={true}
            onChange={val => updateSetting(`activity-${activity.id}`, val)}
          >
            {`Activity ${activity.id} (${activity.name})`}
          </TextInput>
        ))}
      </div>
    );
  }
};

