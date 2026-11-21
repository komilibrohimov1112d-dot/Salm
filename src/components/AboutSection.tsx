import { Lock, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  ACADEMIC_DIRECTIONS,
  CAMPUS_GALLERY,
  SCHOOL_FACILITIES,
  SCHOOL_STATS,
} from '../data/schoolData';
import { SafeImage } from './SafeImage';

interface AboutSectionProps {
  onNomerClick: () => void;
  isNomerUnlocked: boolean;
  schoolPhones: {
    reception: string;
    director: string;
  };
}

const GALLERY_ROTATION_MS = 60_000;

export function AboutSection({
  onNomerClick,
  isNomerUnlocked,
  schoolPhones,
}: AboutSectionProps) {
  const [featuredIdx, setFeaturedIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFeaturedIdx((prev) => (prev + 1) % CAMPUS_GALLERY.length);
    }, GALLERY_ROTATION_MS);

    return () => window.clearInterval(timer);
  }, []);

  const activeFeature = CAMPUS_GALLERY[featuredIdx];

  return (
    <section id="maktab-haqida" className="py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-wide text-blue-900 sm:text-sm">
            Maktab haqida batafsil ma'lumotlar
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-zinc-900 [text-wrap:balance] sm:text-4xl">
            Namangan shahridagi Suv xo‘jaligi maktabi — bilim va tarbiya maskani
          </h2>
        </div>

        {/* 4-column quantitative proof strip */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {SCHOOL_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 transition-colors hover:border-stone-300"
            >
              <div className="font-mono text-2xl font-semibold tracking-tight text-blue-950 tabular-nums sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-semibold text-zinc-900">{stat.label}</div>
              <div className="mt-1 text-xs text-zinc-500">{stat.note}</div>
            </div>
          ))}
        </div>

        {/* Asymmetric editorial narrative + 1-minute rotating featured image */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="space-y-5 text-base leading-relaxed text-zinc-700 max-w-prose">
              <p className="first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-5xl first-letter:font-semibold first-letter:leading-none first-letter:text-blue-950">
                Namangan shahridagi Suv xo‘jaligi maktabi ko‘p yillik ta’lim an’analariga ega bo‘lib, bugungi kunda zamonaviy ta’lim standartlari asosida jihozlangan, o‘quvchilarning har tomonlama kamol topishi uchun barcha sharoitlar yaratilgan ilm maskanidir.
              </p>
              <p>
                Maktabimizda o'quv jarayoni davlat ta'lim standartlari hamda ilg'or pedagogik metodikalar asosida tashkil etilgan. Har bir sinfda interaktiv doskalar, kompyuter texnikasi va laboratoriya uskunalari mavjud bo'lib, o'quvchilarning nazariy bilimlarni amaliyot bilan mustahkamlashiga alohida e'tibor qaratiladi.
              </p>
              <p>
                Ta'lim bilan bir qatorda, o'quvchilarda kitobxonlik madaniyatini yuksaltirish, ilmiy tadqiqotga qiziqish uyg'otish va sog'lom turmush tarzini qaror toptirish maktab jamoasining ustuvor maqsadi hisoblanadi.
              </p>
            </div>

            {/* Institutional metadata grid */}
            <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-stone-200 pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-zinc-500">Muassasa nomi</dt>
                <dd className="mt-1 text-sm font-semibold text-zinc-900">
                  Namangan shahridagi Suv xo‘jaligi maktabi
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Joylashuvi</dt>
                <dd className="mt-1 text-sm font-medium text-zinc-900">
                  Namangan shahri, Suv xo‘jaligi hududi
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Ta'lim bosqichlari</dt>
                <dd className="mt-1 text-sm font-medium text-zinc-900">
                  Boshlang'ich (1–4) va Yuqori (5–11) sinflar
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-zinc-500">Maktab nomeri</dt>
                <dd className="mt-1">
                  {isNomerUnlocked ? (
                    <button
                      type="button"
                      onClick={onNomerClick}
                      className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-blue-900 hover:underline tabular-nums"
                    >
                      <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{schoolPhones.reception}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={onNomerClick}
                      className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-1 text-xs font-semibold text-zinc-800 transition-colors hover:border-blue-900 hover:text-blue-900"
                    >
                      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Nomer</span>
                    </button>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          <figure className="lg:col-span-5 flex flex-col">
            <div className="relative flex-1 min-h-[280px] overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              {CAMPUS_GALLERY.map((item, idx) => (
                <div
                  key={item.image}
                  aria-hidden={idx !== featuredIdx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                    idx === featuredIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    fallbackTitle={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
            <figcaption className="mt-2.5 flex items-center justify-between gap-3 font-serif text-xs italic text-zinc-500">
              <span>{activeFeature.title} — {activeFeature.caption}.</span>
              <span className="font-sans not-italic text-[11px] text-zinc-400 shrink-0">
                {featuredIdx + 1}/{CAMPUS_GALLERY.length}
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Visual Campus Gallery */}
        <div className="mt-16 border-t border-stone-200 pt-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-blue-900 sm:text-sm">
              Maktabimiz suratlarda
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
              O'quv xonalari va zamonaviy sharoitlar
            </h3>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CAMPUS_GALLERY.map((item) => (
              <figure key={item.title} className="group flex flex-col">
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
                  <SafeImage
                    src={item.image}
                    alt={item.alt}
                    fallbackTitle={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="mt-3">
                  <div className="text-sm font-semibold text-zinc-900">{item.title}</div>
                  <div className="mt-1 text-xs leading-relaxed text-zinc-500">{item.caption}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Academic Directions */}
        <div className="mt-16 border-t border-stone-200 pt-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="font-serif text-2xl font-semibold tracking-tight text-zinc-900">
                Asosiy o'quv yo'nalishlari
              </h3>
              <p className="mt-1 text-sm text-zinc-600">
                O'quvchilarning qiziqishi va qobiliyatiga mos chuqurlashtirilgan fan bloklari.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {ACADEMIC_DIRECTIONS.map((item) => (
              <div
                key={item.index}
                className="rounded-xl border border-stone-200 bg-white p-6 transition-colors hover:border-stone-300"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm font-medium text-blue-900 tabular-nums">
                    {item.index}
                  </span>
                  <h4 className="text-lg font-semibold text-zinc-900">{item.title}</h4>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Infrastructure & Facilities */}
        <div className="mt-12 rounded-xl border border-stone-200 bg-white p-6 sm:p-8">
          <h3 className="font-serif text-xl font-semibold text-zinc-900">
            Maktab infratuzilmasi va sharoitlar
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SCHOOL_FACILITIES.map((facility) => (
              <div key={facility.title} className="border-t border-stone-200 pt-4">
                <h4 className="text-sm font-semibold text-zinc-900">{facility.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{facility.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
