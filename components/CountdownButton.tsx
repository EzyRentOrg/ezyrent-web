import { Button } from '@/components/ui/button';

interface CountdownButtonProps {
  onClick: () => void;
  isDisabled: boolean;
  timeLeft: number;
}

const CountdownButton = ({
  onClick,
  isDisabled,
  timeLeft
}: CountdownButtonProps) => (
  <Button
    variant="ghost"
    onClick={onClick}
    disabled={isDisabled}
    className="text-[#7065F0] hover:text-[#4036af]"
  >
    {isDisabled ? `Resend code in ${timeLeft}s` : 'Resend Code'}
  </Button>
);

export default CountdownButton;
