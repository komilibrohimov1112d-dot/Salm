import { ArrowRight, ChevronLeft, ChevronRight, Eye, Layers, Phone, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { HERO_SLIDES, SCHOOL_COLORFUL_INTRO } from '../data/schoolData';
import { SafeImage } from './SafeImage';

interface HeroSectionProps {
  onNomerClick: () => void;
  onTopqirClick: () => void;
  schoolPhones: {
    reception: string;
    director: string;
  };
}

const SLIDE_INTERVAL_MS = 60_000;

export function HeroSection({ onNomerClick, onTopqirClick, schoolPhones }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [introPanel, setIntroPanel] = useState<'none' | 'korish' | 'hammasi'>('none');

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
    <section id="top" className="pb-10 sm:pb-14">
      {/* Full-bleed massive hero image featuring 71-MAKTAB */}
      <div className="relative w-full overflow-hidden border-b border-slate-800 bg-[#0d1425]">
        <div className="relative h-[68vh] min-h-[460px] max-h-[880px] w-full sm:h-[78vh] lg:h-[84vh]">
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
                fallbackTitle="71-Maktab"
                className="h-full w-full object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Bottom-only scrim so the building's 71-MAKTAB facade remains completely unobstructed */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-60 bg-gradient-to-t from-[#060a14]/95 via-[#060a14]/65 to-transparent sm:h-64"
        />

        {/* Slide Prev/Next Controls */}
        <div className="absolute right-4 top-4 z-30 flex items-center gap-2 sm:right-6 sm:top-6">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Oldingi rasm"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#090e1a]/75 text-slate-100 border border-slate-700/70 backdrop-blur-sm transition-colors hover:bg-[#11192c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Keyingi rasm"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#090e1a]/75 text-slate-100 border border-slate-700/70 backdrop-blur-sm transition-colors hover:bg-[#11192c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-30">
          <div className="mx-auto max-w-7xl px-4 pb-5 sm:px-6 sm:pb-8 lg:px-8 lg:pb-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-medium tracking-wide text-amber-300 sm:text-sm">
                  {currentSlide.kicker}
                </p>
                <h1 className="mt-1.5 font-serif text-3xl font-bold leading-none tracking-tight text-white [text-wrap:balance] sm:text-5xl lg:text-6xl">
                  71-Maktab
                </h1>
                <p className="mt-2 font-serif text-base font-medium text-slate-200 sm:text-xl">
                  Namangan shahridagi Suv xo‘jaligi maktabi
                </p>

                {/* Slide indicators */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  {HERO_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.image}
                      type="button"
                      aria-label={`${idx + 1}-rasmni ko'rish`}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIndex ? 'w-7 bg-amber-400' : 'w-2.5 bg-slate-400/40 hover:bg-slate-300/75'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-slate-300">
                    Rasmlar har 1 daqiqada almashadi
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="#maktab-haqida"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors duration-150 hover:bg-amber-400 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <span>Maktab haqida batafsil</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Directly below hero image: Ko‘rish and Hammasi interactive bar + live open Nomer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIntroPanel((prev) => (prev === 'korish' ? 'none' : 'korish'))}
              aria-expanded={introPanel === 'korish'}
              className={`inline-flex min-h-[42px] items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                introPanel === 'korish'
                  ? 'border-blue-500 bg-blue-600 text-white'
                  : 'border-slate-700 bg-[#11192c] text-slate-100 hover:border-blue-500/70 hover:bg-[#162038]'
              }`}
            >
              <Eye className="h-4 w-4" aria-hidden="true" />
              <span>Ko‘rish</span>
            </button>

            <button
              type="button"
              onClick={() => setIntroPanel((prev) => (prev === 'hammasi' ? 'none' : 'hammasi'))}
              aria-expanded={introPanel === 'hammasi'}
              className={`inline-flex min-h-[42px] items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                introPanel === 'hammasi'
                  ? 'border-amber-400 bg-amber-500 text-slate-950'
                  : 'border-slate-700 bg-[#11192c] text-slate-100 hover:border-amber-400/70 hover:bg-[#162038]'
              }`}
            >
              <Layers className="h-4 w-4" aria-hidden="true" />
              <span>Hammasi</span>
            </button>

            <a
              href="#topqir"
              onClick={onTopqirClick}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-950/60 px-4 py-2 text-sm font-semibold text-emerald-200 transition-colors hover:border-emerald-400 hover:bg-emerald-900/70 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <Sparkles className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              <span>Topqir</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-300 sm:text-sm">
            <span>Namangan shahri, Suv xo‘jaligi hududi</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <button
              type="button"
              onClick={onNomerClick}
              className="inline-flex items-center gap-1.5 font-mono font-semibold text-amber-400 transition-colors hover:text-amber-300 tabular-nums whitespace-nowrap shrink-0"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Nomer: {schoolPhones.reception}</span>
            </button>
          </div>
        </div>

        {/* Expandable Ko‘rish Panel */}
        {introPanel === 'korish' && (
          <div className="mt-5 rounded-2xl border border-blue-500/35 bg-[#11192c] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold tracking-wide text-blue-400">
                  Maktab bilan tanishuv
                </p>
                <h2 className="mt-1.5 font-serif text-2xl font-semibold text-white sm:text-3xl">
                  71-Maktab — Namangan shahridagi Suv xo‘jaligi maktabi nima haqida?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300 sm:text-base">
                  Ushbu maktab Namangan shahrining Suv xo‘jaligi hududida joylashgan zamonaviy umumta’lim maskanidir. Bu yerda 1-sinfdan 11-sinfgacha bo‘lgan 1 420 nafar o‘quvchiga 84 nafar malakali ustoz aniq fanlar, tabiiy fanlar, axborot texnologiyalari, xorijiy tillar va adabiyot yo‘nalishlarida chuqur bilim beradi. Dushanbadan shanbagacha ishlaydigan maktabda boy kutubxona, STEM laboratoriyasi, IT xonasi va sport majmuasi faoliyat yuritadi.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIntroPanel('hammasi')}
                className="inline-flex min-h-[40px] items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-amber-400 whitespace-nowrap shrink-0"
              >
                <span>Hammasini rangli ko‘rish</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Expandable Hammasi Multi-Colored Showcase Panel */}
        {introPanel === 'hammasi' && (
          <div className="mt-5 rounded-2xl border border-slate-800 bg-[#0d1425] p-5 sm:p-7">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-semibold tracking-wide text-amber-400">
                  To‘liq maktab tanishtiruvi
                </p>
                <h2 className="mt-1 font-serif text-2xl font-semibold text-white">
                  71-Maktabning barcha imkoniyatlari
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                Har bir yo‘nalish alohida rang bilan ajratilgan
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {SCHOOL_COLORFUL_INTRO.map((item, idx) => (
                <div
                  key={item.id}
                  className={`rounded-xl border p-5 transition-transform duration-150 hover:-translate-y-0.5 ${item.cardStyle}`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-medium">
                    <span className={item.accentStyle}>{item.subtitle}</span>
                    <span className={`font-mono tabular-nums ${item.accentStyle}`}>
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-90">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
