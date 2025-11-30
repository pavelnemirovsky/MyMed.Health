'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { medicalProvidersData, MedicalProvider, getMedicalProvidersByPatientId } from '../../data/mockData';
import { patientsData } from '../../data/mockData';
import MedicalProviderCard from './MedicalProviderCard';

export default function MedicalProvidersContent() {
  const t = useTranslations('dashboard.medicalProviders');
  const [providers, setProviders] = useState<MedicalProvider[]>(medicalProvidersData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPatient, setFilterPatient] = useState<string>('all');

  // Get unique provider types
  const providerTypes: MedicalProvider['type'][] = ['HMO', 'Hospital', 'Clinic', 'Medical Center'];

  // Filter providers based on search, type, and patient filters
  const filteredProviders = providers.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.phone?.includes(searchQuery) ||
                         provider.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.country?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         provider.specialties?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesType = filterType === 'all' || provider.type === filterType;
    
    const matchesPatient = filterPatient === 'all' || provider.patients.includes(filterPatient);
    
    return matchesSearch && matchesType && matchesPatient;
  });

  return (
    <div className="dashboard-widgets">
      {/* Page Header */}
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">{t('title')}</h1>
          <p className="dashboard-page-date">{t('subtitle')}</p>
        </div>
        <button 
          className="dashboard-btn-primary"
          onClick={() => {
            // TODO: Implement add provider functionality
            alert('Add medical provider functionality coming soon');
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          {t('addProvider')}
        </button>
      </div>

      {/* Filters */}
      <div className="dashboard-filters">
        <div className="dashboard-search-wrapper">
          <svg className="dashboard-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="dashboard-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="dashboard-filter-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">{t('allTypes')}</option>
          {providerTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          className="dashboard-filter-select"
          value={filterPatient}
          onChange={(e) => setFilterPatient(e.target.value)}
        >
          <option value="all">{t('allPatients')}</option>
          {patientsData.map(patient => (
            <option key={patient.id} value={patient.id}>{patient.name}</option>
          ))}
        </select>
      </div>

      {/* Providers Grid */}
      {filteredProviders.length > 0 ? (
        <div className="patients-grid">
          {filteredProviders.map((provider) => (
            <MedicalProviderCard
              key={provider.id}
              provider={provider}
            />
          ))}
        </div>
      ) : (
        <div className="dashboard-empty-state">
          <div className="dashboard-empty-icon">🏥</div>
          <h3 className="dashboard-empty-title">
            {searchQuery || filterType !== 'all' || filterPatient !== 'all'
              ? t('noProvidersFound')
              : t('noProvidersYet')}
          </h3>
          <p className="dashboard-empty-description">
            {searchQuery || filterType !== 'all' || filterPatient !== 'all'
              ? t('tryAdjustingFilters')
              : t('getStartedDescription')}
          </p>
          {!searchQuery && filterType === 'all' && filterPatient === 'all' && (
            <button 
              className="dashboard-btn-primary"
              onClick={() => {
                // TODO: Implement add provider functionality
                alert('Add medical provider functionality coming soon');
              }}
            >
              {t('addProvider')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}


