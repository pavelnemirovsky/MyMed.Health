'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  // useSession will return { data: null, status: 'unauthenticated' } if SessionProvider is not available
  const sessionResult = useSession();
  const session = sessionResult?.data ?? null;
  const status = sessionResult?.status ?? 'unauthenticated';
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle hash on page load with proper offset
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash.substring(1);
        const element = document.getElementById(hash);
        if (element) {
          const headerHeight = window.innerWidth <= 768 ? 56 : 64;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerHeight - 20;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [pathname]);

  return (
    <>
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
            <Link 
              href={pathname === `/${locale}` || pathname === `/${locale}/` ? `/${locale}#dashboard` : (session?.user ? `/${locale}/dashboard` : `/${locale}#dashboard`)}
              className="header-nav-link"
              onClick={(e) => {
                // If on homepage, always scroll to section
                if (pathname === `/${locale}` || pathname === `/${locale}/`) {
                  e.preventDefault();
                  const element = document.getElementById('dashboard');
                  if (element) {
                    const headerHeight = window.innerWidth <= 768 ? 56 : 64;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    window.history.pushState(null, '', `/${locale}#dashboard`);
                  }
                }
              }}
            >
              {t('services')}
            </Link>
            <Link href={`/${locale}#documents`} className="header-nav-link">{t('howItWorks')}</Link>
            <Link href={`/${locale}#why-choose-us`} className="header-nav-link">{t('whyChooseUs')}</Link>
            <Link href={`/${locale}#pricing`} className="header-nav-link">{t('pricing')}</Link>
            <Link href={`/${locale}#testimonials`} className="header-nav-link">{t('testimonials')}</Link>
            <Link href={`/${locale}#faq`} className="header-nav-link">{t('faq')}</Link>
          </nav>
          <div className="header-right">
            <div className="header-right-desktop">
              <LanguageSwitcher />
              {status === 'loading' ? (
                <div className="header-button header-button-primary" style={{ 
                  opacity: 0.5, 
                  whiteSpace: 'nowrap',
                  minWidth: '90px',
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
                    minWidth: '90px',
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
                    minWidth: '90px',
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
            <button 
              className="header-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="header-mobile-menu-overlay"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <nav className={`header-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="header-mobile-menu-content">
          <Link 
            href={`/${locale}#dashboard`} 
            className="header-mobile-nav-link"
            onClick={(e) => {
              // If on homepage, scroll to section; otherwise navigate to dashboard
              if (pathname === `/${locale}` || pathname === `/${locale}/`) {
                e.preventDefault();
                setMobileMenuOpen(false);
                setTimeout(() => {
                  const element = document.getElementById('dashboard');
                  if (element) {
                    const headerHeight = 56;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                    window.history.pushState(null, '', `/${locale}#dashboard`);
                  }
                }, 300);
              } else if (session?.user) {
                // If not on homepage and logged in, navigate to dashboard
                e.preventDefault();
                setMobileMenuOpen(false);
                window.location.href = `/${locale}/dashboard`;
              } else {
                setMobileMenuOpen(false);
              }
            }}
          >
            {t('services')}
          </Link>
          <Link 
            href={`/${locale}#documents`} 
            className="header-mobile-nav-link"
            onClick={(e) => {
              const hash = e.currentTarget.hash;
              setMobileMenuOpen(false);
              // Small delay to allow menu to close before scrolling
              setTimeout(() => {
                if (hash) {
                  const element = document.getElementById(hash.substring(1));
                  if (element) {
                    const headerHeight = 56;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              }, 300);
            }}
          >
            {t('howItWorks')}
          </Link>
          <Link 
            href={`/${locale}#why-choose-us`} 
            className="header-mobile-nav-link"
            onClick={(e) => {
              const hash = e.currentTarget.hash;
              setMobileMenuOpen(false);
              setTimeout(() => {
                if (hash) {
                  const element = document.getElementById(hash.substring(1));
                  if (element) {
                    const headerHeight = 56;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              }, 300);
            }}
          >
            {t('whyChooseUs')}
          </Link>
          <Link 
            href={`/${locale}#pricing`} 
            className="header-mobile-nav-link"
            onClick={(e) => {
              const hash = e.currentTarget.hash;
              setMobileMenuOpen(false);
              setTimeout(() => {
                if (hash) {
                  const element = document.getElementById(hash.substring(1));
                  if (element) {
                    const headerHeight = 56;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              }, 300);
            }}
          >
            {t('pricing')}
          </Link>
          <Link 
            href={`/${locale}#testimonials`} 
            className="header-mobile-nav-link"
            onClick={(e) => {
              const hash = e.currentTarget.hash;
              setMobileMenuOpen(false);
              setTimeout(() => {
                if (hash) {
                  const element = document.getElementById(hash.substring(1));
                  if (element) {
                    const headerHeight = 56;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              }, 300);
            }}
          >
            {t('testimonials')}
          </Link>
          <Link 
            href={`/${locale}#faq`} 
            className="header-mobile-nav-link"
            onClick={(e) => {
              const hash = e.currentTarget.hash;
              setMobileMenuOpen(false);
              setTimeout(() => {
                if (hash) {
                  const element = document.getElementById(hash.substring(1));
                  if (element) {
                    const headerHeight = 56;
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerHeight - 20;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              }, 300);
            }}
          >
            {t('faq')}
          </Link>
          
          <div className="header-mobile-menu-divider" />
          
          <div className="header-mobile-menu-language">
            <LanguageSwitcher className="header-mobile-language-switcher" />
          </div>
          
          <div className="header-mobile-menu-divider" />
          
          {status === 'loading' ? (
            <div className="header-mobile-button header-button-primary" style={{ 
              opacity: 0.5
            }}>
              {t('loading')}
            </div>
          ) : session?.user ? (
            <Link 
              href={`/${locale}/dashboard`} 
              className="header-mobile-button header-button-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('dashboard')}
            </Link>
          ) : (
            <Link 
              href={`/${locale}/login`} 
              className="header-mobile-button header-button-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('signIn')}
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

