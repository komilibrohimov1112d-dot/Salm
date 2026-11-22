import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onYouTubeClick: () => void;
  onTopqirClick: () => void;
  onNomerClick: () => void;
}

const NAV_LINKS = [
  { label: 'Maktab haqida', href: '#maktab-haqida' },
  { label: 'Yangiliklar', href: '#yangiliklar' },
  { label: 'YouTube', href: '#youtube', action: 'youtube' as const },
  { label: 'Topqir', href: '#topqir', action: 'topqir' as const },
  { label: 'Aloqa', href: '#aloqa' },
];

export function Navbar({ onYouTubeClick, onTopqirClick, onNomerClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (action?: 'youtube' | 'topqir') => {
    setMobileOpen(false);
    if (action === 'youtube') {
      onYouTubeClick();
    } else if (action === 'topqir') {
      onTopqirClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#090e1a]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif text-xl font-bold tracking-tight text-slate-100 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
        >
          71-Maktab
        </a>

        {/* Zone 2: 4 concise single-line text links */}
        <nav
          aria-label="Asosiy navigatsiya"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleLinkClick(link.action)}
              className="relative py-1 text-slate-300 transition-colors duration-150 hover:text-white whitespace-nowrap shrink-0 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-amber-400 after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (Nomer) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onNomerClick}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-blue-500 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#090e1a]"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Nomer</span>
          </button>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-200 transition-colors hover:bg-slate-800 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-800 bg-[#0d1425] px-4 py-4 md:hidden">
          <nav aria-label="Mobil menyu" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.action)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-800"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onNomerClick();
              }}
              className="mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>Nomer</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
