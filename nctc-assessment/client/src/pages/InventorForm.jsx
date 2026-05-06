import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAssessment } from '../context/AssessmentContext';
import Header from '../components/Header';
import ProgressStepper from '../components/ProgressStepper';

const SECTORS = ['agriculture', 'health', 'energy', 'ict', 'manufacturing', 'defense', 'environment', 'other'];

function validate(fields, t) {
  const errors = {};
  if (!fields.fullName || fields.fullName.trim().length < 2) errors.fullName = t('form.errors.fullName');
  if (!fields.phone || !/^[\d\s\+\-\(\)]{5,30}$/.test(fields.phone.trim())) errors.phone = t('form.errors.phone');
  if (!fields.affiliation || fields.affiliation.trim().length < 2) errors.affiliation = t('form.errors.affiliation');
  if (!fields.inventionTitle || fields.inventionTitle.trim().length < 2) errors.inventionTitle = t('form.errors.inventionTitle');
  if (fields.description && fields.description.length > 300) errors.description = t('form.errors.description');
  if (!fields.sector) errors.sector = t('form.errors.sector');
  if (fields.sector === 'other' && !fields.sectorOther?.trim()) errors.sectorOther = t('form.errors.sectorOther');
  return errors;
}

export default function InventorForm() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data, updateData } = useAssessment();

  const [fields, setFields] = useState({
    fullName: data.fullName,
    phone: data.phone,
    affiliation: data.affiliation,
    inventionTitle: data.inventionTitle,
    description: data.description,
    sector: data.sector,
    sectorOther: data.sectorOther || '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(fields, t);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstErr = document.querySelector('[data-error]');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    updateData(fields);
    navigate('/assessment/trl');
  }

  const isAr = i18n.language === 'ar';

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <Header />
      <ProgressStepper current={1} />

      <main className="flex-1 flex items-start justify-center px-4 pb-12">
        <div className="card w-full max-w-xl p-6 sm:p-8">
          <h1 className="text-xl font-bold text-nearblack mb-1">{t('form.title')}</h1>
          <p className="text-gray-500 text-sm mb-6">{t('form.subtitle')}</p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-nearblack mb-1">
                {t('form.fullName')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={fields.fullName}
                onChange={handleChange}
                placeholder={t('form.fullNamePlaceholder')}
                className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
                autoComplete="name"
              />
              {errors.fullName && (
                <p data-error className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-nearblack mb-1">
                {t('form.phone')} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={fields.phone}
                onChange={handleChange}
                placeholder={t('form.phonePlaceholder')}
                className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                autoComplete="tel"
                dir="ltr"
              />
              {errors.phone && (
                <p data-error className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Affiliation */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-nearblack mb-1">
                {t('form.affiliation')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="affiliation"
                value={fields.affiliation}
                onChange={handleChange}
                placeholder={t('form.affiliationPlaceholder')}
                className={`form-input ${errors.affiliation ? 'form-input-error' : ''}`}
              />
              {errors.affiliation && (
                <p data-error className="text-red-500 text-xs mt-1">{errors.affiliation}</p>
              )}
            </div>

            {/* Invention Title */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-nearblack mb-1">
                {t('form.inventionTitle')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="inventionTitle"
                value={fields.inventionTitle}
                onChange={handleChange}
                placeholder={t('form.inventionTitlePlaceholder')}
                className={`form-input ${errors.inventionTitle ? 'form-input-error' : ''}`}
              />
              {errors.inventionTitle && (
                <p data-error className="text-red-500 text-xs mt-1">{errors.inventionTitle}</p>
              )}
            </div>

            {/* Sector */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-nearblack mb-1">
                {t('form.sector')} <span className="text-red-500">*</span>
              </label>
              <select
                name="sector"
                value={fields.sector}
                onChange={handleChange}
                className={`form-input ${errors.sector ? 'form-input-error' : ''}`}
              >
                <option value="">{t('form.sectorPlaceholder')}</option>
                {SECTORS.map(s => (
                  <option key={s} value={s}>{t(`form.sectors.${s}`)}</option>
                ))}
              </select>
              {errors.sector && (
                <p data-error className="text-red-500 text-xs mt-1">{errors.sector}</p>
              )}
              {fields.sector === 'other' && (
                <div className="mt-3">
                  <input
                    type="text"
                    name="sectorOther"
                    value={fields.sectorOther}
                    onChange={handleChange}
                    placeholder={t('form.sectorOtherPlaceholder')}
                    className={`form-input ${errors.sectorOther ? 'form-input-error' : ''}`}
                    autoFocus
                  />
                  {errors.sectorOther && (
                    <p data-error className="text-red-500 text-xs mt-1">{errors.sectorOther}</p>
                  )}
                </div>
              )}
            </div>

            {/* Description (optional) */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-nearblack mb-1">
                {t('form.description')}
              </label>
              <textarea
                name="description"
                value={fields.description}
                onChange={handleChange}
                placeholder={t('form.descriptionPlaceholder')}
                rows={3}
                maxLength={300}
                className={`form-input resize-none ${errors.description ? 'form-input-error' : ''}`}
              />
              <div className="flex justify-between">
                {errors.description ? (
                  <p data-error className="text-red-500 text-xs mt-1">{errors.description}</p>
                ) : <span />}
                <span className="text-gray-400 text-xs">{fields.description.length}/300</span>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full text-base">
              {t('form.nextBtn')} {isAr ? '←' : '→'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
