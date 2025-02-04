'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader2, Mail } from 'lucide-react';
// import useDelay from '@/hooks/useDelay';
import CountdownButton from '@/components/CountdownButton';
import VerificationInput from '@/components/VerificationInput';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import axios from 'axios';

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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL; // URL
  const [state, setState] = useState<VerificationState>(initialState);
  const [adminEmail, setAdminEmail] = useState<string>(''); // Ensure type safety here
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  // const delay = useDelay();
  const callbackUrl = searchParams.get('callbackUrl'); // Get the callback URL from the query

  const updateState = useCallback((updates: Partial<VerificationState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  }, []);

  // Focus on the first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // check if all are filled
  const areAllCharactersFilled = useCallback((codeArray: string[]): boolean => {
    return codeArray.every((code) => code !== '');
  }, []);

  // Get email from local storage
  useEffect(() => {
    const storedEmail = localStorage.getItem('adminEmail');
    if (storedEmail) {
      setAdminEmail(storedEmail);
    }
  }, []);

  // Get code from URL
  useEffect(() => {
    const urlCode = searchParams.get('code');
    if (urlCode?.length === 6) {
      updateState({ code: urlCode.split('') });
    }
  }, [searchParams]);

  // Retrieve the start time and calculate remaining time on refresh
  useEffect(() => {
    const startTime = localStorage.getItem('countdownStartTime');
    if (startTime) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(startTime, 10)) / 1000
      );
      const remainingTime = 60 - elapsedTime;

      if (remainingTime > 0) {
        setState((prevState) => ({
          ...prevState,
          timeLeft: remainingTime
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          timeLeft: 0,
          isResendDisabled: false
        }));
      }
    }
  }, []);

  // Timeout for resend button
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state.timeLeft > 0 && state.isResendDisabled) {
      localStorage.setItem('countdownStartTime', Date.now().toString());

      timer = setInterval(() => {
        updateState({ timeLeft: state.timeLeft - 1 });
        localStorage.setItem('timeLeft', (state.timeLeft - 1).toString());
      }, 1000);
    } else if (state.timeLeft === 0) {
      updateState({ isResendDisabled: false });
      localStorage.removeItem('countdownStartTime');
    }

    return () => clearInterval(timer);
  }, [state.timeLeft, state.isResendDisabled]);

  // Handle change for input
  const handleChange = (value: string, index: number): void => {
    const newCode = [...state.code];
    newCode[index] = value;

    updateState({
      code: newCode,
      error:
        value && index === 5
          ? ''
          : !areAllCharactersFilled(newCode)
            ? 'Please enter all 6 digits'
            : ''
    });

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && value && areAllCharactersFilled(newCode)) {
      handleVerification();
    }
  };

  // Handle keydown events
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
      error: areAllCharactersFilled(newCode) ? '' : 'Please enter all 6 digits'
    });
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);

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

  // Handle verification
  const handleVerification = useCallback(async (): Promise<void> => {
    const enteredCode = state.code.join('');

    if (!enteredCode || enteredCode.length !== 6) {
      updateState({ error: 'Please enter all 6 digits' });
      return;
    }

    const data = {
      email: adminEmail,
      password: enteredCode
    };

    updateState({
      error: '',
      isError: false,
      isSuccess: false,
      isVerifying: true
    });

    try {
      const response = await axios.post('/api/auth/verifyOtp', data, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (response?.data?.success) {
        toast.success('Login successful');
        updateState({ isSuccess: true });

        if (callbackUrl) {
          router.push(callbackUrl);
        } else {
          router.replace('/admin/dashboard');
        }
      } else {
        toast.error(
          response?.data?.message ||
            'Invalid verification code. Please try again.'
        );
        updateState({ isError: true, isSuccess: false });
      }
    } catch (err) {
      console.error('Error:', err);
      if (axios.isAxiosError(err) && err.response) {
        toast.error(
          err.response.data.message || 'Verification failed. Please try again.'
        );
      } else {
        toast.error('Verification failed. Please try again.');
      }
      updateState({ isError: true, isSuccess: false });
    } finally {
      updateState({ isVerifying: false });
    }
  }, [state.code, adminEmail, callbackUrl, router, updateState]);

  // Trigger verification automatically when all digits are filled
  useEffect(() => {
    if (areAllCharactersFilled(state.code)) {
      handleVerification();
    }
  }, [state.code, handleVerification]);

  // Resend code
  const handleResendCode = async (): Promise<void> => {
    if (state.isResendDisabled) {
      toast.error(
        `Please wait ${state.timeLeft} seconds before requesting a new code`
      );
      return;
    }

    if (!adminEmail) {
      toast.error('No admin email found');
      return;
    }

    try {
      // Update state before making the request
      updateState({
        timeLeft: 60,
        isResendDisabled: true,
        code: Array(6).fill(''),
        error: ''
      });

      // Focus on first input
      inputRefs.current[0]?.focus();

      const response = await axios.post(
        `${baseUrl}/api/v1/admin/auth/create-access-password`,
        { email: adminEmail },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );

      if (response?.data?.success) {
        toast.success('Check your email for a new code');
        // Start the countdown timer
        localStorage.setItem('countdownStartTime', Date.now().toString());
      } else {
        toast.error(
          response?.data?.message || 'Failed to send verification code'
        );
        // Reset the disabled state if the request failed
        updateState({
          isResendDisabled: false,
          timeLeft: 0
        });
      }
    } catch (err) {
      console.error('Resend Error:', err);

      // Type guard for AxiosError
      if (axios.isAxiosError(err)) {
        console.error('API Error Details:', {
          status: err.response?.status,
          data: err.response?.data,
          message: err.message
        });

        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'Failed to resend code. Please try again.';

        toast.error(errorMessage);
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }

      // Reset the disabled state on error
      updateState({
        isResendDisabled: false,
        timeLeft: 0,
        error: 'Failed to resend code'
      });
    }
  };

  // Set input ref
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
          <form className="w-full flex flex-col items-center">
            <p className="my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%] w-[85%] ">
              Input the
              <span className="text-[#4036af] font-medium mx-1">
                6-character code
              </span>
              sent to your email to complete registration
            </p>
            {/* input */}
            <div className="w-full mt-5 flex items-center justify-between">
              {state.code.map((digit, index) => (
                <VerificationInput
                  key={index}
                  disabled={state.isVerifying}
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

            <div className="space-y-4 w-full lg:w-[85%]">
              <Button
                onClick={handleVerification}
                disabled={
                  state.isVerifying || state.code.some((digit) => !digit)
                }
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
            </div>
          </form>
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
