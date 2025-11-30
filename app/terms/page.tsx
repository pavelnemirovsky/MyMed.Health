'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

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
                Welcome to MedTracker by MyMed. These Terms of Service (&quot;Terms&quot;) govern your access to and use of our medical care management platform, including our website, mobile applications, and related services (collectively, the &quot;Service&quot;).
              </p>
              <p className="legal-text">
                By accessing or using MedTracker by MyMed, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not use our Service.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">2. Description of Service</h2>
              <p className="legal-text">
                MedTracker by MyMed is a medical care management platform that helps individuals and caregivers organize medical documents, track appointments, manage reminders, and coordinate healthcare information. Our Service includes:
              </p>
              <ul className="legal-list">
                <li>Document storage and organization</li>
                <li>Medical calendar and appointment tracking</li>
                <li>Reminder notifications (email, SMS, phone)</li>
                <li>Patient profile management</li>
                <li>Care plan tracking</li>
                <li>Communication tools for healthcare coordination</li>
                <li>Second opinion arrangement services</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">3. Not a Medical Service Provider</h2>
              <p className="legal-text">
                <strong>IMPORTANT:</strong> MedTracker by MyMed is a medical information management tool. We are <strong>NOT</strong> a medical service provider, healthcare facility, or licensed medical professional. We do not:
              </p>
              <ul className="legal-list">
                <li>Provide medical advice, diagnosis, or treatment</li>
                <li>Make medical decisions or recommendations</li>
                <li>Replace professional medical consultation</li>
                <li>Guarantee the accuracy of medical information stored in our system</li>
                <li>Assume responsibility for medical outcomes</li>
              </ul>
              <p className="legal-text">
                Always consult with qualified healthcare professionals for medical advice, diagnosis, and treatment. In case of a medical emergency, contact emergency services immediately.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">4. User Accounts and Registration</h2>
              <h3 className="legal-subsection-title">4.1 Account Creation</h3>
              <p className="legal-text">
                To use our Service, you must create an account using a social login provider (Google or Apple). You agree to provide accurate, current, and complete information during registration.
              </p>

              <h3 className="legal-subsection-title">4.2 Account Security</h3>
              <p className="legal-text">
                You are responsible for:
              </p>
              <ul className="legal-list">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring that your account information remains accurate and up-to-date</li>
              </ul>

              <h3 className="legal-subsection-title">4.3 Account Termination</h3>
              <p className="legal-text">
                You may terminate your account at any time. We reserve the right to suspend or terminate accounts that violate these Terms or engage in fraudulent, illegal, or harmful activities.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">5. Acceptable Use</h2>
              <p className="legal-text">
                You agree to use our Service only for lawful purposes and in accordance with these Terms. You agree NOT to:
              </p>
              <ul className="legal-list">
                <li>Upload false, misleading, or fraudulent medical information</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Use the Service to harm others or violate their privacy</li>
                <li>Resell or redistribute the Service without authorization</li>
              </ul>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">6. Subscription Plans and Payments</h2>
              <h3 className="legal-subsection-title">6.1 Subscription Plans</h3>
              <p className="legal-text">
                We offer various subscription plans (Core, Momentum, Growth) with different features and pricing. Subscription fees are billed monthly or annually as selected.
              </p>

              <h3 className="legal-subsection-title">6.2 Payment Terms</h3>
              <p className="legal-text">
                By subscribing to a paid plan, you agree to pay all fees associated with your subscription. Fees are charged in advance and are non-refundable except as required by law or as stated in our refund policy.
              </p>

              <h3 className="legal-subsection-title">6.3 Automatic Renewal</h3>
              <p className="legal-text">
                Subscriptions automatically renew unless cancelled before the renewal date. You may cancel your subscription at any time through your account settings.
              </p>

              <h3 className="legal-subsection-title">6.4 Price Changes</h3>
              <p className="legal-text">
                We reserve the right to modify subscription prices. Existing subscribers will be notified of price changes at least 30 days in advance.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">7. Intellectual Property</h2>
              <p className="legal-text">
                The Service, including its design, features, functionality, and content, is owned by MedTracker by MyMed and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
              </p>
              <p className="legal-text">
                You retain ownership of the medical information and documents you upload. By using our Service, you grant us a license to store, process, and display your information solely for the purpose of providing the Service.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">8. Privacy and Data Protection</h2>
              <p className="legal-text">
                Your use of MedTracker by MyMed is also governed by our Privacy Policy, which explains how we collect, use, and protect your information. Please review our Privacy Policy carefully.
              </p>
              <p className="legal-text">
                We are HIPAA certified and committed to protecting your health information in accordance with applicable laws and regulations, including HIPAA.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">9. Disclaimers and Limitations of Liability</h2>
              <h3 className="legal-subsection-title">9.1 Service Disclaimer</h3>
              <p className="legal-text">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
              </p>

              <h3 className="legal-subsection-title">9.2 Limitation of Liability</h3>
              <p className="legal-text">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, MEDTRACKER BY MYMED SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, LOSS OF PROFITS, OR MEDICAL COMPLICATIONS, ARISING FROM YOUR USE OF THE SERVICE.
              </p>

              <h3 className="legal-subsection-title">9.3 Medical Disclaimer</h3>
              <p className="legal-text">
                WE ARE NOT RESPONSIBLE FOR ANY MEDICAL DECISIONS MADE BASED ON INFORMATION STORED IN OUR SYSTEM. YOU ARE SOLELY RESPONSIBLE FOR CONSULTING WITH QUALIFIED HEALTHCARE PROFESSIONALS FOR ALL MEDICAL MATTERS.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">10. Indemnification</h2>
              <p className="legal-text">
                You agree to indemnify and hold harmless MedTracker by MyMed, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service, violation of these Terms, or infringement of any rights of another party.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">11. Modifications to Service and Terms</h2>
              <p className="legal-text">
                We reserve the right to modify, suspend, or discontinue the Service at any time. We may also update these Terms from time to time. Material changes will be notified to you via email or through the Service. Your continued use after such changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">12. Governing Law and Dispute Resolution</h2>
              <p className="legal-text">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which MedTracker by MyMed operates, without regard to conflict of law principles. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration or in the appropriate courts.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">13. Severability</h2>
              <p className="legal-text">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">14. Entire Agreement</h2>
              <p className="legal-text">
                These Terms, together with our Privacy Policy, constitute the entire agreement between you and MedTracker by MyMed regarding the Service and supersede all prior agreements and understandings.
              </p>
            </section>

            <section className="legal-section">
              <h2 className="legal-section-title">15. Contact Information</h2>
              <p className="legal-text">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="legal-text">
                <strong>Email:</strong> <a href="mailto:support@mymed.health" className="legal-link">support@mymed.health</a><br />
                <strong>Address:</strong> MedTracker by MyMed<br />
                Legal Department
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

