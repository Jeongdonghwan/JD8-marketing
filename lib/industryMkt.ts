import fs from 'fs';
import path from 'path';

// 업종별 마케팅 페이지 (/industry/<업종>-마케팅/) — 326업종
// 데이터: data/industry/industries.json (jd8.co.kr 의 data/webdoc/industries.json 사본 — 원본은 jd8 쪽, 바뀌면 복사)
// jd8 링크: data/industry/jd8-links.json (jd8 코드로 계산한 실제 주소 — 형제 사이트 링크가 404 나지 않게)
// 공개: data/industry/schedule.json — 2주 일정(25→40→55→70→85→100%), 일정에 없는 slug 는 안 열림

export interface Svc { name: string; searches: string[]; note: string }
export interface MktIndustry {
  name: string;
  group: string;
  services: Svc[];
  searches: string[];
  urgent: boolean;
  season: string;
  radius: string;
  decide: string;
  pain: string;
  regulated: string | null;
  slug: string;
  openDate: string;
}

const DIR = path.join(process.cwd(), 'data', 'industry');
const addDays = (iso: string, d: number) => new Date(Date.parse(iso) + d * 864e5).toISOString().slice(0, 10);
export const todayKst = () => process.env.WEBDOC_TODAY || new Date(Date.now() + 9 * 36e5).toISOString().slice(0, 10);
const GROUP_PRIORITY = ['하수구·배관', '누수·방수', '청소', '이사·운반', '크레인·장비', '커튼·창호·인테리어', '대출·금융', '회생·채무', '법률·전문직'];

function schedule(): Map<string, string> {
  const m = new Map<string, string>();
  const f = path.join(DIR, 'schedule.json');
  if (!fs.existsSync(f)) return m;
  for (const b of JSON.parse(fs.readFileSync(f, 'utf-8')).batches as { launch: string; days: number[]; plan: number[]; slugs: string[] }[]) {
    b.slugs.forEach((s, i) => {
      const w = b.plan.findIndex((r) => i < Math.ceil(b.slugs.length * r));
      if (!m.has(s)) m.set(s, addDays(b.launch, b.days[w]));
    });
  }
  return m;
}

let cache: MktIndustry[] | null = null;
export function getAllMkt(): MktIndustry[] {
  if (cache) return cache;
  const f = path.join(DIR, 'industries.json');
  if (!fs.existsSync(f)) return (cache = []);
  const raw = JSON.parse(fs.readFileSync(f, 'utf-8')) as (Omit<MktIndustry, 'services' | 'slug' | 'openDate'> & { services: (string | Svc)[] })[];
  const groups = new Map<string, typeof raw>();
  for (const i of raw) groups.set(i.group, [...(groups.get(i.group) || []), i]);
  const order = [...GROUP_PRIORITY.filter((g) => groups.has(g)), ...[...groups.keys()].filter((g) => !GROUP_PRIORITY.includes(g))];
  const rr: typeof raw = [];
  for (let k = 0; rr.length < raw.length; k++) for (const g of order) if (groups.get(g)![k]) rr.push(groups.get(g)![k]);
  const sch = schedule();
  return (cache = rr.map((i) => {
    const slug = `${i.name}-마케팅`;
    const services = i.services.map((s) => (typeof s === 'string' ? { name: s, searches: [], note: '' } : s)).filter((s) => s.name !== i.name);
    return { ...i, services, slug, openDate: sch.get(slug) || '9999-12-31' };
  }));
}
export const getOpenMkt = () => getAllMkt().filter((i) => i.openDate <= todayKst());
export const getMkt = (slug: string) => {
  let k = slug;
  try {
    k = decodeURIComponent(slug);
  } catch {}
  return getOpenMkt().find((i) => i.slug === k);
};
export const mktPath = (slug: string) => `/industry/${slug}/`;
export const mktEncodedPath = (slug: string) => `/industry/${encodeURIComponent(slug)}/`;
export const mktOg = (slug: string) => `/og/industry/${slug}.jpg`;

