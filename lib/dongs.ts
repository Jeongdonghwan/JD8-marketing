import seoulData from '../data/seoul-dongs.json';
import ggData from '../data/gg-dongs.json';
import cityData from '../data/city-dongs.json';
import expansionData from '../data/expansion-dongs.json';
import { getAllRegions } from './regions';

// 전국 동/도시 단위 마케팅 대행 페이지 — 데이터 기반 생성
// 문장 뱅크를 동별 해시로 회전 조합해 페이지 간 복제를 피한다.

export interface DongEntry {
  dong: string;
  gu: string;
  guShort: string;
  province: string;
  regionLabel: string;
  containedIn: string;
  guRegionSlug: string;
  traits: string;
  industries: string[];
  urlSlug: string;       // 송파동-마케팅
  siblings: { dong: string; urlSlug: string }[];
}

const hashOf = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

let cache: DongEntry[] | null = null;

export function getAllDongs(): DongEntry[] {
  if (cache) return cache;

  const allGus: any[] = [
    ...seoulData.gus.map((g: any) => ({ ...g, province: '서울' })),
    ...ggData.gus,
    ...cityData.gus,
    ...expansionData.gus,
  ];

  const counts = new Map<string, number>();
  for (const g of allGus) for (const d of g.dongs) counts.set(d, (counts.get(d) || 0) + 1);

  const entries: DongEntry[] = [];
  for (const g of allGus) {
    const guShort = g.gu.replace(/(시|구|군)$/, '');
    const regionLabel =
      g.regionLabel || (g.province === '서울' ? `서울 ${g.gu}` : g.province === '인천' ? '인천광역시' : `경기 ${g.gu}`);
    const containedIn =
      g.containedIn || (g.province === '서울' ? `서울특별시 ${g.gu}` : g.province === '인천' ? '인천광역시' : `경기도 ${g.gu}`);
    for (const d of g.dongs) {
      const dup = (counts.get(d) || 0) > 1;
      entries.push({
        dong: d, gu: g.gu, guShort, province: g.province, regionLabel, containedIn,
        guRegionSlug: g.region, traits: g.traits, industries: g.industries,
        urlSlug: dup ? `${guShort}-${d}-마케팅` : `${d}-마케팅`,
        siblings: [],
      });
    }
  }

  const byGu = new Map<string, DongEntry[]>();
  for (const e of entries) {
    if (!byGu.has(e.gu)) byGu.set(e.gu, []);
    byGu.get(e.gu)!.push(e);
  }
  for (const e of entries) {
    e.siblings = byGu.get(e.gu)!.filter((s) => s.dong !== e.dong).map((s) => ({ dong: s.dong, urlSlug: s.urlSlug }));
  }

  const regionSlugs = new Set(getAllRegions().map((r) => r.urlSlug));
  const seen = new Set<string>();
  for (const e of entries) {
    if (regionSlugs.has(e.urlSlug)) throw new Error(`동 urlSlug가 지역 페이지와 충돌: ${e.urlSlug}`);
    if (seen.has(e.urlSlug)) throw new Error(`동 urlSlug 중복: ${e.urlSlug}`);
    seen.add(e.urlSlug);
  }

  cache = entries;
  return entries;
}

export const getDongByUrlSlug = (urlSlug: string) => {
  let key = urlSlug;
  try { key = decodeURIComponent(urlSlug); } catch {}
  return getAllDongs().find((d) => d.urlSlug === key);
};

export const getDongsByRegionSlug = (regionSlug: string) =>
  getAllDongs().filter((d) => d.guRegionSlug === regionSlug);

export const dongPath = (d: { urlSlug: string }) => `/region/${d.urlSlug}/`;
export const dongEncodedPath = (d: { urlSlug: string }) => `/region/${encodeURIComponent(d.urlSlug)}/`;

export interface DongContent {
  title: string;
  description: string;
  paragraphs: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
  hash: number;
  showcase: number[];
}

