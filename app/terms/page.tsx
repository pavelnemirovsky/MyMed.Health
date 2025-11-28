'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">Terms of Service</h1>
          <div className="legal-content">
            <p className="legal-updated">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="legal-section">
              <h2 className="legal-section-title">1. Acceptance of Terms</h2>
              <p className="legal-text">
                By accessing and using MedTracker by MyMed, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">2. Use License</h2>
              <p className="legal-text">
                Permission is granted to temporarily use MedTracker by MyMed for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">3. Medical Information</h2>
              <p className="legal-text">
                MedTracker by MyMed is designed to help you organize and manage medical information. We are not a medical service provider and do not provide medical advice, diagnosis, or treatment.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">4. User Account</h2>
              <p className="legal-text">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">5. Privacy</h2>
              <p className="legal-text">
                Your use of MedTracker by MyMed is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">6. HIPAA Compliance</h2>
              <p className="legal-text">
                We are HIPAA certified and committed to protecting your health information in accordance with applicable laws and regulations.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">7. Contact Information</h2>
              <p className="legal-text">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:support@mymed.health" className="legal-link">support@mymed.health</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

