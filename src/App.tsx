import { useEffect, useState } from 'react';
import './App.css';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

function App() {

  const[isLoggedIn,setLoggedIn] = useState(false)

  const navigate = useNavigate()
  const location = useLocation();

  useEffect(()=>{

    console.log(location)
    //if the user isn't logged in, sent them to login page
    if(!isLoggedIn && location.pathname == '/'){
      navigate('/login')
    }

  })


  return (
    <>

      <Container fluid>
        <Row className='justify-content-center'>
          <Col xs='auto' >
            { /** This routes navigator is temporairily */  }
            <Breadcrumb>
              <Breadcrumb.Item> <Link to="/">Home</Link> </Breadcrumb.Item>
              <Breadcrumb.Item> <Link to="/login">Login</Link> </Breadcrumb.Item>
              <Breadcrumb.Item> <Link to="/signup">Signup</Link> </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs='auto'>
            { /** Rendered page automatically goes here */  }
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
