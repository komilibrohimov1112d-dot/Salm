import { Lock, Mail, MapPin, Phone } from 'lucide-react';

interface FooterProps {
  onNomerClick: () => void;
  isNomerUnlocked: boolean;
  schoolPhones: {
    reception: string;
    director: string;
  };
}

export function Footer({ onNomerClick, isNomerUnlocked, schoolPhones }: FooterProps) {
  return (
    <footer id="aloqa" className="border-t border-stone-200 bg-[#f8f7f4] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-serif text-xl font-bold text-zinc-900">
              Namangan shahridagi Suv xo‘jaligi maktabi
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-600">
              Namangan shahridagi Suv xo‘jaligi maktabi — sifatli ta'lim, zamonaviy bilim va barkamol avlod tarbiyasi maskani.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3 text-sm text-zinc-700">
            <div className="font-semibold text-zinc-900">Aloqa ma'lumotlari</div>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-900" aria-hidden="true" />
              <span>Namangan shahri, Suv xo‘jaligi hududi</span>
            </div>

            <div className="flex items-center gap-2.5">
              {isNomerUnlocked ? (
                <>
                  <Phone className="h-4 w-4 shrink-0 text-blue-900" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={onNomerClick}
                    className="font-mono font-medium text-zinc-900 hover:text-blue-900 hover:underline tabular-nums"
                  >
                    {schoolPhones.reception}
                  </button>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 shrink-0 text-blue-900" aria-hidden="true" />
                  <button
                    type="button"
                    onClick={onNomerClick}
                    className="inline-flex items-center gap-1.5 rounded-md border border-stone-300 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-800 transition-colors hover:border-blue-900 hover:text-blue-900"
                  >
                    <span>Nomer</span>
                  </button>
                </>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-blue-900" aria-hidden="true" />
              <span>info@suvxojaligimaktab.uz</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <div className="font-semibold text-zinc-900">Bo'limlar</div>
            <ul className="space-y-2 text-zinc-600">
              <li>
                <a href="#maktab-haqida" className="hover:text-zinc-950 transition-colors">
                  Maktab haqida
                </a>
              </li>
              <li>
                <a href="#yangiliklar" className="hover:text-zinc-950 transition-colors">
                  Yangiliklar
                </a>
              </li>
              <li>
                <a href="#youtube" className="hover:text-zinc-950 transition-colors">
                  YouTube va Kitoblar
                </a>
              </li>
              <li>
                <a href="#raspisaniya" className="hover:text-zinc-950 transition-colors">
                  Raspisaniya
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-stone-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center">
          <span>© 2026 Namangan shahridagi Suv xo‘jaligi maktabi. Barcha huquqlar himoyalangan.</span>
          <span>Ish vaqti: Dushanba – Shanba, 08:00 – 17:30</span>
        </div>
      </div>
    </footer>
  );
}
