'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { medications, Medication, getMedicationsByPatientId, getActiveMedicationsByPatientId } from '../../data/mockData';
import { patientsData } from '../../data/mockData';

export default function MedicationsContent() {
  const t = useTranslations('dashboard.medications');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [filterPatient, setFilterPatient] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMedication, setExpandedMedication] = useState<string | null>(null);

  // Filter medications
  const filteredMedications = medications.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.genericName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.indication?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPatient = filterPatient === 'all' || med.patientId === filterPatient;
    
    const matchesStatus = filterStatus === 'all' || med.status === filterStatus;
    
    return matchesSearch && matchesPatient && matchesStatus;
  });

  const activeMedications = medications.filter(m => m.status === 'active');
  const completedMedications = medications.filter(m => m.status === 'completed');
  const discontinuedMedications = medications.filter(m => m.status === 'discontinued');

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return '#059669';
      case 'completed': return '#6b7280';
      case 'discontinued': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusBadgeBg = (status: string) => {
    switch (status) {
      case 'active': return '#d1fae5';
      case 'completed': return '#f3f4f6';
      case 'discontinued': return '#fee2e2';
      default: return '#f3f4f6';
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
      </div>

      {/* Summary Cards - Compact */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        <div className="dashboard-widget" style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 600, marginBottom: '0.25rem' }}>
            {t('activeMedications')}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#059669' }}>
            {activeMedications.length}
          </div>
        </div>
        <div className="dashboard-widget" style={{ background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#374151', fontWeight: 600, marginBottom: '0.25rem' }}>
            {t('completed')}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6b7280' }}>
            {completedMedications.length}
          </div>
        </div>
        <div className="dashboard-widget" style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 600, marginBottom: '0.25rem' }}>
            {t('discontinued')}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>
            {discontinuedMedications.length}
          </div>
        </div>
        <div className="dashboard-widget" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 600, marginBottom: '0.25rem' }}>
            {t('totalMedications')}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2563eb' }}>
            {medications.length}
          </div>
        </div>
      </div>

      {/* Filters and Search - Compact */}
      <div className="dashboard-widget" style={{ marginBottom: '1rem', padding: '0.75rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem 0.5rem 2rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '0.8125rem',
              }}
            />
            <span style={{ position: 'absolute', left: '0.5rem', top: '50%', transform: 'translateY(-50%)', fontSize: '0.875rem' }}>
              🔍
            </span>
          </div>
          <select
            value={filterPatient}
            onChange={(e) => setFilterPatient(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              background: 'white',
              minWidth: '120px',
            }}
          >
            <option value="all">{t('allPatients')}</option>
            {patientsData.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              background: 'white',
              minWidth: '120px',
            }}
          >
            <option value="all">{t('allStatuses')}</option>
            <option value="active">{t('active')}</option>
            <option value="completed">{t('completed')}</option>
            <option value="discontinued">{t('discontinued')}</option>
          </select>
        </div>
      </div>

      {/* Medications List - Compact */}
      {filteredMedications.length === 0 ? (
        <div className="dashboard-widget" style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💊</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>
              {t('noMedicationsFound')}
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
              {t('tryAdjustingFilters')}
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-widget" style={{ padding: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredMedications.map((medication) => {
              const isExpanded = expandedMedication === medication.id;
              return (
                <div
                  key={medication.id}
                  style={{
                    padding: '0.75rem 1rem',
                    borderBottom: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    background: isExpanded ? '#f9fafb' : 'white',
                    transition: 'background 0.2s ease',
                    borderLeft: `3px solid ${getStatusBadgeColor(medication.status)}`,
                  }}
                  onClick={() => setExpandedMedication(isExpanded ? null : medication.id)}
                  onMouseEnter={(e) => {
                    if (!isExpanded) e.currentTarget.style.background = '#f9fafb';
                  }}
                  onMouseLeave={(e) => {
                    if (!isExpanded) e.currentTarget.style.background = 'white';
                  }}
                >
                  {/* Compact Row View */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    {/* Medication Name & Status */}
                    <div style={{ flex: '1 1 200px', minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937' }}>
                          {medication.name}
                        </span>
                        <span
                          style={{
                            padding: '0.125rem 0.5rem',
                            borderRadius: '8px',
                            fontSize: '0.6875rem',
                            fontWeight: 600,
                            background: getStatusBadgeBg(medication.status),
                            color: getStatusBadgeColor(medication.status),
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t(medication.status)}
                        </span>
                      </div>
                      {medication.genericName && (
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {medication.genericName}
                        </div>
                      )}
                    </div>

                    {/* Dosage & Frequency */}
                    <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8125rem', color: '#374151' }}>
                      <span style={{ fontWeight: 600 }}>{medication.dosage}</span>
                      <span style={{ color: '#9ca3af' }}>•</span>
                      <span>{medication.frequency}</span>
                    </div>

                    {/* Patient */}
                    <div style={{ flex: '0 0 auto', fontSize: '0.8125rem', color: '#6b7280', minWidth: '100px' }}>
                      {medication.patientName}
                    </div>

                    {/* Prescribed By */}
                    <div className="medication-prescribed-by" style={{ flex: '0 0 auto', fontSize: '0.8125rem', color: '#6b7280', minWidth: '120px' }}>
                      {medication.prescribedBy.split(' ').slice(0, 2).join(' ')}
                    </div>

                    {/* Expand/Collapse Icon */}
                    <div style={{ flex: '0 0 auto', fontSize: '0.875rem', color: '#9ca3af' }}>
                      {isExpanded ? '▼' : '▶'}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', fontSize: '0.8125rem' }}>
                        <div>
                          <span style={{ fontWeight: 600, color: '#6b7280', marginRight: '0.5rem' }}>{t('indication')}:</span>
                          <span style={{ color: '#1f2937' }}>{medication.indication || '—'}</span>
                        </div>
                        <div>
                          <span style={{ fontWeight: 600, color: '#6b7280', marginRight: '0.5rem' }}>{t('prescribedBy')}:</span>
                          <span style={{ color: '#1f2937' }}>{medication.prescribedBy}</span>
                        </div>
                        {medication.instructions && (
                          <div>
                            <span style={{ fontWeight: 600, color: '#6b7280', marginRight: '0.5rem' }}>{t('instructions')}:</span>
                            <span style={{ color: '#1f2937' }}>{medication.instructions}</span>
                          </div>
                        )}
                        {medication.refillsRemaining !== undefined && (
                          <div>
                            <span style={{ fontWeight: 600, color: '#6b7280', marginRight: '0.5rem' }}>{t('refillsRemaining')}:</span>
                            <span style={{ color: '#1f2937' }}>{medication.refillsRemaining} {medication.refillsRemaining === 1 ? t('refill') : t('refills')}</span>
                          </div>
                        )}
                        {medication.pharmacy && (
                          <div>
                            <span style={{ fontWeight: 600, color: '#6b7280', marginRight: '0.5rem' }}>{t('pharmacy')}:</span>
                            <span style={{ color: '#1f2937' }}>{medication.pharmacy}</span>
                          </div>
                        )}
                        {medication.sideEffects && medication.sideEffects.length > 0 && (
                          <div>
                            <span style={{ fontWeight: 600, color: '#6b7280', marginRight: '0.5rem' }}>{t('sideEffects')}:</span>
                            <span style={{ color: '#1f2937' }}>{medication.sideEffects.join(', ')}</span>
                          </div>
                        )}
                        <div>
                          <span style={{ fontWeight: 600, color: '#6b7280', marginRight: '0.5rem' }}>{t('startDate')}:</span>
                          <span style={{ color: '#1f2937' }}>{new Date(medication.startDate).toLocaleDateString()}</span>
                        </div>
                        {medication.endDate && (
                          <div>
                            <span style={{ fontWeight: 600, color: '#6b7280', marginRight: '0.5rem' }}>{t('endDate')}:</span>
                            <span style={{ color: '#1f2937' }}>{new Date(medication.endDate).toLocaleDateString()}</span>
                          </div>
                        )}
                        {medication.notes && (
                          <div style={{ gridColumn: '1 / -1' }}>
                            <span style={{ fontWeight: 600, color: '#6b7280', marginRight: '0.5rem' }}>{t('notes')}:</span>
                            <span style={{ color: '#1f2937' }}>{medication.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
