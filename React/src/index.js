import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { BrowserRouter } from 'react-router-dom';

import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import authReducer from './store/reducers/auth.jsx';
import Login from "components/Auth/Auth.jsx";
import Logout from "components/Auth/Logout/Logout.jsx";
import Address from "components/Auth/Address.jsx";

import CreateUser from 'components/Auth/CreateUser.jsx';

import "assets/css/material-dashboard-react.css?v=1.5.0";
import indexRoutes from "routes/index.jsx";

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const hist = createBrowserHistory();

const rootReducer = combineReducers({
	auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
	applyMiddleware(thunk)
));



ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<Router history={hist}>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/createuser" component={CreateUser} />
					<Route path="/address" component={Address} />
					<Route path="/logout" component={Logout} />
					{indexRoutes.map((prop, key) => {
						
						return <Route path={prop.path} component={prop.component} key={key} />;
					})}
				</Switch>
			</Router>
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);
