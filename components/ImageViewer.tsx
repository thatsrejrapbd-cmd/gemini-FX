
import React from 'react';

interface ImageViewerProps {
  originalImageUrl: string | null;
  editedImageUrl: string | null;
}

const ImageCard: React.FC<{ imageUrl: string | null; title: string; isPlaceholder?: boolean }> = ({ imageUrl, title, isPlaceholder = false }) => (
  <div className="flex flex-col gap-4 items-center">
    <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
    <div className="w-full aspect-square bg-gray-900/50 rounded-2xl border border-gray-700/50 flex items-center justify-center p-2 shadow-lg">
      {imageUrl ? (
        <img src={imageUrl} alt={title} className="max-w-full max-h-full object-contain rounded-lg" />
      ) : isPlaceholder && (
        <div className="text-gray-500">AI-generated image will appear here</div>
      )}
    </div>
  </div>
);

export const ImageViewer: React.FC<ImageViewerProps> = ({ originalImageUrl, editedImageUrl }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
      <ImageCard imageUrl={originalImageUrl} title="Original" />
      <ImageCard imageUrl={editedImageUrl} title="Edited" isPlaceholder={true} />
    </div>
  );
};
