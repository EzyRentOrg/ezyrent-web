import Link from 'next/link';

export const DownloadButton = ({
  href,
  icon: Icon,
  children
}: {
  href: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    rel="noopener noreferrer"
    className="flex items-center px-6 w-full py-3  bg-[#f1f1f1] hover:bg-gray-200 text-[#000929] text-sm md:text-lg rounded-full transition duration-300 ease-in-out"
  >
    <Icon className="md:w-10 md:h-10 h-8 w-8 mr-6 text-[#7065F0]" />
    {children}
  </Link>
);
