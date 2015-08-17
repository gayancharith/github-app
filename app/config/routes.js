import React from 'react';
import Main from '../components/Main';
import Home from '../components/Home';
import Profile from '../components/Profile';

import {Router, DefaultRoute, Route} from 'react-router';
// var Router = require('react-router');
// var DefaultRoute = Router.DefaultRoute;
// var Route = Router.Route;

export default (
	<Route name="app" path="/" handler={Main}>
		<DefaultRoute handler={Home} />
		<Route name="profile" path="profile/:username" handler={Profile} />
	</Route>
);
