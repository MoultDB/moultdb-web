import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import About from "./components/about/about";
import Footer from "./components/navs/footer";
import Header from "./components/navs/header";
import HomePage from "./components/home-page/home-page";
import Notfound from "./components/notfound";
import RelatedProjects from "./components/about/related-projects";
import PrivacyNotice from "./components/privacy-notice/privacy-notice";
import CookieConsent from "react-cookie-consent";

const routing = (
    <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
        <Header />
        <div id="moultdb-body">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/about/moultdb" component={About} />
                <Route path="/about/related-projects" component={RelatedProjects} />
                <Route path="/about/privacy-notice" component={PrivacyNotice} />
                <Route component={Notfound} />
            </Switch>
            <CookieConsent
                location="bottom"
                buttonText="Do not show this banner again"
                cookieName="__Host-moultdb-privacy-policy"
                cookieValue="1"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={365}
                sameSite={"strict"}
                cookieSecurity={"true"}
            >
                This website requires cookies, and limited processing of your personal data in order to function.
                By using the site you are agreeing to this as outlined in our <Link to="/about/privacy-notice">privacy notice</Link>.
            </CookieConsent>
        </div>
        <Footer />
    </Router>
);

ReactDOM.render(routing, document.getElementById('moultdb-content'));