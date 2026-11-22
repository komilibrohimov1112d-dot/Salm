import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Layers,
  RotateCcw,
  Shuffle,
  Sparkles,
  XCircle,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { GradeLevel, GradeTextbook, TOPQIR_GRADES, TopqirQuestion } from '../data/topqirData';

interface TopqirSectionProps {
  isSubjectsOpen: boolean;
  onToggleSubjects: (open?: boolean) => void;
}

const OPTION_LETTERS = ['A', 'B', 'C'] as const;

const OPTION_BADGE_STYLES = [
  'border-blue-400/60 bg-blue-600/20 text-blue-300 group-hover:border-blue-400 group-hover:bg-blue-600 group-hover:text-white',
  'border-amber-400/60 bg-amber-500/20 text-amber-300 group-hover:border-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950',
  'border-violet-400/60 bg-violet-600/20 text-violet-300 group-hover:border-violet-400 group-hover:bg-violet-600 group-hover:text-white',
] as const;

const OPTION_ROW_HOVER = [
  'hover:border-blue-400/70 hover:bg-blue-950/35',
  'hover:border-amber-400/70 hover:bg-amber-950/30',
  'hover:border-violet-400/70 hover:bg-violet-950/35',
] as const;

function shuffleQuestionOptions(q: TopqirQuestion): TopqirQuestion {
  const indexed = q.options.map((text, idx) => ({
    text,
    isCorrect: idx === q.correctIndex,
  }));
  for (let i = indexed.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
  }
  const nextCorrect = indexed.findIndex((item) => item.isCorrect) as 0 | 1 | 2;
  return {
    ...q,
    options: [indexed[0].text, indexed[1].text, indexed[2].text],
    correctIndex: nextCorrect,
  };
}

