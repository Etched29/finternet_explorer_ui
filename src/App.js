
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NavbarBrand } from "reactstrap";
import { Check} from './grpcClient'

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/finternet-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import LoginForm from "views/LoginForm";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [theUser, setTheUser] = useState(null);   

    const onLoginSuccess = () => {
       
      }
    useEffect(() => {
        if(JSON.parse(localStorage.getItem("jwtToken")) !==null){
                setIsLoggedIn(true)
        }
        else{
            setIsLoggedIn(false)
        }
    }, [])
  return (
    <div>
    <header style={{ background: "#FFF", height: "50px", "--tw-shadow": "0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)", boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)" }}>
      <NavbarBrand className="pt-0" >
        <img
          className="navbar-brand-img"
          src="https://finternetlab.io/images/headers/finternet-favicon.png"
          onClick={() => window.location.href = "/admin/home"}
        />
      </NavbarBrand>
      
    </header>
    {isLoggedIn ? (
      <BrowserRouter>
        <Routes>
          <Route path="/admin/*" element={<AdminLayout  />} />
          <Route path="*" element={<Navigate to="/admin/home" replace />} />
        </Routes>
      </BrowserRouter>
    ) : <LoginForm setisLoggedIn={setIsLoggedIn} onLoginSuccess={onLoginSuccess} setTheUser={setTheUser} />}
  </div>
  )
}

export default App