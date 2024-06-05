import React from 'react';
import "./team-section.css";
import pi_photo_1 from '../../../assets/images/marc.jpg';
import pi_photo_2 from '../../../assets/images/rob.jpg';
import pi_photo_3 from '../../../assets/images/ariel.jpg';
import pi_photo_4 from '../../../assets/images/allison.jpeg';


function TeamMember({ name, role, imageSrc }) {
  return (
    <div className="item col-12 col-md-6 col-lg-3">
      <div className="item-wrapper">
        <div className="item-img mb-3">
          <img src={imageSrc} alt={name} />
        </div>
        <div className="item-content align-left">
          <h6 className="item-subtitle mbr-fonts-style display-5">
            <strong>{name}</strong>
          </h6>
          <p className="mbr-text mbr-fonts-style display-7">{role}</p>
        </div>
      </div>
    </div>
  );
}

function TeamSection() {
  return (
    <section className="team-section">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 content-head">
            <div className="mbr-section-head mb-5">
              <h4 className="mbr-section-title mbr-fonts-style align-center mb-0 display-2">
                <strong>Our group leaders</strong>
              </h4>
            </div>
          </div>
        </div>
        <div className="row">
          <TeamMember name="Marc Robinson-Rechavi" role="Chief Arthropologist" imageSrc={pi_photo_1} />
          <TeamMember name="Robert Waterhouse" role="Genomics Guru" imageSrc={pi_photo_2} />
          <TeamMember name="Ariel Chipman" role="Moulting Maestro" imageSrc={pi_photo_3} />
          <TeamMember name="Allison C. Daley" role="Fossil Diva" imageSrc={pi_photo_4} />
        </div>
      </div>
    </section>
  );
}

export default TeamSection;