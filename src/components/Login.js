import { Firestore } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { signup, currentUser } = useAuth();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
		} catch {
			setError("failaed  to create account");
		}

		setLoading(false);
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Login</h2>
					{/* {currentUser.email} */}
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>

						<Button disabled={loading} className='w-100' type='submit'>
							Login
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				need an account? <Link to='/signup' />
			</div>
		</div>
	);
};

export default Login;
