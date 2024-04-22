import React from 'react';
import './contact-us.css';

function ContactUs() {
  return (
    <section className="contacts03 cid-u64l9crRog" id="contacts-11-u64l9crRog">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4">
            <div className="col-12 col-md-12">
              <h5 className="mbr-section-title mbr-fonts-style mt-0 mb-4 display-2">
                <strong>Contact Us</strong>
              </h5>
              <p className="mbr-section-subtitle mbr-fonts-style mt-0 mb-4 display-7">
                Phone: <a href="tel:+1-800-MoultDB">+1-800-MoultDB</a><br />
                Email: <a href="mailto:info@Moultdb.com">info@Moultdb.com</a><br />
                Address: Lausanne Switzerland<br />
                Working Hours: Mon-Fri: 9am-5pm
              </p> 
            </div>
          </div>
          <div className="col-lg-8 side-features">
            <div className="google-map">
              <iframe 
                title="location" 
                frameBorder="0" 
                style={{ border:0, width: '100%', height: '400px' }} 
                src="https://www.google.com/maps/embed/v1/place?key&#x3D;AIzaSyCt1265A4qvZy9HKUeA8J15AOC4SrCyZe4&amp;q&#x3D;Lausanne%20Switzerland" allowfullscreen=""></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;