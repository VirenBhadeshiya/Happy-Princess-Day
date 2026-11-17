import { useState } from 'react';

interface RoyalPortraitProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export function RoyalPortrait({
  src,
  alt,
  title,
  className = '',
  imgClassName = '',
  priority = false,
}: RoyalPortraitProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (failed) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#2B193D] via-[#1E122B] to-[#3A1D3E] text-[#F7DFA4] ${className}`}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-10 h-10 mb-3 text-[#F4B6C8]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M8 34L12 16L20 24L24 12L28 24L36 16L40 34H8Z" />
          <path d="M10 38H38" strokeLinecap="round" />
        </svg>
        <span className="font-display text-lg tracking-wide">{title}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#1B0D29]/30 ${className}`}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-[#F4B6C8]/12 via-transparent to-[#F7DFA4]/12"
        />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`w-full h-full object-cover object-[50%_18%] transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
}
