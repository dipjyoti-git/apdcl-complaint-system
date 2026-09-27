import { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCopied(false);
    try {
      const { data } = await API.post('/auth/forgot-password', { email });
      setResetLink(data.resetLink);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(resetLink);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col font-sans">
      {/* Top Portal Header */}
      <header className="bg-[#3F51B5] text-white px-4 sm:px-6 py-3 flex justify-between items-center gap-2 shadow-md border-b-4 border-[#F36F21]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="bg-[#F36F21] text-white text-xs font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shrink-0">
            CMS Portal
          </div>
          <h1 className="text-xs sm:text-sm md:text-base font-bold tracking-wide leading-tight">
            ASSAM POWER DISTRIBUTION COMPANY LIMITED
          </h1>
        </div>
        <span className="hidden sm:inline-block bg-[#2E7D32] text-white px-3 py-1 rounded text-xs font-semibold shrink-0">
          COMPLAINT MANAGEMENT SYSTEM
        </span>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-[#2C387E] text-white p-4 sm:p-6 text-center">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider">Reset Password</h2>
            <p className="text-xs text-blue-200 mt-1">
              Enter your registered email to get a reset link
            </p>
          </div>

          <div className="p-4 sm:p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-xs rounded">
                {error}
              </div>
            )}

            {!resetLink ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="consumer@apdcl.org"
                    className="w-full border border-gray-300 p-2.5 text-sm rounded focus:ring-2 focus:ring-[#3F51B5] focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#F36F21] hover:bg-orange-600 text-white font-bold py-2.5 min-h-[44px] text-sm rounded transition shadow-md uppercase tracking-wider"
                >
                  Send Reset Link ➔
                </button>
              </form>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-gray-600">
                  Your password reset link (valid for <strong>15 minutes</strong>):
                </p>
                <div className="bg-gray-50 border border-gray-200 rounded p-3 flex items-start gap-2">
                  <p className="text-xs text-blue-700 break-all flex-1 font-mono">{resetLink}</p>
                  <button
                    onClick={copyLink}
                    className="shrink-0 bg-[#3F51B5] hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded"
                  >
                    {copied ? 'Copied ✓' : 'Copy'}
                  </button>
                </div>
                <div className="bg-amber-50 border-l-4 border-amber-400 text-amber-800 p-3 text-xs rounded">
                  Email service is not configured — use the link above to reset your password.
                </div>
              </div>
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