// ---- jd8.co.kr 링크 (같은 업종으로만, 열린 페이지로만) ----
export const JD8 = 'https://jd8.co.kr';
let linkCache: Record<string, { webdoc: string; webdocReady?: string; homepage: string; homepageReady: string }> | null = null;
export function jd8Links(name: string) {
  if (!linkCache) {
    const f = path.join(DIR, 'jd8-links.json');
    linkCache = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf-8')) : {};
  }
  const l = linkCache![name];
  if (!l) return null;
  const enc = (p: string) => p.split('/').map((x) => (x ? encodeURIComponent(x) : x)).join('/');
  const t = todayKst();
  return { webdoc: !l.webdocReady || t >= l.webdocReady ? JD8 + enc(l.webdoc) : null, homepage: t >= l.homepageReady ? JD8 + enc(l.homepage) : null };
}

// ---- 문장 도구 ----
export const hash = (s: string) => {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.codePointAt(0)!, 16777619) >>> 0;
  h ^= h >>> 15;
  h = Math.imul(h, 2246822507) >>> 0;
  return (h ^ (h >>> 13)) >>> 0;
};
export const pick = <T,>(a: T[], seed: string) => a[hash(seed) % a.length];
const H = 0xac00;
const bat = (c: string) => (c.charCodeAt(0) - H) % 28;
const withB = (c: string, b: number) => String.fromCharCode(c.charCodeAt(0) - bat(c) + b);
export function polite(clause: string) {
  const s = clause.trim().replace(/[.。]$/, '');
  if (!s.endsWith('다')) return s + '.';
  const stem = s.slice(0, -1);
  const last = stem.slice(-1);
  if (!last || last.charCodeAt(0) < H || last.charCodeAt(0) > 0xd7a3) return s + '.';
  if (stem === '는' || stem.endsWith(' 는')) return stem.slice(0, -1) + '늡니다.';
  if (stem.endsWith('는')) return stem.slice(0, -1) + '습니다.';
  if (bat(last) === 4 || bat(last) === 0) return stem.slice(0, -1) + withB(last, 17) + '니다.';
  return stem + '습니다.';
}
const hasB = (w: string) => {
  const c = w.trim().slice(-1);
  if (/[a-zA-Z0-9]/.test(c)) return /[lmnLMN013678]$/.test(c);
  return c.charCodeAt(0) >= H && c.charCodeAt(0) <= 0xd7a3 && bat(c) !== 0;
};
export const j = (w: string, a: string, b: string) => w + (hasB(w) ? a : b);

const OFFICE = ['회생·채무', '법률·전문직', '대출·금융'];
const VISUAL = ['반려동물', '행사·사진·웨딩', '커튼·창호·인테리어', '세탁·수선', '조경·농업', '간판·광고물'];
export const isOffice = (g: string) => OFFICE.includes(g);

export const DISCLAIMER = '※ 마케팅 성과와 검색 순위는 매체·검색엔진의 정책과 경쟁 상황에 따라 달라지며, 노출이나 순위를 보장하지 않습니다.';

