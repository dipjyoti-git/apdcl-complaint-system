import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const MAX_PHOTOS = 5;
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

export default function CreateComplaint() {
  const [form, setForm] = useState({
    title: '',
    consumerNumber: '',
    category: 'Power Supply & Voltage',
    circle: 'Tezpur Circle',
    esd: 'Chariali ESD',
    description: ''
  });
  const [photos, setPhotos] = useState([]); // File objects
  const [previews, setPreviews] = useState([]); // { url, name }
  const [error, setError] = useState('');
  const [photoError, setPhotoError] = useState('');
  const navigate = useNavigate();

  // Clean up object URLs when previews change / component unmounts
  useEffect(() => {
    return () => previews.forEach((p) => URL.revokeObjectURL(p.url));
  }, [previews]);

  const handlePhotoChange = (e) => {
    setPhotoError('');
    const files = Array.from(e.target.files || []);
    if (photos.length + files.length > MAX_PHOTOS) {
      setPhotoError(`You can attach up to ${MAX_PHOTOS} photos.`);
      e.target.value = '';
      return;
    }
    for (const f of files) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        setPhotoError(`"${f.name}" is not a supported image (JPEG/PNG/WebP only).`);
        e.target.value = '';
        return;
      }
      if (f.size > MAX_SIZE) {
        setPhotoError(`"${f.name}" exceeds the 5MB limit.`);
        e.target.value = '';
        return;
      }
    }
    setPhotos((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((f) => ({ url: URL.createObjectURL(f), name: f.name }))
    ]);
    e.target.value = '';
  };

  const removePhoto = (index) => {
    URL.revokeObjectURL(previews[index].url);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.consumerNumber.length !== 12) {
      return setError('Consumer Number must be exactly 12 numeric digits.');
    }

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      photos.forEach((file) => formData.append('photos', file));

      await API.post('/complaints', formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded border border-gray-200 shadow-sm">
      <h2 className="text-sm sm:text-base font-bold text-gray-800 uppercase border-b pb-2 mb-4 break-words">
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

        <div>
          <label className="block uppercase mb-1">
            Attach Photos <span className="normal-case font-normal text-gray-400">(optional, max {MAX_PHOTOS}, 5MB each)</span>
          </label>
          <label className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded p-4 cursor-pointer hover:border-[#3F51B5] hover:bg-blue-50/50 transition">
            <span className="text-gray-500 text-xs font-medium">
              📷 Click to select images (JPEG / PNG / WebP)
            </span>
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
          {photoError && <p className="text-red-600 text-xs mt-1 font-medium">{photoError}</p>}
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {previews.map((p, i) => (
                <div key={i} className="relative w-20 h-20 group">
                  <img
                    src={p.url}
                    alt={p.name}
                    className="w-20 h-20 object-cover rounded border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(i)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center shadow hover:bg-red-700"
                    title="Remove"
                    aria-label={`Remove ${p.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="w-full bg-[#F36F21] hover:bg-orange-600 text-white font-bold py-2.5 min-h-[44px] text-xs uppercase rounded transition shadow-sm">
          Submit Grievance Ticket ➔
        </button>
      </form>
    </div>
  );
}
