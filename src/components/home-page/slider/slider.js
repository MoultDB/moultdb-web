import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import './slider.css';

import image1 from '../../../assets/images/photo-1582003360187-e2dff91a5df5.jpeg';
import image2 from '../../../assets/images/photo-1633862168536-1a7bea3d2ec6.jpeg';
import image3 from '../../../assets/images/photo-1683083904064-433c78ad0e82.jpeg';
import image4 from '../../../assets/images/photo-1644400367717-05cffecd430d.jpeg';
import image5 from '../../../assets/images/photo-1619538212509-85d929f569ba.jpeg';

const images = [image1, image2, image3, image4, image5];

function Slider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
  });

  return (
    <section className="slider4 mbr-embla cid-u64l9coEcY" id="gallery-5-u64l9coEcY">
      <div className="container-fluid">
        <div className="row mb-5 justify-content-center">
          <div className="col-12 content-head">
            <h3 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
              <strong>Moulting Masterpieces</strong>
            </h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="embla" ref={emblaRef}>
              <div className="embla__viewport">
                <div className="embla__container">
                  {images.map((src, index) => (
                    <div className="embla__slide slider-image item" key={index} style={{ marginLeft: '1rem', marginRight: '1rem' }}>
                      <div className="slide-content">
                        <div className="item-img">
                          <div className="item-wrapper">
                            <img src={src} alt={`Slide ${index + 1}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="embla__button embla__button--prev" onClick={() => emblaApi.scrollPrev()}>
                <span className="mobi-mbri mobi-mbri-arrow-prev" aria-hidden="true"></span>
              </button>
              <button className="embla__button embla__button--next" onClick={() => emblaApi.scrollNext()}>
                <span className="mobi-mbri mobi-mbri-arrow-next" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Slider;