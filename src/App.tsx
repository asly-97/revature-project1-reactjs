import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Auth/Login';
import { Breadcrumb } from 'react-bootstrap';
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
      { /** This routes navigator is temporairily */  }
      <Breadcrumb>
        <Breadcrumb.Item> <Link to="/">Home</Link> </Breadcrumb.Item>
        <Breadcrumb.Item> <Link to="/login">Login</Link> </Breadcrumb.Item>
        <Breadcrumb.Item> <Link to="/signup">Signup</Link> </Breadcrumb.Item>
      </Breadcrumb>

      <h3>Home Page</h3>

      { /** Rendered page automatically goes here */  }
      <Outlet />
    </>
  );
}

export default App;
