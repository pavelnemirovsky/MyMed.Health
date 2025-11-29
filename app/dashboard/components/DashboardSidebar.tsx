'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/patients', label: 'Patients', icon: '👤' },
  { href: '/dashboard/doctors', label: 'Doctors', icon: '👨‍⚕️' },
  { href: '/dashboard/medical-providers', label: 'Medical Providers', icon: '🏥' },
  { href: '/dashboard/documents', label: 'Documents', icon: '🗂️' },
  { href: '/dashboard/calendar', label: 'Calendar', icon: '📅' },
  { href: '/dashboard/medications', label: 'Medications', icon: '💊' },
  { href: '/dashboard/care-plans', label: 'Care Plans', icon: '📋' },
  { href: '/dashboard/messages', label: 'Messages', icon: '💬' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
];

export default function DashboardSidebar({ isOpen, onClose, collapsed, onToggleCollapse, user }: DashboardSidebarProps) {
  const pathname = usePathname();

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
          <Link href="/dashboard" className="dashboard-logo">
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
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
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
                  <img src={user.image} alt={user.name || 'User'} />
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
            onClick={() => signOut({ callbackUrl: '/' })}
            title={collapsed ? 'Logout' : ''}
          >
            <span>🚪</span>
            {!collapsed && <span>Logout</span>}
          </button>
          <button 
            className="dashboard-sidebar-collapse-btn"
            onClick={onToggleCollapse}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className="dashboard-collapse-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              {collapsed ? (
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              ) : (
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              )}
            </svg>
            {!collapsed && <span className="dashboard-collapse-label">Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

