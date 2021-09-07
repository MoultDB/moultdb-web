import React from 'react';
import './hero.css';
import logo from '../../../assets/images/moultdb_logo_green.png';

export default function Hero() {
  return (
      <div className="moultdb-hero">
          <img src={logo} className="moultdb-logo m-2" alt="MoultDB logo" />
          <h1>MoultDB: the arthropod moulting database</h1>
      </div>
  );
}