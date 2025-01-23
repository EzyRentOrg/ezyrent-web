export default function FormError({ message }: { message?: string }) {
  return message ? (
    <p className="text-red-500 text-sm mt-2">{message}</p>
  ) : null;
}
