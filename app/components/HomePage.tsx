'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Header from './Header';
import Footer from './Footer';

export default function HomePage() {
  const locale = useLocale();
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: t('faq1Q'),
      answer: t('faq1A'),
    },
    {
      question: t('faq2Q'),
      answer: t('faq2A'),
    },
    {
      question: t('faq3Q'),
      answer: t('faq3A'),
    },
    {
      question: t('faq4Q'),
      answer: t('faq4A'),
    },
    {
      question: t('faq5Q'),
      answer: t('faq5A'),
    },
    {
      question: t('faq6Q'),
      answer: t('faq6A'),
    },
    {
      question: t('faq7Q'),
      answer: t('faq7A'),
    },
    {
      question: t('faq8Q'),
      answer: t('faq8A'),
    },
  ];

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                {t('mainTitle')}<br />
                <span className="hero-title-accent">{t('mainTitleAccent')}</span>
              </h1>
              <p className="hero-description">
                {t('mainDescription')}
              </p>
              <p className="hero-providers-note">
                <strong>{t('providersNote')}</strong>
              </p>
              <div className="hero-cta">
                <Link href={`/${locale}/login`} className="btn btn-primary btn-large">
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c.13-.32.13-.68 0-1L18.16 2.5c-.13-.32-.45-.5-.78-.5h-4.76c-.33 0-.65.18-.78.5L7.44 11.25c-.13.32-.13.68 0 1l4.4 9.75c.13.32.45.5.78.5h4.76c.33 0 .65-.18.78-.5l4.4-9.75zM12 7.5l2.5 5.5h-5l2.5-5.5z" fill="currentColor"/>
                  </svg>
                  {t('loginWithSocial')}
                </Link>
                <p className="hero-cta-subnote">{t('googleOrApple')}</p>
                <p className="hero-cta-note">{t('freeToStart')}</p>
                <div className="hero-trust-badge">
                  <span className="trust-badge-icon">🛡️</span>
                  <span className="trust-badge-text">{tCommon('hipaaCertified')}</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <Image 
                src="/logo-mission.png" 
                alt="MedTracker by MyMed"
                className="hero-mission-image"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('dashboardTitle')}</h2>
            <p className="section-description">
              {t('dashboardDescription')}
            </p>
          </div>
          <div className="dashboard-features">
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3 className="feature-title">{t('patientProfiles')}</h3>
              <p className="feature-text">{t('patientProfilesDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗂️</div>
              <h3 className="feature-title">{t('documentManagement')}</h3>
              <p className="feature-text">{t('documentManagementDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">{t('calendarReminders')}</h3>
              <p className="feature-text">{t('calendarRemindersDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3 className="feature-title">{t('carePlans')}</h3>
              <p className="feature-text">{t('carePlansDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">{t('messagesNotes')}</h3>
              <p className="feature-text">{t('messagesNotesDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">{t('scanComparison')}</h3>
              <p className="feature-text">{t('scanComparisonDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="calendar" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('smartCalendar')}</h2>
            <p className="section-description">
              {t('smartCalendarDesc')}
            </p>
          </div>
          <div className="calendar-features">
            <div className="calendar-feature">
              <div className="calendar-feature-visual">
                <div className="calendar-preview">
                  <div className="calendar-month">{t('previewCalendarMonth')}</div>
                  <div className="calendar-grid">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31].map((day) => {
                      let dayClass = 'calendar-day';
                      if (day === 15) dayClass += ' has-appointment';
                      if (day === 22) dayClass += ' has-test';
                      if (day === 8) dayClass += ' overdue';
                      return (
                        <div key={day} className={dayClass}>
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="calendar-feature-content">
                <h3 className="calendar-feature-title">{t('multipleViews')}</h3>
                <ul className="calendar-feature-list">
                  {t.raw('multipleViewsList').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="calendar-feature">
              <div className="calendar-feature-content">
                <h3 className="calendar-feature-title">{t('customizableReminders')}</h3>
                <ul className="calendar-feature-list">
                  {t.raw('customizableRemindersList').map((item: string, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <p className="calendar-feature-note">
                  {t('remindersNote')}
                </p>
              </div>
              <div className="calendar-feature-visual">
                <div className="reminder-preview">
                  <div className="reminder-item">
                    <div className="reminder-icon">🔬</div>
                    <div className="reminder-content">
                      <div className="reminder-title">{t('previewReminderMRI')}</div>
                      <div className="reminder-time">{t('previewReminderTimeTomorrow')}</div>
                    </div>
                  </div>
                  <div className="reminder-item">
                    <div className="reminder-icon">🏥</div>
                    <div className="reminder-content">
                      <div className="reminder-title">{t('previewReminderPT')}</div>
                      <div className="reminder-time">{t('previewReminderTimeMarch22')}</div>
                    </div>
                  </div>
                  <div className="reminder-item">
                    <div className="reminder-icon">📊</div>
                    <div className="reminder-content">
                      <div className="reminder-title">{t('previewReminderAnalyses')}</div>
                      <div className="reminder-time">{t('previewReminderTimeMarch25')}</div>
                    </div>
                  </div>
                  <div className="reminder-item overdue">
                    <div className="reminder-icon">⚠️</div>
                    <div className="reminder-content">
                      <div className="reminder-title">{t('previewReminderSchedule')}</div>
                      <div className="reminder-time">{t('previewReminderOverdue')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Management Section */}
      <section id="documents" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('organizedDocuments')}</h2>
            <p className="section-description">
              {t('organizedDocumentsDesc')}
            </p>
          </div>
          <div className="document-features">
            <div className="document-feature-grid">
              <div className="document-feature">
                <div className="document-feature-icon">📤</div>
                <h3 className="document-feature-title">{t('dragDrop')}</h3>
                <p className="document-feature-text">{t('dragDropDesc')}</p>
              </div>
              <div className="document-feature">
                <div className="document-feature-icon">📁</div>
                <h3 className="document-feature-title">{t('autoOrganized')}</h3>
                <p className="document-feature-text">{t('autoOrganizedDesc')}</p>
              </div>
              <div className="document-feature">
                <div className="document-feature-icon">🔍</div>
                <h3 className="document-feature-title">{t('sideBySide')}</h3>
                <p className="document-feature-text">{t('sideBySideDesc')}</p>
              </div>
              <div className="document-feature">
                <div className="document-feature-icon">🏷️</div>
                <h3 className="document-feature-title">{t('smartTagging')}</h3>
                <p className="document-feature-text">{t('smartTaggingDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('howItWorks')}</h2>
            <p className="section-description">
              {t('howItWorksDesc')}
            </p>
          </div>
          <div className="how-it-works">
            <div className="step-card">
              <div className="step-icon">🔐</div>
              <h3 className="step-title">{t('step1Title')}</h3>
              <p className="step-text">{t('step1Desc')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon">👤</div>
              <h3 className="step-title">{t('step2Title')}</h3>
              <p className="step-text">{t('step2Desc')}</p>
            </div>
            <div className="step-card">
              <div className="step-icon">📊</div>
              <h3 className="step-title">{t('step3Title')}</h3>
              <p className="step-text">{t('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('whyChooseUs')}</h2>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">😌</div>
              <h3 className="benefit-title">{t('lessStress')}</h3>
              <p className="benefit-text">{t('lessStressDesc')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h3 className="benefit-title">{t('allPapers')}</h3>
              <p className="benefit-text">{t('allPapersDesc')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✅</div>
              <h3 className="benefit-title">{t('neverMiss')}</h3>
              <p className="benefit-text">{t('neverMissDesc')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">👨‍⚕️</div>
              <h3 className="benefit-title">{t('globalNetwork')}</h3>
              <p className="benefit-text">{t('globalNetworkDesc')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💬</div>
              <h3 className="benefit-title">{t('easierCommunication')}</h3>
              <p className="benefit-text">{t('easierCommunicationDesc')}</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✈️</div>
              <h3 className="benefit-title">{t('travelInsurance')}</h3>
              <p className="benefit-text">{t('travelInsuranceDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="pricing-tagline">{t('pricing')}</div>
            <h2 className="section-title">{t('equipMedicalCare')}</h2>
            <p className="section-description">
              {t('pricingDesc')}
            </p>
          </div>
          
          {/* Billing Toggle */}
          <div className="pricing-toggle-container">
            <div className="pricing-toggle">
              <button
                className={`pricing-toggle-button ${billingPeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                {t('monthly')}
              </button>
              <button
                className={`pricing-toggle-button ${billingPeriod === 'annual' ? 'active' : ''}`}
                onClick={() => setBillingPeriod('annual')}
              >
                {t('annual')}
              </button>
            </div>
          </div>

          <div className="pricing-grid">
            {/* Core Plan - White Card */}
            <div className="pricing-card pricing-card-core">
              <div className="pricing-header">
                <h3 className="pricing-name">{t('core')}</h3>
                <div className="pricing-audience">{t('forIndividuals')}</div>
                <p className="pricing-description">{t('coreDesc')}</p>
                <div className="pricing-price">
                  <span className="pricing-amount">${billingPeriod === 'monthly' ? '29' : '290'}</span>
                  <span className="pricing-period">/{billingPeriod === 'monthly' ? t('month') : t('year')}</span>
                </div>
              </div>
              <ul className="pricing-features">
                {t.raw('coreFeatures').map((feature: string, index: number) => (
                  <li key={index}><span className="pricing-checkmark">✓</span> {feature}</li>
                ))}
              </ul>
              <button className="btn btn-pricing-core btn-block">{t('getStarted')}</button>
            </div>

            {/* Momentum Plan - Dark Card */}
            <div className="pricing-card pricing-card-momentum">
              <div className="pricing-badge">{t('popular')}</div>
              <div className="pricing-header">
                <h3 className="pricing-name">{t('momentum')}</h3>
                <div className="pricing-audience">{t('forFamilies')}</div>
                <p className="pricing-description">{t('momentumDesc')}</p>
                <div className="pricing-price">
                  <span className="pricing-amount">${billingPeriod === 'monthly' ? '49' : '490'}</span>
                  <span className="pricing-period">/{billingPeriod === 'monthly' ? t('month') : t('year')}</span>
                </div>
              </div>
              <ul className="pricing-features">
                {t.raw('momentumFeatures').map((feature: string, index: number) => (
                  <li key={index}><span className="pricing-checkmark">✓</span> {feature}</li>
                ))}
              </ul>
              <button className="btn btn-pricing-momentum btn-block">{t('getStarted')}</button>
            </div>

            {/* Growth Plan - Blue Card */}
            <div className="pricing-card pricing-card-growth">
              <div className="pricing-header">
                <h3 className="pricing-name">{t('growth')}</h3>
                <div className="pricing-audience">{t('forCaregivers')}</div>
                <p className="pricing-description">{t('growthDesc')}</p>
                <div className="pricing-price">
                  <span className="pricing-amount">${billingPeriod === 'monthly' ? '99' : '990'}</span>
                  <span className="pricing-period">/{billingPeriod === 'monthly' ? t('month') : t('year')}</span>
                </div>
              </div>
              <ul className="pricing-features">
                {t.raw('growthFeatures').map((feature: string, index: number) => (
                  <li key={index}><span className="pricing-checkmark">✓</span> {feature}</li>
                ))}
              </ul>
              <button className="btn btn-pricing-growth btn-block">{t('getStarted')}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('trustedByCaregivers')}</h2>
            <p className="section-description">
              {t('testimonialsDesc')}
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">SM</div>
              <p className="testimonial-text">{t('testimonial1')}</p>
              <div className="testimonial-author">{t('testimonial1Author')}</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">JD</div>
              <p className="testimonial-text">{t('testimonial2')}</p>
              <div className="testimonial-author">{t('testimonial2Author')}</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">RK</div>
              <p className="testimonial-text">{t('testimonial3')}</p>
              <div className="testimonial-author">{t('testimonial3Author')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('faqTitle')}</h2>
            <p className="section-description">
              {t('faqDesc')}
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${openFaqIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
                </button>
                {openFaqIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">{t('finalCtaTitle')}</h2>
            <p className="cta-description">
              {t('finalCtaDesc')}
            </p>
            <Link href={`/${locale}/login`} className="btn btn-primary btn-large">
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c.13-.32.13-.68 0-1L18.16 2.5c-.13-.32-.45-.5-.78-.5h-4.76c-.33 0-.65.18-.78.5L7.44 11.25c-.13.32-.13.68 0 1l4.4 9.75c.13.32.45.5.78.5h4.76c.33 0 .65-.18.78-.5l4.4-9.75zM12 7.5l2.5 5.5h-5l2.5-5.5z" fill="currentColor"/>
              </svg>
              {t('startNow')}
            </Link>
            <p className="cta-note">
              {t('finalCtaNote')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

