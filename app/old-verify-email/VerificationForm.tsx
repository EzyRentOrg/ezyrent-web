'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
import useDelay from '@/hooks/useDelay';
import CountdownButton from '@/components/CountdownButton';
import ErrorAlert from '@/components/ErrorAlert';
import VerificationInput from '@/components/VerificationInput';

interface VerificationFormProps {
  onSuccess: () => void;
  onResendCode?: () => Promise<void>;
}

export default function VerificationForm({
  onSuccess,
  onResendCode
}: VerificationFormProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  // const [allowDigits, setAllowDigits] = useState<boolean>(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const delay = useDelay();

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  useEffect(() => {
    const urlCode = searchParams.get('code');
    if (urlCode?.length === 6) {
      setCode(urlCode.split(''));
    }
    setIsResendDisabled(true);
  }, [searchParams]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (timeLeft > 0 && isResendDisabled) {
      timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isResendDisabled]);

  // Helper function to check if all digits are filled
  const areAllDigitsFilled = (codeArray: string[]) => {
    return codeArray.every((digit) => digit !== '');
  };

  // handle change function
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) {
      // setAllowDigits(false);
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Clear non-digit error if it exists
    // setAllowDigits(true);

    // Clear error when any digit is entered in the last input
    if (index === 5 && value) {
      setError('');
    } else if (!areAllDigitsFilled(newCode)) {
      setError('Please enter all 6 digits');
    } else {
      setError('');
    }

    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all digits are filled
    if (index === 5 && value && areAllDigitsFilled(newCode)) {
      handleVerification();
    }
  };

  // error state for each box
  const updateErrorState = (codeArray: string[]) => {
    if (areAllDigitsFilled(codeArray)) {
      setError('');
    } else {
      setError('Please enter all 6 digits');
    }
  };

  // keyboard key navigation
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace') {
      if (!code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = '';
        setCode(newCode);
        updateErrorState(newCode);
        e.preventDefault();
      } else if (code[index]) {
        const newCode = [...code];
        newCode[index] = '';
        setCode(newCode);
        updateErrorState(newCode);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (e.key === 'Delete') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
      updateErrorState(newCode);

      if (index < code.length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        inputRefs.current[5]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (pastedData.length === 6) {
      const newCode = pastedData.split('');
      setCode(newCode);
      inputRefs.current[5]?.focus();
      setError(''); // Clear error when valid code is pasted
    } else {
      setError('Please enter all 6 digits');
    }
  };

  // for test.
  const handleVerification = async () => {
    const enteredCode = code.join('');
    if (!enteredCode || enteredCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      await delay(1000);

      if (enteredCode === '123456') {
        onSuccess();
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } catch (err) {
      // console.log(err);
      setError(`${err}Verification failed. Please try again.`);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (isResendDisabled) return;

    try {
      await onResendCode?.();
      setTimeLeft(60);
      setIsResendDisabled(true);
      setCode(Array(6).fill(''));
      setError('');
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(`${err} Failed to resend code. Please try again.`);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full space-y-8">
        <div className="text-center space-y-4">
          <h2 className="capitalize text-[1.4rem] md:text-2xl lg:text-4xl font-bold text-[#7065F0]">
            Email Confirmation
          </h2>
          <p className="text-sm md:text-lg text-{#111113] mb-8">
            Enter the{' '}
            <span className="text-[#4036af] font-medium">6-digit</span> code
            sent to your email to complete registration
          </p>
        </div>

        <span>use 123456 as test code</span>
        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <VerificationInput
              key={index}
              value={digit}
              index={index}
              onChange={(value) => handleChange(value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={setInputRef(index)}
            />
          ))}
        </div>

        {error && <ErrorAlert message={error} />}

        <div className="space-y-4">
          <Button
            onClick={handleVerification}
            disabled={isVerifying || code.some((digit) => !digit)}
            className="w-full bg-[#7065F0] hover:bg-[#4036af] text-white"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Code'
            )}
          </Button>

          <div className="text-center">
            <CountdownButton
              onClick={handleResendCode}
              isDisabled={isResendDisabled}
              timeLeft={timeLeft}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
