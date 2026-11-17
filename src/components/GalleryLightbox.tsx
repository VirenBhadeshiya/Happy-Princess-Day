import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { PortraitItem } from '../data/tributeData';
import { RoyalPortrait } from './RoyalPortrait';

interface GalleryLightboxProps {
  items: PortraitItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
}

export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onSelect,
}: GalleryLightboxProps) {
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onSelect((activeIndex + 1) % items.length);
      }
      if (e.key === 'ArrowLeft') {
        onSelect((activeIndex - 1 + items.length) % items.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, items.length, onClose, onSelect]);

  const current = activeIndex !== null ? items[activeIndex] : null;

  return (
    <AnimatePresence>
      {current && activeIndex !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#140615]/92 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        >
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full max-h-[90dvh] overflow-y-auto md:overflow-hidden rounded-2xl sm:rounded-3xl border border-[#FF9EC7]/35 bg-[#260F28] text-[#FFF5FA] shadow-2xl grid grid-cols-1 md:grid-cols-12"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery viewer"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-[#1D0B1E]/90 border border-[#FF9EC7]/40 text-[#FFF5FA] inline-flex items-center justify-center hover:bg-[#3E1742] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF9EC7]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="md:col-span-7 bg-[#1D0B1E] aspect-[4/4] sm:aspect-[4/3] md:aspect-auto md:min-h-[420px] max-h-[55dvh] md:max-h-[75dvh] w-full">
              <RoyalPortrait
                src={current.src}
                alt={current.alt}
                title={current.title}
                className="w-full h-full"
                priority
              />
            </div>

            <div className="md:col-span-5 p-5 sm:p-8 flex flex-col justify-between gap-5">
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-[#FF9EC7] mb-2">
                  {current.setting}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#FFF5FA]">
                  {current.title}
                </h3>
                <p className="font-display italic text-base sm:text-lg text-[#FFD7EA] mt-1">
                  {current.subtitle}
                </p>
                <p className="mt-4 text-sm sm:text-base text-[#F8D7EA] leading-relaxed">
                  {current.caption}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#FF9EC7]/20">
                <span className="text-xs text-[#DDA9CA] tabular-nums">
                  Portrait {activeIndex + 1} of {items.length}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onSelect((activeIndex - 1 + items.length) % items.length)
                    }
                    aria-label="Previous portrait"
                    className="w-10 h-10 rounded-xl border border-[#FF9EC7]/30 inline-flex items-center justify-center hover:bg-[#FF9EC7]/15 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelect((activeIndex + 1) % items.length)}
                    aria-label="Next portrait"
                    className="w-10 h-10 rounded-xl border border-[#FF9EC7]/30 inline-flex items-center justify-center hover:bg-[#FF9EC7]/15 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
