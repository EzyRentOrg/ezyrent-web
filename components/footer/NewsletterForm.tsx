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
import { User } from 'lucide-react';
import { Button } from '../ui/button';

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
    <div className="flex flex-col md:flex-row items-center justify-between md:space-y-4">
      <div>
        <p className="text-lg text-[#475467] md:text-xl font-[500] first-letter:capitalize">
          join our newsletter
        </p>
        <p className="md:leading-6 mb-4 md:mb-0 text-[#475467]/80  text-xs md:text-sm first-letter:capitalize">
          to keep up to date with exclusive deals, offers and insights
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-center "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-[326px] h-[52px]">
                    <Input
                      placeholder="Enter your email"
                      className="h-full bg-transparent rounded-[64px] pl-12 right-0 focus-visible:ring-0 placeholder:text-[#344054]"
                      {...field}
                      autoComplete="off"
                    />
                    {/* Send Button */}
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 rounded-md p-2">
                      <User size={20} className="" />
                    </div>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={'default'}
            className="bg-[#7F56D9] rounded-[64px] text-[#f1f1f1] h-[52px] w-full max-w-[133px] leading-[14.52px] first-letter:capitalize"
          >
            Subscribe
          </Button>
        </form>
      </Form>
    </div>
  );
}
