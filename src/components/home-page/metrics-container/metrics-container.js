import React from 'react';
import "./metrics-container.css";

function MetricItem({ count, label }) {
  return (
    <div className="item features-without-image col-12 col-md-6 col-lg-4">
      <div className="item-wrapper">
        <div className="card-box align-left">
          <h5 className="card-title mbr-fonts-style display-1">
            <strong>{count}</strong>
          </h5>
          <p className="card-text mbr-fonts-style mb-3 display-7">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}


function MetricsContainer() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <MetricItem count="10M+" label="Genomic Entries" />
        <MetricItem count="500+" label="Arthropod Species" />
        <MetricItem count="100TB+" label="Data Stored" />
      </div>
    </div>
  );
}

export default MetricsContainer;
