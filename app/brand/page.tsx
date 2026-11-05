import type { Metadata } from 'next';
import Link from 'next/link';
import { ogMeta } from '../../lib/site';
import { getOpenBrands, brandPath, brandOg, brandTitle } from '../../lib/brandMkt';
import JsonLd from '../../components/seo/JsonLd';
import { breadcrumbJsonLd, itemListJsonLd } from '../../lib/jsonld';

const TITLE = '브랜드 마케팅 대행 - 화장품·건강기능식품·식품·프랜차이즈 | JD8';
const DESC = '화장품·건강기능식품·식품·생활 브랜드와 프랜차이즈 본사를 위한 채널 운영 대행. 오픈마켓·인플루언서·체험단·광고를 광고 표현 기준에 맞춰 운영합니다.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: '/brand/' },
  ...ogMeta(TITLE, DESC, '/brand/'),
};

export default function BrandHub() {
  const list = getOpenBrands();
  const groups = [...new Set(list.map((b) => b.group))];
  return (
    <main className="content-page">
      <div className="content-container">
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: '홈', path: '/' },
              { name: '브랜드 마케팅', path: '/brand/' },
            ]),
            itemListJsonLd('JD8 브랜드 마케팅', list.slice(0, 20).map((b) => ({ name: brandTitle(b), url: brandPath(b.slug), image: brandOg(b.slug) }))),
          ]}
        />
        <nav className="breadcrumb" aria-label="브레드크럼">
          <Link href="/">홈</Link>
          <span className="sep">›</span>
          <span>브랜드 마케팅</span>
        </nav>
        <header className="page-header">
          <span className="page-eyebrow">BRAND</span>
          <h1>브랜드 마케팅 대행</h1>
          <p className="page-lead">화장품·건강기능식품·식품·생활 브랜드, 프랜차이즈 본사를 위한 채널 운영 대행입니다.</p>
          <p className="page-lead">오픈마켓·인플루언서·체험단·광고를 광고 표현 기준에 맞춰 운영합니다.</p>
        </header>
        <section className="content-section">
          <h2>브랜드 마케팅은 무엇이 다를까요?</h2>
          <p className="wd-p">브랜드 제품은 매출이 오픈마켓에서 일어나고, 인지도는 인스타·인플루언서에서 만들어집니다. 그래서 채널 순서와 예산 배분이 지역 업종과 완전히 다릅니다.</p>
          <p className="wd-p">무엇보다 광고 표현 규정이 엄격합니다. 화장품은 의약품으로 읽히는 표현을, 건강기능식품은 심의받지 않은 문구를, 프랜차이즈는 정보공개서와 다른 수익 정보를 쓰면 안 됩니다. 모든 소재와 협찬 게시물을 같은 기준으로 검수합니다.</p>
        </section>
        {groups.map((g) => (
          <section className="content-section" key={g}>
            <h2>{g}</h2>
            <div className="industry-grid">
              {list.filter((b) => b.group === g).map((b) => (
                <Link key={b.slug} href={brandPath(b.slug)}>
                  {brandTitle(b)}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
