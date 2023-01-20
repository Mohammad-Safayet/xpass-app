import { Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

import "../styles/mainNav.css";

function MainNav() {
  return (
    <Nav className="flex-column mainNav">
      <div>
        <Nav.Link as={Link} to="/" className='linkText'>Home</Nav.Link>
        <Nav.Link as={Link} to="/all-passwords" className='linkText'>All Passwords</Nav.Link>
      </div>
      <div>
        <Nav.Link as={Link} to="/account-settings" className='linkText'>Account Settings</Nav.Link>
        <Nav.Link as={Link} to="/help" className='linkText'>Help</Nav.Link>
      </div>
    </Nav>
  );
}

export default MainNav;
