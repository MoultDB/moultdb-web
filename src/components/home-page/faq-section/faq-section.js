import React, { useState } from 'react';
import './faq-section.css';

function FAQItem({ id, question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="card mb-3">
      <div className="card-header" role="tab">
        <a role="button" className={`panel-title collapsed ${isOpen ? '' : 'collapsed'}`} onClick={toggleOpen} aria-expanded={isOpen}>
          <h6 className="panel-title-edit mbr-semibold mbr-fonts-style mb-0 display-5">
            {question}
          </h6>
          <span className="sign mbr-iconfont mobi-mbri-arrow-down" style={{transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}></span>
        </a>
      </div>
      <div className={`panel-collapse collapse ${isOpen ? 'show' : ''}`} role="tabpanel">
        <div className="panel-body">
          <p className="mbr-fonts-style panel-text display-7">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section className="list1 faq-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-12 col-lg-10 m-auto">
            <div className="content">
              <div className="mbr-section-head align-left mb-5">
                <h3 className="mbr-section-title mb-2 mbr-fonts-style display-2">
                  <strong>Curious Minds Ask</strong>
                </h3>
              </div>
              <div id="bootstrap-accordion_0" className="panel-group accordionStyles accordion" role="tablist" aria-multiselectable="true">
                <FAQItem id="collapse1_0" question="What is Moulting?" answer="Moulting is the process of shedding the exoskeleton to allow for growth and development in arthropods." />
                <FAQItem id="collapse2_0" question="How to Use MoultDB?" answer="Simply search for your desired arthropod species to access a wealth of information, images, and genomic data." />
                <FAQItem id="collapse3_0" question="Why Study Arthropod Genomics?" answer="Understanding arthropod genomics can provide insights into evolution, adaptation, and potential applications in various fields." />
                <FAQItem id="collapse4_0" question="Is Moulting Dangerous for Arthropods?" answer="Moulting is a crucial and natural process for arthropods, essential for their growth and survival." />
                <FAQItem id="collapse5_0" question="Can I Contribute to MoultDB?" answer="Yes, MoultDB welcomes contributions from researchers, enthusiasts, and anyone passionate about arthropods." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQSection;