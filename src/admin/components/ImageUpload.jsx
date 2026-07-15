import React, { useState, useRef } from 'react';
import { UploadCloud, X, ArrowLeft, ArrowRight, Image as ImageIcon, Loader2 } from 'lucide-react';

const ImageUpload = ({ 
  images = [], 
  onChange, 
  multiple = false, 
  label = "Upload Image",
  folder = "general"
}) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = async (files) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      if (multiple) {
        const formData = new FormData();
        Array.from(files).forEach(file => {
          formData.append('images', file);
        });
        
        const response = await fetch(`/api/upload/multiple?folder=${folder}`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          onChange([...images, ...data.urls]);
        }
      } else {
        const formData = new FormData();
        formData.append('image', files[0]);
        
        const response = await fetch(`/api/upload?folder=${folder}`, {
          method: 'POST',
          body: formData
        });
        const data = await response.json();
        if (data.success) {
          onChange([data.url]);
        }
      }
    } catch (error) {
      console.error('File upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (indexToRemove) => {
    onChange(images.filter((_, idx) => idx !== indexToRemove));
  };

  const moveImage = (index, direction) => {
    if (!multiple) return;
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= images.length) return;
    
    const rearranged = [...images];
    const temp = rearranged[index];
    rearranged[index] = rearranged[newIndex];
    rearranged[newIndex] = temp;
    
    onChange(rearranged);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Upload Zone */}
      {(multiple || images.length === 0) && (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-primary bg-primary/5 dark:bg-rose-500/5' 
              : 'border-zinc-200 hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            multiple={multiple}
            onChange={handleChange}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Processing images...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 shadow-md border border-zinc-100 dark:border-zinc-750 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="text-sm">
                <span className="font-semibold text-primary hover:underline">Click to upload</span>
                <span className="text-zinc-500 dark:text-zinc-450"> or drag and drop</span>
              </div>
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                PNG, JPG, JPEG or WEBP up to 5MB
              </p>
            </div>
          )}
        </div>
      )}

      {/* Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-1">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="group relative aspect-square rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-800"
            >
              <img 
                src={img} 
                alt={`Upload preview ${idx}`} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {/* Overlay Overlay controls */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                {multiple && (
                  <>
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={(e) => { e.stopPropagation(); moveImage(idx, -1); }}
                      className="p-1 rounded-lg bg-white/95 text-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 transition-colors"
                      title="Move Left"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={(e) => { e.stopPropagation(); moveImage(idx, 1); }}
                      className="p-1 rounded-lg bg-white/95 text-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 transition-colors"
                      title="Move Right"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
                
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                  className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors ml-auto"
                  title="Remove Image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Order Badge for Multiple Images */}
              {multiple && (
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                  Order {idx + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
