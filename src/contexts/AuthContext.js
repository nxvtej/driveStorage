import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Updated import statement

const AuthContext = React.createContext();

export function useAuth() {
	return useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	async function updateEmail(email) {
		if (currentUser) {
			try {
				await currentUser.updateEmail(email);
				return Promise.resolve();
			} catch (error) {
				console.error("Failed to update email", error);
				return Promise.reject(error);
			}
		} else {
			const error = new Error("No user is currently logged in");
			console.error(error);
			return Promise.reject(error);
		}
	}

	async function updatePassword(password) {
		if (currentUser) {
			try {
				await currentUser.updatePassword(password);
				return Promise.resolve();
			} catch (error) {
				console.error("Failed to update password", error);
				return Promise.reject(error);
			}
		} else {
			const error = new Error("No user is currently logged in");
			console.error(error);
			return Promise.reject(error);
		}
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

/*

import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase"; // Updated import statement

const AuthContext = React.createContext();

export function useAuth() {
	return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState();
	const [loading, setLoading] = useState(true);

	function signup(email, password) {
		return auth.createUserWithEmailAndPassword(email, password);
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password);
	}

	function logout() {
		return auth.signOut();
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email);
	}

	function updateEmail(currentUser, email) {
		const res = currentUser.updateEmail(email);
		console.log(res);
		return res;
	}

	async function updatePassword(currentUser, password) {
		console.log("controle reachjed here");
		const pas = await currentUser.updatePassword(password);

		return pas;
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		login,
		signup,
		logout,
		resetPassword,
		updateEmail,
		updatePassword,
	};
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
}

*/
