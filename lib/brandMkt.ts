import fs from 'fs';
import path from 'path';
import { pick, polite, j, todayKst, jd8Links } from './industryMkt';

// 브랜드 마케팅 페이지 (/brand/<카테고리>-브랜드-마케팅/, 프랜차이즈는 -가맹-마케팅) — 채널 운영 대행 관점
// 데이터: data/industry/brands.json (jd8 data/webdoc/industries.json 의 브랜드 업종군 사본)
// jd8 쪽은 같은 카테고리의 "브랜드 홍보(웹문서)"·쇼핑몰 홈페이지 페이지 — 키워드 역할: jd8=홍보·웹문서, ad=마케팅·광고 운영
// 공개: data/industry/brand-schedule.json (2주)

export interface Brand {
  name: string;
  group: string;
  services: { name: string; searches: string[]; note: string }[];
  searches: string[];
  season: string;
  radius: string;
  decide: string;
  pain: string;
  hq?: string;
  regulated: string | null;
  slug: string;
  openDate: string;
}

const DIR = path.join(process.cwd(), 'data', 'industry');
const addDays = (iso: string, d: number) => new Date(Date.parse(iso) + d * 864e5).toISOString().slice(0, 10);
const GROUPS = ['화장품 브랜드', '건강기능식품 브랜드', '식품 브랜드', '생활·펫 브랜드', '프랜차이즈 본사'];
export const isFranchise = (g: string) => g === '프랜차이즈 본사';
export const brandSlug = (name: string, group: string) => `${name}-${isFranchise(group) ? '가맹' : '브랜드'}-마케팅`;
export const brandTitle = (b: { name: string; group: string }) => `${b.name} ${isFranchise(b.group) ? '가맹 마케팅' : '브랜드 마케팅'}`;

function schedule(): Map<string, string> {
  const m = new Map<string, string>();
  const f = path.join(DIR, 'brand-schedule.json');
  if (!fs.existsSync(f)) return m;
  for (const b of JSON.parse(fs.readFileSync(f, 'utf-8')).batches as { launch: string; days: number[]; plan: number[]; slugs: string[] }[]) {
    b.slugs.forEach((s, i) => {
      const w = b.plan.findIndex((r) => i < Math.ceil(b.slugs.length * r));
      if (!m.has(s)) m.set(s, addDays(b.launch, b.days[w]));
    });
  }
  return m;
}

let cache: Brand[] | null = null;
export function getAllBrands(): Brand[] {
  if (cache) return cache;
  const f = path.join(DIR, 'brands.json');
  if (!fs.existsSync(f)) return (cache = []);
  const raw = JSON.parse(fs.readFileSync(f, 'utf-8')) as Omit<Brand, 'slug' | 'openDate'>[];
  const by = new Map<string, typeof raw>();
  for (const b of raw) by.set(b.group, [...(by.get(b.group) || []), b]);
  const rr: typeof raw = [];
  for (let k = 0; rr.length < raw.length; k++) for (const g of GROUPS) if (by.get(g)?.[k]) rr.push(by.get(g)![k]);
  const sch = schedule();
  return (cache = rr.map((b) => {
    const slug = brandSlug(b.name, b.group);
    return { ...b, slug, openDate: sch.get(slug) || '9999-12-31' };
  }));
}
export const getOpenBrands = () => getAllBrands().filter((b) => b.openDate <= todayKst());
export const getBrand = (slug: string) => {
  let k = slug;
  try {
    k = decodeURIComponent(slug);
  } catch {}
  return getOpenBrands().find((b) => b.slug === k);
};
export const brandPath = (slug: string) => `/brand/${slug}/`;
export const brandEncodedPath = (slug: string) => `/brand/${encodeURIComponent(slug)}/`;
export const brandOg = (slug: string) => `/og/brand/${slug}.jpg`;
export { jd8Links };

