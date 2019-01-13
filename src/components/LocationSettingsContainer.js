import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Typography from '@material-ui/core/Typography';


const styles = {
  root: {
    width: 700,
  },
  // table: {
  //   minWidth: 700,
  // },
};

class LocationSettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohortPanelOpen: false, locationPanelOpen: false,
    };
  }


  componentDidMount() {
    console.log('in location settings component did mount', this.props);
  }

  handleFilterChange = (event) => {
    const { handleFilterChange } = this.props;
    if (event.target.value !== undefined) {
      handleFilterChange(event.target.value);
    }
  }

  handleLocationsChange = loc => (event) => {
    console.log('handleLocationsChange', event);
    const { locationsChecked, handleLocationsChange } = this.props;
    locationsChecked[loc] = event.target.checked;
    handleLocationsChange(locationsChecked);
  }

  handleCohortsChange = cohort => (event) => {
    console.log('LocationSettingsContainer handleCohortsChange', event.target.checked);
    const { cohortsChecked, handleCohortsChange } = this.props;
    cohortsChecked[cohort] = event.target.checked;
    handleCohortsChange(cohortsChecked);
  }

  render() {
    const {
      cohortPanelOpen, locationPanelOpen,
    } = this.state;
    const {
      filterBy, locationsChecked, cohortsChecked, locations, cohorts,
    } = this.props;
    console.log('location settings container render props', this.props);
    return (
      <div className="locationSettingsContainer">
        <Typography>
          Filter By
        </Typography>
        <div className="expandContainers">
          <ExpansionPanel expanded={cohortPanelOpen} className="expandPanel">
            <ExpansionPanelSummary
              expandIcon={(
                <ExpandMoreIcon onClick={() => {
                  console.log('icon clicked');
                  if (cohortPanelOpen) {
                    this.setState({
                      cohortPanelOpen: !cohortPanelOpen,
                    });
                  } else {
                    this.setState({
                      cohortPanelOpen: !cohortPanelOpen, locationPanelOpen: false,
                    });
                  }
                }}
                />
              )}
            >
              <div className="cohortPanel">
                <Radio
                  checked={filterBy === 'cohort'}
                  onChange={this.handleFilterChange}
                  value="cohort"
                  name="cohort-filter"
                  aria-label="A"
                />
                Cohort:
                {cohorts.map((c) => {
                  if (cohortsChecked[c]) {
                    return (
                      <Typography> {'   '}{c}{','} </Typography>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className="cohortOptions">
              <FormControl component="fieldset">
                <FormGroup>
                  <GridList cellHeight={50} cols={1} className="locationOptions">
                    {cohorts.map((c) => {
                      return (
                        <GridListTile key={c} cols={1}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={cohortsChecked[c]} onChange={this.handleCohortsChange(c)} value={c} />
                            }
                            label={c}
                            style={{ marginLeft: 10 }}
                          />
                        </GridListTile>
                      );
                    })}
                  </GridList>
                </FormGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel expanded={locationPanelOpen} className="expandPanel">
            <ExpansionPanelSummary
              expandIcon={(
                <ExpandMoreIcon onClick={() => {
                  console.log('icon clicked');
                  if (locationPanelOpen) {
                    this.setState({
                      locationPanelOpen: !locationPanelOpen,
                    });
                  } else {
                    this.setState({
                      locationPanelOpen: !locationPanelOpen,
                      cohortPanelOpen: false,
                    });
                  }
                }}
                />
              )}
            >
              <div className="locationPanel">
                <Radio
                  checked={filterBy === 'location'}
                  onChange={this.handleFilterChange}
                  value="location"
                  name="location-filter"
                  aria-label="B"
                />
                Location(s):
                {locations.map((l) => {
                  if (locationsChecked[l]) {
                    return (
                      <Typography> {'   '}{l}{','} </Typography>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <FormControl component="fieldset">
                <FormGroup>
                  <GridList cellHeight={50} cols={3} className="locationOptions">
                    {locations.map((l) => {
                      return (
                        <GridListTile key={l} cols={1}>
                          <FormControlLabel
                            control={
                              <Checkbox checked={locationsChecked[l]} onChange={this.handleLocationsChange(l)} value={l} />
                            }
                            label={l}
                            style={{ marginLeft: 10 }}
                          />
                        </GridListTile>
                      );
                    })}
                  </GridList>
                </FormGroup>
              </FormControl>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Paper className="nonePanel">
            <Radio
              checked={filterBy === 'none'}
              onChange={this.handleFilterChange}
              value="none"
              name="no-filter"
              aria-label="B"
              style={{ marginLeft: 23 }}
            />
            <Typography>
              None
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(LocationSettingsContainer);
