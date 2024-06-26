import { Firestore } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import CenteredContainer from "./CenteredContainer";

const ForgotPassword = () => {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(false);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage("");
			setError("");
			setLoading(true);
			await resetPassword(emailRef.current.value);
			setMessage("check your inbox for further instructions");
		} catch {
			setError("Failed to reset password in");
		}

		setLoading(false);
	}

	return (
		<CenteredContainer>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>password reset</h2>
					{/* {currentUser.email} */}
					{error && <Alert variant='danger'>{error}</Alert>}
					{message && <Alert variant='success'>{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>

						<Button disabled={loading} className='w-100 mt-3' type='submit'>
							Reset Password
						</Button>
					</Form>

					<div className='w-100 text-center mt-3'>
						<Link to='/login'> Log In</Link>
					</div>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Need an account? <Link to='/signup'>Sign Up</Link>
			</div>
		</CenteredContainer>
	);
};

export default ForgotPassword;
