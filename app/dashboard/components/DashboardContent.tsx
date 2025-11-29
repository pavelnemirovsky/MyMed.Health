'use client';

import { useState, useMemo } from 'react';
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
    
    // Use selected month's first day as the starting point (or today if today is in selected month)
    const today = new Date();
    const selectedMonthStart = new Date(selectedYear, selectedMonth, 1);
    const startDate = today >= selectedMonthStart ? today : selectedMonthStart;
    const twoWeeksDate = new Date(startDate);
    twoWeeksDate.setDate(startDate.getDate() + 14);
    
    // Filter appointments from start date onwards for the next 14 days
    const appointments = allEvents
      .filter(event => {
        if (event.type !== 'appointment') return false;
        
        // Determine the actual date of the event
        const eventMonthIndex = monthNames.findIndex(m => m.substring(0, 3) === event.month);
        // Determine year: Nov/Dec = 2025 if selectedYear is 2025, Jan/Feb = 2026 if selectedYear is 2025
        let eventYear = selectedYear;
        if (selectedYear === 2025) {
          eventYear = eventMonthIndex >= 10 ? 2025 : (eventMonthIndex <= 1 ? 2026 : selectedYear);
        }
        
        const eventDate = new Date(eventYear, eventMonthIndex, event.date);
        
        return eventDate >= startDate && eventDate <= twoWeeksDate;
      })
      .sort((a, b) => {
        const aMonthIndex = monthNames.findIndex(m => m.substring(0, 3) === a.month);
        const bMonthIndex = monthNames.findIndex(m => m.substring(0, 3) === b.month);
        const aYear = aMonthIndex >= 10 && selectedYear === 2025 ? 2025 : 
                     (aMonthIndex <= 1 && selectedYear === 2025 ? 2026 : selectedYear);
        const bYear = bMonthIndex >= 10 && selectedYear === 2025 ? 2025 : 
                     (bMonthIndex <= 1 && selectedYear === 2025 ? 2026 : selectedYear);
        const aDate = new Date(aYear, aMonthIndex, a.date);
        const bDate = new Date(bYear, bMonthIndex, b.date);
        if (aDate.getTime() !== bDate.getTime()) return aDate.getTime() - bDate.getTime();
        const aHour = parseInt(a.time.split(':')[0]);
        const bHour = parseInt(b.time.split(':')[0]);
        return aHour - bHour;
      });
    
    return appointments.map(appointment => ({
      id: appointment.id,
      day: appointment.date,
      month: appointment.month,
      title: appointment.title,
      patient: appointment.patient,
      time: appointment.time,
      specialty: appointment.specialty,
      status: 'Scheduled',
    }));
  }, [selectedMonth, selectedYear]);

  return (
    <div className="dashboard-widgets">
      {/* Header Section */}
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">Medical Care Overview</h1>
          <p className="dashboard-page-date">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <div className="dashboard-header-actions">
          <select 
            className="dashboard-patient-select"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
          >
            <option value="all">All Patients</option>
            {patients.map((patient, index) => (
              <option key={index} value={patient.toLowerCase().replace(' ', '-')}>
                {patient}
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
            <div className="dashboard-stat-label">Active Patients</div>
            <div className="dashboard-stat-trend positive">+1 this month</div>
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
            <div className="dashboard-stat-label">Upcoming Appointments</div>
            <div className="dashboard-stat-trend">Next: Tomorrow</div>
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
            <div className="dashboard-stat-label">Medical Documents</div>
            <div className="dashboard-stat-trend positive">+8 this week</div>
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
            <div className="dashboard-stat-label">Overdue Tests</div>
            <div className="dashboard-stat-trend negative">Action needed</div>
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
            <div className="dashboard-stat-label">Active Medications</div>
            <div className="dashboard-stat-trend">All on schedule</div>
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
            <div className="dashboard-stat-label">Care Plans</div>
            <div className="dashboard-stat-trend positive">2 updated</div>
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
              <h3 className="dashboard-widget-title">Appointment Calendar</h3>
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
                      
                      // Get events for this day
                      const dayEvents = timelineEvents.filter(event => event.date === day);
                      
                      // Only include days that have events
                      if (dayEvents.length > 0) {
                        weekDays.push({
                          date: day,
                          dayOfWeek,
                          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
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
                          No appointments scheduled for {monthNames[selectedMonth]} {selectedYear}
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
                                title={`${event.time} - ${event.title} (${event.patient})`}
                              >
                                <span className="dashboard-calendar-event-time">{event.time}</span>
                                <span className="dashboard-calendar-event-title">{event.title}</span>
                              </div>
                            ))
                          ) : (
                            <div className="dashboard-calendar-day-empty">No events</div>
                          )}
                          {dayData.events.length > 3 && (
                            <div className="dashboard-calendar-day-more">+{dayData.events.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Appointments List */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">Upcoming Appointments</h3>
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
                        <div className="dashboard-appointment-title">{appointment.title}</div>
                        <div className="dashboard-appointment-meta">
                          {appointment.patient} • {appointment.time} • {appointment.specialty}
                        </div>
                      </div>
                      <div className={`dashboard-appointment-status normal`}>{appointment.status}</div>
                    </div>
                  ))
                ) : (
                  <div className="dashboard-appointments-empty">No upcoming appointments scheduled for this week and next week.</div>
                )}
              </div>
            </div>
          </div>

          {/* Document Management */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">Document Management</h3>
              <button className="dashboard-widget-menu">⋯</button>
            </div>
            <div className="dashboard-widget-content">
              <div className="dashboard-document-folders">
                {documentFolders.map((folder, index) => (
                  <div key={index} className="dashboard-folder-item">
                    <div className="dashboard-folder-icon">{folder.icon}</div>
                    <div className="dashboard-folder-info">
                      <div className="dashboard-folder-name">{folder.name}</div>
                      <div className="dashboard-folder-count">{folder.count} documents</div>
                    </div>
                    <div className={`dashboard-folder-trend ${folder.trendType}`}>{folder.trend}</div>
                  </div>
                ))}
              </div>
              <button className="dashboard-view-all-btn">View All Documents</button>
            </div>
          </div>
        </div>

        {/* Right Column - Side Panel */}
        <div className="dashboard-side-panel">
          {/* Patient Profiles */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">Patient Profiles</h3>
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
              <button className="dashboard-add-patient-btn">+ Add Patient</button>
            </div>
          </div>

          {/* Care Plans Progress */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">Care Plans Progress</h3>
              <select className="dashboard-widget-select">
                <option>This Month</option>
                <option>Last Month</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="dashboard-widget-content">
              <div className="dashboard-care-plan-summary">
                <div className="dashboard-care-plan-item">
                  <div className="dashboard-care-plan-label">Active Care Plans</div>
                  <div className="dashboard-care-plan-value">{carePlansData.summary.active}</div>
                  <div className="dashboard-care-plan-change positive">{carePlansData.summary.change}</div>
                </div>
                <div className="dashboard-care-plan-progress">
                  <div className="dashboard-progress-bar">
                    <div className="dashboard-progress-fill" style={{ width: `${carePlansData.summary.completion}%` }} />
                  </div>
                  <div className="dashboard-progress-label">Overall completion: {carePlansData.summary.completion}%</div>
                </div>
              </div>
              <div className="dashboard-care-plans-list">
                {carePlansData.plans.map((plan, index) => (
                  <div key={index} className="dashboard-care-plan-card">
                    <div className="dashboard-care-plan-title">{plan.title}</div>
                    <div className="dashboard-care-plan-patient">{plan.patient}</div>
                    <div className="dashboard-care-plan-progress-bar">
                      <div className="dashboard-care-plan-progress-fill" style={{ width: `${plan.progress}%` }} />
                    </div>
                    <div className="dashboard-care-plan-status">{plan.completed} of {plan.total} tasks completed</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second Opinion Requests */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">Second Opinion</h3>
            </div>
            <div className="dashboard-widget-content">
              <div className="dashboard-second-opinion-summary">
                <div className="dashboard-second-opinion-item">
                  <div className="dashboard-second-opinion-label">Pending Requests</div>
                  <div className="dashboard-second-opinion-value">{secondOpinionData.pending}</div>
                </div>
                <div className="dashboard-second-opinion-item">
                  <div className="dashboard-second-opinion-label">Completed</div>
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
              <button className="dashboard-request-opinion-btn">Request Second Opinion</button>
            </div>
          </div>

          {/* Medications Overview */}
          <div className="dashboard-widget">
            <div className="dashboard-widget-header">
              <h3 className="dashboard-widget-title">Medications</h3>
            </div>
            <div className="dashboard-widget-content">
              <div className="dashboard-medications-summary">
                <div className="dashboard-medication-item">
                  <div className="dashboard-medication-label">Active Medications</div>
                  <div className="dashboard-medication-value">{medicationsData.summary.active}</div>
                  <div className={`dashboard-medication-status ${medicationsData.summary.statusType}`}>{medicationsData.summary.status}</div>
                </div>
              </div>
              <div className="dashboard-medications-list">
                {medicationsData.medications.map((medication, index) => (
                  <div key={index} className="dashboard-medication-card">
                    <div className="dashboard-medication-name">{medication.name}</div>
                    <div className="dashboard-medication-meta">{medication.patient} • {medication.dosage}</div>
                    <div className="dashboard-medication-schedule">Next dose: {medication.nextDose}</div>
                  </div>
                ))}
              </div>
              <button className="dashboard-view-all-btn">View All Medications</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
