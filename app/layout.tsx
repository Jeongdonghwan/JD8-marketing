import type { Metadata, Viewport } from 'next';
import './App.css';
import './content-pages.css';
import './landing.css';
import Header from '../components/landing/Header';
import Footer from '../components/landing/Footer';
import FloatingButtons from '../components/landing/FloatingButtons';
import ScrollProgress from '../components/landing/ScrollProgress';
import JsonLd from '../components/seo/JsonLd';
import { organizationJsonLd, webSiteJsonLd } from '../lib/jsonld';
import { SITE_URL, SITE_NAME, DEFAULT_TITLE, DEFAULT_DESCRIPTION, OG_IMAGE } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | JD8 홈페이지 제작',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ['마케팅 대행', '네이버 플레이스 마케팅', '블로그 마케팅', '인스타그램 마케팅', '퍼포먼스 광고', '소상공인 마케팅', 'JD8'],
  authors: [{ name: 'JD8 에이전시' }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'ko_KR',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    images: [OG_IMAGE],
  },
  verification: {
    google: 'JyLUKf4DE-twbixJUybfWGZUKQkyyh6NCZevQ_DXIHg',
    other: {
      'naver-site-verification': '0a9b03cb429d42bcb14e8b08ff45a6307f17cf29',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
