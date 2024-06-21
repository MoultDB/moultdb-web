import React from 'react';
import {Link} from "react-router-dom";
import './hero.css'; 

function Hero() {
    return (
        <section className="custom-hero mbr-fullscreen" >
            <div className="mbr-overlay" style={{ opacity: 0.3, backgroundColor: 'rgb(0, 0, 0)' }}></div>
            <div className="container-fluid">
                <div className="row">
                    <div className="content-wrap col-12 col-md-10">
                        <h1 className="mbr-section-title mbr-fonts-style mbr-white mb-4 display-1">
                            <strong>MoultDB</strong>
                        </h1>
                        <p className="mbr-fonts-style mbr-text mbr-white mb-4 display-7">An integrated view
                            of arthropod moulting, combining morphological, genomic, and fossil data.</p>
                        <div className="mbr-section-btn">
                            <Link to={"/species/search"} className="btn btn-white-outline display-7">Search</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;