import {BrowserRouter as Router, Link, Route, Switch, useHistory} from "react-router-dom";
import Header from "./components/navs/header";
import HomePage from "./components/home-page/home-page";
import About from "./components/about/about";
import RelatedProjects from "./components/about/related-projects";
import PrivacyNotice from "./components/privacy-notice/privacy-notice";
import Notfound from "./components/notfound";
import CookieConsent from "react-cookie-consent";
import Footer from "./components/navs/footer";
import ReactGA from "react-ga";
import {useEffect} from "react";

function App() {
    return (
        <Router>
            <Header />
            <div id="moultdb-body">
                <Routes />
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
}

export default App;

function Routes() {
    const history = useHistory();

    const isLocalhost = Boolean(
        window.location.hostname === 'localhost' ||
        // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 127.0.0.1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
    );

    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
        testMode: isLocalhost,
        gaOptions: {
            cookieFlags: "SameSite=None; Secure",
            cookieExpires: "7200"
        }
    });

    useEffect(() => {
        trackPageView(); // To track the first pageview upon load
        history.listen(trackPageView); // To track the subsequent pageviews
    }, [history]);

    function trackPageView() {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    return (
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about/moultdb" component={About} />
            <Route path="/about/related-projects" component={RelatedProjects} />
            <Route path="/about/privacy-notice" component={PrivacyNotice} />
            <Route component={Notfound} />
        </Switch>
    );
}

