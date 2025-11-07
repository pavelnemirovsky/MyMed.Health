'use client';

import Link from 'next/link';
import { config } from '../config';

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <Link href="/" className="header-brand">
          STOP SCAMS <span className="header-brand-red">NOW</span>
        </Link>
        <p className="header-vision">Help Your Parents Stay Safe — We&apos;ll Take It from Here</p>
      </div>
      <div className="header-right">
        {!config.COMING_SOON_MODE && (
          <Link href="/dashboard" className="header-login">
            LOGIN
          </Link>
        )}
        <Link href="/report" className="header-tagline">
          REPORT NOW
        </Link>
      </div>
    </header>
  );
}