// 업종별 h3 소절 (마케팅 관점)
export function industryNote(dong: string, industryName: string, i: number, hash: number): string {
  const t = [
    `${dong}에서 ${industryName}을 고르는 손님은 플레이스 평점과 리뷰, 사진을 먼저 봅니다. 이 세 가지를 관리하는 것이 마케팅의 시작입니다.`,
    `예약·방문 전환이 핵심인 업종입니다. 플레이스 상위노출과 리뷰 관리로 ${dong} 검색에서 선택받는 구조를 만듭니다.`,
    `경쟁 업체가 많을수록 노출 순서가 매출 순서가 됩니다. 키워드 광고와 콘텐츠를 병행해 꾸준한 상위 자리를 노립니다.`,
    `방문 전 검색 비중이 높은 업종이라 "${dong}+업종" 검색 대응과 블로그 콘텐츠의 효과가 특히 큽니다.`,
  ];
  return t[(hash + i) % 4];
}

export function buildDongContent(e: DongEntry): DongContent {
  const h = hashOf(e.dong + e.gu);
  const { dong, gu } = e;

  const intros = [
    `${dong}에서 가게를 운영하면서 광고비는 나가는데 효과를 모르겠다면, 문제는 대부분 채널 선택과 순서에 있습니다. ${dong} 손님이 실제로 검색하는 길목(플레이스·지역 키워드)부터 잡는 것이 비용 대비 효과가 가장 큽니다.`,
    `"${dong} 맛집", "${dong} 피부관리"처럼 동네 이름이 붙은 검색은 이미 방문을 결정한 손님의 검색입니다. ${dong} 마케팅의 핵심은 이 검색의 첫 화면—플레이스와 블로그, 검색 결과—에 우리 가게를 올려두는 것입니다.`,
    `${gu} 안에서도 ${dong} 상권은 경쟁의 결이 다릅니다. 전단과 현수막은 지나가는 사람에게만 닿지만, 플레이스 상위노출과 리뷰는 ${dong}에 올 이유가 있는 사람에게 정확히 닿습니다.`,
    `${dong} 사장님들이 마케팅 대행을 찾는 이유는 단순합니다. 장사하면서 플레이스 관리, 블로그, 광고 세팅까지 직접 할 시간이 없기 때문입니다. 잘하는 것에 집중하시고, 노출은 맡기면 됩니다.`,
    `광고를 늘리기 전에 점검할 것이 있습니다. ${dong} 손님이 우리 가게를 검색했을 때 보이는 첫인상—플레이스 사진, 리뷰 답변, 검색 결과—입니다. 유입보다 전환 바닥부터 다지는 것이 ${dong}에서 이기는 순서입니다.`,
  ];

  const approaches = [
    `JD8은 ${dong} 상권의 검색어를 조사해 플레이스 키워드와 소식, 사진을 재정비하고, 블로그 콘텐츠로 "${dong}+업종" 검색을 함께 공략합니다. 매월 어떤 키워드에서 얼마나 노출됐는지 리포트로 보여드립니다.`,
    `전 과정 비대면으로 진행됩니다. ${dong} 매장 방문 없이 카톡으로 사진과 정보를 받아 플레이스·블로그·광고를 세팅하고, 성과는 매월 숫자로 보고드립니다.`,
    `같은 ${gu} 안에서도 업종이 다르면 통하는 채널이 다릅니다. JD8은 업종별 플레이북을 바탕으로 ${dong}의 우리 가게에 맞는 채널 조합(플레이스/블로그/인스타/키워드광고)을 제안합니다.`,
    `JD8의 ${dong} 마케팅은 노출로 끝나지 않습니다. 들어온 손님이 전화·카톡·예약으로 이어지도록 플레이스 버튼 구성과 홈페이지 문의 동선까지 함께 점검합니다.`,
  ];

  const prices = [
    `비용은 월 단위 운영 대행 기준으로 합리적으로 설계하며, 업종과 목표(플레이스/블로그/광고 범위)에 따라 달라집니다. ${dong} 상권 기준 견적은 카톡으로 업종만 알려주시면 바로 안내드립니다.`,
    `불필요한 패키지 없이 필요한 채널만 골라 시작할 수 있습니다. ${dong} 가게 상황을 알려주시면 예산 안에서 효과 순서대로 제안드립니다.`,
    `계약 기간 강제 없이 월 단위로 진행하며, 매월 성과 리포트를 기준으로 유지·조정 여부를 함께 결정합니다. ${dong} 상권 무료 진단부터 받아보세요.`,
  ];

  const faqBank: { q: string; a: string }[] = [
    { q: `${dong} 마케팅 대행 비용은 얼마인가요?`, a: `채널 범위(플레이스·블로그·광고)와 업종에 따라 달라집니다. 월 단위로 진행하며, 카톡으로 업종과 현재 상황을 알려주시면 무료 진단과 함께 견적을 안내드립니다.` },
    { q: `${dong}까지 방문 상담을 오시나요?`, a: `전 과정이 비대면으로 진행되어 방문이 필요 없습니다. 카톡과 전화로 상담부터 세팅, 월간 리포트까지 진행됩니다.` },
    { q: `플레이스 상위노출을 보장하나요?`, a: `순위 보장은 어떤 업체도 할 수 없으며, 보장을 내세우는 곳일수록 주의가 필요합니다. JD8은 키워드·사진·소식·리뷰 관리로 노출 조건을 갖추고, 실제 변화를 매월 리포트로 투명하게 보여드립니다.` },
    { q: `효과는 언제부터 보이나요?`, a: `플레이스 정비 효과는 보통 2~4주, 블로그·검색 콘텐츠는 1~3개월에 걸쳐 쌓입니다. 광고는 집행 즉시 유입이 생기지만, 전환 바닥(플레이스·리뷰)을 함께 다져야 비용 효율이 나옵니다.` },
    { q: `광고비는 별도인가요?`, a: `네, 매체에 지불하는 광고비와 운영 대행비는 구분됩니다. 예산 규모에 맞춰 광고비 배분안을 먼저 제안드리고, 집행 내역은 전부 공개합니다.` },
    { q: `${gu}의 다른 동네도 가능한가요?`, a: `물론입니다. ${gu} 전 지역과 전국 어디든 같은 방식으로 진행합니다. 페이지 하단 인근 지역 안내에서 해당 동을 확인하실 수 있습니다.` },
  ];

  const faq = [0, 1, 2, 3, 4].map((i) => faqBank[(h + i) % 6]);

  const descs = [
    `${dong} 마케팅 대행은 JD8. ${gu} ${dong} 상권의 플레이스 관리, 블로그·인스타 운영, 키워드 광고까지 매출로 이어지는 온라인 마케팅을 비대면으로 대행합니다.`,
    `${gu} ${dong} 마케팅 대행 전문 JD8. 동네 검색과 플레이스에서 선택받는 구조를 만들고 매월 성과 리포트로 보여드립니다. 무료 상권 진단부터 시작하세요.`,
    `JD8의 ${dong} 마케팅 — 플레이스 상위노출 관리, 지역 키워드 콘텐츠, 광고 운영까지. ${gu} 상권을 아는 대행사가 카톡 상담으로 바로 시작해드립니다.`,
  ];

  return {
    title: `${dong} 마케팅 대행 | ${gu} 플레이스·블로그·광고 - JD8`,
    description: descs[h % 3],
    paragraphs: [
      { heading: `${dong} 마케팅, 왜 지역부터 잡아야 할까요?`, body: intros[h % 5] },
      {
        heading: `${gu} 상권을 아는 마케팅`,
        body: `${gu} 지역은 ${e.traits}. ${dong}의 마케팅도 이 상권 흐름에 맞춰 채널과 메시지를 정해야 효과가 납니다.`,
      },
      { heading: `JD8이 ${dong}에서 일하는 방식`, body: approaches[h % 4] },
      { heading: `비용과 진행 방식`, body: prices[h % 3] },
    ],
    faq,
    hash: h,
    showcase: [h % 20, (h + 7) % 20, (h + 13) % 20],
  };
}
