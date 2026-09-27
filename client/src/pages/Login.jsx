import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
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
          
          {/* Card Title Banner */}
          <div className="bg-[#2C387E] text-white p-4 sm:p-6 text-center">
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider">
              Complaint Management System
            </h2>
            <p className="text-xs text-blue-200 mt-1">
              Sign in to access your grievance portal
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-xs rounded">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Email Address / User ID
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

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full border border-gray-300 p-2.5 text-sm rounded focus:ring-2 focus:ring-[#3F51B5] focus:outline-none"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#F36F21] hover:bg-orange-600 text-white font-bold py-2.5 min-h-[44px] text-sm rounded transition shadow-md uppercase tracking-wider"
            >
              Sign In ➔
            </button>

            <div className="flex justify-between text-xs pt-1">
              <Link to="/forgot-password" className="text-[#3F51B5] font-semibold hover:underline">
                Forgot password?
              </Link>
              <Link to="/faq" className="text-[#3F51B5] font-semibold hover:underline">
                FAQ & Helpline
              </Link>
            </div>

            <div className="text-center pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#3F51B5] font-bold hover:underline">
                  Register Consumer Account
                </Link>
              </p>
            </div>
          </form>

          {/* Footer Branding */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 text-center">
            <p className="text-[10px] text-gray-400">
              Developed for APDCL Helpdesk Systems
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}