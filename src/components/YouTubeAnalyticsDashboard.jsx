import React, { useState, useEffect, useMemo } from 'react';
import BarChartComponent from './Charts/BarChartComponent';
import LineChartComponent from './Charts/LineChartComponent';
import PieChartComponent from './Charts/PieChartComponent';
import { Youtube, Eye, ThumbsUp, MessageCircle, UserPlus, TrendingUp, Video } from 'lucide-react';

const MetricCard = ({ title, value, change, icon: IconComponent, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${color}`}>
                <IconComponent size={24} className="text-white" />
            </div>
            <div className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </div>
        </div>
        <h3 className="text-sm text-slate-500 font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
);

const YouTubeAnalyticsDashboard = ({ isDemo = true }) => {
    const [analyticsData, setAnalyticsData] = useState(null);

    const fetchYouTubeAnalytics = async () => {
        try {
            // TODO: Implement actual YouTube API call
            // const response = await fetch('/api/youtube-analytics', {
            //   headers: { 
            //     'Authorization': `Bearer ${accessToken}`,
            //     'Content-Type': 'application/json'
            //   }
            // });
            // const data = await response.json();
            // setAnalyticsData(processYouTubeData(data));
        } catch (error) {
            console.error('Error fetching YouTube analytics:', error);
        }
    };

    // Demo data for Mizzima YouTube channel
    const demoData = useMemo(() => ({
        channelMetrics: {
            subscribers: 458234,
            totalViews: 125678901,
            totalVideos: 3456,
            avgViewDuration: '4:32',
            subscribersGained: 2345,
            viewsGained: 876543
        },
        recentVideos: [
            { title: 'Breaking: Myanmar Political Update', views: 45678, likes: 2345, comments: 567, duration: '12:34' },
            { title: 'Special Report: Economic Analysis', views: 38901, likes: 1987, comments: 432, duration: '15:22' },
            { title: 'Interview: Opposition Leader', views: 34567, likes: 1765, comments: 389, duration: '25:18' },
            { title: 'Daily News Bulletin - Nov 28', views: 29876, likes: 1543, comments: 298, duration: '8:45' },
            { title: 'In-Depth: Regional Tensions', views: 25432, likes: 1321, comments: 245, duration: '18:56' }
        ],
        dailyViews: [
            { date: 'Nov 22', views: 45678 },
            { date: 'Nov 23', views: 52341 },
            { date: 'Nov 24', views: 48902 },
            { date: 'Nov 25', views: 56789 },
            { date: 'Nov 26', views: 61234 },
            { date: 'Nov 27', views: 58901 },
            { date: 'Nov 28', views: 63456 }
        ],
        trafficSources: [
            { name: 'YouTube Search', value: 45230 },
            { name: 'Suggested Videos', value: 38901 },
            { name: 'Browse Features', value: 29876 },
            { name: 'External', value: 15432 },
            { name: 'Direct/Unknown', value: 8765 }
        ],
        demographics: {
            age: [
                { range: '18-24', value: 8.5 },
                { range: '25-34', value: 32.4 },
                { range: '35-44', value: 28.7 },
                { range: '45-54', value: 18.3 },
                { range: '55-64', value: 9.2 },
                { range: '65+', value: 2.9 }
            ],
            geography: [
                { country: 'Myanmar', viewers: 98234 },
                { country: 'Thailand', viewers: 45678 },
                { country: 'United States', viewers: 23456 },
                { country: 'United Kingdom', viewers: 12345 },
                { country: 'Australia', viewers: 8901 }
            ]
        },
        topVideos: [
            { title: 'Exclusive Investigation Report', views: 234567, label: 'Investigation' },
            { title: 'Live Coverage: Major Event', views: 198765, label: 'Live Event' },
            { title: 'Documentary: Hidden Stories', views: 165432, label: 'Documentary' },
            { title: 'Analysis: Political Crisis', views: 143210, label: 'Analysis' },
            { title: 'Interview Series Ep 1', views: 128901, label: 'Interview' }
        ]
    }), []);

    useEffect(() => {
        if (isDemo) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setAnalyticsData(demoData);
        } else {
            fetchYouTubeAnalytics();
        }
    }, [isDemo, demoData]);

    if (!analyticsData) return <div>Loading...</div>;

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-600 rounded-lg">
                            <Youtube size={28} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">YouTube Analytics</h2>
                    </div>
                    <p className="text-slate-500">Mizzima News Channel Performance {isDemo && '(Demo Mode)'}</p>
                </div>
            </div>

            {/* Channel Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                    title="Total Subscribers"
                    value={analyticsData.channelMetrics.subscribers.toLocaleString()}
                    change={5.2}
                    icon={UserPlus}
                    color="bg-red-600"
                />
                <MetricCard
                    title="Total Views"
                    value={(analyticsData.channelMetrics.totalViews / 1000000).toFixed(1) + 'M'}
                    change={12.8}
                    icon={Eye}
                    color="bg-blue-600"
                />
                <MetricCard
                    title="Total Videos"
                    value={analyticsData.channelMetrics.totalVideos.toLocaleString()}
                    change={3.4}
                    icon={Video}
                    color="bg-purple-600"
                />
                <MetricCard
                    title="Subscribers (Last 28 Days)"
                    value={`+${analyticsData.channelMetrics.subscribersGained.toLocaleString()}`}
                    change={18.5}
                    icon={TrendingUp}
                    color="bg-green-600"
                />
                <MetricCard
                    title="Views (Last 28 Days)"
                    value={analyticsData.channelMetrics.viewsGained.toLocaleString()}
                    change={9.3}
                    icon={Eye}
                    color="bg-indigo-600"
                />
                <MetricCard
                    title="Avg. View Duration"
                    value={analyticsData.channelMetrics.avgViewDuration}
                    change={-2.1}
                    icon={MessageCircle}
                    color="bg-amber-600"
                />
            </div>

            {/* Daily Views Trend */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Views Trend (Last 7 Days)</h3>
                <div className="h-[300px]">
                    <LineChartComponent
                        data={analyticsData.dailyViews}
                        xKey="date"
                        yKey="views"
                        color="#dc2626"
                    />
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Videos */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Top Performing Videos (All Time)</h3>
                    <div className="h-[300px]">
                        <BarChartComponent
                            data={analyticsData.topVideos}
                            xKey="label"
                            yKey="views"
                            color="#dc2626"
                        />
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Traffic Sources</h3>
                    <div className="h-[300px]">
                        <PieChartComponent
                            data={analyticsData.trafficSources}
                            nameKey="name"
                            dataKey="value"
                        />
                    </div>
                </div>
            </div>

            {/* Recent Videos Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800">Recent Videos Performance</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Video Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Duration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Views</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Likes</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Comments</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {analyticsData.recentVideos.map((video, index) => (
                                <tr key={index} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 text-slate-900 font-medium">{video.title}</td>
                                    <td className="px-6 py-4 text-slate-600">{video.duration}</td>
                                    <td className="px-6 py-4 text-slate-900">{video.views.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-slate-900">{video.likes.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-slate-900">{video.comments.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Demographics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Age Demographics */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Audience Age Distribution</h3>
                    <div className="space-y-4">
                        {analyticsData.demographics.age.map((age, index) => (
                            <div key={index}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-sm font-medium text-slate-700">{age.range}</span>
                                    <span className="text-sm text-slate-500">{age.value}%</span>
                                </div>
                                <div className="w-full bg-slate-100 rounded-full h-2">
                                    <div
                                        className="bg-red-600 h-2 rounded-full transition-all"
                                        style={{ width: `${age.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Countries */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Top Countries</h3>
                    <div className="space-y-4">
                        {analyticsData.demographics.geography.map((geo, index) => {
                            const total = analyticsData.demographics.geography.reduce((sum, g) => sum + g.viewers, 0);
                            const percentage = ((geo.viewers / total) * 100).toFixed(1);
                            return (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-700">{geo.country}</span>
                                        <span className="text-sm text-slate-500">{geo.viewers.toLocaleString()} ({percentage}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default YouTubeAnalyticsDashboard;
