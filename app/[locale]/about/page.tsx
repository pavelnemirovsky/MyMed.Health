'use client';

import { useTranslations } from 'next-intl';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <Header />

      <main className="about-page">
        <div className="container">
          <section className="about-hero">
            <h1 className="about-title">{t('title')}</h1>
            <p className="about-subtitle">
              {t('subtitle')}
            </p>
          </section>

          <section className="about-section">
            <div className="about-content">
              <h2 className="about-section-title">{t('ourStory')}</h2>
              <p className="about-text">
                {t('story1')}
              </p>
              <p className="about-text">
                {t('story2')}
              </p>
              <p className="about-text">
                {t('story3')}
              </p>
            </div>
          </section>

          <section className="about-section section-alt">
            <div className="about-content">
              <h2 className="about-section-title">{t('ourMission')}</h2>
              <p className="about-text">
                {t('mission1')}
              </p>
              <p className="about-text">
                {t('mission2')}
              </p>
            </div>
          </section>

          <section className="about-section">
            <div className="about-content">
              <h2 className="about-section-title">{t('ourValues')}</h2>
              <div className="about-values-grid">
                <div className="about-value-card">
                  <div className="about-value-icon">❤️</div>
                  <h3 className="about-value-title">{t('empathy')}</h3>
                  <p className="about-value-text">{t('empathyDesc')}</p>
                </div>
                <div className="about-value-card">
                  <div className="about-value-icon">🔒</div>
                  <h3 className="about-value-title">{t('security')}</h3>
                  <p className="about-value-text">{t('securityDesc')}</p>
                </div>
                <div className="about-value-card">
                  <div className="about-value-icon">🌍</div>
                  <h3 className="about-value-title">{t('globalReach')}</h3>
                  <p className="about-value-text">{t('globalReachDesc')}</p>
                </div>
                <div className="about-value-card">
                  <div className="about-value-icon">✨</div>
                  <h3 className="about-value-title">{t('simplicity')}</h3>
                  <p className="about-value-text">{t('simplicityDesc')}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section section-alt">
            <div className="about-content">
              <h2 className="about-section-title">{t('getInTouch')}</h2>
              <p className="about-text">
                {t('getInTouchDesc')}
              </p>
              <div className="about-contact">
                <a href="mailto:support@mymed.health" className="about-contact-link">
                  support@mymed.health
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}


