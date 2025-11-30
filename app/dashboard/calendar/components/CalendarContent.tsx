'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { monthNames, generateMonthEvents, patients } from '../../data/mockData';

export default function CalendarContent() {
  const locale = useLocale();
  const t = useTranslations('dashboard.calendar');
  const [selectedPatient, setSelectedPatient] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Get events for the selected month
  const monthEvents = useMemo(() => {
    return generateMonthEvents(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  // Filter events by selected patient
  const filteredEvents = useMemo(() => {
    if (selectedPatient === 'all') {
      return monthEvents;
    }
    return monthEvents.filter(event => event.patientId === selectedPatient);
  }, [monthEvents, selectedPatient]);

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    // Get events for a specific day (moved inside useMemo to fix dependency warning)
    const getDayEvents = (day: number) => {
      return filteredEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === selectedYear &&
               eventDate.getMonth() === selectedMonth &&
               eventDate.getDate() === day;
      });
    };

    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
    const today = new Date();
    const isCurrentMonth = selectedMonth === today.getMonth() && selectedYear === today.getFullYear();
    
    const days: Array<{
      day: number | null;
      isToday: boolean;
      isCurrentMonth: boolean;
      events: typeof filteredEvents;
    }> = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, isToday: false, isCurrentMonth: false, events: [] });
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = isCurrentMonth && day === today.getDate();
      const events = getDayEvents(day);
      days.push({
        day,
        isToday,
        isCurrentMonth: true,
        events,
      });
    }

    // Fill remaining cells to complete the grid (6 rows × 7 days = 42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push({ day: null, isToday: false, isCurrentMonth: false, events: [] });
    }

    return days;
  }, [selectedMonth, selectedYear, filteredEvents]);

  const weekDays = useMemo(() => {
    // Get week day names starting from Sunday (0) to Saturday (6)
    const weekDayNames: string[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(2024, 0, 7 + i); // Start from Sunday (Jan 7, 2024 is a Sunday)
      weekDayNames.push(date.toLocaleDateString(locale, { weekday: 'short' }));
    }
    return weekDayNames;
  }, [locale]);

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleToday = () => {
    const today = new Date();
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  };

  return (
    <div className="calendar-page">
      {/* Header */}
      <div className="calendar-page-header">
        <div>
          <h1 className="calendar-page-title">{t('title')}</h1>
          <p className="calendar-page-subtitle">{t('subtitle')}</p>
        </div>
        <div className="calendar-header-actions">
          <select 
            className="calendar-patient-select"
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

      {/* Calendar Controls */}
      <div className="calendar-controls">
        <div className="calendar-month-navigation">
          <button 
            className="calendar-nav-button"
            onClick={handlePreviousMonth}
            aria-label={t('previousMonth')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2 className="calendar-month-year">
            {monthNames[selectedMonth]} {selectedYear}
          </h2>
          <button 
            className="calendar-nav-button"
            onClick={handleNextMonth}
            aria-label={t('nextMonth')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <button 
          className="calendar-today-button"
          onClick={handleToday}
        >
          {t('today')}
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid-container">
        <div className="calendar-grid">
          {/* Week day headers */}
          <div className="calendar-week-header">
            {weekDays.map((dayName, index) => (
              <div key={index} className="calendar-week-day-header">
                {dayName}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="calendar-days-grid">
            {calendarDays.map((dayData, index) => (
              <div
                key={index}
                className={`calendar-day-cell ${
                  !dayData.isCurrentMonth ? 'other-month' : ''
                } ${dayData.isToday ? 'today' : ''} ${
                  dayData.events.length > 0 ? 'has-events' : ''
                }`}
              >
                {dayData.day !== null && (
                  <>
                    <div className="calendar-day-number">
                      {dayData.day}
                    </div>
                    <div className="calendar-day-events">
                      {dayData.events.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`calendar-event-item calendar-event-${event.type}`}
                          title={`${event.time || ''} - ${event.title} (${event.patientName})`}
                        >
                          {event.time && (
                            <span className="calendar-event-time">{event.time}</span>
                          )}
                          <span className="calendar-event-title">{event.title}</span>
                          {selectedPatient === 'all' && (
                            <Link
                              href={`/${locale}/dashboard/patients`}
                              className="calendar-event-patient"
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
                        </div>
                      ))}
                      {dayData.events.length > 3 && (
                        <div className="calendar-event-more">
                          +{dayData.events.length - 3} {t('more')}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="calendar-legend">
        <div className="calendar-legend-title">{t('eventTypes')}</div>
        <div className="calendar-legend-items">
          <div className="calendar-legend-item">
            <div className="calendar-legend-color calendar-event-appointment"></div>
            <span>{t('appointments')}</span>
          </div>
          <div className="calendar-legend-item">
            <div className="calendar-legend-color calendar-event-test"></div>
            <span>{t('tests')}</span>
          </div>
          <div className="calendar-legend-item">
            <div className="calendar-legend-color calendar-event-medication"></div>
            <span>{t('medications')}</span>
          </div>
          <div className="calendar-legend-item">
            <div className="calendar-legend-color calendar-event-reminder"></div>
            <span>{t('reminders')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

