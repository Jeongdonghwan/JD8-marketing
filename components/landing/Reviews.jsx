// 고객 후기 — 무한 마퀴
const reviews = [
  { name: '김*호 대표', business: '카페 운영', content: '플레이스 정비하고 한 달 만에 지도 유입이 눈에 띄게 늘었어요. 리뷰 답변까지 챙겨주셔서 든든합니다.' },
  { name: '박*준 원장', business: '치과의원', content: '매달 리포트로 어떤 키워드에서 들어왔는지 보여주니 광고비 쓰는 게 처음으로 납득이 됐습니다.' },
  { name: '송*아 실장', business: '네일샵', content: '인스타 운영을 통째로 맡겼는데 예약 DM이 확실히 늘었어요. 릴스 퀄리티도 만족합니다.' },
  { name: '이*영 실장', business: '인테리어 업체', content: '블로그 글이 쌓이면서 광고 없이 들어오는 상담이 생기기 시작했습니다. 이게 자산이 되는 거네요.' },
  { name: '윤*혁 대표', business: 'PT 스튜디오', content: '전에 쓰던 업체는 1위 보장한다더니 연락도 안 됐는데, 여긴 과정을 다 보여줘서 믿음이 갑니다.' },
  { name: '정*수 원장', business: '피부과의원', content: '월 단위 계약이라 부담 없이 시작했는데 석 달째 계속 연장 중입니다. 문의 수가 말해주네요.' },
  { name: '최*민 대표', business: '온라인 쇼핑몰', content: '메타 광고 소재를 계속 테스트하면서 전환 단가를 잡아줬어요. 광고비 내역도 전부 공개해줍니다.' },
  { name: '한*진 대표', business: '펜션 운영', content: '플랫폼 수수료에 눌려 있었는데 직예약 유입이 생기니 숨통이 트입니다. 지역 키워드 효과를 봤어요.' },
];

const ReviewsSection = () => {
  return (
    <section className="lp-reviews" id="reviews">
      <div className="lp-container">
        <span className="lp-eyebrow">REVIEWS</span>
        <h2 className="lp-h2">맡겨본 사장님들의 이야기</h2>
      </div>

      <div className="lp-rv-marquee" aria-label="고객 후기 목록">
        <div className="lp-rv-track">
          {[...reviews, ...reviews].map((r, i) => (
            <div className="lp-rv-card" key={i}>
              <div className="lp-rv-stars">★★★★★</div>
              <p className="lp-rv-text">"{r.content}"</p>
              <p className="lp-rv-who"><b>{r.name}</b>{r.business}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
