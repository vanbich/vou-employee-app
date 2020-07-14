import React, { Component, Fragment } from 'react';

// Externals
import compose from 'recompose/compose';
import PropTypes from 'prop-types';

// Material helpers
import { withStyles, withWidth } from '@material-ui/core';


// Custom components
import {  Topbar} from './components';

// Component styles
import styles from './styles';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        const isMobile = ['xs', 'sm', 'md'].includes(props.width);

        this.state = {
            isOpen: !isMobile
        };
    }


    render() {
        const { children } = this.props;

        return (
            <Fragment>
                <Topbar/>
                <main>
                    {children}
                    {/*<Footer />*/}
                </main>
            </Fragment>
        );
    }
}

Dashboard.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    width: PropTypes.string.isRequired
};

export default compose(
    withStyles(styles),
    withWidth()
)(Dashboard);
