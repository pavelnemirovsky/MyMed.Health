'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { carePlansData, CarePlan, getCarePlansByPatientId, getActiveCarePlansByPatientId, secondOpinionData } from '../../data/mockData';
import { patientsData } from '../../data/mockData';

export default function CarePlansContent() {
  const locale = useLocale();
  const t = useTranslations('dashboard.carePlansPage');
  const [filterPatient, setFilterPatient] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  // Filter care plans
  const filteredPlans = carePlansData.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.treatment.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPatient = filterPatient === 'all' || plan.patientId === filterPatient;
    
    const matchesStatus = filterStatus === 'all' || plan.status === filterStatus;
    
    return matchesSearch && matchesPatient && matchesStatus;
  });

  const activePlans = carePlansData.filter(p => p.status === 'active');
  const completedPlans = carePlansData.filter(p => p.status === 'completed');
  const pausedPlans = carePlansData.filter(p => p.status === 'paused');
  const cancelledPlans = carePlansData.filter(p => p.status === 'cancelled');

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return '#059669';
      case 'completed': return '#6b7280';
      case 'paused': return '#f59e0b';
      case 'cancelled': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusBadgeBg = (status: string) => {
    switch (status) {
      case 'active': return '#d1fae5';
      case 'completed': return '#f3f4f6';
      case 'paused': return '#fef3c7';
      case 'cancelled': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  const getMilestoneStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#059669';
      case 'in-progress': return '#2563eb';
      case 'pending': return '#6b7280';
      case 'overdue': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getMilestoneStatusBg = (status: string) => {
    switch (status) {
      case 'completed': return '#d1fae5';
      case 'in-progress': return '#dbeafe';
      case 'pending': return '#f3f4f6';
      case 'overdue': return '#fee2e2';
      default: return '#f3f4f6';
    }
  };

  const getMilestoneTypeIcon = (type?: string) => {
    switch (type) {
      case 'treatment': return '💉';
      case 'test': return '🔬';
      case 'appointment': return '📅';
      case 'checkup': return '🏥';
      default: return '✓';
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

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
        <div className="dashboard-widget" style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 600, marginBottom: '0.25rem' }}>
            {t('activePlans')}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#059669' }}>
            {activePlans.length}
          </div>
        </div>
        <div className="dashboard-widget" style={{ background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)', padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#374151', fontWeight: 600, marginBottom: '0.25rem' }}>
            {t('completed')}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6b7280' }}>
            {completedPlans.length}
          </div>
        </div>
        <div className="dashboard-widget" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#92400e', fontWeight: 600, marginBottom: '0.25rem' }}>
            {t('paused')}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#f59e0b' }}>
            {pausedPlans.length}
          </div>
        </div>
        <div className="dashboard-widget" style={{ background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', padding: '0.75rem' }}>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 600, marginBottom: '0.25rem' }}>
            {t('cancelled')}
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#dc2626' }}>
            {cancelledPlans.length}
          </div>
        </div>
      </div>

      {/* Filters and Search */}
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
            <option value="paused">{t('paused')}</option>
            <option value="cancelled">{t('cancelled')}</option>
          </select>
        </div>
      </div>

      {/* Care Plans List */}
      {filteredPlans.length === 0 ? (
        <div className="dashboard-widget" style={{ padding: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📋</div>
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>
              {t('noCarePlansFound')}
            </div>
            <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
              {t('tryAdjustingFilters')}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredPlans.map((plan) => {
            const isExpanded = expandedPlan === plan.id;
            const completedMilestones = plan.milestones.filter(m => m.status === 'completed').length;
            const totalMilestones = plan.milestones.length;
            const progressPercentage = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;
            
            return (
              <div
                key={plan.id}
                className="dashboard-widget"
                style={{
                  borderLeft: `4px solid ${getStatusBadgeColor(plan.status)}`,
                }}
              >
                <div className="dashboard-widget-content">
                  {/* Plan Header */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1f2937', margin: 0 }}>
                            {plan.title}
                          </h3>
                          <span
                            style={{
                              padding: '0.25rem 0.75rem',
                              borderRadius: '12px',
                              fontSize: '0.75rem',
                              fontWeight: 600,
                              background: getStatusBadgeBg(plan.status),
                              color: getStatusBadgeColor(plan.status),
                            }}
                          >
                            {t(plan.status)}
                          </span>
                        </div>
                        {plan.description && (
                          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                            {plan.description}
                          </div>
                        )}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: '#6b7280' }}>
                          <span>
                            <strong>{t('patient')}:</strong>{' '}
                            <Link 
                              href={`/${locale}/dashboard/patients`}
                              style={{
                                color: '#059669',
                                textDecoration: 'none',
                                fontWeight: 500,
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.textDecoration = 'underline';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.textDecoration = 'none';
                              }}
                            >
                              {plan.patientName}
                            </Link>
                          </span>
                          <span><strong>{t('condition')}:</strong> {plan.condition}</span>
                          <span><strong>{t('treatment')}:</strong> {plan.treatment}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setExpandedPlan(isExpanded ? null : plan.id)}
                        style={{
                          padding: '0.5rem',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          color: '#6b7280',
                        }}
                      >
                        {isExpanded ? '▼' : '▶'}
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280' }}>
                          {t('progress')}: {completedMilestones} / {totalMilestones} {t('milestones')}
                        </span>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669' }}>
                          {Math.round(progressPercentage)}%
                        </span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '8px',
                        background: '#e5e7eb',
                        borderRadius: '4px',
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          width: `${progressPercentage}%`,
                          height: '100%',
                          background: '#059669',
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                    </div>

                    {/* Plan Dates */}
                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8125rem', color: '#6b7280' }}>
                      <span><strong>{t('startDate')}:</strong> {new Date(plan.startDate).toLocaleDateString()}</span>
                      <span><strong>{t('endDate')}:</strong> {new Date(plan.endDate).toLocaleDateString()}</span>
                      {plan.doctorName && (
                        <span><strong>{t('doctor')}:</strong> {plan.doctorName}</span>
                      )}
                    </div>
                  </div>

                  {/* Expanded Milestones */}
                  {isExpanded && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1f2937', marginBottom: '1rem' }}>
                        {t('milestones')}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {plan.milestones.map((milestone) => (
                          <div
                            key={milestone.id}
                            style={{
                              padding: '0.75rem',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              background: '#f9fafb',
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                              <div style={{ fontSize: '1.25rem', flexShrink: 0 }}>
                                {getMilestoneTypeIcon(milestone.type)}
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937' }}>
                                    {milestone.title}
                                  </span>
                                  {milestone.secondOpinionId && (
                                    <span
                                      title={t('hasSecondOpinion')}
                                      style={{
                                        fontSize: '0.875rem',
                                        cursor: 'help',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                      }}
                                    >
                                      ⚠️
                                    </span>
                                  )}
                                  <span
                                    style={{
                                      padding: '0.125rem 0.5rem',
                                      borderRadius: '8px',
                                      fontSize: '0.6875rem',
                                      fontWeight: 600,
                                      background: getMilestoneStatusBg(milestone.status),
                                      color: getMilestoneStatusColor(milestone.status),
                                    }}
                                  >
                                    {t(milestone.status)}
                                  </span>
                                </div>
                                {milestone.secondOpinionId && (() => {
                                  const secondOpinion = secondOpinionData.requests.find(so => so.id === milestone.secondOpinionId);
                                  return secondOpinion ? (
                                    <div style={{ 
                                      marginTop: '0.5rem', 
                                      padding: '0.5rem', 
                                      background: '#fef3c7', 
                                      borderRadius: '4px',
                                      border: '1px solid #fbbf24',
                                    }}>
                                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#92400e', marginBottom: '0.25rem' }}>
                                        ⚠️ {t('secondOpinion')}: {secondOpinion.status}
                                      </div>
                                      <div style={{ fontSize: '0.75rem', color: '#78350f' }}>
                                        <div><strong>{t('doctor')}:</strong> {secondOpinion.doctor}</div>
                                        <div style={{ marginTop: '0.25rem' }}>
                                          <strong>{t('startDate')}:</strong> {new Date(secondOpinion.startDate).toLocaleDateString()}
                                        </div>
                                        {secondOpinion.endDate && (
                                          <div style={{ marginTop: '0.25rem' }}>
                                            <strong>{t('endDate')}:</strong> {new Date(secondOpinion.endDate).toLocaleDateString()}
                                          </div>
                                        )}
                                        {secondOpinion.recommendation && (
                                          <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #fbbf24' }}>
                                            <strong>{t('recommendation')}:</strong>
                                            <div style={{ marginTop: '0.25rem', fontSize: '0.6875rem', lineHeight: '1.4' }}>
                                              {secondOpinion.recommendation}
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  ) : null;
                                })()}
                                {milestone.description && (
                                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                                    {milestone.description}
                                  </div>
                                )}
                                <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                                  <strong>{t('dueDate')}:</strong> {new Date(milestone.dueDate).toLocaleDateString()}
                                  {milestone.completedDate && (
                                    <span style={{ marginLeft: '1rem' }}>
                                      <strong>{t('completedDate')}:</strong> {new Date(milestone.completedDate).toLocaleDateString()}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Additional Info */}
                      {(plan.medications || plan.notes) && (
                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
                          {plan.medications && plan.medications.length > 0 && (
                            <div style={{ marginBottom: '0.75rem' }}>
                              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                {t('medications')}
                              </div>
                              <div style={{ fontSize: '0.875rem', color: '#1f2937' }}>
                                {plan.medications.join(', ')}
                              </div>
                            </div>
                          )}
                          {plan.notes && (
                            <div>
                              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                                {t('notes')}
                              </div>
                              <div style={{ fontSize: '0.875rem', color: '#1f2937', lineHeight: '1.6' }}>
                                {plan.notes}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

