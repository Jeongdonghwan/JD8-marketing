import type { Metadata } from 'next';
import { ogMeta } from '../../lib/site';
import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';
import PostList from '../../components/blog/PostList';
import JsonLd from '../../components/seo/JsonLd';
import { breadcrumbJsonLd, itemListJsonLd } from '../../lib/jsonld';

export const metadata: Metadata = {
  title: '마케팅 인사이트 - 플레이스·블로그·광고 실무 가이드',
  description:
    '네이버 플레이스 상위노출, 블로그·인스타 운영, 광고비 관리까지. 마케팅 대행 JD8이 사장님이 바로 써먹을 수 있는 실무 노하우를 정리합니다.',
  alternates: { canonical: '/blog/' },
  ...ogMeta('마케팅 인사이트 | JD8', '플레이스·블로그·광고 마케팅 — 사장님이 바로 써먹는 실무 노하우를 공유합니다.', '/blog/'),
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <main className="content-page">
      <div className="content-container">
        <JsonLd
          data={[
            breadcrumbJsonLd([
              { name: '홈', path: '/' },
              { name: '블로그', path: '/blog/' },
            ]),
            itemListJsonLd('JD8 마케팅 인사이트', posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}/` }))),
          ]}
        />
        <nav className="breadcrumb" aria-label="브레드크럼">
          <Link href="/">홈</Link>
          <span className="sep">›</span>
          <span>블로그</span>
        </nav>

        <header className="page-header">
          <span className="page-eyebrow">BLOG</span>
          <h1>마케팅 인사이트</h1>
          <p className="page-lead">
            플레이스, 블로그, 광고, 스마트스토어까지 — 매출로 이어지는 마케팅을 고민하는 사장님들을 위한 실무 가이드를 연재합니다.
          </p>
        </header>

        <PostList posts={posts} />
      </div>
    </main>
  );
}
