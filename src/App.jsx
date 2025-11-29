import React, { useState } from 'react';
import { DataProvider, useData } from './context/DataContext';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import GoogleAnalyticsDashboard from './components/GoogleAnalyticsDashboard';
import YouTubeAnalyticsDashboard from './components/YouTubeAnalyticsDashboard';
import { parseFile } from './utils/dataProcessing';
import { LayoutDashboard, Loader2, BarChart3, Youtube } from 'lucide-react';

const AppContent = () => {
  const { data, setParsedData } = useData();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('csv-analytics'); // 'csv-analytics', 'google-analytics', 'youtube-analytics'
  const [error, setError] = useState(null);

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const parsedData = await parseFile(file);
      setParsedData(parsedData, file.name);
    } catch (err) {
      console.error(err);
      setError('Failed to parse file. Please ensure it is a valid CSV or Excel file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <LayoutDashboard className="text-white" size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              DataViz Pro
            </h1>
          </div>
          <div className="text-sm text-slate-500">
            Analytics & Visualization Platform
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('csv-analytics')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'csv-analytics'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              <BarChart3 size={18} />
              CSV/Excel Analytics
            </button>
            <button
              onClick={() => setActiveTab('google-analytics')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'google-analytics'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              <BarChart3 size={18} />
              Google Analytics
            </button>
            <button
              onClick={() => setActiveTab('youtube-analytics')}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === 'youtube-analytics'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              <Youtube size={18} />
              YouTube Analytics
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'csv-analytics' && (
          <>
            {data.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="text-center space-y-4 max-w-2xl">
                  <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    Visualize your data in <span className="text-indigo-600">seconds</span>
                  </h2>
                  <p className="text-lg text-slate-600">
                    Upload your CSV or Excel files to instantly generate interactive charts and insights. No signup required.
                  </p>
                </div>

                <div className="w-full max-w-xl relative">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center p-12 bg-white/50 backdrop-blur-sm rounded-xl border border-indigo-100">
                      <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
                      <p className="text-indigo-600 font-medium">Processing your data...</p>
                    </div>
                  ) : (
                    <FileUpload onFileUpload={handleFileUpload} />
                  )}
                  {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm text-center border border-red-100">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <Dashboard />
            )}
          </>
        )}

        {activeTab === 'google-analytics' && (
          <GoogleAnalyticsDashboard isDemo={true} />
        )}

        {activeTab === 'youtube-analytics' && (
          <YouTubeAnalyticsDashboard isDemo={true} />
        )}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
};

export default App;
