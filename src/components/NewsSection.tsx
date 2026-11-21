import { ArrowRight, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NEWS_ARTICLES, NewsArticle } from '../data/schoolData';
import { SafeImage } from './SafeImage';

type CategoryFilter = 'Barchasi' | 'Tadbirlar' | 'Yutuqlar' | "E'lonlar";

const CATEGORIES: CategoryFilter[] = ['Barchasi', 'Tadbirlar', 'Yutuqlar', "E'lonlar"];

export function NewsSection() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Barchasi');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const filteredArticles =
    selectedCategory === 'Barchasi'
      ? NEWS_ARTICLES
      : NEWS_ARTICLES.filter((item) => item.category === selectedCategory);

  const leadArticle = filteredArticles[0];
  const secondaryArticles = filteredArticles.slice(1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveArticle(null);
      }
    };
    if (activeArticle) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle]);

  return (
    <section id="yangiliklar" className="border-t border-stone-200 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header & Interactive Filter Control */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium tracking-wide text-blue-900 sm:text-sm">
              Maktab hayotidan so'nggi xabarlar
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Yangiliklar bo'limi
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Yangiliklar toifalari"
            className="inline-flex flex-wrap items-center gap-1 rounded-lg bg-stone-100 p-1"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 ${
                    isActive
                      ? 'bg-white text-zinc-950 shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Lead Story */}
        {leadArticle && (
          <article className="mt-10 grid grid-cols-1 items-stretch overflow-hidden rounded-xl border border-stone-200 bg-[#f8f7f4] lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SafeImage
                src={leadArticle.image}
                alt={leadArticle.imageAlt}
                fallbackTitle={leadArticle.title}
                className="h-full min-h-[240px] w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <span className="font-semibold text-blue-900">{leadArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadArticle.date}</span>
                  <span aria-hidden="true">·</span>
                  <span>{leadArticle.readTime}</span>
                </div>
                <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-zinc-900 [text-wrap:balance] sm:text-3xl">
                  {leadArticle.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">
                  {leadArticle.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/80">
                <button
                  type="button"
                  onClick={() => setActiveArticle(leadArticle)}
                  className="inline-flex min-h-[40px] items-center gap-2 text-sm font-semibold text-blue-900 transition-colors hover:text-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 rounded"
                >
                  <span>Batafsil o'qish</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        )}

        {/* Secondary News Grid */}
        {secondaryArticles.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {secondaryArticles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white transition-colors hover:border-stone-300"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <SafeImage
                    src={article.image}
                    alt={article.imageAlt}
                    fallbackTitle={article.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                      <span className="font-semibold text-blue-900">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="mt-2.5 font-serif text-lg font-semibold leading-snug text-zinc-900">
                      {article.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(article)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-sm font-semibold text-zinc-900 transition-colors hover:text-blue-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 rounded"
                    >
                      <span>Batafsil o'qish</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-xs"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-stone-200 bg-white p-6 shadow-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span className="font-semibold text-blue-900">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <button
                type="button"
                aria-label="Oynani yopish"
                onClick={() => setActiveArticle(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-zinc-600 transition-colors hover:bg-stone-100 hover:text-zinc-900 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <h3
              id="article-modal-title"
              className="mt-4 font-serif text-2xl font-semibold leading-snug text-zinc-900 sm:text-3xl"
            >
              {activeArticle.title}
            </h3>

            <div className="mt-5 aspect-[16/9] overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
              <SafeImage
                src={activeArticle.image}
                alt={activeArticle.imageAlt}
                fallbackTitle={activeArticle.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-zinc-700">
              {activeArticle.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="mt-8 flex justify-end border-t border-stone-200 pt-4">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="min-h-[40px] rounded-lg bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                Yopish
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
