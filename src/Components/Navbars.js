import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import lofimg from '../Components/Signup&Signin/img/logo.png';
// import '../Components/Signup&Signin/style.css'
import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useAuth } from './Auths';
import { useNavigate } from 'react-router-dom';
const Navbars = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const useremail = localStorage.getItem('useremail');

    const backlogin = () => {
        navigate('/login');
    }

    const logout = () => {
        auth.logout();
        navigate('/login');
    }

    return (
        
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home"><div className='logo'>
                    <img src={lofimg} alt='easyclass' />
                    <h4 style={{ marginTop: '0.1rem' }}>easyQuiz</h4>
                </div></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><NavLink to='/editprofile'>profile</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/home' >home</NavLink></Nav.Link>
                        <Nav.Link><NavLink to='/ass' >Assessment</NavLink></Nav.Link>
                        
                    </Nav>
                    {auth.user ? (<Nav>
                        <Nav.Link href="#deets">Signed in as:</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            {localStorage.getItem('useremail')}
                        </Nav.Link>
                        <Button variant="outline-success" onClick={logout}>Log out</Button>
                    </Nav>) : (<Nav>
                        <Button variant="outline-success" onClick={backlogin}>Login</Button>
                    </Nav>)}



                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navbars