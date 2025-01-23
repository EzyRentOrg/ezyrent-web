import React from 'react';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface CopyToClipboardProps {
  textToCopy: string;
  type?: string;
}

export default function CopyToClipboard({
  textToCopy,
  type
}: CopyToClipboardProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success(
        type === 'phone'
          ? ' Phone number copied to clipboard!'
          : 'Email address copied to clipboard!'
      );
    } catch (error) {
      toast.error(
        type === 'phone'
          ? 'Failed to copy phone number.'
          : ' Failed to copy email address.'
      );
      console.error(error);
    }
  };

  return (
    <div
      onClick={handleCopy}
      className="cursor-pointer flex items-center space-x-2"
    >
      <Copy size={16} stroke="#000929" />
      <span className="sr-only">Copy</span>
    </div>
  );
}
