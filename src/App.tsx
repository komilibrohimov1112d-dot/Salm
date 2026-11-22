import { useCallback, useEffect, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CodeGateModal, verifyPhoneCode } from './components/CodeGateModal';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { NewsSection } from './components/NewsSection';
import { NomerModal } from './components/NomerModal';
import { TopqirSection } from './components/TopqirSection';
import { YouTubeSection } from './components/YouTubeSection';

interface SchoolStateResponse {
  phones: {
    reception: string;
    director: string;
  };
  updatedAt: number;
}

const DEFAULT_PHONES = {
  reception: '+998 (69) 227-71-00',
  director: '+998 (94) 590-08-08',
};

export default function App() {
  const youtubeInputRef = useRef<HTMLInputElement | null>(null);
  const [schoolPhones, setSchoolPhones] = useState(DEFAULT_PHONES);
  const [verifiedPhoneCode, setVerifiedPhoneCode] = useState<string | null>(null);
  const [nomerCodeModalOpen, setNomerCodeModalOpen] = useState(false);
  const [nomerEditModalOpen, setNomerEditModalOpen] = useState(false);
  const [topqirSubjectsOpen, setTopqirSubjectsOpen] = useState(false);

  const applyServerState = useCallback((data: Partial<SchoolStateResponse>) => {
    if (data.phones?.reception && data.phones?.director) {
      setSchoolPhones({
        reception: data.phones.reception,
        director: data.phones.director,
      });
    }
  }, []);

  useEffect(() => {
    let active = true;

    const fetchState = async () => {
      try {
        const res = await fetch('/api/school-state', { cache: 'no-store' });
        if (res.ok && active) {
          const data = (await res.json()) as SchoolStateResponse;
          applyServerState(data);
        }
      } catch {
        // Ignore transient network errors
      }
    };

    void fetchState();

    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/school-state/stream');
      eventSource.onmessage = (event) => {
        if (!active) return;
        try {
          const data = JSON.parse(event.data) as SchoolStateResponse;
          applyServerState(data);
        } catch {
          // Ignore malformed SSE payload
        }
      };
    } catch {
      // Fallback handled by polling below
    }

    const pollTimer = window.setInterval(() => {
      void fetchState();
    }, 15_000);

    return () => {
      active = false;
      eventSource?.close();
      window.clearInterval(pollTimer);
    };
  }, [applyServerState]);

  const handleYouTubeFocus = () => {
    window.setTimeout(() => {
      youtubeInputRef.current?.focus();
    }, 250);
  };

  const handleTopqirClick = () => {
    setTopqirSubjectsOpen(true);
  };

  const handleNomerClick = () => {
    setVerifiedPhoneCode(null);
    setNomerCodeModalOpen(true);
  };

  const handleVerifyPhoneCode = async (code: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/school-state/verify-phone-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      if (res.ok) {
        const data = (await res.json()) as { ok?: boolean };
        return Boolean(data.ok);
      }
      return false;
    } catch {
      return verifyPhoneCode(code);
    }
  };

  const handleSavePhones = async (next: { reception: string; director: string }): Promise<boolean> => {
    if (!verifiedPhoneCode) return false;
    try {
      const res = await fetch('/api/school-state/phones', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verifiedPhoneCode, phones: next }),
      });
      if (!res.ok) return false;
      const data = (await res.json()) as SchoolStateResponse;
      applyServerState(data);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#090e1a] text-slate-100">
      <Navbar
        onYouTubeClick={handleYouTubeFocus}
        onTopqirClick={handleTopqirClick}
        onNomerClick={handleNomerClick}
      />
      <main>
        <HeroSection
          onNomerClick={handleNomerClick}
          onTopqirClick={handleTopqirClick}
          schoolPhones={schoolPhones}
        />
        <AboutSection
          onNomerClick={handleNomerClick}
          schoolPhones={schoolPhones}
        />
        <NewsSection />
        <YouTubeSection inputRef={youtubeInputRef} />
        <TopqirSection
          isSubjectsOpen={topqirSubjectsOpen}
          onToggleSubjects={(open) =>
            setTopqirSubjectsOpen((prev) => (typeof open === 'boolean' ? open : !prev))
          }
        />
      </main>
      <Footer
        onNomerClick={handleNomerClick}
        schoolPhones={schoolPhones}
      />

      <CodeGateModal
        isOpen={nomerCodeModalOpen}
        title="Nomerni o‘zgartirish"
        description="Telefon raqamini tahrirlash uchun maxfiy kodni kiriting."
        onVerify={handleVerifyPhoneCode}
        onClose={() => setNomerCodeModalOpen(false)}
        onSuccess={(code) => {
          setVerifiedPhoneCode(code);
          setNomerCodeModalOpen(false);
          setNomerEditModalOpen(true);
        }}
      />

      <NomerModal
        isOpen={nomerEditModalOpen}
        phones={schoolPhones}
        onSavePhones={handleSavePhones}
        onClose={() => {
          setNomerEditModalOpen(false);
          setVerifiedPhoneCode(null);
        }}
      />
    </div>
  );
}
