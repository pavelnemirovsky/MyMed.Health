'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { doctorsData, Doctor, getDoctorsByPatientId } from '../../data/mockData';
import { patientsData } from '../../data/mockData';
import DoctorCard from './DoctorCard';

export default function DoctorsContent() {
  const t = useTranslations('dashboard.doctors');
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');
  const [filterPatient, setFilterPatient] = useState<string>('all');

  // Get unique specialties
  const specialties = Array.from(new Set(doctors.map(d => d.specialty))).sort();

  // Filter doctors based on search, specialty, and patient filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.phone?.includes(searchQuery) ||
                         doctor.hospital?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.clinic?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSpecialty = filterSpecialty === 'all' || doctor.specialty === filterSpecialty;
    
    const matchesPatient = filterPatient === 'all' || doctor.patients.includes(filterPatient);
    
    return matchesSearch && matchesSpecialty && matchesPatient;
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
            // TODO: Implement add doctor functionality
            alert('Add doctor functionality coming soon');
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          {t('addDoctor')}
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
          value={filterSpecialty}
          onChange={(e) => setFilterSpecialty(e.target.value)}
        >
          <option value="all">{t('allSpecialties')}</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
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

      {/* Doctors Grid */}
      {filteredDoctors.length > 0 ? (
        <div className="patients-grid">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
            />
          ))}
        </div>
      ) : (
        <div className="dashboard-empty-state">
          <div className="dashboard-empty-icon">👨‍⚕️</div>
          <h3 className="dashboard-empty-title">
            {searchQuery || filterSpecialty !== 'all' || filterPatient !== 'all'
              ? t('noDoctorsFound')
              : t('noDoctorsYet')}
          </h3>
          <p className="dashboard-empty-description">
            {searchQuery || filterSpecialty !== 'all' || filterPatient !== 'all'
              ? t('tryAdjustingFilters')
              : t('getStartedDescription')}
          </p>
          {!searchQuery && filterSpecialty === 'all' && filterPatient === 'all' && (
            <button 
              className="dashboard-btn-primary"
              onClick={() => {
                // TODO: Implement add doctor functionality
                alert('Add doctor functionality coming soon');
              }}
            >
              {t('addDoctor')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}


