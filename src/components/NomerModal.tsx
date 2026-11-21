import { Check, Lock, Phone, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

interface NomerModalProps {
  isOpen: boolean;
  phones: {
    reception: string;
    director: string;
  };
  onSavePhones: (next: { reception: string; director: string }) => void;
  onLock: () => void;
  onClose: () => void;
}

export function NomerModal({
  isOpen,
  phones,
  onSavePhones,
  onLock,
  onClose,
}: NomerModalProps) {
  const [reception, setReception] = useState(phones.reception);
  const [director, setDirector] = useState(phones.director);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setReception(phones.reception);
    setDirector(phones.director);
    setSavedNotice(false);
  }, [phones, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSavePhones({
      reception: reception.trim() || phones.reception,
      director: director.trim() || phones.director,
    });
    setSavedNotice(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nomer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-900 text-white">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="nomer-modal-title" className="font-serif text-xl font-semibold text-zinc-900">
                Maktab nomerlari
              </h3>
              <p className="mt-0.5 text-xs text-zinc-500">
                Namangan shahridagi Suv xo‘jaligi maktabi
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Yopish"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-zinc-500 transition-colors hover:bg-stone-100 hover:text-zinc-900 shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="reception-phone" className="block text-xs font-semibold text-zinc-700">
              Qabulxona nomeri
            </label>
            <input
              id="reception-phone"
              type="text"
              value={reception}
              onChange={(e) => {
                setReception(e.target.value);
                setSavedNotice(false);
              }}
              className="mt-1.5 min-h-[42px] w-full rounded-lg border border-stone-300 bg-[#f8f7f4] px-3.5 font-mono text-sm text-zinc-900 tabular-nums focus:border-blue-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20"
            />
          </div>

          <div>
            <label htmlFor="director-phone" className="block text-xs font-semibold text-zinc-700">
              Ma'muriyat / Navbatchi nomeri
            </label>
            <input
              id="director-phone"
              type="text"
              value={director}
              onChange={(e) => {
                setDirector(e.target.value);
                setSavedNotice(false);
              }}
              className="mt-1.5 min-h-[42px] w-full rounded-lg border border-stone-300 bg-[#f8f7f4] px-3.5 font-mono text-sm text-zinc-900 tabular-nums focus:border-blue-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20"
            />
          </div>

          {savedNotice && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
              <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Nomerlar saqlandi.</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                onLock();
                onClose();
              }}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-stone-100"
            >
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Qulflash</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="min-h-[40px] rounded-lg bg-blue-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-950"
              >
                Saqlash
              </button>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[40px] rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-stone-100"
              >
                Yopish
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
