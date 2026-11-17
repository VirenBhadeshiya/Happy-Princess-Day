import { Moon, Music, Sun, VolumeX } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';

interface TopBarProps {
  isDark: boolean;
  onToggleTheme: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
}

export function TopBar({
  isDark,
  onToggleTheme,
  musicPlaying,
  onToggleMusic,
}: TopBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]/94 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        <a
          href="#top"
          className="flex items-center gap-2 text-[var(--text-primary)] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-rose)] rounded-md"
        >
          <svg
            viewBox="0 0 28 28"
            className="w-5 h-5 text-[var(--accent-rose)] shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="M4 20L6.5 9.5L11.5 14L14 7L16.5 14L21.5 9.5L24 20H4Z" />
            <path d="M5.5 23H22.5" strokeLinecap="round" />
          </svg>
          <span className="font-display text-base sm:text-xl font-semibold tracking-wide">
            Nandita Jayswal
          </span>
        </a>

        <nav
          aria-label="Primary sections"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[var(--text-secondary)]"
        >
          <a
            href="#letter"
            className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
          >
            Royal Scroll
          </a>
          <a
            href="#virtues"
            className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
          >
            Virtues
          </a>
          <a
            href="#gallery"
            className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
          >
            Gallery
          </a>
          <a
            href="#twin-stars"
            className="hover:text-[var(--text-primary)] transition-colors whitespace-nowrap shrink-0"
          >
            Wishes
          </a>
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={
              isDark
                ? 'Switch to Blush Pink light theme'
                : 'Switch to Rose Twilight dark theme'
            }
            className="h-10 min-w-10 px-2.5 sm:px-3.5 inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-xs sm:text-sm font-medium text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-rose)]"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4 text-[var(--accent-rose)] shrink-0" />
                <span className="hidden sm:inline">Blush Pink</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[var(--accent-rose)] shrink-0" />
                <span className="hidden sm:inline">Rose Twilight</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onToggleMusic}
            aria-pressed={musicPlaying}
            className={`h-10 px-2.5 sm:px-4 inline-flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-rose)] ${
              musicPlaying
                ? 'border-[var(--accent-rose)] bg-[var(--accent-rose)]/15 text-[var(--text-primary)]'
                : 'border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:border-[var(--border-strong)]'
            }`}
          >
            {musicPlaying ? (
              <Music className="w-4 h-4 text-[var(--accent-rose)] shrink-0" />
            ) : (
              <VolumeX className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
            )}
            <span className="hidden sm:inline">
              {musicPlaying ? 'Music On' : 'Music Off'}
            </span>
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[2px] w-full origin-left bg-gradient-to-r from-[var(--accent-rose)] via-[var(--accent-gold)] to-[var(--accent-rose)]"
      />
    </header>
  );
}
