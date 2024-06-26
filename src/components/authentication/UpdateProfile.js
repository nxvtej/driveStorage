import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

const UpdateProfile = () => {
	const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updatePassword, updateEmail } = useAuth();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		const promises = [];
		setLoading(true);
		setError("");

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
			console.log("email pushed");
		}

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
			console.log("password pushed");
		}

		Promise.all(promises)
			.then(() => {
				navigate("/user");
			})
			.catch(() => {
				setError("Failed to update account");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<CenteredContainer>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Update Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								placeholder='Leave blank to keep the same'
							/>
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type='password'
								ref={passwordConfirmRef}
								placeholder='Leave blank to keep the same'
							/>
						</Form.Group>
						<Button disabled={loading} className='w-100 mt-3' type='submit'>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Link to='/user'>Cancel</Link>
			</div>
		</CenteredContainer>
	);
};

export default UpdateProfile;

/*import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const UpdateProfile = () => {
	const navigate = useNavigate();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updatePassword, updateEmail } = useAuth();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		const promises = [];
		setLoading(true);
		setError("");

		console.log(currentUser.email);
		console.log(emailRef.current.value);

		if (emailRef.current.value !== currentUser.email) {
			promises.push(updateEmail(emailRef.current.value));
			console.log("email pushed");
		}

		if (passwordRef.current.value) {
			promises.push(updatePassword(passwordRef.current.value));
			console.log("password pushed");
		}

		Promise.all(promises)
			.then(() => {
				navigate("/");
			})
			.catch(() => {
				setError("Failed to update account");
			})
			.finally(() => {
				setLoading(false);
			});
	}

	return (
		<div>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Update Profile</h2>
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								placeholder='Leave blank to keep the same'
							/>
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control
								type='password'
								ref={passwordConfirmRef}
								placeholder='Leave blank to keep the same'
							/>
						</Form.Group>
						<Button disabled={loading} className='w-100 mt-3' type='submit'>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Link to='/'>Cancel</Link>
			</div>
		</div>
	);
};

export default UpdateProfile;
*/
