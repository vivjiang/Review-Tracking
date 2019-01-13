import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DateSettingsContainer from './DateSettingsContainer';
import LocationSettingsContainer from './LocationSettingsContainer';


const styles = {
  root: {
    width: 700,
  },
  // table: {
  //   minWidth: 700,
  // },
};

const cohorts = [
  'Retrial',
];

const locations = [
  'Granbury', 'Abilene', 'Greenville', 'Palestine', 'Brownwood',
  'Midland', 'Grapevine', 'Frisco', 'Arlington', 'Grapevine Main St',
  'Ennis', 'Nacogdoches', 'Lubbock', 'Mansfield', 'College Station',
  'Athens', 'Longview', 'Allen', 'Burleson', 'Cleburne', 'Georgetown',
  'North Richland Hills', 'Cedar Hill', 'McKinney', 'Claremore', 'Lewisville',
  'Ada', 'San Angelo', 'Corsicana', 'Rockwall', 'Bryan', 'Denison',
  'Plainview', 'Watauga', 'Siloam Springs', 'Flower Mound', 'Spring', 'Henderson',
  'Lake Worth', 'Stephenville', 'Clovis', 'Tyler', 'Weatherford', 'Waco',
  'Wichita Falls', 'Springdale', 'Waxahachie', 'Chickasha', 'Wylie', 'Ardmore',
  'Broken Arrow', 'Lufkin', 'Hobbs', 'Round Rock', 'Temple',
];

class DialogSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [], startDate: new Date(), endDate: new Date(), filterBy: 'cohort', locationsChecked: [], cohortsChecked: [], location: [], cohort: [], tab: 0,
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleLocationsChange = this.handleLocationsChange.bind(this);
    this.handleCohortsChange = this.handleLocationsChange.bind(this);
  }


  componentDidMount() {
    console.log('in component did mount', this.props);
    const {
      filterBy, location, cohort, filter,
    } = this.props;
    const { locationsChecked, cohortsChecked } = this.state;
    let l = 0;
    while (l < locations.length) {
      if (filter.includes(locations[l])) {
        locationsChecked[locations[l]] = true;
      } else {
        locationsChecked[locations[l]] = false;
      }
      l += 1;
    }

    let c = 0;
    while (c < cohorts.length) {
      if (filter.includes(cohorts[c])) {
        cohortsChecked[cohorts[c]] = true;
      } else {
        cohortsChecked[cohorts[c]] = false;
      }
      c += 1;
    }

    this.setState({
      filterBy, location, cohort, locationsChecked, cohortsChecked,
    });
  }


  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };


  handleLocationChange = (event) => {
    this.setState({ location: event.target.value });
  }

  handleCohortChange = (event) => {
    this.setState({ cohort: event.target.value });
    console.log('handleCohortChange', event.target.value);
  }

  applySettingsChange = () => {
    console.log('apply settings change');
    const { handleSettingsApply, fetchChartDataLocation, fetchChartDataCohort } = this.props;
    const { filterBy, locationsChecked, cohortsChecked } = this.state;
    const locationsFilter = [];
    let l = 0;
    while (l < locations.length) {
      if (locationsChecked[locations[l]]) {
        locationsFilter.push(locations[l]);
      }
      l += 1;
    }

    const cohortsFilter = [];
    let c = 0;
    while (c < cohorts.length) {
      if (cohortsChecked[cohorts[c]]) {
        cohortsFilter.push(cohorts[c]);
      }
      c += 1;
    }

    if (filterBy === 'location') {
      console.log('apply settings locationsFiltered', locationsFilter);
      handleSettingsApply(filterBy, locationsFilter);
      fetchChartDataLocation(locationsFilter);
    } else if (filterBy === 'cohort') {
      console.log('applySettings change filter is cohort', cohortsChecked);
      handleSettingsApply(filterBy, cohortsFilter);
      fetchChartDataCohort(cohortsFilter);
    }
    // this.setState({ settingsOpen: true });
  }

  cancel = () => {
    console.log('cancel button clicked');
    const { handleSettingsCancel } = this.props;
    handleSettingsCancel();
  }

  handleFilterChange(value) {
    this.setState({ filterBy: value });
    // const { filterBy } = this.state
    console.log('handleFilterChange', value);
  }

  handleLocationsChange(value) {
    this.setState({ locationsChecked: value });
    // const { filterBy } = this.state
    console.log('handlelocationsChange', value);
  }

  handleCohortsChange(value) {
    console.log('handleCohortsChange', value);
    this.setState({ cohortsChecked: value });
    // const { filterBy } = this.state
  }

  handleStartChange(date) {
    this.setState({ startDate: date });
  }

  handleEndChange(date) {
    this.setState({ endDate: date });
  }


  render() {
    const {
      tab, data, startDate, endDate, filterBy, location, locationsChecked, cohortsChecked, cohort, period,
    } = this.state;
    console.log('this.state.data', data);
    return (
      <div>
        <Paper className="settingsContainer">
          <AppBar position="static" className="settingsTabContainer">
            <Tabs value={tab} onChange={this.handleTabChange} centered variant="fullWidth">
              <Tab label="Time Range" />
              <Tab label="Location" />
              <Tab label="Metric" />
            </Tabs>
          </AppBar>
          { tab === 0 && (
            <DateSettingsContainer>
              period={period}
              startDate={startDate}
              endDate={endDate}
            </DateSettingsContainer>)
          }
          { tab === 1 && (
            <LocationSettingsContainer
              filterBy={filterBy}
              location={location}
              cohort={cohort}
              cohorts={cohorts}
              locations={locations}
              locationsChecked={locationsChecked}
              cohortsChecked={cohortsChecked}
              handleFilterChange={this.handleFilterChange}
              handleCohortsChange={this.handleCohortsChange}
              handleLocationsChange={this.handleLocationsChange}
            />)
          }
        </Paper>
        <div className="applyCancelContainer">
          <Button variant="contained" color="primary" onClick={this.applySettingsChange} className=".applyButton">
            Apply
          </Button>
          <Button variant="contained" color="primary" onClick={this.cancel} className=".applyButton">
            Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DialogSettings);
