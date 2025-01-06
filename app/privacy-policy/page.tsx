import React from 'react';
import Breadcrumb from '@/components/breadcrumb';
import Link from 'next/link';
import { privacyPolicySections } from '@/config/privacyPolicy';
import MaxWidthWrapper from '../maxWidthWrapper';


export default function PrivacyPolicy() {
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
              EzyRent Privacy Notice
            </h1>
            <p className="leading-[33.6px] text-sm md:text-base">
              At EzyRent, your privacy is a top priority. This Privacy Policy
              explains how we collect, use, and safeguard your information when
              you use our platform, including the EzyRent website and mobile
              application.
              <br />
              By using EzyRent, you agree to the terms outlined in this Privacy
              Policy.
            </p>
          </section>

          <section className="flex flex-col space-y-5">
            {privacyPolicySections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="privacy-policy__section">
                <h2 className="text-[#000929] font-semibold text-[1.1rem] md:text-[1.5rem] lg:text-[2rem] mt-5">
                  {section.title}
                </h2>
                {section.content.map((content, contentIndex) =>
                  typeof content === 'string' ? (
                    <p key={contentIndex} className="mt-5 text-sm md:text-base">
                      {renderContent(content)}
                    </p>
                  ) : (
                    <div key={contentIndex} className="privacy-policy__content">
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
