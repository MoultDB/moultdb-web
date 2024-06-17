import React from 'react';
import './social.css'

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
  const socialMediaLinks = [
    { icon: 'socicon-facebook', link: 'https://www.facebook.com/groups/402623715250579' },
    { icon: 'socicon-twitter', link: 'https://x.com/moultdb' },
    { icon: 'socicon-instagram', link: 'https://www.instagram.com/moultdb/' },
    { icon: 'socicon-mastodon', link: 'https://ecoevo.social/@moultdb' },
  ];

  return (
    <section className="solcial-media-section">
      <div className="container">
        <div className="row">
          <h3 className="mbr-section-title align-center mb-5 mbr-fonts-style display-2">
            <strong>Stay Connected with MoultDB</strong>
          </h3>
          <div className="col-12">
            <div className="social-row">
              {socialMediaLinks.map((item, index) => (
                <SocialMediaItem key={index} icon={item.icon} link={item.link} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialMediaSection;
