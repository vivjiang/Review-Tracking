import React from 'react';
import axios from 'axios';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogSettings from './DialogSettings';

const colors = [
  'red', 'green', 'blue', 'purple',
];

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

class TrendChartCard extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [], settingsOpen: false, filterBy: 'cohort', locationsChecked: [], cohortsChecked: [], cohort: ['Retrial'], lineColors: [], filter: ['Retrial'],
    };
    this.fetchChartDataLocation = this.fetchChartDataLocation.bind(this);
    this.fetchChartDataCohort = this.fetchChartDataCohort.bind(this);
  }

  componentDidMount() {
    console.log('Review chart in component did mount');
    const { filter, locationsChecked, cohortsChecked } = this.state;
    let l = 0;
    while (l < locations.length) {
      locationsChecked[locations[l]] = false;
      l += 1;
    }

    let c = 0;
    while (c < cohorts.length) {
      cohortsChecked[cohorts[c]] = false;
      c += 1;
    }

    this.fetchChartDataCohort(filter);
  }

  handleSettingsOpen = () => {
    this.setState({ settingsOpen: true });
  }

  handleSettingsApply = (filterBy, filter) => {
    console.log('handleSettingsClose', filter);
    if (filterBy === 'cohort') {
      console.log('settings close filter', filter);
      this.setState({
        settingsOpen: false, filterBy: 'cohort', cohortsChecked: filter, filter,
      });
    } else if (filterBy === 'location') {
      this.setState({
        settingsOpen: false, filterBy: 'location', locationsChecked: filter, filter,
      });
    }
  }

  handleSettingsCancel = () => {
    console.log('trend chart handle settings cancel');
    this.setState({ settingsOpen: false });
  }

  async fetchChartDataLocation(locationFilterBy) {
    await axios.get('http://localhost:9090/reviews/graph/location', { params: { locationFilterBy } })
      .then((res) => {
        console.log(res);
        // console.log('chart data fetched', res.data.locationData);
        const data = res.data.locationData;
        const locs = Object.keys(data);
        console.log('fetchChartData locs', locs);
        const graphData = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 0; i < months.length; i += 1) {
          const monthYear = `${months[i]}-18`;
          let l = 0;
          const cNegPercentData = {};
          const cPosPercentData = {};
          while (l < locs.length) {
            const locationData = data[locs[l]];
            // console.log('locationData', locationData);
            const dates = Object.keys(locationData);
            const cNeg = locationData[dates[i]].CumulativeNeg;
            const cPos = locationData[dates[i]].CumulativePos;
            const cTot = locationData[dates[i]].CumulativeTotal;
            cNegPercentData[locs[l]] = Number(((cNeg / cTot) * 100).toFixed(1)); //  `${Number((res.data[dates[i]].CumulativePercentNeg * 100).toFixed(1))}%`;
            cPosPercentData[locs[l]] = Number(((cPos / cTot) * 100).toFixed(1));
            l += 1;
          }
          console.log(this.createData(monthYear, cNegPercentData, cPosPercentData).data);
          graphData.push(this.createData(monthYear, cNegPercentData, cPosPercentData).data);
        }
        // console.log('graphData', Object.keys(graphData[0]));

        this.setState({ data: graphData });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  async fetchChartDataCohort(cohortFilter) {
    console.log('in fetch cohort data');
    await axios.get('http://localhost:9090/reviews/graph/cohort', { params: { cohortFilter } })
      .then((res) => {
        console.log(res);
        // console.log('chart cohort data fetched', res.data);
        const data = res.data.cohortData;
        const locs = Object.keys(data);
        const graphData = [];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 0; i < months.length; i += 1) {
          const monthYear = `${months[i]}-18`;
          let l = 0;
          const cNegPercentData = {};
          const cPosPercentData = {};
          while (l < locs.length) {
            const cohortData = data[locs[l]];
            const dates = Object.keys(cohortData);
            const cNeg = cohortData[dates[i]].CumulativeNeg;
            const cPos = cohortData[dates[i]].CumulativePos;
            const cTot = cohortData[dates[i]].CumulativeTotal;
            cNegPercentData[locs[l]] = Number(((cNeg / cTot) * 100).toFixed(1)); //  `${Number((res.data[dates[i]].CumulativePercentNeg * 100).toFixed(1))}%`;
            cPosPercentData[locs[l]] = Number(((cPos / cTot) * 100).toFixed(1));
            l += 1;
          }
          // console.log(this.createData(monthYear, cNegPercentData, cPosPercentData).data);
          graphData.push(this.createData(monthYear, cNegPercentData, cPosPercentData).data);
        }


        this.setState({ data: graphData });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createData(period, cNegPercentData, cPosPercentData) {
    const { filter } = this.state;
    console.log('create data', filter);
    const data = { date: period };
    const lineColors = {};

    for (let l = 0; l < filter.length; l += 1) {
      data[`${filter[l]}`] = cNegPercentData[filter[l]];
      lineColors[`${filter[l]}`] = colors[l];
    }

    this.setState({ lineColors });
    return {
      data,
    };
  }


  render() {
    console.log('trendchartcard render', this.state);
    const {
      data, settingsOpen, filterBy, locationsChecked, cohortsChecked, cohort, filter, lineColors,
    } = this.state;
    return (
    // 99% per https://github.com/recharts/recharts/issues/172
      <Card className="chartCard">
        <div className="chartSettings">
          <Typography variant="h5">
            { 'Trend Over Time '}
          </Typography>
          <IconButton
            onClick={this.handleSettingsOpen}
            aria-label="Settings"
          >
            <SettingsIcon />
          </IconButton>
          <Dialog open={settingsOpen} scroll="paper" maxWidth="md" maxHeight="md">
            <DialogTitle>Chart Settings</DialogTitle>
            <DialogContent>
              <DialogSettings filterBy={filterBy}
                filter={filter}
                locationsChecked={locationsChecked}
                cohortsChecked={cohortsChecked}
                cohort={cohort}
                handleSettingsApply={this.handleSettingsApply}
                handleSettingsCancel={this.handleSettingsCancel}
                fetchChartDataLocation={this.fetchChartDataLocation}
                fetchChartDataCohort={this.fetchChartDataCohort}
              />
            </DialogContent>
          </Dialog>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis domain={[9, 27]} padding={{ left: 0, right: 0 }} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            {filter.map((k) => {
              // console.log('k', k);
              return (
                <Line type="monotone" dataKey={k} stroke={lineColors[k]} width="10" />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </Card>
    );
  }
}

export default TrendChartCard;
