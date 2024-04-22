import React from 'react';
import './header.css'
import logo from '../../assets/images/logo.png';

const Header = () => {
  return (
    <section className="menu menu2 cid-u64l9cnqx6" once="menu" id="menu-5-u64l9cnqx6">
      <nav className="navbar navbar-dropdown navbar-fixed-top navbar-expand-lg">
        <div className="container">
          <div className="navbar-brand">
            <span className="navbar-logo">
              <a href="#">
                <img src={logo} style={{height: '4.3rem'}} alt="MoultDB Logo" />
              </a>
            </span>
            <span className="navbar-caption-wrap">
              <a className="navbar-caption text-black display-4" href="#">MoultDB</a>
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
                <a className="nav-link link text-black display-4" href="#">Genomics</a>
              </li>
              <li className="nav-item">
                <a className="nav-link link text-black display-4" href="https://www.moulting.org" aria-expanded="false">Citizen Science</a>
              </li>
              <li className="nav-item">
                <a className="nav-link link text-black display-4" href="#">About</a>
              </li>
            </ul>
            <div className="navbar-buttons mbr-section-btn">
              <a className="btn btn-primary display-4" href="#">Explore</a>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Header;