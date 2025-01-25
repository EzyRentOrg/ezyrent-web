/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from './ui/input';

interface VerificationInputProps {
  value: string;
  index?: number;
  isError?: boolean;
  isSuccess?: boolean;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const VerificationInput = forwardRef<HTMLInputElement, VerificationInputProps>(
  ({ value, onChange, onKeyDown, onPaste, isError, isSuccess }, ref) => (
    <Input
      ref={ref}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e) => {
        // Allow only numeric input
        const numericValue = e.target.value.replace(/[^0-9]/g, '');
        onChange(numericValue);
      }}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      className={cn(
        'w-12 h-12 text-center text-lg font-semibold border-2 focus:ring-2 border-[#98A2B3] rounded-[10px] focus:border-[#7065F0] focus:ring-[#7065F0]/20',
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
