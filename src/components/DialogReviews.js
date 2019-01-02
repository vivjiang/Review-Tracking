import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
  root: {
    width: 700,
  },
  // table: {
  //   minWidth: 700,
  // },
};


let id = 0;

class DialogReviews extends React.Component {
  constructor() {
    super();
    this.state = { data: [] };
  }

  componentDidMount() {
    console.log('in component did mount');
    const { reviews } = this.props;
    console.log('reviews prop', reviews);
    const reviewsReformat = [];
    for (let i = 0; i < reviews.length; i += 1) {
      console.log(reviews[i].Location);
      const location = reviews[i].Location;
      const rating = reviews[i].Rating;
      const content = reviews[i].Content;
      reviewsReformat.push(this.createData(location, rating, content));
    }
    console.log('reviews', reviewsReformat);
    this.setState({ data: reviewsReformat });
  }

  createData(location, rating, content) {
    id += 1;
    return {
      id, location, rating, content,
    };
  }

  render() {
    const { classes } = this.props;
    const { data } = this.state;
    console.log('this.state.data', data);
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} fixedHeader={false} style={{ width: '700px', tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell align="left">Rating</TableCell>
              <TableCell align="right">Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((n) => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.location}
                  </TableCell>
                  <TableCell align="right">{n.rating}</TableCell>
                  <TableCell align="right">{n.content}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

DialogReviews.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(DialogReviews);
