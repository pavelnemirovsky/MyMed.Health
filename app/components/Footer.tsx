import Link from 'next/link';

export default function Footer() {
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
              <li><Link href="/report">Report a Scam</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/resources">Resources</Link></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="footer-section">
            <h3 className="footer-section-title">Contacts</h3>
            <ul className="footer-links">
              <li>
                <a href="mailto:info@stopscamsnow.com">info@stopscamsnow.com</a>
              </li>
              <li>
                <a href="mailto:report@stopscamsnow.com">report@stopscamsnow.com</a>
              </li>
              <li>
                <a href="tel:+1234567890">+1 (234) 567-890</a>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div className="footer-section">
            <h3 className="footer-section-title">Connect With Us</h3>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Facebook">Facebook</a>
              <a href="#" className="footer-social-link" aria-label="Twitter">Twitter</a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">LinkedIn</a>
              <a href="#" className="footer-social-link" aria-label="Instagram">Instagram</a>
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