type Ch = { ch: string; rank: number; why: string };
function channels(i: MktIndustry): Ch[] {
  const n = i.name;
  const q = i.searches;
  const office = isOffice(i.group);
  const visual = VISUAL.includes(i.group);
  const review = visual || /후기|사례|포트폴리오|리뷰/.test(i.decide);
  const wide = /인접|넓|전국|시·군|시군|광역|여러/.test(i.radius);
  const list: Ch[] = [
    { ch: '네이버 플레이스', rank: i.urgent ? 1 : office ? 3 : 2, why: `'${q[1] || q[0]}'처럼 근처를 찾는 검색에 지도와 리뷰로 보입니다. ${office ? '사무소 위치 신뢰를 보여 주는 용도입니다.' : `${n} 리뷰 답변까지 관리해야 효과가 납니다.`}` },
    { ch: '파워링크(검색광고)', rank: i.urgent ? 2 : 3, why: i.urgent ? `'${q[0]}' 같은 급한 검색을 바로 받지만 클릭마다 비용이 나가, 시간대·지역을 좁혀 소액으로 운영합니다.` : `비교 검색 단계의 클릭이 많아 ${n}은(는) 전환되는 검색어만 남기는 관리가 필요합니다.`.replace(`${n}은(는)`, j(n, '은', '는')) },
    { ch: office ? '블로그 정보 글' : '블로그·체험단', rank: office ? 1 : review ? 1 : 3, why: office ? `광고 규정상 후기형 체험단보다 '${q[2] || q[0]}' 같은 질문에 답하는 정보 글이 맞습니다.` : review ? `${n} 손님은 후기와 사진을 보고 고르므로, 대가성 표기를 지킨 체험단·사례 글이 효과적입니다.` : `${n} 문의는 후기보다 빠른 연락이 중요해 블로그는 보조로 둡니다.` },
    { ch: '웹문서(지역×서비스 페이지)', rank: wide ? 2 : 3, why: `${polite(i.pain)} 영업 지역마다 '${q[0]}' 조합 페이지를 두면 플레이스 거리 밖 검색도 받습니다.` },
    { ch: '인스타그램', rank: visual ? 2 : 4, why: visual ? `${n}은(는) 결과물이 눈에 보이는 업종이라 릴스·피드로 작업물을 쌓으면 문의 전 신뢰가 생깁니다.`.replace(`${n}은(는)`, j(n, '은', '는')) : `${n}은(는) 검색으로 찾는 비중이 커서 인스타는 브랜드 관리 정도로 둡니다.`.replace(`${n}은(는)`, j(n, '은', '는')) },
  ];
  return list.sort((a, b) => a.rank - b.rank || a.ch.localeCompare(b.ch, 'ko'));
}

const H1 = ['{n} 마케팅, 채널 순서부터 정합니다', '{n} 마케팅 대행 — 플레이스·블로그·광고 어디부터?', '{n} 손님이 찾는 길목마다 보이게'];

