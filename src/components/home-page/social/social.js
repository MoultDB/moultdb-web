import React from 'react';
import './social.css'
import config from "../../../config.json";

function SocialMediaItem({ icon, link }) {
  return (
    <div className="soc-item">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <span className={`mbr-iconfont socicon ${icon}`}></span>
      </a>
    </div>
  );
}

function SocialMediaSection() {
  return (
    <section className="solcial-media-section">
      <div className="container">
        <div className="row">
          <h3 className="mbr-section-title align-center mb-5 mbr-fonts-style display-2">
            <strong>Stay Connected with MoultDB</strong>
          </h3>
          <div className="col-12">
            <div className="social-row">
              {config.socialMedia.map((item, index) => (
                <SocialMediaItem key={"hp-media-" + index} icon={item.icon} link={item.link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialMediaSection;
