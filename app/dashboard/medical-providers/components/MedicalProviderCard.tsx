'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { MedicalProvider } from '../../data/mockData';
import { getPatientById, getDoctorById } from '../../data/mockData';

interface MedicalProviderCardProps {
  provider: MedicalProvider;
  onEdit?: (provider: MedicalProvider) => void;
  onDelete?: (providerId: string) => void;
}

export default function MedicalProviderCard({ provider, onEdit, onDelete }: MedicalProviderCardProps) {
  const locale = useLocale();
  
  const getInitials = (name: string): string => {
    // Get initials from name (e.g., "Maccabi HealthCare" -> "MH")
    const words = name.split(' ').filter(w => w.length > 0);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const initials = getInitials(provider.name);
  const patientData = provider.patients.map(id => {
    const patient = getPatientById(id);
    return { id, name: patient?.name || 'Unknown' };
  });

  const doctorData = provider.doctors?.map(id => {
    const doctor = getDoctorById(id);
    return { id, name: doctor?.name || 'Unknown' };
  }) || [];

  const getTypeIcon = (type: MedicalProvider['type']) => {
    switch (type) {
      case 'HMO':
        return '🏥';
      case 'Hospital':
        return '🏨';
      case 'Clinic':
        return '🏩';
      case 'Medical Center':
        return '🏥';
      default:
        return '🏥';
    }
  };

  const getTypeColor = (type: MedicalProvider['type']) => {
    switch (type) {
      case 'HMO':
        return '#059669';
      case 'Hospital':
        return '#dc2626';
      case 'Clinic':
        return '#2563eb';
      case 'Medical Center':
        return '#7c3aed';
      default:
        return '#059669';
    }
  };

  const getTypeGradient = (type: MedicalProvider['type']) => {
    const color = getTypeColor(type);
    // Convert hex to rgba with 50% opacity
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.5) 0%, rgba(${r}, ${g}, ${b}, 0.3) 100%)`;
  };

  return (
    <div className="patient-card">
      <div className="patient-card-header">
        <div className="patient-avatar-large" style={{ background: getTypeGradient(provider.type) }}>
          {getTypeIcon(provider.type)}
        </div>
        {(onEdit || onDelete) && (
          <div className="patient-card-actions">
            {onEdit && (
              <button
                className="patient-card-action-btn"
                onClick={() => onEdit(provider)}
                aria-label="Edit provider"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                className="patient-card-action-btn patient-card-action-btn-danger"
                onClick={() => onDelete(provider.id)}
                aria-label="Remove provider"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="patient-card-body">
        <h3 className="patient-card-name">{provider.name}</h3>
        <div className="patient-card-relationship" style={{ color: getTypeColor(provider.type) }}>
          {provider.type}
        </div>
        
        {(provider.city || provider.country) && (
          <div className="patient-card-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {provider.city && provider.country 
              ? `${provider.city}, ${provider.country}`
              : provider.city || provider.country}
          </div>
        )}

        {provider.address && (
          <div className="patient-card-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {provider.address}
          </div>
        )}

        {provider.phone && (
          <div className="patient-card-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            {provider.phone}
          </div>
        )}

        {provider.email && (
          <div className="patient-card-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <Link
              href={`/${locale}/dashboard/messages?to=${provider.id}&type=provider`}
              style={{
                color: '#059669',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
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
              {provider.email}
            </Link>
          </div>
        )}

        {provider.website && (
          <div className="patient-card-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <a href={provider.website} target="_blank" rel="noopener noreferrer" style={{ color: '#059669', textDecoration: 'underline' }}>
              {provider.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}

        {provider.specialties && provider.specialties.length > 0 && (
          <div className="patient-card-section">
            <div className="patient-section-label">Specialties & Services</div>
            <div className="patient-tags" style={{ flexWrap: 'wrap' }}>
              {provider.specialties.slice(0, 6).map((specialty, index) => (
                <span key={index} className="patient-tag" style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem' }}>
                  {specialty}
                </span>
              ))}
              {provider.specialties.length > 6 && (
                <span className="patient-tag" style={{ background: '#f3f4f6', color: '#6b7280', fontSize: '0.75rem' }}>
                  +{provider.specialties.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {patientData.length > 0 && (
          <div className="patient-card-section">
            <div className="patient-section-label">Patients</div>
            <div className="patient-tags">
              {patientData.map((patient) => (
                <Link
                  key={patient.id}
                  href={`/${locale}/dashboard/patients`}
                  className="patient-tag"
                  style={{ 
                    background: '#e0f2fe', 
                    color: '#0369a1',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#bae6fd';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#e0f2fe';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  {patient.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {doctorData.length > 0 && (
          <div className="patient-card-section">
            <div className="patient-section-label">Associated Doctors</div>
            <div className="patient-tags">
              {doctorData.map((doctor) => (
                <Link
                  key={doctor.id}
                  href={`/${locale}/dashboard/doctors`}
                  className="patient-tag"
                  style={{ 
                    background: '#fef3c7', 
                    color: '#92400e',
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fde68a';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fef3c7';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  {doctor.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {provider.notes && (
          <div className="patient-card-section">
            <div className="patient-section-label">Notes</div>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0, lineHeight: 1.5 }}>
              {provider.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


