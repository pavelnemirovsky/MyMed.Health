'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link href="/" className="header-brand">
            <img 
              src="/logo.svg" 
              alt="MedTracker by MyMed" 
              className="header-logo"
              width="200"
              height="60"
            />
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

