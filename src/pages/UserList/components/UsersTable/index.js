import React, { Component } from "react";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";

// Material helpers
import { withStyles, Button } from "@material-ui/core";

// Material components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from "@material-ui/core";

// Shared components
import { Portlet, PortletContent } from "../../../../components";

// Component styles
import styles from "./styles";

class UsersTable extends Component {
  state = {
    selectedUsers: [],
    rowsPerPage: 10,
    page: 0
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes, className, users } = this.props;
    const { activeTab, rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">#Top</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Game</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter(user => {
                    if (activeTab === 1) {
                      return !user.returning;
                    }

                    if (activeTab === 2) {
                      return user.returning;
                    }

                    return user;
                  })
                  .slice(0, rowsPerPage)
                  .map((user, index) => (
                    <TableRow
                      key={index}
                      className={classes.tableRow}
                      hover
                    >
                      <TableCell className={classes.tableCell} align="center">
                        <Button
                          className={classes.button}
                          style={
                            user.top === "1"
                              ? { backgroundColor: "#e3c62a" }
                              : user.top === "2"
                              ? { backgroundColor: "#a2a595" }
                              : user.top === "3"
                              ? { backgroundColor: "#e0a96d" }
                              : { backgroundColor: "#85e6f6" }
                          }
                        >
                          {user.top}
                        </Button>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                        <Typography
                            className={classes.nameText}
                            variant="body1"
                        >
                          {user.name}
                        </Typography>
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                        {user.voucher}
                      </TableCell>
                      <TableCell className={classes.tableCell}  align="center">
                        {user.score}
                      </TableCell>
                      <TableCell className={classes.tableCell} align="center">
                        {moment(user.createdAt).format("DD/MM/YYYY")}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </PerfectScrollbar>
          <TablePagination
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            component="div"
            count={users.length}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

UsersTable.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onShowDetails: PropTypes.func,
  users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  users: [],
  onSelect: () => {},
  onShowDetails: () => {}
};

export default withStyles(styles)(UsersTable);
