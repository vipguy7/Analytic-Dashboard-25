import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export const parseFile = (file) => {
    return new Promise((resolve, reject) => {
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (fileExtension === 'csv') {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                    resolve(results.data);
                },
                error: (error) => {
                    reject(error);
                },
            });
        } else if (['xlsx', 'xls'].includes(fileExtension)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    // Convert array of arrays to array of objects (header row)
                    if (jsonData.length > 0) {
                        const headers = jsonData[0];
                        const rows = jsonData.slice(1);
                        const result = rows.map(row => {
                            const obj = {};
                            headers.forEach((header, index) => {
                                obj[header] = row[index];
                            });
                            return obj;
                        });
                        resolve(result);
                    } else {
                        resolve([]);
                    }
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = (error) => reject(error);
            reader.readAsArrayBuffer(file);
        } else {
            reject(new Error('Unsupported file type'));
        }
    });
};

export const calculateStats = (data, column) => {
    if (!data || data.length === 0 || !column) return null;

    const values = data.map(item => Number(item[column])).filter(val => !isNaN(val));

    if (values.length === 0) return null;

    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { sum, avg, min, max, count: values.length };
};

// Facebook Analytics Helpers

export const detectFacebookData = (columns) => {
    const requiredColumns = [
        'Title', 'Publish time', 'Permalink', 'Post type',
        'Reach', 'Reactions', 'Comments', 'Shares', 'Link clicks'
    ];
    const lowerColumns = columns.map(c => c.toLowerCase());
    const matches = requiredColumns.filter(req =>
        lowerColumns.some(col => col.includes(req.toLowerCase()))
    );

    return matches.length >= 5;
};

export const calculateFacebookStats = (data) => {
    const sumColumn = (colName) => {
        return data.reduce((acc, row) => {
            const key = Object.keys(row).find(k => k.toLowerCase().includes(colName.toLowerCase()));
            const val = key ? Number(String(row[key]).replace(/,/g, '')) : 0;
            return acc + (isNaN(val) ? 0 : val);
        }, 0);
    };

    const countPosts = data.length;
    const likes = sumColumn('Reactions');
    const comments = sumColumn('Comments');
    const shares = sumColumn('Shares');
    const linkClicks = sumColumn('Link clicks');
    const photoViews = sumColumn('Photo Click');
    const videoViews = sumColumn('3-Second');
    const reelsPlays = sumColumn('Reels Plays');

    // Post Type Distribution
    const postTypes = {};
    data.forEach(row => {
        const key = Object.keys(row).find(k => k.toLowerCase() === 'post type');
        const type = key ? row[key] : 'Unknown';
        postTypes[type] = (postTypes[type] || 0) + 1;
    });

    return {
        totalPosts: countPosts,
        likes,
        comments,
        shares,
        linkClicks,
        photoViews,
        videoViews,
        reelsPlays,
        postTypes: Object.entries(postTypes).map(([name, value]) => ({ name, value }))
    };
};

export const getTopPosts = (data, metric = 'Reach', limit = 10) => {
    return [...data].sort((a, b) => {
        const keyA = Object.keys(a).find(k => k.toLowerCase().includes(metric.toLowerCase()));
        const keyB = Object.keys(b).find(k => k.toLowerCase().includes(metric.toLowerCase()));

        const valA = keyA ? Number(String(a[keyA]).replace(/,/g, '')) : 0;
        const valB = keyB ? Number(String(b[keyB]).replace(/,/g, '')) : 0;

        return valB - valA;
    }).slice(0, limit);
};
