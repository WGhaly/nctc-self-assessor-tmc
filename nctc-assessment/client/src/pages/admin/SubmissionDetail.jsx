import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function authHeader() {
  const token = sessionStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

const SECTOR_LABELS = {
  agriculture: 'Agriculture',
  health: 'Health & Medicine',
  energy: 'Energy',
  ict: 'ICT',
  manufacturing: 'Manufacturing',
  defense: 'Defense & Security',
  environment: 'Environment',
  other: 'Other',
};

export default function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!sessionStorage.getItem('adminToken')) {
      navigate('/admin');
      return;
    }
    axios.get(`/api/admin/submissions/${id}`, { headers: authHeader() })
      .then(res => setSubmission(res.data))
      .catch(err => {
        if (err.response?.status === 401) navigate('/admin');
        else setError('Submission not found or server error.');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="ltr">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="ltr">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Submission not found.'}</p>
          <button onClick={() => navigate('/admin/dashboard')} className="text-electric hover:underline">
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const s = submission;

  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      <nav className="bg-navy text-white px-6 py-4 flex items-center gap-4">
        <img src="/nctc-logo.png" alt="NCTC" className="h-8" style={{ filter: 'brightness(0) invert(1)' }} />
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="text-white/70 hover:text-white text-sm transition-colors"
        >
          ← Back to Dashboard
        </button>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-xl font-bold text-nearblack">Submission Detail</h1>
            <span className="text-xs text-gray-400">
              {new Date(s.created_at).toLocaleString()}
            </span>
          </div>

          {/* Reference ID */}
          <div className="bg-gray-50 rounded-xl p-3 mb-6">
            <p className="text-xs text-gray-500 mb-0.5">Reference ID</p>
            <p className="font-mono text-sm text-nearblack font-semibold">{s.id}</p>
          </div>

          {/* Personal info */}
          <section className="mb-6">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Inventor Information</h2>
            <dl className="space-y-3">
              {[
                ['Full Name', s.full_name],
                ['Phone', s.phone],
                ['Affiliation', s.affiliation],
                ['Invention Title', s.invention_title],
                ['Sector', SECTOR_LABELS[s.sector] || s.sector],
                ['Language', s.language === 'ar' ? 'Arabic' : 'English'],
                ...(s.description ? [['Description', s.description]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex gap-4">
                  <dt className="text-sm text-gray-500 min-w-[120px] shrink-0">{label}</dt>
                  <dd className="text-sm font-medium text-nearblack">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Readiness scores */}
          <section>
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Readiness Assessment</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Technology Readiness', key: 'trl', value: s.trl, max: 9, color: 'bg-electric text-white' },
                { label: 'Manufacturing Readiness', key: 'mrl', value: s.mrl, max: 10, color: 'bg-emerald-600 text-white' },
                { label: 'Commercial Readiness', key: 'crl', value: s.crl, max: 9, color: 'bg-amber-600 text-white' },
              ].map(({ label, key, value, max, color }) => (
                <div key={key} className="text-center p-4 bg-gray-50 rounded-xl">
                  <span className={`${color} text-xs font-bold px-2 py-0.5 rounded-full`}>
                    {key.toUpperCase()}
                  </span>
                  <div className="text-3xl font-bold text-nearblack mt-2">{value}</div>
                  <div className="text-xs text-gray-400">/ {max}</div>
                  <div className="text-xs text-gray-500 mt-1">{label}</div>

                  {/* Simple progress bar */}
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${key === 'trl' ? 'bg-electric' : key === 'mrl' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${(value / max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
