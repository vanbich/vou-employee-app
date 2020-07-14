import React, { Component } from "react";

// Externals
import PropTypes from "prop-types";
import classNames from "classnames";

// Material helpers
import { withStyles } from "@material-ui/core";

// Material components
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider,DatePicker} from '@material-ui/pickers';
import Paper from "@material-ui/core/Paper";

// Material icons

// Shared components
import { SearchInput } from "../../../../components";

// Component styles
import styles from "./styles";

class UsersToolbar extends Component {
  render() {
    const { classes, className, date, onChangeDate } = this.props;

    const rootClassName = classNames(classes.root, className);

    return (
      <div className={rootClassName}>
        <div className={classes.row}>
          <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
          />
          <span className={classes.spacer} />
          <Paper component="form" className={classes.paper} variant="outlined">
            <MuiPickersUtilsProvider utils={MomentUtils} fullwidth>
              <DatePicker
                  width="100%"
                  disableToolbar
                  InputProps={{
                    disableUnderline: true
                  }}
                  format="DD/MM/YYYY"
                  className={classes.textfield}
                  value={date}
                  onChange={onChangeDate}
              />
            </MuiPickersUtilsProvider>
          </Paper>
        </div>
      </div>
    );
  }
}

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};

export default withStyles(styles)(UsersToolbar);
