import React, { useEffect, useState } from 'react';
import API from '../api';

export default function ActivityLogTable() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await API.get('/complaints/activity-logs');
        setLogs(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
  }, []);

  const formatTime = (ts) => {
    return new Date(ts).toISOString().replace('T', ' ').substring(0, 19);
  };

  return (
    <div className="bg-white rounded border border-gray-200 shadow-sm mb-6 overflow-hidden">
      <div className="bg-[#3F51B5] text-white px-4 py-2 font-bold text-xs uppercase tracking-wider">
        Activity Log
      </div>
      <table className="w-full text-left text-xs">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200 text-gray-600">
            <th className="p-3 font-semibold w-48">Timestamp</th>
            <th className="p-3 font-semibold">Activity</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {logs.length === 0 ? (
            <tr>
              <td colSpan="2" className="p-3 text-gray-400 text-center">
                No recent activity logged.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr key={log._id} className="hover:bg-gray-50">
                <td className="p-3 font-mono text-gray-500">{formatTime(log.createdAt)}</td>
                <td className="p-3 text-gray-800">{log.activity}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}