// 채널 → 우선순위(1 먼저 · 2 함께 · 3 필요할 때)와 이 업종군에서의 역할
type Ch = { ch: string; svc?: string; rank: number; why: string };
function channels(b: Brand): Ch[] {
  const n = b.name;
  const c = b.services.map((s) => s.name);
  const g = b.group;
  const R: Record<string, number[]> = {
    // 오픈마켓, 쇼핑검색, 인스타·인플루언서, 체험단, 메타, 브랜드검색
    '화장품 브랜드': [1, 2, 1, 2, 2, 3],
    '건강기능식품 브랜드': [1, 1, 2, 2, 3, 2],
    '식품 브랜드': [1, 2, 1, 2, 3, 3],
    '생활·펫 브랜드': [1, 1, 2, 2, 3, 3],
  };
  if (isFranchise(g)) {
    return [
      { ch: '창업 키워드 검색광고', svc: 'naver-ad', rank: 1, why: `'${n} 창업'처럼 예비 점주가 직접 찾는 검색을 받지만 창업 키워드는 클릭 단가가 높아 지역·시간대를 좁혀 운영합니다.` },
      { ch: '메타 리드 광고', svc: 'performance-ad', rank: 2, why: `${n} 창업 관심층에게 상담 신청 양식을 바로 보여 주지만, 정보공개서와 다른 수익 숫자를 광고에 쓰면 안 됩니다.` },
      { ch: '블로그·인스타 지점 홍보', svc: 'blog-marketing', rank: 2, why: `${n} 매장 분위기와 점주 운영기를 보여 주되, 가맹점 후기는 사실 그대로만 씁니다.` },
      { ch: '지점 플레이스 관리', svc: 'place-marketing', rank: 2, why: `가맹점마다 플레이스 정보와 리뷰 답변을 맞춰 "지역 + ${n}" 검색에서 일관된 브랜드로 보이게 합니다.` },
      { ch: '창업 박람회·중개 플랫폼', rank: 3, why: `${n} 예비 점주를 한 번에 만나지만 다른 브랜드와 나란히 비교되어, 본사 검색 정보가 함께 받쳐 줘야 합니다.` },
    ];
  }
  const r = R[g] || [1, 2, 2, 2, 3, 3];
  return [
    { ch: '스마트스토어·쿠팡 운영', svc: 'smartstore-marketing', rank: r[0], why: `${n} 구매가 실제로 일어나는 곳이라 '${c[0] || n}' 같은 상품명·옵션·상세페이지 정비가 광고 효율을 좌우합니다.` },
    { ch: '쇼핑검색광고', svc: 'naver-ad', rank: r[1], why: `'${c[1] || n}' 같은 상품 검색을 바로 받지만, 상세페이지와 리뷰가 받쳐 주지 않으면 클릭 비용만 나갑니다.` },
    { ch: '인스타·인플루언서', svc: 'instagram-marketing', rank: r[2], why: `${n} 인지도를 만들지만 협찬 게시물은 대가성 표기가 필수이고${g === '건강기능식품 브랜드' ? ', 기능성 언급은 심의받은 문구만 씁니다' : g === '화장품 브랜드' ? ', 의약품처럼 읽히는 표현은 걸러야 합니다' : ''}.` },
    { ch: '블로그 체험단·리뷰', svc: 'smartstore-review', rank: r[3], why: `'${c[2] || c[0] || n}' 같은 후기 검색을 채우지만 대가성 표기와 표현 검수를 함께 해야 합니다.` },
    { ch: '메타(인스타·페이스북) 광고', svc: 'performance-ad', rank: r[4], why: `${n} 관심층을 넓게 찾을 수 있지만 소재마다 광고 표현 기준을 같은 수준으로 검수해야 합니다.` },
    { ch: '브랜드검색 관리', svc: 'seo-marketing', rank: r[5], why: `${n} 브랜드명 검색에 리셀러·모조품보다 공식몰과 공식 정보가 먼저 보이게 정리합니다.` },
  ];
}

