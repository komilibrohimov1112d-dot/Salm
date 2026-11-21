import { Lock, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onYouTubeClick: () => void;
  onNomerClick: () => void;
  isNomerUnlocked: boolean;
}

const NAV_LINKS = [
  { label: 'Maktab haqida', href: '#maktab-haqida' },
  { label: 'Yangiliklar', href: '#yangiliklar' },
  { label: 'YouTube', href: '#youtube', isYouTube: true },
  { label: 'Raspisaniya', href: '#raspisaniya' },
];

export function Navbar({ onYouTubeClick, onNomerClick, isNomerUnlocked }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (isYouTube?: boolean) => {
    setMobileOpen(false);
    if (isYouTube) {
      onYouTubeClick();
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/90 bg-[#f8f7f4]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif text-lg sm:text-xl font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 rounded"
        >
          Suv xo‘jaligi maktabi
        </a>

        {/* Zone 2: 4 concise single-line text links */}
        <nav
          aria-label="Asosiy navigatsiya"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleLinkClick(link.isYouTube)}
              className="relative py-1 text-zinc-600 transition-colors duration-150 hover:text-zinc-950 whitespace-nowrap shrink-0 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-blue-900 after:transition-transform after:duration-150 hover:after:scale-x-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 rounded-sm"
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
            className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-900 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-blue-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
          >
            {isNomerUnlocked ? (
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            <span>Nomer</span>
          </button>

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Menyuni yopish' : 'Menyuni ochish'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-300 text-zinc-800 transition-colors hover:bg-stone-200/60 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-stone-200 bg-[#f8f7f4] px-4 py-4 md:hidden">
          <nav aria-label="Mobil menyu" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleLinkClick(link.isYouTube)}
                className="flex min-h-[44px] items-center rounded-lg px-3 text-sm font-medium text-zinc-800 transition-colors hover:bg-stone-200/70"
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
              className="mt-2 flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-blue-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-950"
            >
              {isNomerUnlocked ? (
                <Phone className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Lock className="h-4 w-4" aria-hidden="true" />
              )}
              <span>Nomer</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
