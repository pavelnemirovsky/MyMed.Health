'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useDarkMode } from '../hooks/useDarkMode';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import { notificationsData, getUnreadNotificationCount, type Notification } from '../data/mockData';

interface DashboardHeaderProps {
  onMenuClick: () => void;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function DashboardHeader({ onMenuClick, user }: DashboardHeaderProps) {
  const locale = useLocale();
  const t = useTranslations('dashboard.header');
  const { isDark, toggleDarkMode, mounted } = useDarkMode();
  const [imageError, setImageError] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const unreadCount = getUnreadNotificationCount();

  // Close notifications when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [notificationsOpen]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'reminder':
      case 'appointment':
        return '📅';
      case 'document':
        return '📄';
      case 'secondOpinion':
        return '👨‍⚕️';
      case 'test':
        return '🔬';
      case 'medication':
        return '💊';
      case 'carePlan':
        return '📋';
      default:
        return '🔔';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t('justNow');
    if (diffMins < 60) return `${diffMins} ${t('minutesAgo')}`;
    if (diffHours < 24) return `${diffHours} ${t('hoursAgo')}`;
    if (diffDays < 7) return `${diffDays} ${t('daysAgo')}`;
    return date.toLocaleDateString();
  };

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-left">
        <button 
          className="dashboard-menu-btn"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className="dashboard-search">
          <input 
            type="search" 
                placeholder={t('searchPlaceholder')}
            className="dashboard-search-input"
          />
          <span className="dashboard-search-emoji">🔍</span>
        </div>
      </div>
      
      <div className="dashboard-header-right">
        <LanguageSwitcher />
        {mounted && (
          <button 
            className="dashboard-header-icon" 
            aria-label={t('toggleDarkMode')}
            onClick={toggleDarkMode}
            title={isDark ? t('switchToLightMode') : t('switchToDarkMode')}
          >
            {isDark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
        )}
        <div ref={notificationsRef} style={{ position: 'relative' }}>
          <button 
            className="dashboard-header-icon" 
            aria-label={t('notifications')}
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            style={{ position: 'relative' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {unreadCount > 0 && (
              <span className="dashboard-notification-badge">{unreadCount}</span>
            )}
          </button>
          
          {notificationsOpen && (
            <div className="dashboard-notifications-dropdown">
              <div className="dashboard-notifications-header">
                <h3>{t('notifications')}</h3>
                {unreadCount > 0 && (
                  <span className="dashboard-notifications-unread">{unreadCount} {t('unread')}</span>
                )}
              </div>
              <div className="dashboard-notifications-list">
                {notificationsData.length === 0 ? (
                  <div className="dashboard-notifications-empty">
                    {t('noNotifications')}
                  </div>
                ) : (
                  notificationsData.map((notification) => (
                    <Link
                      key={notification.id}
                      href={`/${locale}${notification.link || '#'}`}
                      className={`dashboard-notification-item ${!notification.read ? 'unread' : ''}`}
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <div className="dashboard-notification-icon">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="dashboard-notification-content">
                        <div className="dashboard-notification-title">{notification.title}</div>
                        <div className="dashboard-notification-message">{notification.message}</div>
                        <div className="dashboard-notification-time">{formatTimestamp(notification.timestamp)}</div>
                      </div>
                      {!notification.read && (
                        <div className="dashboard-notification-dot"></div>
                      )}
                    </Link>
                  ))
                )}
              </div>
              {notificationsData.length > 0 && (
                <div className="dashboard-notifications-footer">
                  <Link href={`/${locale}/dashboard/messages`} onClick={() => setNotificationsOpen(false)}>
                    {t('viewAll')}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <Link href={`/${locale}`} className="dashboard-header-icon" aria-label="Home" title={t('returnToHome')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Link>
        <div className="dashboard-user-menu">
          <div className="dashboard-user-avatar-small">
            {user.image && !imageError ? (
              <Image 
                src={user.image} 
                alt={user.name || 'User'} 
                width={32} 
                height={32}
                onError={() => setImageError(true)}
              />
            ) : (
              <span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

