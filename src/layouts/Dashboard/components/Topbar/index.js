import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

// Externals
import classNames from "classnames";
import compose from "recompose/compose";
import PropTypes from "prop-types";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  IconButton,
  Toolbar,
  Typography,
  Grid
} from "@material-ui/core";

// Material icons
import { Input as InputIcon } from "@material-ui/icons";

// Component styles
import styles from "./styles";

class Topbar extends Component {
  signal = true;

  componentDidMount() {
    this.signal = true;
  }

  componentWillUnmount() {
    this.signal = false;
  }

  handleSignOut = () => {
    const { history } = this.props;

    localStorage.setItem("isAuthenticated", false);
    history.push("/sign-in");
  };

  render() {
    const { classes, className } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <Fragment>
        <div className={rootClassName}>
          <Toolbar className={classes.toolbar}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                >
                  <Link className={classes.logoLink} to="/">
                    <img
                      alt="vou logo"
                      className={classes.logoImage}
                      src="/images/logos/vou-50px.png"
                    />
                  </Link>
                  <Typography
                    variant="h1"
                    style={{
                      marginTop: "10px",
                      marginLeft: "10px",
                      fontFamily: "Francisco",
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#ffa8a4"
                    }}
                  >
                    Vou
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <IconButton
                  className={classes.signOutButton}
                  onClick={this.handleSignOut}
                >
                  <InputIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </div>
      </Fragment>
    );
  }
}

Topbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isSidebarOpen: PropTypes.bool,
  onToggleSidebar: PropTypes.func,
  title: PropTypes.string
};

Topbar.defaultProps = {
  onToggleSidebar: () => {}
};

export default compose(
  withRouter,
  withStyles(styles)
)(Topbar);
