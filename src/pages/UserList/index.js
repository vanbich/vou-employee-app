import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { CircularProgress, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Shared services
import { getUsers } from "../../services/user";

// Custom components
import { UsersToolbar, UsersTable } from "./components";

// Component styles
import styles from "./style";

class UserList extends Component {
  signal = true;

  state = {
    isLoading: false,
    limit: 10,
    users: [],
    error: null,
    date: new Date()
  };

  async getUsers() {
    try {
      this.setState({ isLoading: true });

      const { limit } = this.state;

      const { users } = await getUsers(limit);

      if (this.signal) {
        this.setState({
          isLoading: false,
          users
        });
      }
    } catch (error) {
      if (this.signal) {
        this.setState({
          isLoading: false,
          error
        });
      }
    }
  }

  componentDidMount() {
    this.signal = true;
    this.getUsers();
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleChangeDate = date => {
    this.setState({
      date: date._d
    });
  };

  renderUsers() {
    const { classes } = this.props;
    const { isLoading, users, error } = this.state;

    if (isLoading) {
      return (
        <div className={classes.progressWrapper}>
          <CircularProgress />
        </div>
      );
    }

    if (error) {
      return <Typography variant="h6">{error}</Typography>;
    }

    if (users.length === 0) {
      return <Typography variant="h6">There are no users</Typography>;
    }

    return (
      <UsersTable
        users={users}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { date } = this.state;

    return (
      <DashboardLayout title="Leaderboard">
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          style={{ backgroundColor: "#ffc5bd", maxHeight: 350}}
        >
          <Grid item>
            <Typography
                variant="h2"
              style={{
                fontFamily: "Pacifico",
                color: "white"
              }}
            >
              Leaderboard
            </Typography>
          </Grid>
          <Grid item>
            <Box display="flex" justifyContent="center">
              <img
                alt="Brainalytica logo"
                src="/images/banners/promotion.png"
              style={{
                maxWidth: "80%",
                maxHeight: "80%",
              }}/>
            </Box>
          </Grid>
        </Grid>

        <div className={classes.root}>
          <UsersToolbar date={date} onChangeDate={this.handleChangeDate} />
          <div className={classes.content}>{this.renderUsers()}</div>
        </div>
      </DashboardLayout>
    );
  }
}

UserList.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserList);
