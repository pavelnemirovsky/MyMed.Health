'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { medicalRecordsData, getMedicalRecordsByPatientId, getPatientById } from '../../data/mockData';
import { patientsData } from '../../data/mockData';
import MedicalScanPreview from './MedicalScanPreview';
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function RecordsContent() {
  const locale = useLocale();
  const t = useTranslations('dashboard.records');
  const [selectedPatient, setSelectedPatient] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showHospitalLinkModal, setShowHospitalLinkModal] = useState(false);
  const [hospitalLink, setHospitalLink] = useState('');
  const [showShareLinkModal, setShowShareLinkModal] = useState(false);
  const [selectedRecordsForShare, setSelectedRecordsForShare] = useState<string[]>([]);

  // Filter records by patient if selected
  const filteredRecords = selectedPatient === 'all' 
    ? medicalRecordsData 
    : getMedicalRecordsByPatientId(selectedPatient);

  // Group records by type
  const recordsByType = filteredRecords.reduce((acc, record) => {
    if (!acc[record.type]) {
      acc[record.type] = [];
    }
    acc[record.type].push(record);
    return acc;
  }, {} as Record<string, typeof medicalRecordsData>);

  const submissionMethods = [
    {
      icon: '📧',
      title: t('emailSubmission'),
      description: t('emailSubmissionDesc'),
      action: t('sendToEmail'),
      email: 'records@mymed.health',
      color: '#059669',
      disabled: false,
    },
    {
      icon: '💬',
      title: t('imSubmission'),
      description: t('imSubmissionDesc'),
      action: t('sendViaIM'),
      platforms: ['Telegram', 'WhatsApp'],
      color: '#2563eb',
      disabled: true,
      comingSoon: true,
    },
    {
      icon: '📤',
      title: t('directUpload'),
      description: t('directUploadDesc'),
      action: t('uploadNow'),
      color: '#7c3aed',
      disabled: false,
    },
    {
      icon: '🔗',
      title: t('hospitalLinkSubmission'),
      description: t('hospitalLinkSubmissionDesc'),
      action: t('shareHospitalLink'),
      color: '#dc2626',
      disabled: false,
      type: 'portal',
    },
    {
      icon: '🔗',
      title: t('shareLinkSubmission'),
      description: t('shareLinkSubmissionDesc'),
      action: t('createShareLink'),
      color: '#0891b2',
      disabled: false,
      type: 'share',
    },
  ];

  return (
    <div className="dashboard-widgets">
      {/* Page Header */}
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">{t('title')}</h1>
          <p className="dashboard-page-date">{t('subtitle')}</p>
        </div>
        <div className="dashboard-header-actions">
          <select 
            className="dashboard-patient-select"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="all">{t('allPatients')}</option>
            {patientsData.map((patient) => (
              <option key={patient.id} value={patient.id}>{patient.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Submission Methods Section - Simplified */}
      <div className="dashboard-widget" style={{ marginBottom: '1.5rem' }}>
        <div className="dashboard-widget-header">
          <h3 className="dashboard-widget-title">{t('howToSubmit')}</h3>
        </div>
        <div className="dashboard-widget-content">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem',
          }}>
            {submissionMethods.map((method, index) => (
              <button
                key={index}
                disabled={method.disabled}
                onClick={() => {
                  if (method.disabled) return;
                  if (method.email) {
                    window.location.href = `mailto:${method.email}?subject=${encodeURIComponent(t('emailSubject'))}`;
                  } else if (method.platforms) {
                    alert(t('imInstructions'));
                  } else if (method.icon === '🔗') {
                    setShowHospitalLinkModal(true);
                  } else {
                    setShowUploadModal(true);
                  }
                }}
                style={{
                  padding: '1rem',
                  border: `1px solid ${method.disabled ? '#d1d5db' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  background: method.disabled ? '#f9fafb' : 'white',
                  cursor: method.disabled ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'all 0.2s ease',
                  textAlign: 'left',
                  opacity: method.disabled ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!method.disabled) {
                    e.currentTarget.style.borderColor = method.color;
                    e.currentTarget.style.background = `${method.color}08`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!method.disabled) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = 'white';
                  }
                }}
              >
                <span style={{ fontSize: '1.5rem', opacity: method.disabled ? 0.5 : 1 }}>{method.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: method.disabled ? '#9ca3af' : '#1f2937', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {method.title}
                    {method.comingSoon && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6b7280', padding: '0.125rem 0.5rem', background: '#e5e7eb', borderRadius: '4px' }}>
                        {t('comingSoon')}
                      </span>
                    )}
                  </div>
                  {method.email && (
                    <div style={{ fontSize: '0.75rem', color: method.disabled ? '#9ca3af' : '#6b7280', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {method.email}
                    </div>
                  )}
                  {method.platforms && (
                    <div style={{ fontSize: '0.75rem', color: method.disabled ? '#9ca3af' : '#6b7280' }}>
                      {method.platforms.join(', ')}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works - Timeline */}
      <div className="dashboard-widget" style={{ marginBottom: '1.5rem' }}>
        <div className="dashboard-widget-header">
          <h3 className="dashboard-widget-title">{t('howItWorks')}</h3>
        </div>
        <div className="dashboard-widget-content">
          <div className="process-timeline">
            {[
              { icon: '📤', title: t('step1Title'), desc: t('step1Desc'), step: '1' },
              { icon: '🤖', title: t('step2Title'), desc: t('step2Desc'), step: '2' },
              { icon: '📅', title: t('step3Title'), desc: t('step3Desc'), step: '3' },
              { icon: '🔔', title: t('step4Title'), desc: t('step4Desc'), step: '4' },
            ].map((item, index) => (
              <div key={index} className="process-timeline-step">
                {/* Step Card */}
                <div className="process-timeline-card">
                  {/* Step Number - Large and prominent */}
                  <div className="process-timeline-number">
                    {item.step}
                  </div>
                  
                  {/* Icon Circle */}
                  <div className="process-timeline-icon-wrapper">
                    <div className="process-timeline-icon">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div className="process-timeline-title">
                    {item.title}
                  </div>
                  
                  {/* Description */}
                  <div className="process-timeline-desc">
                    {item.desc}
                  </div>
                </div>
                
                {/* Arrow Connector */}
                {index < 3 && (
                  <div className="process-timeline-arrow">
                    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 10 L50 10" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M45 5 L50 10 L45 15" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Records Summary - Card-based Design */}
      <div className="dashboard-widget">
        <div className="dashboard-widget-header">
          <h3 className="dashboard-widget-title">{t('yourRecords')}</h3>
          <button className="dashboard-widget-menu">⋯</button>
        </div>
        <div className="dashboard-widget-content">
          {Object.keys(recordsByType).length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {Object.entries(recordsByType).map(([type, records]) => {
                const getRecordTypeIcon = (recordType: string) => {
                  switch (recordType) {
                    case 'MRI': return '🧠';
                    case 'CT Scan': return '🔬';
                    case 'PET Scan': return '⚛️';
                    case 'X-Ray': return '📷';
                    case 'Ultrasound': return '🔊';
                    case 'Blood Test': return '🩸';
                    case 'Lab Test': return '🧪';
                    case 'Biopsy': return '🔬';
                    case 'Doctor Letter': return '📝';
                    case 'Prescription': return '💊';
                    case 'Hospital Discharge': return '🏥';
                    case 'Surgery Report': return '⚕️';
                    case 'Pathology Report': return '🔬';
                    default: return '📄';
                  }
                };

                const getRecordTypeColor = (recordType: string) => {
                  switch (recordType) {
                    case 'MRI': return '#2563eb';
                    case 'CT Scan': return '#7c3aed';
                    case 'PET Scan': return '#dc2626';
                    case 'X-Ray': return '#059669';
                    case 'Ultrasound': return '#0891b2';
                    case 'Blood Test': return '#dc2626';
                    case 'Lab Test': return '#ea580c';
                    case 'Biopsy': return '#991b1b';
                    case 'Doctor Letter': return '#1e40af';
                    case 'Prescription': return '#059669';
                    case 'Hospital Discharge': return '#7c2d12';
                    case 'Surgery Report': return '#be123c';
                    case 'Pathology Report': return '#581c87';
                    default: return '#6b7280';
                  }
                };

                const formatDate = (dateString?: string) => {
                  if (!dateString) return null;
                  try {
                    const date = new Date(dateString);
                    return date.toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  } catch {
                    return null;
                  }
                };

                const formatShortDate = (dateString?: string) => {
                  if (!dateString) return null;
                  try {
                    const date = new Date(dateString);
                    return date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  } catch {
                    return null;
                  }
                };

                const getChannelBadge = (channel?: string) => {
                  if (!channel) return null;
                  const colors: Record<string, string> = {
                    'Email': '#059669',
                    'Telegram': '#0088cc',
                    'WhatsApp': '#25D366',
                    'Direct Upload': '#7c3aed',
                  };
                  const icons: Record<string, string> = {
                    'Email': '📧',
                    'Telegram': '💬',
                    'WhatsApp': '💬',
                    'Direct Upload': '📤',
                  };
                  return (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      padding: '0.375rem 0.625rem',
                      background: 'white',
                      borderRadius: '6px',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: colors[channel] || '#6b7280',
                      border: `1.5px solid ${colors[channel] || '#6b7280'}`,
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}>
                      <span>{icons[channel] || '📄'}</span>
                      <span>{channel}</span>
                    </div>
                  );
                };

                return (
                  <div key={type}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937' }}>
                        {type} ({records.length})
                      </h4>
                      {records.length > 6 && (
                        <button
                          style={{
                            fontSize: '0.875rem',
                            color: '#2563eb',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontWeight: 500,
                            padding: '0.25rem 0.5rem',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.textDecoration = 'underline';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.textDecoration = 'none';
                          }}
                        >
                          {t('viewAll')}
                        </button>
                      )}
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                      gap: '1rem',
                    }}>
                      {records.slice(0, 6).map((record) => {
                        const typeColor = getRecordTypeColor(record.type);
                        const typeIcon = getRecordTypeIcon(record.type);
                        const completedDate = formatDate(record.date);
                        const receivedDate = formatShortDate(record.receivedAt);

                        return (
                          <div
                            key={record.id}
                            style={{
                              background: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '12px',
                              overflow: 'hidden',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                              e.currentTarget.style.borderColor = typeColor;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                              e.currentTarget.style.borderColor = '#e5e7eb';
                            }}
                          >
                            {/* Visual Preview Area */}
                            <div style={{
                              width: '100%',
                              height: '140px',
                              background: '#000',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              position: 'relative',
                              overflow: 'hidden',
                            }}>
                              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MedicalScanPreview type={record.type} title={record.title} width={240} height={140} />
                              </div>
                              {record.channel && (
                                <div style={{
                                  position: 'absolute',
                                  top: '0.5rem',
                                  right: '0.5rem',
                                  zIndex: 10,
                                }}>
                                  {getChannelBadge(record.channel)}
                                </div>
                              )}
                            </div>
                            
                            {/* Content Area */}
                            <div style={{ padding: '1rem' }}>
                              {selectedPatient === 'all' && record.patientName && (
                                <div style={{
                                  fontSize: '0.8125rem',
                                  fontWeight: 700,
                                  color: '#059669',
                                  marginBottom: '0.75rem',
                                  paddingBottom: '0.5rem',
                                  borderBottom: '2px solid #d1fae5',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.375rem',
                                }}>
                                  <span style={{ fontSize: '0.875rem' }}>👤</span>
                                  <Link
                                    href={`/${locale}/dashboard/patients`}
                                    style={{
                                      color: '#059669',
                                      textDecoration: 'none',
                                      transition: 'all 0.2s ease',
                                      fontWeight: 700,
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.textDecoration = 'underline';
                                      e.currentTarget.style.color = '#047857';
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.textDecoration = 'none';
                                      e.currentTarget.style.color = '#059669';
                                    }}
                                  >
                                    {record.patientName}
                                  </Link>
                                </div>
                              )}
                              
                              <h5 style={{
                                fontSize: '0.9375rem',
                                fontWeight: 600,
                                color: '#1f2937',
                                marginBottom: '0.5rem',
                                lineHeight: 1.3,
                              }}>
                                {record.title}
                              </h5>
                              
                              {completedDate && (
                                <div style={{
                                  fontSize: '0.8125rem',
                                  color: '#6b7280',
                                  marginBottom: '0.5rem',
                                }}>
                                  {t('completedOn')} {completedDate}
                                </div>
                              )}

                              {record.receivedAt && (
                                <div style={{
                                  fontSize: '0.75rem',
                                  color: '#9ca3af',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                }}>
                                  <span>📥</span>
                                  <span>{t('received')}: {receivedDate}</span>
                                </div>
                              )}

                              {record.processedAt && record.receivedAt && (() => {
                                const received = new Date(record.receivedAt);
                                const processed = new Date(record.processedAt);
                                const diffMs = processed.getTime() - received.getTime();
                                const diffMins = Math.floor(diffMs / 60000);
                                const diffSecs = Math.floor((diffMs % 60000) / 1000);
                                return (
                                  <div style={{
                                    fontSize: '0.75rem',
                                    color: '#059669',
                                    marginTop: '0.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                  }}>
                                    <span>⚡</span>
                                    <span>{diffMins > 0 ? `${diffMins}m ${diffSecs}s` : `${diffSecs}s`} {t('processingTime')}</span>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {records.length > 6 && (
                      <div style={{
                        fontSize: '0.875rem',
                        color: '#6b7280',
                        textAlign: 'center',
                        padding: '1rem',
                        marginTop: '0.5rem',
                      }}>
                        {t('showing')} 6 {t('of')} {records.length} {t('records')}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="dashboard-empty-state">
              <div className="dashboard-empty-icon">🗂️</div>
              <h3 className="dashboard-empty-title">{t('noRecordsYet')}</h3>
              <p className="dashboard-empty-description">{t('noRecordsDesc')}</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
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
          onClick={() => setShowUploadModal(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
              {t('uploadRecords')}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              {t('uploadInstructions')}
            </p>
            <div 
              style={{
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                padding: '3rem',
                textAlign: 'center',
                marginBottom: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#059669';
                e.currentTarget.style.background = '#f0fdf4';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d1d5db';
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📤</div>
              <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                {t('dragAndDrop')}
              </p>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                {t('orClickToBrowse')}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowUploadModal(false)}
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
                  alert(t('uploadComingSoon'));
                  setShowUploadModal(false);
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
                {t('upload')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hospital Link Modal */}
      {showHospitalLinkModal && (
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
          onClick={() => setShowHospitalLinkModal(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {t('hospitalLinkSubmission')}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              {t('hospitalLinkInstructions')}
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="text"
                value={hospitalLink}
                onChange={(e) => setHospitalLink(e.target.value)}
                placeholder={t('hospitalLinkPlaceholder')}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowHospitalLinkModal(false);
                  setHospitalLink('');
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
                  if (hospitalLink.trim()) {
                    // In a real app, this would send the link to the backend
                    alert(`Hospital link submitted: ${hospitalLink}\n\nWe'll securely fetch your records from the hospital portal.`);
                    setShowHospitalLinkModal(false);
                    setHospitalLink('');
                  }
                }}
                disabled={!hospitalLink.trim()}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: hospitalLink.trim() ? '#dc2626' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: hospitalLink.trim() ? 'pointer' : 'not-allowed',
                  opacity: hospitalLink.trim() ? 1 : 0.6,
                }}
              >
                {t('shareHospitalLink')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Link Modal */}
      {showShareLinkModal && (
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
            setShowShareLinkModal(false);
            setSelectedRecordsForShare([]);
          }}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {t('shareLinkSubmission')}
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              {t('shareLinkInstructions')}
            </p>
            
            {/* Records Selection */}
            <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflow: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '0.75rem' }}>
              {filteredRecords.length === 0 ? (
                <p style={{ fontSize: '0.875rem', color: '#9ca3af', textAlign: 'center', padding: '1rem' }}>
                  {t('noRecordsYet')}
                </p>
              ) : (
                filteredRecords.slice(0, 20).map((record) => (
                  <label
                    key={record.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedRecordsForShare.includes(record.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRecordsForShare([...selectedRecordsForShare, record.id]);
                        } else {
                          setSelectedRecordsForShare(selectedRecordsForShare.filter(id => id !== record.id));
                        }
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1f2937' }}>
                        {record.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                        {record.type} • {new Date(record.date).toLocaleDateString()}
                      </div>
                    </div>
                  </label>
                ))
              )}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button
                onClick={() => {
                  setShowShareLinkModal(false);
                  setSelectedRecordsForShare([]);
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
                  if (selectedRecordsForShare.length > 0) {
                    // In a real app, this would generate a secure share link
                    const shareLink = `https://mymed.health/share/${btoa(selectedRecordsForShare.join(','))}`;
                    navigator.clipboard.writeText(shareLink).then(() => {
                      alert(`Share link created and copied to clipboard!\n\n${shareLink}\n\nYou can now share this link with others.`);
                      setShowShareLinkModal(false);
                      setSelectedRecordsForShare([]);
                    }).catch(() => {
                      alert(`Share link created:\n\n${shareLink}\n\nCopy this link to share with others.`);
                      setShowShareLinkModal(false);
                      setSelectedRecordsForShare([]);
                    });
                  }
                }}
                disabled={selectedRecordsForShare.length === 0}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: selectedRecordsForShare.length > 0 ? '#0891b2' : '#d1d5db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  cursor: selectedRecordsForShare.length > 0 ? 'pointer' : 'not-allowed',
                  opacity: selectedRecordsForShare.length > 0 ? 1 : 0.6,
                }}
              >
                {t('createShareLink')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

