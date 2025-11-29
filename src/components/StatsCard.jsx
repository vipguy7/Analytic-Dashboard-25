import React from 'react';
import { TrendingUp, TrendingDown, Hash, Activity } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, color }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
                <div className={`p-2 rounded-lg ${color}`}>
                    <Icon size={20} className="text-white" />
                </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
    );
};

export default StatsCard;
