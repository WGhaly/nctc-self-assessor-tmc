import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TRL, MRL, CRL } from '../data/criteria';

const LEVELS_MAP = { trl: TRL, mrl: MRL, crl: CRL };

const BADGE_COLOR = {
  trl: 'bg-electric',
  mrl: 'bg-emerald-600',
  crl: 'bg-amber-600',
};

const MATRIX_TITLE = {
  trl: { ar: 'مستوى الجاهزية التكنولوجية', en: 'Technology Readiness Levels' },
  mrl: { ar: 'مستوى الاستعداد التصنيعي', en: 'Manufacturing Readiness Levels' },
  crl: { ar: 'مستوى الاستعداد التجاري', en: 'Commercial Readiness Levels' },
};

const MATRIX_INTRO = {
  trl: {
    en: 'TRL measures how mature your technology is — from a basic scientific observation all the way to a deployed, proven system in operational conditions.',
    ar: 'يقيس مستوى TRL مدى نضج تقنيتك — من الملاحظة العلمية الأساسية وصولاً إلى نظام منتشر ومُثبَت في بيئة تشغيلية حقيقية.',
  },
  mrl: {
    en: 'MRL measures how ready your invention is to be manufactured at scale — from early exploration of production concepts to full-rate manufacturing.',
    ar: 'يقيس مستوى MRL مدى جاهزية اختراعك للتصنيع على نطاق واسع — من الاستكشاف المبكر لمفاهيم الإنتاج إلى التصنيع بالمعدل الكامل.',
  },
  crl: {
    en: 'CRL measures how ready your invention is for the commercial market — from identifying the problem all the way to a launch-ready go-to-market plan.',
    ar: 'يقيس مستوى CRL مدى جاهزية اختراعك للسوق التجارية — من تحديد المشكلة وصولاً إلى خطة تسويقية كاملة جاهزة للإطلاق.',
  },
};

export default function LevelGuideModal({ type, onClose }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const overlayRef = useRef(null);
  const levels = LEVELS_MAP[type];
  const abbr = type.toUpperCase();

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  function handleOverlayClick(e) {
    if (e.target === overlayRef.current) onClose();
  }

  return (
    <div
      ref={overlayRef}
      className="modal-backdrop"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slide-in">
        {/* Header */}
        <div className={`${BADGE_COLOR[type]} rounded-t-2xl px-6 py-5 flex items-start justify-between`}>
          <div>
            <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{abbr}</div>
            <h2 className="text-white text-xl font-bold leading-snug">
              {MATRIX_TITLE[type][lang]}
            </h2>
            <p className="text-white/80 text-sm mt-2 leading-relaxed max-w-lg">
              {MATRIX_INTRO[type][lang]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors ms-4 shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable level list */}
        <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">
          {levels.map((level) => (
            <div key={level.level} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
              {/* Level badge */}
              <div className={`${BADGE_COLOR[type]} text-white text-sm font-bold w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
                {level.level}
              </div>

              <div className="flex-1 min-w-0">
                {/* Level label */}
                <h3 className="font-bold text-nearblack text-sm mb-1">
                  {level.label[lang] || level.label['ar']}
                </h3>
                {/* Criterion */}
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                  {level.criterion[lang] || level.criterion['ar']}
                </p>
                {/* Info detail */}
                <p className="text-gray-400 text-xs leading-relaxed">
                  {level.info[lang] || level.info['ar']}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100">
          <button onClick={onClose} className="btn-primary w-full">
            {lang === 'ar' ? 'حسناً، فهمت' : 'Got it'}
          </button>
        </div>
      </div>
    </div>
  );
}
