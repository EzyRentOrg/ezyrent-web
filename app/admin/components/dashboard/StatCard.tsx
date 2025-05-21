import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { FaArrowUpLong } from 'react-icons/fa6';

interface StatsCardProps {
  title: string;
  value: string;
  percentage: number;
}

export function StatsCard({ title, value, percentage }: StatsCardProps) {
  return (
    <Card className="w-full p-1 bg-white">
      <CardHeader className="flex flex-col gap-3">
        <CardTitle className="font-light text-[#000000E5]">{title}</CardTitle>
        <CardDescription className="text-3xl font-bold">
          {value}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="flex flex-col md:flex-row items-center text-sm text-muted-foreground">
          <span className="text-[#00D12AE5] flex items-center gap-1">
            {' '}
            <FaArrowUpLong />
            {percentage}%
          </span>{' '}
          <span className="ml-2 text-xs md:text-base text-[#666666]">
            from last month
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
export default StatsCard;
