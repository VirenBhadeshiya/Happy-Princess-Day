import { useCallback, useEffect, useRef, useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { royalMusic } from './audio/royalMusic';
import { GalleryLightbox } from './components/GalleryLightbox';
import { RoyalCanvas, type RoyalCanvasHandle } from './components/RoyalCanvas';
import { RoyalPortrait } from './components/RoyalPortrait';
import { TopBar } from './components/TopBar';
import { TwoGuidingStars } from './components/TwoGuidingStars';
import {
  GALLERY_PORTRAITS,
  HERO_PORTRAIT,
  ROYAL_BLESSINGS,
  ROYAL_VIRTUES,
} from './data/tributeData';

const ALL_PORTRAITS = [HERO_PORTRAIT, ...GALLERY_PORTRAITS];
const THEME_STORAGE_KEY = 'nandita-princess-theme';
const EASE_OUT_ROYAL = [0.16, 1, 0.3, 1] as const;

export default function App() {
  const canvasRef = useRef<RoyalCanvasHandle | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      return saved ? saved === 'dark' : true;
    } catch {
      return true;
    }
  });

  const [musicPlaying, setMusicPlaying] = useState(false);
  const [blessingCount, setBlessingCount] = useState(0);
  const [activeBlessing, setActiveBlessing] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(
        THEME_STORAGE_KEY,
        isDark ? 'dark' : 'light'
      );
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [isDark]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
      royalMusic.stop();
    };
  }, []);

  const handleToggleMusic = useCallback(async () => {
    const nextState = await royalMusic.toggle();
    setMusicPlaying(nextState);
  }, []);

  const handleSendBlessing = useCallback(() => {
    canvasRef.current?.triggerBlessingShower();
    setBlessingCount((prev) => {
      const next = prev + 1;
      setActiveBlessing(ROYAL_BLESSINGS[prev % ROYAL_BLESSINGS.length]);
      return next;
    });

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setActiveBlessing(null);
    }, 6000);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div
        id="top"
        className="relative min-h-screen flex flex-col text-[var(--text-primary)] overflow-x-clip"
      >
        <RoyalCanvas ref={canvasRef} isDark={isDark} />

        <TopBar
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          musicPlaying={musicPlaying}
          onToggleMusic={handleToggleMusic}
        />

        <main className="relative z-10 flex-1">
          {/* 1. Direct Instant-Paint Split Fairytale Hero (No top kicker line) */}
          <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-12 sm:pt-14 sm:pb-18">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
              {/* Left Column: Opens directly with HAPPY PRINCESS DAY */}
              <div className="lg:col-span-7 text-center lg:text-left">
                <h1 className="font-display text-[clamp(2.15rem,6.5vw,4.45rem)] font-semibold tracking-wide text-[var(--text-primary)] text-balance leading-[1.06]">
                  HAPPY PRINCESS DAY
                </h1>

                <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row sm:items-baseline justify-center lg:justify-start gap-1 sm:gap-3">
                  <span className="font-display text-2xl sm:text-4xl font-semibold text-[var(--accent-gold)] tracking-wide">
                    Nandita Jayswal
                  </span>
                  <span className="text-xs sm:text-base text-[var(--text-muted)]">
                    · Warmest Wishes from a Well Wisher
                  </span>
                </div>

                <blockquote className="mt-5 sm:mt-7 max-w-xl mx-auto lg:mx-0 font-display italic text-lg sm:text-2xl text-[var(--text-secondary)] leading-relaxed">
                  &ldquo;A true princess isn&apos;t defined by a crown of gold,
                  but by the warmth in her heart, the quiet strength in her
                  stride, and the kindness she brings into the world.&rdquo;
                </blockquote>

                <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleSendBlessing}
                    className="cta-shimmer relative overflow-hidden w-full sm:w-auto min-h-12 px-6 sm:px-7 py-3.5 rounded-xl bg-[#B82B69] text-[#FFF5FA] dark:bg-[#FF9EC7] dark:text-[#2A0922] font-semibold text-sm sm:text-base tracking-wide inline-flex items-center justify-center gap-2.5 shadow-xl shadow-[var(--accent-glow)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-rose)]"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>✦ Send a Royal Blessing for Nandita ✦</span>
                  </motion.button>

                  {blessingCount > 0 && (
                    <span className="text-xs text-[var(--text-muted)] tabular-nums">
                      {blessingCount}{' '}
                      {blessingCount === 1
                        ? 'royal blessing sent'
                        : 'royal blessings sent'}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Arched Fairytale Palace Window Portrait */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[270px] sm:max-w-[320px] md:max-w-[340px]">
                  <div
                    aria-hidden="true"
                    className="flex justify-center mb-2.5 text-[var(--accent-rose)]"
                  >
                    <svg
                      viewBox="0 0 48 24"
                      className="w-9 h-4 sm:w-10 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M6 20L11 7L19 14L24 3L29 14L37 7L42 20H6Z" />
                    </svg>
                  </div>

                  <button
                    type="button"
                    onClick={() => setLightboxIndex(0)}
                    aria-label="Open Nandita's Hero Royal Portrait in full view"
                    className="group relative block w-full aspect-[3/4] rounded-t-[999px] rounded-b-3xl p-2 sm:p-2.5 border border-[var(--border-strong)] bg-gradient-to-b from-[var(--accent-rose)]/28 via-[var(--accent-gold)]/16 to-transparent shadow-2xl shadow-[var(--accent-glow)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-rose)]"
                  >
                    <div className="w-full h-full rounded-t-[999px] rounded-b-2xl overflow-hidden border border-[var(--border-hairline)]">
                      <RoyalPortrait
                        src={HERO_PORTRAIT.src}
                        alt={HERO_PORTRAIT.alt}
                        title={HERO_PORTRAIT.title}
                        className="w-full h-full"
                        imgClassName="group-hover:scale-[1.03] transition-transform duration-300"
                        priority
                      />
                    </div>
                  </button>

                  <p className="mt-3.5 text-xs sm:text-sm text-[var(--text-muted)] text-center">
                    {HERO_PORTRAIT.title} · {HERO_PORTRAIT.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Centered Royal Dedication Scroll */}
          <motion.section
            id="letter"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.04 }}
            transition={{ duration: 0.3, ease: EASE_OUT_ROYAL }}
            className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12"
          >
            <div className="princess-card rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
              <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 pb-5 border-b border-[var(--border-hairline)]">
                <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--accent-rose)] font-medium mb-2">
                  Royal Dedication Scroll
                </p>
                <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-semibold text-[var(--text-primary)] text-balance leading-tight">
                  To Dearest Nandita — Warmest Wishes Today
                </h2>
              </div>

              <div className="max-w-2xl mx-auto space-y-4 sm:space-y-5 text-sm sm:text-[17px] text-[var(--text-secondary)] leading-relaxed">
                <p className="first-letter:font-display first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-semibold first-letter:text-[var(--accent-rose)] first-letter:float-left first-letter:mr-2.5 sm:first-letter:mr-3 first-letter:leading-[0.88] first-letter:pt-1">
                  Some people bring light into a room without ever trying to
                  command attention. You have a quiet way of making ordinary
                  days feel warmer, lighter, and genuinely brighter simply by
                  being yourself.
                </p>
                <p>
                  Today is a celebration of everything that makes you{' '}
                  <span className="text-[var(--text-primary)] font-semibold">
                    Nandita Jayswal
                  </span>
                  —your radiant smile that lifts spirits, your gentle and
                  thoughtful heart, and the remarkable resilience you carry
                  through every season with grace.
                </p>
                <p>
                  You bring sincerity, patience, and kindness wherever you go.
                  May life always meet you with the same softness, respect, and
                  quiet magic that you so naturally bring into the world.
                </p>
              </div>

              <div className="max-w-2xl mx-auto mt-7 sm:mt-9 pt-6 border-t border-[var(--border-hairline)] text-center space-y-2">
                <p className="font-display italic text-lg sm:text-2xl text-[var(--accent-gold)] leading-snug">
                  &ldquo;Never forget your worth, never dim your sparkle, and
                  always walk tall—because you truly deserve every joy this
                  world has to offer, Nandita.&rdquo;
                </p>
                <p className="text-xs tracking-[0.18em] uppercase text-[var(--text-muted)]">
                  With Warmest Wishes from a Well Wisher
                </p>
              </div>
            </div>
          </motion.section>

          {/* 3. Staggered Royal Virtues Cascade */}
          <section
            id="virtues"
            className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16"
          >
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
              <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--accent-rose)] font-medium mb-2">
                Three Qualities Worth Celebrating
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--text-primary)] text-balance">
                Why Nandita Deserves Every Crown
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {ROYAL_VIRTUES.map((virtue, idx) => {
                const staggerOffset =
                  idx === 0
                    ? 'md:mr-12 lg:mr-24'
                    : idx === 1
                      ? 'md:mx-6 lg:mx-12'
                      : 'md:ml-12 lg:ml-24';

                return (
                  <motion.article
                    key={virtue.index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{
                      duration: 0.28,
                      delay: idx * 0.04,
                      ease: EASE_OUT_ROYAL,
                    }}
                    whileHover={{ y: -2 }}
                    className={`princess-card-interactive rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 ${staggerOffset}`}
                  >
                    <div className="shrink-0 flex sm:flex-col items-baseline sm:items-center gap-2 sm:gap-1 sm:w-20 sm:border-r sm:border-[var(--border-hairline)] sm:pr-6">
                      <span className="font-display text-3xl sm:text-4xl font-semibold text-[var(--accent-rose)] tabular-nums">
                        {virtue.index}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        Virtue
                      </span>
                    </div>

                    <div className="flex-1">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--accent-rose)] font-medium mb-1">
                        {virtue.title}
                      </p>
                      <h3 className="font-display text-xl sm:text-3xl font-semibold text-[var(--text-primary)] leading-snug mb-2">
                        {virtue.summary}
                      </h3>
                      <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                        {virtue.detail}
                      </p>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </section>

          {/* 4. Editorial Bento Magazine Gallery */}
          <section
            id="gallery"
            className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10">
              <div className="max-w-xl">
                <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--accent-rose)] font-medium mb-2">
                  Curated Royal Portraits
                </p>
                <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--text-primary)] text-balance">
                  The Royal Gallery of Nandita
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md">
                Four distinct portraits in princess elegance—tap any frame to
                open the full gallery viewer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
              {GALLERY_PORTRAITS.map((portrait, idx) => {
                const spanClass =
                  idx === 0 || idx === 3 ? 'lg:col-span-7' : 'lg:col-span-5';
                const aspectClass =
                  portrait.orientation === 'landscape'
                    ? 'aspect-[4/3] md:aspect-[4/3] lg:aspect-auto lg:h-[410px]'
                    : 'aspect-[3/4] md:aspect-[4/3] lg:aspect-auto lg:h-[410px]';

                return (
                  <motion.button
                    key={portrait.id}
                    type="button"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.04 }}
                    transition={{
                      duration: 0.28,
                      delay: idx * 0.03,
                      ease: EASE_OUT_ROYAL,
                    }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setLightboxIndex(idx + 1)}
                    className={`group relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[var(--border-hairline)] hover:border-[var(--border-strong)] text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-rose)] ${spanClass} ${aspectClass}`}
                  >
                    <RoyalPortrait
                      src={portrait.src}
                      alt={portrait.alt}
                      title={portrait.title}
                      className="w-full h-full"
                      imgClassName="group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[#1D0B1E]/92 via-[#1D0B1E]/32 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-7 text-[#FFF5FA]">
                      <p className="text-[11px] sm:text-xs tracking-[0.16em] uppercase text-[#FF9EC7] font-medium">
                        {portrait.subtitle}
                      </p>
                      <h3 className="mt-1 font-display text-xl sm:text-3xl font-semibold text-[#FFF5FA]">
                        {portrait.title}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-[#F8D7EA] leading-relaxed line-clamp-2 max-w-lg">
                        {portrait.caption}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </section>

          {/* 5. Two Guiding Stars — Celestial Observatory Stage */}
          <TwoGuidingStars />

          {/* 6. Grand Fairytale Finale Pavilion */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.3, ease: EASE_OUT_ROYAL }}
            className="max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-16 sm:pb-24"
          >
            <div className="princess-card rounded-t-[2.5rem] sm:rounded-t-[4.5rem] rounded-b-3xl px-5 py-10 sm:px-12 sm:py-16 text-center">
              <div
                aria-hidden="true"
                className="flex justify-center mb-3 sm:mb-4 text-[var(--accent-rose)]"
              >
                <svg
                  viewBox="0 0 48 24"
                  className="w-9 h-4 sm:w-10 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M6 20L11 7L19 14L24 3L29 14L37 7L42 20H6Z" />
                </svg>
              </div>
              <p className="text-xs sm:text-sm tracking-[0.22em] uppercase text-[var(--accent-rose)] font-medium mb-3 sm:mb-4">
                ✦ Today &amp; Always ✦
              </p>
              <h2 className="font-display text-2xl sm:text-5xl font-semibold text-[var(--text-primary)] text-balance leading-tight">
                HAPPY PRINCESS DAY, Nandita Jayswal — Keep Shining Bright!
              </h2>
              <p className="mt-3 sm:mt-4 max-w-xl mx-auto text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                May every chapter ahead bring you peace, laughter, and
                milestones worthy of your extraordinary heart.
              </p>
              <div className="mt-7 sm:mt-8">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSendBlessing}
                  className="min-h-11 px-6 py-3 rounded-xl border border-[var(--border-strong)] bg-[var(--accent-rose)]/12 text-[var(--text-primary)] text-sm font-medium inline-flex items-center gap-2 hover:bg-[var(--accent-rose)]/22 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-rose)]"
                >
                  <Sparkles
                    className="w-4 h-4 text-[var(--accent-rose)]"
                    aria-hidden="true"
                  />
                  <span>Send Another Blessing</span>
                </motion.button>
              </div>
            </div>
          </motion.section>
        </main>

        <footer className="relative z-10 border-t border-[var(--border-hairline)] py-7 px-4 text-center">
          <p className="text-xs sm:text-sm text-[var(--text-muted)] tracking-wide">
            Crafted with Warmest Wishes from a Well Wisher · For Nandita Jayswal
          </p>
        </footer>

        <AnimatePresence>
          {activeBlessing && (
            <motion.div
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.18, ease: EASE_OUT_ROYAL }}
              className="fixed bottom-4 right-3 left-3 sm:bottom-5 sm:right-4 sm:left-auto sm:max-w-md z-50 princess-card rounded-2xl p-4 sm:p-5 shadow-2xl border-[var(--border-strong)] flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-full bg-[var(--accent-rose)]/18 text-[var(--accent-rose)] flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs tracking-[0.16em] uppercase text-[var(--accent-rose)] font-medium mb-1">
                  Royal Blessing for Nandita
                </p>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                  {activeBlessing}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveBlessing(null)}
                aria-label="Dismiss blessing message"
                className="w-8 h-8 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] inline-flex items-center justify-center shrink-0 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <GalleryLightbox
          items={ALL_PORTRAITS}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onSelect={(idx) => setLightboxIndex(idx)}
        />
      </div>
    </MotionConfig>
  );
}
