import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import StatsCard from './StatsCard';
import BarChartComponent from './Charts/BarChartComponent';
import LineChartComponent from './Charts/LineChartComponent';
import PieChartComponent from './Charts/PieChartComponent';
import FacebookDashboard from './FacebookDashboard';
import { calculateStats, detectFacebookData } from '../utils/dataProcessing';
import { BarChart3, LineChart, PieChart, Activity, Hash, TrendingUp, TrendingDown } from 'lucide-react';

const Dashboard = () => {
    const { data, fileName, columns, clearData } = useData();
    const [selectedX, setSelectedX] = useState(columns[0] || '');
    const [selectedY, setSelectedY] = useState(columns[1] || columns[0] || '');
    const [chartType, setChartType] = useState('bar');

    const isFacebookData = useMemo(() => detectFacebookData(columns), [columns]);
    const stats = useMemo(() => calculateStats(data, selectedY), [data, selectedY]);

    if (!data || data.length === 0) return null;

    if (isFacebookData) {
        return (
            <div className="relative">
                <button
                    onClick={clearData}
                    className="absolute top-0 right-0 m-6 z-10 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                    Clear Data
                </button>
                <FacebookDashboard />
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
                    <p className="text-slate-500">Analyzing: <span className="font-medium text-indigo-600">{fileName}</span></p>
                </div>
                <button
                    onClick={clearData}
                    className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                    Clear Data
                </button>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">X-Axis (Category)</label>
                    <select
                        value={selectedX}
                        onChange={(e) => setSelectedX(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    >
                        {columns.map(col => <option key={col} value={col}>{col}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Y-Axis (Value)</label>
                    <select
                        value={selectedY}
                        onChange={(e) => setSelectedY(e.target.value)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    >
                        {columns.map(col => <option key={col} value={col}>{col}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Chart Type</label>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                        <button
                            onClick={() => setChartType('bar')}
                            className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all ${chartType === 'bar' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <BarChart3 size={18} className="mr-2" /> Bar
                        </button>
                        <button
                            onClick={() => setChartType('line')}
                            className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all ${chartType === 'line' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <LineChart size={18} className="mr-2" /> Line
                        </button>
                        <button
                            onClick={() => setChartType('pie')}
                            className={`flex-1 flex items-center justify-center py-2 rounded-md text-sm font-medium transition-all ${chartType === 'pie' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <PieChart size={18} className="mr-2" /> Pie
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            {stats && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard title="Total Sum" value={stats.sum.toLocaleString()} icon={Activity} color="bg-indigo-500" />
                    <StatsCard title="Average" value={stats.avg.toFixed(2)} icon={TrendingUp} color="bg-emerald-500" />
                    <StatsCard title="Minimum" value={stats.min.toLocaleString()} icon={TrendingDown} color="bg-rose-500" />
                    <StatsCard title="Maximum" value={stats.max.toLocaleString()} icon={TrendingUp} color="bg-amber-500" />
                </div>
            )}

            {/* Main Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 min-h-[400px]">
                <h3 className="text-lg font-semibold text-slate-800 mb-6">Visualization</h3>
                {chartType === 'bar' && <BarChartComponent data={data} xKey={selectedX} yKey={selectedY} />}
                {chartType === 'line' && <LineChartComponent data={data} xKey={selectedX} yKey={selectedY} />}
                {chartType === 'pie' && <PieChartComponent data={data} nameKey={selectedX} dataKey={selectedY} />}
            </div>
        </div>
    );
};

export default Dashboard;
