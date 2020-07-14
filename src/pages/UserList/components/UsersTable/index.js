import React, { Component } from "react";
import { Link } from "react-router-dom";

// Externals
import classNames from "classnames";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";

// Material helpers
import { withStyles, Button } from "@material-ui/core";

// Material components
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from "@material-ui/core";

// Shared helpers
import { getInitials } from "../../../../helpers";

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
    const { activeTab, selectedUsers, rowsPerPage, page } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <PerfectScrollbar>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">#Top</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Voucher</TableCell>
                  <TableCell align="left">Score</TableCell>
                  <TableCell align="left">Time</TableCell>
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
                      selected={selectedUsers.indexOf(user.id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
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
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Avatar
                            className={classes.avatar}
                            src={user.avatarUrl}
                          >
                            {getInitials(user.name)}
                          </Avatar>
                          <Link to="#">
                            <Typography
                              className={classes.nameText}
                              variant="body1"
                            >
                              {user.name}
                            </Typography>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.voucher}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {user.score}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
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
