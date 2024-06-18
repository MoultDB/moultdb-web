import React from 'react';
import './contact-us.css';
import Obfuscate from 'react-obfuscate';

function ContactUs() {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="col-12 col-md-12">
              <h5 className="mbr-section-title mbr-fonts-style mt-0 mb-4 display-2">
                <strong>Contact Us</strong>
              </h5>
              <p className="mbr-section-subtitle mbr-fonts-style mt-0 mb-4 display-7 text-center">
                You can contact us by&nbsp;
                  <Obfuscate email={process.env.REACT_APP_CONTACT_EMAIL}
                             headers={{subject: '[moultdb] '}}>
                    e-mail
                  </Obfuscate>.
              </p>
              <p className="mbr-section-subtitle mbr-fonts-style mt-0 mb-4 display-7 text-center">
                Don't hesitate !</p>
            </div>
          </div>
          {/*<div className="col-lg-8 side-features">*/}
          {/*  <div className="google-map">*/}
          {/*    <iframe */}
          {/*      title="location" */}
          {/*      frameBorder="0" */}
          {/*      style={{ border:0, width: '100%', height: '400px' }} */}
          {/*      src="https://www.google.com/maps/embed/v1/place?key&#x3D;AIzaSyCt1265A4qvZy9HKUeA8J15AOC4SrCyZe4&amp;q&#x3D;Lausanne%20Switzerland" allowFullScreen=""></iframe>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </section>
  );
}

export default ContactUs;