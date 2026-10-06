'use client';

import { useState, useEffect } from 'react';
import { KakaoIcon } from './icons';

const WORDS = ['카페', '치과', '헬스장', '미용실', '학원', '펜션', '네일샵', '정비소', '필라테스', '고깃집'];

// 마케팅 히어로 — 풀블리드 다크 + 잉크 블롭 + 워터마크
const HeroSection = () => {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="lp-hero">
      <div className="lp-ink i1" aria-hidden="true"></div>
      <div className="lp-ink i2" aria-hidden="true"></div>
      <div className="lp-ink i3" aria-hidden="true"></div>
      <span className="lp-watermark wl" aria-hidden="true">MARKETING</span>
      <span className="lp-watermark wr" aria-hidden="true">JD8</span>

      <div className="lp-hero-inner">
        <p className="lp-hero-eyebrow">광고비가 아까운 사장님께</p>
        <h1 className="lp-hero-title">
          <span className="t-line">광고를 늘려도</span>
          <span className="t-line"><span className="accent">매출</span>이 늘지 않는 이유</span>
        </h1>
        <p className="lp-hero-sub">
          채널의 순서가 틀렸기 때문입니다.<br />
          <span className="lp-rotator"><span key={wordIdx} className="word">{WORDS[wordIdx]}</span></span> 가게도
          플레이스 → 지역 검색 → 광고 순서로 잡으면 결과가 달라집니다.
        </p>

        <div className="lp-center">
          <a href="https://pf.kakao.com/_Izxnxgn" target="_blank" rel="noopener noreferrer" className="lp-pill kakao-pill">
            <KakaoIcon size={20} /> 카톡으로 무료 상권 진단
            <span className="lp-pill-arrow">→</span>
          </a>
          <a href="#contact" className="lp-pill on-dark">
            서비스 안내 보기
            <span className="lp-pill-arrow">→</span>
          </a>
        </div>

        <div className="lp-hero-meta">
          <span><b>월 단위</b>계약 (장기 묶음 없음)</span>
          <span><b>매월</b>성과 리포트</span>
          <span><b>100%</b>광고비 내역 공개</span>
          <span><b>비대면</b>전국 진행</span>
        </div>
      </div>

      <div className="lp-scroll-hint" aria-hidden="true"></div>
    </section>
  );
};

export default HeroSection;
