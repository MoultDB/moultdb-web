import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import About from "./components/about/about";
import Footer from "./components/navs/footer";
import Header from "./components/navs/header";
import HomePage from "./components/home-page/home-page";
import News from "./components/about/news";
import Notfound from "./components/notfound";
import RelatedProjects from "./components/about/related-projects";

const routing = (
    <Router basename={process.env.REACT_APP_ROUTER_BASE || ''}>
        <Header />
        <div id="moultdb-body">
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/about/moultdb" component={About} />
                <Route path="/about/related-projects" component={RelatedProjects} />
                <Route path="/about/news" component={News} />
                <Route component={Notfound} />
            </Switch>
        </div>
        <Footer />
    </Router>
);

ReactDOM.render(routing, document.getElementById('moultdb-content'));