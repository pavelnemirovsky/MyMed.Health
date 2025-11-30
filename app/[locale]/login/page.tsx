'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export const runtime = 'edge';

interface ProviderStatus {
  google: { enabled: boolean };
  apple: { enabled: boolean };
}

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const { data: session, status } = useSession();
  const t = useTranslations('login');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [providerStatus, setProviderStatus] = useState<ProviderStatus>({
    google: { enabled: false },
    apple: { enabled: false },
  });
  const [isCheckingProviders, setIsCheckingProviders] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      router.push(`/${locale}/dashboard`);
    }
  }, [status, session, router, locale]);

  useEffect(() => {
    async function checkProviders() {
      try {
        const response = await fetch('/api/auth/providers');
        if (response.ok) {
          const data = await response.json();
          setProviderStatus(data);
        }
      } catch (err) {
        console.error('Failed to check provider status:', err);
      } finally {
        setIsCheckingProviders(false);
      }
    }
    checkProviders();
  }, []);

  if (status === 'authenticated' && session?.user) {
    return null;
  }

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    if (!acceptedTerms || !acceptedPrivacy) {
      setError(t('acceptBothError'));
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      if (provider === 'google') {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('acceptedTerms', 'true');
          sessionStorage.setItem('acceptedPrivacy', 'true');
        }
        
        await signIn('google', {
          callbackUrl: `/${locale}/dashboard`,
          redirect: true,
        });
      } else {
        setError(t('appleComingSoon'));
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError(t('errorOccurred'));
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="login-page">
        <div className="login-container">
          <div className="login-card">
            <div className="login-header">
              <h1 className="login-title">{t('title')}</h1>
              <p className="login-subtitle">
                {t('subtitle')}
              </p>
            </div>

            <div className="login-social-buttons">
              <button
                onClick={() => handleSocialLogin('google')}
                className="btn-social btn-google"
                type="button"
                disabled={isLoading || isCheckingProviders || !providerStatus.google.enabled}
                title={!providerStatus.google.enabled ? 'Google OAuth is not configured' : ''}
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  minWidth: '320px',
                  margin: '0 auto',
                  whiteSpace: 'nowrap'
                }}
              >
                <svg className="btn-social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c.13-.32.13-.68 0-1L18.16 2.5c-.13-.32-.45-.5-.78-.5h-4.76c-.33 0-.65.18-.78.5L7.44 11.25c-.13.32-.13.68 0 1l4.4 9.75c.13.32.45.5.78.5h4.76c.33 0 .65-.18.78-.5l4.4-9.75zM12 7.5l2.5 5.5h-5l2.5-5.5z" fill="currentColor"/>
                </svg>
                {isLoading ? t('connecting') : isCheckingProviders ? t('checking') : t('continueWithGoogle')}
              </button>

              <button
                onClick={() => handleSocialLogin('apple')}
                className="btn-social btn-apple"
                type="button"
                disabled={isLoading || isCheckingProviders || !providerStatus.apple.enabled}
                title={!providerStatus.apple.enabled ? 'Apple OAuth is not configured' : ''}
                style={{
                  width: '100%',
                  maxWidth: '320px',
                  minWidth: '320px',
                  margin: '0 auto',
                  whiteSpace: 'nowrap'
                }}
              >
                <svg className="btn-social-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor"/>
                </svg>
                {isLoading ? t('connecting') : isCheckingProviders ? t('checking') : t('continueWithApple')}
              </button>
            </div>

            <div className="login-legal">
              <div className="login-checkbox-group">
                <label className="login-checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="login-checkbox"
                    required
                  />
                  <span className="login-checkbox-text">
                    {t('acceptTerms')}{' '}
                    <Link href={`/${locale}/terms`} className="login-link" target="_blank">
                      {t('termsOfService')}
                    </Link>
                  </span>
                </label>
              </div>

              <div className="login-checkbox-group">
                <label className="login-checkbox-label">
                  <input
                    type="checkbox"
                    checked={acceptedPrivacy}
                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                    className="login-checkbox"
                    required
                  />
                  <span className="login-checkbox-text">
                    {t('acceptTerms')}{' '}
                    <Link href={`/${locale}/privacy`} className="login-link" target="_blank">
                      {t('privacyPolicy')}
                    </Link>
                  </span>
                </label>
              </div>
            </div>

            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <div className="login-trust">
              <div className="login-trust-badge">
                <span className="trust-badge-icon">🛡️</span>
                <span className="trust-badge-text">{t('trustNote')}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

