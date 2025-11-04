'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="header-brand">
        STOP SCAMS <span className="header-brand-red">NOW</span>
      </Link>
      <Link href="/report" className="header-tagline">
        REPORT NOW
      </Link>
    </header>
  );
}

