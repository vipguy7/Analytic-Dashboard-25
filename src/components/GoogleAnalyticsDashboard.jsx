import React, { useState, useEffect } from 'react';
import BarChartComponent from './Charts/BarChartComponent';
import LineChartComponent from './Charts/LineChartComponent';
import { Users, Eye, Clock, MousePointer, Globe, TrendingUp } from 'lucide-react';

const MetricCard = ({ title, value, change, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
            <div className={`text-sm font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </div>
        </div>
        <h3 className="text-sm text-slate-500 font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
);

const GoogleAnalyticsDashboard = ({ isDemo = true }) => {
    const [selectedSite, setSelectedSite] = useState('bur.mizzima.com');
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Demo data
    const demoData = {
        'bur.mizzima.com': {
            realTimeUsers: 234,
            pageViews: 15742,
            sessions: 8234,
            avgSessionDuration: '3:45',
            bounceRate: 42.3,
            newUsers: 5891,
            topPages: [
                { page: '/news/politics', views: 2341, label: 'Politics' },
                { page: '/news/business', views: 1987, label: 'Business' },
                { page: '/news/world', views: 1654, label: 'World News' },
                { page: '/news/local', views: 1432, label: 'Local' },
                { page: '/opinion', views: 1198, label: 'Opinion' }
            ],
            trafficSources: [
                { source: 'Direct', users: 3421, value: 3421 },
                { source: 'Organic Search', users: 2876, value: 2876 },
                { source: 'Social Media', users: 1543, value: 1543 },
                { source: 'Referral', users: 394, value: 394 }
            ],
            hourlyTraffic: [
                { hour: '00:00', users: 145 },
                { hour: '01:00', users: 123 },
                { hour: '02:00', users: 98 },
                { hour: '03:00', users: 87 },
                { hour: '04:00', users: 76 },
                { hour: '05:00', users: 92 },
                { hour: '06:00', users: 165 },
                { hour: '07:00', users: 234 },
                { hour: '08:00', users: 312 },
                { hour: '09:00', users: 398 },
                { hour: '10:00', users: 445 },
                { hour: '11:00', users: 432 },
                { hour: '12:00', users: 387 },
                { hour: '13:00', users: 412 },
                { hour: '14:00', users: 456 },
                { hour: '15:00', users: 478 },
                { hour: '16:00', users: 521 },
                { hour: '17:00', users: 543 },
                { hour: '18:00', users: 498 },
                { hour: '19:00', users: 445 },
                { hour: '20:00', users: 398 },
                { hour: '21:00', users: 334 },
                { hour: '22:00', users: 276 },
                { hour: '23:00', users: 198 }
            ]
        },
        'eng.mizzima.com': {
            realTimeUsers: 189,
            pageViews: 12431,
            sessions: 6542,
            avgSessionDuration: '4:12',
            bounceRate: 38.7,
            newUsers: 4234,
            topPages: [
                { page: '/breaking-news', views: 1987, label: 'Breaking News' },
                { page: '/analysis', views: 1654, label: 'Analysis' },
                { page: '/features', views: 1432, label: 'Features' },
                { page: '/interviews', views: 1198, label: 'Interviews' },
                { page: '/reports', views: 987, label: 'Reports' }
            ],
            trafficSources: [
                { source: 'Organic Search', users: 2987, value: 2987 },
                { source: 'Direct', users: 2134, value: 2134 },
                { source: 'Social Media', users: 1087, value: 1087 },
                { source: 'Referral', users: 334, value: 334 }
            ],
            hourlyTraffic: [
                { hour: '00:00', users: 112 },
                { hour: '01:00', users: 95 },
                { hour: '02:00', users: 78 },
                { hour: '03:00', users: 65 },
                { hour: '04:00', users: 58 },
                { hour: '05:00', users: 72 },
                { hour: '06:00', users: 134 },
                { hour: '07:00', users: 198 },
                { hour: '08:00', users: 267 },
                { hour: '09:00', users: 334 },
                { hour: '10:00', users: 387 },
                { hour: '11:00', users: 398 },
                { hour: '12:00', users: 356 },
                { hour: '13:00', users: 378 },
                { hour: '14:00', users: 412 },
                { hour: '15:00', users: 445 },
                { hour: '16:00', users: 478 },
                { hour: '17:00', users: 498 },
                { hour: '18:00', users: 456 },
                { hour: '19:00', users: 412 },
                { hour: '20:00', users: 367 },
                { hour: '21:00', users: 298 },
                { hour: '22:00', users: 234 },
                { hour: '23:00', users: 167 }
            ]
        },
        'mizzima-tv-app': {
            realTimeUsers: 567,
            pageViews: 23456,
            sessions: 12345,
            avgSessionDuration: '12:34',
            bounceRate: 15.2,
            newUsers: 8765,
            topPages: [
                { page: 'Live Stream', views: 5432, label: 'Live Stream' },
                { page: 'News Bulletins', views: 4321, label: 'News Bulletins' },
                { page: 'Documentaries', views: 3210, label: 'Documentaries' },
                { page: 'Talk Shows', views: 2109, label: 'Talk Shows' },
                { page: 'Archives', views: 1876, label: 'Archives' }
            ],
            trafficSources: [
                { source: 'Direct (App)', users: 8976, value: 8976 },
                { source: 'Push Notifications', users: 2345, value: 2345 },
                { source: 'Social Share', users: 876, value: 876 },
                { source: 'Web Referral', users: 148, value: 148 }
            ],
            hourlyTraffic: [
                { hour: '00:00', users: 234 },
                { hour: '01:00', users: 198 },
                { hour: '02:00', users: 165 },
                { hour: '03:00', users: 143 },
                { hour: '04:00', users: 132 },
                { hour: '05:00', users: 156 },
                { hour: '06:00', users: 298 },
                { hour: '07:00', users: 445 },
                { hour: '08:00', users: 567 },
                { hour: '09:00', users: 654 },
                { hour: '10:00', users: 723 },
                { hour: '11:00', users: 765 },
                { hour: '12:00', users: 698 },
                { hour: '13:00', users: 734 },
                { hour: '14:00', users: 789 },
                { hour: '15:00', users: 823 },
                { hour: '16:00', users: 876 },
                { hour: '17:00', users: 912 },
                { hour: '18:00', users: 1023 },
                { hour: '19:00', users: 1145 },
                { hour: '20:00', users: 987 },
                { hour: '21:00', users: 765 },
                { hour: '22:00', users: 543 },
                { hour: '23:00', users: 376 }
            ]
        }
    };

    useEffect(() => {
        if (isDemo) {
            setAnalyticsData(demoData[selectedSite]);
        } else {
            // TODO: Fetch real data from Google Analytics API
            fetchGoogleAnalyticsData();
        }
    }, [selectedSite, isDemo]);

    const fetchGoogleAnalyticsData = async () => {
        setLoading(true);
        try {
            // TODO: Implement actual API call
            // const response = await fetch('/api/google-analytics', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ propertyId: selectedSite })
            // });
            // const data = await response.json();
            // setAnalyticsData(data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!analyticsData) return <div>Loading...</div>;

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Google Analytics Dashboard</h2>
                    <p className="text-slate-500">Real-time website and app analytics {isDemo && '(Demo Mode)'}</p>
                </div>
                <div className="flex gap-2">
                    <select
                        value={selectedSite}
                        onChange={(e) => setSelectedSite(e.target.value)}
                        className="px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="bur.mizzima.com">bur.mizzima.com</option>
                        <option value="eng.mizzima.com">eng.mizzima.com</option>
                        <option value="mizzima-tv-app">Mizzima TV App</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard
                    title="Active Users (Real-time)"
                    value={analyticsData.realTimeUsers.toLocaleString()}
                    change={12.5}
                    icon={Users}
                    color="bg-green-500"
                />
                <MetricCard
                    title="Page Views (Today)"
                    value={analyticsData.pageViews.toLocaleString()}
                    change={8.3}
                    icon={Eye}
                    color="bg-blue-500"
                />
                <MetricCard
                    title="Sessions (Today)"
                    value={analyticsData.sessions.toLocaleString()}
                    change={-2.1}
                    icon={Globe}
                    color="bg-indigo-500"
                />
                <MetricCard
                    title="Avg. Session Duration"
                    value={analyticsData.avgSessionDuration}
                    change={15.7}
                    icon={Clock}
                    color="bg-purple-500"
                />
                <MetricCard
                    title="Bounce Rate"
                    value={`${analyticsData.bounceRate}%`}
                    change={-4.2}
                    icon={MousePointer}
                    color="bg-amber-500"
                />
                <MetricCard
                    title="New Users (Today)"
                    value={analyticsData.newUsers.toLocaleString()}
                    change={9.8}
                    icon={TrendingUp}
                    color="bg-emerald-500"
                />
            </div>

            {/* Hourly Traffic */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold text-slate-800 mb-6">Hourly Traffic (Last 24 Hours)</h3>
                <div className="h-[300px]">
                    <LineChartComponent
                        data={analyticsData.hourlyTraffic}
                        xKey="hour"
                        yKey="users"
                        color="#6366f1"
                    />
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Pages */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Top Pages</h3>
                    <div className="h-[300px]">
                        <BarChartComponent
                            data={analyticsData.topPages}
                            xKey="label"
                            yKey="views"
                            color="#8b5cf6"
                        />
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Traffic Sources</h3>
                    <div className="space-y-4">
                        {analyticsData.trafficSources.map((source, index) => {
                            const total = analyticsData.trafficSources.reduce((sum, s) => sum + s.users, 0);
                            const percentage = ((source.users / total) * 100).toFixed(1);
                            return (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-slate-700">{source.source}</span>
                                        <span className="text-sm text-slate-500">{source.users.toLocaleString()} ({percentage}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2">
                                        <div
                                            className="bg-indigo-600 h-2 rounded-full transition-all"
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

export default GoogleAnalyticsDashboard;
