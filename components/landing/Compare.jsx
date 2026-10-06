// 비교 — 다크 밴드 (대행사에 데인 사장님 관점)
const rows = [
  ['계약 방식', '6~12개월 장기 묶음', '월 단위, 언제든 종료 가능'],
  ['성과 보고', '없거나 캡처 몇 장', '키워드별 월간 리포트'],
  ['상위노출 보장', '"1위 보장" 영업', '보장 대신 과정을 투명하게'],
  ['광고비 처리', '내역 불투명', '집행 내역 100% 공개'],
  ['채널 제안', '비싼 패키지 강매', '필요한 채널만 조합'],
];

const CompareSection = () => {
  return (
    <section className="lp-compare" id="compare">
      <div className="lp-container">
        <span className="lp-eyebrow">DIFFERENCE</span>
        <h2 className="lp-h2">대행사에 데인 적이<br />있으시다면</h2>
        <p className="lp-sub">업계의 나쁜 관행을 하나씩 반대로 했습니다</p>

        <div className="lp-cmp-table">
          <div className="lp-cmp-row">
            <div className="lp-cmp-cell head"></div>
            <div className="lp-cmp-cell head">흔한 대행사</div>
            <div className="lp-cmp-cell head">JD8</div>
          </div>
          {rows.map((r) => (
            <div className="lp-cmp-row" key={r[0]}>
              <div className="lp-cmp-cell label">{r[0]}</div>
              <div className="lp-cmp-cell">{r[1]}</div>
              <div className="lp-cmp-cell us">{r[2]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompareSection;
