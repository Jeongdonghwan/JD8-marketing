// 사이트 전역 상수 — 도메인/브랜드 정보의 단일 출처
export const SITE_URL = 'https://ad.jd8.co.kr';
export const SITE_NAME = 'JD8 마케팅 에이전시';
export const BRAND = 'JD8';
export const COMPANY = {
  legalName: '주식회사 제이디에이치',
  ceo: '정동환',
  phone: '1566-3046',
  bizNumber: '503-87-03619',
  address: '경기도 용인시 기흥구 금화로 3, 제이20호',
  kakaoChannel: 'https://pf.kakao.com/_Izxnxgn',
};

export const DEFAULT_TITLE = '네이버 플레이스·블로그·광고 마케팅 대행 JD8';
export const DEFAULT_DESCRIPTION =
  '소상공인·중소기업 온라인 마케팅 대행 전문. 네이버 플레이스 관리, 블로그 마케팅, 인스타그램 운영, 퍼포먼스 광고까지 매출로 이어지는 마케팅을 대행합니다.';
export const OG_IMAGE = '/images/og-image.png';

export const absUrl = (path: string) => `${SITE_URL}${path}`;

// Next.js는 openGraph/twitter를 얕게 병합한다 — 페이지가 openGraph를 지정하면 layout의 images가
// 통째로 사라진다. 페이지 메타는 반드시 이 헬퍼로 만들 것.
// image: 페이지 전용 썸네일 경로(1200×630). 없으면 공통 OG_IMAGE.
export const ogMeta = (title: string, description: string, url: string, extra: Record<string, unknown> = {}, image?: string) => {
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : [OG_IMAGE];
  return {
    openGraph: { type: 'website' as const, siteName: SITE_NAME, locale: 'ko_KR', title, description, url, images, ...extra },
    twitter: { card: 'summary_large_image' as const, title, description, images },
  };
};
