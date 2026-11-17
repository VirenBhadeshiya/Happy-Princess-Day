import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { STAR_CHAPTERS } from '../data/tributeData';

export function TwoGuidingStars() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = STAR_CHAPTERS[activeIndex];

  return (
    <motion.section
      id="twin-stars"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16"
    >
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-[var(--accent-rose)] font-medium mb-2">
          Blessings from a Well Wisher
        </p>
        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[var(--text-primary)] text-balance">
          Two Guiding Stars
        </h2>
        <p className="mt-2.5 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
          Two luminous stars across the evening sky—shining with sincere good
          wishes for peace, joy, and bright tomorrows.
        </p>
      </div>

      <div className="princess-card rounded-2xl sm:rounded-3xl p-4 sm:p-8 space-y-6">
        <div className="relative rounded-2xl border border-[var(--border-hairline)] bg-gradient-to-b from-[#1D0B1E] via-[#2B102E] to-[#36153C] p-3 sm:p-6 overflow-hidden">
          <svg
            viewBox="0 0 640 230"
            className="w-full h-auto block"
            role="img"
            aria-label="Interactive star observatory showing two glowing stars connected by pastel pink and lavender light trails"
          >
            <defs>
              <radialGradient id="princessStarOne" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD7EA" stopOpacity="0.96" />
                <stop offset="48%" stopColor="#FF9EC7" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF9EC7" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="princessStarTwo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFF5FA" stopOpacity="0.98" />
                <stop offset="48%" stopColor="#D9A7FF" stopOpacity="0.42" />
                <stop offset="100%" stopColor="#D9A7FF" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="princessTrail" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF9EC7" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFF5FA" stopOpacity="1" />
                <stop offset="100%" stopColor="#D9A7FF" stopOpacity="0.9" />
              </linearGradient>
            </defs>

            {[
              [58, 42, 1.4],
              [124, 190, 1.1],
              [230, 38, 1.3],
              [320, 198, 1.5],
              [412, 34, 1.2],
              [524, 188, 1.3],
              [588, 56, 1.5],
              [92, 118, 1.0],
              [552, 128, 1.1],
            ].map(([cx, cy, r], idx) => (
              <circle
                key={idx}
                cx={cx}
                cy={cy}
                r={r}
                fill="#FFD7EA"
                opacity="0.52"
              />
            ))}

            <motion.path
              key={`trail-${activeIndex}`}
              initial={{ pathLength: 0, opacity: 0.45 }}
              animate={{ pathLength: 1, opacity: 0.95 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              d={
                activeIndex % 2 === 0
                  ? 'M 176 122 Q 320 44 464 110'
                  : 'M 176 122 Q 320 192 464 110'
              }
              fill="none"
              stroke="url(#princessTrail)"
              strokeWidth="2"
              strokeDasharray="5 5"
            />

            <g
              className="cursor-pointer"
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % STAR_CHAPTERS.length)
              }
            >
              <circle cx="176" cy="122" r="52" fill="url(#princessStarOne)" />
              <circle
                cx="176"
                cy="122"
                r="27"
                fill="none"
                stroke="#FF9EC7"
                strokeOpacity="0.52"
                strokeWidth="1.2"
              />
              <path
                d="M176 102 L180.5 117.5 L196 122 L180.5 126.5 L176 142 L171.5 126.5 L156 122 L171.5 117.5 Z"
                fill="#FFF5FA"
              />
              <text
                x="176"
                y="176"
                textAnchor="middle"
                fill="#FFD7EA"
                fontSize="13"
                fontFamily="Fraunces, serif"
                letterSpacing="1.2"
              >
                Well Wisher
              </text>
            </g>

            <g
              className="cursor-pointer"
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % STAR_CHAPTERS.length)
              }
            >
              <circle cx="464" cy="110" r="58" fill="url(#princessStarTwo)" />
              <circle
                cx="464"
                cy="110"
                r="31"
                fill="none"
                stroke="#D9A7FF"
                strokeOpacity="0.55"
                strokeWidth="1.2"
              />
              <path
                d="M464 88 L469 105 L486 110 L469 115 L464 132 L459 115 L442 110 L459 105 Z"
                fill="#FFF5FA"
              />
              <text
                x="464"
                y="168"
                textAnchor="middle"
                fill="#FF9EC7"
                fontSize="14"
                fontFamily="Fraunces, serif"
                letterSpacing="1.4"
              >
                Nandita’s Star
              </text>
            </g>
          </svg>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-[#F8D7EA]/85">
            <span>{current.constellationNote}</span>
            <span>Tap either star or choose a blessing below</span>
          </div>
        </div>

        <div className="space-y-5">
          <div
            role="tablist"
            aria-label="Well wisher star reflections"
            className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3"
          >
            {STAR_CHAPTERS.map((chapter, idx) => {
              const active = idx === activeIndex;
              return (
                <button
                  key={chapter.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveIndex(idx)}
                  className={`h-11 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-rose)] ${
                    active
                      ? 'bg-[#B82B69] text-[#FFF5FA] dark:bg-[#FF9EC7] dark:text-[#2A0922] font-semibold shadow-md shadow-[var(--accent-glow)]'
                      : 'border border-[var(--border-hairline)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {chapter.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 border-t border-[var(--border-hairline)] text-center max-w-2xl mx-auto"
            >
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text-primary)] mb-2">
                {current.heading}
              </h3>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {current.message}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
