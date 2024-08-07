import { useEffect, useState } from 'react';
import './App.css';
import { Breadcrumb, Button, Col, Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LoggedInUserDetails, UserRole } from './Interfaces/LoggedInUserDetails';
import { getLoggedInUserDetails, isUserLoggedIn } from './utils/LoggedInUserDetailsStore';

function App() {
  const[userDetails,setUserDetails] = useState<LoggedInUserDetails>()

  const navigate = useNavigate()
  const location = useLocation();

  if(!userDetails)
    setUserDetails(getLoggedInUserDetails());


  useEffect(() => {
    // Code to run on route change
    console.log('Route changed!', location.pathname);

    if(location.pathname == '/'){
      // if(isUserLoggedIn()){
      //   setUserDetails(getLoggedInUserDetails())

        if(userDetails?.role == UserRole.Manager){
          navigate('manager/reimbursement')
        }
        else if(userDetails?.role == UserRole.Employee){
          navigate('employee/home')
        }
        
      // }
      //if the user isn't logged in, sent them to login page
      // else {
      //   navigate('/login')
      // }
  
      console.log('LoggedUserDetails',userDetails);
    }
    else if(location.pathname == '/login' || location.pathname == '/signup'){
      if(isUserLoggedIn()){
        setUserDetails(getLoggedInUserDetails())
  
        if(userDetails?.role == UserRole.Manager){
          navigate('manager/reimbursement')
        }
        else if(userDetails?.role == UserRole.Employee){
          navigate('employee/home')
        }
        
      }
    }

  }, [location]);


  function logout(){
    localStorage.clear();
    navigate('/login');
  }

console.log(userDetails)
  return (
    <>

    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Some Title</Navbar.Brand>
        <Nav className="me-auto">
          {/** <Nav.Link href="/">Home</Nav.Link> */}
          <Link className='nav-link' to="/login">Home</Link> 
          <Link className='nav-link' to="/login">Login</Link> 
          <Link className='nav-link' to="/signup">Signup</Link>
          <Link className='nav-link' to="/manager/users">Users</Link>
        </Nav>
        <Navbar.Toggle />
        {isUserLoggedIn()?
        <Navbar.Collapse className="justify-content-end">
          <DropdownButton id="dropdown-basic-button" variant='secondary' title={getLoggedInUserDetails()?.username}>
            <Dropdown.Item href="/">My Reimbursements</Dropdown.Item>
            <Dropdown.Item href="/account/update_profile">Update My Account</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#" onClick={logout}>Logout</Dropdown.Item>
          </DropdownButton>
        </Navbar.Collapse>:""}
      </Container>
    </Navbar>
    

      <Container fluid>
        <Row className='justify-content-center'>
          <Col xs='10'>
            { /** Rendered page automatically goes here */  }
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
