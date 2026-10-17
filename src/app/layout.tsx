import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { CustomCursor } from '@/components/CustomCursor';
import { MacHelloLoader } from '@/components/MacHelloLoader';
import { PERSONAL_INFO, SITE_URL } from '@/data/portfolioData';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mubasshir Ali — Full-Stack & AI Engineer | MERN, RAG & Autonomous Systems',
    template: '%s | Mubasshir Ali',
  },
  description:
    'Official portfolio and engineering notes of Mubasshir Ali, a Full-Stack & AI Engineer specializing in Next.js 15, MERN stack, zero-hallucination RAG pipelines, and high-impact web software.',
  keywords: [
    'Mubasshir Ali',
    'Mubasshir Ali developer',
    'Mubasshir Ali portfolio',
    'Mubasshir Ali AI engineer',
    'Mubasshir Ali MERN',
    'Full-Stack Developer Kolkata',
    'Next.js 15',
    'RAG Pipelines',
    'LangChain',
    'Freelance Software Engineer',
  ],
  authors: [{ name: 'Mubasshir Ali', url: `${SITE_URL}/about` }],
  creator: 'Mubasshir Ali',
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/rss.xml`,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: 'Mubasshir Ali — Full-Stack & AI Engineer',
    description:
      'I build AI-powered products that ship. MERN stack by day, RAG retrieval pipelines & autonomous AI workflows by night.',
    siteName: 'Mubasshir Ali Portfolio',
    images: [
      {
        url: `${SITE_URL}/images/profile.jpg`,
        width: 1200,
        height: 630,
        alt: 'Mubasshir Ali - Full-Stack & AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mubasshir Ali — Full-Stack & AI Engineer',
    description:
      'Official portfolio of Mubasshir Ali. MERN stack, Next.js 15, and zero-hallucination AI products.',
    creator: '@mubasshirali',
    images: [`${SITE_URL}/images/profile.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mubasshir Ali',
    givenName: 'Mubasshir',
    familyName: 'Ali',
    jobTitle: 'Full-Stack & AI Engineer',
    email: PERSONAL_INFO.email,
    telephone: PERSONAL_INFO.phone,
    url: SITE_URL,
    image: `${SITE_URL}/images/profile.jpg`,
    sameAs: [
      PERSONAL_INFO.linkedin,
      PERSONAL_INFO.github,
      PERSONAL_INFO.twitter,
    ],
    knowsAbout: [
      'Full-Stack Web Development',
      'Artificial Intelligence',
      'Retrieval-Augmented Generation (RAG)',
      'Next.js 15',
      'React 19',
      'Node.js',
      'MongoDB',
      'Express.js',
      'Python',
      'Machine Learning',
      'Support Vector Machines',
      'TypeScript',
      'Tailwind CSS',
    ],
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Dream Institute of Technology (MAKAUT)',
      award: 'B.Tech in Computer Science and Engineering (8.57 / 10 GPA)',
    },
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Mubasshir Ali Portfolio & Engineering Notes',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        {/* Plausible Analytics (Privacy-first, zero-cookie, <1KB script) */}
        <script
          defer
          data-domain="mubasshirali.com"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="bg-background text-text-primary antialiased selection:bg-accent selection:text-white min-h-screen flex flex-col">
        <ThemeProvider>
          <MacHelloLoader />
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
