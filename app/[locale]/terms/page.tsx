'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function TermsPage() {
  const t = useTranslations('terms');
  const tCommon = useTranslations('common');
  const locale = useLocale();

  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">{t('title')}</h1>
          <div className="legal-content">
            <p className="legal-updated">{tCommon('lastUpdated')}: {new Date().toLocaleDateString(locale)}</p>
            
            <section className="legal-section">
              <h2 className="legal-section-title">{t('section1.title')}</h2>
              <p className="legal-text">
                {t('section1.content1')}
              </p>
              <p className="legal-text">
                {t('section1.content2')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section2.title')}</h2>
              <p className="legal-text">
                {t('section2.content')}
              </p>
              <ul className="legal-list">
                {t.raw('section2.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section3.title')}</h2>
              <p className="legal-text">
                <strong>{t('section3.content1')}</strong>
              </p>
              <ul className="legal-list">
                {t.raw('section3.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p className="legal-text">
                {t('section3.content2')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section4.title')}</h2>
              <h3 className="legal-subsection-title">{t('section4.subsection1')}</h3>
              <p className="legal-text">
                {t('section4.content1')}
              </p>

              <h3 className="legal-subsection-title">{t('section4.subsection2')}</h3>
              <p className="legal-text">
                {t('section4.content2')}
              </p>
              <ul className="legal-list">
                {t.raw('section4.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              <h3 className="legal-subsection-title">{t('section4.subsection3')}</h3>
              <p className="legal-text">
                {t('section4.content3')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section5.title')}</h2>
              <p className="legal-text">
                {t('section5.content')}
              </p>
              <ul className="legal-list">
                {t.raw('section5.list').map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section6.title')}</h2>
              <h3 className="legal-subsection-title">{t('section6.subsection1')}</h3>
              <p className="legal-text">
                {t('section6.content1')}
              </p>

              <h3 className="legal-subsection-title">{t('section6.subsection2')}</h3>
              <p className="legal-text">
                {t('section6.content2')}
              </p>

              <h3 className="legal-subsection-title">{t('section6.subsection3')}</h3>
              <p className="legal-text">
                {t('section6.content3')}
              </p>

              <h3 className="legal-subsection-title">{t('section6.subsection4')}</h3>
              <p className="legal-text">
                {t('section6.content4')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section7.title')}</h2>
              <p className="legal-text">
                {t('section7.content1')}
              </p>
              <p className="legal-text">
                {t('section7.content2')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section8.title')}</h2>
              <p className="legal-text">
                {t('section8.content1')}
              </p>
              <p className="legal-text">
                {t('section8.content2')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section9.title')}</h2>
              <h3 className="legal-subsection-title">{t('section9.subsection1')}</h3>
              <p className="legal-text">
                {t('section9.content1')}
              </p>

              <h3 className="legal-subsection-title">{t('section9.subsection2')}</h3>
              <p className="legal-text">
                {t('section9.content2')}
              </p>

              <h3 className="legal-subsection-title">{t('section9.subsection3')}</h3>
              <p className="legal-text">
                {t('section9.content3')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section10.title')}</h2>
              <p className="legal-text">
                {t('section10.content')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section11.title')}</h2>
              <p className="legal-text">
                {t('section11.content')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section12.title')}</h2>
              <p className="legal-text">
                {t('section12.content')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section13.title')}</h2>
              <p className="legal-text">
                {t('section13.content')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section14.title')}</h2>
              <p className="legal-text">
                {t('section14.content')}
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">{t('section15.title')}</h2>
              <p className="legal-text">
                {t('section15.content1')}
              </p>
              <p className="legal-text">
                <strong>{t('section15.email')}</strong> <a href="mailto:support@mymed.health" className="legal-link">support@mymed.health</a><br />
                <strong>{t('section15.address')}</strong> {t('section15.addressValue')}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


