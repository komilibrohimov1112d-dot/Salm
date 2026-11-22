import { Eye, EyeOff, Lock, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

interface CodeGateModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onVerify: (code: string) => Promise<boolean> | boolean;
  onClose: () => void;
  onSuccess: (verifiedCode: string) => void;
}

export function verifyPhoneCode(input: string): boolean {
  return input.trim() === '5244';
}

export function CodeGateModal({
  isOpen,
  title,
  description,
  onVerify,
  onClose,
  onSuccess,
}: CodeGateModalProps) {
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setError('');
      setShowCode(false);
      setChecking(false);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (checking) return;
    setChecking(true);
    try {
      const ok = await onVerify(code);
      if (ok) {
        const verified = code.trim();
        setError('');
        setCode('');
        onSuccess(verified);
      } else {
        setError("Kod noto‘g‘ri. Qayta urinib ko‘ring.");
      }
    } finally {
      setChecking(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="code-gate-title"
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
              <Lock className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 id="code-gate-title" className="font-serif text-xl font-semibold text-slate-100">
                {title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-400">{description}</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Yopish"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="secret-access-code" className="block text-xs font-semibold text-slate-300">
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
                className="min-h-[44px] w-full rounded-lg border border-slate-700 bg-[#090e1a] pl-3.5 pr-11 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
              />
              <button
                type="button"
                aria-label={showCode ? 'Kodni yashirish' : "Kodni ko'rsatish"}
                onClick={() => setShowCode((prev) => !prev)}
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              >
                {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {error && (
              <p role="alert" className="mt-2 text-xs font-medium text-rose-400">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] rounded-lg border border-slate-700 bg-[#162038] px-4 py-2 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              disabled={checking}
              className="min-h-[40px] rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              {checking ? 'Tekshirilmoqda...' : 'Tasdiqlash'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
