import { cn } from '@/lib/utils/cn';
import Image from 'next/image';

interface PopularLabelProps {
  className?: string;
  text: string;
}

export default function PopularLabel({ className, text }: PopularLabelProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center bg-[#7065F0] text-white text-xs font-semibold py-1 px-3 rounded-lg h-10',
        className
      )}
    >
      {/* Triangle on the bottom right */}
      <div className="mt-[45px] -ml-2 bg-[url('/location/popularLabelTail.png')] bg-cover w-2 h-2" />

      {/* Icon and Text */}
      <div className="w-3 h-3 mr-2">
        <Image
          src={'/location/popularStar.svg'}
          alt="Star svg."
          width={12.7}
          height={12.7}
          className="object-cover w-full h-full"
        />
      </div>
      <span>{text}</span>
    </div>
  );
}
