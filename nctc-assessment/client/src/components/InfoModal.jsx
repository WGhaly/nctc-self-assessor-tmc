import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function InfoModal({ level, matrixType, onClose }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const overlayRef = useRef(null);

  const badgeColors = {
    trl: 'bg-electric',
    mrl: 'bg-emerald-600',
    crl: 'bg-amber-600',
  };

  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  const abbr = matrixType.toUpperCase();
  const label = level.label[lang] || level.label['ar'];
  const info = level.info[lang] || level.info['ar'];

  return (
    <div
      ref={overlayRef}
      className="modal-backdrop"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${abbr} ${level.level} info`}
    >
      <div className="card max-w-lg w-full p-6 relative animate-slide-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 end-4 text-gray-400 hover:text-nearblack transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Level name */}
        <h2 className="text-xl font-bold text-nearblack mb-3">{label}</h2>

        {/* Divider */}
        <div className="w-12 h-1 bg-electric rounded mb-4" />

        {/* Info text */}
        <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">{info}</p>
      </div>
    </div>
  );
}
