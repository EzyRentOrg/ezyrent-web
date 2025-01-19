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
import { contactSchema } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { Loader, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Infer the type from the schema
type FormValues = z.infer<typeof contactSchema>;

export default function Contatct() {
  const delay = useDelay();
  const form = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting }
  } = form;

  const onSubmit = async (data: FormValues) => {
    await delay(2000);
    toast.success('Message sent successfully');

    console.log(data);
  };


  return (
    <section className="max-w-[1400px] min-h-screen mx-auto mb-10 flex items-center space-x-10">
      <main className="h-full w-full flex flex-col ">
        <div className="bg-[#F8F8F8] h-full mb-10 rounded-[20px] md:px-[16rem]">
          <MaxWidthWrapper className="md:w-[80%] mx-auto pb-10 ">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className=" mt-6">
                <div className="grid gap-4">
                  {/* full name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative flex items-center ">
                            {/* Input Field */}
                            <Input
                              type="text"
                              className="bg-[#FFFFFF] h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] ring-[#EAECF0] focus:outline-[#EAECF0] outline-[#EAECF0] focus:border-[#EAECF0] leading-[22.4px] text-black !text-[1.1rem]"
                              placeholder="Full Name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

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

                  {/* message */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative flex items-center ">
                            {/* Input Field */}
                            <textarea
                              className="bg-[#FFFFFF] h-[200px] pl-[70px] pr-[48px] pt-[20px] border-[#EAECF0] rounded-[2rem] placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] ring-[#EAECF0] focus:outline-[#EAECF0] outline-[#EAECF0] focus:border-[#EAECF0] leading-[22.4px] text-black !text-[1.1rem] w-full"
                              placeholder="Message"
                              {...field}
                            />
                          </div>
                        </FormControl>
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
                    'Send Message'
                  )}
                </Button>
              </form>
            </Form>
          </MaxWidthWrapper>
        </div>
      </main>
    </section>
  );
}
