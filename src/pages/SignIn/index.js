import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

// Externals
import PropTypes from "prop-types";
import compose from "recompose/compose";
import validate from "validate.js";
import _ from "underscore";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import {
  Grid,
  Button,
  CircularProgress,
  TextField,
  Typography,
  Card
} from "@material-ui/core";

// Component styles
import styles from "./styles";
import "../../App.css";

// Form validation schema
import schema from "./schema";

// Service methods
const signIn = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 1500);
  });
};

class SignIn extends Component {
  state = {
    values: {
      email: "",
      password: ""
    },
    touched: {
      email: false,
      password: false
    },
    errors: {
      email: null,
      password: null
    },
    isValid: false,
    isLoading: false,
    submitError: null
  };

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  validateForm = _.debounce(() => {
    const { values } = this.state;

    const newState = { ...this.state };
    const errors = validate(values, schema);

    newState.errors = errors || {};
    newState.isValid = errors ? false : true;

    this.setState(newState);
  }, 300);

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm);
  };

  handleSignIn = async () => {
    try {
      const { history } = this.props;
      const { values } = this.state;

      this.setState({ isLoading: true });

      await signIn(values.email, values.password);

      localStorage.setItem("isAuthenticated", true);

      history.push("/");
    } catch (error) {
      this.setState({
        isLoading: false,
        serviceError: error
      });
    }
  };

  render() {
    const { classes } = this.props;
    const {
      values,
      touched,
      errors,
      isValid,
      submitError,
      isLoading
    } = this.state;

    const showEmailError = touched.email && errors.email;
    const showPasswordError = touched.password && errors.password;

    return (
      <div>
        <Card className={classes.root}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid
              item
              lg={6}
              style={{
                textAlign: "center",
                backgroundColor: "rgba(255,169,166,0.56)",
                paddingTop: "100px",
                paddingBottom: "100px"
              }}
            >
              <Typography variant="h2" className={classes.subtitle}>
                I'm glad to see you everyday
              </Typography>
              <img alt="sign-in" src="/images/banners/login.png" />
            </Grid>
            <Grid
              item
              lg={6}
              style={{
                textAlign: "center",
                paddingTop: "50px",
                paddingBottom: "50px"
              }}
            >
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item lg={6} className={classes.title}>
                  <img alt="Vou" src="/images/logos/vou-50px.png" />
                </Grid>
                <Grid item lg={6} className={classes.fields}>
                  <TextField
                    className={classes.textField}
                    label="Email address"
                    name="email"
                    onChange={event =>
                      this.handleFieldChange("email", event.target.value)
                    }
                    type="text"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={6} className={classes.fields}>
                  {showEmailError && (
                    <Typography className={classes.fieldError} variant="body2">
                      {errors.email[0]}
                    </Typography>
                  )}
                </Grid>
                <Grid item lg={6} className={classes.fields}>
                  <TextField
                    className={classes.textField}
                    label="Password"
                    name="password"
                    onChange={event =>
                      this.handleFieldChange("password", event.target.value)
                    }
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                </Grid>
                <Grid item lg={6} className={classes.fields}>
                  {showPasswordError && (
                    <Typography className={classes.fieldError} variant="body2">
                      {errors.password[0]}
                    </Typography>
                  )}
                </Grid>
                {submitError && (
                  <Typography className={classes.submitError} variant="body2">
                    {submitError}
                  </Typography>
                )}
                <Grid item lg={6} className={classes.forgot}>
                  <Link className={classes.forgot} to="/">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item lg={6} className={classes.fields}>
                  {isLoading ? (
                    <CircularProgress className={classes.progress} />
                  ) : (
                    <Button
                      className={classes.signInButton}
                      disabled={!isValid}
                      onClick={this.handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      Sign In
                    </Button>
                  )}
                </Grid>
                <Grid item lg={6} className={classes.fields}>
                  <Typography className={classes.signUp} variant="body1">
                    Don't have an account?{" "}
                    <Link className={classes.signUpUrl} to="/sign-up">
                      Sign up
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </div>
    );
  }
}

SignIn.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(SignIn);
