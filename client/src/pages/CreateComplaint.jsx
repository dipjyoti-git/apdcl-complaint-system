import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function CreateComplaint() {
  const [form, setForm] = useState({
    title: '',
    consumerNumber: '',
    category: 'Power Supply & Voltage',
    circle: 'Tezpur Circle',
    esd: 'Chariali ESD',
    description: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.consumerNumber.length !== 12) {
      return setError('Consumer Number must be exactly 12 numeric digits.');
    }

    try {
      await API.post('/complaints', form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded border border-gray-200 shadow-sm">
      <h2 className="text-base font-bold text-gray-800 uppercase border-b pb-2 mb-4">
        ⚡ File Electrical Grievance / Complaint
      </h2>

      {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded mb-4 border-l-4 border-red-500">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-gray-700">
        <div>
          <label className="block uppercase mb-1">12-Digit Consumer Number</label>
          <input 
            type="text" 
            placeholder="e.g. 107010048899" 
            maxLength={12}
            className="w-full border p-2.5 rounded font-mono text-sm focus:ring-2 focus:ring-[#3F51B5] focus:outline-none"
            onChange={(e) => setForm({...form, consumerNumber: e.target.value})} 
            required 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block uppercase mb-1">Sub-Division (ESD)</label>
            <select 
              className="w-full border p-2.5 rounded bg-white text-xs"
              onChange={(e) => setForm({...form, esd: e.target.value})}
            >
              <option value="Chariali ESD">Chariali ESD</option>
              <option value="Biswanath ESD">Biswanath ESD</option>
              <option value="Tezpur Town ESD">Tezpur Town ESD</option>
            </select>
          </div>

          <div>
            <label className="block uppercase mb-1">Complaint Category</label>
            <select 
              className="w-full border p-2.5 rounded bg-white text-xs"
              onChange={(e) => setForm({...form, category: e.target.value})}
            >
              <option value="Power Supply & Voltage">Power Supply & Voltage (Tripping/Low Voltage)</option>
              <option value="Billing & Metering">Billing & Metering (High Bill/Smart Meter)</option>
              <option value="Infrastructure Failure">Infrastructure (Pole/Transformer/Loose Wire)</option>
              <option value="New Connection / Transfer">New Connection / Name Transfer</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block uppercase mb-1">Issue Subject / Title</label>
          <input 
            type="text" 
            placeholder="e.g., Frequent Tripping & Low Voltage in Block C" 
            className="w-full border p-2.5 rounded text-xs focus:ring-2 focus:ring-[#3F51B5] focus:outline-none"
            onChange={(e) => setForm({...form, title: e.target.value})} 
            required 
          />
        </div>

        <div>
          <label className="block uppercase mb-1">Detailed Description</label>
          <textarea 
            placeholder="Describe the exact issue..." 
            className="w-full border p-2.5 rounded text-xs focus:ring-2 focus:ring-[#3F51B5] focus:outline-none" 
            rows="4"
            onChange={(e) => setForm({...form, description: e.target.value})} 
            required 
          />
        </div>

        <button className="w-full bg-[#F36F21] hover:bg-orange-600 text-white font-bold py-2.5 text-xs uppercase rounded transition shadow-sm">
          Submit Grievance Ticket ➔
        </button>
      </form>
    </div>
  );
}