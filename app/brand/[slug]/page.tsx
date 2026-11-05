import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ogMeta } from '../../../lib/site';
import { DISCLAIMER } from '../../../lib/industryMkt';
import { getOpenBrands, getBrand, buildBrandMkt, brandPath, brandEncodedPath, brandOg, brandTitle, jd8Links, isFranchise } from '../../../lib/brandMkt';
import { getAllServices, servicePath } from '../../../lib/services';
import Paras from '../../../components/webdoc/Paras';
import JsonLd from '../../../components/seo/JsonLd';
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd, itemListJsonLd } from '../../../lib/jsonld';

export const dynamicParams = false;

export function generateStaticParams() {
  return getOpenBrands().map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const b = getBrand(params.slug);
  if (!b) return {};
  const c = buildBrandMkt(b);
  const p = brandEncodedPath(b.slug);
  return {
    title: { absolute: c.title },
    description: c.description,
    keywords: c.keywords,
    alternates: { canonical: p },
    ...ogMeta(c.title, c.description, p, {}, brandOg(b.slug)),
  };
}

export default function BrandMarketingPage({ params }: { params: { slug: string } }) {
  const b = getBrand(params.slug);
  if (!b) notFound();
  const c = buildBrandMkt(b);
  const t = brandTitle(b);
  const path = brandEncodedPath(b.slug);
  const siblings = getOpenBrands().filter((o) => o.group === b.group && o.slug !== b.slug).slice(0, 8);
  const services = getAllServices();
  const jd8 = jd8Links(b.name);
  return (
    <main className="content-page">
      <div className="content-container">
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: '홈', path: '/' },
              { name: '브랜드 마케팅', path: '/brand/' },
              { name: t, path },
            ]),
            faqPageJsonLd(c.faq),
            serviceJsonLd({ name: `${t} 대행`, description: c.description, path }),
            itemListJsonLd(`${b.group} 마케팅`, siblings.map((s) => ({ name: brandTitle(s), url: brandPath(s.slug), image: brandOg(s.slug) }))),
          ]}
        />
        <nav className="breadcrumb" aria-label="브레드크럼">
          <Link href="/">홈</Link>
          <span className="sep">›</span>
          <Link href="/brand/">브랜드 마케팅</Link>
          <span className="sep">›</span>
          <span>{t}</span>
        </nav>
        <header className="page-header">
          <span className="page-eyebrow">{b.group}</span>
          <h1>{c.h1}</h1>
          <Paras text={c.description} per={1} className="page-lead" />
        </header>
        <aside className="wd-summary" aria-label="핵심 요약">
          <strong>핵심 요약</strong>
          <ul>
            {c.summary.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </aside>

        <section className="content-section">
          <h2>{c.whereH2}</h2>
          {c.where.map((x) => (
            <Paras key={x} text={x} />
          ))}
        </section>

        <section className="content-section">
          <h2>{t}, 채널별 우선순위</h2>
          <table className="wd-table wd-table-plain">
            <thead>
              <tr>
                <th>채널</th>
                <th>순서</th>
                <th>{b.name}에서의 역할</th>
              </tr>
            </thead>
            <tbody>
              {c.channels.map((ch) => {
                const sv = services.find((s) => s.slug === ch.svc);
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
          <h2>{c.rulesH2}</h2>
          <div className="static-faq">
            {c.rules.map(([h, p]) => (
              <div className="qa" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2>{c.contentH2}</h2>
          <table className="wd-table wd-table-plain">
            <thead>
              <tr>
                <th>{isFranchise(b.group) ? '검색 유형' : '제품 키워드'}</th>
                <th>검색어 예시</th>
                <th>채울 콘텐츠</th>
              </tr>
            </thead>
            <tbody>
              {c.contentRows.map(([k, q, x]) => (
                <tr key={k}>
                  <td>{k}</td>
                  <td>{q}</td>
                  <td>{x}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="content-section">
          <h2>{c.influH2}</h2>
          <Paras text={c.influ} />
        </section>

        <section className="content-section">
          <h2>광고비가 새지 않게 하는 순서</h2>
          <ol className="wd-steps">
            {c.steps.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          {jd8 && (jd8.webdoc || jd8.homepage) && (
            <p className="wd-p">
              검색 페이지와 공식몰 제작은 JD8에서 함께 합니다
              {jd8.webdoc && (
                <>
                  {' '}— <a href={jd8.webdoc}>{b.name} {isFranchise(b.group) ? '본사' : '브랜드'} 홍보(웹문서) 안내</a>
                </>
              )}
              {jd8.homepage && (
                <>
                  {', '}
                  <a href={jd8.homepage}>{isFranchise(b.group) ? '프랜차이즈 본사' : '쇼핑몰'} 홈페이지 제작 안내</a>
                </>
              )}
              .
            </p>
          )}
        </section>

        <section className="content-section">
          <h2>{t} 자주 묻는 질문</h2>
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
            <h2>{b.group} 다른 카테고리 마케팅</h2>
            <div className="related-grid">
              {siblings.map((s) => (
                <Link key={s.slug} href={brandPath(s.slug)}>
                  {brandTitle(s)}
                  <span>{s.group}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="cta-banner">
          <h2>{t}, 무료 진단부터 받아보세요</h2>
          <p>지금 운영 중인 채널과 광고 소재를 보고 {b.name}에 맞는 순서와 표현 검수 범위부터 제안드립니다.</p>
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
