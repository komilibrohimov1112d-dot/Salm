import { BookOpen, ExternalLink, Play, Search, Youtube } from 'lucide-react';
import { FormEvent, RefObject, useMemo, useState } from 'react';
import { BOOK_YOUTUBE_CATALOG, BookYouTubeEntry, SCHOOL_IMAGES } from '../data/schoolData';
import { SafeImage } from './SafeImage';

interface YouTubeSectionProps {
  inputRef: RefObject<HTMLInputElement | null>;
}

function buildYouTubeSearchUrl(query: string): string {
  const clean = query.trim() || 'kitob';
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(clean)}`;
}

export function YouTubeSection({ inputRef }: YouTubeSectionProps) {
  const [searchInput, setSearchInput] = useState('kitob');
  const [activeQuery, setActiveQuery] = useState('kitob');

  const activeBook: BookYouTubeEntry = useMemo(() => {
    const normalized = activeQuery.trim().toLowerCase();
    const matched = BOOK_YOUTUBE_CATALOG.find(
      (item) =>
        item.keyword === normalized ||
        item.title.toLowerCase().includes(normalized) ||
        item.author.toLowerCase().includes(normalized) ||
        (normalized === 'kitob' && item.id === 'kitob')
    );

    if (matched) {
      return matched;
    }

    const cleanTopic = activeQuery.trim() || 'kitob';
    return {
      id: `custom-${cleanTopic}`,
      keyword: cleanTopic.toLowerCase(),
      title: `«${cleanTopic}» — YouTube qidiruvi va ma'lumotlar`,
      author: "Siz yozgan so'rov bo'yicha natijalar",
      genre: "Erkin YouTube qidiruvi",
      gradeLevel: 'Barcha mavzular',
      summary: `Siz kiritgan «${cleanTopic}» so'rovi bo'yicha to'g'ridan-to'g'ri YouTube platformasiga kirib video darslar, sharhlar va qo'shimcha ma'lumotlarni ko'rishingiz mumkin. Pastdagi tugmalarni bosing — YouTube aynan siz yozgan mavzu bilan ochiladi.`,
      highlights: [
        `YouTube’da «${cleanTopic}» so'rovi bo'yicha barcha videolar va darsliklar`,
        `Video sharhlar, ma'ruzalar va ko'rgazmali materiallarni bir zumda topish`,
        `Istalgan boshqa so'zni yozib qayta YouTube’ga kirish imkoniyati`,
      ],
      youtubeQuery: cleanTopic,
      videos: [
        {
          title: `«${cleanTopic}» — YouTube'da asosiy videolar`,
          channel: 'YouTube Qidiruv',
          duration: 'To‘g‘ridan-to‘g‘ri ochish',
          query: cleanTopic,
        },
        {
          title: `«${cleanTopic}» haqida batafsil ma'lumot va tahlil`,
          channel: 'YouTube Video Darslar',
          duration: 'Video sharh',
          query: `${cleanTopic} haqida malumot`,
        },
        {
          title: `«${cleanTopic}» — o‘quv va audiomateriallar`,
          channel: 'YouTube Ta’lim',
          duration: 'To‘plam',
          query: `${cleanTopic} uzbek tilida`,
        },
      ],
    };
  }, [activeQuery]);

  // Native GET form submits straight to YouTube in a new tab while also syncing in-page results
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    const trimmed = searchInput.trim();
    if (!trimmed) {
      e.preventDefault();
      setSearchInput('kitob');
      setActiveQuery('kitob');
      inputRef.current?.focus();
      return;
    }
    setActiveQuery(trimmed);
  };

  const handleQuickTopic = (keyword: string, displayLabel: string) => {
    setSearchInput(displayLabel);
    setActiveQuery(keyword);
  };

  const liveInputYouTubeUrl = buildYouTubeSearchUrl(searchInput.trim() || activeBook.youtubeQuery);

  return (
    <section id="youtube" className="border-t border-stone-200 bg-[#f8f7f4] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Banner Card with Beautiful Books Photograph */}
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-7 lg:p-10">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-700 sm:text-sm">
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  <span>YouTube qidiruv va kitoblar portali</span>
                </div>
                <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-zinc-900 [text-wrap:balance] sm:text-4xl">
                  YouTube — Nima yozsangiz ham YouTube’ga kirib chiqarib beradi
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                  Qidiruv qatoriga «kitob» yoki istalgan boshqa mavzuni yozib «YouTube’da ochish» tugmasini bosing — sahifa sizni darhol YouTube’ga olib kiradi va quyida mavzu bo‘yicha ma’lumotlarni ko‘rsatadi.
                </p>
              </div>

              {/* Native GET form directly targeting YouTube results in a new tab */}
              <form
                action="https://www.youtube.com/results"
                method="GET"
                target="_blank"
                rel="noopener noreferrer"
                onSubmit={handleFormSubmit}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Search
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
                    aria-hidden="true"
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    name="search_query"
                    value={searchInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchInput(val);
                      if (val.trim()) {
                        setActiveQuery(val);
                      }
                    }}
                    aria-label="YouTube'dan qidirish uchun istalgan so'z yoki kitob nomini yozing"
                    placeholder="Istalgan so'z yozing (masalan: kitob, fizika, futbol)..."
                    className="min-h-[46px] w-full rounded-lg border border-stone-300 bg-[#f8f7f4] pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-red-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-600/20"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-700 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                >
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                  <span>YouTube’da ochish</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </form>

              {/* Quick-select topic chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium text-zinc-500">Tezkor tanlov:</span>
                {BOOK_YOUTUBE_CATALOG.map((entry) => {
                  const isSelected = activeBook.id === entry.id;
                  const label =
                    entry.id === 'kitob'
                      ? 'Kitob'
                      : entry.id === 'otkan-kunlar'
                        ? "O'tkan kunlar"
                        : entry.id === 'alisher-navoiy'
                          ? 'Alisher Navoiy'
                          : entry.id === 'sariq-devni-minib'
                            ? 'Sariq devni minib'
                            : entry.id === 'matematika'
                              ? 'Matematika'
                              : 'Fizika';

                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => handleQuickTopic(entry.keyword, label)}
                      className={`min-h-[36px] rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 ${
                        isSelected
                          ? 'bg-blue-900 text-white'
                          : 'bg-stone-100 text-zinc-700 hover:bg-stone-200 hover:text-zinc-950'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Visual Showcase Image */}
            <div className="relative min-h-[240px] border-t border-stone-200 bg-stone-100 lg:col-span-5 lg:border-t-0 lg:border-l">
              <SafeImage
                src={SCHOOL_IMAGES.booksShowcase}
                alt="Kitoblar, daftar va o'qish chirog'i tasvirlangan surat"
                fallbackTitle="71-Maktab Kitoblar Portali"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-zinc-950/65 via-transparent to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <p className="font-serif text-lg font-medium text-white">
                  Mutolaa va video ta'lim bir joyda
                </p>
                <p className="mt-1 text-xs text-stone-200">
                  Har qanday mavzuni yozing va YouTube orqali o‘rganing
                </p>
              </div>
            </div>
          </div>

          {/* Active Topic / Book Details + YouTube Video Results */}
          <div className="grid grid-cols-1 gap-8 border-t border-stone-200 bg-white p-6 sm:p-8 lg:grid-cols-12 lg:p-10">
            {/* Book / Topic Information Column */}
            <div className="lg:col-span-6">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <BookOpen className="h-4 w-4 text-blue-900" aria-hidden="true" />
                <span className="font-semibold text-blue-900">{activeBook.genre}</span>
                <span aria-hidden="true">·</span>
                <span>{activeBook.gradeLevel}</span>
              </div>

              <h3 className="mt-2.5 font-serif text-2xl font-semibold text-zinc-900">
                {activeBook.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-zinc-500">{activeBook.author}</p>

              <p className="mt-4 text-sm leading-relaxed text-zinc-700 sm:text-base">
                {activeBook.summary}
              </p>

              <ul className="mt-5 space-y-2.5 border-t border-stone-100 pt-4 text-sm text-zinc-700">
                {activeBook.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-0.5 font-mono text-xs font-semibold text-blue-900 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={liveInputYouTubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                >
                  <Youtube className="h-4 w-4 text-red-400" aria-hidden="true" />
                  <span>«{searchInput.trim() || 'kitob'}» bo‘yicha YouTube’ga kirish</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* YouTube Video Results Column */}
            <div className="lg:col-span-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-zinc-900">
                  YouTube’dagi natijalar va video darslar
                </h4>
                <span className="text-xs text-zinc-500">Bosib YouTube’da oching</span>
              </div>

              <div className="mt-4 space-y-3">
                {activeBook.videos.map((video) => {
                  const videoUrl = buildYouTubeSearchUrl(video.query);
                  return (
                    <a
                      key={video.title}
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 rounded-xl border border-stone-200 bg-[#f8f7f4] p-4 transition-colors duration-150 hover:border-red-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-600 text-white transition-transform duration-150 group-hover:scale-105">
                          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-zinc-900 group-hover:text-red-700">
                            {video.title}
                          </div>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                            <span>{video.channel}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{video.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 whitespace-nowrap shrink-0">
                        <span className="hidden sm:inline">YouTube</span>
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
