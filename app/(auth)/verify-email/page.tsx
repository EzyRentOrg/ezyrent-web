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
import { cn } from '@/lib/utils';
import { Mail } from 'lucide-react';
import Image from 'next/image';
import { lappedImages } from '@/config';
import RightHandAuthPage from '@/components/RightHandAuthPage';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { useRouter } from 'next/navigation';
import LappedImages from '@/components/LappedImages';
import {toast} from 'sonner'

interface VerificationFormProps {
  onSuccess: () => void;
  onResendCode?: () => Promise<void>;
}

export default function VerifyEmail({
  onSuccess,
  onResendCode
}: VerificationFormProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const [error, setError] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  // const [allowDigits, setAllowDigits] = useState<boolean>(true);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter()
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
    setError('');
    setIsError(false)
    setIsSuccess(false)
    const enteredCode = code.join('');
    if (!enteredCode || enteredCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    

    try {
      
      if (enteredCode === '123456') {
        setIsSuccess(true)
        await delay(1000);
        router.replace("/admin/dashboard")

      } else {
        toast.error('Invalid verification code. Please try again.');
   
    setIsError(true)
    setIsSuccess(false)
      }
    } catch (err) {
      // console.log(err);
      setError(`${err}Verification failed. Please try again.`);
toast.error(`${err}Verification failed. Please try again.`)
    
    setIsError(true)
    setIsSuccess(false)
      
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
    <MaxWidthWrapper >
      <section className="min-h-[984px] mx-auto mb-10 flex items-center space-x-10">
        {/* left side */}

        <main className="h-[964px] w-full flex flex-col ">
          <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[140px]">
            <div className="ml-5 pb-5">
              <div className="md:w-[80%] mx-auto">
                <div className="my-10 text-center flex flex-col items-center justify-center space-y-4">
                  <div className="bg-[#E9D7FE] rounded-full size-20 flex items-center justify-center">
                    <Mail stroke={'#f1f1f1'} fill={'#7F56D9'} size={35} />
                  </div>
                  <h2 className="capitalize text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
                    Check your email
                  </h2>
                  <p className="my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%] w-[80%]">
                    Enter the
                    <span className="text-[#4036af] font-medium mx-2">6-digit</span>code
                    sent to your email to complete registration
                  </p>
                </div>

                <div className="flex justify-center gap-10">
                  {code.map((digit, index) => (
                    <VerificationInput
                      key={index}
                      value={digit}
                      index={index}
                      isError={isError}
                      isSuccess={isSuccess}
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
                    disabled={isVerifying || code.some((digit) => !digit)}
                    type="submit"
                    className={cn(
                      'bg-[#000929] h-[72px] !mt-10 w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150',
                      {
                        'bg-opacity-75 transition-colors duration-150 ease-in-out':
                          isVerifying
                      }
                    )}
                  >
                    {isVerifying ? (
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
                      isDisabled={isResendDisabled}
                      timeLeft={timeLeft}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* lapped images */}
          <LappedImages />
        </main>
        {/* right side */}
        <RightHandAuthPage />
      </section>
    </MaxWidthWrapper>
  )
}
