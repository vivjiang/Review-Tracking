import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  card: {
    height: 200,
    width: 200,
  },

  root: {
    height: '100%',
    overflow: 'auto',
  },
};

let id = 0;
class RankingCard extends React.Component {
  constructor() {
    super();
    // const today = new Date();
    const end = new Date();

    const start = new Date();
    start.setDate(end.getDate() - 7);
    console.log('start.getMonth()', start.getMonth());
    const endString = `${end.getMonth() + 1}-${end.getDate()}-${end.getFullYear()}`;
    const startString = `${start.getMonth() + 1}-${start.getDate()}-${start.getFullYear()}`;
    this.state = {
      end: endString, start: startString, data: [],
    };
  }

  componentDidMount() {
    console.log('Review chart in component did mount');
    this.fetchReviewData();
  }

  async fetchReviewData() {
    console.log('in fetch review data');
    const { end, start } = this.state;
    await axios.get('http://localhost:9090/reviews/ranking', { params: { end, start } })
      .then((res) => {
        console.log(res.data.locationData);
        const reviews = [];
        for (let i = 0; i < Object.keys(res.data.locationData).length; i += 1) {
          const location = Object.keys(res.data.locationData)[i];
          const numTotal = res.data.locationData[Object.keys(res.data.locationData)[i]].NumTotal;
          const numNegative = res.data.locationData[Object.keys(res.data.locationData)[i]].NumNeg;
          const numPositive = res.data.locationData[Object.keys(res.data.locationData)[i]].NumPos;
          const percentPositive = `${Number((res.data.locationData[Object.keys(res.data.locationData)[i]].PercentPos * 100).toFixed(1))}%`;
          const percentNegative = `${Number((res.data.locationData[Object.keys(res.data.locationData)[i]].PercentNeg * 100).toFixed(1))}%`;
          reviews.push(this.createData(location, percentNegative, numNegative, percentPositive, numPositive, numTotal));
        }
        console.log('reviews', reviews);
        reviews.sort((a, b) => {
          return b.numNegative - a.numNegative;
        });
        this.setState({ data: reviews });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createData(location, percentNegative, numNegative, percentPositive, numPositive, numTotal) {
    id += 1;
    return {
      id, location, percentNegative, numNegative, percentPositive, numPositive, numTotal,
    };
  }

  render() {
    const { classes } = this.props;
    const { end, start, data } = this.state;
    return (
      <Card className="rankingCard">
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            Ranking as of
            {' '}
            {start}
            {' '}
            to
            {end}
          </Typography>
          <Paper className="rankingTableContainer">
            <Table className={classes.table} fixedHeader={false} style={{ width: 'auto', tableLayout: 'auto' }}>
              <TableHead>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell align="right">Number of Negative Reviews</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((n) => {
                  return (
                    <TableRow key={n.id}>
                      <TableCell component="th" scope="row">
                        {n.location}
                      </TableCell>
                      <TableCell align="right">{n.numNegative}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(RankingCard);
