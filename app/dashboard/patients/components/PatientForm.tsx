'use client';

import { useState, useEffect } from 'react';
import { Patient, getAvailableRelationships } from '../../data/mockData';

interface PatientFormProps {
  patient: Patient | null;
  onSave: (patientData: Omit<Patient, 'id' | 'initials'>) => void;
  onClose: () => void;
}

export default function PatientForm({ patient, onSave, onClose }: PatientFormProps) {
  const [formData, setFormData] = useState<Omit<Patient, 'id' | 'initials'>>({
    name: '',
    dateOfBirth: '',
    age: undefined,
    gender: undefined,
    email: '',
    phone: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phone: '',
    },
    medicalConditions: [],
    allergies: [],
    primaryCarePhysician: '',
    insuranceProvider: '',
    insuranceNumber: '',
    familyId: 'doe-family',
    familyRole: '',
    relationshipToAccountOwner: '',
  });

  const [conditionInput, setConditionInput] = useState('');
  const [allergyInput, setAllergyInput] = useState('');
  const availableRelationships = getAvailableRelationships();

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name || '',
        dateOfBirth: patient.dateOfBirth || '',
        age: patient.age,
        gender: patient.gender,
        email: patient.email || '',
        phone: patient.phone || '',
        emergencyContact: patient.emergencyContact || {
          name: '',
          relationship: '',
          phone: '',
        },
        medicalConditions: patient.medicalConditions || [],
        allergies: patient.allergies || [],
        primaryCarePhysician: patient.primaryCarePhysician || '',
        insuranceProvider: patient.insuranceProvider || '',
        insuranceNumber: patient.insuranceNumber || '',
        familyId: patient.familyId || 'doe-family',
        familyRole: patient.familyRole || '',
        relationshipToAccountOwner: patient.relationshipToAccountOwner || '',
      });
    }
  }, [patient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAddCondition = () => {
    if (conditionInput.trim()) {
      setFormData({
        ...formData,
        medicalConditions: [...(formData.medicalConditions || []), conditionInput.trim()],
      });
      setConditionInput('');
    }
  };

  const handleRemoveCondition = (index: number) => {
    const updated = [...(formData.medicalConditions || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, medicalConditions: updated });
  };

  const handleAddAllergy = () => {
    if (allergyInput.trim()) {
      setFormData({
        ...formData,
        allergies: [...(formData.allergies || []), allergyInput.trim()],
      });
      setAllergyInput('');
    }
  };

  const handleRemoveAllergy = (index: number) => {
    const updated = [...(formData.allergies || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, allergies: updated });
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return;
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value;
    setFormData({
      ...formData,
      dateOfBirth: dob,
      age: calculateAge(dob),
    });
  };

  return (
    <div className="patient-form-overlay" onClick={onClose}>
      <div className="patient-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="patient-form-header">
          <h2 className="patient-form-title">
            {patient ? 'Edit Person' : 'Add Person'}
          </h2>
          <button className="patient-form-close" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="patient-form">
          <div className="patient-form-section">
            <h3 className="patient-form-section-title">Basic Information</h3>
            <div className="patient-form-grid">
              <div className="patient-form-field">
                <label className="patient-form-label">Full Name *</label>
                <input
                  type="text"
                  className="patient-form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="patient-form-field">
                <label className="patient-form-label">Date of Birth</label>
                <input
                  type="date"
                  className="patient-form-input"
                  value={formData.dateOfBirth}
                  onChange={handleDateOfBirthChange}
                />
              </div>

              <div className="patient-form-field">
                <label className="patient-form-label">Age</label>
                <input
                  type="number"
                  className="patient-form-input"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value ? parseInt(e.target.value) : undefined })}
                  min="0"
                  max="150"
                />
              </div>

              <div className="patient-form-field">
                <label className="patient-form-label">Gender</label>
                <select
                  className="patient-form-input"
                  value={formData.gender || ''}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' | 'Other' | undefined })}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="patient-form-field">
                <label className="patient-form-label">Relationship to You *</label>
                <select
                  className="patient-form-input"
                  value={formData.relationshipToAccountOwner || ''}
                  onChange={(e) => setFormData({ ...formData, relationshipToAccountOwner: e.target.value })}
                  required
                >
                  <option value="">Select relationship</option>
                  {availableRelationships.map(rel => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                  <option value="Self">Self</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Grandparent">Grandparent</option>
                  <option value="Grandchild">Grandchild</option>
                  <option value="Uncle">Uncle</option>
                  <option value="Aunt">Aunt</option>
                  <option value="Nephew">Nephew</option>
                  <option value="Niece">Niece</option>
                  <option value="Cousin">Cousin</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="patient-form-section">
            <h3 className="patient-form-section-title">Contact Information</h3>
            <div className="patient-form-grid">
              <div className="patient-form-field">
                <label className="patient-form-label">Email</label>
                <input
                  type="email"
                  className="patient-form-input"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="patient-form-field">
                <label className="patient-form-label">Phone</label>
                <input
                  type="tel"
                  className="patient-form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="patient-form-section">
            <h3 className="patient-form-section-title">Emergency Contact</h3>
            <div className="patient-form-grid">
              <div className="patient-form-field">
                <label className="patient-form-label">Emergency Contact Name</label>
                <input
                  type="text"
                  className="patient-form-input"
                  value={formData.emergencyContact?.name || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact!, name: e.target.value }
                  })}
                />
              </div>

              <div className="patient-form-field">
                <label className="patient-form-label">Relationship</label>
                <input
                  type="text"
                  className="patient-form-input"
                  value={formData.emergencyContact?.relationship || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact!, relationship: e.target.value }
                  })}
                />
              </div>

              <div className="patient-form-field">
                <label className="patient-form-label">Emergency Contact Phone</label>
                <input
                  type="tel"
                  className="patient-form-input"
                  value={formData.emergencyContact?.phone || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    emergencyContact: { ...formData.emergencyContact!, phone: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>

          <div className="patient-form-section">
            <h3 className="patient-form-section-title">Medical Information</h3>
            
            <div className="patient-form-field">
              <label className="patient-form-label">Medical Conditions</label>
              <div className="patient-form-tags-input">
                <input
                  type="text"
                  className="patient-form-input"
                  value={conditionInput}
                  onChange={(e) => setConditionInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddCondition();
                    }
                  }}
                  placeholder="Type and press Enter to add"
                />
                <button
                  type="button"
                  className="patient-form-add-btn"
                  onClick={handleAddCondition}
                >
                  Add
                </button>
              </div>
              {formData.medicalConditions && formData.medicalConditions.length > 0 && (
                <div className="patient-form-tags">
                  {formData.medicalConditions.map((condition, index) => (
                    <span key={index} className="patient-form-tag">
                      {condition}
                      <button
                        type="button"
                        className="patient-form-tag-remove"
                        onClick={() => handleRemoveCondition(index)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="patient-form-field">
              <label className="patient-form-label">Allergies</label>
              <div className="patient-form-tags-input">
                <input
                  type="text"
                  className="patient-form-input"
                  value={allergyInput}
                  onChange={(e) => setAllergyInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAllergy();
                    }
                  }}
                  placeholder="Type and press Enter to add"
                />
                <button
                  type="button"
                  className="patient-form-add-btn"
                  onClick={handleAddAllergy}
                >
                  Add
                </button>
              </div>
              {formData.allergies && formData.allergies.length > 0 && (
                <div className="patient-form-tags">
                  {formData.allergies.map((allergy, index) => (
                    <span key={index} className="patient-form-tag">
                      {allergy}
                      <button
                        type="button"
                        className="patient-form-tag-remove"
                        onClick={() => handleRemoveAllergy(index)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="patient-form-section">
            <h3 className="patient-form-section-title">Insurance Information</h3>
            <div className="patient-form-grid">
              <div className="patient-form-field">
                <label className="patient-form-label">Insurance Provider</label>
                <input
                  type="text"
                  className="patient-form-input"
                  value={formData.insuranceProvider}
                  onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                />
              </div>

              <div className="patient-form-field">
                <label className="patient-form-label">Insurance Number</label>
                <input
                  type="text"
                  className="patient-form-input"
                  value={formData.insuranceNumber}
                  onChange={(e) => setFormData({ ...formData, insuranceNumber: e.target.value })}
                />
              </div>

              <div className="patient-form-field">
                <label className="patient-form-label">Primary Care Physician</label>
                <input
                  type="text"
                  className="patient-form-input"
                  value={formData.primaryCarePhysician}
                  onChange={(e) => setFormData({ ...formData, primaryCarePhysician: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="patient-form-actions">
            <button
              type="button"
              className="patient-form-btn patient-form-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="patient-form-btn patient-form-btn-primary"
            >
              {patient ? 'Update Person' : 'Add Person'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

