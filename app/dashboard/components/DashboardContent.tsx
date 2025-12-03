'use client';

import { useState, useMemo, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import {
  monthNames,
  generateMonthEvents,
  getCurrentMonthEvents,
  getUpcomingAppointments,
  statsData,
  documentFolders,
  patientProfiles,
  carePlansData,
  secondOpinionData,
  medicationsData,
  patients,
  patientsData,
  medicalRecordsData,
  getMedicalRecordsByPatientId,
  getPatientById,
} from '../data/mockData';
import HumanBodyVisualization from './HumanBodyVisualization';

export default function DashboardContent() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('dashboard');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  
  // Filter medical records by selected patient
  const filteredMedicalRecords = useMemo(() => {
    return selectedPatient === 'all' 
      ? medicalRecordsData 
      : getMedicalRecordsByPatientId(selectedPatient);
  }, [selectedPatient]);

  // Mock timeline data generator - creates events for the selected month (for calendar)
  const timelineEvents = useMemo(() => {
    return generateMonthEvents(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  // Get all upcoming appointments from selected month events (only appointments, not tests) - this week and next week
  const upcomingAppointments = useMemo(() => {
    // Get events from selected month and next month to cover 2 weeks
    const selectedMonthEvents = generateMonthEvents(selectedMonth, selectedYear);
    const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
    const nextMonthYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;
    const nextMonthEvents = generateMonthEvents(nextMonth, nextMonthYear);
    const allEvents = [...selectedMonthEvents, ...nextMonthEvents];
    
    // Use today as the starting point
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoWeeksDate = new Date(today);
    twoWeeksDate.setDate(today.getDate() + 14);
    
    // Filter appointments from today onwards for the next 14 days
    const appointments = allEvents
      .filter(event => {
        if (event.type !== 'appointment') return false;
        
        // Parse the ISO date string
        const eventDate = new Date(event.date);
        eventDate.setHours(0, 0, 0, 0);
        
        return eventDate >= today && eventDate <= twoWeeksDate;
      })
      .sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        if (aDate.getTime() !== bDate.getTime()) return aDate.getTime() - bDate.getTime();
        const aHour = a.time ? parseInt(a.time.split(':')[0]) : 0;
        const bHour = b.time ? parseInt(b.time.split(':')[0]) : 0;
        return aHour - bHour;
      });
    
    return appointments.map(appointment => {
      const appointmentDate = new Date(appointment.date);
      return {
        id: appointment.id,
        day: appointmentDate.getDate(),
        month: monthNames[appointmentDate.getMonth()].substring(0, 3),
        title: appointment.title,
        patient: appointment.patientName,
        time: appointment.time || '',
        specialty: appointment.facility || '',
        status: 'Scheduled',
      };
    });
  }, [selectedMonth, selectedYear]);

  return (
    <div className="dashboard-widgets">
      {/* Header Section */}
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">{t('medicalCareOverview')}</h1>
          <p className="dashboard-page-date">{new Date().toLocaleDateString(locale, { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <div className="dashboard-header-actions">
          <select 
            className="dashboard-patient-select"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="all">{t('allPeople')}</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Health Metrics Cards */}
      <div className="dashboard-stats-grid">
        <div className="dashboard-stat-card stat-purple">
          <div className="dashboard-stat-icon">👤</div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-value">3</div>
                <div className="dashboard-stat-label">{t('activePeople')}</div>
            <div className="dashboard-stat-trend positive">{t('thisMonthTrend')}</div>
          </div>
          <div className="dashboard-stat-chart">
            <div className="dashboard-mini-line-chart">
              {[3, 4, 3, 4, 5, 4, 3].map((val, i) => (
                <div key={i} className="dashboard-chart-dot" style={{ bottom: `${val * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="dashboard-stat-card stat-orange">
          <div className="dashboard-stat-icon">📅</div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-value">12</div>
            <div className="dashboard-stat-label">{t('upcomingAppointments')}</div>
            <div className="dashboard-stat-trend">{t('nextTomorrow')}</div>
          </div>
          <div className="dashboard-stat-chart">
            <div className="dashboard-mini-line-chart">
              {[2, 3, 2, 4, 3, 5, 4].map((val, i) => (
                <div key={i} className="dashboard-chart-dot" style={{ bottom: `${val * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="dashboard-stat-card stat-blue">
          <div className="dashboard-stat-icon">🗂️</div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-value">156</div>
            <div className="dashboard-stat-label">{t('medicalRecords')}</div>
            <div className="dashboard-stat-trend positive">{t('thisWeekTrend')}</div>
          </div>
          <div className="dashboard-stat-chart">
            <div className="dashboard-mini-line-chart">
              {[4, 5, 4, 6, 5, 7, 6].map((val, i) => (
                <div key={i} className="dashboard-chart-dot" style={{ bottom: `${val * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="dashboard-stat-card stat-red">
          <div className="dashboard-stat-icon">⚠️</div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-value">2</div>
            <div className="dashboard-stat-label">{t('overdueTests')}</div>
            <div className="dashboard-stat-trend negative">{t('actionNeeded')}</div>
          </div>
          <div className="dashboard-stat-chart">
            <div className="dashboard-mini-line-chart">
              {[1, 2, 1, 2, 1, 2, 2].map((val, i) => (
                <div key={i} className="dashboard-chart-dot" style={{ bottom: `${val * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="dashboard-stat-card stat-green">
          <div className="dashboard-stat-icon">💊</div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-value">8</div>
            <div className="dashboard-stat-label">{t('activeMedications')}</div>
            <div className="dashboard-stat-trend">{t('allOnSchedule')}</div>
          </div>
          <div className="dashboard-stat-chart">
            <div className="dashboard-mini-line-chart">
              {[5, 6, 7, 6, 7, 8, 8].map((val, i) => (
                <div key={i} className="dashboard-chart-dot" style={{ bottom: `${val * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="dashboard-stat-card stat-teal">
          <div className="dashboard-stat-icon">📋</div>
          <div className="dashboard-stat-content">
            <div className="dashboard-stat-value">5</div>
            <div className="dashboard-stat-label">{t('carePlans')}</div>
            <div className="dashboard-stat-trend positive">2 {t('updated')}</div>
          </div>
          <div className="dashboard-stat-chart">
            <div className="dashboard-mini-line-chart">
              {[3, 4, 4, 5, 4, 5, 5].map((val, i) => (
                <div key={i} className="dashboard-chart-dot" style={{ bottom: `${val * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Two Column Layout */}
      <div className="dashboard-main-layout">
        {/* Left Column - Main Content */}
        <div className="dashboard-main-column">
          {/* Body Visualization and Care Plans Progress - Side by Side */}
          <div className="dashboard-two-column-grid" style={{ marginBottom: '1.5rem' }}>
            {/* Human Body Visualization - Shows bodies for all people or selected person */}
            <div className="dashboard-widget">
              <div className="dashboard-widget-header">
                <h3 className="dashboard-widget-title">{t('bodyVisualization')}</h3>
              </div>
              <div className="dashboard-widget-content" style={{ padding: '0.75rem' }}>
                {selectedPatient === 'all' ? (
                  <Fragment>
                    {/* Show bodies for all people */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '1rem',
                      alignItems: 'start',
                    }}>
                      {patientProfiles.map((profile) => {
                        const patient = getPatientById(profile.id);
                        const patientRecords = getMedicalRecordsByPatientId(profile.id);
                        
                        return (
                          <div
                            key={profile.id}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              padding: '0.75rem',
                              background: 'white',
                              borderRadius: '8px',
                              border: '1px solid #e5e7eb',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = '#059669';
                              e.currentTarget.style.background = '#f0fdf4';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = '#e5e7eb';
                              e.currentTarget.style.background = 'white';
                            }}
                          >
                            <div style={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                              color: '#1f2937',
                              marginBottom: '0.5rem',
                              textAlign: 'center',
                              width: '100%',
                              cursor: 'pointer',
                            }}
                            onClick={() => setSelectedPatient(profile.id)}
                            >
                              {profile.name}
                            </div>
                            <div style={{ 
                              width: '100%', 
                              maxWidth: '180px',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                              <HumanBodyVisualization
                                records={patientRecords}
                                selectedPatient={profile.id}
                                gender={patient?.gender}
                                compact={true}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {/* Legend for all people view */}
                    <div className="body-visualization-legend" style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      background: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb',
                      fontSize: '0.8125rem',
                    }}>
                      <div style={{ fontWeight: 600, marginBottom: '0.75rem', color: '#374151' }}>
                        {t('bodyVisualizationDetails.legend')}:
                      </div>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '1.5rem',
                        alignItems: 'center',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            background: '#fbbf24',
                            border: 'none',
                          }} />
                          <span style={{ color: '#6b7280' }}>{t('bodyVisualizationDetails.hasRecords')}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            background: '#a3b2b3',
                            border: 'none',
                          }} />
                          <span style={{ color: '#6b7280' }}>{t('bodyVisualizationDetails.noRecords')}</span>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  // Show body for selected person only
                  <div style={{ 
                    maxWidth: '250px',
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#1f2937',
                      marginBottom: '0.75rem',
                      textAlign: 'center',
                      width: '100%',
                    }}>
                      {getPatientById(selectedPatient)?.name}
                    </div>
                    <div style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                      <HumanBodyVisualization 
                        records={filteredMedicalRecords}
                        selectedPatient={selectedPatient}
                        gender={getPatientById(selectedPatient)?.gender}
                        compact={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Care Plans Progress */}
            <div className="dashboard-widget">
              <div className="dashboard-widget-header">
                <h3 className="dashboard-widget-title">{t('carePlansProgress')}</h3>
              </div>
              <div className="dashboard-widget-content">
                {(() => {
                  const activePlans = carePlansData.filter(p => p.status === 'active');
                  const totalMilestones = carePlansData.reduce((sum: number, plan) => sum + plan.milestones.length, 0);
                  const completedMilestones = carePlansData.reduce((sum: number, plan) => 
                    sum + plan.milestones.filter(m => m.status === 'completed').length, 0
                  );
                  const overallCompletion = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;
                  
                  return (
                    <>
                      <div className="dashboard-care-plan-summary">
                        <div className="dashboard-care-plan-item">
                          <div className="dashboard-care-plan-label">{t('activeCarePlans')}</div>
                          <div className="dashboard-care-plan-value">{activePlans.length}</div>
                          <div className="dashboard-care-plan-change positive">+2</div>
                        </div>
                        <div className="dashboard-care-plan-progress">
                          <div className="dashboard-progress-bar">
                            <div className="dashboard-progress-fill" style={{ width: `${overallCompletion}%` }} />
                          </div>
                          <div className="dashboard-progress-label">{t('overallCompletion', { percentage: overallCompletion })}</div>
                        </div>
                      </div>
                      <div className="dashboard-care-plans-list">
                        {carePlansData.slice(0, 3).map((plan) => {
                          const planCompleted = plan.milestones.filter(m => m.status === 'completed').length;
                          const planTotal = plan.milestones.length;
                          const planProgress = planTotal > 0 ? Math.round((planCompleted / planTotal) * 100) : 0;
                          
                          const formatDate = (dateString: string) => {
                            try {
                              const date = new Date(dateString);
                              return date.toLocaleDateString('en-US', {
                                month: 'numeric',
                                day: 'numeric',
                                year: 'numeric',
                              });
                            } catch {
                              return dateString;
                            }
                          };

                          const getStatusBadgeColor = (status: string) => {
                            switch (status) {
                              case 'active': return '#d1fae5';
                              case 'completed': return '#f3f4f6';
                              case 'paused': return '#fef3c7';
                              case 'cancelled': return '#fee2e2';
                              default: return '#f3f4f6';
                            }
                          };

                          const getStatusTextColor = (status: string) => {
                            switch (status) {
                              case 'active': return '#059669';
                              case 'completed': return '#6b7280';
                              case 'paused': return '#f59e0b';
                              case 'cancelled': return '#dc2626';
                              default: return '#6b7280';
                            }
                          };

                          return (
                            <Link
                              key={plan.id}
                              href={`/${locale}/dashboard/care-plans?planId=${plan.id}`}
                              style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                              <div className="dashboard-care-plan-card" style={{
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                position: 'relative',
                                padding: '1.25rem',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                background: 'white',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                              >
                                {/* Header with Title, Status Badge, and Play Icon */}
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                                    <h3 style={{ 
                                      fontSize: '1.125rem', 
                                      fontWeight: 600, 
                                      color: '#1f2937', 
                                      margin: 0,
                                      flex: 1,
                                    }}>
                                      {plan.title}
                                    </h3>
                                    <span style={{
                                      padding: '0.25rem 0.75rem',
                                      borderRadius: '12px',
                                      fontSize: '0.75rem',
                                      fontWeight: 500,
                                      background: getStatusBadgeColor(plan.status),
                                      color: getStatusTextColor(plan.status),
                                      textTransform: 'capitalize',
                                    }}>
                                      {plan.status}
                                    </span>
                                  </div>
                                  {/* Play Icon in top-right */}
                                  <div style={{
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    background: '#d1fae5',
                                    color: '#059669',
                                    flexShrink: 0,
                                    marginLeft: '0.5rem',
                                  }}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M2.5 2L9.5 6L2.5 10V2Z" fill="currentColor"/>
                                    </svg>
                                  </div>
                                </div>

                                {/* Description */}
                                {plan.description && (
                                  <p style={{
                                    fontSize: '0.875rem',
                                    color: '#6b7280',
                                    margin: '0 0 1rem 0',
                                    lineHeight: '1.5',
                                  }}>
                                    {plan.description}
                                  </p>
                                )}

                                {/* Patient, Condition */}
                                <div style={{ marginBottom: '1rem', fontSize: '0.875rem', color: '#374151' }}>
                                  <div style={{ marginBottom: '0.5rem' }}>
                                    <strong>Patient:</strong>{' '}
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        router.push(`/${locale}/dashboard/patients`);
                                      }}
                                      style={{
                                        color: '#2563eb',
                                        textDecoration: 'none',
                                        background: 'none',
                                        border: 'none',
                                        padding: 0,
                                        cursor: 'pointer',
                                        font: 'inherit',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.textDecoration = 'underline';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.textDecoration = 'none';
                                      }}
                                    >
                                      {plan.patientName}
                                    </button>
                                  </div>
                                  <div>
                                    <strong>Condition:</strong> {plan.condition}
                                  </div>
                                </div>

                                {/* Progress with Dates */}
                                <div style={{ marginBottom: '1rem' }}>
                                  <div style={{ 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'space-between',
                                    marginBottom: '0.5rem',
                                  }}>
                                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                                      <strong>Progress:</strong> {planCompleted}/{planTotal} Milestones
                                    </span>
                                    <span style={{ 
                                      fontSize: '0.875rem', 
                                      fontWeight: 600,
                                      color: '#059669',
                                    }}>
                                      {planProgress}%
                                    </span>
                                  </div>
                                  <div style={{
                                    width: '100%',
                                    height: '8px',
                                    background: '#e5e7eb',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    marginBottom: '0.5rem',
                                  }}>
                                    <div style={{
                                      width: `${planProgress}%`,
                                      height: '100%',
                                      background: '#059669',
                                      borderRadius: '4px',
                                      transition: 'width 0.3s ease',
                                    }} />
                                  </div>
                                  {/* Dates inline with progress */}
                                  <div style={{ 
                                    fontSize: '0.75rem', 
                                    color: '#6b7280',
                                    display: 'flex',
                                    gap: '1rem',
                                  }}>
                                    <span>
                                      <strong>Start:</strong> {formatDate(plan.startDate)}
                                    </span>
                                    {plan.endDate && (
                                      <span>
                                        <strong>End:</strong> {formatDate(plan.endDate)}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Doctor(s) */}
                                {plan.doctorName && (
                                  <div style={{ 
                                    fontSize: '0.875rem', 
                                    color: '#374151',
                                  }}>
                                    <strong>Doctor{plan.doctorName.includes(',') ? 's' : ''}:</strong>{' '}
                                    {plan.doctorName.split(',').map((doctor, index, array) => (
                                      <span key={index}>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            router.push(`/${locale}/dashboard/doctors`);
                                          }}
                                          style={{
                                            color: '#2563eb',
                                            textDecoration: 'none',
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            cursor: 'pointer',
                                            font: 'inherit',
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.textDecoration = 'underline';
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.textDecoration = 'none';
                                          }}
                                        >
                                          {doctor.trim()}
                                        </button>
                                        {index < array.length - 1 && ', '}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Upcoming Appointments and Document Management - 2 Column Layout */}
          <div className="dashboard-two-column-grid">
            {/* Upcoming Appointments List */}
            <div className="dashboard-widget">
              <div className="dashboard-widget-header">
                <h3 className="dashboard-widget-title">{t('upcomingAppointments')}</h3>
              </div>
              <div className="dashboard-widget-content">
                <div className="dashboard-appointments-list">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="dashboard-appointment-item">
                        <div className="dashboard-appointment-date">
                          <div className="dashboard-appointment-day">{appointment.day}</div>
                          <div className="dashboard-appointment-month">{appointment.month}</div>
                        </div>
                        <div className="dashboard-appointment-details">
                          {selectedPatient === 'all' && (
                            <div className="dashboard-appointment-patient-name">
                              <Link
                                href={`/${locale}/dashboard/patients`}
                                style={{
                                  color: '#059669',
                                  textDecoration: 'none',
                                  fontWeight: 500,
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
                                {appointment.patient}
                              </Link>
                            </div>
                          )}
                          <div className="dashboard-appointment-title">{appointment.title}</div>
                          <div className="dashboard-appointment-meta">
                            {selectedPatient === 'all' ? (
                              <>
                                {appointment.time} • {appointment.specialty}
                              </>
                            ) : (
                              <>
                                {appointment.patient} • {appointment.time} • {appointment.specialty}
                              </>
                            )}
                          </div>
                        </div>
                        <div className={`dashboard-appointment-status normal`}>{t('scheduled')}</div>
                      </div>
                    ))
                  ) : (
                    <div className="dashboard-appointments-empty">{t('noAppointmentsScheduledShort')}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Document Management */}
            <div className="dashboard-widget">
              <div className="dashboard-widget-header">
                <h3 className="dashboard-widget-title">{t('documentManagement')}</h3>
                <button className="dashboard-widget-menu">⋯</button>
              </div>
              <div className="dashboard-widget-content">
                <div className="dashboard-document-folders">
                  {documentFolders.map((folder, index) => (
                    <div key={index} className="dashboard-folder-item">
                      <div className="dashboard-folder-icon">{folder.icon}</div>
                      <div className="dashboard-folder-info">
                        <div className="dashboard-folder-name">{folder.name}</div>
                        <div className="dashboard-folder-count">{folder.count} {t('documents')}</div>
                      </div>
                      <div className={`dashboard-folder-trend ${folder.trendType}`}>{folder.trend}</div>
                    </div>
                  ))}
                </div>
                <button className="dashboard-view-all-btn">{t('viewAllRecords')}</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Side Panel */}
        <div className="dashboard-side-panel">
          {/* Patient Profiles */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">{t('peopleICareFor')}</h3>
            </div>
            <div className="dashboard-widget-content">
              <div className="dashboard-patients-list">
                {patientProfiles.map((profile, index) => (
                  <Link 
                    key={index} 
                    href={`/${locale}/dashboard/patients`}
                    className="dashboard-patient-card"
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className="dashboard-patient-avatar">{profile.initials}</div>
                    <div className="dashboard-patient-info">
                      <div className="dashboard-patient-name">{profile.name}</div>
                      <div className="dashboard-patient-meta">{profile.meta}</div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link href={`/${locale}/dashboard/patients`}>
                <button className="dashboard-add-patient-btn">{t('addPerson')}</button>
              </Link>
            </div>
          </div>

          {/* Second Opinion */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">{t('secondOpinion')}</h3>
            </div>
            <div className="dashboard-widget-content">
              <div className="dashboard-second-opinion-summary">
                <div className="dashboard-second-opinion-item">
                  <div className="dashboard-second-opinion-label">{t('pendingRequests')}</div>
                  <div className="dashboard-second-opinion-value">{secondOpinionData.pending}</div>
                </div>
                <div className="dashboard-second-opinion-item">
                  <div className="dashboard-second-opinion-label">{t('completed')}</div>
                  <div className="dashboard-second-opinion-value">{secondOpinionData.completed}</div>
                </div>
              </div>
              <div className="dashboard-second-opinion-list">
                {secondOpinionData.requests.map((request, index) => (
                  <div key={index} className="dashboard-second-opinion-card">
                    <div className="dashboard-second-opinion-title">{request.title}</div>
                    <div className="dashboard-second-opinion-meta">
                      {request.patient} • {request.condition}
                    </div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#6b7280' }}>
                      <div style={{ marginBottom: '0.25rem' }}>
                        <strong>{t('doctor')}:</strong> {request.doctor}
                      </div>
                      <div style={{ marginBottom: '0.25rem' }}>
                        <strong>{t('status')}:</strong>{' '}
                        <span className={`dashboard-second-opinion-status ${request.statusType}`}>
                          {request.status}
                        </span>
                      </div>
                      <div style={{ marginBottom: '0.25rem' }}>
                        <strong>{t('startDate')}:</strong> {new Date(request.startDate).toLocaleDateString()}
                      </div>
                      {request.endDate && (
                        <div style={{ marginBottom: '0.25rem' }}>
                          <strong>{t('endDate')}:</strong> {new Date(request.endDate).toLocaleDateString()}
                        </div>
                      )}
                      {request.recommendation && (
                        <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #e5e7eb' }}>
                          <strong style={{ color: '#374151' }}>{t('recommendation')}:</strong>
                          <div style={{ marginTop: '0.25rem', color: '#1f2937', lineHeight: '1.5' }}>
                            {request.recommendation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button className="dashboard-request-opinion-btn">{t('requestSecondOpinion')}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
