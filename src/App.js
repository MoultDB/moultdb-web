import {BrowserRouter, Link, Navigate, Route, Routes, useLocation} from "react-router-dom";
import Header from "./components/navs/header";
import HomePage from "./components/home-page/home-page";
import About from "./components/about/about";
import RelatedProjects from "./components/about/related-projects";
import PrivacyNotice from "./components/privacy-notice/privacy-notice";
import Notfound from "./components/notfound";
import CookieConsent from "react-cookie-consent";
import Footer from "./components/navs/footer";
import Taxon from "./components/pages/taxon";
import Pathway from "./components/pages/pathway";
import Gene from "./components/pages/gene";
import Domain from "./components/pages/domain";
import Orthogroup from "./components/pages/orthogroup";
import Maintenance from "./components/pages/maintenance";
import {useLayoutEffect} from "react";
import TaxonSearch from "./components/pages/taxon-search";
import PathwayOrthogroup from "./components/pages/pathway-orthogroup";

function App() {
    return (
        <BrowserRouter>
            <ScrollWrapper>
                <Header />
                <div id="moultdb-body">
                    <CustomRoutes />
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
            </ScrollWrapper>
        </BrowserRouter>
    );
}

export default App;

function CustomRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="about" element={<About />} />
            {/*<Route path="search/taxa" element={<Maintenance />} />*/}
            <Route path="search/taxa" element={<TaxonSearch />} />
            {/*<Route path="taxon/:datasource/:accession" element={<Maintenance />} />*/}
            <Route path="taxon/:datasource/:accession" element={<Taxon />} />
            {/*<Route path="pathways" element={<Maintenance />} />*/}
            <Route path="pathways" element={<PathwayOrthogroup />} />
            {/*<Route path="pathway/:pathwayId" element={<Maintenance />} />*/}
            <Route path="pathway/:pathwayId" element={<Pathway />} />
            {/*<Route path="domain/:domainId" element={<Maintenance />} />*/}
            <Route path="domain/:domainId" element={<Domain />} />
            {/*<Route path="orthogroup/:orthogroupId" element={<Maintenance />} />*/}
            <Route path="orthogroup/:orthogroupId" element={<Orthogroup />} />
            {/*<Route path="gene/:type/:id" element={<Maintenance />} />*/}
            <Route path="gene/:type/:id" element={<Gene />} />
            <Route path="about/related-projects" element={<RelatedProjects />} />
            <Route path="about/privacy-notice" element={<PrivacyNotice />} />
            <Route path="404" element={<Notfound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
    );
}

const ScrollWrapper = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children
} 
