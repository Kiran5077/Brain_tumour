import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      {/* Floating brains */}
      <div className="brains-floating">
        
      </div>

      <div className="footer-container">
        <div className="footer-section footer-brand">
          <h3>Brain Tumor Detection</h3>
          <p>Empowering healthcare with AI for early and accurate diagnosis.</p>
        </div>

        <div className="footer-section footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/prediction">Detection</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h4>Contact</h4>
          <p>Email: pranshujena2511@gmail.com</p>
          <p>Phone:7978120502</p>
            <p>Location:****</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tumordetect. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
