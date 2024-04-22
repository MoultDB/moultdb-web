import React from 'react';
import './social.css'

// Componente per un singolo social media item
function SocialMediaItem({ icon, link }) {
  return (
    <div className="soc-item">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <span className={`mbr-iconfont socicon ${icon}`}></span>
      </a>
    </div>
  );
}

// Componente principale per la sezione dei social media
function SocialMediaSection() {
  // Configurazione dei social media
  const socialMediaLinks = [
    { icon: 'socicon-facebook', link: '#' },
    { icon: 'socicon-twitter', link: '#' },
    { icon: 'socicon-instagram', link: '#' },
    { icon: 'socicon-mastodon', link: '#' },
    { icon: 'socicon-twitch', link: '#' },
  ];

  return (
    <section className="social05 cid-u64l9cqTY6" id="follow-us-2-u64l9cqTY6">
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
