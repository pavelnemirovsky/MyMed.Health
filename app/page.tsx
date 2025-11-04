'use client';

import { useState, useEffect, useRef } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % statements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [statements.length]);

  const handleVideoHover = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleVideoLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <>
      <Header />

      {/* Hero Section - Sketch Style */}
      <section className="hero-sketch" style={{ position: 'relative', zIndex: 1, background: '#fff', marginTop: '60px' }}>
        <div className="sketch-container">
          {/* Hero Main Content - Two Column Layout */}
          <div className="hero-main-content">
            {/* Left Side - Title */}
            <div className="hero-left">
              <div className="sketch-title-wrapper">
                <h1 className="sketch-title">
                  PROTECT YOUR<br />
                  FAMILY IN<br />
                  <span className="sketch-highlight">5 MINUTES</span>
                </h1>
                <div className="sketch-underline"></div>
              </div>
            </div>

            {/* Right Side - Video */}
            <div className="hero-right">
              <div 
                className="hero-video-container"
                onMouseEnter={handleVideoHover}
                onMouseLeave={handleVideoLeave}
              >
                <video 
                  ref={videoRef}
                  className="hero-video"
                  autoPlay 
                  playsInline 
                  muted
                  preload="auto"
                  onEnded={(e) => {
                    e.currentTarget.pause();
                  }}
                >
                  <source src="/Video_Generation_Request.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          
          {/* Stats Below Title and Video */}
          <div className="sketch-stats-inline">
            <div className="sketch-stat-box sketch-rotation-1">
              <div className="sketch-stat-number">400M</div>
              <div className="sketch-stat-label">People Affected (Last 10 Years)</div>
            </div>
            <div className="sketch-stat-box sketch-rotation-2">
              <div className="sketch-stat-number">1.63B</div>
              <div className="sketch-stat-label">Phone/Text Attempts (60% of all attempts)</div>
            </div>
            <div className="sketch-stat-box sketch-rotation-4">
              <div className="sketch-stat-number">1-3%</div>
              <div className="sketch-stat-label">Success Rate</div>
            </div>
            <div className="sketch-stat-box sketch-rotation-5">
              <div className="sketch-stat-number">$1.03T</div>
              <div className="sketch-stat-label">Stolen Annually</div>
            </div>
          </div>
          
          {/* Facts Section - Sketch Style */}
          <div className="facts-content-hero">
            <div className="facts-label-sketch">THE FACTS</div>
            <div className="facts-content-sketch">
              <div className="statement-container-sketch">
                {statements.map((statement, index) => (
                  <div
                    key={index}
                    className={`statement-sketch ${index === currentIndex ? 'active' : ''}`}
                    aria-hidden={index !== currentIndex}
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
          
          {/* Solution Section - Sketch Style */}
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
                <h3>Scan & Verify Tools</h3>
                <p>Scan text/SMS messages and verify callers by number</p>
              </div>
            </div>
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
            <div className="stat-item-sketch sketch-rotation-12">
              <div className="stat-value-sketch">1-3%</div>
              <div className="stat-desc-sketch">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
