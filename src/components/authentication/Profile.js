import React, { useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

export default function Profile() {
	const [error, setError] = useState("");
	const res = useAuth();
	console.log(res);
	const { currentUser, logout } = res;

	const navigate = useNavigate();
	async function handleLogout() {
		setError("");

		try {
			await logout();
			navigate("/login");
		} catch {
			setError("Failed to log out");
		}
	}
	return (
		<CenteredContainer>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<strong>Email: </strong> {currentUser.email}
					<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
						Update
					</Link>
				</Card.Body>
			</Card>

			<div className='w-100 text-center mt-2'>
				<Button variant='link' onClick={handleLogout}>
					Log out
				</Button>
			</div>
		</CenteredContainer>
	);
}
