import { Container } from "react-bootstrap";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./authentication/PrivateRoute";
import ForgotPassword from "./authentication/ForgotPassword";
import UpdateProfile from "./authentication/UpdateProfile";
import Profile from "./authentication/Profile";
import Dashboard from "./drive/Dashboard";

function App() {
	return (
		<Router>
			<AuthProvider>
				<PrivateRoute exact path='/' element={<Dashboard />}></PrivateRoute>
				<Routes>
					{/* drive */}

					{/* progile */}
					<Route
						exact
						path='/user'
						element={<PrivateRoute element={<Profile />} />}
					/>
					<Route
						path='/update-profile'
						element={<PrivateRoute element={<UpdateProfile />} />}
					/>

					{/* authfile */}
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
