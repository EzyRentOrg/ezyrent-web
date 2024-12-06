import React, { useRef, useState } from 'react';
import {
  Bell,
  CloudUpload,
  File as FileIcon,
  Loader,
  UploadCloud,
  X
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { getCountries, isValidPhoneNumber } from 'react-phone-number-input';
import en from 'react-phone-number-input/locale/en';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import 'react-phone-number-input/style.css';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CountryCode } from 'libphonenumber-js';
import useDelay from '@/hooks/useDelay';
import { cn } from '@/lib/utils/cn';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // max file size 2MB

const checkFileType = (file: File) => {
  if (!file) return;
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return allowedTypes.includes(file.type);
};

const basicProfileSchema = z.object({
  fullName: z
    .string({
      required_error: 'Full name is required',
      invalid_type_error: 'Full name must be a string'
    })
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .regex(/^[A-Za-z\s]+$/, {
      message: 'Full name must contain only letters.'
    }),
  dateOfBirth: z
    .string({ required_error: 'Please select a date of birth.' })
    .refine((date) => !isNaN(Date.parse(date)), { message: 'Invalid date.' }),
  country: z
    .string({ required_error: 'Please select a country.' })
    .refine((val) => val !== '', {
      message: 'Country is required'
    }),
  userCity: z
    .string({ required_error: 'Please enter your city.' })
    .min(2, { message: 'Enter your city.' }),
  businessName: z
    .string({
      required_error: 'Business name is required.'
    })
    .min(1, { message: 'Enter your business name.' }),
  businessAddress: z
    .string({
      required_error: 'Business address is required.'
    })
    .min(2, { message: 'Enter your business address.' }),
  phoneNumber: z
    .string({ required_error: 'Phone number is required.' })
    .refine((phoneValue) => isValidPhoneNumber(phoneValue), {
      message: 'Invalid phone number'
    })
    .transform((val) => val || ''),
  postalCode: z
    .string({ required_error: 'Postal code is required.' })
    .regex(/^\d+$/, { message: 'Postal code must be a number.' })
    .min(4, { message: 'Postal code must be more than.' }),
  file: z
    .instanceof(File)
    .nullable()
    .refine((file) => file !== null && file.size !== 0, {
      message: 'File is required'
    })
    .refine((file) => file === null || file.size <= MAX_FILE_SIZE, {
      message: 'Max size is 2MB.'
    })
    .refine((file) => file === null || checkFileType(file), {
      message: 'Only JPEG, PNG, GIF, and WEBP files are supported.'
    })
});

// Infer the type from the schema
type FormValues = z.infer<typeof basicProfileSchema>;

