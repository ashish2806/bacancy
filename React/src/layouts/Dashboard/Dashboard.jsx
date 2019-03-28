/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Address from "components/Auth/Address.jsx";
import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import * as actions from '../../store/actions/index.jsx';

import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

import PrivateRoute from "../../components/PrivateRoute";

const switchRoutes = (
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <PrivateRoute path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    
    this.props.onTryAutoSignup();

    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    console.log("rest: ", rest)
    console.log('isAuthenticated ========> ' + this.props.isAuthenticated);

    let sidebarLayout = null;
    let headerLayout = null;
    let mainPanelLayout = null;
    let footerLayout = null;

    if (this.props.isAuthenticated) {
      console.log('isAuthenticated ========> 1');
      sidebarLayout = (
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Creative Tim"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
      );

      headerLayout = (
        <Header
          routes={dashboardRoutes}
          handleDrawerToggle={this.handleDrawerToggle}
          {...rest}
        />
      );

      mainPanelLayout = (
        <div className={classes.mainPanel} ref="mainPanel">
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
              <div className={classes.map}>{switchRoutes}</div>
            )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      );

    } else {
      console.log('=====> 1');

      mainPanelLayout = (
        <div className={classes.mainPanel} ref="mainPanel">
          <Redirect to='/login' />
        </div>
      );
    }
    console.log('isAuthenticated ========> 2');
    return (
      <div className={classes.wrapper}>
        {sidebarLayout}
        {headerLayout}
        {mainPanelLayout}
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(App)));