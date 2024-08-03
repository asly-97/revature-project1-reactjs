import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/Login';
import { Breadcrumb } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      { /** This routes navigator is temporairily */  }
      <Breadcrumb>
        <Breadcrumb.Item> <Link to="/">Home</Link> </Breadcrumb.Item>
        <Breadcrumb.Item> <Link to="/login">Login</Link> </Breadcrumb.Item>
        <Breadcrumb.Item> <Link to="/signup">Signup</Link> </Breadcrumb.Item>
      </Breadcrumb>

      <h3>Home Page</h3>

      //Rendered page goes here
      <Outlet />
    </>
  );
}

export default App;
