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

const STATUSES = ['pending', 'reviewed', 'accepted', 'rejected'];

const STATUS_STYLES = {
  pending:  'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-600',
};

export default function SubmissionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Edit state
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saved, setSaved] = useState(false);

  // Delete state
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem('adminToken')) {
      navigate('/admin');
      return;
    }
    axios.get(`/api/admin/submissions/${id}`, { headers: authHeader() })
      .then(res => {
        setSubmission(res.data);
        setEditStatus(res.data.status || 'pending');
        setEditNotes(res.data.admin_notes || '');
      })
      .catch(err => {
        if (err.response?.status === 401) navigate('/admin');
        else setError('Submission not found or server error.');
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  async function handleSave() {
    setSaving(true);
    setSaveError('');
    setSaved(false);
    try {
      const res = await axios.put(
        `/api/admin/submissions/${id}`,
        { status: editStatus, admin_notes: editNotes },
        { headers: authHeader() }
      );
      setSubmission(res.data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin');
      else setSaveError('Failed to save changes.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm(`Permanently delete this submission from "${submission.full_name}"? This cannot be undone.`)) return;
    setDeleting(true);
    try {
      await axios.delete(`/api/admin/submissions/${id}`, { headers: authHeader() });
      navigate('/admin/dashboard');
    } catch (err) {
      if (err.response?.status === 401) navigate('/admin');
      else {
        alert('Failed to delete submission.');
        setDeleting(false);
      }
    }
  }

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
      <nav className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/nctc-logo.png" alt="NCTC" className="h-8" style={{ filter: 'brightness(0) invert(1)' }} />
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 text-sm font-semibold text-red-300 hover:text-red-200 border border-red-400/40 hover:border-red-300 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          {deleting ? 'Deleting…' : 'Delete Entry'}
        </button>
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-5">

        {/* Detail card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex items-start justify-between mb-6">
            <h1 className="text-xl font-bold text-nearblack">Submission Detail</h1>
            <div className="text-right">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_STYLES[s.status] || 'bg-gray-100 text-gray-600'}`}>
                {s.status || 'pending'}
              </span>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(s.created_at).toLocaleString()}
              </p>
            </div>
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

        {/* Admin actions card */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-sm font-bold text-nearblack mb-4">Admin Actions</h2>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Review Status</label>
            <div className="flex gap-2 flex-wrap">
              {STATUSES.map(st => (
                <button
                  key={st}
                  onClick={() => setEditStatus(st)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize border transition-all ${
                    editStatus === st
                      ? `${STATUS_STYLES[st]} border-transparent ring-2 ring-offset-1 ${
                          st === 'pending'  ? 'ring-yellow-400' :
                          st === 'reviewed' ? 'ring-blue-400'   :
                          st === 'accepted' ? 'ring-green-400'  : 'ring-red-400'
                        }`
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Internal Notes</label>
            <textarea
              value={editNotes}
              onChange={e => setEditNotes(e.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="Add private notes visible only to admins…"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 resize-none focus:border-electric outline-none transition-colors placeholder:text-gray-300"
            />
            <p className="text-xs text-gray-400 text-right mt-0.5">{editNotes.length}/2000</p>
          </div>

          {saveError && <p className="text-red-500 text-sm mb-3">{saveError}</p>}
          {saved && <p className="text-green-600 text-sm mb-3">Changes saved.</p>}

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-electric text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save Changes'}
          </button>
        </div>

      </main>
    </div>
  );
}
