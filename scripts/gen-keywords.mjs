// 블로그 키워드 큐 생성기 (마케팅) — node scripts/gen-keywords.mjs
// 업종/지역/조합/실무 4개 풀을 라운드로빈으로 섞어 data/keyword-queue.json 에 적재.
// 루틴(자동 발행)은 data/keyword-cursor.json 의 next 인덱스부터 순서대로 소비한다.
import fs from 'node:fs';

const taxonomy = JSON.parse(fs.readFileSync('data/taxonomy.json', 'utf-8'));
const seoul = JSON.parse(fs.readFileSync('data/seoul-dongs.json', 'utf-8'));
const gg = JSON.parse(fs.readFileSync('data/gg-dongs.json', 'utf-8'));
const city = JSON.parse(fs.readFileSync('data/city-dongs.json', 'utf-8'));
const expansion = JSON.parse(fs.readFileSync('data/expansion-dongs.json', 'utf-8'));

// ---- 소스 데이터 ----
const industries = taxonomy.industries.filter((i) => i.priority <= 2);
const p1 = industries.filter((i) => i.priority === 1);

const guList = [...seoul.gus.map((g) => ({ n: g.gu === '중구' ? '서울 중구' : g.gu.replace(/구$/, '') }))];
for (const g of [...gg.gus, ...city.gus, ...expansion.gus]) {
  guList.push({ n: g.gu.replace(/(시|군)$/, '') });
}
const dongList = [];
for (const g of [...seoul.gus, ...gg.gus, ...city.gus, ...expansion.gus]) {
  for (const d of g.dongs) dongList.push({ n: d, gu: g.gu });
}

// ---- 각도 뱅크 (마케팅) ----
const indAngles = [
  '{N} 네이버 플레이스 상위노출, 뭐부터 해야 할까',
  '{N} 마케팅 비용, 얼마가 적당할까',
  '{N} 블로그 마케팅 제대로 하는 법',
  '{N} 인스타그램 운영 전략',
  '{N} 네이버 광고, 할 만할까',
  '{N} 리뷰 관리로 단골 만드는 법',
  '{N} 신규 오픈 마케팅 체크리스트',
  '{N} 마케팅 대행사 고르는 기준',
  '{N} 손님이 검색하는 키워드 찾는 법',
  '{N} 플레이스 리뷰 늘리는 합법적인 방법',
  '{N} 광고비 아끼는 매체 선택법',
  '{N} 체험단 마케팅 제대로 쓰는 법',
];
const regAngles = [
  '{R} 마케팅 대행 비용과 시세',
  '{R} 마케팅 대행사 고르는 법',
  '{R} 가게 플레이스 상위노출 전략',
  '{R} 소상공인 온라인 마케팅 가이드',
  '{R} 지역 키워드로 손님 모으는 법',
  '{R} 신규 오픈 가게 마케팅 순서',
];
const comboAngles = [
  '{R} {N} 마케팅 가이드',
  '{R} {N} 플레이스 상위노출 전략',
  '{R} {N} 광고, 어디에 해야 할까',
];
const practicalTopics = [
  '네이버 플레이스 순위 결정 요인', '플레이스 대표 키워드 설정법', '스마트플레이스 소식 기능 활용법', '플레이스 리뷰 답변 작성법',
  '블로그 체험단 대가성 표기 규정', '네이버 블로그 검색 노출 원리', '인플루언서 협업 비용 구조', '인스타그램 릴스 vs 피드, 뭘 올릴까',
  '파워링크 입찰가 정하는 법', '네이버 광고 품질지수 올리는 법', '광고 소재 A/B 테스트 기초', 'ROAS 계산하고 해석하는 법',
  '스마트스토어 상품명 작성법', '쿠팡 광고 ACOS 관리 기초', '리뷰 이벤트 설계법', '가짜 리뷰 업체 구별하는 법',
  '마케팅 대행 계약서 체크리스트', '월간 마케팅 리포트 읽는 법', '상위노출 보장 업체를 피해야 하는 이유', '네이버 검색광고 vs 플레이스광고',
  '당근마켓 비즈프로필 활용법', '카카오톡 채널 운영 기본기', '구글 지도 노출 기초', '소상공인 마케팅 예산 배분법',
  '오픈 첫 달 마케팅 우선순위', '재방문율 높이는 메시지 마케팅', '퍼포먼스 마케팅 용어 정리', '랜딩페이지 전환율 높이는 법',
  '시즌별 마케팅 캘린더 만들기', '손님 후기 콘텐츠로 활용하는 법',
];
const practicalVariations = ['', ' (2026년 기준)', ' — 소상공인 편', ' — 실수 사례로 배우기', ' 총정리', ' 5분 요약', ' Q&A'];

// ---- 풀 생성 ----
const poolIndustry = [];
for (const a of indAngles) for (const i of industries) poolIndustry.push({ k: a.replace('{N}', i.name), a: 'industry', i: i.slug, r: null });
poolIndustry.sort((x, y) => {
  const px = p1.some((p) => p.slug === x.i) ? 0 : 1;
  const py = p1.some((p) => p.slug === y.i) ? 0 : 1;
  return px - py;
});

const poolRegion = [];
for (const a of regAngles) {
  for (const g of guList) poolRegion.push({ k: a.replace('{R}', g.n), a: 'region', i: null, r: g.n });
  for (const d of dongList) poolRegion.push({ k: a.replace('{R}', d.n), a: 'region', i: null, r: `${d.gu} ${d.n}` });
}

const comboInd = industries.slice(0, 60).filter((i) => i.name.length <= 9);
const comboRegions = [...guList.map((g) => g.n), ...dongList.slice(0, 220).map((d) => d.n)];
const poolCombo = [];
for (const a of comboAngles) for (const r of comboRegions) for (const i of comboInd) {
  poolCombo.push({ k: a.replace('{R}', r).replace('{N}', i.name), a: 'combo', i: i.slug, r });
}

const poolPractical = [];
for (const v of practicalVariations) for (const t of practicalTopics) poolPractical.push({ k: t + v, a: 'practical', i: null, r: null });

// ---- 라운드로빈 인터리브 (업종:지역:조합:실무 = 2:2:1:1) ----
const queue = [];
const ratio = [[poolIndustry, 2], [poolRegion, 2], [poolCombo, 1], [poolPractical, 1]];
const idx = [0, 0, 0, 0];
let remaining = poolIndustry.length + poolRegion.length + poolCombo.length + poolPractical.length;
while (remaining > 0) {
  for (let p = 0; p < ratio.length; p++) {
    const [pool, take] = ratio[p];
    for (let t = 0; t < take && idx[p] < pool.length; t++) {
      queue.push(pool[idx[p]++]);
      remaining--;
    }
  }
}

const seen = new Set();
const deduped = queue.filter((q) => (seen.has(q.k) ? false : (seen.add(q.k), true)));

fs.writeFileSync('data/keyword-queue.json', JSON.stringify(deduped));
if (!fs.existsSync('data/keyword-cursor.json')) {
  fs.writeFileSync('data/keyword-cursor.json', JSON.stringify({ next: 0 }, null, 2) + '\n');
}
console.log('풀 크기 — 업종:', poolIndustry.length, '/ 지역:', poolRegion.length, '/ 조합:', poolCombo.length, '/ 실무:', poolPractical.length);
console.log('큐 총', deduped.length, '개 키워드 생성 (data/keyword-queue.json)');
console.log('하루 10개 발행 시', Math.round(deduped.length / 10 / 365 * 10) / 10, '년치');