const RULES: Record<string, [string, string][]> = {
  '화장품 브랜드': [['피해야 할 표현', '치료·재생·염증 완화처럼 의약품으로 읽히는 표현'], ['기능성 표현', '기능성 화장품은 심사받은 기능만, 일반 화장품은 기능성처럼 쓰지 않기'], ['후기·체험', '체험단·협찬 후기에도 같은 표현 기준과 대가성 표기 적용']],
  '건강기능식품 브랜드': [['사전 심의', '광고 문구는 건강기능식품 표시·광고 심의를 받은 내용만'], ['피해야 할 표현', '질병의 예방·치료처럼 읽히는 표현, 심의와 다른 기능 문구'], ['후기·체험', '체험기·인플루언서 게시물도 심의 기준과 대가성 표기 적용']],
  '식품 브랜드': [['오인 표현 금지', '일반식품을 건강기능식품처럼 보이게 하는 표현'], ['질병 관련', '질병 예방·치료처럼 읽히는 표현'], ['후기·체험', '체험단·협찬 후기에 대가성 표기']],
  '생활·펫 브랜드': [['표시 기준', '제품군별 표시 기준(반려동물 사료·용품은 사료관리법 등)을 따르기'], ['과장 표현', '근거 없는 비교·과장 표현'], ['후기·체험', '체험단·협찬 후기에 대가성 표기']],
  '프랜차이즈 본사': [['정보공개서', '광고·상담 내용은 등록된 정보공개서와 같은 내용으로'], ['수익 정보', '근거 없는 예상 수익·매출 숫자, 과장된 성공 사례'], ['가맹금', '정보공개서 등록 전 가맹금 수령·가맹계약 체결 금지']],
};

const H1 = ['{t}, 채널 순서부터 정합니다', '{t} — 오픈마켓·인플루언서·광고 어디부터?', '{t}, 광고 규정을 지키면서 매출 채널로'];

