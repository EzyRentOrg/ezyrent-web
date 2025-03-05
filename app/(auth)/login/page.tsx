'use client';

import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useDelay from '@/hooks/useDelay';
import { cn } from '@/lib/utils';
import { Loader, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import OAuth from '@/components/OAuth';
import { useRouter } from 'next/navigation';
import RightHandAuthPage from '@/components/RightHandAuthPage';
import LappedImages from '@/components/LappedImages';
import { toast } from 'sonner';
import axios from 'axios';
import MaxWidthWrapper from '@/app/maxWidthWrapper';

// validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .transform((val) => val.toLowerCase().trim())
});

type FormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const delay = useDelay();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: ''
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors, isDirty }
  } = form;

  // call api to submit
  const onSubmit = async (data: FormValues) => {
    try {
      if (!data.email) {
        toast.error('Please enter your email address');
        router.push('/login');
        return;
      }

      // Get callback URL from query params
      const searchParams = new URLSearchParams(window.location.search);
      const callbackUrl = searchParams.get('callbackUrl') || '';
      // Store callbackUrl in local storage
      localStorage.setItem('callbackUrl', callbackUrl); //use server for efficenecy

      // Simulate network delay for better UX
      await delay(2000);

      const createResponse = await axios.post(
        `${baseUrl}/admin/auth/create-access-password`,
        { email: data.email },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (createResponse.data?.success) {
        localStorage.setItem('adminEmail', data.email);
        toast.success('Check your email for a verification code');

        // Construct the new URL with callbackUrl
        const verifyUrl = callbackUrl
          ? `/verify-email?callbackUrl=${encodeURIComponent(callbackUrl)}`
          : '/verify-email';

        router.push(verifyUrl);
      } else {
        toast.error(createResponse.data?.message || 'Failed to create access');
      }
    } catch (error) {
      console.error('Full error object:', error);

      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || error.message || 'An error occurred';

        if (error.response?.status === 401) {
          toast.error('Unauthorized access. Please contact support.');
        } else if (error.response?.status === 403) {
          toast.error('Access forbidden. Please contact support.');
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const disabled = isSubmitting || !isDirty || Object.keys(errors).length > 0;

  return (
    <MaxWidthWrapper className="px-0 w-full">
      <section className="min-h-[984px] w-full mx-auto mb-10 flex items-center space-x-10">
        {/* Left Side */}
        <main className="h-[964px] w-full flex flex-col">
          <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] px-5 lg:px-0 flex flex-col items-center justify-center">
            <div className="md:w-[80%] mx-auto pb-10">
              {/* Header Section */}
              <div>
                <h2 className="capitalize text-[#7F56D9] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
                  <em>Welcome to EzyRent</em>
                </h2>
                <p className="my-[2px] text-[#475467] text-[1.25rem] leading-[28px] font-bold -tracking-[2%]">
                  Find, Rent, and Manage Properties Seamlessly
                </p>
                <p className="text-[0.975rem] italic leading-[24px] font-normal text-[#667085]">
                  EzyRent simplifies property transactions with verified
                  listings, AI-powered insights, & secure processes, making
                  renting or buying homes stress-free.
                </p>
              </div>

              {/* Form Section */}
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                  <div className="grid gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative flex items-center">
                              <div className="absolute left-5 flex items-center space-x-4">
                                <Mail size={20} stroke="#9E77ED" />
                                <Separator
                                  orientation="vertical"
                                  className="bg-[#9E77ED] h-6 w-[1px]"
                                />
                              </div>
                              <Input
                                type="email"
                                className={cn(
                                  'bg-[#FFFFFF] h-[64px] pl-[70px] pr-[48px]',
                                  'border-[#EAECF0] rounded-full',
                                  'placeholder:text-[#D0D5DD]',
                                  'focus:ring-[#EAECF0] ring-[#EAECF0]',
                                  'focus:outline-[#EAECF0] outline-[#EAECF0]',
                                  'focus:border-[#EAECF0]',
                                  'leading-[22.4px] text-black !text-[1.1rem]'
                                )}
                                placeholder="example@gmail.com"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-red-500 mt-2" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={disabled}
                    className={cn(
                      'bg-[#000929] h-[72px] !mt-10 w-full',
                      'capitalize text-[1.25rem] font-medium leading-[28px]',
                      'mx-auto rounded-[80px]',
                      disabled
                        ? 'cursor-not-allowed bg-opacity-85'
                        : 'hover:bg-opacity-85 transition-colors duration-150'
                    )}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Loader className="animate-spin" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </form>

                <OAuth />
              </Form>
            </div>
          </div>

          <LappedImages />
        </main>

        {/* Right Side */}
        <RightHandAuthPage />
      </section>
    </MaxWidthWrapper>
  );
}
