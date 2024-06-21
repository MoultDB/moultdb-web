import React, {useEffect} from 'react';
import Hero from './hero/hero';
import MoultDBProject from './moultdb-project/moultdb-project';
import Slider from './slider/slider';
import FAQSection from './faq-section/faq-section';
import TeamSection from './team-section/team-section';
import ContactUs from './contact-us/contact-us';


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
        <ContactUs/>
    </div>
  );
}