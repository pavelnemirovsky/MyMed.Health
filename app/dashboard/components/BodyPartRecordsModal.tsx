'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { MedicalRecord } from '../data/mockData';
import { BodyPart, getBodyPartLabel } from '../utils/bodyPartMapper';

interface BodyPartRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bodyPart: BodyPart | null;
  records: MedicalRecord[];
  side?: 'left' | 'right';
}

export default function BodyPartRecordsModal({
  isOpen,
  onClose,
  bodyPart,
  records,
  side,
}: BodyPartRecordsModalProps) {
  const t = useTranslations('dashboard.bodyVisualizationDetails');
  const locale = useLocale();

  if (!isOpen || !bodyPart) return null;

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString(locale, {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
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

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          maxWidth: '700px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}>
          <div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: '#1f2937',
              marginBottom: '0.25rem',
            }}>
              {getBodyPartLabel(bodyPart, side)}
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
            }}>
              {records.length} {records.length === 1 ? t('record') : t('records')}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0.25rem',
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f3f4f6';
              e.currentTarget.style.color = '#1f2937';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'none';
              e.currentTarget.style.color = '#6b7280';
            }}
            aria-label={t('close')}
          >
            ×
          </button>
        </div>

        {/* Records List */}
        {records.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#9ca3af',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📋</div>
            <div style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>
              {t('noRecordsForPart')}
            </div>
            <div style={{ fontSize: '0.875rem' }}>
              {t('noRecordsForPartDesc')}
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            {records.map((record) => {
              const typeColor = getRecordTypeColor(record.type);
              const typeIcon = getRecordTypeIcon(record.type);

              return (
                <Link
                  key={record.id}
                  href={`/${locale}/dashboard/records`}
                  style={{
                    display: 'block',
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = typeColor;
                    e.currentTarget.style.background = `${typeColor}08`;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                  }}>
                    {/* Icon */}
                    <div style={{
                      fontSize: '2rem',
                      flexShrink: 0,
                    }}>
                      {typeIcon}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginBottom: '0.5rem',
                      }}>
                        <h4 style={{
                          fontSize: '0.9375rem',
                          fontWeight: 600,
                          color: '#1f2937',
                          margin: 0,
                        }}>
                          {record.title}
                        </h4>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 500,
                          color: typeColor,
                          padding: '0.125rem 0.5rem',
                          background: `${typeColor}15`,
                          borderRadius: '4px',
                        }}>
                          {record.type}
                        </span>
                      </div>

                      {record.patientName && (
                        <div style={{
                          fontSize: '0.8125rem',
                          color: '#059669',
                          fontWeight: 500,
                          marginBottom: '0.25rem',
                        }}>
                          {record.patientName}
                        </div>
                      )}

                      <div style={{
                        fontSize: '0.8125rem',
                        color: '#6b7280',
                        marginBottom: '0.25rem',
                      }}>
                        {t('completedOn')} {formatDate(record.date)}
                      </div>

                      {record.doctorName && (
                        <div style={{
                          fontSize: '0.8125rem',
                          color: '#6b7280',
                        }}>
                          {t('doctor')}: {record.doctorName}
                        </div>
                      )}

                      {record.description && (
                        <div style={{
                          fontSize: '0.8125rem',
                          color: '#374151',
                          marginTop: '0.5rem',
                          paddingTop: '0.5rem',
                          borderTop: '1px solid #e5e7eb',
                          lineHeight: 1.5,
                        }}>
                          {record.description}
                        </div>
                      )}

                      {record.tags && record.tags.length > 0 && (
                        <div style={{
                          display: 'flex',
                          gap: '0.5rem',
                          marginTop: '0.5rem',
                          flexWrap: 'wrap',
                        }}>
                          {record.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              style={{
                                fontSize: '0.75rem',
                                padding: '0.125rem 0.5rem',
                                background: tag === 'urgent' ? '#fee2e2' : '#fef3c7',
                                color: tag === 'urgent' ? '#991b1b' : '#92400e',
                                borderRadius: '4px',
                                fontWeight: 500,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <button
            onClick={onClose}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.875rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#047857';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#059669';
            }}
          >
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}

