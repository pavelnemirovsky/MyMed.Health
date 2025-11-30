'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
} from '../data/mockData';

export default function DashboardContent() {
  const locale = useLocale();
  const t = useTranslations('dashboard');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

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
          {/* Appointments Calendar */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">{t('appointmentCalendar')}</h3>
              <select 
                className="dashboard-widget-select"
                value={`${selectedMonth}-${selectedYear}`}
                onChange={(e) => {
                  const [month, year] = e.target.value.split('-').map(Number);
                  setSelectedMonth(month);
                  setSelectedYear(year);
                }}
              >
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (new Date().getMonth() + i) % 12;
                  const year = new Date().getFullYear() + Math.floor((new Date().getMonth() + i) / 12);
                  return (
                    <option key={`${month}-${year}`} value={`${month}-${year}`}>
                      {monthNames[month]} {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="dashboard-widget-content">
              <div className="dashboard-calendar-horizontal">
                <div className="dashboard-calendar-week-view">
                  {(() => {
                    // Use selected month instead of current month
                    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
                    const today = new Date();
                    const isCurrentMonth = selectedMonth === today.getMonth() && selectedYear === today.getFullYear();
                    
                    // Get all days in the selected month that have events
                    const weekDays = [];
                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(selectedYear, selectedMonth, day);
                      const dayOfWeek = date.getDay();
                      const isToday = isCurrentMonth && day === today.getDate();
                      
                      // Get events for this day - parse ISO date string
                      const dayEvents = timelineEvents.filter(event => {
                        const eventDate = new Date(event.date);
                        return eventDate.getFullYear() === selectedYear &&
                               eventDate.getMonth() === selectedMonth &&
                               eventDate.getDate() === day;
                      });
                      
                      // Only include days that have events
                      if (dayEvents.length > 0) {
                        weekDays.push({
                          date: day,
                          dayOfWeek,
                          dayName: date.toLocaleDateString(locale, { weekday: 'short' }),
                          month: monthNames[selectedMonth].substring(0, 3),
                          isToday,
                          events: dayEvents,
                        });
                      }
                    }
                    
                    // Show message if no days with events
                    if (weekDays.length === 0) {
                      return (
                        <div className="dashboard-calendar-timeline-empty">
                          {t('noAppointmentsScheduled', { month: monthNames[selectedMonth], year: selectedYear })}
                        </div>
                      );
                    }
                    
                    return weekDays.map((dayData, index) => (
                      <div 
                        key={index} 
                        className={`dashboard-calendar-day-horizontal ${dayData.isToday ? 'today' : ''}`}
                      >
                        <div className="dashboard-calendar-day-header-horizontal">
                          <div className="dashboard-calendar-day-name">{dayData.dayName}</div>
                          <div className={`dashboard-calendar-day-number-horizontal ${dayData.isToday ? 'today' : ''}`}>
                            {dayData.date}
                          </div>
                          <div className="dashboard-calendar-day-month">{dayData.month}</div>
                        </div>
                        <div className="dashboard-calendar-day-events-horizontal">
                          {dayData.events.length > 0 ? (
                            dayData.events.slice(0, 3).map((event) => (
                              <div 
                                key={event.id} 
                                className={`dashboard-calendar-event-badge ${event.type}`}
                                title={`${event.time || ''} - ${event.title} (${event.patientName})`}
                              >
                                <span className="dashboard-calendar-event-time">{event.time || ''}</span>
                                <div className="dashboard-calendar-event-content">
                                  {selectedPatient === 'all' && (
                                    <Link
                                      href={`/${locale}/dashboard/patients`}
                                      className="dashboard-calendar-event-patient"
                                      style={{
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        transition: 'all 0.2s ease'
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.textDecoration = 'underline';
                                        e.currentTarget.style.color = '#059669';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.textDecoration = 'none';
                                        e.currentTarget.style.color = 'inherit';
                                      }}
                                    >
                                      {event.patientName}
                                    </Link>
                                  )}
                                  <span className="dashboard-calendar-event-title">{event.title}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="dashboard-calendar-day-empty">{t('noEvents')}</div>
                          )}
                          {dayData.events.length > 3 && (
                            <div className="dashboard-calendar-day-more">+{dayData.events.length - 3} {t('more')}</div>
                          )}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
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
                  <div key={index} className="dashboard-patient-card">
                    <div className="dashboard-patient-avatar">{profile.initials}</div>
                    <div className="dashboard-patient-info">
                      <div className="dashboard-patient-name">{profile.name}</div>
                      <div className="dashboard-patient-meta">{profile.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="dashboard-add-patient-btn">{t('addPerson')}</button>
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
                    <div className="dashboard-second-opinion-meta">{request.patient} • {request.status}</div>
                    <div className={`dashboard-second-opinion-status ${request.statusType}`}>{request.description}</div>
                  </div>
                ))}
              </div>
              <button className="dashboard-request-opinion-btn">{t('requestSecondOpinion')}</button>
            </div>
          </div>

          {/* Care Plans Progress */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">{t('carePlansProgress')}</h3>
              <select className="dashboard-widget-select">
                <option>{t('thisMonth')}</option>
                <option>{t('lastMonth')}</option>
                <option>{t('thisYear')}</option>
              </select>
            </div>
            <div className="dashboard-widget-content">
              {(() => {
                const activePlans = carePlansData.filter(p => p.status === 'active');
                const totalMilestones = carePlansData.reduce((sum, plan) => sum + plan.milestones.length, 0);
                const completedMilestones = carePlansData.reduce((sum, plan) => 
                  sum + plan.milestones.filter(m => m.status === 'completed').length, 0
                , 0);
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
                        
                        return (
                          <div key={plan.id} className="dashboard-care-plan-card">
                            <div className="dashboard-care-plan-title">{plan.title}</div>
                            <div className="dashboard-care-plan-patient">
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
                                {plan.patientName}
                              </Link>
                            </div>
                            <div className="dashboard-care-plan-progress-bar">
                              <div className="dashboard-care-plan-progress-fill" style={{ width: `${planProgress}%` }} />
                            </div>
                            <div className="dashboard-care-plan-status">{t('tasksCompleted', { completed: planCompleted, total: planTotal })}</div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
