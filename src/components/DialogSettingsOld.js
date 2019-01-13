import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
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

const cohorts = [
  'Retrial', 'New Units', 'Stable Stores',
];

class DialogSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [], startDate: new Date(), endDate: new Date(), filterBy: 'cohort', location: [], cohort: [], tab: 0,
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }


  componentDidMount() {
    console.log('in component did mount', this.props);
    const { filterBy, location, cohort } = this.props;
    this.setState({ filterBy, location, cohort });
    // console.log('reviews prop', reviews);
    // const reviewsReformat = [];
    // for (let i = 0; i < reviews.length; i += 1) {
    //   console.log(reviews[i].Location);
    //   const location = reviews[i].Location;
    //   const rating = reviews[i].Rating;
    //   const content = reviews[i].Content;
    //   reviewsReformat.push(this.createData(location, rating, content));
    // }
    // console.log('reviews', reviewsReformat);
    // this.setState({ data: reviewsReformat });
  }

  handleFilterChange = (event) => {
    this.setState({ filterBy: event.target.value });
    // const { filterBy } = this.state
    console.log('handleFilterChange', event.target.value);
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
    const { handleSettingsClose, fetchChartDataLocation, fetchChartDataCohort } = this.props;
    const { filterBy, location, cohort } = this.state;
    if (filterBy === 'location') {
      handleSettingsClose(filterBy, location);
      fetchChartDataLocation(location);
    } else if (filterBy === 'cohort') {
      console.log('applySettings change filter is cohort', cohort);
      handleSettingsClose(filterBy, cohort);
      fetchChartDataCohort(cohort);
    }
    // this.setState({ settingsOpen: true });
  }

  cancel = () => {
    const { handleSettingsClose } = this.props;
    const { filterBy } = this.state;
    handleSettingsClose(filterBy);
  }

  handleStartChange(date) {
    this.setState({ startDate: date });
  }

  handleEndChange(date) {
    this.setState({ endDate: date });
  }

  createData(location, rating, content) {
    // id += 1;
    // return {
    //   id, location, rating, content,
    // };
  }

  render() {
    const {
      tab, data, startDate, endDate, filterBy, location, cohort, period,
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
            <LocationSettingsContainer>
              filterBy={filterBy}
              location={location}
              cohort={cohort}
            </LocationSettingsContainer>)
          }
          <div className="filterFormContainer">
            <FormControl component="fieldset" className="filterFormContainer">
              <FormLabel component="legend">Filter By</FormLabel>
              <RadioGroup
                aria-label="locationFilter"
                name="locationFilter"
                className="locationFilter"
                value={filterBy}
                onChange={this.handleFilterChange}
              >
                <FormControlLabel value="cohort" control={<Radio />} label="Cohort" />
                <FormControl>
                  <Select
                    multiple
                    value={cohort}
                    onChange={this.handleCohortChange}
                    input={<Input id="select-multiple-chip" />}
                    renderfilterBy={selected => (
                      <div className="locationSelection">
                        {selected.map(c => (
                          <Chip key={c} label={c} className="locationOption" />
                        ))}
                      </div>
                    )}
                    className="locationSelectionContainer"
                  >
                    {cohorts.map(c => (
                      <MenuItem key={c} value={c}>
                        {c}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControlLabel value="location" control={<Radio />} label="Location" />
                <FormControl>
                  <Select
                    multiple
                    value={location}
                    onChange={this.handleLocationChange}
                    input={<Input id="select-multiple-chip" />}
                    renderfilterBy={selected => (
                      <div className="locationSelection">
                        {selected.map(loc => (
                          <Chip key={loc} label={loc} className="locationOption" />
                        ))}
                      </div>
                    )}
                    className="locationSelectionContainer"
                  >
                    {locations.map(loc => (
                      <MenuItem key={loc} value={loc}>
                        {loc}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControlLabel value="none" control={<Radio />} label="No filter (all locations)" className="noneOption" />
              </RadioGroup>
            </FormControl>
          </div>
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
