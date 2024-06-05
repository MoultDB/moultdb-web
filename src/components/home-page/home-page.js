import React, {useEffect} from 'react';
import Header from '../navs/header'
import Hero from './hero/hero';
import MoultDBProject from './moultdb-project/moultdb-project';
import Slider from './slider/slider';
import MetricsContainer from './metrics-container/metrics-container';
import FAQSection from './faq-section/faq-section';
import TeamSection from './team-section/team-section';
import SocialMediaSection from './social/social';
import GetInTouch from './get-in-touch/get-in-touch';
import ContactUs from './contact-us/contact-us';
import Footer from '../navs/footer';


export default function HomePage() {

    useEffect(() => {
        document.title = "MoultDB"
    }, []);

  return (
    <div>
        <Hero />
        <MoultDBProject />
        <Slider />
        <TeamSection />
        <FAQSection/>
        {/*<SocialMediaSection />*/}
        {/*<GetInTouch/>*/}
        <ContactUs/>
    </div>
  );
}