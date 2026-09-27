import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ReportsOverview({ complaints }) {
  // Calculate counts dynamically from complaints state
  const pendingCount = complaints.filter(c => c.status === 'Pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'Resolved').length;
  const totalCount = complaints.length;

  const chartData = {
    labels: ['Pending', 'In Progress', 'Resolved'],
    datasets: [
      {
        data: [pendingCount, inProgressCount, resolvedCount],
        backgroundColor: ['#F36F21', '#3F51B5', '#2E7D32'],
        borderColor: ['#ffffff', '#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <div className="bg-white p-4 sm:p-5 rounded border border-gray-200 shadow-sm mb-6">
      <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4 border-b pb-2">
        📊 Custom Reports & Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center">
          <div className="bg-gray-50 border p-2 sm:p-3 rounded">
            <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase">Total Filed</p>
            <p className="text-xl sm:text-2xl font-bold text-gray-800">{totalCount}</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 p-2 sm:p-3 rounded">
            <p className="text-[10px] sm:text-xs text-orange-600 font-semibold uppercase">Pending</p>
            <p className="text-xl sm:text-2xl font-bold text-orange-600">{pendingCount}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-2 sm:p-3 rounded">
            <p className="text-[10px] sm:text-xs text-blue-600 font-semibold uppercase">In Progress</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600">{inProgressCount}</p>
          </div>
          <div className="bg-green-50 border border-green-200 p-2 sm:p-3 rounded">
            <p className="text-[10px] sm:text-xs text-green-600 font-semibold uppercase">Resolved</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600">{resolvedCount}</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="h-48 flex justify-center">
          {totalCount > 0 ? (
            <Pie data={chartData} options={chartOptions} />
          ) : (
            <p className="text-xs text-gray-400 self-center">No data available for chart</p>
          )}
        </div>
      </div>
    </div>
  );
}