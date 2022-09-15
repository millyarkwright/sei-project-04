import { Link, useNavigate } from 'react-router-dom'
import { userIsAuthenticated, loginTextDisplay } from '../components/helpers/auth'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import React Bootstrap Components
import NavBar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'

let auth = false

const PageNavBar = () => {
  
  const navigate = useNavigate()

  const handleLogout = () => {
    window.localStorage.removeItem('aroma-token')
    toast.info(`Goodbye! 🙁`, {
      position: "top-left",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    navigate('/')
    console.log('USER HAS LOGGED OUT')
  }

  return (
    <NavBar expand="md">
      <ToastContainer />
      <Container>
        <NavBar.Brand as={Link} to="/">
          🍃 <span className="logo fw-bold">aromatics</span>
        </NavBar.Brand>
        {userIsAuthenticated() && loginTextDisplay()}
        <NavBar.Toggle aria-controls="basic-navbar-nav"></NavBar.Toggle>
        <NavBar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav.Link as={Link} to="/essentials">
            <span className="underline ms-3">Essential Oils</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/bases">
            <span className="underline ms-3">Base Oils</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/recipes">
            <span className="underline ms-3">Recipes</span>
          </Nav.Link>
          {userIsAuthenticated() ? (
            <>
              <Nav.Link as={Link} to="/createrecipe">
                <span className="underline ms-3">Create Recipe</span>
              </Nav.Link>

              <NavDropdown title="Your Pages" className=" ms-3" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/createdrecipes" >Your Recipes</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/savedrecipes">Saved Recipes</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/profile">Your Profile</NavDropdown.Item>
              </NavDropdown>

              <Nav.Link onClick={handleLogout} as={Link} to="/">
                <span className="underline ms-3">Logout</span>
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/register" className=" ms-3">
                <span className="underline">Register</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className=" ms-3">
                <span className="underline">Login</span>
              </Nav.Link>
            </>
          )}
        </NavBar.Collapse>
      </Container>
    </NavBar>
  )
}

export default PageNavBar
