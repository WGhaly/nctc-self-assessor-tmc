import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAssessment } from '../context/AssessmentContext';
import Header from '../components/Header';
import { TRL, MRL, CRL } from '../data/criteria';

const MATRICES = [
  { key: 'trl', label: 'TRL', data: TRL, max: 9, color: 'bg-electric', textColor: 'text-electric', borderColor: 'border-electric' },
  { key: 'mrl', label: 'MRL', data: MRL, max: 10, color: 'bg-emerald-600', textColor: 'text-emerald-600', borderColor: 'border-emerald-500' },
  { key: 'crl', label: 'CRL', data: CRL, max: 9, color: 'bg-amber-600', textColor: 'text-amber-600', borderColor: 'border-amber-500' },
];

export default function Confirmation() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const location = useLocation();
  const navigate = useNavigate();
  const { reset } = useAssessment();

  const { referenceNumber, submittedAt, name, trl, mrl, crl, inventionTitle } = location.state || {};
  const scores = { trl, mrl, crl };

  function handleNewAssessment() {
    reset();
    navigate('/');
  }

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <Header showLogo />

      <main className="flex-1 px-4 py-10 max-w-2xl mx-auto w-full">
        {/* Success header */}
        <div className="card p-8 mb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-5">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-nearblack text-2xl font-bold mb-2">{t('confirmation.title')}</h1>
          <p className="text-gray-600 mb-1">
            {t('confirmation.thankYou', { name: name || '' })}
          </p>
          <p className="text-gray-500 text-sm">
            {t('confirmation.message')}
          </p>

          {referenceNumber && (
            <div className="bg-gray-50 rounded-xl p-4 mt-5">
              <p className="text-xs text-gray-500 mb-1">{t('confirmation.refLabel')}</p>
              <p className="font-mono text-sm text-nearblack font-semibold break-all">
                {referenceNumber}
              </p>
              {submittedAt && (
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(submittedAt).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Score cards */}
        {(trl || mrl || crl) && (
          <div className="card p-6 mb-6">
            <h2 className="text-nearblack font-bold text-base mb-4">{t('confirmation.yourScores')}</h2>
            {inventionTitle && (
              <p className="text-gray-500 text-sm mb-4 pb-4 border-b border-gray-100">
                <span className="font-medium text-nearblack">{inventionTitle}</span>
              </p>
            )}
            <div className="grid grid-cols-3 gap-3">
              {MATRICES.map(({ key, label, max, color }) => {
                const score = scores[key];
                if (!score) return null;
                return (
                  <div key={key} className="text-center">
                    <div className={`${color} rounded-xl py-4 mb-2`}>
                      <span className="text-white text-3xl font-bold">{score}</span>
                      <span className="text-white/60 text-sm">/{max}</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Next steps */}
        {(trl || mrl || crl) && (
          <div className="card p-6 mb-6">
            <h2 className="text-nearblack font-bold text-base mb-1">{t('confirmation.nextStepsTitle')}</h2>
            <p className="text-gray-400 text-sm mb-5">{t('confirmation.nextStepsSubtitle')}</p>
            <div className="space-y-5">
              {MATRICES.map(({ key, label, data, max, color, textColor, borderColor }) => {
                const score = scores[key];
                if (!score) return null;
                const isMax = score >= max;
                const nextLevel = isMax ? null : data[score]; // data is 0-indexed, data[score] = level score+1
                return (
                  <div key={key} className={`border-l-4 ${borderColor} ps-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`${color} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
                        {label} {score}
                      </span>
                      {isMax ? (
                        <span className="text-green-600 text-xs font-semibold">
                          {t('confirmation.maxReached')}
                        </span>
                      ) : (
                        <span className={`${textColor} text-xs font-semibold`}>
                          {t('confirmation.toReach', { label: `${label} ${score + 1}` })}
                        </span>
                      )}
                    </div>
                    {!isMax && nextLevel && (
                      <>
                        <p className="text-nearblack text-sm font-semibold mb-2">
                          {nextLevel.label[lang] || nextLevel.label['ar']}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {t('confirmation.actionPrefix')}{' '}
                          <span className="text-gray-700">
                            {nextLevel.criterion[lang] || nextLevel.criterion['ar']}
                          </span>
                        </p>
                      </>
                    )}
                    {isMax && (
                      <p className="text-gray-500 text-sm mt-1">{t('confirmation.maxMsg', { label })}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button onClick={handleNewAssessment} className="btn-primary w-full">
          {t('confirmation.newBtn')}
        </button>
      </main>
    </div>
  );
}
