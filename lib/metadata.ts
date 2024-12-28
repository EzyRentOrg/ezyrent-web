import { Metadata } from 'next';

type PageMetadataProps = {
  title?: string;
  description?: string;
  path?: string;
};

export function generateMetadata({
  title = "EzyRent",
  description = "A platform that is solving the rental issues in Nigeria.",
  path = ''
}: PageMetadataProps = {}): Metadata {
  // Normalize the path by removing leading and trailing slashes
  const normalizedPath = path.replace(/^\/|\/$/g, '');

  // Base URL with consistent trailing slash
  const baseUrl = 'https://ezyrent-web.vercel.app/';

  // full URL
  const fullUrl = new URL(normalizedPath, baseUrl)
    .toString()
    .replace(/\/+$/, '/');

  const baseTitle = "EzyRent";
  const fullTitle = title === baseTitle ? baseTitle : `${title} - ${baseTitle}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'rent', 'ezyrent', 'EzyRent', 'Easy Rent', 'easy rent', 'house to rent', 'rent a house', 'easy', 'easyrent'
    ],
    authors: [{ name: "EzyRent Team" }],
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: baseTitle,
      images: [
        {
          url: new URL('/og-image.png', baseUrl).toString(),
          secureUrl: new URL('/og-image.png', baseUrl).toString(),
          width: 1200,
          height: 630
        }
      ],
      locale: 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [new URL('/og-image.png', baseUrl).toString()]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    alternates: {
      canonical: fullUrl
    }
  };
}

// Example usage in a page
// export const metadata = generateMetadata({
//   title: "About Us",
//   description: "Learn about our mission and journey",
//   path: "about"
// });
