import React from 'react';
import './home-page.css';
import Hero from "./hero/hero";
import Section from "./intro-section/intro-section";
import Timeline from "../timeline/timeline";

export default function HomePage() {
    return (
        <main>
            <Hero />
            <div className="moultdb-section">
                <div className="row ">
                    <div className="col-md-6">
                        <Section />
                    </div>
                    <div className="col-md-6">
                        <Section />
                    </div>
                </div>
                <div className="row">
                    <section className="col-md-12 moultdb-news">
                        <h2>Last news</h2>
                        <Timeline count={2} />
                    </section>
                </div>
            </div>
        </main>
    );
}