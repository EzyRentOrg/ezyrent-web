import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CircleChevronLeft, CircleChevronRight, X } from 'lucide-react';

interface ImageModalPropType {
  setExpandedImage: (img: string | null) => void;
  expandedImage: string;
  images: string[];
}

export default function ImageModal({
  setExpandedImage,
  expandedImage,
  images
}: ImageModalPropType) {
  const navigateImage = (direction: number) => {
    const currentIndex = images.indexOf(expandedImage);
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < images.length) {
      setExpandedImage(images[newIndex]);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000]/90 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg max-w-full max-h-[90vh] relative flex flex-col items-center">
        {/* Close Button */}
        <Button
          variant="default"
          className="absolute bg-[#7065F0] text-white  top-5 right-4 size-8 p-2"
          onClick={() => setExpandedImage(null)}
        >
          <X className="w-full" />
        </Button>

        {/* Navigation */}
        <div className="relative w-auto h-[70vh] mt-5 max-w-full flex items-center">
          {/* Image Preview */}
          <Image
            src={expandedImage}
            alt="Expanded view"
            className="object-contain"
            width={800}
            height={600}
          />
        </div>
        {/* navigations */}
        <div className="felx items-center justify-between px-5 py-2">
          {/* Previous Button */}
          <Button
            variant="ghost"
            className=" rounded-full size-8 disabled:text-black/30 disabled:cursor-not-allowed"
            onClick={() => navigateImage(-1)}
            disabled={images.indexOf(expandedImage) === 0}
          >
            <CircleChevronLeft className="!size-8 text-black" />
          </Button>
          {/* Next Button */}
          <Button
            variant="ghost"
            className=" rounded-full size-8 disabled:text-black/30 disabled:cursor-not-allowed"
            onClick={() => navigateImage(1)}
            disabled={images.indexOf(expandedImage) === images.length - 1}
          >
            <CircleChevronRight size={24} className="!size-8 !text-black " />
          </Button>
        </div>
      </div>
    </div>
  );
}
