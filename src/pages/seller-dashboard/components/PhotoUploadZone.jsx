import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PhotoUploadZone = ({ onPhotosUploaded, maxPhotos = 8 }) => {
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e?.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e?.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e?.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    if (imageFiles?.length > 0) {
      handleFileUpload(imageFiles);
    }
  }, []);

  const handleFileUpload = (files) => {
    const newPhotos = files?.slice(0, maxPhotos - uploadedPhotos?.length)?.map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      name: file?.name
    }));

    const updatedPhotos = [...uploadedPhotos, ...newPhotos];
    setUploadedPhotos(updatedPhotos);
    onPhotosUploaded?.(updatedPhotos);
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = uploadedPhotos?.filter(photo => photo?.id !== photoId);
    setUploadedPhotos(updatedPhotos);
    onPhotosUploaded?.(updatedPhotos);
  };

  const reorderPhotos = (dragIndex, hoverIndex) => {
    const dragPhoto = uploadedPhotos?.[dragIndex];
    const newPhotos = [...uploadedPhotos];
    newPhotos?.splice(dragIndex, 1);
    newPhotos?.splice(hoverIndex, 0, dragPhoto);
    setUploadedPhotos(newPhotos);
    onPhotosUploaded?.(newPhotos);
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-organic border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Product Photos</h3>
        <span className="text-sm text-muted-foreground">
          {uploadedPhotos?.length}/{maxPhotos} photos
        </span>
      </div>
      {uploadedPhotos?.length === 0 ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-organic ${
            isDragging 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Upload" size={32} className="text-primary" />
          </div>
          <h4 className="text-lg font-medium text-foreground mb-2">
            Upload Product Photos
          </h4>
          <p className="text-muted-foreground mb-4">
            Drag and drop your photos here, or click to browse
          </p>
          <Button
            variant="outline"
            iconName="Camera"
            iconPosition="left"
            onClick={() => document.getElementById('photo-upload')?.click()}
          >
            Choose Photos
          </Button>
          <input
            id="photo-upload"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFileUpload(Array.from(e?.target?.files))}
          />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {uploadedPhotos?.map((photo, index) => (
              <div key={photo?.id} className="relative group">
                <img
                  src={photo?.url}
                  alt={photo?.name}
                  className="w-full h-32 object-cover rounded-lg border border-border"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-organic rounded-lg flex items-center justify-center">
                  <button
                    onClick={() => removePhoto(photo?.id)}
                    className="w-8 h-8 bg-error rounded-full flex items-center justify-center hover:bg-error/80 transition-organic"
                  >
                    <Icon name="X" size={16} className="text-error-foreground" />
                  </button>
                </div>
                {index === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    Main
                  </div>
                )}
              </div>
            ))}
          </div>

          {uploadedPhotos?.length < maxPhotos && (
            <Button
              variant="outline"
              iconName="Plus"
              iconPosition="left"
              onClick={() => document.getElementById('photo-upload')?.click()}
              fullWidth
            >
              Add More Photos ({maxPhotos - uploadedPhotos?.length} remaining)
            </Button>
          )}
        </div>
      )}
      <div className="mt-4 p-4 bg-surface rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-medium text-foreground mb-1">Photography Tips</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use natural lighting for best results</li>
              <li>• Show multiple angles and any flaws</li>
              <li>• First photo will be your main listing image</li>
              <li>• Include size reference objects when helpful</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadZone;