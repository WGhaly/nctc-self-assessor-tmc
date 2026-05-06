import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import LevelGuideModal from '../components/LevelGuideModal';
import { useAssessment } from '../context/AssessmentContext';

export default function Landing() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { reset } = useAssessment();
  const [guideType, setGuideType] = useState(null);

  function handleStart() {
    reset();
    navigate('/assessment/info');
  }

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo + Title */}
        <div className="text-center mb-12 max-w-2xl">
          <img
            src="/nctc-logo.png"
            alt="NCTC"
            className="h-16 w-auto mx-auto mb-6"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            {t('landing.title')}
          </h1>
          <p className="text-electric text-lg font-semibold mb-4">
            {t('landing.subtitle')}
          </p>
          <p className="text-white/60 text-base leading-relaxed">
            {t('landing.tagline')}
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleStart}
          className="btn-primary text-lg px-10 py-4 mb-12 shadow-2xl shadow-electric/30"
        >
          {t('landing.startBtn')}
        </button>

        {/* Matrix cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-10">
          {[
            { abbr: 'TRL', fullName: t('landing.trlFull'), type: 'trl', color: 'border-electric', dot: 'bg-electric', text: t('landing.trlAbout') },
            { abbr: 'MRL', fullName: t('landing.mrlFull'), type: 'mrl', color: 'border-emerald-500', dot: 'bg-emerald-500', text: t('landing.mrlAbout') },
            { abbr: 'CRL', fullName: t('landing.crlFull'), type: 'crl', color: 'border-amber-500', dot: 'bg-amber-500', text: t('landing.crlAbout') },
          ].map(({ abbr, fullName, type, color, dot, text }) => (
            <div
              key={abbr}
              className={`bg-white/8 backdrop-blur-sm border ${color} border-opacity-40 rounded-2xl p-5 flex flex-col`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full ${dot} shrink-0`} />
                <span className="font-bold text-white text-sm">{abbr}</span>
              </div>
              <p className="text-white/40 text-xs mb-3">{fullName}</p>
              <p className="text-white/70 text-sm leading-relaxed flex-1">{text}</p>
              <button
                onClick={() => setGuideType(type)}
                className="mt-4 text-xs font-semibold text-white/50 hover:text-white transition-colors text-start flex items-center gap-1"
              >
                {t('landing.exploreBtn')}
                <svg
                  className={`w-3 h-3 shrink-0 ${i18n.language === 'ar' ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <p className="text-white/30 text-xs text-center max-w-md">
          {t('landing.disclaimer')}
        </p>
      </main>

      {guideType && (
        <LevelGuideModal type={guideType} onClose={() => setGuideType(null)} />
      )}
    </div>
  );
}
