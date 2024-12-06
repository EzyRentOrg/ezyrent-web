/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { Input } from './ui/input';

interface VerificationInputProps {
  value: string;
  index: number;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}

const VerificationInput = forwardRef<HTMLInputElement, VerificationInputProps>(
  ({ value, onChange, onKeyDown, onPaste }, ref) => (
    <Input
      ref={ref}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onPaste={onPaste}
      className={cn(
        'w-12 h-12 text-center text-lg font-semibold border-2 focus:ring-2',
        'border-[#999999] focus:border-[#7065F0] focus:ring-[#7065F0]/20'
      )}
      aria-label={`Digit of verification code`}
    />
  )
);
VerificationInput.displayName = 'VerificationInput';

export default VerificationInput;
