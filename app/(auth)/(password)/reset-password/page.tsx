'use client';
import React, { useState } from 'react';
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
import { cn } from '@/lib/utils';
import { Eye, EyeOffIcon, ArrowLeft, Loader, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import RightHandAuthPage from '@/components/RightHandAuthPage';
import MaxWidthWrapper from '@/app/maxWidthWrapper';
import { useRouter } from 'next/navigation';
import LappedImages from '@/components/LappedImages';

const resetPasswordSchema = z.object({
  password: z.string(),
  confirmPassword: z.string()
});

// Infer the type from the schema
type FormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const router = useRouter();
  const delay = useDelay();
  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'all',
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prev) => !prev);
  };

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (data: FormValues) => {
    await delay(2000);
    console.log(data);

    router.push('/password-reset-successful');
  };

  return (
    <MaxWidthWrapper>
      <section className="min-h-[984px] mx-auto mb-10 flex items-center space-x-10">
        {/* left side */}

        <main className="h-[964px] w-full flex flex-col ">
          <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] pt-[120px]">
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
                <div className="my-5 text-center flex flex-col items-center justify-center space-y-2">
                  <h2 className="text-[#344054] text-[1.5rem] font-extrabold leading-[33.6px] -tracking-[2%]">
                    Create a New password
                  </h2>
                  <p className="my-1px text-[#475467] text-[0.875rem] leading-[28px] font-medium -tracking-[2%]">
                    Enter your new password below to complete the reset process.
                    Ensure its Strong and secure
                  </p>
                </div>
                <Form {...form}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-6 mt-6"
                  >
                    {/* Password */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="capitalize text-[#475467] font-semibold text-[1rem] leading-[22.4px]">
                            new password
                          </FormLabel>
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
                          <FormLabel className="capitalize text-[#475467] font-semibold text-[1rem] leading-[22.4px]">
                            repeat new password
                          </FormLabel>
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

                    <Button
                      type="submit"
                      className={cn(
                        'bg-[#000929] h-[72px] !mt-8 w-full capitalize text-[1.25rem] font-medium leading-[28px] mx-auto rounded-[80px] hover:bg-opacity-85 transition-colors duration-150',
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
          <LappedImages />
        </main>
        {/* right side */}
        <RightHandAuthPage />
      </section>
    </MaxWidthWrapper>
  );
}
