import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import './hero.css';
import MoultdbService from "../../../services/moultdb.service";

function Hero() {
    const [version, setVersion] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            MoultdbService.getReleaseInfo()
                .then(response => {
                    if (response.data) {
                        setVersion(response.data.data.releaseVersion.date);
                    }
                })
                .catch(error => {
                    console.error('An error has occurred during genome upload :', error);
                    setVersion(null);
                })
        }
        fetchData();
    }, []);
    
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
                            <Link to={"/browse/taxa"} className="btn btn-white-outline display-7">Browse</Link>
                            <Link to={"/search/taxa"} className="btn btn-white-outline display-7">Search</Link>
                        </div>
                    </div>
                </div>
            </div>
            {version &&
                <p className={"version"}>Current release was updated on {version}</p>
            }
        </section>
    );
}

export default Hero;