import React from 'react';
import DatePicker from 'react-datepicker';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import 'react-datepicker/dist/react-datepicker.css';

const styles = {
  root: {
    width: 700,
  },
  // table: {
  //   minWidth: 700,
  // },
};

class DateSettingsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date(), endDate: new Date(), period: 'month',
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }


  componentDidMount() {
    console.log('in date settings component did mount', this.props);
    const { startDate, endDate, period } = this.props;
    this.setState({ startDate, endDate, period });
  }

  handleStartChange(date) {
    this.setState({ startDate: date });
  }

  handleEndChange(date) {
    this.setState({ endDate: date });
  }

  render() {
    const {
      startDate, endDate, period,
    } = this.state;
    console.log(period);
    return (
      <div className="datePickerContainer">
        <div className="startDatePickerContainer">
          <Typography gutterBottom variant="h6" component="h2">
            From
          </Typography>
          <DatePicker className="chartDatePicker"
            selected={startDate}
            onChange={this.handleStartChange}
          />
        </div>
        <div className="endDatePickerContainer">
          <Typography gutterBottom variant="h6" component="h2">
            To
          </Typography>
          <DatePicker className="chartDatePicker"
            selected={endDate}
            onChange={this.handleEndChange}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DateSettingsContainer);
