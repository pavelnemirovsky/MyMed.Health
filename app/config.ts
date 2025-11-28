/**
 * Application Configuration
 * 
 * This file controls various settings for the Stop Scams Now application.
 * 
 * COMING_SOON_MODE:
 * - When set to true: Shows a "Coming Soon" page with email signup
 * - When set to false: Shows the full landing page with all features
 * 
 * To enable Coming Soon mode:
 *   1. Set COMING_SOON_MODE to true
 *   2. The page will automatically show the Coming Soon version
 * 
 * To disable Coming Soon mode and show full site:
 *   1. Set COMING_SOON_MODE to false
 *   2. The full landing page will automatically be shown (already restored in HomePage.tsx)
 */

export const config = {
  // Coming Soon Mode
  // Set to true to show Coming Soon page, false to show full site
  COMING_SOON_MODE: false,
  
  // Site Information
  siteName: 'MedTracker by MyMed',
  siteTagline: 'Managing complex medical care, simply.',
  
  // Contact Information
  contactEmail: 'support@mymed.health',
  contactPhone: '',
  contactPhoneTel: '',
  
  // Social Media (update with your actual links)
  socialMedia: {
    facebook: '#',
    twitter: '#',
    linkedin: '#',
    instagram: '#',
  },
} as const;

// Type export for TypeScript
export type Config = typeof config;

