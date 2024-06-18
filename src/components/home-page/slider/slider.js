import React from 'react';
import './slider.css';

import image1 from '../../../assets/images/picture_1.jpeg';
import image2 from '../../../assets/images/picture_2.jpeg';
import image3 from '../../../assets/images/picture_3.jpeg';
import image4 from '../../../assets/images/picture_4.jpeg';

const images = [image3, image1, image4, image2];

function Slider() {

  return (
    <section className="slider4 mbr-embla image-section">
      <div className="container-fluid">
        <div className="row mb-5 justify-content-center">
          <div className="col-12 content-head">
            <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
              <strong>Moulting Masterpieces</strong>
            </h3>
          </div>
        </div>
        <div className="row mx-1">
          {images.map((src, index) => (
              <div key={index} className="col-sm-6 col-md-3 mb-1" >
                <div className="item-wrapper">
                  <img src={src} style={{margin: "auto"}} alt={`Slide ${index + 1}`} />
                </div>
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Slider;