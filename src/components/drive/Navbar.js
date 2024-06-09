import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavbarComponent() {
	return (
		<Navbar bg='light' expand='sm'>
			<Navbar.Brand as={Link} to='/'>
				Drive
			</Navbar.Brand>
			<Nav className='me-auto'>
				{/* Empty Nav to push the next Nav to the right */}
			</Nav>
			<Nav>
				<Nav.Link as={Link} to='/user'>
					Profile
				</Nav.Link>
			</Nav>
		</Navbar>
	);
}
