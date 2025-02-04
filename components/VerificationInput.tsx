import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

interface VerificationInputProps {
  value: string;
  index?: number;
  isError?: boolean;
  isSuccess?: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const VerificationInput = forwardRef<HTMLInputElement, VerificationInputProps>(
  (
    { value, onChange, onKeyDown, onPaste, isError, isSuccess, disabled },
    ref
  ) => (
    <Input
      ref={ref}
      type="text"
      inputMode="text"
      maxLength={1}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      className={cn(
        'capitalize w-12 h-12 text-center text-lg font-semibold border-2 focus:ring-2 border-[#98A2B3] rounded-[10px] focus:border-[#7065F0] focus:ring-[#7065F0]/20',
        isError && 'animate-errorPulse',
        isSuccess && 'animate-successPulse'
      )}
      aria-label={`Digit of verification code`}
      aria-invalid={isError || undefined}
    />
  )
);

VerificationInput.displayName = 'VerificationInput';

export default VerificationInput;
