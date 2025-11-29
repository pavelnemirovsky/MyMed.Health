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
              <h2 className="legal-section-title">1. Introduction</h2>
              <p className="legal-text">
                MedTracker by MyMed (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy and the security of your health information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our medical care management platform.
              </p>
              <p className="legal-text">
                By using MedTracker by MyMed, you agree to the collection and use of information in accordance with this policy. We are HIPAA certified and comply with all applicable healthcare privacy regulations.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">2. Information We Collect</h2>
              <h3 className="legal-subsection-title">2.1 Information You Provide</h3>
              <p className="legal-text">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="legal-list">
                <li>Account information (name, email address, profile photos)</li>
                <li>Patient profiles and medical information</li>
                <li>Medical documents (scans, test results, doctor letters, prescriptions)</li>
                <li>Appointment information and medical calendar data</li>
                <li>Notes, reminders, and care plan information</li>
                <li>Communication preferences</li>
              </ul>

              <h3 className="legal-subsection-title">2.2 Automatically Collected Information</h3>
              <p className="legal-text">
                When you use our service, we automatically collect certain information, including:
              </p>
              <ul className="legal-list">
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Usage patterns and interaction data</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">3. How We Use Your Information</h2>
              <p className="legal-text">
                We use the information we collect to:
              </p>
              <ul className="legal-list">
                <li>Provide, maintain, and improve our medical care management services</li>
                <li>Organize and manage your medical documents and information</li>
                <li>Send appointment reminders, test notifications, and follow-up alerts</li>
                <li>Facilitate communication with healthcare providers</li>
                <li>Process payments and manage your subscription</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">4. Information Sharing and Disclosure</h2>
              <p className="legal-text">
                We do not sell, trade, or rent your personal or health information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="legal-list">
                <li><strong>With Your Consent:</strong> We share information when you explicitly authorize us to do so, such as sharing documents with healthcare providers or family members.</li>
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our platform, subject to strict confidentiality agreements.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or government regulation.</li>
                <li><strong>Medical Emergencies:</strong> In emergency situations, we may share information with healthcare providers to ensure your safety.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale, your information may be transferred as part of that transaction.</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">5. Data Security</h2>
              <p className="legal-text">
                We implement industry-standard technical and organizational security measures to protect your information, including:
              </p>
              <ul className="legal-list">
                <li>End-to-end encryption for all health data</li>
                <li>Secure data storage with regular backups</li>
                <li>Access controls and authentication measures</li>
                <li>Regular security audits and assessments</li>
                <li>Employee training on data protection</li>
                <li>Compliance with HIPAA security requirements</li>
              </ul>
              <p className="legal-text">
                While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest standards.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">6. HIPAA Compliance</h2>
              <p className="legal-text">
                MedTracker by MyMed is HIPAA certified and complies with the Health Insurance Portability and Accountability Act (HIPAA) and other applicable healthcare privacy laws, including:
              </p>
              <ul className="legal-list">
                <li>HIPAA Privacy Rule</li>
                <li>HIPAA Security Rule</li>
                <li>HIPAA Breach Notification Rule</li>
                <li>State-specific healthcare privacy regulations</li>
              </ul>
              <p className="legal-text">
                As a Business Associate, we maintain Business Associate Agreements (BAAs) with healthcare providers and ensure all health information is handled according to HIPAA standards.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">7. Your Rights and Choices</h2>
              <p className="legal-text">
                You have the following rights regarding your personal and health information:
              </p>
              <ul className="legal-list">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your information (subject to legal retention requirements)</li>
                <li><strong>Portability:</strong> Request a copy of your data in a portable format</li>
                <li><strong>Restriction:</strong> Request restriction of processing your information</li>
                <li><strong>Objection:</strong> Object to certain types of processing</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
              </ul>
              <p className="legal-text">
                You can exercise these rights through your account settings or by contacting us at{' '}
                <a href="mailto:support@mymed.health" className="legal-link">support@mymed.health</a>.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">8. Data Retention</h2>
              <p className="legal-text">
                We retain your information for as long as necessary to provide our services and comply with legal obligations. Medical records may be retained longer as required by healthcare regulations. When you delete your account, we will delete or anonymize your information, except where retention is required by law.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">9. Children&apos;s Privacy</h2>
              <p className="legal-text">
                Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with information, please contact us immediately.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">10. International Users</h2>
              <p className="legal-text">
                If you are using MedTracker by MyMed from outside the United States, please note that your information may be transferred to, stored, and processed in the United States. By using our service, you consent to this transfer.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">11. Changes to This Privacy Policy</h2>
              <p className="legal-text">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use of our service after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">12. Contact Us</h2>
              <p className="legal-text">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <p className="legal-text">
                <strong>Email:</strong> <a href="mailto:support@mymed.health" className="legal-link">support@mymed.health</a><br />
                <strong>Address:</strong> MedTracker by MyMed<br />
                Privacy Officer
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

