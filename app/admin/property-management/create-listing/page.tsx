'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { MoveLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DashboardLayout from '../../components/Layouts';
import { propertyFormSchema } from '@/lib/validations';
import { toast } from 'sonner';
import { handleFileUploadOrDrop } from '@/lib/handleFileUploadOrDrop';
import Preview from './components/Preview';
import ListingForm from './components/ListingForm';

const STORAGE_KEY = 'property_listing_draft';

const initialFormData: PropertyFormData = {
  address: '',
  description: '',
  price: '',
  duration: '1 year',
  primaryFile: { name: '', data: '' },
  otherFiles: [],
  buildingType: 'flat',
  beds: '2 beds',
  baths: '3 baths',
  amenities: [],
  error: null,
  errorMessage: null
};

export default function CreateListing() {
  const router = useRouter();
  const [formError, setFormError] = useState<{
    field: string;
    message: string;
  } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: initialFormData,
    mode: 'onChange'
  });

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = form;

  const formValues = watch();

  // save to storage
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      try {
        // Deep clone to handle base64 data
        const saveData = JSON.parse(JSON.stringify(formValues));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [formValues]);

  // get from storage
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
      } catch (error) {
        console.error('Error saving draft:', error);
      }
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [formValues]);

  // upload file
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'primary' | 'other'
  ) => {
    e.preventDefault();
    if (!e.target?.files?.length) return;
    handleFileUploadOrDrop(e.target.files, type, setValue, watch);
  };

  // drop file
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    type: 'primary' | 'other'
  ) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUploadOrDrop(e.dataTransfer.files, type, setValue, watch);
  };

  // drag file
  const handleDrag = (
    e: React.DragEvent<HTMLDivElement>,
    isEntering: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);

    const target = e.currentTarget; //get ref of element with listener
    if (isEntering) {
      target.classList.add('drag-over');
    } else {
      target.classList.remove('drag-over');
    }
  };

  // handle draft
  const handleSaveDraft = () => {
    try {
      // localStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
      toast.success('Draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft.');
    }
  };

  // delete file
  const handleImageDelete = (type: 'primary' | 'other', index?: number) => {
    if (confirm('Are you sure you want to delete this file?')) {
      if (type === 'primary') {
        setValue('primaryFile', { name: '', data: '' });
        toast.success('Primary file removed');
      } else if (type === 'other' && index !== undefined) {
        const currentOtherFiles = watch('otherFiles') || [];
        const updatedFiles = currentOtherFiles.filter((_, i) => i !== index);
        setValue('otherFiles', updatedFiles);
        toast.success('File removed');
      }
    }
  };

  // submit form to create listing
  const onSubmit = async (data: PropertyFormData) => {
    if (!data.primaryFile || !data.primaryFile.data) {
      setFormError({
        field: 'primaryFile',
        message: 'Primary image is required'
      });
      return;
    }

    try {
      localStorage.removeItem(STORAGE_KEY);
      router.push('/admin/property-management');
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormError({ field: 'submit', message: 'Failed to submit the form' });
    }
  };

  return (
    <DashboardLayout title="Create Listing">
      <main className="p-5">
        <Button
          variant="default"
          onClick={() => router.push('/admin/property-management')}
          className="capitalize flex items-center space-x-1 bg-[#7065F0] mb-5"
        >
          <MoveLeft />
          <span>Go Back</span>
        </Button>

        {formError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {formError.message}
          </div>
        )}

        <section className="w-full grid lg:grid-cols-2 gap-20">
          <ListingForm
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            onInputChange={setValue}
            handlePrimaryFileUpload={(e) => handleFileUpload(e, 'primary')}
            handleOtherFileUpload={(e) => handleFileUpload(e, 'other')}
            onDragOver={(e) => handleDrag(e, true)}
            onDragEnter={(e) => handleDrag(e, true)}
            onDragLeave={(e) => handleDrag(e, false)}
            handleSaveDraft={handleSaveDraft}
            isDragging={isDragging}
            onDrop={handleDrop}
            onSubmit={handleSubmit(onSubmit)}
          />
          <Preview
            watch={watch}
            primaryFile={watch('primaryFile')}
            otherFiles={watch('otherFiles')}
            onImageDelete={handleImageDelete}
          />
        </section>
      </main>
    </DashboardLayout>
  );
}
