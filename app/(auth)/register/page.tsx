'use client';

import React, { useState } from 'react';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
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
import { Eye, EyeOffIcon, Loader, Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import OAuth from '@/components/OAuth';
import Link from 'next/link';
import RightHandAuthPage from '@/components/RightHandAuthPage';
import { toast } from 'sonner';
import LappedImages from '@/components/LappedImages';

const signUpSchema = z.object({
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string()
})

// Infer the type from the schema
type FormValues = z.infer<typeof signUpSchema>;

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const delay = useDelay();
  const form = useForm<FormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (data: FormValues) => {
    await delay(2000);
    toast.success('Congratulations', {
      description: 'You have successfully registered'
    });
    console.log(data);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <MaxWidthWrapper>
      <section className="min-h-[984px] mx-auto mb-10 flex items-center space-x-10">
        {/* left side */}

        <main className="h-[964px] w-full flex flex-col ">
          <div className="bg-[#F8F8F8] h-full mb-10  rounded-[20px] pt-[120px]">
            <div className="md:w-[80%] mx-auto pb-5">
              <div>
                <h2 className="capitalize text-[#7F56D9] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
                  <em>welcome to ezyRent</em>
                </h2>
                <p className="my-1px text-[#475467] text-[1.25rem] leading-[28px] font-bold -tracking-[2%]">
                  Find, Rent, and Manage Properties Seamlessly
                </p>
                <p className="text-[0.975rem] italic leading-[24px] font-normal text-[#667085]">
                  EzyRent simplifies property transactions with verified
                  listings, AI-powered insights, & secure processes, making
                  renting or buying homes stress-free.
                </p>
              </div>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className=" mt-6">
                  <div className="grid gap-4">
                    {/* email */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
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

                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative flex items-center ">
                              {/* Icon Container */}
                              <div className="absolute left-5 flex items-center space-x-4">
                                <Lock size={20} stroke="#9E77ED" />
                                <Separator
                                  orientation="vertical"
                                  className="bg-[#9E77ED] h-6 w-[1px]"
                                />
                              </div>
                              {/* Input Field */}
                              <Input
                                type={isPasswordVisible ? 'text' : 'password'}
                                className="bg-[#FFFFFF] h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] ring-[#EAECF0] focus:outline-[#EAECF0] outline-[#EAECF0] focus:border-[#EAECF0] leading-[22.4px] text-black !text-[1.1rem] "
                                placeholder="password"
                                {...field}
                              />
                              {/* Password Visibility Icon */}
                              <div
                                tabIndex={0}
                                role="button"
                                aria-label="Toggle password visibility"
                                onClick={handlePasswordVisibility}
                                className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                              >
                                {isPasswordVisible ? <EyeOffIcon /> : <Eye />}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/*confirm Password */}
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative flex items-center ">
                              {/* Icon Container */}
                              <div className="absolute left-5 flex items-center space-x-4">
                                <Lock size={20} stroke="#9E77ED" />
                                <Separator
                                  orientation="vertical"
                                  className="bg-[#9E77ED] h-6 w-[1px]"
                                />
                              </div>
                              {/* Input Field */}
                              <Input
                                type={
                                  isConfirmPasswordVisible ? 'text' : 'password'
                                }
                                className="bg-[#FFFFFF] h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] ring-[#EAECF0] focus:outline-[#EAECF0] outline-[#EAECF0] focus:border-[#EAECF0] leading-[22.4px] text-black !text-[1.1rem] "
                                placeholder="Re-enter password"
                                {...field}
                              />
                              {/* Password Visibility Icon */}
                              <div
                                tabIndex={0}
                                role="button"
                                aria-label="Toggle password visibility"
                                onClick={handleConfirmPasswordVisibility}
                                className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
                              >
                                {isConfirmPasswordVisible ? (
                                  <EyeOffIcon />
                                ) : (
                                  <Eye />
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                {/* OAuth  */}
                <OAuth />

                {/* Alreday registered */}
                <div className="mt-5 text-[1rem] font-medium leading-[22.4px] flex items-center justify-center space-x-2">
                  <p>Already have an account? </p>
                  <Link
                    href={'/login'}
                    className="capitalize text-[#6941C6] hover:text-opacity-85 transition-colors duration-100"
                  >
                    Login
                  </Link>
                </div>
              </Form>
            </div>
          </div>
          {/* lapped images */}
          <LappedImages />
        </main>
        {/* right side */}
        <RightHandAuthPage />
      </section>
    </MaxWidthWrapper>
  );
}
