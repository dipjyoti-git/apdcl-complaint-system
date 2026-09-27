import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ReportsOverview from '../components/ReportsOverview';
import API from '../api';

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [agents, setAgents] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchComplaints = async () => {
    try {
      const { data } = await API.get('/complaints');
      setComplaints(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAgents = async () => {
    if (user?.role === 'admin') {
      try {
        const { data } = await API.get('/users/agents');
        setAgents(data);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchComplaints();
    fetchAgents();
  }, [user]);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/complaints/${id}/status`, { status });
      fetchComplaints();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssignAgent = async (complaintId, agentId) => {
    if (!agentId) return;
    await API.put(`/complaints/${complaintId}/assign`, { agentId });
    fetchComplaints();
  };

  const formatTimestamp = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Photos are stored server-side as '/uploads/<file>'; build an absolute URL
  // from the API base (works for both localhost dev and the Render backend)
  const fileUrl = (p) => `${API.defaults.baseURL.replace(/\/api$/, '')}${p}`;

  return (
    <div className="max-w-6xl mx-auto">
      {/* 1. Custom Reports Overview Chart */}
      <ReportsOverview complaints={complaints} />

      {/* 3. Registered Complaints Header */}
      <div className="flex justify-between items-center mb-4 mt-6">
        <h2 className="text-lg font-bold text-gray-800">
          Registered Complaints ({complaints.length})
        </h2>
        {user?.role === 'user' && (
          <Link to="/create" className="bg-[#F36F21] hover:bg-orange-600 text-white px-4 py-2 rounded text-xs font-semibold shadow-sm">
            + File New Complaint
          </Link>
        )}
      </div>

      {/* 4. Complaints List Cards */}
      <div className="grid gap-4">
        {complaints.length === 0 ? (
          <div className="bg-white p-6 rounded text-center text-gray-500 border">
            No complaints logged in the system.
          </div>
        ) : (
          complaints.map((c) => (
            <div key={c._id} className="border p-4 rounded shadow-sm bg-white hover:border-gray-300 transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base text-gray-800">{c.title}</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">
                    📅 Created: <span className="font-mono">{formatTimestamp(c.createdAt)}</span>
                    {c.consumerNumber && <span className="ml-3 font-mono font-semibold text-blue-600">ID: {c.consumerNumber}</span>}
                  </p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded ${
                  c.status === 'Resolved' ? 'bg-green-100 text-green-800' : 
                  c.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {c.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-2">{c.description}</p>

              {/* Attached Photos */}
              {c.photos && c.photos.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {c.photos.map((p, i) => (
                    <a key={i} href={fileUrl(p)} target="_blank" rel="noreferrer" title="Open full image">
                      <img
                        src={fileUrl(p)}
                        alt={`Attachment ${i + 1}`}
                        className="w-20 h-20 object-cover rounded border border-gray-200 hover:opacity-80 hover:border-[#3F51B5] transition"
                      />
                    </a>
                  ))}
                </div>
              )}

              <div className="text-xs text-gray-500 mt-3 pt-2 border-t flex flex-wrap gap-4">
                <span><strong>Category:</strong> {c.category}</span>
                {c.user?.name && <span><strong>Consumer:</strong> {c.user.name} ({c.user.email})</span>}
                <span>
                  <strong>Assigned To:</strong> {c.assignedTo ? c.assignedTo.name : <em className="text-red-500">Unassigned</em>}
                </span>
              </div>

              {/* Admin Assignment Controls */}
              {user?.role === 'admin' && (
                <div className="mt-3 pt-2 border-t flex items-center gap-2 text-xs">
                  <label className="font-medium text-gray-700">Assign Agent:</label>
                  <select 
                    defaultValue={c.assignedTo?._id || ""}
                    onChange={(e) => handleAssignAgent(c._id, e.target.value)}
                    className="border p-1 rounded text-xs bg-gray-50"
                  >
                    <option value="" disabled>Select Agent</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>{agent.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Status Update Actions */}
              {(user?.role === 'agent' || user?.role === 'admin') && (
                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={() => handleStatusChange(c._id, 'In Progress')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs rounded font-medium"
                  >
                    Mark In Progress
                  </button>
                  <button 
                    onClick={() => handleStatusChange(c._id, 'Resolved')}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-xs rounded font-medium"
                  >
                    Mark Resolved
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}