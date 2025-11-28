'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="about-page">
        <div className="container">
          {/* Hero Section */}
          <section className="about-hero">
            <h1 className="about-title">About Us</h1>
            <p className="about-subtitle">
              Born from personal experience, built with care
            </p>
          </section>

          {/* Our Story Section */}
          <section className="about-section">
            <div className="about-content">
              <h2 className="about-section-title">Our Story</h2>
              <p className="about-text">
                The service has been created by two individuals who have been supporting their family members with different types of cancers for more than 15 years.
              </p>
              <p className="about-text">
                Through years of managing complex medical care, navigating multiple specialists, tracking countless appointments, organizing medical documents, and coordinating care across different healthcare systems, we experienced firsthand how overwhelming and stressful it can be to manage serious medical conditions.
              </p>
              <p className="about-text">
                We created MedTracker by MyMed because we believe that managing complex medical care shouldn&apos;t add to your stress. Our platform brings together everything you need—document organization, appointment tracking, reminders, and access to trusted medical providers—in one simple, secure place.
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="about-section section-alt">
            <div className="about-content">
              <h2 className="about-section-title">Our Mission</h2>
              <p className="about-text">
                To simplify complex medical care management for patients and caregivers, reducing stress and ensuring nothing falls through the cracks. We work with Medical Care Providers in USA, Israel, and Europe to connect you with trusted specialists and help arrange second opinions when needed.
              </p>
              <p className="about-text">
                We also take care of medical insurance while you travel, ensuring you&apos;re covered wherever your medical journey takes you.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="about-section">
            <div className="about-content">
              <h2 className="about-section-title">Our Values</h2>
              <div className="about-values-grid">
                <div className="about-value-card">
                  <div className="about-value-icon">❤️</div>
                  <h3 className="about-value-title">Empathy</h3>
                  <p className="about-value-text">We understand what you&apos;re going through because we&apos;ve been there ourselves.</p>
                </div>
                <div className="about-value-card">
                  <div className="about-value-icon">🔒</div>
                  <h3 className="about-value-title">Security</h3>
                  <p className="about-value-text">HIPAA certified and committed to protecting your medical information with the highest security standards.</p>
                </div>
                <div className="about-value-card">
                  <div className="about-value-icon">🌍</div>
                  <h3 className="about-value-title">Global Reach</h3>
                  <p className="about-value-text">Working with trusted Medical Care Providers across USA, Israel, and Europe.</p>
                </div>
                <div className="about-value-card">
                  <div className="about-value-icon">✨</div>
                  <h3 className="about-value-title">Simplicity</h3>
                  <p className="about-value-text">Designed to reduce cognitive load. Clean, intuitive interface that guides you step by step.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="about-section section-alt">
            <div className="about-content">
              <h2 className="about-section-title">Get in Touch</h2>
              <p className="about-text">
                Have questions or want to learn more? We&apos;re here to help.
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
