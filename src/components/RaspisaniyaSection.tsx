import { Check, Lock, Pencil, Printer, Trash2, Unlock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RASPISANIYA_DAYS, RASPISANIYA_PERIODS } from '../data/schoolData';
import { CodeGateModal } from './CodeGateModal';

type ScheduleMap = Record<string, string>;

const STORAGE_KEY = 'namangan_suv_xojaligi_raspisaniya_v1';

function cellKey(period: number, day: string): string {
  return `${period}-${day}`;
}

export function RaspisaniyaSection() {
  const [schedule, setSchedule] = useState<ScheduleMap>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as ScheduleMap;
      }
    } catch {
      // Ignore storage read errors
    }
    return {};
  });

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [codeModalOpen, setCodeModalOpen] = useState(false);
  const [pendingCell, setPendingCell] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [draftValue, setDraftValue] = useState('');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(schedule));
    } catch {
      // Ignore storage write errors
    }
  }, [schedule]);

  const handleCellClick = (key: string) => {
    if (!isUnlocked) {
      setPendingCell(key);
      setCodeModalOpen(true);
      return;
    }
    setEditingCell(key);
    setDraftValue(schedule[key] ?? '');
  };

  const handleUnlockSuccess = () => {
    setIsUnlocked(true);
    setCodeModalOpen(false);
    if (pendingCell) {
      setEditingCell(pendingCell);
      setDraftValue(schedule[pendingCell] ?? '');
      setPendingCell(null);
    }
  };

  const saveCell = (key: string) => {
    const trimmed = draftValue.trim();
    setSchedule((prev) => {
      const next = { ...prev };
      if (trimmed) {
        next[key] = trimmed;
      } else {
        delete next[key];
      }
      return next;
    });
    setEditingCell(null);
    setDraftValue('');
  };

  const handleClearAll = () => {
    if (!isUnlocked) {
      setCodeModalOpen(true);
      return;
    }
    setSchedule({});
    setEditingCell(null);
    setDraftValue('');
  };

  return (
    <section id="raspisaniya" className="border-t border-stone-200 bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium tracking-wide text-blue-900 sm:text-sm">
              Haftalik o'quv jadvali (Dushanba – Shanba)
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Raspisaniya
            </h2>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2.5">
            {isUnlocked ? (
              <>
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-stone-100 whitespace-nowrap shrink-0"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Tozalash</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsUnlocked(false);
                    setEditingCell(null);
                  }}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 whitespace-nowrap shrink-0"
                >
                  <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Qulflash</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setPendingCell(null);
                  setCodeModalOpen(true);
                }}
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-blue-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-950 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
              >
                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Fan yozish</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 transition-colors hover:bg-stone-100 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              <span>Jadvalni chop etish</span>
            </button>
          </div>
        </div>

        {isUnlocked && (
          <div className="no-print mt-4 flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50/70 px-4 py-2.5 text-xs font-medium text-blue-950">
            <Unlock className="h-4 w-4 shrink-0 text-blue-900" aria-hidden="true" />
            <span>
              Tahrirlash ochiq: istalgan katakchani bosib xohlagan fanningizni yozishingiz mumkin.
            </span>
          </div>
        )}

        {/* Timetable from Dushanba to Shanba — completely empty initially, clickable to unlock & write any subject */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-stone-300 bg-white">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b border-stone-300 bg-[#f8f7f4]">
                <th
                  scope="col"
                  className="w-16 border-r border-stone-300 px-3 py-3.5 text-center font-mono text-xs font-semibold text-zinc-700"
                >
                  №
                </th>
                {RASPISANIYA_DAYS.map((day, idx) => (
                  <th
                    key={day}
                    scope="col"
                    className={`w-[15%] px-4 py-3.5 text-sm font-semibold text-zinc-900 ${
                      idx < RASPISANIYA_DAYS.length - 1 ? 'border-r border-stone-300' : ''
                    }`}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RASPISANIYA_PERIODS.map((period, rowIdx) => (
                <tr
                  key={period}
                  className={rowIdx < RASPISANIYA_PERIODS.length - 1 ? 'border-b border-stone-200' : ''}
                >
                  <th
                    scope="row"
                    className="h-14 border-r border-stone-300 bg-[#f8f7f4]/60 px-3 py-3 text-center font-mono text-xs font-medium text-zinc-600 tabular-nums"
                  >
                    {period}
                  </th>
                  {RASPISANIYA_DAYS.map((day, colIdx) => {
                    const key = cellKey(period, day);
                    const value = schedule[key] ?? '';
                    const isEditing = editingCell === key;

                    return (
                      <td
                        key={key}
                        onClick={() => {
                          if (!isEditing) handleCellClick(key);
                        }}
                        className={`h-14 cursor-pointer p-1.5 align-middle transition-colors hover:bg-stone-50 ${
                          colIdx < RASPISANIYA_DAYS.length - 1 ? 'border-r border-stone-200' : ''
                        }`}
                      >
                        {isEditing ? (
                          <div
                            className="flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="text"
                              autoFocus
                              value={draftValue}
                              onChange={(e) => setDraftValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  saveCell(key);
                                } else if (e.key === 'Escape') {
                                  setEditingCell(null);
                                }
                              }}
                              aria-label={`${day}, ${period}-dars fani`}
                              placeholder="Fan nomi..."
                              className="h-10 w-full rounded-md border border-blue-900 bg-white px-2.5 text-xs font-medium text-zinc-900 focus:outline-none"
                            />
                            <button
                              type="button"
                              aria-label="Saqlash"
                              onClick={() => saveCell(key)}
                              className="inline-flex h-10 w-9 shrink-0 items-center justify-center rounded-md bg-blue-900 text-white hover:bg-blue-950"
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCellClick(key);
                            }}
                            aria-label={`${day}, ${period}-dars${value ? `: ${value}` : ''}`}
                            className="flex h-11 w-full items-center rounded-md px-2.5 text-left text-sm font-medium text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
                          >
                            {value}
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CodeGateModal
        isOpen={codeModalOpen}
        title="Raspisaniya himoyasi"
        description="Dars jadvaliga fan kiritish uchun maxfiy kodni kiriting."
        onClose={() => {
          setCodeModalOpen(false);
          setPendingCell(null);
        }}
        onSuccess={handleUnlockSuccess}
      />
    </section>
  );
}
