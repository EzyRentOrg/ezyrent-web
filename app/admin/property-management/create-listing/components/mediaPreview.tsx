import Image from 'next/image';
import { Trash2 } from 'lucide-react';

interface MediaPreviewProps {
  src: string;
  onClick: () => void;
  onDelete: () => void;
}

export default function MediaPreview({
  src,
  onClick,
  onDelete
}: MediaPreviewProps) {
  const isVideo = (file: string) =>
    typeof file === 'string' &&
    (file.endsWith('.mp4') ||
      file.endsWith('.webm') ||
      file.startsWith('data:video'));

  return (
    <div
      className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
      onClick={onClick}
    >
      {src ? (
        <>
          {isVideo(src) ? (
            <video
              src={src}
              controls={false}
              className="object-cover h-full max-h-[200px] w-full transition-transform duration-300 group-hover:scale-110"
              onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
              onMouseLeave={(e) =>
                (e.currentTarget as HTMLVideoElement).pause()
              }
              muted
            />
          ) : (
            <Image
              src={src}
              alt="Media preview"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition"
          >
            <Trash2 size={20} />
          </button>
        </>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No media available</p>
        </div>
      )}
    </div>
  );
}
