import React, {useEffect} from 'react';
import './home-page.css';
import Hero from "./hero/hero";
import News from "./news/news";
import IntroSection from "./intro-section/intro-section";

export default function HomePage() {

    useEffect(() => {
        document.title = "MoultDB"
    }, []);

    return (
        <main>
            <Hero />
            <div className="moultdb-section">
                <div className="row ">
                    <div className="col-md-6">
                        <IntroSection />
                    </div>
                    <div className="col-md-6">
                        <News />
                    </div>
                </div>
            </div>
        </main>
    );
}