import { portfolios } from '../../data/portfolios';

// V4 포트폴리오 — 자동 흐름 마퀴 카드 (틸트 + 호버 확대)
const PortfolioSection = () => {
  return (
    <section className="lp-portfolio" id="portfolio">
      <div className="lp-container">
        <span className="lp-eyebrow">PORTFOLIO</span>
        <h2 className="lp-h2">JD8이 만든 사이트들</h2>
        <p className="lp-sub">
          마케팅의 도착지가 되는 홈페이지도 직접 만듭니다.<br />
          20개 업종 제작 사례를 직접 눌러서 확인해보세요. (제작 문의는 jd8.co.kr)
        </p>
        <div className="lp-center">
          <a href="https://jd8.co.kr/references/index.html" target="_blank" rel="noopener noreferrer" className="lp-pill">
            더 많은 제작 사례 보러가기
            <span className="lp-pill-arrow">→</span>
          </a>
        </div>
      </div>

      <div className="lp-pf-marquee">
        <div className="lp-pf-track">
          {[...portfolios, ...portfolios].map((item, i) => (
            <a key={`${item.id}-${i}`} href={item.link} target="_blank" rel="noopener noreferrer" className="lp-pf-card">
              <div className="lp-pf-thumb">
                <img src={item.image} alt={`${item.title} - ${item.categoryLabel} 홈페이지 제작 사례`} loading="lazy" />
              </div>
              <span className="lp-pf-name">{item.title}</span>
              <span className="lp-pf-cat">{item.categoryLabel}</span>
            </a>
          ))}
        </div>
      </div>

      <p className="lp-pf-note">
        제작과 마케팅을 한 회사가 하면 메시지가 끊기지 않습니다. 공개 가능한 사례의 일부만 담았습니다.<br />
        <a href="https://pf.kakao.com/_Izxnxgn" target="_blank" rel="noopener noreferrer">
          우리 업종 사례가 궁금하다면, 카톡으로 요청해주세요 →
        </a>
      </p>
    </section>
  );
};

export default PortfolioSection;
