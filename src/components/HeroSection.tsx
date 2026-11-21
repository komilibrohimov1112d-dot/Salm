import { ArrowRight, ChevronLeft, ChevronRight, Lock, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HERO_SLIDES } from '../data/schoolData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onNomerClick: () => void;
  isNomerUnlocked: boolean;
}

const SLIDE_INTERVAL_MS = 60_000;

export function HeroSection({ onNomerClick, isNomerUnlocked }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section id="top" className="pt-6 pb-10 sm:pt-8 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Dominant visual focal carrier with 1-minute auto-rotating school photography */}
        <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-900">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] w-full">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.image}
                aria-hidden={idx !== activeIndex}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <SafeImage
                  src={slide.image}
                  alt={slide.alt}
                  fallbackTitle="Namangan shahridagi Suv xo‘jaligi maktabi"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ))}
          </div>

          {/* Measured contrast scrim for legible overlay text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent"
          />

          {/* Slide Prev/Next Controls */}
          <div className="absolute right-4 top-4 z-30 flex items-center gap-2 sm:right-6 sm:top-6">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Oldingi rasm"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-950/55 text-white backdrop-blur-sm transition-colors hover:bg-zinc-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Keyingi rasm"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-950/55 text-white backdrop-blur-sm transition-colors hover:bg-zinc-950/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute inset-x-0 bottom-0 z-30 p-5 sm:p-8 lg:p-12">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-wide text-stone-300 sm:text-sm">
                  {currentSlide.kicker}
                </p>
                <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight tracking-tight text-white [text-wrap:balance] sm:text-4xl lg:text-5xl">
                  Namangan shahridagi Suv xo‘jaligi maktabi
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-stone-200 sm:text-base">
                  {currentSlide.caption} — zamonaviy ta'lim muhiti, chuqurlashtirilgan fanlar hamda barkamol avlod tarbiyasi maskani.
                </p>

                {/* Slide indicators */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.image}
                      type="button"
                      aria-label={`${idx + 1}-rasmni ko'rish`}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIndex ? 'w-7 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-stone-300">
                    Rasmlar har 1 daqiqada almashadi
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="#maktab-haqida"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-zinc-950 transition-colors duration-150 hover:bg-stone-100 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>Maktab haqida batafsil</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Clean operational utility strip directly below hero */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-stone-200 pb-4 text-xs text-zinc-600 sm:text-sm">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-medium text-zinc-900">Manzil:</span>
            <span>Namangan shahri, Suv xo‘jaligi hududi</span>
            <span aria-hidden="true" className="text-stone-400">·</span>
            <span>Dushanba – Shanba, 08:00 – 17:30</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#youtube"
              className="font-medium text-blue-900 underline-offset-4 hover:underline whitespace-nowrap shrink-0"
            >
              YouTube
            </a>
            <span aria-hidden="true" className="text-stone-400">/</span>
            <a
              href="#raspisaniya"
              className="font-medium text-zinc-800 underline-offset-4 hover:underline whitespace-nowrap shrink-0"
            >
              Raspisaniya
            </a>
            <span aria-hidden="true" className="text-stone-400">/</span>
            <button
              type="button"
              onClick={onNomerClick}
              className="inline-flex items-center gap-1.5 font-semibold text-blue-900 underline-offset-4 hover:underline whitespace-nowrap shrink-0"
            >
              {isNomerUnlocked ? (
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>Nomer</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
