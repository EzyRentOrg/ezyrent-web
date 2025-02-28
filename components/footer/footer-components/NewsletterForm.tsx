'use client';
import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { User, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' })
});

export default function NewsletterForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: { email: '' }
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = form;

  const emailValue = watch('email'); // Watch email input value
  const hasErrors = Object.keys(errors).length > 0; // Check if form has errors

  // onSubmit handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to subscribe: ${result.error}`);
      }
      toast.success('Successfully subscribed to our newsletter!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between md:space-y-4">
      <div>
        <p className="text-lg text-[#475467] md:text-xl font-[500] first-letter:capitalize">
          Join our newsletter
        </p>
        <p className="md:leading-6 mb-4 md:mb-0 text-[#475467]/80 text-xs md:text-sm first-letter:capitalize">
          To keep up to date with exclusive deals, offers, and insights
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4"
        >
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative w-[326px] ">
                    <Input
                      placeholder="Enter your email"
                      className="h-[52px] bg-transparent rounded-[64px] pl-12 focus-visible:ring-0 placeholder:text-[#344054]"
                      {...field}
                      autoComplete="off"
                      disabled={loading}
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 rounded-md p-2">
                      <User size={20} />
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant="default"
            className={`bg-[#7F56D9] flex items-center rounded-[64px] text-[#f1f1f1] h-[52px] w-full max-w-[133px] leading-[14.52px] first-letter:capitalize disabled:cursor-not-allowed`}
            disabled={loading || hasErrors || !emailValue} // Disable button if loading, has errors, or email is empty
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
            <Send
              size={12}
              stroke={'#f1f1f1'}
              className={`${loading ? 'animate-sendZ' : ''} ml-px`}
            />
          </Button>
        </form>
      </Form>
    </div>
  );
}