export default function BasicInfo() {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('US');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const delay = useDelay();

  const form = useForm<FormValues>({
    resolver: zodResolver(basicProfileSchema),
    mode: 'all',
    defaultValues: {
      fullName: '',
      dateOfBirth: '',
      country: '',
      userCity: '',
      businessName: '',
      businessAddress: '',
      phoneNumber: '',
      postalCode: '',
      file: null
    }
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting }
  } = form;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileError(null);

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File size exceeds 2MB limit');
        return;
      }
      if (!checkFileType(file)) {
        setFileError('Only JPEG, PNG, GIF, and WEBP files are supported.');
        return;
      }

      setFileName(file.name);
      form.setValue('file', file, { shouldValidate: true });
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setFileError(null);

    // Reset the file value to null
    form.setValue('file', null, { shouldValidate: true });

    // reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setFileError('File size exceeds 2MB limit');
        return;
      }
      setFileName(file.name);
      form.setValue('file', file, { shouldValidate: true });
      setFileError(null);
    }
  };

  // const onSubmit = async (values: FormValues) => {
  //   await delay(2000); //sleep a bit
  //   // form submission logic here

  // };
  const onSubmit = async () => {
    await delay(2000); //sleep a bit
    // form submission logic here
  };

  return (
    <div className="md:p-6">
      <Alert className="bg-[#FF1B1B] text-white py-6 px-3 border-none">
        <Bell stroke="#ffffff" className="h-10 w-10 animate-shake" />
        <AlertDescription className="ml-8 md:ml-6 text-xs md:text-base text-white">
          Notice: All property managers are required to submit a valid means of
          identification for verification.
        </AlertDescription>
      </Alert>

      <div className="mt-16">
        <Form {...form}>
          <FormDescription className="mb-10">
            <span className="block capitalize text-4xl font-bold text-indigo-600">
              Basic Info
            </span>
            <small className="text-[#000929] font-medium md:text-xl">
              Enter your details as they appear on your identification document.
            </small>
          </FormDescription>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-14 mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* full name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 border-[#111113]/50"
                        placeholder="Full Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Date of Birth */}
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="relative h-14 border-[#111113]/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        const countryCode = value as CountryCode;
                        field.onChange(countryCode);
                        setSelectedCountry(countryCode);
                      }}
                      {...field}
                    >
                      <SelectTrigger className="h-14 border-[#111113]/50">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCountries().map((country) => (
                          <SelectItem
                            key={country}
                            value={country}
                            className="cursor-pointer text-[#111113] hover:text-opacity-85 transition-colors duration-150 ease-in-out"
                          >
                            {en[country]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <PhoneInputWithCountry
                        international
                        defaultCountry={selectedCountry || ''}
                        {...field}
                        value={field.value || ''}
                        onChange={(value: string) =>
                          field.onChange(value || '')
                        }
                        className="border border-[#111113]/50 rounded-md px-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* City */}
              <FormField
                control={form.control}
                name="userCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your City</FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 border-[#111113]/50"
                        placeholder="Enter your city"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Name */}
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 border-[#111113]/50"
                        placeholder="Enter business name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Address */}
              <FormField
                control={form.control}
                name="businessAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Address</FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 border-[#111113]/50"
                        placeholder="Enter business address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Postal Code */}
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        className="h-14 border-[#111113]/50"
                        placeholder="331100"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="bg-[#CCCCCC]" />

            {/* File Upload Section */}
            <div className="rounded-lg min-h-[452px] max-w-[932px] mx-auto py-4 bg-[#E4E2FF] border border-[#B3B3B3] flex flex-col items-center justify-center px-4 lg:px-0">
              <div className="self-start w-full">
                <p className="ml-20 text-2xl font-semibold text-[#000929] capitalize">
                  Upload Document
                </p>
                <Separator className="bg-[#D0D5DD] my-4" />
              </div>

              <div className="flex flex-col items-center max-w-[771px]">
                <div className="text-[#364261] text-xs md:text-base md:w-[657px] mx-auto md:text-center">
                  <p>
                    Our Security Department will be looking at your uploaded
                    files within{' '}
                    <span className="text-[#FF1B1B]">1 - 2 business days.</span>
                  </p>
                  <p>
                    If you have an inquiry, you may email us at{' '}
                    <a
                      href="mailto:ezyrent50@gmail.com"
                      className="underline text-[#364261] hover:text-opacity-80"
                    >
                      ezyrent50@gmail.com
                    </a>
                  </p>
                </div>

                <div className="w-full space-y-4">
                  <div
                    className={`w-full bg-[#F4F3FF] border ${
                      isDragging
                        ? 'border-solid border-[#7065F0]'
                        : 'border-dashed border-[#B3B3B3]'
                    } rounded-lg mt-4 p-6 flex flex-col items-center`}
                    onDragOver={handleDragOver}
                    onDragEnter={() => setIsDragging(true)}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                  >
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer w-full h-full flex flex-col items-center"
                    >
                      <CloudUpload className="h-10 w-10 text-[#7065F0]" />
                      <p className="text-[#7065F0] text-lg mt-2">
                        Click to Upload or drag and drop
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        Max. file size: 2 MB
                      </p>
                    </label>

                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/jpeg, image/png, image/gif, image/webp"
                    />
                  </div>

                  {(fileError || errors.file) && (
                    <Alert variant="destructive">
                      <AlertDescription>
                        {fileError || 'Upload your document'}
                      </AlertDescription>
                    </Alert>
                  )}

                  {fileName && !fileError && (
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <UploadCloud className="h-4 w-4 text-slate-500" />
                        <span className="text-sm text-slate-700 font-medium">
                          {fileName}
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="text-slate-500 hover:text-slate-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>

                <div className="w-full flex justify-between items-center mt-10">
                  <Button
                    type="button"
                    variant="outline"
                    className="capitalize border-[#7065F0] text-[#7065F0]"
                    onClick={handleRemoveFile}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="text-[#f1f1f1] capitalize">
                    <FileIcon className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>
            </div>

            <div
              className={cn(
                'bg-[#7065F0] !mt-20 max-w-[400px] h-16 mx-auto rounded-lg',
                {
                  'bg-opacity-75 transition-colors duration-150 ease-in-out':
                    isSubmitting
                }
              )}
            >
              <Button
                type="submit"
                className="w-full h-full text-center capitalize md:text-2xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader /> submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
