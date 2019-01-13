import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TrendChartCard from './TrendChartCard';
// import SimpleTable from './SimpleTable';
import StatsCard from './StatsCard';
import RankingCard from './RankingCard';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    flexDirection: 'row',
  },
  tableContainer: {
    height: 320,
  },
  cardContainer: {
    height: 100,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

class Dashboard extends React.Component {
  state = {
    open: true,
  };

  componentDidMount() {
    console.log('Review chart in component did mount');
    // this.refreshData();
  }

  async refreshData() {
    console.log('in refresh data');
    await axios.get('http://localhost:9090/reviews/update')
      .then((res) => {
        console.log('refresh data response: ', res);
      })
      .catch((err) => {
        console.log('err');
      });
    // await axios.get('http://localhost:9090/google/refresh')
    //   .then((res) => {
    //     console.log('refresh data response: ', res);
    //   })
    //   .catch((err) => {
    //     console.log('err');
    //   });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div className="homePageContainer">
        <CssBaseline />
        <AppBar
          position="absolute"
          className="appbar"
        >
          <Toolbar disableGutters={!open} className={classes.toolbar}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              { 'Dashboard' }
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="dashboardContainer">
          <div className="cardChartContainer">
            <Typography component="div" className={classes.cardStatsContainer}>
              <StatsCard />
            </Typography>
            <div className="chartContainer">
              <TrendChartCard />
            </div>
          </div>
          <Typography component="div" className={classes.cardRankingContainer}>
            <RankingCard />
          </Typography>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default withStyles(styles)(Dashboard);
