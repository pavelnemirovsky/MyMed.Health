'use client';

import { useState } from 'react';
import { patientsData, Patient, getAvailableRelationships } from '../../data/mockData';
import PatientCard from './PatientCard';
import PatientForm from './PatientForm';

export default function PatientsContent() {
  const [patients, setPatients] = useState<Patient[]>(patientsData);
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRelationship, setFilterRelationship] = useState<string>('all');

  const availableRelationships = getAvailableRelationships();

  const handleCreatePatient = () => {
    setEditingPatient(null);
    setShowForm(true);
  };

  const handleEditPatient = (patient: Patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };

  const handleSavePatient = (patientData: Omit<Patient, 'id' | 'initials'>) => {
    if (editingPatient) {
      // Update existing patient
      const updatedPatients = patients.map(p => 
        p.id === editingPatient.id 
          ? { 
              ...patientData, 
              id: editingPatient.id,
              initials: getInitials(patientData.name)
            }
          : p
      );
      setPatients(updatedPatients);
    } else {
      // Create new patient
      const newPatient: Patient = {
        ...patientData,
        id: `patient-${Date.now()}`,
        initials: getInitials(patientData.name),
      };
      setPatients([...patients, newPatient]);
    }
    setShowForm(false);
    setEditingPatient(null);
  };

  const handleDeletePatient = (patientId: string) => {
    if (confirm('Are you sure you want to remove this person?')) {
      setPatients(patients.filter(p => p.id !== patientId));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPatient(null);
  };

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter patients based on search and relationship filter
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.phone?.includes(searchQuery);
    const matchesRelationship = filterRelationship === 'all' || 
                               patient.relationshipToAccountOwner === filterRelationship;
    return matchesSearch && matchesRelationship;
  });

  return (
    <div className="dashboard-widgets">
      {/* Page Header */}
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">People I Care For</h1>
          <p className="dashboard-page-date">Manage medical profiles for people you care for</p>
        </div>
        <button 
          className="dashboard-btn-primary"
          onClick={handleCreatePatient}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Person
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
            placeholder="Search by name, email, or phone..."
            className="dashboard-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="dashboard-filter-select"
          value={filterRelationship}
          onChange={(e) => setFilterRelationship(e.target.value)}
        >
          <option value="all">All Relationships</option>
          {availableRelationships.map(rel => (
            <option key={rel} value={rel}>{rel}</option>
          ))}
        </select>
      </div>

      {/* Patient Form Modal */}
      {showForm && (
        <PatientForm
          patient={editingPatient}
          onSave={handleSavePatient}
          onClose={handleCloseForm}
        />
      )}

      {/* Patients Grid */}
      {filteredPatients.length > 0 ? (
        <div className="patients-grid">
          {filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          ))}
        </div>
      ) : (
        <div className="dashboard-empty-state">
          <div className="dashboard-empty-icon">👤</div>
          <h3 className="dashboard-empty-title">
            {searchQuery || filterRelationship !== 'all' 
              ? 'No people found' 
              : 'No people added yet'}
          </h3>
          <p className="dashboard-empty-description">
            {searchQuery || filterRelationship !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Get started by adding the first person you care for'}
          </p>
          {!searchQuery && filterRelationship === 'all' && (
            <button 
              className="dashboard-btn-primary"
              onClick={handleCreatePatient}
            >
              Add Person
            </button>
          )}
        </div>
      )}
    </div>
  );
}

