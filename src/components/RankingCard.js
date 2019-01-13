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
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from './TablePaginationActions';


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
    let endMonth = `${end.getMonth() + 1}`;
    let endDay = `${end.getDate()}`;
    if (endMonth.length < 2) endMonth = `0${endMonth}`;
    if (endDay.length < 2) endDay = `0${endDay}`;

    const start = new Date();
    start.setDate(end.getDate() - 7);
    let startMonth = `${start.getMonth() + 1}`;
    let startDay = `${start.getDate()}`;
    if (startMonth.length < 2) startMonth = `0${startMonth}`;
    if (startDay.length < 2) startDay = `0${startDay}`;


    const endString = `${end.getFullYear()}-${endMonth}-${endDay}`;
    const startString = `${start.getFullYear()}-${startMonth}-${startDay}`;
    this.state = {
      end: endString, start: startString, data: [], page: 0, rowsPerPage: 12,
    };
  }

  componentDidMount() {
    console.log('Review chart in component did mount');
    this.fetchReviewData();
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
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

          let percentPositive = (numPositive / numTotal) * 100;
          let percentNegative = (numNegative / numTotal) * 100;

          percentPositive = `${(Number(percentPositive).toFixed(1))}%`;
          percentNegative = `${(Number(percentNegative).toFixed(1))}%`;
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
    const {
      end, start, data, rowsPerPage, page,
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    return (
      <Card className="rankingCard">
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            Ranking as of
            {' '}
            {start}
            {' '}
            to
            {' '}
            {end}
          </Typography>
          <Paper className="rankingTableContainer">
            <div className="rankingTableWrapper">
              <Table className="rankingTable" fixedHeader={false} style={{ width: 'auto', tableLayout: 'auto' }}>
                <colgroup>
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ width: '30%' }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell className="locationColumn">Location</TableCell>
                    <TableCell>Number of Negative Reviews</TableCell>
                    <TableCell align="center">% of Total Reviews</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((n) => {
                    return (
                      <TableRow key={n.id}>
                        <TableCell component="th" scope="row">
                          {n.location}
                        </TableCell>
                        <TableCell align="center">{n.numNegative}</TableCell>
                        <TableCell align="center">{n.percentNegative}</TableCell>
                      </TableRow>
                    );
                  })}
                  { emptyRows > 0 && (
                    <TableRow style={{ height: 48 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[13]}
                      colSpan={3}
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true,
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </Paper>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(RankingCard);
