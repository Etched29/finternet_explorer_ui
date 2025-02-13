/*!

=========================================================
* Finternet Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/finternet-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/finternet-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NavbarBrand } from "reactstrap";
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/finternet-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import LoginForm from "views/LoginForm";

const root = ReactDOM.createRoot(document.getElementById("root"));


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [theUser, setTheUser] = useState('Ankit')
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  console.log(JSON.parse(localStorage.getItem("isLoggedIn")))

  const onLoginSuccess = () => {
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    setIsLoggedIn(false)
    setDropdownOpen(false)
  }

  const toggleDropdown = () => {
    setDropdownOpen(false)
  }

  const handleUserClick = (e) => {
    e.preventDefault();
    // const container = document.querySelector('.shadow.users')
    // const rect = container?.getBoundingClientRect()
    setPosition({ x: e.clientX, y: e.clientY });
    setDropdownOpen(true);
  }

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', background: "#FFF", height: "50px", "--tw-shadow": "0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1)", boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)" }}>
        <NavbarBrand className="pt-0" >
          <img
            className="navbar-brand-img"
            src="https://finternetlab.io/images/headers/finternet-favicon.png"
            onClick={() => window.location.href = "/admin/home"}
          />
        </NavbarBrand>
        {isLoggedIn && (
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'center', border: '0.25px solid black', width: '32px', height: '32px', margin: '9px', borderRadius: '50%' }}>
          <i onClick={handleUserClick} style={{ fontSize: '24px' }} class="fa-solid fa-user-tie"></i>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggleDropdown}
            style={{ position: "absolute", top: `${position.y}px`, left: `${position.x - 190}px` }}
          >
            <DropdownToggle tag="div" style={{ display: "none" }} /> {/* Invisible Trigger */}
            <DropdownMenu>
              <DropdownItem>
                <div style={{ marginRight: '5px', fontWeight: '700', }}>{theUser}</div>
              </DropdownItem>
              <DropdownItem onClick={logoutHandler}>
              <i class="fa-solid fa-arrow-right-from-bracket"></i>Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        )}
      </header>
      {isLoggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/admin/*" element={<AdminLayout theUser={theUser} />} />
            <Route path="*" element={<Navigate to="/admin/home" replace />} />
          </Routes>
        </BrowserRouter>
      ) : <LoginForm onLoginSuccess={onLoginSuccess} />}
    </div>
  )
}

root.render(
  <App />
);
