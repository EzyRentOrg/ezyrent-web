// Function to clean and encode Cloudinary URLs
export const getCleanImageUrl = (url?: string): string => {
  if (!url) return '/fallback-image.jpg'; // Fallback image if URL is missing

  try {
    const decodedUrl = decodeURIComponent(url); // Decode first to avoid double encoding
    const [baseUrl, imagePath] = decodedUrl.split('upload/');
    if (!baseUrl || !imagePath) return url;

    const cleanedPath = imagePath.trim();
    const encodedPath = cleanedPath
      .split('/')
      .map(encodeURIComponent)
      .join('/');

    return `${baseUrl}upload/${encodedPath}`;
  } catch (error) {
    console.error('Error processing image URL:', error);
    return '/fallback-image.jpg'; // Return a default image
  }
};
