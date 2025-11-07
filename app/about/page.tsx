'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="report-page">
        <div className="report-container">
          <div className="report-header">
            <h1 className="report-title sketch-rotation-1">ABOUT US</h1>
            <div className="solution-underline-sketch" style={{ marginBottom: '2rem' }}></div>
            <p className="report-subtitle">
              We&apos;re on a mission to protect your loved ones from scammers. Learn more about who we are and what drives us.
            </p>
          </div>

          {/* Mission Section */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="statement-sketch sketch-rotation-2">
              <div className="statement-title-sketch">OUR MISSION</div>
              <p className="statement-text-sketch" style={{ maxHeight: 'none', overflow: 'visible' }}>
                Stop Scams Now exists to help you protect your parents before scammers reach them. We believe that everyone deserves to feel safe and secure, especially older adults who are often targeted by sophisticated scammers. Our mission is to provide clear, simple tools that anyone can use to build awareness and protection—no technical expertise required.
              </p>
            </div>
          </section>

          {/* What We Do Section */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 className="section-title-sketch sketch-rotation-3" style={{ marginBottom: '2rem' }}>WHAT WE DO</h2>
            <div className="solution-grid-sketch" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div className="solution-card-sketch sketch-rotation-4">
                <div className="card-content-sketch">
                  <h3>Free Protection Guides</h3>
                  <p>We create easy-to-follow guides that help your parents understand common scam tactics and how to protect themselves. These guides are practical, actionable, and designed for people of all technical skill levels.</p>
                </div>
              </div>
              
              <div className="solution-card-sketch sketch-rotation-5">
                <div className="card-content-sketch">
                  <h3>Safety Checklists</h3>
                  <p>Our checklists help verify that your parents&apos; devices and accounts are properly secured. We make it simple to check their protection status and identify areas that need attention.</p>
                </div>
              </div>
              
              <div className="solution-card-sketch sketch-rotation-6">
                <div className="card-content-sketch">
                  <h3>Scam Reporting</h3>
                  <p>We collect scam reports to help protect others. When you report a scam, you&apos;re helping us identify patterns and warn others about new threats.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why We Started Section */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="statement-sketch sketch-rotation-7">
              <div className="statement-title-sketch">WHY WE STARTED</div>
              <p className="statement-text-sketch" style={{ maxHeight: 'none', overflow: 'visible' }}>
                Scammers steal over $1 trillion globally every year, and older Americans lose $10–30 billion annually. These aren&apos;t just numbers—they represent real people who have been hurt, families who have lost savings, and loved ones who feel violated. We started Stop Scams Now because we believe prevention is better than recovery. By helping people recognize scams before they fall victim, we can protect millions of families from financial and emotional harm.
              </p>
            </div>
          </section>

          {/* Our Values Section */}
          <section style={{ marginBottom: '4rem' }}>
            <h2 className="section-title-sketch sketch-rotation-8" style={{ marginBottom: '2rem' }}>OUR VALUES</h2>
            <div className="solution-grid-sketch" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <div className="solution-card-sketch sketch-rotation-9">
                <div className="card-content-sketch">
                  <h3>Simplicity</h3>
                  <p>We believe protection should be simple. No complicated setups, no technical jargon—just clear, actionable steps anyone can follow.</p>
                </div>
              </div>
              
              <div className="solution-card-sketch sketch-rotation-10">
                <div className="card-content-sketch">
                  <h3>Accessibility</h3>
                  <p>Our tools are free and available to everyone. We&apos;re committed to making scam protection accessible to all families, regardless of their technical skills or financial situation.</p>
                </div>
              </div>
              
              <div className="solution-card-sketch sketch-rotation-11">
                <div className="card-content-sketch">
                  <h3>Empowerment</h3>
                  <p>We empower families to take control of their protection. You know your loved ones best—we provide the tools, you provide the care.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section style={{ marginBottom: '4rem' }}>
            <div className="mission-statement-section sketch-rotation-12">
              <p className="mission-statement-text">
                <strong>Get in Touch:</strong> Have questions or want to learn more? Contact us at{' '}
                <a href="mailto:report@stopscamsnow.org" style={{ color: '#dc2626', textDecoration: 'underline' }}>report@stopscamsnow.org</a>{' '}
                or call{' '}
                <a href="tel:+18333728311" style={{ color: '#dc2626', textDecoration: 'underline' }}>1-833-FRAUD-11</a>.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

