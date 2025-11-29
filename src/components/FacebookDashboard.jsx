import React, { useMemo } from 'react';
import { useData } from '../context/DataContext';
import { calculateFacebookStats, getTopPosts } from '../utils/dataProcessing';
import BarChartComponent from './Charts/BarChartComponent';
import TopPostsTable from './TopPostsTable';
import { ThumbsUp, MessageCircle, Share2, MousePointer2, Image, Video, Play, FileText } from 'lucide-react';

const StatRow = ({ label, value, icon: Icon, color }) => (
    <div className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
        <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${color}`}>
                <Icon size={18} className="text-white" />
            </div>
            <span className="text-slate-600 font-medium">{label}</span>
        </div>
        <span className="text-lg font-bold text-slate-800">{value}</span>
    </div>
);

const FacebookDashboard = () => {
    const { data, fileName } = useData();

    const stats = useMemo(() => calculateFacebookStats(data), [data]);
    const topPosts = useMemo(() => getTopPosts(data, 'Reach', 10), [data]);

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + ' M';
        if (num >= 1000) return (num / 1000).toFixed(1) + ' K';
        return num.toLocaleString();
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Facebook Analytics</h2>
                    <p className="text-slate-500">Performance Report for <span className="font-medium text-indigo-600">{fileName}</span></p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Stats List */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                    <div className="p-4 bg-slate-900 text-white">
                        <h3 className="font-semibold">Performance Summary</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <StatRow label="Total Published Posts" value={stats.totalPosts.toLocaleString()} icon={FileText} color="bg-slate-600" />
                        <StatRow label="Sum of Likes" value={formatNumber(stats.likes)} icon={ThumbsUp} color="bg-blue-500" />
                        <StatRow label="Sum of Comments" value={formatNumber(stats.comments)} icon={MessageCircle} color="bg-indigo-500" />
                        <StatRow label="Sum of Shares" value={formatNumber(stats.shares)} icon={Share2} color="bg-violet-500" />
                        <StatRow label="Sum of Link Clicks" value={formatNumber(stats.linkClicks)} icon={MousePointer2} color="bg-emerald-500" />
                        <StatRow label="Sum of Photo Views" value={formatNumber(stats.photoViews)} icon={Image} color="bg-amber-500" />
                        <StatRow label="Sum of Video Views (3 sec)" value={formatNumber(stats.videoViews)} icon={Video} color="bg-rose-500" />
                        <StatRow label="Sum of REELS PLAYS" value={formatNumber(stats.reelsPlays)} icon={Play} color="bg-pink-500" />
                    </div>
                </div>

                {/* Right Column: Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Published Posts by Post Type</h3>
                    <div className="h-[400px]">
                        <BarChartComponent
                            data={stats.postTypes}
                            xKey="name"
                            yKey="value"
                            color="#0ea5e9"
                        />
                    </div>
                </div>
            </div>

            {/* Top Posts Table */}
            <TopPostsTable data={topPosts} />
        </div>
    );
};

export default FacebookDashboard;
