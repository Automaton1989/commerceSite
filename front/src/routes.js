import React from "react";
import { Route, IndexRoute } from "react-router";

import App from "./components/App";
import Login from "./components/login";
import Main from "./components/main";
import Product from "./components/SingleProduct"

export default (
	<Route exact path = {"/"} component={Main} />,
	<Route path="/login" component={Login} />,
	<Route path ="/product/single" component={Product} />
);