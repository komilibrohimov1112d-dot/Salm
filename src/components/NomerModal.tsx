import { Check, Phone, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

interface NomerModalProps {
  isOpen: boolean;
  phones: {
    reception: string;
    director: string;
  };
  onSavePhones: (next: { reception: string; director: string }) => Promise<boolean>;
  onClose: () => void;
}

export function NomerModal({
  isOpen,
  phones,
  onSavePhones,
  onClose,
}: NomerModalProps) {
  const [reception, setReception] = useState(phones.reception);
  const [director, setDirector] = useState(phones.director);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    setReception(phones.reception);
    setDirector(phones.director);
    setSavedNotice(false);
    setErrorMsg('');
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setErrorMsg('');
    const ok = await onSavePhones({
      reception: reception.trim() || phones.reception,
      director: director.trim() || phones.director,
    });
    setSaving(false);
    if (ok) {
      setSavedNotice(true);
    } else {
      setErrorMsg("Saqlashda xatolik yuz berdi. Qayta urinib ko'ring.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nomer-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-[#11192c] p-6 shadow-2xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="nomer-modal-title" className="font-serif text-xl font-semibold text-slate-100">
                Nomerni o‘zgartirish
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">
                Saqlangan raqam barcha telefonlarda avtomatik yangilanadi
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Yopish"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="reception-phone" className="block text-xs font-semibold text-slate-300">
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
              className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-700 bg-[#090e1a] px-3.5 font-mono text-sm text-slate-100 tabular-nums focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
            />
          </div>

          <div>
            <label htmlFor="director-phone" className="block text-xs font-semibold text-slate-300">
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
              className="mt-1.5 min-h-[42px] w-full rounded-lg border border-slate-700 bg-[#090e1a] px-3.5 font-mono text-sm text-slate-100 tabular-nums focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
            />
          </div>

          {savedNotice && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/60 px-3 py-2 text-xs font-medium text-emerald-300">
              <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Nomer barcha telefonlar uchun saqlandi va yangilandi.</span>
            </div>
          )}

          {errorMsg && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-950/60 px-3 py-2 text-xs font-medium text-rose-300">
              {errorMsg}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] rounded-lg border border-slate-700 bg-[#162038] px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800"
            >
              Yopish
            </button>
            <button
              type="submit"
              disabled={saving}
              className="min-h-[40px] rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-60"
            >
              {saving ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
