'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { config } from './config';
import FullLandingPage from './components/FullLandingPage';

export default function Home() {
  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Here you would typically send the email to your backend/API
    // For now, we'll just show a success message
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  // If Coming Soon mode is disabled, show full landing page
  if (!config.COMING_SOON_MODE) {
    return <FullLandingPage />;
  }

  // Coming Soon Page
  return (
    <>
      <Header />

      {/* Coming Soon Hero Section */}
      <section className="hero-sketch" style={{ position: 'relative', zIndex: 1, background: '#fff', marginTop: '60px', minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center' }}>
        <div className="sketch-container" style={{ width: '100%' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem 2rem 2rem' }}>
            {/* Coming Soon Badge */}
            <div className="coming-soon-badge" style={{ 
              fontSize: '1rem', 
              padding: '0.75rem 2rem', 
              marginBottom: '2rem',
              display: 'inline-block',
              transform: 'rotate(-2deg)'
            }}>
              COMING SOON
            </div>

            {/* Main Title */}
            <h1 className="sketch-title" style={{ marginBottom: '1.5rem' }}>
              HELP YOUR<br />
              PARENTS STAY<br />
              <span className="sketch-highlight">SAFE</span>
            </h1>
            
            <div className="sketch-underline" style={{ margin: '0 auto 2rem' }}></div>

            {/* Mission Text */}
            <p className="hero-mission-text" style={{ 
              maxWidth: '600px', 
              margin: '0 auto 3rem',
              fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)'
            }}>
              You care about them. We take on the responsibility of keeping them safe — guiding, checking, and protecting them from scammers.
            </p>

            {/* Email Signup Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="coming-soon-form" style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '2rem',
                border: '4px solid #000',
                background: '#fff',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                transform: 'rotate(1deg)',
                overflow: 'visible'
              }}>
                <label htmlFor="email" style={{
                  display: 'block',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  fontWeight: '700',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                  textAlign: 'left',
                  width: '100%',
                  maxWidth: '100%'
                }}>
                  GET NOTIFIED WHEN WE LAUNCH
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    style={{
                      flex: '1',
                      minWidth: '200px',
                      padding: '1rem 1.25rem',
                      border: '3px solid #000',
                      background: '#fff',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      fontWeight: '400',
                      letterSpacing: '0.02em'
                    }}
                  />
                  <div style={{ position: 'relative', display: 'inline-block', overflow: 'visible', marginBottom: '10px' }}>
                    <button
                      type="submit"
                      className="signup-button-sketch"
                      style={{
                        padding: '1rem 2rem',
                        whiteSpace: 'nowrap',
                        transform: 'rotate(-1deg)',
                        position: 'relative',
                        zIndex: 2
                      }}
                    >
                      <span style={{ position: 'relative', zIndex: 2 }}>NOTIFY ME</span>
                      {/* Simple marker highlight - first line */}
                      <div style={{
                        position: 'absolute',
                        bottom: '14px',
                        left: '20%',
                        width: '45%',
                        height: '18px',
                        background: 'rgba(255, 235, 59, 0.8)',
                        transform: 'rotate(-1.5deg)',
                        borderRadius: '4px',
                        zIndex: 1,
                        pointerEvents: 'none',
                        boxShadow: '0 2px 4px rgba(255, 235, 59, 0.5)'
                      }}></div>
                      {/* Simple marker highlight - second line */}
                      <div style={{
                        position: 'absolute',
                        bottom: '12px',
                        right: '20%',
                        width: '30%',
                        height: '18px',
                        background: 'rgba(255, 235, 59, 0.8)',
                        transform: 'rotate(1deg)',
                        borderRadius: '4px',
                        zIndex: 1,
                        pointerEvents: 'none',
                        boxShadow: '0 2px 4px rgba(255, 235, 59, 0.5)'
                      }}></div>
                    </button>
                  </div>
                </div>
                {error && (
                  <p style={{
                    color: '#dc2626',
                    fontSize: '0.875rem',
                    marginTop: '0.75rem',
                    textAlign: 'left'
                  }}>
                    {error}
                  </p>
                )}
              </form>
            ) : (
              <div style={{
                maxWidth: '500px',
                margin: '0 auto',
                padding: '2rem',
                border: '4px solid #22c55e',
                background: '#f0fdf4',
                clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                transform: 'rotate(-1deg)'
              }}>
                <p style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#166534',
                  margin: 0
                }}>
                  ✓ Thanks! We&apos;ll notify you when we launch.
                </p>
              </div>
            )}

            {/* Stats Preview */}
            <div style={{ marginTop: '4rem' }}>
              <div className="sketch-stats-inline" style={{ 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                maxWidth: '900px',
                margin: '0 auto'
              }}>
                <div className="sketch-stat-box sketch-rotation-1">
                  <div className="sketch-stat-number">$1T+</div>
                  <div className="sketch-stat-label">Lost Annually</div>
                </div>
                <div className="sketch-stat-box sketch-rotation-2">
                  <div className="sketch-stat-number">$10-30B</div>
                  <div className="sketch-stat-label">Older Americans (60+)</div>
                </div>
                <div className="sketch-stat-box sketch-rotation-4">
                  <div className="sketch-stat-number">1B+</div>
                  <div className="sketch-stat-label">People Exposed</div>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="mission-statement-section" style={{ marginTop: '4rem', marginBottom: '2rem' }}>
              <p className="mission-statement-text">
                <strong>Our mission:</strong> Help you protect your parents before scammers reach them — with clear guides, checklists, and continuous protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
