import React from 'react';
import {Link} from "react-router-dom";

import './header.css'
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <section className="menu menu2 header-section" >
      <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div className="container">
          <div className="navbar-brand">
            <span className="navbar-logo">
              <Link to={"/"}>
                <img src={logo} style={{height: '4.3rem'}} alt="MoultDB Logo" />
              </Link>
            </span>
            <span className="navbar-caption-wrap">
              <Link to={"/"} className="navbar-caption text-black display-4" >
                MoultDB
              </Link>
            </span>
          </div>
          <button className="navbar-toggler" type="button" data-toggle="collapse"
            data-bs-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarNavAltMarkup" aria-expanded="false"
            aria-label="Toggle navigation">
            <div className="hamburger">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
              <li className="nav-item">
                <Link to={"/species/gbif/54"} className="nav-link link text-black display-4">Browse</Link>
              </li>
              <li className="nav-item">
                <Link to={"/species/search"} className="nav-link link text-black display-4">Search</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link link text-black display-4" href="https://www.moulting.org" aria-expanded="false">Citizen
                  Science</a>
              </li>
              <li className="nav-item">
                <Link to={"/about"} className="nav-link link text-black display-4">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;