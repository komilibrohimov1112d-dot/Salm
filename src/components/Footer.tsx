import { Mail, MapPin, Pencil, Phone } from 'lucide-react';

interface FooterProps {
  onNomerClick: () => void;
  schoolPhones: {
    reception: string;
    director: string;
  };
}

export function Footer({ onNomerClick, schoolPhones }: FooterProps) {
  return (
    <footer id="aloqa" className="border-t border-slate-800 bg-[#090e1a] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-serif text-xl font-bold text-slate-100">
              71-Maktab · Namangan shahridagi Suv xo‘jaligi maktabi
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
              Namangan shahridagi Suv xo‘jaligi maktabi — sifatli ta'lim, zamonaviy bilim va barkamol avlod tarbiyasi maskani.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3 text-sm text-slate-300">
            <div className="font-semibold text-slate-100">Aloqa ma'lumotlari</div>
            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
              <span>Namangan shahri, Suv xo‘jaligi hududi</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
              <span className="font-mono font-medium text-slate-100 tabular-nums">
                {schoolPhones.reception}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-xs text-slate-400 tabular-nums">
                {schoolPhones.director}
              </span>
              <button
                type="button"
                onClick={onNomerClick}
                className="inline-flex items-center gap-1 rounded-md border border-slate-700 bg-[#11192c] px-2.5 py-1 text-xs font-semibold text-slate-200 transition-colors hover:border-blue-500 hover:text-white"
              >
                <Pencil className="h-3 w-3" aria-hidden="true" />
                <span>Nomer</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
              <span>info@suvxojaligimaktab.uz</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-sm">
            <div className="font-semibold text-slate-100">Bo'limlar</div>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#maktab-haqida" className="hover:text-white transition-colors">
                  Maktab haqida
                </a>
              </li>
              <li>
                <a href="#yangiliklar" className="hover:text-white transition-colors">
                  Yangiliklar
                </a>
              </li>
              <li>
                <a href="#youtube" className="hover:text-white transition-colors">
                  YouTube va Kitoblar
                </a>
              </li>
              <li>
                <a href="#topqir" className="hover:text-white transition-colors">
                  Topqir (Testlar)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center">
          <span>© 2026 71-Maktab · Namangan shahridagi Suv xo‘jaligi maktabi.</span>
          <span>Ish vaqti: Dushanba – Shanba, 08:00 – 17:30</span>
        </div>
      </div>
    </footer>
  );
}
