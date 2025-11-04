'use client';

import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  const statements = [
    {
      title: 'Global Scale',
      text: 'Recent global surveys suggest around 600–650 million people worldwide fall victim to some type of scam each year, with $1.03 trillion in total losses annually.',
    },
    {
      title: 'Telephone & Text Focus',
      text: 'The majority of scams globally involve phone calls or SMS. Large cross-country studies find that around 60% of people have been targeted by scammers via call or text in the past 12 months, and over 60% of scam victims say the scam involved a phone call and/or SMS at some point.',
    },
    {
      title: 'Order-of-Magnitude Estimate for 2025',
      text: 'Taken together, the best available data imply that on the order of 400 million people per year are impacted by telephone/SMS-based scams worldwide, with 1.63 billion individual phone/text scam attempts annually. Because only a small fraction of scams are ever reported, the real numbers are almost certainly higher.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [statements.length]);

  return (
    <>
      <Header />

      {/* Hero Section - Sketch Style */}
      <section className="hero-sketch" style={{ position: 'relative', zIndex: 1, background: '#fff', marginTop: '60px' }}>
        <div className="sketch-container">
          <div className="hero-main-sketch">
            <div className="sketch-title-wrapper">
              <h1 className="sketch-title">
                PROTECT YOUR<br />
                FAMILY IN<br />
                <span className="sketch-highlight">5 MINUTES</span>
              </h1>
              <div className="sketch-underline"></div>
            </div>
            
            <div className="sketch-stats-inline">
              <div className="sketch-stat-box sketch-rotation-1">
                <div className="sketch-stat-number">400M</div>
                <div className="sketch-stat-label">People Affected</div>
              </div>
              <div className="sketch-stat-box sketch-rotation-2">
                <div className="sketch-stat-number">1.63B</div>
                <div className="sketch-stat-label">Phone/Text Attempts</div>
              </div>
            </div>
          </div>

          <div className="sketch-sidebar">
            <div className="sketch-note sketch-rotation-3">
              <div className="note-title">60%</div>
              <div className="note-text">of Scams Use Phone/SMS</div>
            </div>
            <div className="dice-container-sketch">
              <div className="dice-sketch dice-1-sketch">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="80" height="80" rx="8" fill="#dc2626" stroke="#000" strokeWidth="2"/>
                  <circle cx="30" cy="30" r="6" fill="#fff"/>
                  <circle cx="70" cy="70" r="6" fill="#fff"/>
                  <circle cx="50" cy="50" r="6" fill="#fff"/>
                </svg>
              </div>
              <div className="dice-sketch dice-2-sketch">
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="80" height="80" rx="8" fill="#000" stroke="#000" strokeWidth="2"/>
                  <circle cx="30" cy="30" r="6" fill="#fff"/>
                  <circle cx="70" cy="70" r="6" fill="#fff"/>
                  <circle cx="30" cy="70" r="6" fill="#fff"/>
                  <circle cx="70" cy="30" r="6" fill="#fff"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facts Section - Sketch Style */}
      <section className="facts-sketch">
        <div className="sketch-container">
          <div className="facts-label-sketch">THE FACTS</div>
          <div className="facts-content-sketch">
            <div className="statement-container-sketch">
              {statements.map((statement, index) => (
                <div
                  key={index}
                  className={`statement-sketch ${index === currentIndex ? 'active' : ''}`}
                  aria-hidden={index !== currentIndex}
                  style={{ transform: `rotate(${(index - 1) * 0.5}deg)` }}
                >
                  <div className="statement-title-sketch">{statement.title}</div>
                  <p className="statement-text-sketch">{statement.text}</p>
                </div>
              ))}
            </div>
            <div className="statement-indicators-sketch">
              {statements.map((_, index) => (
                <button
                  key={index}
                  className={`indicator-sketch ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Statement ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section - Sketch Style */}
      <section className="solution-sketch">
        <div className="sketch-container">
          <div className="solution-header-sketch">
            <h2 className="solution-title-sketch sketch-rotation-4">THE SOLUTION</h2>
            <div className="solution-underline-sketch"></div>
            <p className="solution-intro-sketch">
              Simple tools anyone can use in less than 5 minutes. No technical knowledge required.
            </p>
          </div>
          
          <div className="solution-grid-sketch">
            <div className="solution-card-sketch sketch-rotation-5">
              <div className="card-number-sketch">01</div>
              <div className="card-content-sketch">
                <h3>5-Minute Protection Guides</h3>
                <p>Step-by-step guides you can complete quickly</p>
              </div>
            </div>
            
            <div className="solution-card-sketch featured-sketch sketch-rotation-6">
              <div className="card-number-sketch">02</div>
              <div className="card-content-sketch">
                <h3>Simple Checklists</h3>
                <p>Easy-to-use checklists for immediate protection</p>
              </div>
            </div>
            
            <div className="solution-card-sketch sketch-rotation-7">
              <div className="card-number-sketch">03</div>
              <div className="card-content-sketch">
                <h3>Scam Detection Tools</h3>
                <p>Learn to recognize and avoid common scams</p>
              </div>
            </div>
            
            <div className="solution-card-sketch sketch-rotation-8">
              <div className="card-number-sketch">04</div>
              <div className="card-content-sketch">
                <h3>Verification Resources</h3>
                <p>Quick ways to verify suspicious communications</p>
              </div>
            </div>
          </div>

          <div className="solution-footer-sketch">
            <div className="mission-text-sketch">
              We believe everyone deserves protection from scammers, regardless of technical expertise.
            </div>
            <div className="status-sketch">COMING SOON</div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Sketch Style */}
      <section className="stats-bar-sketch">
        <div className="sketch-container">
          <div className="stats-grid-sketch">
            <div className="stat-item-sketch sketch-rotation-9">
              <div className="stat-value-sketch">$1.03T</div>
              <div className="stat-desc-sketch">Stolen Annually</div>
            </div>
            <div className="stat-item-sketch sketch-rotation-10">
              <div className="stat-value-sketch">600M+</div>
              <div className="stat-desc-sketch">Victims Per Year</div>
            </div>
            <div className="stat-item-sketch sketch-rotation-11">
              <div className="stat-value-sketch">1.63B</div>
              <div className="stat-desc-sketch">Phone/Text Scam Attempts</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
