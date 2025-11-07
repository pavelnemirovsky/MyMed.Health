'use client';

import { useState, useEffect, useRef } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function FullLandingPage() {
  useEffect(() => {
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);
  const statements = [
    {
      title: 'Global Scale',
      text: 'Global reports estimate over US$1 trillion is lost to scams every year—and when we include unreported cases, the real figure may be closer to US$2–3 trillion. Every year, hundreds of millions of people worldwide are targeted by scammers, and over the last decade well over a billion individuals have been exposed to some form of scam. Sources: Global Anti-Scam Alliance, FBI IC3, UK Action Fraud, and cross-national consumer protection studies.',
    },
    {
      title: 'Older Americans at Risk',
      text: 'People aged 60 and older in the U.S. reported losses of over US$3.1 billion in a single year—but experts believe the real figure is between US$10–30 billion, since most cases go unreported. In the U.S. alone, the FBI recorded more than US$16 billion in reported cybercrime losses in 2024. Source: FBI IC3 Elder Fraud Report 2022 via GASA.',
    },
    {
      title: 'Phone & Text Targeting',
      text: 'Phone calls and text messages are among the most common channels used to reach older adults, because scammers know they can pressure and confuse people in real time. Large cross-country studies find that around 60% of people have been targeted by scammers via call or text in the past 12 months. Sources: Pew Research Center, Ofcom UK, and international telecom fraud studies.',
    },
  ];

  const faqs = [
    {
      question: 'How do you help protect my parents?',
      answer: 'You set up protection for your family and invite your loved ones. Once they&apos;re invited, you&apos;ll be able to control and see how they improve their scam awareness. We guide them with free protection guides, check their awareness with safety checklists, and with premium protection (coming soon), you can monitor their vulnerability reduction and awareness improvement. You care about them—we take on the responsibility of keeping them safe so they won&apos;t be vulnerable.',
    },
    {
      question: 'Do my parents need technical skills?',
      answer: 'No! Our guides and checklists focus on awareness and protection, not technical skills. We help build their defenses so they can recognize scams and protect themselves. Our free guides are quick to follow and help them understand scams without needing any technical knowledge.',
    },
    {
      question: 'What is included in Premium Parent Protection?',
      answer: 'Premium Parent Protection (coming soon) actively monitors and reduces their vulnerability through comprehensive protection. It includes awareness monitoring, vulnerability checks, and continuous protection that helps ensure your parents don&apos;t become vulnerable to scams. We take on the responsibility of keeping them safe so you don&apos;t have to worry.',
    },
    {
      question: 'How does Continuous Verification work?',
      answer: 'Continuous Verification (coming soon) provides ongoing protection by checking that your parents stay aware and protected. We help ensure they maintain awareness and don&apos;t become vulnerable to scam traps. We continuously verify their protection so you can have peace of mind.',
    },
    {
      question: 'Is this really free?',
      answer: 'Yes! Our free protection guides and safety checklists are completely free to use. Premium Parent Protection and Continuous Verification are premium features that will be available soon to provide comprehensive protection and vulnerability monitoring.',
    },
    {
      question: 'How long does it take to set up?',
      answer: 'You can get started in less than 5 minutes! Our free guides are quick to follow and help build awareness. The safety checklists can be completed at your own pace. Most people can complete the basic protection setup in under 10 minutes. We make it simple so you can help your parents right away.',
    },
    {
      question: 'What types of scams do you protect against?',
      answer: 'We help protect against phone scams, SMS/text scams, email phishing, online fraud, and social media scams through awareness and protection. Our guides help your parents understand and recognize these threats, reducing their vulnerability to scammers.',
    },
    {
      question: 'Can I set this up for my parents remotely?',
      answer: 'Yes! Our free guides can be shared with your parents to help build their awareness, and you can help them complete the safety checklists. Premium Parent Protection (coming soon) will allow you to monitor and manage their protection remotely, so you can help keep them safe even when you&apos;re not there.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
                  HELP YOUR<br />
                  PARENTS STAY<br />
                  <span className="sketch-highlight">SAFE</span>
                </h1>
                <div className="sketch-underline"></div>
                <p className="hero-mission-text">
                  You care about them. We take on the responsibility of keeping them safe — guiding, checking, and protecting them from scammers.
                </p>
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
                  <source src="/Scam_Video_Concept_and_Generation.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          
          {/* Stats Below Title and Video */}
          <div className="sketch-stats-inline">
            <div className="sketch-stat-box sketch-rotation-1">
              <div className="sketch-stat-number">$1T+</div>
              <div className="sketch-stat-label">Lost Annually (Reported)</div>
              <a href="https://www.gasa.org/post/global-state-of-scams-report-2024-1-trillion-stolen-in-12-months-gasa-feedzai" target="_blank" rel="noopener noreferrer" className="stat-source-link">Source</a>
            </div>
            <div className="sketch-stat-box sketch-rotation-2">
              <div className="sketch-stat-number">$2-3T</div>
              <div className="sketch-stat-label">Real Losses (Including Unreported)</div>
              <a href="https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf" target="_blank" rel="noopener noreferrer" className="stat-source-link">Source</a>
            </div>
            <div className="sketch-stat-box sketch-rotation-4">
              <div className="sketch-stat-number">$10-30B</div>
              <div className="sketch-stat-label">Older Americans (60+) True Losses</div>
              <a href="https://www.gasa.org/post/fbi-internet-crime-report-2022" target="_blank" rel="noopener noreferrer" className="stat-source-link">Source</a>
            </div>
            <div className="sketch-stat-box sketch-rotation-5">
              <div className="sketch-stat-number">1B+</div>
              <div className="sketch-stat-label">People Exposed (Last Decade)</div>
              <a href="https://www.ftc.gov/reports/consumer-sentinel-network-data-book-2024" target="_blank" rel="noopener noreferrer" className="stat-source-link">Source</a>
            </div>
          </div>
          
          {/* Trusted Sources Below Stats */}
          <div className="sources-below-stats">
            <span className="sources-below-stats-label">TRUSTED SOURCES:</span>
            <span className="sources-below-stats-text">
              <a href="https://www.ic3.gov/" target="_blank" rel="noopener noreferrer">FBI IC3</a>
              {' • '}
              <a href="https://www.ftc.gov/" target="_blank" rel="noopener noreferrer">FTC</a>
              {' • '}
              <a href="https://www.fcc.gov/" target="_blank" rel="noopener noreferrer">FCC</a>
              {' • '}
              <a href="https://www.actionfraud.police.uk/" target="_blank" rel="noopener noreferrer">UK Action Fraud</a>
              {' • '}
              <a href="https://www.pewresearch.org/" target="_blank" rel="noopener noreferrer">Pew Research</a>
              {' • '}
              <a href="https://www.gasa.org/" target="_blank" rel="noopener noreferrer">Global Anti-Scam Alliance</a>
              {' • '}
              <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer">WHO</a>
              {' • '}
              <a href="https://www.bbb.org/" target="_blank" rel="noopener noreferrer">BBB</a>
              {' • '}
              <a href="https://www.consumerfinance.gov/" target="_blank" rel="noopener noreferrer">CFPB</a>
            </span>
          </div>
          
          {/* Mission Statement */}
          <div className="mission-statement-section">
            <p className="mission-statement-text">
              <strong>Our mission:</strong> Help you protect your parents before scammers reach them — with clear guides, checklists, and continuous protection.
            </p>
          </div>
          
          {/* Solution Section - Sketch Style */}
          <div className="solution-header-sketch">
            <h2 className="solution-title-sketch sketch-rotation-4">THE SOLUTION</h2>
            <div className="solution-underline-sketch"></div>
            <p className="solution-intro-sketch">
              We&apos;ll take it from here. A simple 4-step process to protect your parents: We guide them with free protection guides, check their awareness with safety checklists, monitor their vulnerability with premium protection, and continuously verify they stay protected. You care about them—we take on the responsibility of keeping them safe so they won&apos;t be vulnerable.
            </p>
          </div>
          
          <div className="solution-grid-sketch">
            <div className="solution-card-sketch sketch-rotation-5">
              <div className="card-number-sketch">#1</div>
              <div className="card-content-sketch">
                <h3>Free Protection Guides</h3>
                <p>We guide your parents with free, step-by-step instructions. They&apos;re quick to follow, practical, and help build awareness about real-world scam scenarios (phone, text, email, and online). We help them understand so they won&apos;t be vulnerable.</p>
              </div>
            </div>
            
            <div className="solution-card-sketch featured-sketch sketch-rotation-6">
              <div className="card-number-sketch">#2</div>
              <div className="card-content-sketch">
                <h3>Simple Safety Checklists</h3>
                <p>We check their awareness using easy checklists that help them recognize scams and protect themselves. Works on both Android and iPhone—we help build their defenses so they won&apos;t be vulnerable.</p>
              </div>
            </div>
            
            <div className="solution-card-sketch sketch-rotation-8">
              <div className="card-number-container">
                <div className="card-number-sketch">#3</div>
                <span className="coming-soon-badge">Coming Soon</span>
              </div>
              <div className="card-content-sketch">
                <h3>Premium Parent Protection</h3>
                <p>We monitor and reduce their vulnerability with comprehensive protection that actively decreases your parents&apos; exposure to scams. Includes awareness monitoring, vulnerability checks, and continuous protection.</p>
              </div>
            </div>
            
            <div className="solution-card-sketch sketch-rotation-7">
              <div className="card-number-container">
                <div className="card-number-sketch">#4</div>
                <span className="coming-soon-badge">Coming Soon</span>
              </div>
              <div className="card-content-sketch">
                <h3>Continuous Verification</h3>
                <p>We continuously verify your parents stay protected with ongoing awareness checks. We help ensure they maintain awareness and don&apos;t become vulnerable to scam traps.</p>
              </div>
            </div>
          </div>
          
          {/* Sign Up CTA After Solution */}
          <div className="signup-cta-section">
            <button className="signup-button-sketch sketch-rotation-2">
              SIGN UP — GET STARTED FREE
            </button>
            <p className="signup-cta-text">Start protecting your parents today with our free guides and checklists</p>
          </div>
          
          {/* Facts Section - Sketch Style */}
          <div className="facts-content-hero">
            <div className="facts-label-sketch">THE FACTS</div>
            <div className="facts-content-sketch">
              <div className="statement-container-sketch">
                {statements.map((statement, index) => (
                  <div
                    key={index}
                    className="statement-sketch"
                  >
                    <div className="statement-title-sketch">{statement.title}</div>
                    <p className="statement-text-sketch">{statement.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - Sketch Style */}
      <section className="stats-bar-sketch">
        <div className="sketch-container">
          <div className="stats-bar-content">
            <div className="stats-bar-message">
              <h2 className="stats-bar-title">HELP YOUR PARENTS STAY SAFE</h2>
              <p className="stats-bar-text">
                You care about them. We&apos;ll take it from here—guiding, checking, and keeping them safe so they won&apos;t be vulnerable. Older Americans lose $10–30 billion annually to scammers. Start with our free guides, then upgrade to premium protection for your parents.
              </p>
              <button className="signup-button-sketch signup-button-dark sketch-rotation-1">
                SIGN UP — GET STARTED FREE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships & Media Section */}
      <section className="partnerships-section-sketch">
        <div className="sketch-container">
          <div className="partnerships-header-sketch">
            <h2 className="partnerships-title-sketch sketch-rotation-2">PARTNERSHIPS & RECOGNITION</h2>
            <div className="solution-underline-sketch"></div>
            <p className="partnerships-intro-sketch">
              We collaborate with leading organizations and have been recognized by trusted media outlets for our work in scam prevention.
            </p>
          </div>
          
          <div className="partnerships-grid-sketch">
            <div className="partnership-category-sketch">
              <h3 className="partnership-category-title">Partners</h3>
              <ul className="partnership-list-sketch">
                <li>Global Anti-Scam Alliance</li>
                <li>Consumer Financial Protection Bureau</li>
                <li>National Consumer League</li>
                <li>Better Business Bureau</li>
              </ul>
            </div>
            
            <div className="partnership-category-sketch">
              <h3 className="partnership-category-title">Media Coverage</h3>
              <ul className="partnership-list-sketch">
                <li>Featured in consumer protection reports</li>
                <li>Cited by cybersecurity publications</li>
                <li>Recognized by fraud prevention organizations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section-sketch">
        <div className="sketch-container">
          <div className="faq-header-sketch">
            <h2 className="faq-title-sketch sketch-rotation-3">FREQUENTLY ASKED QUESTIONS</h2>
            <div className="solution-underline-sketch"></div>
          </div>
          
          <div className="faq-list-sketch">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item-sketch">
                <button
                  className={`faq-question-sketch ${openFaqIndex === index ? 'active' : ''}`}
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaqIndex === index}
                >
                  <span className="faq-question-text">{faq.question}</span>
                  <span className="faq-icon">{openFaqIndex === index ? '−' : '+'}</span>
                </button>
                {openFaqIndex === index && (
                  <div className="faq-answer-sketch">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
