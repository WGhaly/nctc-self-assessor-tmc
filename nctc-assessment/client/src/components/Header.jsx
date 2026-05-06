import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function Header({ showLogo = true }) {
  const { t, i18n: i18nObj } = useTranslation();
  const isAr = i18nObj.language === 'ar';

  function toggleLanguage() {
    const next = isAr ? 'en' : 'ar';
    i18n.changeLanguage(next);
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = next;
  }

  return (
    <header className="relative z-10 flex items-center justify-between px-6 py-4">
      {showLogo && (
        <img
          src="/nctc-logo.png"
          alt="NCTC Logo"
          className="h-10 w-auto"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
      )}
      {!showLogo && <div />}

      <button
        onClick={toggleLanguage}
        className="text-sm font-semibold text-white/70 hover:text-white border border-white/30 hover:border-white/60 px-4 py-2 rounded-lg transition-all duration-200"
        aria-label="Toggle language"
      >
        {isAr ? 'EN' : 'عربي'}
      </button>
    </header>
  );
}
