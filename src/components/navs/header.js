import React from "react";
import {Link} from "react-router-dom";
import './header.css';
import Logo from "../../assets/images/moultdb_logo_white_light.png";

export default function Header() {
    return (
        <header>
            <nav id="moultdb-header" className="navbar navbar-expand-md navbar-dark fixed-top">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse" aria-controls="navbarCollapse"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <Link to="/" className="navbar-brand">
                        <img src={Logo} className="d-inline-block align-top" alt="MoutlDB logo"/>
                        <span className="moultdb-name">MoultDB</span>
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="/" id="navbarAbout" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    About
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarAbout">
                                    <Link to="/about/moultdb" className="dropdown-item">MoultDB</Link>
                                    <Link to="/about/related-projects" className="dropdown-item">Related projects</Link>
                                    <Link to="/about/privacy-notice" className="dropdown-item">Privacy notice</Link>
                                    <a href="https://github.com/MoultDB/" className="dropdown-item"
                                       target="_blank" rel="noopener noreferrer">Source code</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}