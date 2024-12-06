'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '../ui/input';
import { SendHorizontal } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' })
});

export default function NewsletterForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  // onSubmit handler
  // const onSubmit = (data: z.infer<typeof formSchema>) => {
  //   // console.log('Form data:', data);
  // };
  const onSubmit = () => {
    // console.log('Form data:', data);
  };

  return (
    <div className="max-w-[256px] flex flex-col md:space-y-4">
      <p className="text-lg md:text-xl font-[500] first-letter:capitalize">
        Subscribe to our newsletter
      </p>
      <p className="md:leading-6 mb-4 md:mb-0 text-xs md:text-base">
        Get exclusive deals and exciting offers
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your email"
                      className="h-[50px] pr-12 bg-transparent right-0 focus-visible:ring-0"
                      {...field}
                      autoComplete="off"
                    />
                    {/* Send Button */}
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-md p-2"
                    >
                      <SendHorizontal size={24} className="" />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
