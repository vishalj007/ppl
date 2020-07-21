import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import SinglePost from "./SinglePost";

import Timeline from "./Timeline";
import PrivateRoute from "./Routes/PrivateRoutes";
import PublicRoute from "./Routes/PublicRoutes";

function Main() {
	return (
		<Switch>
			<PublicRoute path="/Register" component={Register} />
			<PublicRoute path="/Login" component={Login} />
			<PrivateRoute path="/TimeLine" component={Timeline} />
			<PrivateRoute exact path="/Singlepost/:id" component={SinglePost} />
			<PrivateRoute exact path="/" component={Timeline} />
		</Switch>
	);
}

export default Main;
