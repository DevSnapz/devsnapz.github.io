import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';

interface NavProps {
  currentView: 'landing' | 'explore' | 'dashboard';
  setCurrentView: (view: 'landing' | 'explore' | 'dashboard') => void;
  onOpenCreateWizard: () => void;
  pendingNotifications: number;
}

export default function Nav({
  currentView,
  setCurrentView,
  onOpenCreateWizard,
  pendingNotifications,
}: NavProps) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (view: 'landing' | 'explore' | 'dashboard') => {
    setCurrentView(view);
    setOpen(false);
    // Scroll to top of the page when changing view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="relative sticky top-0 z-50 bg-bg0/80 backdrop-blur-md border-b border-ink3">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-8 py-2 sm:py-3.5 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('landing')}
          className="font-outfit font-extrabold text-[1.1rem] text-ink0 leading-tight bg-transparent border-none outline-none cursor-pointer"
        >
          Dev<span className="text-g">Snapz</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5 sm:gap-6">
          <button
            onClick={() => handleNavClick('landing')}
            className={`text-xs font-semibold font-dmmono transition-colors ${
              currentView === 'landing' ? 'text-g' : 'text-ink1 hover:text-ink0'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => handleNavClick('explore')}
            className={`text-xs font-semibold font-dmmono transition-colors ${
              currentView === 'explore' ? 'text-g' : 'text-ink1 hover:text-ink0'
            }`}
          >
            Explore Projects
          </button>
          
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`text-xs font-semibold font-dmmono transition-colors flex items-center gap-1.5 ${
              currentView === 'dashboard' ? 'text-g' : 'text-ink1 hover:text-ink0'
            }`}
          >
            Creator Hub
            {pendingNotifications > 0 && (
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={onOpenCreateWizard}
            className="text-[0.72rem] sm:text-xs font-semibold font-dmmono text-g-text bg-g/10 border border-g-dim rounded-md px-3.5 py-1.5 hover:bg-g/20 transition-all active:scale-95"
          >
            Share Project
          </button>
          
          <ThemeToggle />
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex items-center justify-center h-10 w-10 rounded-md text-ink1 hover:text-ink0 bg-g/5 border border-ink3/50"
          >
            <span className="text-xl leading-none">{open ? '×' : '≡'}</span>
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`absolute right-4 top-full z-40 mt-2 w-[min(260px,calc(100%-1rem))] overflow-hidden rounded-xl border border-ink3 bg-bg0 shadow-2xl transition-all duration-200 md:hidden ${
          open ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
        }`}
      >
        <div className="flex flex-col gap-2 p-3">
          <button
            onClick={() => handleNavClick('landing')}
            className={`rounded-lg border px-4 py-2.5 text-xs text-left font-dmmono ${
              currentView === 'landing' ? 'border-g bg-g/5 text-g' : 'border-ink3 text-ink1 hover:text-ink0 hover:bg-bg2'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => handleNavClick('explore')}
            className={`rounded-lg border px-4 py-2.5 text-xs text-left font-dmmono ${
              currentView === 'explore' ? 'border-g bg-g/5 text-g' : 'border-ink3 text-ink1 hover:text-ink0 hover:bg-bg2'
            }`}
          >
            Explore Projects
          </button>
          
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`rounded-lg border px-4 py-2.5 text-xs text-left font-dmmono flex items-center justify-between ${
              currentView === 'dashboard' ? 'border-g bg-g/5 text-g' : 'border-ink3 text-ink1 hover:text-ink0 hover:bg-bg2'
            }`}
          >
            Creator Hub
            {pendingNotifications > 0 && (
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            )}
          </button>
          
          <button
            onClick={() => {
              setOpen(false);
              onOpenCreateWizard();
            }}
            className="rounded-lg border border-g-dim bg-g/10 px-4 py-2.5 text-xs font-bold text-center text-g-text"
          >
            Share Project
          </button>
        </div>
      </div>
    </nav>
  );
}
