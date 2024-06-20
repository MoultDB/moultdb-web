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
        </div>
      </div>
    </section>
  );
}

export default ContactUs;