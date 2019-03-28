import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

export default class PrivateRoute extends Component {
    render() {
        const { component: Component, ...rest } = this.props;

        return (
            <Route {...rest} render={(props) => (
                localStorage.getItem("token") !== null
                    ? <Component {...props} />
                    : <Redirect to='/login' />
            )} />
        )
    }
}