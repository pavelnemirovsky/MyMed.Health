'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ReportPage() {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    scamType: '',
    scamDate: '',
    scamMethod: '',
    scammerContact: '',
    description: '',
    amountLost: '',
    location: '',
    additionalInfo: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isAnonymous,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form after 3 seconds
        setTimeout(() => {
          setFormData({
            name: '',
            email: '',
            phone: '',
            scamType: '',
            scamDate: '',
            scamMethod: '',
            scammerContact: '',
            description: '',
            amountLost: '',
            location: '',
            additionalInfo: '',
          });
          setSubmitStatus('idle');
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <main className="report-page">
        <div className="report-container">
          <div className="report-header">
            <h1 className="report-title">Report a Scam</h1>
            <p className="report-subtitle">
              Help us protect others by reporting scams. Your information will be kept confidential.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="report-form">
            {/* Anonymous Toggle */}
            <div className="form-section">
              <label className="form-toggle">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <span>Report anonymously</span>
              </label>
            </div>

            {/* Contact Information - Only if not anonymous */}
            {!isAnonymous && (
              <div className="form-section">
                <h3 className="section-title">Your Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name (optional)"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com (optional)"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone (optional)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Scam Details */}
            <div className="form-section">
              <h3 className="section-title">Scam Details</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="scamType">Type of Scam</label>
                  <select
                    id="scamType"
                    name="scamType"
                    value={formData.scamType}
                    onChange={handleChange}
                  >
                    <option value="">Select type...</option>
                    <option value="phone">Phone Call</option>
                    <option value="sms">SMS/Text Message</option>
                    <option value="email">Email</option>
                    <option value="social-media">Social Media</option>
                    <option value="website">Fake Website</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="scamMethod">Scam Method</label>
                  <select
                    id="scamMethod"
                    name="scamMethod"
                    value={formData.scamMethod}
                    onChange={handleChange}
                  >
                    <option value="">Select method...</option>
                    <option value="phishing">Phishing</option>
                    <option value="impersonation">Impersonation</option>
                    <option value="tech-support">Tech Support Scam</option>
                    <option value="romance">Romance Scam</option>
                    <option value="investment">Investment Fraud</option>
                    <option value="lottery">Lottery/Prize Scam</option>
                    <option value="blackmail">Blackmail/Extortion</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="scamDate">Date of Scam</label>
                  <input
                    type="date"
                    id="scamDate"
                    name="scamDate"
                    value={formData.scamDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amountLost">Amount Lost (if any)</label>
                  <input
                    type="text"
                    id="amountLost"
                    name="amountLost"
                    value={formData.amountLost}
                    onChange={handleChange}
                    placeholder="e.g., $500 or None"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="scammerContact">Scammer Contact Info</label>
                  <input
                    type="text"
                    id="scammerContact"
                    name="scammerContact"
                    value={formData.scammerContact}
                    onChange={handleChange}
                    placeholder="Phone number, email, or other contact info"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="City, Country (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Free Form Description */}
            <div className="form-section">
              <div className="form-group full-width">
                <label htmlFor="description">What Happened? *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the scam in detail. What did the scammer say? What did they ask you to do? How did they contact you?"
                  rows={8}
                  required
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="form-section">
              <div className="form-group full-width">
                <label htmlFor="additionalInfo">Additional Information</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  placeholder="Any other relevant details, screenshots description, links, etc."
                  rows={4}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting || !formData.description.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Report'}
              </button>
              
              {submitStatus === 'success' && (
                <div className="form-message success">
                  Thank you! Your report has been submitted successfully.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="form-message error">
                  There was an error submitting your report. Please try again.
                </div>
              )}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </>
  );
}

