'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  // useSession will return { data: null, status: 'unauthenticated' } if SessionProvider is not available
  const sessionResult = useSession();
  const session = sessionResult?.data ?? null;
  const status = sessionResult?.status ?? 'unauthenticated';
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link href={`/${locale}`} className="header-brand">
            <Image 
              src="/logo.svg" 
              alt="MedTracker by MyMed" 
              className="header-logo"
              width={200}
              height={60}
            />
          </Link>
        </div>
        <nav className="header-nav">
          <Link href={session?.user ? `/${locale}/dashboard` : `/${locale}#dashboard`} className="header-nav-link">{t('dashboard')}</Link>
          <Link href={`/${locale}#calendar`} className="header-nav-link">{t('calendar')}</Link>
          <Link href={`/${locale}#patients`} className="header-nav-link">{t('patients')}</Link>
          <Link href={`/${locale}#documents`} className="header-nav-link">{t('documents')}</Link>
          <Link href={`/${locale}/about`} className="header-nav-link">{t('about')}</Link>
          <Link href={`/${locale}#faq`} className="header-nav-link">{t('faq')}</Link>
        </nav>
        <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '120px' }}>
          <LanguageSwitcher />
          {status === 'loading' ? (
            <div className="header-button header-button-primary" style={{ 
              opacity: 0.5, 
              whiteSpace: 'nowrap',
              minWidth: '100px',
              textAlign: 'center',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {t('loading')}
            </div>
          ) : session?.user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0, width: '36px', height: '36px' }}>
              <Link href={`/${locale}/dashboard`} className="header-user-avatar">
                {session.user.image ? (
                  <Image 
                    src={session.user.image} 
                    alt={session.user.name || 'User'} 
                    width={36}
                    height={36}
                    style={{ borderRadius: '50%' }}
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
            <Link 
              href={`/${locale}/login`} 
              className="header-button header-button-primary" 
              style={{ 
                whiteSpace: 'nowrap',
                minWidth: '100px',
                width: '100px',
                textAlign: 'center',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {t('signIn')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

