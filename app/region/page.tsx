import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllDongs, dongPath } from '../../lib/dongs';
import JsonLd from '../../components/seo/JsonLd';
import { breadcrumbJsonLd } from '../../lib/jsonld';

export const metadata: Metadata = {
  title: '지역별 마케팅 대행 - 서울·경기·전국',
  description:
    '서울 전 지역과 경기, 전국 주요 도시의 동네 상권별 마케팅 대행 안내. 플레이스 관리, 지역 키워드 콘텐츠, 광고 운영까지 비대면으로 진행합니다.',
  alternates: { canonical: '/region/' },
  openGraph: { title: '지역별 마케팅 대행 | JD8', description: '전국 동네 상권별 마케팅 대행 안내.', url: '/region/' },
};

export default function RegionHubPage() {
  const dongs = getAllDongs();
  // 시/도 그룹 → 구/시 그룹 순으로 묶기
  const byProvince = new Map<string, Map<string, typeof dongs>>();
  for (const d of dongs) {
    const prov = d.province;
    if (!byProvince.has(prov)) byProvince.set(prov, new Map());
    const gus = byProvince.get(prov)!;
    if (!gus.has(d.gu)) gus.set(d.gu, [] as any);
    (gus.get(d.gu) as any).push(d);
  }
  const provinces = [...byProvince.entries()];

  return (
    <main className="content-page">
      <div className="content-container wide">
        <JsonLd data={breadcrumbJsonLd([{ name: '홈', path: '/' }, { name: '지역별 마케팅 대행', path: '/region/' }])} />
        <nav className="breadcrumb" aria-label="브레드크럼">
          <Link href="/">홈</Link>
          <span className="sep">›</span>
          <span>지역별 마케팅 대행</span>
        </nav>

        <header className="page-header">
          <span className="page-eyebrow">REGIONS</span>
          <h1>지역별 마케팅 대행</h1>
          <p className="page-lead">
            마케팅은 상권 단위 싸움입니다. 같은 업종이라도 동네가 다르면 키워드와 경쟁 강도가 다릅니다.
            JD8은 {dongs.length}개 동네 상권별 가이드를 기반으로, 우리 동네 검색에서 선택받는 구조를 만듭니다.
          </p>
        </header>

        {provinces.map(([prov, gus]) => (
          <section className="category-block" key={prov}>
            <h2>{prov === '서울' ? '서울' : prov === '경기' ? '경기' : prov === '인천' ? '인천' : prov}</h2>
            {[...gus.entries()].map(([gu, list]) => (
              <div key={gu} style={{ marginBottom: 18 }}>
                <p className="category-desc" style={{ marginBottom: 10, fontWeight: 700 }}>{gu}</p>
                <div className="industry-grid">
                  {(list as any[]).map((d) => (
                    <Link key={d.urlSlug} href={dongPath(d)}>{d.dong}</Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}

        <div className="cta-banner">
          <h2>우리 동네가 없어도 걱정 마세요</h2>
          <p>전국 어디든 같은 방식으로 진행합니다. 무료 상권 진단부터 받아보세요.</p>
          <div className="cta-actions">
            <a href="https://pf.kakao.com/_Izxnxgn" target="_blank" rel="noopener noreferrer" className="primary">카톡으로 무료 진단</a>
            <a href="tel:1566-3046" className="ghost">전화 상담 1566-3046</a>
          </div>
        </div>
      </div>
    </main>
  );
}
