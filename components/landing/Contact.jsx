import { KakaoIcon } from './icons';

// V4 최종 CTA 밴드 — 카카오 단일 동선 (id="contact" 유지: 전 사이트 /#contact 링크의 도착지)
const ContactSection = () => {
  return (
    <section className="lp-cta" id="contact">
      <div className="lp-ink i2" aria-hidden="true" style={{ opacity: 0.3 }}></div>
      <h2 className="lp-cta-big">
        광고비 쓰기 전에<br />
        <span className="accent">무료 진단</span>부터 받아보세요
      </h2>
      <p className="lp-cta-sub">
        업종과 지역만 알려주시면 플레이스·검색 현황을 진단해 개선 포인트를 보내드립니다.<br />
        진단과 견적 확인은 무료이고, 영업 전화로 괴롭히지 않습니다.
      </p>
      <div className="lp-center">
        <a href="https://pf.kakao.com/_Izxnxgn" target="_blank" rel="noopener noreferrer" className="lp-pill kakao-pill">
          <KakaoIcon size={20} /> 카톡으로 무료 진단 받기
          <span className="lp-pill-arrow">→</span>
        </a>
      </div>
      <p className="lp-cta-tel">
        전화가 편하시다면 <a href="tel:1566-3046">1566-3046</a> (평일·주말 상담 가능)
      </p>
    </section>
  );
};

export default ContactSection;
