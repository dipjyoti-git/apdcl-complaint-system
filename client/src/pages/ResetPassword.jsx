import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import API from '../api';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    if (password !== confirm) {
      return setError('Passwords do not match.');
    }
    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      setDone(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed. The link may be invalid or expired.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col font-sans">
      {/* Top Portal Header */}
      <header className="bg-[#3F51B5] text-white px-6 py-3 flex justify-between items-center shadow-md border-b-4 border-[#F36F21]">
        <div className="flex items-center gap-3">
          <div className="bg-[#F36F21] text-white text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider">
            CMS Portal
          </div>
          <h1 className="text-sm md:text-base font-bold tracking-wide">
            ASSAM POWER DISTRIBUTION COMPANY LIMITED
          </h1>
        </div>
        <span className="hidden sm:inline-block bg-[#2E7D32] text-white px-3 py-1 rounded text-xs font-semibold">
          COMPLAINT MANAGEMENT SYSTEM
        </span>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-[#2C387E] text-white p-6 text-center">
            <h2 className="text-xl font-bold uppercase tracking-wider">Set New Password</h2>
            <p className="text-xs text-blue-200 mt-1">
              Choose a new password for your account
            </p>
          </div>

          <div className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-xs rounded">
                {error}
              </div>
            )}

            {done ? (
              <div className="text-center space-y-3">
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-3 text-xs rounded">
                  Password reset successful! Redirecting you to sign in…
                </div>
                <Link to="/login" className="text-[#3F51B5] font-bold text-xs hover:underline">
                  Go to Sign In →
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Minimum 6 characters"
                    className="w-full border border-gray-300 p-2.5 text-sm rounded focus:ring-2 focus:ring-[#3F51B5] focus:outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="Repeat the new password"
                    className="w-full border border-gray-300 p-2.5 text-sm rounded focus:ring-2 focus:ring-[#3F51B5] focus:outline-none"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#F36F21] hover:bg-orange-600 text-white font-bold py-2.5 text-sm rounded transition shadow-md uppercase tracking-wider"
                >
                  Reset Password ➔
                </button>
              </form>
            )}

            <div className="text-center pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600">
                <Link to="/login" className="text-[#3F51B5] font-bold hover:underline">
                  ← Back to Sign In
                </Link>
              </p>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400">Developed for APDCL Helpdesk Systems</p>
          </div>
        </div>
      </div>
    </div>
  );
}
