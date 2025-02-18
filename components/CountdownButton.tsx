import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

interface CountdownButtonProps {
  onClick: () => Promise<void> | void;
  isDisabled: boolean;
  timeLeft: number;
}

export default function CountdownButton({
  onClick,
  isDisabled,
  timeLeft
}: CountdownButtonProps) {
  const [remainingTime, setRemainingTime] = useState(timeLeft);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset countdown when timeLeft changes
    setRemainingTime(timeLeft);

    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start countdown if disabled and timeLeft is greater than 0
    if (isDisabled && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeLeft, isDisabled]);

  if (remainingTime === 0 || !isDisabled) {
    return (
      <Button
        variant="ghost"
        onClick={onClick}
        disabled={false}
        className="text-[#7065F0] hover:text-[#4036af] font-medium"
        aria-label="Resend Code"
      >
        Resend Code
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      disabled={true}
      className="text-[#7065F0] hover:text-[#4036af] font-medium cursor-not-allowed"
      aria-label={`Resend code in ${remainingTime} seconds`}
    >
      Resend code in <span className="w-[20px]">{remainingTime}s</span>
    </Button>
  );
}
