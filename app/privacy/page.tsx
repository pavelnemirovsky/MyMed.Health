'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="legal-page">
        <div className="legal-container">
          <h1 className="legal-title">Privacy Policy</h1>
          <div className="legal-content">
            <p className="legal-updated">Last updated: {new Date().toLocaleDateString()}</p>
            
            <section className="legal-section">
              <h2 className="legal-section-title">1. Information We Collect</h2>
              <p className="legal-text">
                We collect information that you provide directly to us, including medical documents, appointment information, and other health-related data that you choose to store in your account.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">2. How We Use Your Information</h2>
              <p className="legal-text">
                We use the information we collect to provide, maintain, and improve our services, including organizing your medical documents, sending reminders, and facilitating communication with healthcare providers.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">3. Information Sharing</h2>
              <p className="legal-text">
                We do not sell, trade, or rent your personal information to third parties. We may share information only with your explicit consent or as required by law.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">4. Data Security</h2>
              <p className="legal-text">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">5. HIPAA Compliance</h2>
              <p className="legal-text">
                We are HIPAA certified and comply with the Health Insurance Portability and Accountability Act (HIPAA) and other applicable healthcare privacy laws. Your health information is protected according to these standards.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">6. Your Rights</h2>
              <p className="legal-text">
                You have the right to access, update, or delete your personal information at any time through your account settings or by contacting us.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">7. Contact Us</h2>
              <p className="legal-text">
                If you have any questions about this Privacy Policy, please contact us at{' '}
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

