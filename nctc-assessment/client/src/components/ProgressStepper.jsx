import { useTranslation } from 'react-i18next';

const STEPS = ['info', 'trl', 'mrl', 'crl', 'review', 'done'];

export default function ProgressStepper({ current }) {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <div className="w-full px-6 pb-4">
      <div className="flex items-center justify-center gap-1 flex-wrap">
        {STEPS.map((step, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < current;
          const isActive = stepNum === current;
          const isPending = stepNum > current;

          return (
            <div key={step} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200
                    ${isDone ? 'bg-electric text-white' : ''}
                    ${isActive ? 'bg-white text-electric ring-2 ring-electric ring-offset-2 ring-offset-transparent' : ''}
                    ${isPending ? 'bg-white/10 text-white/30' : ''}
                  `}
                >
                  {isDone ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 font-medium whitespace-nowrap
                    ${isActive ? 'text-white' : 'text-white/40'}
                  `}
                >
                  {t(`nav.steps.${step}`)}
                </span>
              </div>

              {/* Connector line (not after last) */}
              {idx < STEPS.length - 1 && (
                <div
                  className={`w-6 h-0.5 mx-1 mb-5 rounded transition-all duration-200
                    ${isDone ? 'bg-electric' : 'bg-white/20'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
