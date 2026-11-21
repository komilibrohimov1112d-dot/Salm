import { Eye, EyeOff, Lock, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

interface CodeGateModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function verifySecretCode(input: string): boolean {
  const normalized = input.trim().toLowerCase().replace(/\s+/g, ' ');
  return normalized === '71 maktab' || normalized === '71-maktab';
}

export function CodeGateModal({
  isOpen,
  title,
  description,
  onClose,
  onSuccess,
}: CodeGateModalProps) {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setShowCode(false);
      window.setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

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
    if (verifySecretCode(code)) {
      setError('');
      setCode('');
      onSuccess();
    } else {
      setError("Kod noto‘g‘ri. Qayta urinib ko‘ring.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="code-gate-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-xl sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-white">
              <Lock className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="code-gate-title" className="font-serif text-xl font-semibold text-zinc-900">
                {title}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Yopish"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-stone-200 text-zinc-500 transition-colors hover:bg-stone-100 hover:text-zinc-900 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="secret-access-code" className="block text-xs font-semibold text-zinc-700">
              Maxfiy kodni kiriting
            </label>
            <div className="relative mt-1.5">
              <input
                ref={inputRef}
                id="secret-access-code"
                type={showCode ? 'text' : 'password'}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (error) setError('');
                }}
                autoComplete="off"
                placeholder="Kodni kiriting..."
                className="min-h-[44px] w-full rounded-lg border border-stone-300 bg-[#f8f7f4] pl-3.5 pr-11 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-blue-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              />
              <button
                type="button"
                aria-label={showCode ? 'Kodni yashirish' : "Kodni ko'rsatish"}
                onClick={() => setShowCode((prev) => !prev)}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-zinc-500 hover:bg-stone-200/70 hover:text-zinc-900"
              >
                {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-2 text-xs font-medium text-red-700">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition-colors hover:bg-stone-100"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="min-h-[40px] rounded-lg bg-blue-900 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
            >
              Tasdiqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
