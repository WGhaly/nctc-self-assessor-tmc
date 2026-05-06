import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post('/api/admin/login', { username, password });
      sessionStorage.setItem('adminToken', res.data.token);
      sessionStorage.setItem('adminUsername', res.data.username);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <img
            src="/nctc-logo.png"
            alt="NCTC"
            className="h-10 mx-auto mb-4"
          />
          <h1 className="text-xl font-bold text-nearblack">NCTC Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to view submissions</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-nearblack mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="form-input"
              autoComplete="username"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-nearblack mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-input"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
