import type { Metadata } from 'next';
import Link from 'next/link';
import { ogMeta } from '../../lib/site';
import { getOpenMkt, mktPath, mktOg } from '../../lib/industryMkt';
import JsonLd from '../../components/seo/JsonLd';
import { breadcrumbJsonLd, itemListJsonLd } from '../../lib/jsonld';

const TITLE = '업종별 마케팅 대행 - 플레이스·블로그·광고 채널 전략 | JD8';
const DESC = '하수구·누수·청소·이사·크레인·인테리어·대출·회생·법률 등 업종마다 손님이 찾는 길이 다릅니다. 업종별로 플레이스·블로그·파워링크·웹문서 우선순위를 정리했습니다.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: '/industry/' },
  ...ogMeta(TITLE, DESC, '/industry/'),
};

export default function IndustryHub() {
  const list = getOpenMkt();
  const groups = [...new Set(list.map((i) => i.group))];
  return (
    <main className="content-page">
      <div className="content-container">
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: '홈', path: '/' },
              { name: '업종별 마케팅', path: '/industry/' },
            ]),
            itemListJsonLd('JD8 업종별 마케팅', list.slice(0, 20).map((i) => ({ name: `${i.name} 마케팅`, url: mktPath(i.slug), image: mktOg(i.slug) }))),
          ]}
        />
        <nav className="breadcrumb" aria-label="브레드크럼">
          <Link href="/">홈</Link>
          <span className="sep">›</span>
          <span>업종별 마케팅</span>
        </nav>
        <header className="page-header">
          <span className="page-eyebrow">BY INDUSTRY</span>
          <h1>업종별 마케팅 대행</h1>
          <p className="page-lead">{DESC}</p>
        </header>
        <section className="content-section">
          <h2>업종마다 마케팅 순서가 다른 이유는 무엇일까요?</h2>
          <p className="wd-p">
            급하게 찾는 업종(막힘·누수·열쇠)은 플레이스와 검색광고가 먼저이고, 사진을 보고 고르는 업종(인테리어·커튼·촬영)은 블로그·인스타 사례가 먼저입니다. 법률·회생·대출처럼 광고 규정이 있는 업종은 후기보다 정보 글과 상담 페이지가 맞습니다. 영업 지역이 넓은 출장 업종은 플레이스 거리 밖 검색을 받기 위해 지역×서비스 웹문서를 함께 씁니다.
          </p>
        </section>
        {groups.map((g) => (
          <section className="content-section" key={g}>
            <h2>{g}</h2>
            <div className="industry-grid">
              {list.filter((i) => i.group === g).map((i) => (
                <Link key={i.slug} href={mktPath(i.slug)}>
                  {i.name} 마케팅
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
