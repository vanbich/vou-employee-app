import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import { CircularProgress, Typography } from "@material-ui/core";

// Shared layouts
import { Dashboard as DashboardLayout } from "../../layouts";

// Shared services
import { getUsers } from "../../services/user";

// Custom components
import { UsersToolbar, UsersTable } from "./components";

// Component styles
import styles from "./style";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

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
        //
        onSelect={this.handleSelect}
        users={users}
      />
    );
  }

  render() {
    const { classes } = this.props;
    const { date } = this.state;

    return (
      <DashboardLayout title="Users">
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ backgroundColor: "#ffc5bd" }}
        >
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <Typography
              style={{
                fontFamily: "Pacifico",
                fontSize: "30px",
                color: "white"
              }}
            >
              Who's winner?
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Box display="flex" justifyContent="center" m={1} p={1}>
              <img
                alt="Brainalytica logo"
                src="/images/banners/promotion.png"
              />
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
