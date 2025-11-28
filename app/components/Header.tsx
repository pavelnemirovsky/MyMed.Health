'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link href="/" className="header-brand">
            <div className="header-logo-bars">
              <div className="header-logo-bar header-logo-bar-1"></div>
              <div className="header-logo-bar header-logo-bar-2"></div>
              <div className="header-logo-bar header-logo-bar-3"></div>
            </div>
            <span className="header-brand-text">MedTracker<span className="header-brand-accent"> by MyMed</span></span>
          </Link>
        </div>
        <nav className="header-nav">
          <Link href="/#dashboard" className="header-nav-link">Dashboard</Link>
          <Link href="/#calendar" className="header-nav-link">Calendar</Link>
          <Link href="/#patients" className="header-nav-link">Patients</Link>
          <Link href="/#documents" className="header-nav-link">Documents</Link>
          <Link href="/about" className="header-nav-link">About</Link>
          <Link href="/#faq" className="header-nav-link">FAQ</Link>
        </nav>
        <div className="header-right">
          <Link href="/login" className="header-button header-button-primary">Sign In</Link>
        </div>
      </div>
    </header>
  );
}

