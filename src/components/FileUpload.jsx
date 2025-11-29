import React from 'react';
import { Upload } from 'lucide-react';
// I didn't put react-dropzone in the plan. I can implement it manually or install it.
// Manual is fine for simple needs, but library is better.
// I'll stick to the plan which didn't explicitly say "install react-dropzone" but "Create File Upload Component".
// I'll implement a simple one or use the input file.
// Actually, for a "wow" factor, a nice drag and drop is good.
// I'll use a simple implementation with standard HTML5 drag and drop events or just an input for now to be safe, 
// but I can make it look good.

// Let's try to use 'react-dropzone' if I can install it quickly, or just build it. 
// I'll build it manually to avoid extra deps if not needed, but 'react-dropzone' is standard.
// I'll just use a hidden file input and a label.

const FileUpload = ({ onFileUpload }) => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            onFileUpload(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    return (
        <div
            className="flex flex-col items-center justify-center w-full max-w-xl mx-auto p-10 border-2 border-dashed border-indigo-300 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-indigo-50/50 transition-all cursor-pointer group"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer w-full h-full">
                <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                </div>
                <p className="text-lg font-semibold text-slate-700 mb-2">Upload your data</p>
                <p className="text-sm text-slate-500 mb-6 text-center">Drag and drop your CSV or Excel file here, or click to browse</p>
                <input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition-colors">
                    Browse Files
                </div>
            </label>
        </div>
    );
};

export default FileUpload;
