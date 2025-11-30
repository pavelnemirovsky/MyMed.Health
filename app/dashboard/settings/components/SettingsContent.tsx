'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface SettingsContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  isSSO: boolean;
}

export default function SettingsContent({ user, isSSO }: SettingsContentProps) {
  const t = useTranslations('dashboard.settings');
  const [activeSection, setActiveSection] = useState<string>('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    reminders: true,
    testResults: true,
    appointments: true,
  });
  const [privacy, setPrivacy] = useState({
    shareData: false,
    analytics: true,
    marketing: false,
  });
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  const settingsSections = [
    { id: 'profile', icon: '👤', label: t('profile') },
    { id: 'notifications', icon: '🔔', label: t('notifications') },
    { id: 'privacy', icon: '🔒', label: t('privacy') },
    { id: 'language', icon: '🌐', label: t('language') },
    { id: 'appearance', icon: '🎨', label: t('appearance') },
    { id: 'data', icon: '💾', label: t('data') },
    { id: 'account', icon: '⚙️', label: t('account') },
  ];

  return (
    <div className="dashboard-widgets">
      {/* Page Header */}
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">{t('title')}</h1>
          <p className="dashboard-page-date">{t('subtitle')}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '1.5rem' }}>
        {/* Settings Sidebar */}
        <div className="dashboard-widget">
          <div className="dashboard-widget-content" style={{ padding: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    border: 'none',
                    background: activeSection === section.id ? '#f0fdf4' : 'transparent',
                    color: activeSection === section.id ? '#059669' : '#6b7280',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.875rem',
                    fontWeight: activeSection === section.id ? 600 : 500,
                    borderRadius: '6px',
                    transition: 'all 0.2s ease',
                    borderLeft: activeSection === section.id ? '3px solid #059669' : '3px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== section.id) {
                      e.currentTarget.style.background = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== section.id) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="dashboard-widget">
          <div className="dashboard-widget-header">
            <h3 className="dashboard-widget-title">
              {settingsSections.find(s => s.id === activeSection)?.icon} {settingsSections.find(s => s.id === activeSection)?.label}
            </h3>
          </div>
          <div className="dashboard-widget-content">
            {/* Profile Settings */}
            {activeSection === 'profile' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {isSSO && (
                  <div style={{ padding: '0.75rem', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.8125rem', color: '#075985' }}>
                      ℹ️ {t('ssoAccountNote')}
                    </div>
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                    {t('profileName')}
                  </label>
                  <input
                    type="text"
                    value={user.name || ''}
                    readOnly={isSSO}
                    disabled={isSSO}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      background: isSSO ? '#f3f4f6' : 'white',
                      color: isSSO ? '#6b7280' : '#1f2937',
                      cursor: isSSO ? 'not-allowed' : 'text',
                    }}
                  />
                  {isSSO && (
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      {t('ssoFieldNote')}
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                    {t('profileEmail')}
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    readOnly={isSSO}
                    disabled={isSSO}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      background: isSSO ? '#f3f4f6' : 'white',
                      color: isSSO ? '#6b7280' : '#1f2937',
                      cursor: isSSO ? 'not-allowed' : 'text',
                    }}
                  />
                  {isSSO && (
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      {t('ssoFieldNote')}
                    </div>
                  )}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                    {t('profilePhone')}
                  </label>
                  <input
                    type="tel"
                    placeholder={t('profilePhonePlaceholder')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                    {t('profilePhoto')}
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: '#e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}>
                      {user.image ? (
                        <img 
                          src={user.image} 
                          alt={user.name || 'User'} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ fontSize: '1.5rem' }}>
                          {user.name?.charAt(0).toUpperCase() || '👤'}
                        </div>
                      )}
                    </div>
                    {!isSSO && (
                      <button style={{
                        padding: '0.5rem 1rem',
                        background: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                      }}>
                        {t('changePhoto')}
                      </button>
                    )}
                    {isSSO && (
                      <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                        {t('ssoPhotoNote')}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button style={{
                    padding: '0.75rem 1.5rem',
                    background: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}>
                    {t('saveChanges')}
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {t('notificationsDesc')}
                </div>
                {[
                  { key: 'email', label: t('emailNotifications'), desc: t('emailNotificationsDesc') },
                  { key: 'sms', label: t('smsNotifications'), desc: t('smsNotificationsDesc') },
                  { key: 'push', label: t('pushNotifications'), desc: t('pushNotificationsDesc') },
                  { key: 'reminders', label: t('reminderNotifications'), desc: t('reminderNotificationsDesc') },
                  { key: 'testResults', label: t('testResultsNotifications'), desc: t('testResultsNotificationsDesc') },
                  { key: 'appointments', label: t('appointmentNotifications'), desc: t('appointmentNotificationsDesc') },
                ].map((item) => (
                  <div key={item.key} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                        {item.desc}
                      </div>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: 'pointer',
                    }}>
                      <input
                        type="checkbox"
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: notifications[item.key as keyof typeof notifications] ? '#059669' : '#d1d5db',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '2px',
                          left: notifications[item.key as keyof typeof notifications] ? '22px' : '2px',
                          width: '20px',
                          height: '20px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        }} />
                      </span>
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Privacy Settings */}
            {activeSection === 'privacy' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {t('privacyDesc')}
                </div>
                {[
                  { key: 'shareData', label: t('shareData'), desc: t('shareDataDesc') },
                  { key: 'analytics', label: t('analytics'), desc: t('analyticsDesc') },
                  { key: 'marketing', label: t('marketing'), desc: t('marketingDesc') },
                ].map((item) => (
                  <div key={item.key} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                        {item.desc}
                      </div>
                    </div>
                    <label style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '44px',
                      height: '24px',
                      cursor: 'pointer',
                    }}>
                      <input
                        type="checkbox"
                        checked={privacy[item.key as keyof typeof privacy]}
                        onChange={(e) => setPrivacy({ ...privacy, [item.key]: e.target.checked })}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: privacy[item.key as keyof typeof privacy] ? '#059669' : '#d1d5db',
                        borderRadius: '12px',
                        transition: 'all 0.3s ease',
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '2px',
                          left: privacy[item.key as keyof typeof privacy] ? '22px' : '2px',
                          width: '20px',
                          height: '20px',
                          background: 'white',
                          borderRadius: '50%',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        }} />
                      </span>
                    </label>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#fef3c7', border: '1px solid #fbbf24', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e', marginBottom: '0.5rem' }}>
                    {t('hipaaCompliant')}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#78350f' }}>
                    {t('hipaaCompliantDesc')}
                  </div>
                </div>
              </div>
            )}

            {/* Language Settings */}
            {activeSection === 'language' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {t('languageDesc')}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>
                    {t('preferredLanguage')}
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '0.875rem',
                      background: 'white',
                    }}
                  >
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="es">Español</option>
                    <option value="it">Italiano</option>
                    <option value="de">Deutsch</option>
                    <option value="ru">Русский</option>
                  </select>
                </div>
                <div style={{ padding: '1rem', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.875rem', color: '#0c4a6e' }}>
                    {t('languageNote')}
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {t('appearanceDesc')}
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.75rem' }}>
                    {t('theme')}
                  </label>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    {[
                      { value: 'light', label: t('light'), icon: '☀️' },
                      { value: 'dark', label: t('dark'), icon: '🌙' },
                      { value: 'auto', label: t('auto'), icon: '💻' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        style={{
                          flex: 1,
                          padding: '1rem',
                          border: `2px solid ${theme === option.value ? '#059669' : '#e5e7eb'}`,
                          borderRadius: '8px',
                          background: theme === option.value ? '#f0fdf4' : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '0.5rem',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{ fontSize: '2rem' }}>{option.icon}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: theme === option.value ? '#059669' : '#1f2937' }}>
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Data Settings */}
            {activeSection === 'data' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {t('dataDesc')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>
                        {t('exportData')}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                        {t('exportDataDesc')}
                      </div>
                    </div>
                    <span style={{ fontSize: '1.25rem' }}>⬇️</span>
                  </button>
                  <button style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>
                        {t('backupData')}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                        {t('backupDataDesc')}
                      </div>
                    </div>
                    <span style={{ fontSize: '1.25rem' }}>💾</span>
                  </button>
                  <button style={{
                    padding: '1rem',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    background: '#fef2f2',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#dc2626', marginBottom: '0.25rem' }}>
                        {t('deleteData')}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#991b1b' }}>
                        {t('deleteDataDesc')}
                      </div>
                    </div>
                    <span style={{ fontSize: '1.25rem' }}>🗑️</span>
                  </button>
                </div>
              </div>
            )}

            {/* Account Settings */}
            {activeSection === 'account' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  {t('accountDesc')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button 
                    disabled={isSSO}
                    style={{
                      padding: '1rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      background: isSSO ? '#f3f4f6' : 'white',
                      textAlign: 'left',
                      cursor: isSSO ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      opacity: isSSO ? 0.6 : 1,
                    }}
                    onClick={() => {
                      if (!isSSO) {
                        // TODO: Implement password change
                        alert('Password change functionality coming soon');
                      }
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: isSSO ? '#9ca3af' : '#1f2937', marginBottom: '0.25rem' }}>
                        {t('changePassword')}
                        {isSSO && ` (${t('disabled')})`}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: isSSO ? '#9ca3af' : '#6b7280' }}>
                        {isSSO ? t('ssoPasswordNote') : t('changePasswordDesc')}
                      </div>
                    </div>
                    <span style={{ fontSize: '1.25rem' }}>🔑</span>
                  </button>
                  <button style={{
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    background: 'white',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>
                        {t('twoFactorAuth')}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>
                        {t('twoFactorAuthDesc')}
                      </div>
                    </div>
                    <span style={{ fontSize: '1.25rem' }}>🔐</span>
                  </button>
                  <button style={{
                    padding: '1rem',
                    border: '1px solid #ef4444',
                    borderRadius: '8px',
                    background: '#fef2f2',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#dc2626', marginBottom: '0.25rem' }}>
                        {t('deleteAccount')}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#991b1b' }}>
                        {t('deleteAccountDesc')}
                      </div>
                    </div>
                    <span style={{ fontSize: '1.25rem' }}>⚠️</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

