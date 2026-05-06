import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useAssessment } from '../context/AssessmentContext';
import Header from '../components/Header';
import ProgressStepper from '../components/ProgressStepper';

const SECTOR_MAP = {
  ar: {
    agriculture: 'الزراعة',
    health: 'الصحة والطب',
    energy: 'الطاقة',
    ict: 'تكنولوجيا المعلومات والاتصالات',
    manufacturing: 'التصنيع والصناعة',
    defense: 'الدفاع والأمن',
    environment: 'البيئة',
    other: 'أخرى',
  },
  en: {
    agriculture: 'Agriculture',
    health: 'Health & Medicine',
    energy: 'Energy',
    ict: 'ICT',
    manufacturing: 'Manufacturing & Industry',
    defense: 'Defense & Security',
    environment: 'Environment',
    other: 'Other',
  },
};

export default function Review() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const { data } = useAssessment();

  const [declared, setDeclared] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit() {
    if (!declared) return;
    setSubmitting(true);
    setError('');

    try {
      const response = await axios.post('/api/submissions', {
        fullName: data.fullName,
        phone: data.phone,
        affiliation: data.affiliation,
        inventionTitle: data.inventionTitle,
        description: data.description,
        sector: data.sector,
        trl: data.trl,
        mrl: data.mrl,
        crl: data.crl,
        language: lang,
        declaration: 'true',
      });
      navigate('/assessment/confirmation', {
        state: {
          referenceNumber: response.data.referenceNumber,
          submittedAt: response.data.submittedAt,
          name: data.fullName,
          trl: data.trl,
          mrl: data.mrl,
          crl: data.crl,
          inventionTitle: data.inventionTitle,
        },
      });
    } catch (err) {
      console.error(err);
      setError(t('review.errorMsg'));
    } finally {
      setSubmitting(false);
    }
  }

  const sectorLabel = SECTOR_MAP[lang]?.[data.sector] || data.sector;

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <Header />
      <ProgressStepper current={5} />

      <main className="flex-1 px-4 pb-12 max-w-2xl mx-auto w-full">
        <h1 className="text-white text-xl font-bold mb-1">{t('review.title')}</h1>
        <p className="text-white/60 text-sm mb-6">{t('review.subtitle')}</p>

        {/* Personal info card */}
        <div className="card p-5 mb-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
            {t('review.yourInfo')}
          </h2>
          <dl className="space-y-2">
            {[
              [t('review.name'), data.fullName],
              [t('review.phone'), data.phone],
              [t('review.affiliation'), data.affiliation],
              [t('review.invention'), data.inventionTitle],
              [t('review.sector'), sectorLabel],
              ...(data.description ? [[t('review.description'), data.description]] : []),
            ].map(([label, value]) => (
              <div key={label} className="flex gap-3">
                <dt className="text-gray-500 text-sm min-w-[100px] shrink-0">{label}</dt>
                <dd className="text-nearblack text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Declaration card */}
        <div className="card p-5 mb-6">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
            {t('review.declarationTitle')}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {t('review.declarationText')}
          </p>
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={declared}
              onChange={e => setDeclared(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-electric mt-0.5 shrink-0 cursor-pointer"
            />
            <span className="text-sm font-semibold text-nearblack">
              {t('review.declarationLabel')}
            </span>
          </label>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => navigate(-1)}
            className="btn-secondary px-6"
          >
            {i18n.language === 'ar' ? '→' : '←'} {t('review.backBtn')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={!declared || submitting}
            className="btn-primary flex-1"
          >
            {submitting ? t('review.submitting') : t('review.submitBtn')}
          </button>
        </div>
      </main>
    </div>
  );
}
