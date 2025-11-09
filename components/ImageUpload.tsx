
import React, { useState, useCallback, DragEvent } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0] && files[0].type.startsWith('image/')) {
      onImageUpload(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [onImageUpload]);

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`relative flex items-center justify-center w-full h-60 border-2 border-dashed rounded-lg transition-all duration-300 ${
        isDragging ? 'border-purple-500 bg-purple-900/20 scale-105' : 'border-gray-700 hover:border-gray-500'
      }`}
    >
      {preview ? (
        <img src={preview} alt="Image preview" className="object-contain h-full w-full rounded-lg p-2" />
      ) : (
        <div className="text-center text-gray-400">
          <UploadIcon className="mx-auto h-12 w-12" />
          <p className="mt-2">Drag & drop an image here</p>
          <p className="text-sm">or</p>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        title={preview ? "Click to change image" : "Click to upload image"}
      />
    </div>
  );
};
