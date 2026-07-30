import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ActivityLogTable from '../components/ActivityLogTable';

export default function ActivityLogPage() {
  const { user } = useContext(AuthContext);

  // 🔒 Block access for standard consumers
  if (user?.role === 'user') {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded text-sm">
        ⚠️ <strong>Access Denied:</strong> Activity audit logs are restricted to APDCL IT Admins and ESD Officers.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
            📋 System Activity Audit Log
          </h1>
          <p className="text-xs text-gray-500">
            Real-time tracking of consumer filings, agent assignments, and status updates across APDCL ESDs.
          </p>
        </div>
      </div>

      <ActivityLogTable />
    </div>
  );
}