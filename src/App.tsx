import { useEffect, useState } from 'react';
import './App.css';
import { Col, Container, Dropdown, DropdownButton, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LoggedInUserDetails, UserRole } from './Interfaces/LoggedInUserDetails';
import { getLoggedInUserDetails, isUserLoggedIn } from './utils/LoggedInUserDetailsStore';

function App() {
  const[userDetails,setUserDetails] = useState<LoggedInUserDetails>()

  const navigate = useNavigate()
  const location = useLocation();

  // if(userDetails?.firstName == null)
  //   setUserDetails(getLoggedInUserDetails());


  useEffect(() => {
    
    if(userDetails?.firstName == null)
      setUserDetails(getLoggedInUserDetails());
    
    // Code to run on route change
    console.log('Route changed!', location.pathname);

    if(location.pathname == '/'){
      if(isUserLoggedIn()){

        if(userDetails?.role == UserRole.Manager){
          navigate('manager/reimbursement')
        }
        else if(userDetails?.role == UserRole.Employee){
          navigate('employee/home')
        }
        
      }
      //if the user isn't logged in, sent them to login page
      else {
        navigate('/login')
      }
  
      console.log('LoggedUserDetails',userDetails);
    }
    else if(location.pathname == '/login' || location.pathname == '/signup'){
      if(isUserLoggedIn()){
        // setUserDetails(getLoggedInUserDetails())
  
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
    setUserDetails(undefined);
    navigate('/login');
  }

console.log(userDetails)
  return (
    <>

    <Navbar expand="lg" bg='dark' data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">ERS</Navbar.Brand>
        <Nav className="me-auto">
          {/** <Nav.Link href="/">Home</Nav.Link> */}

          {isUserLoggedIn()?
            <>
              {userDetails?.role == UserRole.Manager && <Link className='nav-link' to="/manager/users">Employees</Link>}
              {userDetails?.role == UserRole.Employee && <Link className='nav-link' to="/employee/create_reimbursement">Create Reimbursement</Link>}
              <Link className='nav-link' to="/">Reimbursements</Link>
            </>:
            <>
              <Link className='nav-link' to="/login">Login</Link> 
              <Link className='nav-link' to="/signup">Signup</Link>
            </>
          }
        </Nav>
        <Navbar.Toggle />
        {isUserLoggedIn() &&
        <Navbar.Collapse className="justify-content-end">
          <DropdownButton id="dropdown-basic-button" className='dropdown_btn' variant='secondary' title={getLoggedInUserDetails()?.username}>
            {/* <Dropdown.Item href="/">Reimbursements</Dropdown.Item> */}
            <Dropdown.Item><Link className='nav-link' to='/account/update_profile'>Update My Account</Link></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#" onClick={logout}>Logout</Dropdown.Item>
          </DropdownButton>
        </Navbar.Collapse>}
      </Container>
    </Navbar>
    

      <Container fluid className='mt-5'>
        <Row className='d-flex justify-content-center align-items-start'>
          <Col xs={10} style={{padding:0}} className='d-flex justify-content-center align-items-start'>
            { /** Rendered page automatically goes here */  }
            <div className='w-100 d-flex flex-column align-items-center justify-content-start' style={{margin: 0, padding: 0 }}>
              <Outlet />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
