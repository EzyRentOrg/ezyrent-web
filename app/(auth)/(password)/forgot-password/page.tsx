'use client';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useDelay from '@/hooks/useDelay';
import { forgotPasswordSchema } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { lappedImages } from '@/config';
import RightHandAuthPage from '@/components/RightHandAuthPage';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { useRouter } from 'next/navigation';

import LappedImages from '@/components/LappedImages';

// Infer the type from the schema
type FormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPassword() {
  const router = useRouter();
  const delay = useDelay();
  const form = useForm<FormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'all',
    defaultValues: {
      email: ''
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (data: FormValues) => {
    await delay(2000);
    console.log(data);

    // TODO: implement forgot password logic here

    router.push('/email-sent');
  };

  return (
    <MaxWidthWrapper>
    <section className="min-h-[984px] mx-auto mb-10 flex items-center space-x-10">
      {/* left side */}

      <main className="h-[964px] w-full flex flex-col ">
        <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[140px]">
          <div className="ml-5 pb-5">
            <div>
              <Button
                variant={'ghost'}
                onClick={() => router.back()}
                className="capitalize text-[#475467] hover:text-opacity-85 transition-colors duration-100 ease-in-out font-medium text-[1rem] leading-[22.4px] "
              >
                <ArrowLeft size={18} className="inline-flex ml-2" /> back
              </Button>
            </div>
            <div className="md:w-[80%] mx-auto">
              <div className="my-10 text-center flex flex-col items-center justify-center space-y-4">
                <h2 className="capitalize text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
                  Forgot Password
                </h2>
                <p className="my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%]">
                  No worries! Enter your email address below, and we&apos;ll
                  send you a link to reset your password.
                </p>
              </div>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className=" mt-6">
                  {/* email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#475467] font-semibold text-[1rem] leading-[22.4px]">
                          Email
                        </FormLabel>
                        <FormControl>
                          <div className="relative flex items-center ">
                            {/* Icon Container */}
                            <div className="absolute left-5 flex items-center space-x-4">
                              <Mail size={20} stroke="#9E77ED" />
                              <Separator
                                orientation="vertical"
                                className="bg-[#9E77ED] h-6 w-[1px]"
                              />
                            </div>
                            {/* Input Field */}
                            <Input
                              type="email"
                              className="bg-[#FFFFFF] h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] ring-[#EAECF0] focus:outline-[#EAECF0] outline-[#EAECF0] focus:border-[#EAECF0] leading-[22.4px] text-black !text-[1.1rem]"
                              placeholder="example@gmail.com"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className={cn(
                      'bg-[#000929] h-[72px] !mt-10 w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150',
                      {
                        'bg-opacity-75 transition-colors duration-150 ease-in-out':
                          isSubmitting
                      }
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader /> submitting...
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
        {/* lapped images */}
        <LappedImages/>
      </main>
      {/* right side */}
      <RightHandAuthPage />
    </section>
    </MaxWidthWrapper>
  );
}
