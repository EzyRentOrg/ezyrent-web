import { MAX_FILE_SIZE } from '@/app/admin/constants/property-form';

/**
 * Helper function to upload and process image or video files.
 * Converts images to Base64 and returns object URLs for videos.
 *
 * @param file - The file to be processed.
 * @returns Promise<string> - A Base64 representation for images or an object URL for videos.
 */
export const processFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('File size too large'));
      return;
    }

    // Validate file type
    const validTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'video/mp4',
      'video/webm'
    ];
    if (!validTypes.includes(file.type)) {
      reject(new Error('Unsupported file type'));
      return;
    }

    if (file.type.startsWith('image/')) {
      // Convert image files to Base64
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read image file'));
      reader.readAsDataURL(file);
    } else if (file.type.startsWith('video/')) {
      // Return object URL for video files
      resolve(URL.createObjectURL(file));
    } else {
      reject(new Error('Unknown file type'));
    }
  });
};
