import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAssessment } from '../context/AssessmentContext';
import Header from '../components/Header';
import ProgressStepper from '../components/ProgressStepper';
import InfoModal from '../components/InfoModal';
import { TRL, MRL, CRL } from '../data/criteria';

const CRITERIA = { trl: TRL, mrl: MRL, crl: CRL };

// Which step number each matrix maps to (for ProgressStepper)
const STEP_MAP = { trl: 2, mrl: 3, crl: 4 };

// Where to navigate after each matrix
const NEXT_ROUTE = { trl: '/assessment/mrl', mrl: '/assessment/crl', crl: '/assessment/review' };

// Which data key each matrix uses
const DATA_KEY = { trl: 'trl', mrl: 'mrl', crl: 'crl' };

// Human-readable matrix titles per language
const MATRIX_TITLE = {
  trl: { ar: 'مستوى الجاهزية التكنولوجية', en: 'Technology Readiness Level' },
  mrl: { ar: 'مستوى الاستعداد التصنيعي', en: 'Manufacturing Readiness Level' },
  crl: { ar: 'مستوى الاستعداد التجاري', en: 'Commercial Readiness Level' },
};

const MATRIX_DESC = {
  trl: {
    ar: 'تصفّح كل مستوى بالترتيب. حدّد المستوى الذي يصف اختراعك بدقة.',
    en: 'Browse each level in order. Select the level that best describes your invention.',
  },
  mrl: {
    ar: 'قيّم مدى جاهزية تصنيع اختراعك. تصفّح المستويات حتى تجد الأنسب.',
    en: 'Assess your manufacturing readiness. Browse levels until you find the right fit.',
  },
  crl: {
    ar: 'حدّد مدى جاهزيتك التجارية. تصفّح المستويات بالترتيب.',
    en: 'Assess your commercial readiness. Browse levels in sequence.',
  },
};

const BADGE_COLOR = {
  trl: 'bg-electric',
  mrl: 'bg-emerald-600',
  crl: 'bg-amber-600',
};

export default function MatrixAssessment({ type }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const { data, updateData } = useAssessment();

  const levels = CRITERIA[type]; // array of level objects

  // Always start from level 1 — never resume from a saved value
  const [unlockedCount, setUnlockedCount] = useState(1);
  // infoLevel: the level object to show in the info modal (null = closed)
  const [infoLevel, setInfoLevel] = useState(null);

  const activeCardRef = useRef(null);

  // Scroll active card into view when unlocked count changes
  useEffect(() => {
    if (activeCardRef.current) {
      setTimeout(() => {
        activeCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [unlockedCount]);

  // User achieved this level — unlock the next, or exit if it's the last
  function handleAchieved(levelNum) {
    if (levelNum >= levels.length) {
      updateData({ [DATA_KEY[type]]: levelNum });
      navigate(NEXT_ROUTE[type]);
    } else {
      setUnlockedCount(prev => Math.max(prev, levelNum + 1));
    }
  }

  // User did NOT achieve this level — exit immediately with score = last achieved
  function handleNotAchieved(levelNum) {
    const score = Math.max(1, levelNum - 1);
    updateData({ [DATA_KEY[type]]: score });
    navigate(NEXT_ROUTE[type]);
  }

  const isRtl = lang === 'ar';
  const abbr = type.toUpperCase();
  const title = MATRIX_TITLE[type][lang];
  const desc = MATRIX_DESC[type][lang];

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <Header />
      <ProgressStepper current={STEP_MAP[type]} />

      {/* Matrix header */}
      <div className="px-6 pb-4 max-w-2xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-2">
          <span className={`${BADGE_COLOR[type]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
            {abbr}
          </span>
          <h1 className="text-white text-xl font-bold">{title}</h1>
        </div>
        <p className="text-white/60 text-sm">{desc}</p>
      </div>

      {/* Level cards */}
      <div className="flex-1 px-4 pb-6 max-w-2xl mx-auto w-full space-y-3">
        {levels.map((level, idx) => {
          const levelNum = level.level; // 1-based
          const isUnlocked = levelNum <= unlockedCount;
          const isActive = levelNum === unlockedCount;
          const isReviewed = levelNum < unlockedCount;
          const isLocked = !isUnlocked;

          if (isLocked) {
            return (
              <div key={levelNum} className="level-card-locked p-4">
                <div className="flex items-center gap-3">
                  <span className="text-white/30 text-sm font-medium flex-1">
                    {level.label[lang] || level.label['ar']}
                  </span>
                  <svg className="w-4 h-4 text-white/20 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m2-6V9a2 2 0 10-4 0v2M7 11h10a2 2 0 012 2v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 012-2z" />
                  </svg>
                </div>
              </div>
            );
          }

          if (isReviewed) {
            // Reviewed (Achieved) — read-only history card
            return (
              <div key={levelNum} className="level-card-selected p-4">
                <div className="flex items-center gap-3">
                  <span className="text-nearblack text-sm font-semibold flex-1">
                    {level.label[lang] || level.label['ar']}
                  </span>
                  <button
                    onClick={() => setInfoLevel(level)}
                    className="text-gray-400 hover:text-nearblack transition-colors shrink-0 p-1"
                    aria-label="Info"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                    </svg>
                  </button>
                  <div className="flex items-center gap-1 bg-green-50 text-green-600 border border-green-200 px-2 py-1 rounded-lg shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs font-bold">
                      {lang === 'ar' ? 'تم تحقيقه' : 'Achieved'}
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          // Active card (isActive = true) — full display with action buttons
          return (
            <div
              key={levelNum}
              ref={activeCardRef}
              className="level-card-active p-5 animate-slide-in"
            >
              {/* Header row */}
              <div className="flex justify-end mb-3">
                {/* ⓘ button */}
                <button
                  onClick={() => setInfoLevel(level)}
                  className="text-gray-400 hover:text-electric transition-colors p-1.5 hover:bg-gray-50 rounded-lg"
                  aria-label="More information"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 21a9 9 0 100-18 9 9 0 000 18z" />
                  </svg>
                </button>
              </div>

              {/* Level label */}
              <h2 className="text-nearblack font-bold text-lg mb-2">
                {level.label[lang] || level.label['ar']}
              </h2>

              {/* Criterion text */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {level.criterion[lang] || level.criterion['ar']}
              </p>

              {/* Action buttons */}
              <div className={`flex gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <button
                  onClick={() => handleAchieved(levelNum)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {t('assessment.selectBtn')}
                </button>

                <button
                  onClick={() => handleNotAchieved(levelNum)}
                  className="flex-1 flex items-center justify-center gap-2 border-2 border-red-400/60 hover:border-red-400 text-red-300 hover:text-red-200 font-semibold px-5 py-3 rounded-xl transition-all duration-200 active:scale-95"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {t('assessment.nextLevelBtn')}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info modal */}
      {infoLevel && (
        <InfoModal
          level={infoLevel}
          matrixType={type}
          onClose={() => setInfoLevel(null)}
        />
      )}
    </div>
  );
}
