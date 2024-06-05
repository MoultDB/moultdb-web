import React from 'react';
import {Link} from "react-router-dom";
import './moultdb-project.css'
import moultDbImage from '../../../assets/images/photo-1669275371255-3ae9608f420c.jpeg';


function MoultDBProject() {
    return (
        <section className="project-presentation-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-12 col-lg-6 image-wrapper">
                        <img className="w-100" src={moultDbImage} alt="MoultDB Project" />
                    </div>
                    <div className="col-12 col-md-12 col-lg">
                        <div className="text-wrapper align-left">
                            <h1 className="mbr-section-title mbr-fonts-style mb-4 display-2">
                                <strong>The MoultDB project</strong>
                            </h1>
                            <p className="mbr-text mbr-fonts-style mb-3 display-7">MoultDB is an integrated resource that merges data from paleontology to genomics to explore moulting in arthropods.</p>
                            <p className="mbr-text mbr-fonts-style mb-3 display-7">The database aims to consolidate dispersed knowledge, offering insights into the vast diversity and evolutionary trends of arthropod moulting.</p>
                            <p className="mbr-text mbr-fonts-style mb-3 display-7">This comprehensive approach facilitates a deeper understanding of arthropod biology and success.</p>
                            <Link to="/about" className="text-link">See more details...</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MoultDBProject;