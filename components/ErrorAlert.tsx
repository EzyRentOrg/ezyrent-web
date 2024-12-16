import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert
      variant="destructive"
      className="p-3 border-red-500 bg-red-50 w-fit mx-auto text-red-500"
    >
      <AlertDescription>
        <ShieldAlert size={20} className="inline-flex mr-2" />
        {message}
      </AlertDescription>
    </Alert>
  );
}
