import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index.jsx';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render () {
        console.log('=======> logout');
        return <Redirect  to="login" />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(Logout);