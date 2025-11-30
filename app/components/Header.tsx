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
          <Link href={session?.user ? `/${locale}/dashboard` : `/${locale}#dashboard`} className="header-nav-link">{t('services')}</Link>
          <Link href={`/${locale}#documents`} className="header-nav-link">{t('howItWorks')}</Link>
          <Link href={`/${locale}#pricing`} className="header-nav-link">{t('pricing')}</Link>
          <Link href={`/${locale}#testimonials`} className="header-nav-link">{t('testimonials')}</Link>
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
            <Link 
              href={`/${locale}/dashboard`} 
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
              {t('dashboard')}
            </Link>
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