export function buildBrandMkt(b: Brand) {
  const n = b.name;
  const fr = isFranchise(b.group);
  const t = brandTitle(b);
  const ch = channels(b).sort((a, z) => a.rank - z.rank || a.ch.localeCompare(z.ch, 'ko'));
  const top = ch.slice(0, 3).map((c) => c.ch);
  const c = b.services.map((s) => s.name);
  const seed = b.slug;
  const label = (r: number) => (r === 1 ? '먼저' : r === 2 ? '함께' : '필요할 때');
  return {
    title: `${t} 대행 - ${fr ? '가맹 모집 광고·지점 홍보' : '오픈마켓·인플루언서·광고'} 채널 전략 | JD8`,
    description: fr
      ? `${j(t, '은', '는')} JD8. 예비 점주가 '${b.services[0]?.searches[0] || n + ' 창업'}'처럼 찾는 단계마다 ${j(top.slice(0, 2).join('·'), '을', '를')} 정보공개서 기준에 맞춰 운영합니다.`
      : `${j(t, '은', '는')} JD8. '${c[0] || n}', '${c[1] || n}' 같은 검색으로 들어오는 소비자를 기준으로 ${top.slice(0, 2).join('·')} 순서를 정하고 광고 표현 기준에 맞춰 운영합니다.`,
    h1: pick(H1, seed).replace('{t}', t),
    summary: [
      fr ? `${n} 예비 점주는 창업 비용·지역·가맹 조건을 검색하며 비교합니다. 비교 단계마다 본사 정보가 보여야 합니다.` : `${n} 소비자는 '${c[0] || n}', '${c[1] || n}'처럼 검색합니다. ${polite(b.decide)}`,
      `${n}에는 ${top.join(' → ')} 순서를 먼저 권합니다. 광고비 집행 내역은 그대로 공개합니다.`,
      `${polite(b.regulated || '광고 표시 기준을 지켜야 한다')} 월 단위 계약, 매월 리포트, 성과 보장 없음.`,
    ],
    whereH2: fr ? `${n} 예비 점주는 어디서 브랜드를 고를까요?` : `${n} 소비자는 어디서 제품을 고를까요?`,
    where: [
      `${polite(b.pain)} ${polite(b.season)}`,
      `${polite(b.radius)} ${polite(b.hq || '문의 창구가 함께 필요하다')}`,
    ],
    channels: ch.map((x) => ({ ...x, label: label(x.rank) })),
    rulesH2: `${n} 광고 표현, 이것만은 지키세요`,
    rules: RULES[b.group] || [],
    contentH2: fr ? `${n} 예비 점주 검색어별 콘텐츠` : `${n} 소비자 검색어별 콘텐츠`,
    contentRows: b.services.slice(0, 6).map((s) => [s.name, s.searches[0] || `${s.name} 추천`, fr ? '창업 안내·지역 가맹 정보' : pick(['상세페이지·체험단 후기', '인플루언서 콘텐츠·공식 정보', '쇼핑검색광고 소재·상세 보강'], seed + s.name)]),
    influH2: fr ? `${n} 가맹점 후기·지점 콘텐츠, 어떻게 운영할까요?` : `${n} 인플루언서·체험단, 어떻게 운영할까요?`,
    influ: fr
      ? `가맹점주 인터뷰와 매장 콘텐츠는 실제 운영 내용만 쓰고, 매출·수익 숫자는 정보공개서 근거가 있는 것만 씁니다. 지점이 늘수록 "지역 + ${n}" 검색이 늘어나므로, 지점별 플레이스와 본사 공식 페이지를 함께 정리합니다.`
      : pick([
          `${n} 협찬·체험단 게시물은 대가성 표기를 반드시 넣고, 게시 전에 표현을 검수합니다. 인플루언서는 팔로워 수보다 '${c[0] || n}' 같은 관심사가 맞는 계정을 고르는 쪽이 전환이 낫습니다.`,
          `${n} 체험단은 같은 문장이 반복되지 않게 제품 사용 상황(${c.slice(0, 2).join('·')})을 나눠 배정하고, 대가성 표기와 표현 검수를 모든 게시물에 똑같이 적용합니다.`,
        ], seed + 'inf'),
    steps: [
      `${top[0]}부터 정비합니다 — ${fr ? `${n} 가맹 조건 안내와 상담 신청 동선` : `${n} 상세페이지·옵션·리뷰 응대`}을 먼저 맞춥니다.`,
      `${j(top[1] || '쇼핑검색광고', '을', '를')} 붙이고, 모든 소재를 ${fr ? '정보공개서' : '광고 표현'} 기준으로 검수합니다.`,
      `매월 리포트로 '${c[0] || n}' 같은 검색어·채널별 ${fr ? '상담 신청' : '유입·매출'}을 보고 예산을 옮깁니다.`,
      `${fr ? '지역별 가맹·지점 검색' : '제품·고민별 검색'}은 JD8 웹문서로 공식 페이지를 두어 광고를 끈 뒤에도 남게 합니다.`,
    ],
    faq: [
      { q: `${t}, 매출이나 순위를 보장하나요?`, a: `매출·노출·순위는 누구도 보장할 수 없습니다. 보장을 내세우는 대행사는 경계하셔야 합니다. ${n} 채널별 지표를 매월 리포트로 공유합니다.` },
      { q: fr ? `${n} 가맹 모집 광고에 예상 수익을 넣어도 되나요?` : `${n} 광고 문구 검수까지 해 주나요?`, a: fr ? '근거 없는 예상 수익이나 과장된 정보는 가맹사업법상 문제가 됩니다. 정보공개서와 같은 내용만 광고에 씁니다.' : `네. ${polite(b.regulated || '광고 표시 기준을 지켜야 한다')} 상세페이지·광고 소재·협찬 게시물 문구를 같은 기준으로 검수합니다.` },
      { q: `${t} 대행 비용은 어떻게 되나요?`, a: `대행 수수료와 광고비가 분리되고 광고비는 브랜드 계정에서 집행되며 내역을 공개합니다. 견적은 ${n} 운영 채널 수(${top.slice(0, 2).join('·')} 등)와 규모에 따라 정합니다.` },
    ],
    keywords: fr ? [`${n} 가맹 마케팅`, `${n} 가맹점 모집 광고`, `${n} 창업 마케팅`, `${n} 마케팅 대행`] : [`${n} 마케팅`, `${n} 브랜드 마케팅`, `${n} 인플루언서 마케팅`, `${n} 광고 대행`, `${n} 체험단`],
  };
}
