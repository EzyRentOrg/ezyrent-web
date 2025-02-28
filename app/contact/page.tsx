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
import { contactSchema } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { Loader, Mail, User, ScanEye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

type FormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', subject: '', message: '' }
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors }
  } = form;

  const nameValue = watch('name');
  const emailValue = watch('email');
  const subjectValue = watch('subject');
  const messageValue = watch('message');
  const hasErrors = Object.keys(errors).length > 0;

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(`Failed to send message: ${result.error}`);
      }

      toast.success('Message sent successfully');
      form.reset(); // Reset form on success
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MaxWidthWrapper className="mx-auto pb-10 w-full">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-[500px] grid gap-4 w-full mx-auto mt-10"
        >
          {/* Full Name */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center">
                    <div className="absolute left-5 flex items-center space-x-4">
                      <User size={20} stroke="#9E77ED" />
                      <Separator
                        orientation="vertical"
                        className="bg-[#9E77ED] h-6 w-[1px]"
                      />
                    </div>
                    <Input
                      type="text"
                      className="bg-white h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] text-black !text-[1.1rem]"
                      placeholder="Full Name"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={control}
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
                      className="bg-white h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] text-black !text-[1.1rem]"
                      placeholder="example@gmail.com"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* subject */}
          <FormField
            control={control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center">
                    <div className="absolute left-5 flex items-center space-x-4">
                      <ScanEye size={20} stroke="#9E77ED" />
                      <Separator
                        orientation="vertical"
                        className="bg-[#9E77ED] h-6 w-[1px]"
                      />
                    </div>
                    <Input
                      type="subject"
                      className="bg-white h-[64px] pl-[70px] pr-[48px] border-[#EAECF0] rounded-full placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] text-black !text-[1.1rem]"
                      placeholder="Looking for a 3 bedroom apartment"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex items-center">
                    <textarea
                      className="bg-white h-[200px] px-4 pt-[20px] border !border-[#EAECF0] rounded-[2rem] placeholder:text-[#D0D5DD] focus:ring-[#EAECF0] text-black !text-[1.1rem] w-full"
                      placeholder="Message"
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
              'bg-[#000929] h-[72px] !mt-10 w-full capitalize text-[1.25rem] font-medium rounded-[80px] hover:bg-opacity-85 transition-colors duration-150 disabled:cursor-not-allowed',
              {
                'bg-opacity-75 transition-colors duration-150 ease-in-out':
                  isSubmitting
              }
            )}
            disabled={
              loading || !nameValue || !emailValue || !subjectValue || !messageValue || hasErrors
            }
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" /> Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
}
