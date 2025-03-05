import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { MAX_FILE_SIZE } from '@/app/admin/constants/property-form';

export const handleFileUploadOrDrop = (
  files: FileList | File[],
  type: 'primary' | 'other',
  setValue: UseFormSetValue<PropertyFormData>,
  watch: UseFormWatch<PropertyFormData>
) => {
  const validFiles = Array.from(files).filter((file) =>
    file.type.startsWith('image/')
  );

  if (validFiles.length === 0) {
    toast.error('Invalid file type. Please upload only images.');
    return;
  }

  validFiles.forEach((file) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File ${file.name} exceeds 25MB limit`);
      return;
    }

    if (type === 'primary') {
      setValue('primaryFile', file);
    } else {
      const currentOtherFiles = watch('otherFiles') || [];
      if (currentOtherFiles.length < 7) {
        setValue('otherFiles', [...currentOtherFiles, file]);
      } else {
        toast.error('Maximum of 7 additional files allowed');
      }
    }
  });
};
