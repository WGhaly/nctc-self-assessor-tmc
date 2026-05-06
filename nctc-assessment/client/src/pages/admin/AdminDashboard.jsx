import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SECTORS = [
  { value: '', label: 'All Sectors' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'health', label: 'Health & Medicine' },
  { value: 'energy', label: 'Energy' },
  { value: 'ict', label: 'ICT' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'defense', label: 'Defense & Security' },
  { value: 'environment', label: 'Environment' },
  { value: 'other', label: 'Other' },
];

const STATUSES = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
];

const STATUS_STYLES = {
  pending:  'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-600',
};

function authHeader() {
  const token = sessionStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Filters
  const [sector, setSector] = useState('');
  const [status, setStatus] = useState('');
  const [trl, setTrl] = useState('');
  const [mrl, setMrl] = useState('');
  const [crl, setCrl] = useState('');

  const username = sessionStorage.getItem('adminUsername') || 'Admin';

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (sector) params.sector = sector;
      if (status) params.status = status;
      if (trl) params.trl = trl;
      if (mrl) params.mrl = mrl;
      if (crl) params.crl = crl;

      const res = await axios.get('/api/admin/submissions', {
        headers: authHeader(),
        params,
      });
      setSubmissions(res.data.submissions);
      setTotal(res.data.total);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/admin');
      } else {
        setError('Failed to load submissions.');
      }
    } finally {
      setLoading(false);
    }
  }, [sector, status, trl, mrl, crl, navigate]);

  useEffect(() => {
    if (!sessionStorage.getItem('adminToken')) {
      navigate('/admin');
      return;
    }
    fetchSubmissions();
  }, [fetchSubmissions, navigate]);

  function handleLogout() {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUsername');
    navigate('/admin');
  }

  function handleExportCsv() {
    const params = new URLSearchParams();
    if (sector) params.set('sector', sector);
    if (status) params.set('status', status);
    if (trl) params.set('trl', trl);
    if (mrl) params.set('mrl', mrl);
    if (crl) params.set('crl', crl);
    axios.get(`/api/admin/submissions/export/csv?${params}`, {
      headers: authHeader(),
      responseType: 'blob',
    }).then(res => {
      const url = URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = `nctc-submissions-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }).catch(() => alert('Export failed.'));
  }

  async function handleDelete(id, name) {
    if (!window.confirm(`Delete submission from "${name}"? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await axios.delete(`/api/admin/submissions/${id}`, { headers: authHeader() });
      setSubmissions(prev => prev.filter(s => s.id !== id));
      setTotal(prev => prev - 1);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/admin');
      } else {
        alert('Failed to delete submission.');
      }
    } finally {
      setDeletingId(null);
    }
  }

  function clearFilters() {
    setSector(''); setStatus(''); setTrl(''); setMrl(''); setCrl('');
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="ltr">
      {/* Top nav */}
      <nav className="bg-navy text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src="/nctc-logo.png"
            alt="NCTC"
            className="h-8"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
          <span className="font-bold text-lg">Admin Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm">{username}</span>
          <button onClick={handleLogout} className="text-sm text-white/70 hover:text-white border border-white/30 px-3 py-1.5 rounded-lg transition-colors">
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters row */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 flex flex-wrap gap-3 items-end">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Sector</label>
            <select
              value={sector}
              onChange={e => setSector(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:border-electric outline-none"
            >
              {SECTORS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:border-electric outline-none"
            >
              {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {[
            { label: 'TRL', value: trl, set: setTrl, max: 9 },
            { label: 'MRL', value: mrl, set: setMrl, max: 10 },
            { label: 'CRL', value: crl, set: setCrl, max: 9 },
          ].map(({ label, value, set, max }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
              <select
                value={value}
                onChange={e => set(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:border-electric outline-none"
              >
                <option value="">All</option>
                {Array.from({ length: max }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          ))}

          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 px-3 py-2 rounded-lg transition-colors"
          >
            Clear Filters
          </button>

          <div className="ms-auto flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {total} submission{total !== 1 ? 's' : ''}
            </span>
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-2 bg-electric text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No submissions found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Date', 'Name', 'Affiliation', 'Invention Title', 'Sector', 'Status', 'TRL', 'MRL', 'CRL', ''].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {submissions.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(s.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-nearblack whitespace-nowrap">{s.full_name}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[150px] truncate">{s.affiliation}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">{s.invention_title}</td>
                      <td className="px-4 py-3">
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full capitalize">{s.sector}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_STYLES[s.status] || 'bg-gray-100 text-gray-600'}`}>
                          {s.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-electric/10 text-electric font-bold text-xs px-2 py-0.5 rounded-full">{s.trl}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-emerald-100 text-emerald-700 font-bold text-xs px-2 py-0.5 rounded-full">{s.mrl}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="bg-amber-100 text-amber-700 font-bold text-xs px-2 py-0.5 rounded-full">{s.crl}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 whitespace-nowrap">
                          <button
                            onClick={() => navigate(`/admin/submissions/${s.id}`)}
                            className="text-electric hover:text-blue-700 text-xs font-semibold transition-colors"
                          >
                            View →
                          </button>
                          <button
                            onClick={() => handleDelete(s.id, s.full_name)}
                            disabled={deletingId === s.id}
                            className="text-red-400 hover:text-red-600 text-xs font-semibold transition-colors disabled:opacity-40"
                          >
                            {deletingId === s.id ? '...' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
