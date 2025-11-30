'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { doctorsData, medicalProvidersData, getDoctorsByPatientId, getMedicalProvidersByPatientId } from '../../data/mockData';
import { patientsData } from '../../data/mockData';

interface Message {
  id: string;
  from: {
    type: 'doctor' | 'provider' | 'system';
    id: string;
    name: string;
    email?: string;
  };
  to: {
    type: 'user' | 'doctor' | 'provider';
    name: string;
  };
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  category?: 'appointment' | 'test-results' | 'prescription' | 'general' | 'urgent';
  attachments?: number;
}

interface MessagesContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function MessagesContent({ user }: MessagesContentProps) {
  const t = useTranslations('dashboard.messages');
  
  // Generate user's MyMed.Health email address
  const getUserEmail = () => {
    if (!user.name) return 'your.name@MyMed.Health';
    // Convert name to email format: "John Doe" -> "john.doe@MyMed.Health"
    const emailName = user.name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '.') // Replace spaces with dots
      .replace(/\.+/g, '.') // Replace multiple dots with single dot
      .replace(/^\.|\.$/g, ''); // Remove leading/trailing dots
    return `${emailName}@MyMed.Health`;
  };
  
  const userEmail = getUserEmail();
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [composeTo, setComposeTo] = useState<{ type: string; id: string; name: string } | null>(null);

  // Check URL params for pre-filling compose form
  useEffect(() => {
    const recipientId = searchParams.get('to');
    const recipientType = searchParams.get('type');
    
    if (recipientId && recipientType) {
      if (recipientType === 'doctor') {
        const doctor = doctorsData.find(d => d.id === recipientId);
        if (doctor) {
          setComposeTo({ type: 'doctor', id: doctor.id, name: doctor.name });
          setShowCompose(true);
        }
      } else if (recipientType === 'provider') {
        const provider = medicalProvidersData.find(p => p.id === recipientId);
        if (provider) {
          setComposeTo({ type: 'provider', id: provider.id, name: provider.name });
          setShowCompose(true);
        }
      }
    }
  }, [searchParams]);

  // Mock messages data
  const mockMessages: Message[] = [
    {
      id: 'msg-1',
      from: { type: 'doctor', id: 'doctor-1', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@hospital.com' },
      to: { type: 'user', name: 'John Doe' },
      subject: 'Test Results - Blood Work',
      preview: 'Your recent blood test results are now available. All values are within normal range...',
      date: '2025-01-20T10:30:00Z',
      read: false,
      category: 'test-results',
      attachments: 1,
    },
    {
      id: 'msg-2',
      from: { type: 'provider', id: 'provider-1', name: 'Maccabi HealthCare', email: 'contact@maccabi.co.il' },
      to: { type: 'user', name: 'John Doe' },
      subject: 'Appointment Reminder - Dr. Cohen',
      preview: 'This is a reminder that you have an appointment scheduled for tomorrow at 2:00 PM...',
      date: '2025-01-19T14:20:00Z',
      read: true,
      category: 'appointment',
    },
    {
      id: 'msg-3',
      from: { type: 'doctor', id: 'doctor-2', name: 'Dr. Michael Chen', email: 'mchen@clinic.com' },
      to: { type: 'user', name: 'John Doe' },
      subject: 'Prescription Ready for Pickup',
      preview: 'Your prescription has been sent to the pharmacy and is ready for pickup...',
      date: '2025-01-18T09:15:00Z',
      read: false,
      category: 'prescription',
    },
    {
      id: 'msg-4',
      from: { type: 'system', id: 'system', name: 'MedTracker System', email: 'noreply@mymed.health' },
      to: { type: 'user', name: 'John Doe' },
      subject: 'New Medical Record Processed',
      preview: 'We have successfully processed and added your MRI scan to your timeline...',
      date: '2025-01-17T16:45:00Z',
      read: true,
      category: 'general',
    },
    {
      id: 'msg-5',
      from: { type: 'provider', id: 'provider-2', name: 'Sheba Medical Center', email: 'info@sheba.co.il' },
      to: { type: 'user', name: 'John Doe' },
      subject: 'Urgent: Follow-up Required',
      preview: 'Please contact us immediately regarding your recent test results...',
      date: '2025-01-16T11:00:00Z',
      read: false,
      category: 'urgent',
    },
  ];

  const filters = [
    { id: 'all', label: t('allMessages'), count: mockMessages.length },
    { id: 'unread', label: t('unread'), count: mockMessages.filter(m => !m.read).length },
    { id: 'doctors', label: t('fromDoctors'), count: mockMessages.filter(m => m.from.type === 'doctor').length },
    { id: 'providers', label: t('fromProviders'), count: mockMessages.filter(m => m.from.type === 'provider').length },
    { id: 'urgent', label: t('urgent'), count: mockMessages.filter(m => m.category === 'urgent').length },
  ];

  const filteredMessages = selectedFilter === 'all'
    ? mockMessages
    : selectedFilter === 'unread'
    ? mockMessages.filter(m => !m.read)
    : selectedFilter === 'doctors'
    ? mockMessages.filter(m => m.from.type === 'doctor')
    : selectedFilter === 'providers'
    ? mockMessages.filter(m => m.from.type === 'provider')
    : selectedFilter === 'urgent'
    ? mockMessages.filter(m => m.category === 'urgent')
    : mockMessages;

  const selectedMessageData = mockMessages.find(m => m.id === selectedMessage);

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'appointment': return '📅';
      case 'test-results': return '🩸';
      case 'prescription': return '💊';
      case 'urgent': return '⚠️';
      default: return '📧';
    }
  };

  return (
    <div className="dashboard-widgets">
      {/* Page Header */}
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">{t('title')}</h1>
          <p className="dashboard-page-date">{t('subtitle')}</p>
        </div>
        <div className="dashboard-header-actions">
          <button
            onClick={() => setShowCompose(true)}
            style={{
              padding: '0.5rem 1rem',
              background: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <span>✉️</span>
            {t('compose')}
          </button>
        </div>
      </div>

      {/* Virtual Inbox Info */}
      <div className="dashboard-widget" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '1px solid #bae6fd' }}>
        <div className="dashboard-widget-content">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ fontSize: '2rem', flexShrink: 0 }}>📬</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#0c4a6e', marginBottom: '0.5rem' }}>
                {t('virtualInbox')}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#075985', lineHeight: '1.6', marginBottom: '0.75rem' }}>
                {t('virtualInboxDesc')}
              </div>
              <div style={{ 
                padding: '0.75rem 1rem', 
                background: 'white', 
                borderRadius: '8px', 
                border: '2px solid #059669',
                marginTop: '0.75rem'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#0c4a6e', fontWeight: 600, marginBottom: '0.25rem' }}>
                  {t('yourEmail')}:
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#059669', fontFamily: 'monospace' }}>
                  {userEmail}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#075985', marginTop: '0.5rem', lineHeight: '1.5' }}>
                  {t('emailInstructions')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.5rem' }}>
        {/* Sidebar - Filters */}
        <div className="dashboard-widget">
          <div className="dashboard-widget-header">
            <h3 className="dashboard-widget-title">{t('filters')}</h3>
          </div>
          <div className="dashboard-widget-content" style={{ padding: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    border: 'none',
                    background: selectedFilter === filter.id ? '#f0fdf4' : 'transparent',
                    color: selectedFilter === filter.id ? '#059669' : '#6b7280',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.875rem',
                    fontWeight: selectedFilter === filter.id ? 600 : 500,
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    borderLeft: selectedFilter === filter.id ? '3px solid #059669' : '3px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedFilter !== filter.id) {
                      e.currentTarget.style.background = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedFilter !== filter.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span>{filter.label}</span>
                  <span style={{
                    fontSize: '0.75rem',
                    background: selectedFilter === filter.id ? '#059669' : '#e5e7eb',
                    color: selectedFilter === filter.id ? 'white' : '#6b7280',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '12px',
                    fontWeight: 600,
                  }}>
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages List */}
        <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
          {/* Messages List */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">{t('messages')}</h3>
            </div>
            <div className="dashboard-widget-content" style={{ padding: 0 }}>
              {filteredMessages.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📭</div>
                  <div style={{ fontSize: '0.875rem' }}>{t('noMessages')}</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => setSelectedMessage(message.id)}
                      style={{
                        padding: '1rem',
                        borderBottom: '1px solid #e5e7eb',
                        cursor: 'pointer',
                        background: selectedMessage === message.id ? '#f0fdf4' : message.read ? 'white' : '#f9fafb',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (selectedMessage !== message.id) {
                          e.currentTarget.style.background = '#f9fafb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedMessage !== message.id) {
                          e.currentTarget.style.background = message.read ? 'white' : '#f9fafb';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                        <div style={{ fontSize: '1.5rem', flexShrink: 0 }}>
                          {getCategoryIcon(message.category)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: message.read ? 500 : 600, color: '#1f2937' }}>
                              {message.from.name}
                            </div>
                            {!message.read && (
                              <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: '#059669',
                                flexShrink: 0,
                              }} />
                            )}
                            {message.category === 'urgent' && (
                              <span style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600 }}>
                                {t('urgent')}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>
                            {message.subject}
                          </div>
                          <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginBottom: '0.5rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {message.preview}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.75rem', color: '#9ca3af' }}>
                            <span>{new Date(message.date).toLocaleDateString()}</span>
                            {message.attachments && (
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                📎 {message.attachments}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Message Detail View */}
          {selectedMessage && selectedMessageData && (
            <div className="dashboard-widget">
              <div className="dashboard-widget-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                  <span style={{ fontSize: '1.5rem' }}>{getCategoryIcon(selectedMessageData.category)}</span>
                  <h3 className="dashboard-widget-title" style={{ margin: 0 }}>{selectedMessageData.subject}</h3>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  style={{
                    padding: '0.5rem',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '1.25rem',
                  }}
                >
                  ✕
                </button>
              </div>
              <div className="dashboard-widget-content">
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      <strong>{t('from')}:</strong> {selectedMessageData.from.name}
                      {selectedMessageData.from.email && ` <${selectedMessageData.from.email}>`}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      <strong>{t('to')}:</strong> {selectedMessageData.to.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                      <strong>{t('date')}:</strong> {new Date(selectedMessageData.date).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
                  {selectedMessageData.preview}
                  {'\n\n'}
                  {t('fullMessagePlaceholder')}
                </div>
                {selectedMessageData.attachments && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                      {t('attachments')}
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <div style={{
                        padding: '0.75rem',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem',
                      }}>
                        <span>📄</span>
                        <span>test-results.pdf</span>
                      </div>
                    </div>
                  </div>
                )}
                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => {
                      setComposeTo({
                        type: selectedMessageData.from.type,
                        id: selectedMessageData.from.id,
                        name: selectedMessageData.from.name,
                      });
                      setShowCompose(true);
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#059669',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {t('reply')}
                  </button>
                  <button
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {t('forward')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => {
            setShowCompose(false);
            setComposeTo(null);
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '700px',
              width: '90%',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              {t('composeMessage')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {t('to')}
                </label>
                <select
                  value={composeTo?.id || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.startsWith('doctor-')) {
                      const doctor = doctorsData.find(d => d.id === value);
                      if (doctor) setComposeTo({ type: 'doctor', id: doctor.id, name: doctor.name });
                    } else if (value.startsWith('provider-')) {
                      const provider = medicalProvidersData.find(p => p.id === value);
                      if (provider) setComposeTo({ type: 'provider', id: provider.id, name: provider.name });
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    background: 'white',
                  }}
                >
                  <option value="">{t('selectRecipient')}</option>
                  <optgroup label={t('doctors')}>
                    {doctorsData.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={t('medicalProviders')}>
                    {medicalProvidersData.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {t('subject')}
                </label>
                <input
                  type="text"
                  placeholder={t('subjectPlaceholder')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                  {t('message')}
                </label>
                <textarea
                  rows={8}
                  placeholder={t('messagePlaceholder')}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                  }}
                />
              </div>
              <div style={{ padding: '1rem', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px' }}>
                <div style={{ fontSize: '0.8125rem', color: '#075985' }}>
                  {t('emailRoutingNote')}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setShowCompose(false);
                    setComposeTo(null);
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={() => {
                    alert(t('messageSent'));
                    setShowCompose(false);
                    setComposeTo(null);
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {t('send')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

