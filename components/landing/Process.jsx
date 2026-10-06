// 프로세스 — 아웃라인 넘버 카드
const steps = [
  { num: '01', title: '무료 진단', desc: '플레이스·검색 노출 현황을 점검하고 개선 포인트를 정리해드립니다.' },
  { num: '02', title: '전략 설계', desc: '업종 플레이북 기반으로 채널 조합과 키워드, 예산 배분을 제안합니다.' },
  { num: '03', title: '운영', desc: '플레이스·콘텐츠·광고를 세팅하고 매주 돌아가는 운영 루틴을 만듭니다.' },
  { num: '04', title: '리포트', desc: '매월 숫자로 보고합니다. 데이터를 보고 유지·조정을 함께 결정합니다.' },
];

const ProcessSection = () => {
  return (
    <section className="lp-process" id="process">
      <div className="lp-container">
        <span className="lp-eyebrow">PROCESS</span>
        <h2 className="lp-h2">맡기고, 숫자로 확인하세요</h2>
        <p className="lp-sub">진단부터 리포트까지 전 과정 비대면</p>

        <div className="lp-proc-grid">
          {steps.map((s) => (
            <div className="lp-proc-step" key={s.num}>
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
