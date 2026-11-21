import { useEffect, useRef, useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { CodeGateModal } from './components/CodeGateModal';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { NewsSection } from './components/NewsSection';
import { NomerModal } from './components/NomerModal';
import { RaspisaniyaSection } from './components/RaspisaniyaSection';
import { YouTubeSection } from './components/YouTubeSection';

const PHONES_STORAGE_KEY = 'namangan_suv_xojaligi_phones_v1';

const DEFAULT_PHONES = {
  reception: '+998 (69) 227-71-00',
  director: '+998 (94) 590-08-08',
};

export default function App() {
  const youtubeInputRef = useRef<HTMLInputElement | null>(null);
  const [isNomerUnlocked, setIsNomerUnlocked] = useState(false);
  const [nomerCodeModalOpen, setNomerCodeModalOpen] = useState(false);
  const [nomerDetailsOpen, setNomerDetailsOpen] = useState(false);
  const [schoolPhones, setSchoolPhones] = useState(() => {
    try {
      const saved = window.localStorage.getItem(PHONES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved) as typeof DEFAULT_PHONES;
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_PHONES;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(PHONES_STORAGE_KEY, JSON.stringify(schoolPhones));
    } catch {
      // Ignore storage write errors
    }
  }, [schoolPhones]);

  const handleYouTubeFocus = () => {
    window.setTimeout(() => {
      youtubeInputRef.current?.focus();
    }, 250);
  };

  const handleNomerClick = () => {
    if (isNomerUnlocked) {
      setNomerDetailsOpen(true);
    } else {
      setNomerCodeModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4] text-zinc-900">
      <Navbar
        onYouTubeClick={handleYouTubeFocus}
        onNomerClick={handleNomerClick}
        isNomerUnlocked={isNomerUnlocked}
      />
      <main>
        <HeroSection
          onNomerClick={handleNomerClick}
          isNomerUnlocked={isNomerUnlocked}
        />
        <AboutSection
          onNomerClick={handleNomerClick}
          isNomerUnlocked={isNomerUnlocked}
          schoolPhones={schoolPhones}
        />
        <NewsSection />
        <YouTubeSection inputRef={youtubeInputRef} />
        <RaspisaniyaSection />
      </main>
      <Footer
        onNomerClick={handleNomerClick}
        isNomerUnlocked={isNomerUnlocked}
        schoolPhones={schoolPhones}
      />

      <CodeGateModal
        isOpen={nomerCodeModalOpen}
        title="Nomer bo‘limi himoyasi"
        description="Maktab telefon raqamlarini ko‘rish uchun maxfiy kodni kiriting."
        onClose={() => setNomerCodeModalOpen(false)}
        onSuccess={() => {
          setIsNomerUnlocked(true);
          setNomerCodeModalOpen(false);
          setNomerDetailsOpen(true);
        }}
      />

      <NomerModal
        isOpen={nomerDetailsOpen}
        phones={schoolPhones}
        onSavePhones={setSchoolPhones}
        onLock={() => setIsNomerUnlocked(false)}
        onClose={() => setNomerDetailsOpen(false)}
      />
    </div>
  );
}