function shuffleQuestions(questions: TopqirQuestion[]): TopqirQuestion[] {
  const copy = questions.map(shuffleQuestionOptions);
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function TopqirSection({ isSubjectsOpen, onToggleSubjects }: TopqirSectionProps) {
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [activeBookTitle, setActiveBookTitle] = useState<string>('');
  const [activeSubjectLabel, setActiveSubjectLabel] = useState<string>('');
  const [quizQuestions, setQuizQuestions] = useState<TopqirQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const allSchoolQuestions = useMemo(
    () => TOPQIR_GRADES.flatMap((grade) => grade.books.flatMap((book) => book.questions)),
    []
  );

  const resetQuizOnly = () => {
    setQuizQuestions([]);
    setActiveBookTitle('');
    setActiveSubjectLabel('');
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  const handleSelectGrade = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    resetQuizOnly();
  };

  const startBookQuiz = (book: GradeTextbook) => {
    setActiveBookTitle(book.bookTitle);
    setActiveSubjectLabel(book.subject);
    setQuizQuestions(shuffleQuestions(book.questions));
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  const startAllGradeBooksQuiz = (grade: GradeLevel) => {
    const allQuestions = grade.books.flatMap((b) => b.questions);
    setActiveBookTitle(`${grade.label} — Barcha darsliklardan umumiy test`);
    setActiveSubjectLabel(`${grade.books.length} ta kitob asosida`);
    setQuizQuestions(shuffleQuestions(allQuestions));
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
  };

  const startFull100Quiz = () => {
    setSelectedGrade(null);
    setActiveBookTitle(`100 talik katta test — Barcha sinf kitoblaridan`);
    setActiveSubjectLabel(`1–11-sinflar · ${allSchoolQuestions.length} ta savol`);
    setQuizQuestions(shuffleQuestions(allSchoolQuestions));
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setFinished(false);
    onToggleSubjects(true);
  };

  const currentQuestion = quizQuestions[currentIdx];

  const handleSelectOption = (optionIndex: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(optionIndex);
    if (optionIndex === currentQuestion.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
  };

  const percentage = useMemo(() => {
    if (!quizQuestions.length) return 0;
    return Math.round((score / quizQuestions.length) * 100);
  }, [score, quizQuestions.length]);

  const progressWidth = useMemo(() => {
    if (!quizQuestions.length) return 0;
    return Math.round(((currentIdx + (selectedOption !== null ? 1 : 0)) / quizQuestions.length) * 100);
  }, [currentIdx, selectedOption, quizQuestions.length]);

  return (
    <section id="topqir" className="border-t border-slate-800 bg-[#0d1425] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Topqir Header */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-wide text-amber-400 sm:text-sm">
              Sinflar kesimida · Jami {allSchoolQuestions.length} ta darslik A, B, C test
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
              Topqir — Sinflar va kitoblar testi
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">
              1-sinfdan 11-sinfgacha istalgan sinf kitobini tanlang yoki barcha darsliklardan tuzilgan {allSchoolQuestions.length} ta A, B, C testni birdaniga yeching.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={startFull100Quiz}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-blue-500 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              <Layers className="h-4 w-4" aria-hidden="true" />
              <span>{allSchoolQuestions.length} ta test</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (selectedGrade || quizQuestions.length > 0) {
                  setSelectedGrade(null);
                  resetQuizOnly();
                  onToggleSubjects(true);
                } else {
                  onToggleSubjects(!isSubjectsOpen);
                }
              }}
              aria-expanded={isSubjectsOpen}
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              <span>Topqir (1–11-sinflar)</span>
            </button>
          </div>
        </div>

        {/* Step 1: Grade Selector Grid (1-sinf to 11-sinf) */}
        {isSubjectsOpen && !selectedGrade && quizQuestions.length === 0 && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {TOPQIR_GRADES.map((gradeItem) => (
              <button
                key={gradeItem.grade}
                type="button"
                onClick={() => handleSelectGrade(gradeItem)}
                className={`group flex flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${gradeItem.borderClass}`}
              >
                <div>
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl font-mono text-base font-bold tabular-nums ${gradeItem.badgeClass}`}
                  >
                    {gradeItem.grade}
                  </span>
                  <h3 className="mt-3.5 font-serif text-xl font-semibold text-white">
                    {gradeItem.label}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300">{gradeItem.stage}</p>
                </div>

                <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-mono tabular-nums">
                    {gradeItem.books.length} ta kitob
                  </span>
                  <span className={`font-semibold group-hover:underline ${gradeItem.textClass}`}>
                    Kirish →
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Selected Grade's School Textbooks */}
        {selectedGrade && quizQuestions.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-[#11192c] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGrade(null);
                    onToggleSubjects(true);
                  }}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-700 bg-[#162038] px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Sinflar</span>
                </button>
                <div>
                  <div className="flex items-center gap-2 text-xs text-amber-400">
                    <GraduationCap className="h-4 w-4" aria-hidden="true" />
                    <span>{selectedGrade.stage}</span>
                  </div>
                  <h3 className="mt-0.5 font-serif text-2xl font-semibold text-white">
                    {selectedGrade.label} darslik kitoblari
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => startAllGradeBooksQuiz(selectedGrade)}
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 whitespace-nowrap shrink-0"
              >
                <Layers className="h-4 w-4" aria-hidden="true" />
                <span>{selectedGrade.label} barcha kitoblaridan test</span>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {selectedGrade.books.map((book, idx) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => startBookQuiz(book)}
                  className={`group flex flex-col justify-between rounded-xl border p-6 text-left transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${book.cardClass}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                      <span className={book.accentClass}>{book.subject}</span>
                      <span className={`font-mono tabular-nums ${book.accentClass}`}>
                        0{idx + 1}
                      </span>
                    </div>
                    <div className="mt-3 flex items-start gap-3">
                      <BookOpen className={`mt-0.5 h-5 w-5 shrink-0 ${book.accentClass}`} aria-hidden="true" />
                      <h4 className="font-serif text-xl font-semibold leading-snug text-white">
                        {book.bookTitle}
                      </h4>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-3.5 text-xs font-medium text-slate-300">
                    <span className="font-mono tabular-nums">
                      {book.questions.length} ta A / B / C test
                    </span>
                    <span className={`font-semibold group-hover:underline ${book.accentClass}`}>
                      Testni boshlash →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Active Textbook A / B / C Quiz */}
        {quizQuestions.length > 0 && (
          <div className="mt-8 rounded-2xl border border-slate-800 bg-[#11192c] p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    resetQuizOnly();
                    onToggleSubjects(true);
                  }}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-700 bg-[#162038] px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{selectedGrade ? `${selectedGrade.label} kitoblari` : 'Barcha sinflar'}</span>
                </button>
                <div>
                  <div className="text-xs font-medium text-amber-400">
                    {selectedGrade ? `${selectedGrade.label} · ${activeSubjectLabel}` : activeSubjectLabel}
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-white sm:text-2xl">
                    {activeBookTitle}
                  </h3>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setQuizQuestions(shuffleQuestions(quizQuestions));
                    setCurrentIdx(0);
                    setSelectedOption(null);
                    setScore(0);
                    setFinished(false);
                  }}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-700 bg-[#162038] px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-slate-800 whitespace-nowrap shrink-0"
                >
                  <Shuffle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Aralashtirish</span>
                </button>
                {!finished && (
                  <button
                    type="button"
                    onClick={() => setFinished(true)}
                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-slate-700 bg-[#162038] px-3 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white whitespace-nowrap shrink-0"
                  >
                    <span>Testni yakunlash</span>
                  </button>
                )}
                <div className="font-mono text-xs font-semibold text-amber-400 tabular-nums">
                  To‘g‘ri: {score} / {quizQuestions.length}
                </div>
              </div>
            </div>

            {/* Clean progress bar */}
            {!finished && (
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[#090e1a]">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-300"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>
            )}

            {!finished && currentQuestion ? (
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono tabular-nums">
                    Savol {currentIdx + 1} / {quizQuestions.length}
                  </span>
                  <span>Kitob asosidagi A, B, C test</span>
                </div>

                <h4 className="mt-3 font-serif text-xl font-semibold leading-snug text-slate-100 sm:text-2xl">
                  {currentQuestion.question}
                </h4>

                <div className="mt-6 grid grid-cols-1 gap-3.5">
                  {currentQuestion.options.map((optText, idx) => {
                    const letter = OPTION_LETTERS[idx];
                    const isPicked = selectedOption === idx;
                    const isCorrect = idx === currentQuestion.correctIndex;
                    const answered = selectedOption !== null;

                    let rowStyle = `border-slate-700/90 bg-[#162038] text-slate-100 ${OPTION_ROW_HOVER[idx]}`;
                    let badgeStyle: string = OPTION_BADGE_STYLES[idx];

                    if (answered) {
                      if (isCorrect) {
                        rowStyle =
                          'border-emerald-400/80 bg-emerald-950/75 text-emerald-50 shadow-sm';
                        badgeStyle = 'border-emerald-400 bg-emerald-500 text-slate-950';
                      } else if (isPicked) {
                        rowStyle =
                          'border-rose-400/80 bg-rose-950/75 text-rose-100';
                        badgeStyle = 'border-rose-400 bg-rose-500 text-white';
                      } else {
                        rowStyle =
                          'border-slate-800/80 bg-[#0d1425] text-slate-500';
                        badgeStyle = 'border-slate-700 bg-slate-800/60 text-slate-500';
                      }
                    }

                    return (
                      <button
                        key={letter}
                        type="button"
                        disabled={answered}
                        onClick={() => handleSelectOption(idx)}
                        className={`group flex min-h-[60px] w-full items-center justify-between gap-4 rounded-xl border px-4 py-3 text-left transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${rowStyle}`}
                      >
                        <div className="flex items-center gap-4">
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-mono text-base font-bold tracking-tight transition-colors duration-150 ${badgeStyle}`}
                          >
                            {letter}
                          </span>
                          <span className="text-sm font-medium leading-snug sm:text-base">
                            {optText}
                          </span>
                        </div>

                        {!answered && (
                          <span className="hidden text-xs font-medium text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 sm:inline shrink-0">
                            Tanlash
                          </span>
                        )}
                        {answered && isCorrect && (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                        )}
                        {answered && isPicked && !isCorrect && (
                          <XCircle className="h-5 w-5 shrink-0 text-rose-400" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <div className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-slate-700 bg-[#0d1425] p-4 sm:flex-row sm:items-center">
                    <p className="text-sm text-slate-300">
                      <span className="font-semibold text-amber-400">Izoh: </span>
                      {currentQuestion.explanation}
                    </p>
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="min-h-[42px] rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-500 whitespace-nowrap shrink-0"
                    >
                      {currentIdx + 1 < quizQuestions.length ? 'Keyingi savol →' : 'Natijani ko‘rish'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-slate-800 bg-[#0d1425] p-6 text-center sm:p-10">
                <Award className="mx-auto h-10 w-10 text-amber-400" aria-hidden="true" />
                <h4 className="mt-3 font-serif text-2xl font-semibold text-white">
                  {activeBookTitle} — test yakunlandi
                </h4>
                <p className="mt-2 font-mono text-3xl font-bold text-amber-400 tabular-nums">
                  {score} / {quizQuestions.length} ({percentage}%)
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {percentage >= 80
                    ? 'Ajoyib natija! Darslikni juda yaxshi o‘zlashtiribsiz.'
                    : percentage >= 60
                      ? 'Yaxshi natija! Kitobni yana bir bor takrorlab ko‘ring.'
                      : 'Yaxshi urinish! Kitobdagi mavzularni ko‘rib chiqib qayta yeching.'}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setQuizQuestions(shuffleQuestions(quizQuestions));
                      setCurrentIdx(0);
                      setSelectedOption(null);
                      setScore(0);
                      setFinished(false);
                    }}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    <span>Qayta yechish</span>
                  </button>
                  {selectedGrade && (
                    <button
                      type="button"
                      onClick={resetQuizOnly}
                      className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-700 bg-[#162038] px-5 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
                    >
                      <span>Boshqa kitobni tanlash</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedGrade(null);
                      resetQuizOnly();
                      onToggleSubjects(true);
                    }}
                    className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-slate-700 bg-[#162038] px-5 py-2 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
                  >
                    <span>Boshqa sinfni tanlash</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
