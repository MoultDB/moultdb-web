import React from 'react';
import "./team-section.css";
import team_photo from '../../../assets/images/sinergia_team.jpeg';
import config from '../../../config.json';

function TeamSection() {
  return (

      <section className="project-presentation-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-lg-6 image-wrapper">
              <img className="w-100" src={team_photo} alt="MoultDB Project"/>
            </div>
            <div className="col-12 col-md-12 col-lg">
              <div className="text-wrapper align-left">
                <h1 className="mbr-section-title mbr-fonts-style mb-4 display-2">
                  <strong>Our group</strong>
                </h1>
                <p className="mbr-text mbr-fonts-style mb-3 display-7">
                  MoultDB is developed by :
                  <ul>
                  {config.team.map((item) => (
                      <li>the <a href={item.link} rel="noopener noreferrer" target="_blank">{item.name}</a>
                        at {item.location}</li>
                  ))}
                  </ul>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}


export default TeamSection;