export function buildMktContent(i: MktIndustry) {
  const n = i.name;
  const q = i.searches;
  const office = isOffice(i.group);
  const ch = channels(i);
  const top = ch.slice(0, 3).map((c) => c.ch);
  const sv = i.services.map((s) => s.name);
  const seed = i.slug;
  const rankLabel = (r: number) => (r === 1 ? '먼저' : r === 2 ? '함께' : r === 3 ? '필요할 때' : '보조');
  return {
    title: `${n} 마케팅 대행 - 플레이스·블로그·광고 채널별 전략 | JD8`,
    description: `${n} 마케팅은 JD8. '${q[0]}' 같은 검색으로 들어오는 ${office ? '고객' : '손님'}을 기준으로 ${top.slice(0, 2).join('·')} 순서를 정하고, 월 단위 계약과 월간 리포트로 운영합니다.`,
    h1: pick(H1, seed).replace(/\{n\}/g, n),
    summary: [
      `${n} ${office ? '고객' : '손님'}은 '${q[0]}', '${q[1] || q[0]}'처럼 검색하고 ${polite(i.decide).replace(/\.$/, '')}.`,
      `${n}에는 ${top.join(' → ')} 순서를 먼저 권합니다. 광고비는 집행 내역을 그대로 공개합니다.`,
      pick([`${n} 마케팅은 월 단위 계약, 매월 성과 리포트로 운영합니다. 노출이나 순위는 보장하지 않습니다.`, `${sv[0] || n} 같은 주력 서비스 검색부터 잡고, 매월 리포트로 조정합니다. 순위 보장은 하지 않습니다.`], seed + 's3'),
    ],
    whereH2: pick([`${n} ${office ? '고객' : '손님'}은 어디서 업체를 찾을까요?`, `${n} 문의는 어떤 검색에서 시작될까요?`], seed + 'w'),
    where: [
      `'${q[0]}', '${q[1] || q[0]}', '${q[2] || q[0]}' 같은 검색이 ${n} 문의의 출발점입니다. ${polite(i.season)} ${i.urgent ? `급하게 찾는 경우가 많아 처음 본 몇 곳 안에 들어야 연락이 옵니다.` : `여러 곳을 비교한 뒤 연락하는 경우가 많아 비교하는 동안 계속 보이는 것이 중요합니다.`}`,
      `${polite(i.decide)} ${j(n, '은', '는')} ${polite(i.radius)}`,
    ],
    channels: ch.map((c) => ({ ...c, label: rankLabel(c.rank) })),
    blogH2: office ? `${n} 블로그 마케팅, 무엇을 써야 할까요?` : `${n} 블로그 광고·체험단, 해도 될까요?`,
    blog: office
      ? `${n}은(는) 광고 규정 때문에 후기형 체험단을 쓰기 어렵습니다. 대신 '${q[1] || q[0]}', '${sv[0] || n}' 같은 질문에 절차·비용 기준을 답하는 정보 글을 꾸준히 쓰고, 사무소 홈페이지와 상담 페이지로 연결합니다.${i.regulated ? ' ' + polite(i.regulated) : ''}`.replace(`${n}은(는)`, j(n, '은', '는'))
      : pick([
          `${n} 체험단은 대가를 받은 글임을 표기해야 하고(경제적 이해관계 표시), 지역마다 따로 모집해야 합니다. ${j(n, '이라면', '라면')} ${sv.slice(0, 2).join('·')} 같은 서비스별로 사례 글을 쌓고, 체험단은 주력 지역에만 쓰는 쪽이 비용 대비 낫습니다.`,
          `${n} 블로그는 체험단 후기만으로 채우면 비슷한 글이 반복됩니다. ${sv[0] || n} 작업 과정, ${sv[1] || n} 비용이 정해지는 기준처럼 사장님만 쓸 수 있는 정보 글을 섞고, 체험단은 대가성 표기를 지켜 주력 지역에만 씁니다.`,
        ], seed + 'blog'),
    steps: [
      `${top[0]}부터 정비합니다 — ${n} ${office ? '상담' : '작업'} 정보·사진·문의 버튼을 먼저 맞춥니다.`,
      `${j(top[1] || '파워링크', '을', '를')} 붙여 ${sv[0] || n} 같은 주력 서비스 검색을 받습니다.`,
      `매월 리포트로 '${q[0]}' 같은 검색어와 ${top.slice(0, 2).join('·')} 중 어디서 문의가 왔는지 보고 예산을 옮깁니다.`,
      `${n} ${office ? '상담' : '영업'} 지역을 넓힐 때는 '${sv[1] || sv[0] || n}' 같은 서비스를 지역별 웹문서로 만들어 옆 지역 검색까지 받습니다.`,
    ],
    serviceRows: i.services.slice(0, 6).map((s) => [s.name, s.searches[0] || `${s.name} 업체`, polite(s.note)]),
    faq: [
      { q: `${n} 마케팅, 상위노출을 보장하나요?`, a: `노출이나 순위는 누구도 보장할 수 없습니다. 보장을 내세우는 업체는 경계하셔야 합니다. 저희는 '${q[0]}' 같은 ${n} 검색어별 노출·문의 지표를 매월 리포트로 공유합니다.` },
      { q: `${n}은(는) 블로그 광고와 파워링크 중 무엇이 먼저인가요?`.replace(`${n}은(는)`, j(n, '은', '는')), a: i.urgent ? `급한 검색이 많은 ${n}은(는) 파워링크와 플레이스가 먼저이고, 블로그는 신뢰를 보강하는 용도입니다.`.replace(`${n}은(는)`, j(n, '은', '는')) : `비교하고 고르는 ${n} ${office ? '고객' : '손님'}에게는 블로그·사례 글이 먼저이고, 파워링크는 전환되는 검색어만 소액으로 붙입니다.` },
      { q: `${n} 마케팅 대행 비용은 어떻게 되나요?`, a: `대행 수수료와 광고비가 분리됩니다. 광고비는 ${office ? '대표님' : '사장님'} 계정에서 집행되고 내역을 그대로 공개하며, 계약은 월 단위입니다. 견적은 ${n} ${office ? '상담' : '영업'} 지역과 ${top.slice(0, 2).join('·')} 같은 채널 수에 따라 정합니다.` },
      ...(i.regulated ? [{ q: `${n} 광고에서 지켜야 할 기준이 있나요?`, a: `${polite(i.regulated)} 문구와 필수 표기를 이 기준에 맞춰 운영합니다.` }] : []),
    ],
    keywords: [`${n} 마케팅`, `${n} 마케팅 대행`, `${n} 블로그 마케팅`, `${n} 블로그 광고`, `${n} 플레이스 마케팅`, `${n} 광고 대행`],
  };
}
