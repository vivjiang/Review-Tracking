import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: '50%',
  },
  table: {
    minWidth: 300,
  },
};


let id = 0;

class ReviewTable extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
    this.fetchAllReviews = this.fetchAllReviews.bind(this);
  }

  componentDidMount() {
    console.log('in component did mount');
    this.fetchAllReviews();
  }

  async fetchAllReviews() {
    console.log('in create data');
    await axios.get('http://localhost:9090/reviews/table/all')
      .then((res) => {
        console.log(res);
        console.log('data fetched', res.data);
        const reviews = [];
        for (let i = 0; i < Object.keys(res.data).length; i += 1) {
          const location = Object.keys(res.data)[i];
          const numTotal = res.data[Object.keys(res.data)[i]].NumTotal;
          const numNegative = res.data[Object.keys(res.data)[i]].NumNeg;
          const numPositive = res.data[Object.keys(res.data)[i]].NumPos;
          const percentPositive = `${Number((res.data[Object.keys(res.data)[i]].PercentPos * 100).toFixed(1))}%`;
          const percentNegative = `${Number((res.data[Object.keys(res.data)[i]].PercentNeg * 100).toFixed(1))}%`;
          reviews.push(this.createData(location, percentNegative, numNegative, percentPositive, numPositive, numTotal));
        }
        console.log('reviews', reviews);
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
    const { data } = this.state;
    console.log('this.state.data', data);
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} fixedHeader={false} style={{ width: 'auto', tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell align="left">Percent of Negative Reviews</TableCell>
              <TableCell align="right">Number of Negative Reviews</TableCell>
              <TableCell align="right">Percent of Positive Reviews</TableCell>
              <TableCell align="right">Number of Positive Reviews</TableCell>
              <TableCell align="right">Number of Total Reviews</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((n) => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.location}
                  </TableCell>
                  <TableCell align="right">{n.percentNegative}</TableCell>
                  <TableCell align="right">{n.numNegative}</TableCell>
                  <TableCell align="right">{n.percentPositive}</TableCell>
                  <TableCell align="right">{n.numPositive}</TableCell>
                  <TableCell align="right">{n.numTotal}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

ReviewTable.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(ReviewTable);
