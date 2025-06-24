import React, { useRef, useState } from 'react';
import Button from '../common/Button';

const MediaUploader = ({ media = [], onUpload, onRemove }) => {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setIsUploading(true);
    
    try {
      // Here you would normally upload files to your storage service
      // For now, we'll simulate that and just return file objects with URLs
      const processedFiles = files.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file) // In a real app, this would be the uploaded file URL
      }));
      
      onUpload(processedFiles);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Attachments
      </label>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept="image/*,audio/*"
      />
      
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <div className="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Drag and drop files, or{' '}
            <button
              type="button"
              className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none"
              onClick={handleBrowseClick}
            >
              browse
            </button>
          </p>
          
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Images and audio files only
          </p>
          
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="mt-3"
            onClick={handleBrowseClick}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Select Files'}
          </Button>
        </div>
      </div>
      
      {media.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {media.map((file, index) => (
            <div 
              key={index} 
              className="border rounded-lg overflow-hidden relative group"
            >
              {file.type.startsWith('image') ? (
                <img 
                  src={file.url} 
                  alt={file.name} 
                  className="w-full h-24 object-cover"
                />
              ) : file.type.startsWith('audio') ? (
                <div className="bg-gray-100 dark:bg-gray-700 p-2 h-24 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.828-2.828" />
                  </svg>
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-700 p-2 h-24 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              )}
              
              <div className="p-1 text-xs truncate">
                {file.name || `File ${index + 1}`}
              </div>
              
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUploader;