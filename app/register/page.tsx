'use client';
import React, { useState } from 'react';
import MaxWidthWrapper from '../maxWidthWrapper';
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
import { signUpSchema } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { Eye, EyeOffIcon, Loader, Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import OAuth from '@/components/OAuth';
import Image from 'next/image';
import Link from 'next/link';

// Infer the type from the schema
type FormValues = z.infer<typeof signUpSchema>;

const lappedImages: lappedImageType[] = [
  {
    src: 'melanin-lady-on-afro-hair_480x480.jpg',
    width: 480,
    height: 480,
    alt: 'A melanin lady on afro hair.'
  },
  {
    src: 'a-light-skinned-lady_480x320.jpg',
    width: 480,
    height: 320,
    alt: 'A light skinned lady.'
  },
  {
    src: 'a-handsome-guy-on-cozy-cap_320x480.jpg',
    width: 320,
    height: 480,
    alt: 'A handsome guy on a cozy cap.'
  }
];

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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

    console.log(data);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="w-[1400px] h-[984px] mx-auto mb-10 flex items-center space-x-10">
      {/* left side */}
      <div className="h-full w-full ">
        <div className="bg-[#F8F8F8] rounded-[20px] pt-[120px] mb-5">
          <MaxWidthWrapper className="w-[80%] mx-auto pb-5">
            <div>
              <h2 className="capitalize text-[#7F56D9] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
                <em>welcome to ezyRent</em>
              </h2>
              <p className="my-1px text-[#475467] text-[1.25rem] leading-[28px] font-bold -tracking-[2%]">
                Find, Rent, and Manage Properties Seamlessly
              </p>
              <p className="text-[0.975rem] italic leading-[24px] font-normal text-[#667085]">
                EzyRent simplifies property transactions with verified listings,
                AI-powered insights, & secure processes, making renting or
                buying homes stress-free.
              </p>
            </div>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className=" mt-6">
                <div className="grid gap-4">
                  {/* full name */}
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
                              type={isPasswordVisible ? 'text' : 'password'}
                              className="bg-[#FFFFFF] h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] ring-[#EAECF0] focus:outline-[#EAECF0] outline-[#EAECF0] focus:border-[#EAECF0] leading-[22.4px] text-black !text-[1.1rem] "
                              placeholder="Re-enter password"
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
                  className="text-[#6941C6] hover:text-opacity-85 transition-colors duration-100"
                >
                  Login
                </Link>
              </div>
            </Form>
          </MaxWidthWrapper>
        </div>
        <div className="bg-[#F8F8F8] rounded-[20px]">
          <MaxWidthWrapper className="h-[119px] grid place-items-center">
            <div className="flex items-center w-full ">
              <div className="flex items-center -space-x-4 ">
                {lappedImages.map((image, index) => (
                  <div
                    key={image.src + index}
                    className="rounded-full size-[59px] border-[2px] border-white"
                  >
                    <Image
                      src={`/${image.src}`}
                      width={image.width}
                      height={image.height}
                      alt={image.alt}
                      className="size-full rounded-full object-cover border-[2px] border-white"
                    />
                  </div>
                ))}
              </div>
              <div className="ml-4">
                <p className="text-[#344054] text-[1.125rem] font-semibold leading-[25.2px] first-letter:capitalize">
                  Making your next home easy
                </p>
                <p className="text-[#0.875rem] text-[#98A2B3] leading-[19.6px]">
                  Join 200k people to find a Home
                </p>
              </div>

              <div className="size-[59px] ml-auto text-[#667085]">
                <Image
                  src={'/icons/arrow-up-right_59x59.svg'}
                  width={59}
                  height={59}
                  alt="Circled right arrow."
                  className="size-full object-cover "
                />
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </div>
      {/* right side */}
      <div className=" w-full h-full">
        <div className="bg-[url('/a-block-of-apartments_2000x1333.png')] bg-no-repeat bg-center rounded-[20px] h-full w-full relative ">
          <div className="absolute rounded-[20px] h-full w-full bg-black/40" />
          <MaxWidthWrapper className="w-[90%] mx-auto pb-5">
            <div className=" max-w-[528px] mx-auto absolute bottom-[35%] glassmorphism  p-10 ">
              <h3 className="text-xl font-bold text-[1.25rem] -tracking-[2%] leading-[26.04px] text-white">
                Your Gateway to a Hassle-Free Home Search
              </h3>
              <ul className="list-disc mt-5">
                <li className="font-medium text-[1rem] -tracking-[2%] text-[#F9FAFB] ">
                  Access 100% verified property listings.
                </li>
                <li className="font-medium text-[1rem] -tracking-[2%] text-[#F9FAFB] ">
                  AI-driven recommendations tailored to your needs.
                </li>
                <li className="font-medium text-[1rem] -tracking-[2%] text-[#F9FAFB] ">
                  Safe and transparent transactions every step of the way.
                </li>
              </ul>
              <div className="mt-10 flex items-center space-x-8">
                <p className="font-medium text-[0.8rem] w-[75%] -tracking-[2%] text-[#F9FAFB] italic">
                  Start your journey today and join 10k users finding their
                  dream spaces with EzyRent.
                </p>
                <div className="size-[80px] ml-auto ">
                  <Image
                    src={'/icons/arrow-up-right-white_59x59.svg'}
                    width={59}
                    height={59}
                    alt="Circled right arrow."
                    color="#ffffff"
                    className="size-full object-cover  "
                  />
                </div>
              </div>
            </div>
          </MaxWidthWrapper>
        </div>
      </div>
    </div>
  );
}
