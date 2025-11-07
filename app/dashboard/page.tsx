'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface FamilyMember {
  name: string;
  relationship: string;
  setupBy: string; // Who is setting this up (self, son, daughter, etc.)
}

export default function Dashboard() {
  const [familyMember, setFamilyMember] = useState<FamilyMember | null>(null);
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [deviceApplications, setDeviceApplications] = useState<Record<string, string[]>>({});
  const [currentStep, setCurrentStep] = useState<'family' | 'applications' | 'checklist'>('family');
  const [currentDeviceIndex, setCurrentDeviceIndex] = useState<number>(0);
  const [completedLaws, setCompletedLaws] = useState<Set<number>>(new Set());

  const [familyFormData, setFamilyFormData] = useState({
    name: '',
    relationship: '',
    setupBy: '',
  });

  const protectionLaws = [
    {
      number: 1,
      title: 'Never Share Personal Information',
      description: 'Never share your Social Security number, bank account details, passwords, or credit card information over the phone, email, or text unless you initiated the contact and verified the recipient.',
      risk: 'High - Identity theft and financial fraud',
    },
    {
      number: 2,
      title: 'Verify Before You Trust',
      description: 'If someone claims to be from a company or government agency, hang up and call the official number yourself. Never trust caller ID—it can be spoofed.',
      risk: 'High - Impersonation scams',
    },
    {
      number: 3,
      title: 'Pressure Means Scam',
      description: 'Legitimate organizations never pressure you to act immediately. Scammers create urgency to prevent you from thinking clearly. Take your time and verify.',
      risk: 'High - Urgency-based scams',
    },
    {
      number: 4,
      title: 'Too Good to Be True',
      description: 'If an offer sounds too good to be true, it almost certainly is. Free prizes, unexpected winnings, or guaranteed returns are classic scam tactics.',
      risk: 'Medium - Prize and lottery scams',
    },
    {
      number: 5,
      title: 'Check Unknown Links',
      description: 'Never click links in unsolicited emails or texts. Hover over links to see the real destination, or better yet, type the website address yourself.',
      risk: 'High - Phishing and malware',
    },
    {
      number: 6,
      title: 'Payment Methods Matter',
      description: 'Scammers prefer gift cards, wire transfers, cryptocurrency, and prepaid cards because they\'re hard to trace and reverse. Legitimate businesses accept credit cards.',
      risk: 'High - Irreversible payment scams',
    },
    {
      number: 7,
      title: 'Guard Your Phone Number',
      description: 'Your phone number is valuable to scammers. Be cautious about sharing it online or with unknown parties. Use two-factor authentication when possible.',
      risk: 'Medium - SIM swapping and account takeover',
    },
    {
      number: 8,
      title: 'Question Unexpected Contacts',
      description: 'If you receive an unexpected call, text, or email asking for information or money, treat it as suspicious. Verify through official channels.',
      risk: 'High - Social engineering',
    },
    {
      number: 9,
      title: 'Protect Your Devices',
      description: 'Keep your devices updated with the latest security patches. Use strong, unique passwords and enable biometric locks when available.',
      risk: 'Medium - Device compromise',
    },
    {
      number: 10,
      title: 'Trust Your Instincts',
      description: 'If something feels wrong, it probably is. It\'s better to be cautious and verify than to become a victim. When in doubt, don\'t act.',
      risk: 'High - All scam types',
    },
  ];

  const deviceTypes = [
    { id: 'iphone', name: 'iPhone', icon: '📱' },
    { id: 'ipad', name: 'iPad', icon: '📱' },
    { id: 'macbook', name: 'MacBook Computer', icon: '💻' },
    { id: 'android', name: 'Android Phone', icon: '📱' },
    { id: 'tablet', name: 'Android Tablet', icon: '📱' },
    { id: 'chromebook', name: 'Chromebook Computer', icon: '💻' },
    { id: 'windows-computer', name: 'Windows Computer', icon: '🖥️' },
    { id: 'other-computer', name: 'Other Computer', icon: '💻' },
  ];

  const instantMessagingApps = [
    'WhatsApp (Calls/Text/Screen Share)',
    'Telegram (Calls/Text/Screen Share)',
    'Signal (Calls/Text/Screen Share)',
    'Viber (Calls/Text/Screen Share)',
    'WeChat (Calls/Text/Screen Share)',
    'Line (Calls/Text/Screen Share)',
    'Other Instant Messenger (Calls/Text/Screen Share)',
  ];

  const commonApplications = {
    mobile: [
      ...instantMessagingApps,
      'Email (Gmail, Outlook, etc.)',
      'iMessage / SMS',
      'Social Media (Facebook, Instagram, Twitter)',
      'Banking Apps',
      'Shopping Apps (Amazon, eBay)',
      'Video Calls (Zoom, FaceTime, Skype)',
      'Photo Storage (Google Photos, iCloud)',
      'Password Manager',
      'Other',
    ],
    computer: [
      ...instantMessagingApps,
      'Web Browser (Chrome, Safari, Firefox)',
      'Email Client (Outlook, Mail)',
      'Microsoft Office',
      'Video Conferencing (Zoom, Teams)',
      'Antivirus Software',
      'Password Manager',
      'Cloud Storage (Dropbox, Google Drive)',
      'Social Media Apps',
      'Other',
    ],
  };

  const deviceChecklists: Record<string, Array<{ id: string; question: string; risk: string; category: string }>> = {
    iphone: [
      { id: 'ios-update', question: 'Is your iOS updated to the latest version?', risk: 'High - Security vulnerabilities', category: 'System Security' },
      { id: 'passcode', question: 'Do you have a passcode or Face ID/Touch ID enabled?', risk: 'High - Unauthorized access', category: 'Device Security' },
      { id: 'two-factor', question: 'Is two-factor authentication enabled for your Apple ID?', risk: 'High - Account takeover', category: 'Account Security' },
      { id: 'app-permissions', question: 'Have you reviewed app permissions (camera, microphone, location)?', risk: 'Medium - Privacy invasion', category: 'Privacy' },
      { id: 'unknown-sources', question: 'Do you only install apps from the App Store?', risk: 'High - Malware', category: 'App Security' },
      { id: 'sms-filtering', question: 'Is SMS filtering enabled to block spam messages?', risk: 'Medium - Phishing attempts', category: 'Communication' },
      { id: 'backup', question: 'Is iCloud backup enabled?', risk: 'Medium - Data loss', category: 'Data Protection' },
    ],
    android: [
      { id: 'android-update', question: 'Is your Android OS updated to the latest version?', risk: 'High - Security vulnerabilities', category: 'System Security' },
      { id: 'screen-lock', question: 'Do you have a screen lock (PIN, pattern, fingerprint)?', risk: 'High - Unauthorized access', category: 'Device Security' },
      { id: 'google-2fa', question: 'Is two-factor authentication enabled for your Google account?', risk: 'High - Account takeover', category: 'Account Security' },
      { id: 'unknown-sources', question: 'Is "Install from unknown sources" disabled?', risk: 'High - Malware', category: 'App Security' },
      { id: 'app-permissions', question: 'Have you reviewed app permissions in Settings?', risk: 'Medium - Privacy invasion', category: 'Privacy' },
      { id: 'play-protect', question: 'Is Google Play Protect enabled?', risk: 'Medium - Malware detection', category: 'App Security' },
      { id: 'backup', question: 'Is automatic backup enabled?', risk: 'Medium - Data loss', category: 'Data Protection' },
    ],
    macbook: [
      { id: 'macos-update', question: 'Is your macOS updated to the latest version?', risk: 'High - Security vulnerabilities', category: 'System Security' },
      { id: 'gatekeeper', question: 'Is Gatekeeper enabled to prevent unauthorized apps from running?', risk: 'High - Malware', category: 'Security Software' },
      { id: 'firewall', question: 'Is your firewall enabled in System Settings?', risk: 'Medium - Network attacks', category: 'Network Security' },
      { id: 'two-factor', question: 'Is two-factor authentication enabled for your Apple ID?', risk: 'High - Account takeover', category: 'Account Security' },
      { id: 'password-manager', question: 'Do you use a password manager?', risk: 'High - Weak passwords', category: 'Account Security' },
      { id: 'time-machine', question: 'Is Time Machine backup enabled?', risk: 'High - Data loss', category: 'Data Protection' },
      { id: 'browser-update', question: 'Is your web browser updated to the latest version?', risk: 'Medium - Browser vulnerabilities', category: 'Browser Security' },
      { id: 'email-filtering', question: 'Do you have spam filtering enabled for email?', risk: 'Medium - Phishing', category: 'Communication' },
    ],
    'windows-computer': [
      { id: 'windows-update', question: 'Is Windows updated with the latest security patches?', risk: 'High - Security vulnerabilities', category: 'System Security' },
      { id: 'windows-defender', question: 'Is Windows Defender antivirus enabled and updated?', risk: 'High - Malware', category: 'Security Software' },
      { id: 'windows-firewall', question: 'Is Windows Firewall enabled?', risk: 'Medium - Network attacks', category: 'Network Security' },
      { id: 'microsoft-account-2fa', question: 'Is two-factor authentication enabled for your Microsoft account?', risk: 'High - Account takeover', category: 'Account Security' },
      { id: 'password-manager', question: 'Do you use a password manager?', risk: 'High - Weak passwords', category: 'Account Security' },
      { id: 'backup', question: 'Do you have automatic backups enabled (File History or OneDrive)?', risk: 'High - Data loss', category: 'Data Protection' },
      { id: 'browser-update', question: 'Is your web browser updated to the latest version?', risk: 'Medium - Browser vulnerabilities', category: 'Browser Security' },
      { id: 'email-filtering', question: 'Do you have spam filtering enabled for email?', risk: 'Medium - Phishing', category: 'Communication' },
    ],
    'other-computer': [
      { id: 'os-update', question: 'Is your operating system updated with latest security patches?', risk: 'High - Security vulnerabilities', category: 'System Security' },
      { id: 'antivirus', question: 'Do you have antivirus/anti-malware software installed and updated?', risk: 'High - Malware', category: 'Security Software' },
      { id: 'firewall', question: 'Is your firewall enabled?', risk: 'Medium - Network attacks', category: 'Network Security' },
      { id: 'password-manager', question: 'Do you use a password manager?', risk: 'High - Weak passwords', category: 'Account Security' },
      { id: 'backup', question: 'Do you have automatic backups enabled?', risk: 'High - Data loss', category: 'Data Protection' },
      { id: 'browser-update', question: 'Is your web browser updated to the latest version?', risk: 'Medium - Browser vulnerabilities', category: 'Browser Security' },
      { id: 'email-filtering', question: 'Do you have spam filtering enabled for email?', risk: 'Medium - Phishing', category: 'Communication' },
    ],
    ipad: [
      { id: 'ios-update', question: 'Is your iPadOS updated to the latest version?', risk: 'High - Security vulnerabilities', category: 'System Security' },
      { id: 'passcode', question: 'Do you have a passcode or Face ID/Touch ID enabled?', risk: 'High - Unauthorized access', category: 'Device Security' },
      { id: 'two-factor', question: 'Is two-factor authentication enabled for your Apple ID?', risk: 'High - Account takeover', category: 'Account Security' },
      { id: 'app-permissions', question: 'Have you reviewed app permissions?', risk: 'Medium - Privacy invasion', category: 'Privacy' },
      { id: 'unknown-sources', question: 'Do you only install apps from the App Store?', risk: 'High - Malware', category: 'App Security' },
    ],
    tablet: [
      { id: 'android-update', question: 'Is your Android OS updated to the latest version?', risk: 'High - Security vulnerabilities', category: 'System Security' },
      { id: 'screen-lock', question: 'Do you have a screen lock enabled?', risk: 'High - Unauthorized access', category: 'Device Security' },
      { id: 'google-2fa', question: 'Is two-factor authentication enabled for your Google account?', risk: 'High - Account takeover', category: 'Account Security' },
      { id: 'unknown-sources', question: 'Is "Install from unknown sources" disabled?', risk: 'High - Malware', category: 'App Security' },
      { id: 'app-permissions', question: 'Have you reviewed app permissions?', risk: 'Medium - Privacy invasion', category: 'Privacy' },
    ],
    chromebook: [
      { id: 'chromeos-update', question: 'Is your ChromeOS updated to the latest version?', risk: 'High - Security vulnerabilities', category: 'System Security' },
      { id: 'screen-lock', question: 'Do you have a screen lock (PIN or password) enabled?', risk: 'High - Unauthorized access', category: 'Device Security' },
      { id: 'google-2fa', question: 'Is two-factor authentication enabled for your Google account?', risk: 'High - Account takeover', category: 'Account Security' },
      { id: 'play-store-security', question: 'If using Android apps, do you only install from Google Play Store?', risk: 'High - Malware', category: 'App Security' },
      { id: 'guest-mode', question: 'Is Guest Mode disabled when not needed?', risk: 'Medium - Unauthorized access', category: 'Device Security' },
      { id: 'backup', question: 'Is Google Drive backup enabled for your files?', risk: 'High - Data loss', category: 'Data Protection' },
      { id: 'browser-extensions', question: 'Have you reviewed installed Chrome extensions for security?', risk: 'Medium - Privacy invasion', category: 'Browser Security' },
      { id: 'email-filtering', question: 'Do you have spam filtering enabled for Gmail?', risk: 'Medium - Phishing', category: 'Communication' },
    ],
  };

  const handleFamilySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (familyFormData.name && familyFormData.relationship && familyFormData.setupBy && selectedDevices.length > 0) {
      setFamilyMember({
        name: familyFormData.name,
        relationship: familyFormData.relationship,
        setupBy: familyFormData.setupBy,
      });
      setCurrentDeviceIndex(0);
      setCurrentStep('applications');
    }
  };

  const handleDeviceToggle = (deviceId: string) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId) ? prev.filter((id) => id !== deviceId) : [...prev, deviceId]
    );
  };


  const handleApplicationToggle = (deviceId: string, app: string) => {
    setDeviceApplications((prev) => {
      const deviceApps = prev[deviceId] || [];
      const updatedApps = deviceApps.includes(app)
        ? deviceApps.filter((a) => a !== app)
        : [...deviceApps, app];
      return { ...prev, [deviceId]: updatedApps };
    });
  };

  const handleApplicationsNext = () => {
    if (currentDeviceIndex < selectedDevices.length - 1) {
      setCurrentDeviceIndex(currentDeviceIndex + 1);
    } else {
      setCurrentDeviceIndex(0);
      setCurrentStep('checklist');
    }
  };

  const handleNextDeviceChecklist = () => {
    if (currentDeviceIndex < selectedDevices.length - 1) {
      setCurrentDeviceIndex(currentDeviceIndex + 1);
    } else {
      alert('All checklists completed! Great job protecting your devices.');
      setCurrentStep('family');
      setCurrentDeviceIndex(0);
    }
  };

  const toggleLawComplete = (lawNumber: number) => {
    setCompletedLaws((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(lawNumber)) {
        newSet.delete(lawNumber);
      } else {
        newSet.add(lawNumber);
      }
      return newSet;
    });
  };

  const getDeviceName = (deviceId: string) => {
    return deviceTypes.find((d) => d.id === deviceId)?.name || deviceId;
  };

  const isMobileDevice = (deviceId: string) => {
    return ['iphone', 'android', 'ipad', 'tablet'].includes(deviceId);
  };

  const currentDeviceId = selectedDevices[currentDeviceIndex];
  const currentDeviceApps = deviceApplications[currentDeviceId] || [];

  return (
    <>
      <Header />
      <main className="dashboard-main" style={{ marginTop: '60px', padding: '2rem 0' }}>
        <div className="sketch-container">
          {/* Dashboard Header */}
          <div className="dashboard-header">
            <h1 className="dashboard-title sketch-rotation-1">PROTECTION DASHBOARD</h1>
            <div className="solution-underline-sketch"></div>
            <p className="dashboard-subtitle">Welcome! Start with our free protection guides, then secure your devices.</p>
          </div>

          {/* Free Protection Guides Section */}
          <section className="protection-guides-section">
            <div className="section-header-sketch">
              <h2 className="section-title-sketch sketch-rotation-2">FREE PROTECTION GUIDES</h2>
              <div className="solution-underline-sketch"></div>
              <p className="section-intro">10 Essential Laws to Protect Yourself from Scams</p>
            </div>

            <div className="laws-grid">
              {protectionLaws.map((law) => (
                <div
                  key={law.number}
                  className={`law-card-sketch ${completedLaws.has(law.number) ? 'completed' : ''}`}
                >
                  <div className="law-header">
                    <div className="law-number">#{law.number}</div>
                    <button
                      className={`law-checkbox ${completedLaws.has(law.number) ? 'checked' : ''}`}
                      onClick={() => toggleLawComplete(law.number)}
                      aria-label={`Mark law ${law.number} as complete`}
                    >
                      {completedLaws.has(law.number) ? '✓' : ''}
                    </button>
                  </div>
                  <h3 className="law-title">{law.title}</h3>
                  <p className="law-description">{law.description}</p>
                  <div className="law-risk">
                    <span className="risk-label">Risk Level:</span>
                    <span className={`risk-badge ${law.risk.toLowerCase().includes('high') ? 'high' : 'medium'}`}>
                      {law.risk}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Family Member Information Collection with Device Selection */}
          {currentStep === 'family' && (
            <section className="family-info-section">
              <div className="section-header-sketch">
                <h2 className="section-title-sketch sketch-rotation-3">SET UP PROTECTION</h2>
                <div className="solution-underline-sketch"></div>
                <p className="section-intro">Tell us who you're setting up protection for and what devices they use</p>
              </div>

              <form className="family-form-sketch" onSubmit={handleFamilySubmit}>
                <div className="form-group-sketch">
                  <label htmlFor="name" className="form-label-sketch">
                    Name of Person Being Protected
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-input-sketch"
                    value={familyFormData.name}
                    onChange={(e) => setFamilyFormData({ ...familyFormData, name: e.target.value })}
                    placeholder="Enter their name"
                    required
                  />
                </div>

                <div className="form-group-sketch">
                  <label htmlFor="relationship" className="form-label-sketch">
                    Your Relationship to This Person
                  </label>
                  <select
                    id="relationship"
                    className="form-input-sketch"
                    value={familyFormData.relationship}
                    onChange={(e) => setFamilyFormData({ ...familyFormData, relationship: e.target.value })}
                    required
                  >
                    <option value="">Select relationship</option>
                    <option value="self">Myself</option>
                    <option value="parent">Parent</option>
                    <option value="grandparent">Grandparent</option>
                    <option value="spouse">Spouse</option>
                    <option value="son">Son</option>
                    <option value="daughter">Daughter</option>
                    <option value="other">Other Family Member</option>
                    <option value="friend">Friend</option>
                  </select>
                </div>

                <div className="form-group-sketch">
                  <label htmlFor="setupBy" className="form-label-sketch">
                    Who is Setting This Up?
                  </label>
                  <select
                    id="setupBy"
                    className="form-input-sketch"
                    value={familyFormData.setupBy}
                    onChange={(e) => setFamilyFormData({ ...familyFormData, setupBy: e.target.value })}
                    required
                  >
                    <option value="">Select who is setting this up</option>
                    <option value="self">They are setting it up themselves</option>
                    <option value="son">Son is setting it up</option>
                    <option value="daughter">Daughter is setting it up</option>
                    <option value="family">Other family member is setting it up</option>
                    <option value="friend">Friend is setting it up</option>
                  </select>
                </div>

                <div className="form-group-sketch">
                  <label className="form-label-sketch">
                    What Devices Do They Use?
                  </label>
                  <p className="form-hint">Select all devices that this person uses</p>
                  <div className="devices-grid-inline">
                    {deviceTypes.map((device) => (
                      <button
                        key={device.id}
                        type="button"
                        className={`device-card-sketch ${selectedDevices.includes(device.id) ? 'selected' : ''}`}
                        onClick={() => handleDeviceToggle(device.id)}
                      >
                        <div className="device-icon">{device.icon}</div>
                        <div className="device-name">{device.name}</div>
                        {selectedDevices.includes(device.id) && (
                          <div className="device-check">✓</div>
                        )}
                      </button>
                    ))}
                  </div>
                  {selectedDevices.length === 0 && (
                    <p className="form-error">Please select at least one device</p>
                  )}
                </div>

                <button 
                  type="submit" 
                  className="form-submit-button sketch-rotation-1"
                  disabled={selectedDevices.length === 0}
                >
                  CONTINUE TO APPLICATION SELECTION
                </button>
              </form>
            </section>
          )}

          {/* Application Selection Per Device */}
          {currentStep === 'applications' && currentDeviceId && (
            <section className="applications-section">
              <div className="section-header-sketch">
                <h2 className="section-title-sketch sketch-rotation-2">
                  APPLICATIONS FOR {getDeviceName(currentDeviceId).toUpperCase()}
                </h2>
                <div className="solution-underline-sketch"></div>
                <p className="section-intro">
                  Select all applications that <strong>{familyMember?.name}</strong> uses on this device.
                </p>
                <div className="device-progress">
                  Device {currentDeviceIndex + 1} of {selectedDevices.length}
                </div>
              </div>

              <div className="applications-selection-container">
                <div className="instant-messaging-section">
                  <div className="instant-messaging-header">
                    <h3 className="instant-messaging-title">⚠️ INSTANT MESSAGING APPS</h3>
                    <p className="instant-messaging-warning">
                      These apps can fake incoming calls (appear as regular phone calls), send text messages, and share screens. 
                      Scammers often use these to impersonate legitimate callers.
                    </p>
                  </div>
                  <div className="applications-grid instant-messaging-grid">
                    {instantMessagingApps.map((app) => (
                      <button
                        key={app}
                        type="button"
                        className={`application-card-sketch instant-messaging-card ${currentDeviceApps.includes(app) ? 'selected' : ''}`}
                        onClick={() => handleApplicationToggle(currentDeviceId, app)}
                      >
                        <div className="application-checkbox">
                          {currentDeviceApps.includes(app) ? '✓' : ''}
                        </div>
                        <div className="application-name">{app}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="other-applications-section">
                  <h3 className="other-applications-title">OTHER APPLICATIONS</h3>
                  <div className="applications-grid">
                    {(isMobileDevice(currentDeviceId) ? commonApplications.mobile : commonApplications.computer)
                      .filter(app => !instantMessagingApps.includes(app))
                      .map((app) => (
                        <button
                          key={app}
                          type="button"
                          className={`application-card-sketch ${currentDeviceApps.includes(app) ? 'selected' : ''}`}
                          onClick={() => handleApplicationToggle(currentDeviceId, app)}
                        >
                          <div className="application-checkbox">
                            {currentDeviceApps.includes(app) ? '✓' : ''}
                          </div>
                          <div className="application-name">{app}</div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              <div className="checklist-navigation">
                {currentDeviceIndex < selectedDevices.length - 1 ? (
                  <button className="next-device-button sketch-rotation-2" onClick={handleApplicationsNext}>
                    Next Device: {getDeviceName(selectedDevices[currentDeviceIndex + 1])}
                  </button>
                ) : (
                  <button className="next-device-button sketch-rotation-2" onClick={handleApplicationsNext}>
                    START SECURITY CHECKLISTS
                  </button>
                )}
                <button
                  className="back-button"
                  onClick={() => {
                    setCurrentStep('family');
                    setCurrentDeviceIndex(0);
                  }}
                >
                  Back to Setup
                </button>
              </div>
            </section>
          )}

          {/* Dynamic Checklist Flow */}
          {currentStep === 'checklist' && currentDeviceId && (
            <section className="checklist-flow-section">
              <div className="checklist-header">
                <div>
                  <h2 className="checklist-device-title">
                    {getDeviceName(currentDeviceId)} Security Checklist
                  </h2>
                  <p className="checklist-person-name">For: {familyMember?.name}</p>
                  {deviceApplications[currentDeviceId] && deviceApplications[currentDeviceId].length > 0 && (
                    <p className="checklist-apps-used">
                      Applications used: {deviceApplications[currentDeviceId].join(', ')}
                    </p>
                  )}
                </div>
                <div className="checklist-progress">
                  Device {currentDeviceIndex + 1} of {selectedDevices.length}
                </div>
              </div>

              <div className="checklist-items">
                {deviceChecklists[currentDeviceId]?.map((item, index) => (
                  <div key={item.id} className="checklist-item-sketch">
                    <div className="checklist-item-header">
                      <div className="checklist-number">{index + 1}</div>
                      <div className="checklist-category">{item.category}</div>
                    </div>
                    <div className="checklist-question">{item.question}</div>
                    <div className="checklist-risk">
                      <span className="risk-icon">⚠️</span>
                      <span className="risk-text">{item.risk}</span>
                    </div>
                    <div className="checklist-actions-item">
                      <button className="checklist-yes-button">Yes, I've done this</button>
                      <button className="checklist-no-button">No, I need help</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="checklist-navigation">
                {currentDeviceIndex < selectedDevices.length - 1 ? (
                  <button className="next-device-button sketch-rotation-2" onClick={handleNextDeviceChecklist}>
                    Next Device: {getDeviceName(selectedDevices[currentDeviceIndex + 1])}
                  </button>
                ) : (
                  <button className="complete-button sketch-rotation-2" onClick={handleNextDeviceChecklist}>
                    Complete All Checklists
                  </button>
                )}
                <button
                  className="back-button"
                  onClick={() => {
                    setCurrentStep('family');
                    setCurrentDeviceIndex(0);
                  }}
                >
                  Back to Setup
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
