'use client';

import { useIntersectionObserver, useCountUp } from './hooks';

// 숫자 스트립
const StatsSection = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const projects = useCountUp(500, 1800, isVisible);
  const guides = useCountUp(207, 1800, isVisible);
  const channels = useCountUp(4, 1200, isVisible);
  const report = useCountUp(100, 1800, isVisible);

  const items = [
    { num: <>{projects}<em>+</em></>, label: '누적 프로젝트' },
    { num: <>{guides}<em>종</em></>, label: '업종별 플레이북' },
    { num: <>{channels}<em>개</em></>, label: '통합 운영 채널' },
    { num: <>{report}<em>%</em></>, label: '월간 리포트 제공' },
  ];

  return (
    <section className="lp-strip" ref={ref}>
      <div className="lp-container">
        <div className="lp-strip-grid">
          {items.map((it, i) => (
            <div key={i}>
              <span className="lp-stat-num">{it.num}</span>
              <span className="lp-stat-label">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
