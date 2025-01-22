import { MAX_FILE_SIZE } from '@/app/admin/constants/propertyForm';

// helper function to upload image
export const processImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('File size too large'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
