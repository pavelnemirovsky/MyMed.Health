'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { signOut } from 'next-auth/react';

interface DashboardSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function DashboardSidebar({ isOpen, onClose, collapsed, onToggleCollapse, user }: DashboardSidebarProps) {
  const locale = useLocale();
  const t = useTranslations('dashboard.sidebar');
  const pathname = usePathname();

  const menuItems = [
    { href: 'dashboard', label: t('dashboard'), icon: '📊' },
    { href: 'dashboard/patients', label: t('peopleICareFor'), icon: '👤' },
    { href: 'dashboard/doctors', label: t('doctors'), icon: '👨‍⚕️' },
    { href: 'dashboard/medical-providers', label: t('medicalProviders'), icon: '🏥' },
    { href: 'dashboard/records', label: t('documents'), icon: '🗂️' },
    { href: 'dashboard/calendar', label: t('calendar'), icon: '📅' },
    { href: 'dashboard/medications', label: t('medications'), icon: '💊' },
    { href: 'dashboard/care-plans', label: t('carePlans'), icon: '📋' },
    { href: 'dashboard/messages', label: t('messages'), icon: '💬' },
    { href: 'dashboard/settings', label: t('settings'), icon: '⚙️' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="dashboard-sidebar-overlay" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
        <div className="dashboard-sidebar-header">
          <Link href={`/${locale}/dashboard`} className="dashboard-logo">
            <span className="dashboard-logo-icon">🏥</span>
            {!collapsed && (
              <span className="dashboard-logo-text">
                <span className="dashboard-logo-name">MedTracker</span>
                <span className="dashboard-logo-tagline">by MyMed</span>
              </span>
            )}
          </Link>
          <button 
            className="dashboard-sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ✕
          </button>
        </div>

        <nav className="dashboard-sidebar-nav">
          {menuItems.map((item) => {
            const fullHref = `/${locale}/${item.href}`;
            // Normalize paths for comparison (remove trailing slashes)
            const normalizedPathname = pathname?.replace(/\/$/, '') || '';
            const normalizedHref = fullHref.replace(/\/$/, '');
            
            // Check exact match first
            let isActive = normalizedPathname === normalizedHref;
            
            // For non-exact matches, check if it's a child route
            // But only if no more specific menu item would match
            if (!isActive && normalizedPathname.startsWith(normalizedHref + '/')) {
              // Check if there's a more specific menu item that would also match
              const hasMoreSpecificMatch = menuItems.some(otherItem => {
                if (otherItem.href === item.href) return false; // Skip self
                const otherHref = `/${locale}/${otherItem.href}`.replace(/\/$/, '');
                // Check if other item is a child of current item (more specific)
                const isChildOfCurrent = otherHref.startsWith(normalizedHref + '/');
                // Check if the pathname matches the more specific item
                const matchesOther = normalizedPathname === otherHref || 
                                    normalizedPathname.startsWith(otherHref + '/');
                // Only consider it a more specific match if it's a child AND matches
                return isChildOfCurrent && matchesOther;
              });
              
              // Only mark as active if no more specific match exists
              isActive = !hasMoreSpecificMatch;
            }
            
            return (
              <Link
                key={item.href}
                href={fullHref}
                className={`dashboard-nav-item ${isActive ? 'active' : ''}`}
                onClick={onClose}
                title={collapsed ? item.label : ''}
              >
                <span className="dashboard-nav-icon">{item.icon}</span>
                {!collapsed && <span className="dashboard-nav-label">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="dashboard-sidebar-footer">
          {!collapsed && (
            <div className="dashboard-user-profile">
              <div className="dashboard-user-avatar">
                {user.image ? (
                  <Image src={user.image} alt={user.name || 'User'} width={48} height={48} />
                ) : (
                  <span>{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                )}
              </div>
              <div className="dashboard-user-info">
                <div className="dashboard-user-name">{user.name || 'User'}</div>
                <div className="dashboard-user-email">{user.email}</div>
              </div>
            </div>
          )}
          <button
            className="dashboard-logout-btn"
            onClick={() => signOut({ callbackUrl: `/${locale}` })}
            title={collapsed ? t('logout') : ''}
          >
            <span className="dashboard-logout-icon">
              {collapsed ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17L21 12L16 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
            {!collapsed && <span>{t('logout')}</span>}
          </button>
          <button 
            className="dashboard-sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label={collapsed ? t('expandSidebar') : t('collapseSidebar')}
            title={collapsed ? t('expandSidebar') : t('collapseSidebar')}
          >
            <svg className="dashboard-collapse-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              {collapsed ? (
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
            {!collapsed && <span className="dashboard-collapse-label">{t('collapse')}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

