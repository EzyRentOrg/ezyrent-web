
import Image from "next/image";
import {Trash2} from 'lucide-react'



interface ImagePreviewProps {
  src: string;
  onClick: () => void;
  onDelete: () => void;
}

export const ImagePreview = ({ src, onClick, onDelete }: ImagePreviewProps) => (
  <div
    className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
    onClick={onClick}
  >
    {src ? (
      <>
      <Image
        src={src}
        alt="Property"
        height={150}
        width={150}
        className="object-cover h-[150px] w-[150px] transition-transform duration-300 group-hover:scale-110"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation(); // Prevent triggering the onClick for the image
            onDelete();
          }}
          className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition"
        >
          <Trash2 size={20} />
        </button>
        </>
    ) : (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No image available</p>
      </div>
    )}
  </div>
);