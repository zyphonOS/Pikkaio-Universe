// components/navigation.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export function Navigation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-white font-bold text-xl">PIKKAIO</div>
            <div className="text-gray-400">Loading...</div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link */}
          <Link href="/" className="text-white font-bold text-xl">
            PIKKAIO
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link 
              href="/codex" 
              className="text-gray-300 hover:text-white transition"
            >
              Codex
            </Link>
            
            {/* Simple Connect Indicator - No RainbowKit */}
            <div className="text-sm text-gray-400">
              Wallet in Codex ↓
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}