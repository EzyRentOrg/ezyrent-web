export const uploadToServer = async (file: string): Promise<string> => {
  const response = await fetch('/api/upload', {
    method: 'POST',
    body: JSON.stringify({ file }),
    headers: { 'Content-Type': 'application/json' }
  });

  if (!response.ok) {
    throw new Error('File upload failed');
  }

  const data = await response.json();
  return data.url; // URL of the uploaded file
};
