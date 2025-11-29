import React, { useState } from 'react';
import { ExternalLink, ArrowUpDown, Copy, Check } from 'lucide-react';

const TopPostsTable = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: 'Reach', direction: 'desc' });
    const [copied, setCopied] = useState(false);

    // Helper to safely get value from row with fuzzy key matching
    const getValue = (row, keyPart) => {
        const key = Object.keys(row).find(k => k.toLowerCase().includes(keyPart.toLowerCase()));
        return key ? row[key] : '-';
    };

    const formatDate = (value) => {
        if (!value) return '-';

        // Handle Excel serial date (numbers like 45944)
        if (typeof value === 'number' && value > 20000 && value < 60000) {
            const date = new Date((value - (25567 + 1)) * 86400 * 1000);
            return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        }

        // Handle standard date strings
        const date = new Date(value);
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        }

        return value;
    };

    const handleCopy = () => {
        if (!data || data.length === 0) return;

        const headers = [
            'Publish Time', 'Title', 'Post Type', 'Reach', 'Engagement',
            'Reactions', 'Comments', 'Shares', 'Link Clicks',
            'Photo Clicks', '3-Sec Views', 'Permalink'
        ];

        const rows = sortedData.map(row => [
            formatDate(getValue(row, 'Publish time')),
            getValue(row, 'Title'),
            getValue(row, 'Post type'),
            getValue(row, 'Reach'),
            getValue(row, 'Engagement'),
            getValue(row, 'Reactions'),
            getValue(row, 'Comments'),
            getValue(row, 'Shares'),
            getValue(row, 'Link clicks'),
            getValue(row, 'Photo Click'),
            getValue(row, '3-Second'),
            getValue(row, 'Permalink')
        ]);

        const tsvContent = [
            headers.join('\t'),
            ...rows.map(row => row.join('\t'))
        ].join('\n');

        navigator.clipboard.writeText(tsvContent).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const sortedData = React.useMemo(() => {
        let sortableItems = [...data];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const valA = Number(String(getValue(a, sortConfig.key)).replace(/,/g, '')) || 0;
                const valB = Number(String(getValue(b, sortConfig.key)).replace(/,/g, '')) || 0;

                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems.slice(0, 10);
    }, [data, sortConfig]);

    const requestSort = (key) => {
        let direction = 'desc';
        if (sortConfig.key === key && sortConfig.direction === 'desc') {
            direction = 'ascending';
        }
        setSortConfig({ key, direction });
    };

    const headerConfig = [
        { label: 'Publish Time', key: 'Publish time' },
        { label: 'Title', key: 'Title' },
        { label: 'Post Type', key: 'Post type' },
        { label: 'Reach', key: 'Reach' },
        { label: 'Engagement', key: 'Engagement' },
        { label: 'Reactions', key: 'Reactions' },
        { label: 'Comments', key: 'Comments' },
        { label: 'Shares', key: 'Shares' },
        { label: 'Link Clicks', key: 'Link clicks' },
        { label: 'Photo Clicks', key: 'Photo Click' },
        { label: '3-Sec Views', key: '3-Second' },
        { label: 'Permalink', key: 'Permalink' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mt-8">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-800">TOP Performance posts</h3>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? 'Copied!' : 'Copy Table'}
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600">
                    <thead className="text-xs text-white uppercase bg-blue-600">
                        <tr>
                            {headerConfig.map((header) => (
                                <th
                                    key={header.key}
                                    scope="col"
                                    className="px-4 py-3 cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap"
                                    onClick={() => requestSort(header.key)}
                                >
                                    <div className="flex items-center gap-1">
                                        {header.label}
                                        <ArrowUpDown size={14} className="opacity-70" />
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-slate-50">
                                <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-900">
                                    {formatDate(getValue(row, 'Publish time'))}
                                </td>
                                <td className="px-4 py-3 max-w-xs truncate" title={getValue(row, 'Title')}>
                                    {getValue(row, 'Title')}
                                </td>
                                <td className="px-4 py-3">{getValue(row, 'Post type')}</td>
                                <td className="px-4 py-3 font-semibold text-slate-900">{Number(getValue(row, 'Reach')).toLocaleString()}</td>
                                <td className="px-4 py-3">{Number(getValue(row, 'Engagement') || 0).toLocaleString()}</td>
                                <td className="px-4 py-3">{Number(getValue(row, 'Reactions')).toLocaleString()}</td>
                                <td className="px-4 py-3">{Number(getValue(row, 'Comments')).toLocaleString()}</td>
                                <td className="px-4 py-3">{Number(getValue(row, 'Shares')).toLocaleString()}</td>
                                <td className="px-4 py-3">{Number(getValue(row, 'Link clicks') || 0).toLocaleString()}</td>
                                <td className="px-4 py-3">{Number(getValue(row, 'Photo Click') || 0).toLocaleString()}</td>
                                <td className="px-4 py-3">{Number(getValue(row, '3-Second') || 0).toLocaleString()}</td>
                                <td className="px-4 py-3">
                                    <a
                                        href={getValue(row, 'Permalink')}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                        Link <ExternalLink size={12} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopPostsTable;
