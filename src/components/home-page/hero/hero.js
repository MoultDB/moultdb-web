import React from 'react';
import './hero.css'; 
import backgroundImage from '../../../assets/images/wallpaper.jpg';

function Hero() {
    return (
        <section className="header16 cid-u64l9coHiG mbr-fullscreen mbr-parallax-background" id="hero-17-u64l9coHiG" style={{ backgroundImage: `url(${backgroundImage})`}}>
            <div className="mbr-overlay" style={{ opacity: 0.3, backgroundColor: 'rgb(0, 0, 0)' }}></div>
            <div className="container-fluid">
                <div className="row">
                    <div className="content-wrap col-12 col-md-10">
                        <h1 className="mbr-section-title mbr-fonts-style mbr-white mb-4 display-1">
                            <strong>Moulting Wonders</strong>
                        </h1>
                        <p className="mbr-fonts-style mbr-text mbr-white mb-4 display-7">Dive into the mesmerizing world of arthropods shedding their old skins and revealing their true beauty.</p>
                        <div className="mbr-section-btn"><a className="btn btn-white-outline display-7" href="#">Discover</a></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;