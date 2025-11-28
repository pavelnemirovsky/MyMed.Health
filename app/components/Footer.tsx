'use client';

import Link from 'next/link';

export default function Footer() {
  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, platform: string) => {
    e.preventDefault();
    alert(`Coming Soon: ${platform} will be available soon!`);
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">STOP SCAMS <span className="header-brand-red">NOW</span></div>
        </div>
        
        <div className="footer-grid">
          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-section-title">Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="footer-section">
            <h3 className="footer-section-title">Contacts</h3>
            <ul className="footer-links">
              <li>
                <a href="mailto:report@mymed.health">report@mymed.health</a>
              </li>
              <li>
                <a href="tel:+18333728311">1-833-FRAUD-11</a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="footer-section">
            <h3 className="footer-section-title">Connect With Us</h3>
            <div className="footer-social">
              <a 
                href="#" 
                className="footer-social-link" 
                aria-label="Facebook"
                onClick={(e) => handleSocialClick(e, 'Facebook')}
              >
                Facebook
              </a>
              <a 
                href="#" 
                className="footer-social-link" 
                aria-label="X"
                onClick={(e) => handleSocialClick(e, 'X')}
              >
                X
              </a>
              <a 
                href="#" 
                className="footer-social-link" 
                aria-label="LinkedIn"
                onClick={(e) => handleSocialClick(e, 'LinkedIn')}
              >
                LinkedIn
              </a>
              <a 
                href="#" 
                className="footer-social-link" 
                aria-label="Instagram"
                onClick={(e) => handleSocialClick(e, 'Instagram')}
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">© {new Date().getFullYear()} Stop Scams Now. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

