import React from "react";
import './footer.css';
import Obfuscate from 'react-obfuscate';

export default function Footer() {
    return (
        <footer id="moultdb-footer">
            <nav className="navbar navbar-expand navbar-dark bg-dark fixed-bottom">
                <div className="container-fluid collapse navbar-collapse">
                    <ul className="nav navbar-nav ms-auto">
                        <li className="nav-item">
                            <Obfuscate email={process.env.REACT_APP_CONTACT_EMAIL}
                                       headers={{subject: '[moultdb] '}}>
                                <p>Contact us</p>
                            </Obfuscate>
                        </li>
                    </ul>
                </div>
            </nav>
        </footer>
    );
}