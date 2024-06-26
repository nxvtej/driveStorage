import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateRoute = ({ element }) => {
	const { currentUser } = useAuth();

	return currentUser ? element : <Navigate to='/login' />;
};

export default PrivateRoute;

/*

import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth();
	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Navigate to='/login' />
				);
			}}
		></Route>
	);
}

*/
