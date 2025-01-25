'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, Mail } from 'lucide-react';
import useDelay from '@/hooks/useDelay';
import CountdownButton from '@/components/CountdownButton';
import VerificationInput from '@/components/VerificationInput';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface VerificationState {
  code: string[];
  error: string;
  isError: boolean;
  isSuccess: boolean;
  isVerifying: boolean;
  timeLeft: number;
  isResendDisabled: boolean;
}

export default function VerificationOTP() {
  const initialState: VerificationState = {
    code: Array(6).fill(''),
    error: '',
    isError: false,
    isSuccess: false,
    isVerifying: false,
    timeLeft: 60,
    isResendDisabled: true
  };

  const [state, setState] = useState<VerificationState>(initialState);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const delay = useDelay();

  const updateState = (updates: Partial<VerificationState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    const urlCode = searchParams.get('code');
    if (urlCode?.length === 6) {
      updateState({ code: urlCode.split('') });
    }
  }, [searchParams]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.timeLeft > 0 && state.isResendDisabled) {
      timer = setInterval(() => {
        updateState({ timeLeft: state.timeLeft - 1 });
      }, 1000);
    } else if (state.timeLeft === 0) {
      updateState({ isResendDisabled: false });
    }
    return () => clearInterval(timer);
  }, [state.timeLeft, state.isResendDisabled]);

  const areAllDigitsFilled = (codeArray: string[]): boolean => {
    return codeArray.every((digit) => digit !== '');
  };

  const handleChange = (value: string, index: number): void => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...state.code];
    newCode[index] = value;

    updateState({
      code: newCode,
      error:
        value && index === 5
          ? ''
          : !areAllDigitsFilled(newCode)
            ? 'Please enter all 6 digits'
            : ''
    });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && value && areAllDigitsFilled(newCode)) {
      handleVerification();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { key } = e;
    const newCode = [...state.code];

    switch (key) {
      case 'Backspace':
        if (!state.code[index] && index > 0) {
          e.preventDefault();
          inputRefs.current[index - 1]?.focus();
          newCode[index - 1] = '';
        } else if (state.code[index]) {
          newCode[index] = '';
        }
        break;
      case 'ArrowLeft':
        if (index > 0) inputRefs.current[index - 1]?.focus();
        break;
      case 'ArrowRight':
        if (index < 5) inputRefs.current[index + 1]?.focus();
        break;
      case 'Delete':
        newCode[index] = '';
        if (index < 5) inputRefs.current[index + 1]?.focus();
        break;
    }

    updateState({
      code: newCode,
      error: areAllDigitsFilled(newCode) ? '' : 'Please enter all 6 digits'
    });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);

    if (pastedData.length === 6) {
      updateState({
        code: pastedData.split(''),
        error: ''
      });
      inputRefs.current[5]?.focus();
    } else {
      updateState({ error: 'Please enter all 6 digits' });
    }
  };

  const handleVerification = async (): Promise<void> => {
    const enteredCode = state.code.join('');
    if (!enteredCode || enteredCode.length !== 6) {
      updateState({ error: 'Please enter all 6 digits' });
      return;
    }

    updateState({
      error: '',
      isError: false,
      isSuccess: false,
      isVerifying: true
    });

    try {
      await delay(2000);
      if (enteredCode === '123456') {
        updateState({ isSuccess: true });
        router.replace('/admin/dashboard');
      } else {
        toast.error('Invalid verification code. Please try again.');
        updateState({
          isError: true,
          isSuccess: false
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Verification failed. Please try again.';
      toast.error(errorMessage);
      updateState({
        error: errorMessage,
        isError: true,
        isSuccess: false
      });
    } finally {
      updateState({ isVerifying: false });
    }
  };

  const handleResendCode = async (): Promise<void> => {
    if (state.isResendDisabled) return;

    try {
      updateState({
        timeLeft: 60,
        isResendDisabled: true,
        code: Array(6).fill(''),
        error: ''
      });
      inputRefs.current[0]?.focus();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Failed to resend code. Please try again.';
      updateState({ error: errorMessage });
    }
  };

  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputRefs.current[index] = el;
  };

  return (
    <div className="px-5 lg:ml-5 pb-5">
      <div className="w-full md:w-[80%] mx-auto">
        <div className="mb-10 text-center flex flex-col items-center justify-center space-y-4">
          <div className="bg-[#E9D7FE] rounded-full size-20 flex items-center justify-center">
            <Mail stroke="#f1f1f1" fill="#7F56D9" size={35} />
          </div>
          <h2 className="capitalize text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
            Check your email
          </h2>
          <p className="my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%] w-[80%]">
            Input the
            <span className="text-[#4036af] font-medium mx-2">6-digit</span>
            code sent to your email to complete registration
          </p>
        </div>

        <div className="flex items-center justify-between">
          {state.code.map((digit, index) => (
            <VerificationInput
              key={index}
              value={digit}
              index={index}
              isError={state.isError}
              isSuccess={state.isSuccess}
              onChange={(value) => handleChange(value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={setInputRef(index)}
            />
          ))}
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleVerification}
            disabled={state.isVerifying || state.code.some((digit) => !digit)}
            type="submit"
            className={cn(
              'bg-[#000929] h-[72px] !mt-10 w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150',
              {
                'bg-opacity-75 transition-colors duration-150 ease-in-out':
                  state.isVerifying
              }
            )}
          >
            {state.isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Proceed'
            )}
          </Button>

          <div className="text-center">
            <CountdownButton
              onClick={handleResendCode}
              isDisabled={state.isResendDisabled}
              timeLeft={state.timeLeft}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
