'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

export default function HomePage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How do I get started?',
      answer: 'Simply login with your social account (Google or Apple) to create your account instantly. Then add your first patient profile and start organizing their medical information.',
    },
    {
      question: 'Can I manage multiple patients?',
      answer: 'Yes! You can add multiple patient profiles and easily switch between them. Perfect for caregivers managing elderly parents or families with children who have complex medical needs.',
    },
    {
      question: 'How secure is my medical information?',
      answer: 'We are HIPAA certified and take privacy and security seriously. All data is encrypted and stored securely. We comply with healthcare privacy regulations including HIPAA and never share your information.',
    },
    {
      question: 'Can I share access with family members?',
      answer: 'Yes, you can invite family members to collaborate on patient profiles. This makes it easier for families to work together in managing care.',
    },
    {
      question: 'What types of documents can I upload?',
      answer: 'You can upload medical scans (MRI, CT, PT), test results, doctor letters, hospital discharge papers, prescriptions, and any other medical documents. Our system automatically organizes them into folders.',
    },
    {
      question: 'How do reminders work?',
      answer: 'You can set up reminders for appointments, tests, medications, and follow-ups. Choose to receive notifications via email, SMS, or phone calls, and set how early you want to be alerted.',
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Our platform is fully responsive and works great on mobile devices. A dedicated mobile app is coming soon.',
    },
    {
      question: 'What if I need help?',
      answer: 'We offer support via email and have comprehensive guides to help you get started. Our goal is to make managing complex medical care as simple as possible.',
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
                Manage Complex Medical Care<br />
                <span className="hero-title-accent">Simply & Safely</span>
              </h1>
              <p className="hero-description">
                Keep all medical information organized in one place. Track appointments, manage documents, and never miss a test or follow-up. Designed for caregivers managing complex patients.
              </p>
              <p className="hero-providers-note">
                <strong>Working with Medical Care Providers</strong> in USA, Israel, and Europe
              </p>
              <div className="hero-cta">
                <Link href="/login" className="btn btn-primary btn-large">
                  <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c.13-.32.13-.68 0-1L18.16 2.5c-.13-.32-.45-.5-.78-.5h-4.76c-.33 0-.65.18-.78.5L7.44 11.25c-.13.32-.13.68 0 1l4.4 9.75c.13.32.45.5.78.5h4.76c.33 0 .65-.18.78-.5l4.4-9.75zM12 7.5l2.5 5.5h-5l2.5-5.5z" fill="currentColor"/>
                  </svg>
                  Login with social Account
                </Link>
                <p className="hero-cta-subnote">Google or Apple</p>
                <p className="hero-cta-note">Free to start • No credit card required</p>
                <div className="hero-trust-badge">
                  <span className="trust-badge-icon">🛡️</span>
                  <span className="trust-badge-text">HIPAA Certified</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="dashboard-preview">
                <div className="dashboard-preview-header">
                  <div className="dashboard-preview-dot"></div>
                  <div className="dashboard-preview-dot"></div>
                  <div className="dashboard-preview-dot"></div>
                </div>
                <div className="dashboard-preview-content">
                  <div className="patient-card-preview">
                    <div className="patient-card-avatar">JD</div>
                    <div className="patient-card-info">
                      <div className="patient-card-name">John Doe</div>
                      <div className="patient-card-meta">3 upcoming appointments</div>
                    </div>
                  </div>
                  <div className="dashboard-preview-grid">
                    <div className="preview-item">
                      <div className="preview-icon">🗂️</div>
                      <div className="preview-label">Documents</div>
                    </div>
                    <div className="preview-item">
                      <div className="preview-icon">📅</div>
                      <div className="preview-label">Calendar</div>
                    </div>
                    <div className="preview-item">
                      <div className="preview-icon">💊</div>
                      <div className="preview-label">Medications</div>
                    </div>
                    <div className="preview-item">
                      <div className="preview-icon">📋</div>
                      <div className="preview-label">Care Plan</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Your Medical Dashboard</h2>
            <p className="section-description">
              Everything you need to manage complex medical care in one simple place
            </p>
          </div>
          <div className="dashboard-features">
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h3 className="feature-title">Patient Profiles</h3>
              <p className="feature-text">Create profiles for each patient with photos or initials. Quick access to all their medical information.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗂️</div>
              <h3 className="feature-title">Document Management</h3>
              <p className="feature-text">Organize scans, test results, and medical records. Auto-organized folders make finding what you need effortless.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3 className="feature-title">Calendar & Reminders</h3>
              <p className="feature-text">Never miss an appointment or test. Set reminders via email, SMS, or phone calls.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3 className="feature-title">Care Plans & Second Opinion</h3>
              <p className="feature-text">Track treatment plans, medications, and follow-ups. We also help arrange second opinions from qualified specialists when needed.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">Messages & Notes</h3>
              <p className="feature-text">Keep notes from doctor visits and important conversations. Share with family members easily.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Scan Comparison</h3>
              <p className="feature-text">Compare MRI, CT, and PT scans side-by-side to track progress over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section id="calendar" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Smart Calendar & Reminders</h2>
            <p className="section-description">
              Stay on top of appointments, tests, and follow-ups with our intelligent reminder system
            </p>
          </div>
          <div className="calendar-features">
            <div className="calendar-feature">
              <div className="calendar-feature-visual">
                <div className="calendar-preview">
                  <div className="calendar-month">March 2025</div>
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
                <h3 className="calendar-feature-title">Multiple Views</h3>
                <ul className="calendar-feature-list">
                  <li>Monthly view with color-coded tags</li>
                  <li>Weekly focus for upcoming 7 days</li>
                  <li>Timeline view showing actions in order</li>
                </ul>
              </div>
            </div>
            <div className="calendar-feature">
              <div className="calendar-feature-content">
                <h3 className="calendar-feature-title">Customizable Reminders</h3>
                <ul className="calendar-feature-list">
                  <li>Email reminders</li>
                  <li>SMS notifications</li>
                  <li>Phone call alerts</li>
                  <li>Set how early you want alerts (1 day, 1 hour, etc.)</li>
                </ul>
                <p className="calendar-feature-note">
                  Overdue tasks are marked gently so you stay informed without feeling overwhelmed.
                </p>
              </div>
              <div className="calendar-feature-visual">
                <div className="reminder-preview">
                  <div className="reminder-item">
                    <div className="reminder-icon">🔬</div>
                    <div className="reminder-content">
                      <div className="reminder-title">MRI Test</div>
                      <div className="reminder-time">Tomorrow at 2:00 PM</div>
                    </div>
                  </div>
                  <div className="reminder-item">
                    <div className="reminder-icon">🏥</div>
                    <div className="reminder-content">
                      <div className="reminder-title">PT CT Scan</div>
                      <div className="reminder-time">March 22, 9:00 AM</div>
                    </div>
                  </div>
                  <div className="reminder-item">
                    <div className="reminder-icon">📊</div>
                    <div className="reminder-content">
                      <div className="reminder-title">Analyses Review</div>
                      <div className="reminder-time">March 25, 10:00 AM</div>
                    </div>
                  </div>
                  <div className="reminder-item overdue">
                    <div className="reminder-icon">⚠️</div>
                    <div className="reminder-content">
                      <div className="reminder-title">Schedule Next Appointment</div>
                      <div className="reminder-time">Overdue - March 8</div>
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
            <h2 className="section-title">Organized Document Management</h2>
            <p className="section-description">
              Keep all medical documents organized and easily accessible
            </p>
          </div>
          <div className="document-features">
            <div className="document-feature-grid">
              <div className="document-feature">
                <div className="document-feature-icon">📤</div>
                <h3 className="document-feature-title">Drag & Drop Upload</h3>
                <p className="document-feature-text">Simply drag files into the system. No complicated forms or steps.</p>
              </div>
              <div className="document-feature">
                <div className="document-feature-icon">📁</div>
                <h3 className="document-feature-title">Auto-Organized Folders</h3>
                <p className="document-feature-text">Documents automatically sorted into MRI, CT, PT, blood tests, doctor letters, hospital discharge, and prescriptions.</p>
              </div>
              <div className="document-feature">
                <div className="document-feature-icon">🔍</div>
                <h3 className="document-feature-title">Side-by-Side Comparison</h3>
                <p className="document-feature-text">Compare scans over time to track progress and changes.</p>
              </div>
              <div className="document-feature">
                <div className="document-feature-icon">🏷️</div>
                <h3 className="document-feature-title">Smart Tagging</h3>
                <p className="document-feature-text">Tag documents as "urgent," "for doctor," or "follow up" for easy organization.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Get started in three simple steps
            </p>
          </div>
          <div className="how-it-works">
            <div className="step-card">
              <div className="step-icon">🔐</div>
              <h3 className="step-title">Login with your social account</h3>
              <p className="step-text">Create your account instantly with Google or Apple. No passwords to remember.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">👤</div>
              <h3 className="step-title">Create Patient Profiles</h3>
              <p className="step-text">Add patient information and start organizing their medical records.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">📊</div>
              <h3 className="step-title">Track & Manage</h3>
              <p className="step-text">Upload documents, set reminders, track appointments, and follow care plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Us</h2>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">😌</div>
              <h3 className="benefit-title">Less Stress & Simple Design</h3>
              <p className="benefit-text">Everything in one place. Clean interface that guides you step by step.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📚</div>
              <h3 className="benefit-title">All Papers in One Place</h3>
              <p className="benefit-text">All medical documents organized and searchable.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✅</div>
              <h3 className="benefit-title">Never Miss a Test</h3>
              <p className="benefit-text">Reminders ensure you never miss appointments or follow-ups.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">👨‍⚕️</div>
              <h3 className="benefit-title">Global Medical Network</h3>
              <p className="benefit-text">Medical Care Providers in USA, Israel, and Europe. Second opinions when needed.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💬</div>
              <h3 className="benefit-title">Easier Doctor Communication</h3>
              <p className="benefit-text">Share documents and information with doctors easily.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✈️</div>
              <h3 className="benefit-title">Medical Insurance While You Travel</h3>
              <p className="benefit-text">We take care of medical insurance while you travel.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="pricing-tagline">PRICING</div>
            <h2 className="section-title">Equip Your Medical Care</h2>
            <p className="section-description">
              Choose a plan that works the best for you and your team.
            </p>
          </div>
          
          {/* Billing Toggle */}
          <div className="pricing-toggle-container">
            <div className="pricing-toggle">
              <button
                className={`pricing-toggle-button ${billingPeriod === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                className={`pricing-toggle-button ${billingPeriod === 'annual' ? 'active' : ''}`}
                onClick={() => setBillingPeriod('annual')}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="pricing-grid">
            {/* Core Plan - White Card */}
            <div className="pricing-card pricing-card-core">
              <div className="pricing-header">
                <h3 className="pricing-name">Core</h3>
                <div className="pricing-audience">For individuals</div>
                <p className="pricing-description">This plan is for people who want a simple way to keep track of their medical documents and follow-ups.</p>
                <div className="pricing-price">
                  <span className="pricing-amount">${billingPeriod === 'monthly' ? '29' : '290'}</span>
                  <span className="pricing-period">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li><span className="pricing-checkmark">✓</span> One patient profile</li>
                <li><span className="pricing-checkmark">✓</span> Upload and store all medical documents</li>
                <li><span className="pricing-checkmark">✓</span> Organized folders for MRI, CT, PT, blood tests and doctor letters</li>
                <li><span className="pricing-checkmark">✓</span> Full medical calendar</li>
                <li><span className="pricing-checkmark">✓</span> Email reminders for appointments, tests and follow-ups</li>
                <li><span className="pricing-checkmark">✓</span> Basic second-opinion request</li>
                <li><span className="pricing-checkmark">✓</span> Social account login (Google, Apple)</li>
                <li><span className="pricing-checkmark">✓</span> Mobile-friendly access</li>
                <li><span className="pricing-checkmark">✓</span> Secure private storage</li>
              </ul>
              <button className="btn btn-pricing-core btn-block">Get Started</button>
            </div>

            {/* Momentum Plan - Dark Card */}
            <div className="pricing-card pricing-card-momentum">
              <div className="pricing-badge">Popular</div>
              <div className="pricing-header">
                <h3 className="pricing-name">Momentum</h3>
                <div className="pricing-audience">For families</div>
                <p className="pricing-description">This plan is for growing families who need to manage several medical journeys at once.</p>
                <div className="pricing-price">
                  <span className="pricing-amount">${billingPeriod === 'monthly' ? '49' : '490'}</span>
                  <span className="pricing-period">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li><span className="pricing-checkmark">✓</span> Up to five patient profiles</li>
                <li><span className="pricing-checkmark">✓</span> Everything in Core</li>
                <li><span className="pricing-checkmark">✓</span> SMS and phone reminders</li>
                <li><span className="pricing-checkmark">✓</span> Shared family dashboard</li>
                <li><span className="pricing-checkmark">✓</span> Side-by-side document comparison</li>
                <li><span className="pricing-checkmark">✓</span> Priority second-opinion handling</li>
                <li><span className="pricing-checkmark">✓</span> Shared notes between family members</li>
                <li><span className="pricing-checkmark">✓</span> Custom tags like urgent, follow-up, discuss-with-doctor</li>
                <li><span className="pricing-checkmark">✓</span> Early alerts for missing or overdue tests</li>
                <li><span className="pricing-checkmark">✓</span> Ability to share files with doctors or caregivers</li>
              </ul>
              <button className="btn btn-pricing-momentum btn-block">Get Started</button>
            </div>

            {/* Growth Plan - Blue Card */}
            <div className="pricing-card pricing-card-growth">
              <div className="pricing-header">
                <h3 className="pricing-name">Growth</h3>
                <div className="pricing-audience">For caregivers</div>
                <p className="pricing-description">This plan is for caregivers managing ongoing or complicated medical situations. It includes the full set of professional tools.</p>
                <div className="pricing-price">
                  <span className="pricing-amount">${billingPeriod === 'monthly' ? '99' : '990'}</span>
                  <span className="pricing-period">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                </div>
              </div>
              <ul className="pricing-features">
                <li><span className="pricing-checkmark">✓</span> Unlimited patient profiles</li>
                <li><span className="pricing-checkmark">✓</span> Everything in Momentum</li>
                <li><span className="pricing-checkmark">✓</span> Advanced analytics for trends in MRI, CT, PT and blood tests</li>
                <li><span className="pricing-checkmark">✓</span> Care-plan builder and tracking</li>
                <li><span className="pricing-checkmark">✓</span> Task lists for each patient</li>
                <li><span className="pricing-checkmark">✓</span> Full reminder center (email, SMS, phone automation)</li>
                <li><span className="pricing-checkmark">✓</span> Priority support and faster second-opinion turnaround</li>
                <li><span className="pricing-checkmark">✓</span> Detailed timeline view with upcoming medical actions</li>
                <li><span className="pricing-checkmark">✓</span> Secure sharing with multiple doctors and specialists</li>
                <li><span className="pricing-checkmark">✓</span> Printable medical summaries for clinic visits</li>
                <li><span className="pricing-checkmark">✓</span> Exportable reports for long-term tracking</li>
              </ul>
              <button className="btn btn-pricing-growth btn-block">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Trusted by Caregivers</h2>
            <p className="section-description">
              See what families are saying about MedTracker by MyMed
            </p>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">SM</div>
              <p className="testimonial-text">"Finally, all my mom's medical papers are organized. I can find anything in seconds."</p>
              <div className="testimonial-author">Sarah M., Caregiver</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">JD</div>
              <p className="testimonial-text">"The reminders saved us from missing an important test. This platform is a lifesaver."</p>
              <div className="testimonial-author">John D., Managing Parent Care</div>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-avatar">RK</div>
              <p className="testimonial-text">"Managing my child's complex medical needs became so much easier. Everything is in one place."</p>
              <div className="testimonial-author">Rachel K., Parent</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-faq">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-description">
              Everything you need to know about MedTracker by MyMed
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
            <h2 className="cta-title">Start Managing Medical Care Simply</h2>
            <p className="cta-description">
              Join caregivers who are simplifying complex medical management
            </p>
            <Link href="/login" className="btn btn-primary btn-large">
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c.13-.32.13-.68 0-1L18.16 2.5c-.13-.32-.45-.5-.78-.5h-4.76c-.33 0-.65.18-.78.5L7.44 11.25c-.13.32-.13.68 0 1l4.4 9.75c.13.32.45.5.78.5h4.76c.33 0 .65-.18.78-.5l4.4-9.75zM12 7.5l2.5 5.5h-5l2.5-5.5z" fill="currentColor"/>
              </svg>
              Start now with your social account
            </Link>
            <p className="cta-note">
              HIPAA Certified • Your data is encrypted and secure. We never share your medical information.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

