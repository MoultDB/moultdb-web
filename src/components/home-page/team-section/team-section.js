import React from 'react';
import "./team-section.css";
import image1 from '../../../assets/images/robin.jpg';
import image2 from '../../../assets/images/rob.jpg';
import image3 from '../../../assets/images/ariel.jpg';
import image4 from '../../../assets/images/daley.jpeg';


// Componente per ciascun membro del team
function TeamMember({ name, role, imageSrc }) {
  return (
    <div className="item features-image col-12 col-md-6 col-lg-3">
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

// Componente principale per la sezione del team
function TeamSection() {
  return (
    <section className="people03 cid-u64l9cqS2L" id="team-1-u64l9cqS2L">
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
          <TeamMember name="Marc Robinson-Rechavi" role="Chief Arthropologist" imageSrc={image1} />
          <TeamMember name="Robert Waterhouse" role="Genomics Guru" imageSrc={image2} />
          <TeamMember name="Ariel Chipman" role="Moulting Maestro" imageSrc={image3} />
          <TeamMember name="Allison C. Daley" role="Fossil Diva" imageSrc={image4} />
        </div>
      </div>
    </section>
  );
}

export default TeamSection;