import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';

import '../styles/appbar.css'

function Appbar() {
  return (
    <Navbar className='appbar'>
        <Container>
            <Navbar.Brand href="/"><h4>Xpass</h4></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <NavDropdown
                    id="nav-dropdown-dark-example"
                    title="Jack"
                    menuVariant="dark"
                    >
                    <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  );
}

export default Appbar;
