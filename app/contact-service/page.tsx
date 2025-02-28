'use client';
import MaxWidthWrapper from '../maxWidthWrapper';
import Image from 'next/image';

export default function ContactModal() {
  interface costumerCare {
    label: string;
    icon: string;
    title: string;
    placeholder: string;
  }

  interface socialMedia {
    label: string;
    icon: string;
    title: string;
    placeholder: string;
    href: string;
  }

  const costumerCare: costumerCare[] = [
    {
      label: 'phone',
      icon: 'phone.svg',
      title: 'Contact Number',
      placeholder: '+234-8127-518-838'
    },
    {
      label: 'email',
      icon: 'email.svg',
      title: 'Email Address',
      placeholder: 'ezyrent50@gmail.com'
    }
  ];

  const socialMedia: socialMedia[] = [
    {
      label: 'instagram',
      icon: 'instagram.svg',
      title: 'Instagram',
      href: 'https://www.instagram.com/ezy_rent_hq?igsh=MWN3cXBtNHY1dzFvZA==',
      placeholder: '@ezyrent50'
    },
    {
      label: 'twitter',
      icon: 'TwitterX.svg',
      title: 'X',
      href: 'https://x.com/ezy_rent',
      placeholder: '@ezy_rent'
    },
    {
      label: 'facebook',
      icon: 'facebook.svg',
      title: 'Facebook',
      href: 'https://www.facebook.com/share/15rpMS6FDE/',
      placeholder: '@ezyrent'
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert('Text copied to clipboard!'))
      .catch(() => alert('Failed to copy text.'));
  };

  return (
    <div className="bg-black bg-opacity-70 flex justify-center items-center z-50 inset-0 p-4">
      <MaxWidthWrapper className="w-[880px] h-[600px] bg-[#FFFFFF] p-[80px] mb-10 rounded-[60px]">
        <div className="text-center flex flex-col justify-between mb-16">
          <h1 className="text-[#000929] text-[32px]  font-bold">
            Customer Service!
          </h1>
          <p className="text-[#667085] text-[20px]">
            You can get in touch with us through below platforms.
          </p>
          <p className="text-[#667085] text-[20px]">
            Our Team will reach out to you as soon as possible!
          </p>
        </div>
        <div className="flex justify-between px-10">
          <div>
            <h2 className="text-[#475467] text-[16px] mb-3">Customer Care</h2>
            {costumerCare.map((item, index) => (
              <div key={index} className="flex items-center gap-10 mb-4">
                <div className="flex items-center gap-4 mr-4">
                  <Image
                    className="w-8 h-8 object-contain"
                    src={`/social-icon/modal/${item.icon}`}
                    width={24}
                    height={24}
                    alt={`${item.label} svg`}
                  />
                  <div className="text-[14px]">
                    <p className="text-[#98A2B3]">{item.title}</p>
                    <p className="text-[#101828] font-semibold">
                      {item.placeholder}
                    </p>
                  </div>
                </div>
                <Image
                  onClick={() => copyToClipboard(item.placeholder)}
                  className="w-5 h-5 object-contain cursor-pointer"
                  src="/social-icon/modal/copy.svg"
                  width={24}
                  height={24}
                  alt={`copy ${item.label}`}
                />
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-[#475467] text-[16px] mb-3">Social Media</h2>
            {socialMedia.map((item, index) => (
              <div key={index} className="flex items-center gap-10 mb-4">
                <div className="flex items-center gap-4 mr-4">
                  <Image
                    className="w-8 h-8 object-contain"
                    src={`/social-icon/modal/${item.icon}`}
                    width={24}
                    height={24}
                    alt={`${item.label} svg`}
                  />
                  <div className="text-[14px]">
                    <p className="text-[#98A2B3]">{item.title}</p>
                    <p className="text-[#101828] font-semibold">
                      {item.placeholder}
                    </p>
                  </div>
                </div>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  <Image
                    className="w-5 h-5 object-contain cursor-pointer self-end"
                    src="/social-icon/modal/link.svg"
                    width={24}
                    height={24}
                    alt={`copy ${item.label}`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
