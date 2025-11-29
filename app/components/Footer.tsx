'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img 
            src="/logo.svg" 
            alt="MedTracker by MyMed" 
            className="footer-logo-img"
            width="180"
            height="54"
          />
          <p className="footer-tagline">Managing complex medical care, simply.</p>
        </div>
        
        <div className="footer-grid">
          {/* Menu */}
          <div className="footer-section">
            <h3 className="footer-section-title">Menu</h3>
            <ul className="footer-links">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="#dashboard">Dashboard</Link></li>
              <li><Link href="#calendar">Calendar</Link></li>
              <li><Link href="#patients">Patients</Link></li>
              <li><Link href="#documents">Documents</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-section">
            <h3 className="footer-section-title">Legal</h3>
            <ul className="footer-links">
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/security">Security</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h3 className="footer-section-title">Contact</h3>
            <ul className="footer-links">
              <li>
                <a href="mailto:support@mymed.health">support@mymed.health</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-section">
            <h3 className="footer-section-title">Newsletter</h3>
            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="footer-newsletter">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="footer-newsletter-input"
                  required
                />
                <button type="submit" className="footer-newsletter-button">Subscribe</button>
              </form>
            ) : (
              <p className="footer-newsletter-success">Thanks for subscribing!</p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-trust">
            <div className="footer-hipaa-badge">
              <span className="hipaa-badge-icon">🛡️</span>
              <span className="hipaa-badge-text">HIPAA Certified</span>
            </div>
          </div>
          <div className="footer-social">
            <a href="#" className="footer-social-link" aria-label="Facebook">Facebook</a>
            <a href="#" className="footer-social-link" aria-label="Twitter">Twitter</a>
            <a href="#" className="footer-social-link" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" className="footer-social-link" aria-label="Instagram">Instagram</a>
          </div>
          <p className="footer-copyright">© {new Date().getFullYear()} MedTracker by MyMed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

