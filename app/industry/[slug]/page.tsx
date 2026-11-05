import type { Metadata } from 'next';
import Link from 'next/link';
import Paras from '../../../components/webdoc/Paras';
import { notFound } from 'next/navigation';
import { ogMeta } from '../../../lib/site';
import { getOpenMkt, getMkt, buildMktContent, mktPath, mktEncodedPath, mktOg, jd8Links, isOffice, DISCLAIMER } from '../../../lib/industryMkt';
import { getAllServices, servicePath } from '../../../lib/services';
import JsonLd from '../../../components/seo/JsonLd';
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, itemListJsonLd } from '../../../lib/jsonld';

export const dynamicParams = false;

export function generateStaticParams() {
  return getOpenMkt().map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const i = getMkt(params.slug);
  if (!i) return {};
  const c = buildMktContent(i);
  const p = mktEncodedPath(i.slug);
  return {
    title: { absolute: c.title },
    description: c.description,
    keywords: c.keywords,
    alternates: { canonical: p },
    ...ogMeta(c.title, c.description, p, {}, mktOg(i.slug)),
  };
}

// 채널 → 우리 서비스 페이지 (있는 것만)
const CH_SERVICE: Record<string, string> = {
  '네이버 플레이스': 'place-marketing',
  '파워링크(검색광고)': 'naver-ad',
  '블로그·체험단': 'blog-marketing',
  '블로그 정보 글': 'blog-marketing',
  인스타그램: 'instagram-marketing',
};

export default function IndustryMarketingPage({ params }: { params: { slug: string } }) {
  const i = getMkt(params.slug);
  if (!i) notFound();
  const c = buildMktContent(i);
  const path = mktEncodedPath(i.slug);
  const siblings = getOpenMkt().filter((o) => o.group === i.group && o.slug !== i.slug).slice(0, 8);
  const services = getAllServices();
  const jd8 = jd8Links(i.name);
  const office = isOffice(i.group);
  return (
    <main className="content-page">
      <div className="content-container">
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: '홈', path: '/' },
              { name: '업종별 마케팅', path: '/industry/' },
              { name: `${i.name} 마케팅`, path },
            ]),
            faqPageJsonLd(c.faq),
            serviceJsonLd({ name: `${i.name} 마케팅 대행`, description: c.description, path }),
            itemListJsonLd(`${i.group} 업종 마케팅`, siblings.map((s) => ({ name: `${s.name} 마케팅`, url: mktPath(s.slug), image: mktOg(s.slug) }))),
          ]}
        />
        <nav className="breadcrumb" aria-label="브레드크럼">
          <Link href="/">홈</Link>
          <span className="sep">›</span>
          <Link href="/industry/">업종별 마케팅</Link>
          <span className="sep">›</span>
          <span>{i.name} 마케팅</span>
        </nav>
        <header className="page-header">
          <span className="page-eyebrow">{i.group}</span>
          <h1>{c.h1}</h1>
          <Paras text={c.description} per={1} className="page-lead" />
        </header>
        <aside className="wd-summary" aria-label="핵심 요약">
          <strong>핵심 요약</strong>
          <ul>
            {c.summary.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </aside>

        <section className="content-section">
          <h2>{c.whereH2}</h2>
          {c.where.map((t) => (
            <Paras key={t} text={t} />
          ))}
        </section>

        <section className="content-section">
          <h2>{i.name} 마케팅, 채널별 우선순위</h2>
          <table className="wd-table wd-table-plain">
            <thead>
              <tr>
                <th>채널</th>
                <th>순서</th>
                <th>{i.name}에서의 역할</th>
              </tr>
            </thead>
            <tbody>
              {c.channels.map((ch) => {
                const sv = services.find((s) => s.slug === CH_SERVICE[ch.ch]);
                return (
                  <tr key={ch.ch}>
                    <td>{sv ? <Link href={servicePath(sv)}>{ch.ch}</Link> : ch.ch}</td>
                    <td>{ch.label}</td>
                    <td>{ch.why}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

        <section className="content-section">
          <h2>{i.name} 서비스별로 잡을 검색어</h2>
          <table className="wd-table wd-table-plain">
            <thead>
              <tr>
                <th>서비스</th>
                <th>손님 검색어 예시</th>
                <th>특징</th>
              </tr>
            </thead>
            <tbody>
              {c.serviceRows.map(([name, q, note]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>{q}</td>
                  <td>{note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="content-section">
          <h2>{c.blogH2}</h2>
          <Paras text={c.blog} />
        </section>

        <section className="content-section">
          <h2>광고비가 새지 않게 하는 순서</h2>
          <ol className="wd-steps">
            {c.steps.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          {jd8 && jd8.webdoc && (
            <p className="wd-p">
              {office ? '상담 지역' : '영업 지역'}마다 검색 페이지를 두는 방법은 JD8의 <a href={jd8.webdoc}>{i.name} 웹문서(지역 검색 페이지) 안내</a>에 정리돼 있습니다
              {jd8.homepage ? (
                <>
                  . 홈페이지가 아직 없다면 <a href={jd8.homepage}>{i.name} 홈페이지 제작 안내</a>부터 보세요.
                </>
              ) : (
                '.'
              )}
            </p>
          )}
        </section>

        <section className="content-section">
          <h2>{i.name} 마케팅 자주 묻는 질문</h2>
          <div className="static-faq">
            {c.faq.map((f) => (
              <div className="qa" key={f.q}>
                <h3>Q. {f.q}</h3>
                <p>A. {f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {siblings.length > 0 && (
          <section className="content-section">
            <h2>{i.group} 다른 업종 마케팅</h2>
            <div className="related-grid">
              {siblings.map((s) => (
                <Link key={s.slug} href={mktPath(s.slug)}>
                  {s.name} 마케팅
                  <span>{s.group}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="cta-banner">
          <h2>{i.name} 마케팅, 무료 진단부터 받아보세요</h2>
          <p>지금 운영 중인 채널을 보고 {i.name}에 맞는 순서부터 제안드립니다. 월 단위 계약, 매월 리포트.</p>
          <div className="cta-actions">
            <a href="https://pf.kakao.com/_Izxnxgn" target="_blank" rel="noopener noreferrer" className="primary">카톡으로 무료 진단</a>
            <a href="tel:1566-3046" className="ghost">전화 상담 1566-3046</a>
          </div>
          <p className="wd-disclaimer">{DISCLAIMER}</p>
        </div>
      </div>
    </main>
  );
}
