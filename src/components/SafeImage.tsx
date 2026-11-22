import { Building2 } from 'lucide-react';
import { useState } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  className = '',
  fallbackTitle = '71-Maktab',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#0d1425] via-[#11192c] to-[#162038] p-6 text-center text-slate-300 ${className}`}
      >
        <Building2 className="mb-2 h-8 w-8 text-slate-500" strokeWidth={1.5} />
        <span className="font-serif text-sm font-medium text-slate-200">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
