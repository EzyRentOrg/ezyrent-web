import React from 'react';
import MaxWidthWrapper from '../maxWidthWrapper';
import Breadcrumb from '@/components/breadcrumb';
import { termsOfUseSections } from '@/config/termsOfUse';
import Link from 'next/link';

export default function TermsAndConditions() {
  const renderContent = (content: string) => {
    // Handle privacy policy links
    if (content.includes('Privacy Policy')) {
      const parts = content.split('Privacy Policy');
      return (
        <>
          {parts[0]}
          <Link href="/privacy-policy" className="text-blue-500 underline">
            Privacy Policy
          </Link>
          {parts[1]}
        </>
      );
    }

    // Handle email links
    if (content.includes('support@ezrent.ng')) {
      const parts = content.split('support@ezrent.ng');
      return (
        <>
          {parts[0]}
          <a
            href="mailto:support@ezrent.ng"
            className="text-blue-500 underline"
          >
            support@ezrent.ng
          </a>
          {parts[1]}
        </>
      );
    }

    return content;
  };

  return (
    <section className="max-w-[1050px]">
      <MaxWidthWrapper>
        <Breadcrumb />
        <main>
          <section className="mt-10">
            <h1 className="text-[1.1rem] md:text-[1.5rem] lg:text-[2rem] font-semibold text-[#000929] mb-2 leading-[50.4px]">
              EzyRent Terms Of Use
            </h1>
            <p className="leading-[33.6px] text-sm md:text-base">
              Welcome to EzyRent! These Terms and Conditions govern your use of
              our platform. By accessing or using EzyRent, you agree to these
              terms. If you do not agree, please discontinue use immediately
            </p>
          </section>

          <section className="flex flex-col space-y-5">
            {termsOfUseSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="terms-of-use__section">
                <h2 className="text-[#000929] font-semibold text-[1.1rem] md:text-[1.5rem] lg:text-[2rem] mt-5">
                  {section.title}
                </h2>
                {section.content.map((content, contentIndex) =>
                  typeof content === 'string' ? (
                    <p key={contentIndex} className="mt-5 text-sm md:text-base">
                      {renderContent(content)}
                    </p>
                  ) : (
                    <div key={contentIndex} className="terms-of-use__content">
                      {content.description && (
                        <p className="mt-8 font-semibold">
                          {renderContent(content.description)}
                        </p>
                      )}
                      {content.items && (
                        <ul className="list-disc flex flex-col space-y-3 my-4 px-5">
                          {content.items.map((item, itemIdx) => (
                            <li key={itemIdx}>{renderContent(item)}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )
                )}
              </div>
            ))}
          </section>
        </main>
      </MaxWidthWrapper>
    </section>
  );
}
