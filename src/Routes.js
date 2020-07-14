import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';
import UserList from './pages/UserList'

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route
                    component={SignIn}
                    exact
                    path="/sign-in"
                />
                <Route
                    component={NotFound}
                    exact
                    path="/not-found"
                />
                <Route
                    component={UserList}
                    exact
                    path="/"
                />

                <Redirect to="/not-found" />
            </Switch>
        );
    }
}
