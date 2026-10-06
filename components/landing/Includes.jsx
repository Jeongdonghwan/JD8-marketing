'use client';

import { useRef } from 'react';
import { useScrollAnimation } from './hooks';
import { SearchIcon, DocumentIcon, DeviceIcon, PaletteIcon, WrenchIcon, RocketIcon } from './icons';

// 운영 대행 포함 내역
const IncludesSection = () => {
  const ref = useRef(null);
  useScrollAnimation(ref);

  const includes = [
    { icon: <SearchIcon />, title: '플레이스 관리', desc: '키워드·사진·소식·리뷰 답변 운영' },
    { icon: <DocumentIcon />, title: '블로그 콘텐츠', desc: '지역·업종 키워드 글 발행' },
    { icon: <DeviceIcon />, title: '인스타그램 운영', desc: '피드·릴스 콘텐츠 제작·운영' },
    { icon: <RocketIcon />, title: '광고 운영', desc: '네이버·메타 광고 세팅과 최적화' },
    { icon: <PaletteIcon />, title: '소재 제작', desc: '카드뉴스·배너 등 콘텐츠 디자인' },
    { icon: <WrenchIcon />, title: '월간 리포트', desc: '키워드·유입·문의 성과 보고' },
  ];

  return (
    <section className="lp-includes" id="includes" ref={ref}>
      <div className="lp-container">
        <span className="lp-eyebrow scroll-animate">ALL-IN-ONE</span>
        <h2 className="lp-h2 scroll-animate stagger-1">필요한 채널만 골라 맡기세요</h2>
        <p className="lp-sub scroll-animate stagger-2">패키지 강매 없이, 업종과 예산에 맞는 조합으로 시작합니다</p>

        <div className="lp-inc-grid">
          {includes.map((item, i) => (
            <div key={item.title} className={`lp-inc-card scroll-animate stagger-${(i % 6) + 1}`}>
              <div className="ic">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IncludesSection;
