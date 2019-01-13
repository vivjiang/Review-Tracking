import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import DialogReviews from './DialogReviews';

const styles = {
  card: {
    height: 200,
    width: 200,
  },
};

// function getModalStyle() {
//   return {
//     top: '30%',
//     left: '10%',
//   };
// }

class StatsCard extends React.Component {
  constructor() {
    super();

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    console.log('today', today);
    let month = `${yesterday.getMonth() + 1}`;
    let day = `${yesterday.getDate()}`;
    if (month.length < 2) {
      month = `0${month}`;
      console.log(month);
    }
    if (day.length < 2) day = `0${day}`;
    const dateString = `${yesterday.getFullYear()}-${month}-${day}`;

    this.state = {
      day: dateString, stats: {}, reviews: {}, positiveOpen: false, negativeOpen: false, neutralOpen: false,
    };
    this.displayData = this.displayData.bind(this);
  }

  componentDidMount() {
    console.log('Stats card in component did mount');
    this.displayData();
  }

  handlePositiveOpen = () => {
    this.setState({ positiveOpen: true });
  }

  handleNegativeOpen = () => {
    this.setState({ negativeOpen: true });
  }

  handleNeutralOpen = () => {
    this.setState({ neutralOpen: true });
  }

  handlePositiveClose = () => {
    this.setState({ positiveOpen: false });
  }

  handleNegativeClose = () => {
    this.setState({ negativeOpen: false });
  }

  handleNeutralClose = () => {
    this.setState({ neutralOpen: false });
  }

  async displayData() {
    const { day } = this.state;
    console.log('in create data', day);
    await axios.get('http://localhost:9090/reviews/update', { params: { day } })
      .then((res) => {
        console.log('refresh data response: ', res.data);
        this.setState({ stats: res.data.stats, reviews: res.data.reviews });
      })
      .catch((err) => {
        console.log('err');
      });
  }


  render() {
    const {
      day, stats, positiveOpen, negativeOpen, neutralOpen, reviews,
    } = this.state;
    return (
      <Card className="statsCard">
        <CardContent className="cardContent">
          <Typography gutterBottom variant="h5" component="h2">
            Stats for
            {' '}
            {day}
          </Typography>
          <Typography>
            {stats.Total}
            {' '}
            Total Reviews
          </Typography>
          <div className="pieChartsContainer">
            <div className="pieChartContainer">
              <Button onClick={this.handlePositiveOpen}>
                {stats.NumPos}
                {' '}
                 Positive
              </Button>
              <Dialog open={positiveOpen} onClose={this.handlePositiveClose} scroll="paper" maxWidth="md">
                <DialogTitle>Positive Reviews</DialogTitle>
                <DialogContent>
                  <DialogReviews reviews={reviews.Positive} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="pieChartContainer">
              <Button onClick={this.handleNegativeOpen}>
                {stats.NumNeg}
                {' '}
                 Negative
              </Button>
              <Dialog open={negativeOpen} onClose={this.handleNegativeClose} scroll="paper" maxWidth="md">
                <DialogTitle>Negative Reviews</DialogTitle>
                <DialogContent>
                  <DialogReviews reviews={reviews.Negative} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="pieChartContainer">
              <Button onClick={this.handleNeutralOpen}>
                {stats.NumNeutral}
                {' '}
                 Neutral
              </Button>
              <Dialog open={neutralOpen} onClose={this.handleNeutralClose} scroll="paper" maxWidth="md">
                <DialogTitle>Neutral Reviews</DialogTitle>
                <DialogContent>
                  <DialogReviews reviews={reviews.Neutral} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(StatsCard);
