import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import './header.css'
import logo from '../../assets/images/logo.png';

const Header = () => {

  useEffect(() => {
    const navLinks = document.querySelectorAll('.nav-item')
    const menuToggle = document.getElementById('navbarSupportedContent')
    navLinks.forEach((l) => {
        l.addEventListener('click', () => {
          menuToggle.classList.remove('show');
        })
    })
  }, []);
  
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
              <Link to={"/"} className="navbar-caption text-black display-4">
                MoultDB
              </Link>
            </span>
          </div>
          <button className="navbar-toggler" type="button"
                  data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
                <Link to={"/taxon/" + process.env.REACT_APP_ROOT_TAXON_ACCESSION} className="nav-link link text-black display-4">
                    Arthropoda data
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/pathways"} className="nav-link link text-black display-4">Pathways</Link>
              </li>
              <li className="nav-item">
                <Link to={"/search/taxa"} className="nav-link link text-black display-4">Search</Link>
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