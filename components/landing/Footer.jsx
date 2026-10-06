import Link from 'next/link';
import { PhoneIcon } from './icons';

// Footer (서버 컴포넌트 — 전 페이지 공통, 내부링크 포함)
const Footer = () => {
  return (
    <footer className="footer">
      <div className="section-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>주식회사 제이디에이치</h3>
            <p>매출로 이어지는 온라인 마케팅 대행</p>
          </div>
          <div className="footer-contact">
            <p><PhoneIcon /> 대표전화: 1566-3046</p>
            <p>대표자: 정동환</p>
          </div>
          <nav className="footer-links" aria-label="사이트 링크">
            <p className="footer-links-title">바로가기</p>
            <Link href="/service/">마케팅 서비스</Link>
            <Link href="/region/">지역별 마케팅 대행</Link>
            <a href="https://jd8.co.kr" target="_blank" rel="noopener noreferrer">홈페이지 제작 (jd8.co.kr)</a>
            <Link href="/blog/">블로그</Link>
            <a href="https://jd8.co.kr/references/index.html" target="_blank" rel="noopener noreferrer">제작 사례</a>
          </nav>
        </div>
        <div className="footer-info">
          <p>사업자등록번호: 503-87-03619</p>
          <p>주소: 경기도 용인시 기흥구 금화로 3, 제이20호</p>
        </div>
        <div className="footer-bottom">
          <p>© 2024 주식회사 제이디에이치. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
