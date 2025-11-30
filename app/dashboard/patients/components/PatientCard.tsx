'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Patient } from '../../data/mockData';

interface PatientCardProps {
  patient: Patient;
  onEdit: (patient: Patient) => void;
  onDelete: (patientId: string) => void;
}

export default function PatientCard({ patient, onEdit, onDelete }: PatientCardProps) {
  const locale = useLocale();
  
  return (
    <div className="patient-card">
      <div className="patient-card-header">
        <div className="patient-avatar-large">
          {patient.initials}
        </div>
        <div className="patient-card-actions">
          <button
            className="patient-card-action-btn"
            onClick={() => onEdit(patient)}
            aria-label="Edit person"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <button
            className="patient-card-action-btn patient-card-action-btn-danger"
            onClick={() => onDelete(patient.id)}
            aria-label="Remove person"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="patient-card-body">
        <h3 className="patient-card-name">{patient.name}</h3>
        {patient.relationshipToAccountOwner && (
          <div className="patient-card-relationship">
            {patient.relationshipToAccountOwner}
          </div>
        )}
        
        <div className="patient-card-info">
          {patient.age && (
            <div className="patient-info-item">
              <span className="patient-info-label">Age</span>
              <span className="patient-info-value">{patient.age} years</span>
            </div>
          )}
          {patient.gender && (
            <div className="patient-info-item">
              <span className="patient-info-label">Gender</span>
              <span className="patient-info-value">{patient.gender}</span>
            </div>
          )}
        </div>

        {patient.email && (
          <div className="patient-card-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <a
              href={`mailto:${patient.email}`}
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
              {patient.email}
            </a>
          </div>
        )}

        {patient.phone && (
          <div className="patient-card-contact">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            {patient.phone}
          </div>
        )}

        {patient.medicalConditions && patient.medicalConditions.length > 0 && (
          <div className="patient-card-section">
            <div className="patient-section-label">Medical Conditions</div>
            <div className="patient-tags">
              {patient.medicalConditions.map((condition, index) => (
                <span key={index} className="patient-tag patient-tag-condition">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        )}

        {patient.allergies && patient.allergies.length > 0 && (
          <div className="patient-card-section">
            <div className="patient-section-label">Allergies</div>
            <div className="patient-tags">
              {patient.allergies.map((allergy, index) => (
                <span key={index} className="patient-tag patient-tag-allergy">
                  {allergy}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

