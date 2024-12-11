import { useState, useEffect, useCallback } from 'react';

interface UseCountdownProps {
  initialTime: number;
}

export default function useCountdown({ initialTime }: UseCountdownProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isCounting, setIsCounting] = useState(false);

  // Start countdown
  const startCountdown = useCallback(() => {
    setTimeLeft(initialTime);
    setIsCounting(true);
  }, [initialTime]);

  // Reset countdown
  const resetCountdown = useCallback(() => {
    setTimeLeft(initialTime);
    setIsCounting(false);
  }, [initialTime]);

  useEffect(() => {
    if (isCounting && timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId); // Clean up
    } else if (timeLeft === 0) {
      setIsCounting(false); // Stop countdown when it reaches zero
    }
  }, [isCounting, timeLeft]);

  return { timeLeft, startCountdown, resetCountdown, isCounting };
}
