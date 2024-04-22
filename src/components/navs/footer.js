import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
    return (
        <footer className="footer3 cid-u64l9croxI" id="footer-3-u64l9croxI">
            <div className="container">
                <div className="row">
                    <div className="row-links">
                        <ul className="header-menu">
                            <li className="header-menu-item mbr-fonts-style display-5">
                                <Link to="/about" className="text-white">About</Link>
                            </li>
                            <li className="header-menu-item mbr-fonts-style display-5">
                                <Link to="/services" className="text-white">Services</Link>
                            </li>
                            <li className="header-menu-item mbr-fonts-style display-5">
                                <Link to="/blog" className="text-white">Blog</Link>
                            </li>
                            <li className="header-menu-item mbr-fonts-style display-5">
                                <Link to="/contact" className="text-white">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="col-12 mt-4">
                        <div className="social-row">
                            <div className="soc-item">
                                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
                                    <span className="mbr-iconfont socicon socicon-facebook display-7"></span>
                                </a>
                            </div>
                            <div className="soc-item">
                                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                    <span className="mbr-iconfont socicon-twitter socicon"></span>
                                </a>
                            </div>
                            <div className="soc-item">
                                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
                                    <span className="mbr-iconfont socicon-instagram socicon"></span>
                                </a>
                            </div>
                            <div className="soc-item">
                                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
                                    <span className="mbr-iconfont socicon socicon-mastodon"></span>
                                </a>
                            </div>
                            <div className="soc-item">
                                <a href="https://twitch.tv/" target="_blank" rel="noopener noreferrer">
                                    <span className="mbr-iconfont socicon socicon-twitch"></span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 mt-5">
                        <p className="mbr-fonts-style copyright display-7">
                            © 2024 MoultDB. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;