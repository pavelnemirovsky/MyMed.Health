'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Image 
            src="/logo.svg" 
            alt="MedTracker by MyMed" 
            className="footer-logo-img"
            width={180}
            height={54}
          />
          <p className="footer-tagline">{t('managingComplexMedicalCare')}</p>
        </div>
        
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-section-title">Menu</h3>
            <ul className="footer-links">
              <li><Link href={`/${locale}`}>{t('home')}</Link></li>
              <li><Link href={`/${locale}/about`}>{t('about')}</Link></li>
              <li><Link href={`/${locale}#dashboard`}>{t('dashboard')}</Link></li>
              <li><Link href={`/${locale}#calendar`}>{t('calendar')}</Link></li>
              <li><Link href={`/${locale}#patients`}>{t('patients')}</Link></li>
              <li><Link href={`/${locale}#documents`}>{t('documents')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">Legal</h3>
            <ul className="footer-links">
              <li><Link href={`/${locale}/privacy`}>{t('privacyPolicy')}</Link></li>
              <li><Link href={`/${locale}/terms`}>{t('termsOfService')}</Link></li>
              <li><Link href={`/${locale}/security`}>{t('security')}</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">{t('contact')}</h3>
            <ul className="footer-links">
              <li>
                <a href="mailto:support@mymed.health">support@mymed.health</a>
              </li>
              <li>
                <a href={`/${locale}/contact`}>{t('contactUs')}</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-section-title">{t('newsletter')}</h3>
            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="footer-newsletter">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('yourEmail')}
                  className="footer-newsletter-input"
                  required
                />
                <button type="submit" className="footer-newsletter-button">{t('subscribe')}</button>
              </form>
            ) : (
              <p className="footer-newsletter-success">{t('thanksForSubscribing')}</p>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-trust">
            <div className="footer-hipaa-badge">
              <span className="hipaa-badge-icon">🛡️</span>
              <span className="hipaa-badge-text">{t('hipaaCertified')}</span>
            </div>
          </div>
          <div className="footer-social">
            <a href="#" className="footer-social-link" aria-label="Facebook">Facebook</a>
            <a href="#" className="footer-social-link" aria-label="Twitter">Twitter</a>
            <a href="#" className="footer-social-link" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" className="footer-social-link" aria-label="Instagram">Instagram</a>
          </div>
          <p className="footer-copyright">© {new Date().getFullYear()} MedTracker by MyMed. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  );
}

