import React from 'react';
import './footer.css';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.instagram.com"><FaInstagram /></a>
          <a href="https://www.facebook.com"><FaFacebookF /></a>
          <a href="https://www.twitter.com"><FaTwitter /></a>
        </div>
        <p>Todos os direitos reservados</p>
      </div>
    </footer>
  );
}

export default Footer;

