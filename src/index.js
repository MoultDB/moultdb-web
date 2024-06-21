import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from './App';
// import "./assets/bootstrap/css/bootstrap-grid.min.css";
// import "./assets/bootstrap/css/bootstrap-reboot.min.css";
// import "./assets/bootstrap/css/bootstrap.min.css";
// FIXME should be kept?
import "./assets/dropdown/css/style.css";
import "./assets/socicon/css/styles.css";
import "./assets/theme/css/style.css";
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById('moultdb-content'));
root.render(<App />);
