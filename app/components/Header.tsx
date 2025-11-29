'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session, status } = useSession();

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
          <Link href={session?.user ? "/dashboard" : "/#dashboard"} className="header-nav-link">Dashboard</Link>
          <Link href="/#calendar" className="header-nav-link">Calendar</Link>
          <Link href="/#patients" className="header-nav-link">Patients</Link>
          <Link href="/#documents" className="header-nav-link">Documents</Link>
          <Link href="/about" className="header-nav-link">About</Link>
          <Link href="/#faq" className="header-nav-link">FAQ</Link>
        </nav>
        <div className="header-right">
          {status === 'loading' ? (
            <div className="header-button header-button-primary" style={{ opacity: 0.5 }}>
              Loading...
            </div>
          ) : session?.user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link href="/dashboard" className="header-user-avatar">
                {session.user.image ? (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || 'User'} 
                    style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                  />
                ) : (
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: '#059669',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '0.875rem'
                  }}>
                    {session.user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </Link>
            </div>
          ) : (
            <Link href="/login" className="header-button header-button-primary">Sign In</Link>
          )}
        </div>
      </div>
    </header>
  );
}

