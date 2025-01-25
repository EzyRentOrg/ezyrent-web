import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CircleChevronLeft, CircleChevronRight, X } from 'lucide-react';

interface MediaModalPropType {
  setExpandedOtherFile: (file: string | null) => void;
  expandedOtherFile: string;
  files: string[];
}

export default function MediaModal({
  setExpandedOtherFile,
  expandedOtherFile,
  files
}: MediaModalPropType) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const navigateFile = (direction: number) => {
    const currentIndex = files.indexOf(expandedOtherFile);
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < files.length) {
      setExpandedOtherFile(files[newIndex]);
    }
  };

  const isVideo = (file: string): boolean => {
    const lowercase = file.toLowerCase();
    return lowercase.endsWith('.mp4') || lowercase.endsWith('.webm');
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [expandedOtherFile]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      setExpandedOtherFile(null);
    }
  };

  const getVideoType = (file: string): string => {
    const extension = file.toLowerCase().split('.').pop();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      default:
        return 'video/mp4';
    }
  };

  if (!expandedOtherFile) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white p-4 rounded-lg min-w-[40vw] max-w-[80vw]  max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <Button
          variant="default"
          className="absolute top-2 right-2 bg-[#7065F0] hover:bg-[#5A4DE6] text-white size-8 p-2 z-[9999]"
          onClick={() => setExpandedOtherFile(null)}
        >
          <X className="w-full h-full" />
        </Button>

        {/* Content Container */}
        <div className="w-full h-full mt-8">
          {/* File Preview */}
          <div className="relative flex items-center justify-center min-h-[300px]">
            {isVideo(expandedOtherFile) ? (
              <video
                ref={videoRef}
                controls
                controlsList="nodownload"
                playsInline
                className="max-w-full max-h-[70vh] object-contain"
              >
                <source
                  src={expandedOtherFile}
                  type={getVideoType(expandedOtherFile)}
                />
                Your browser doesn&apos;t support this video format.
              </video>
            ) : (
              <Image
                src={expandedOtherFile}
                alt="Expanded view"
                className="max-w-full max-h-[70vh] object-contain"
                width={800}
                height={600}
                priority
              />
            )}
          </div>

          {/* Navigation */}
          {files.length > 1 && (
            <div className="flex items-center justify-between w-full px-5 py-2 mt-1">
              <Button
                variant="ghost"
                className="rounded-full !size-10 disabled:opacity-30"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFile(-1);
                }}
                disabled={files.indexOf(expandedOtherFile) === 0}
              >
                <CircleChevronLeft className="!size-10 text-black" />
              </Button>
              <Button
                variant="ghost"
                className="rounded-full !size-10 disabled:opacity-30"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFile(1);
                }}
                disabled={files.indexOf(expandedOtherFile) === files.length - 1}
              >
                <CircleChevronRight className="!size-10 text-black" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
