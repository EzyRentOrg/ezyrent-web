import Image from 'next/image';
import { Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle
} from '../ui/card'

export default function TestimonialCard({
  name,
  jobTitle,
  quote,
  star,
  image
}: Testimonial) {
  return (
    <Card className="relative min-h-[320px] h-auto sm:h-[460px] w-full max-w-[480px] rounded-lg testimonial-card-bg testimonial-card_box-shadow testimonial-card_backdrop p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-in-out cursor-pointer">
      <div className="w-[60px] h-[60px] mx-auto mb-3 sm:mb-4">
        <Image
          src={image}
          alt={`Image of ${name}`}
          width={60}
          height={60}
          className="rounded-full w-full h-full object-cover"
        />
      </div>

      <CardTitle className="capitalize font-extrabold text-lg sm:text-xl lg:text-2xl text-center text-[#333333] line-clamp-1">
        {name}
      </CardTitle>

      <CardDescription className="capitalize text-base sm:text-lg text-[#000929] text-center mb-3 sm:mb-4 line-clamp-1">
        {jobTitle}
      </CardDescription>

      <CardContent className="flex text-sm sm:text-base lg:text-lg text-[#000929] space-x-2 px-2 sm:px-4">
        <div className="line-clamp-6 sm:line-clamp-none text-center">
          {quote}
        </div>
      </CardContent>

      <CardFooter className="flex justify-center mt-3 sm:mt-4 space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            fill={i < star ? '#7065F0' : 'none'}
            className="text-[#7065F0] w-4 h-4 sm:w-5 sm:h-5"
          />
        ))}
      </CardFooter>
    </Card>
  );
}
