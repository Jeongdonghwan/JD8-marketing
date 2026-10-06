'use client';

import { useRef } from 'react';
import { useScrollAnimation } from './hooks';

// 쇼케이스 — 그라데이션 목업 카드 3종 (플레이스·지역검색·전환)
const WorkingSection = () => {
  const ref = useRef(null);
  useScrollAnimation(ref);

  return (
    <section className="lp-showcase" id="working" ref={ref}>
      <div className="lp-container">
        <span className="lp-eyebrow scroll-animate">WHY JD8</span>
        <h2 className="lp-h2 scroll-animate stagger-1">
          유입만 사는 광고가 아니라<br />남는 마케팅을 합니다
        </h2>
        <p className="lp-sub scroll-animate stagger-2">검색·플레이스·콘텐츠로 바닥을 다진 뒤 광고를 얹는 순서가 비용을 아낍니다.</p>

        <div className="lp-show-grid">
          <div className="lp-show-card g1 scroll-animate stagger-1">
            <div className="lp-mock">
              <p className="lp-mock-head">플레이스 진단</p>
              <p className="lp-mock-big">62<em>점 → 개선 포인트 9개</em></p>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar"></span><span className="lp-mock-chip">사진 교체</span></div>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar short"></span><span className="lp-mock-bar"></span></div>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar"></span></div>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar short"></span></div>
            </div>
            <div className="lp-show-caption">
              <h3>손님이 가장 먼저 보는 플레이스부터<br />키워드·사진·리뷰를 정비합니다</h3>
              <span>무료 진단 → 개선 리스트 → 매월 관리</span>
            </div>
          </div>

          <div className="lp-show-card g2 scroll-animate stagger-2">
            <div className="lp-mock">
              <div className="lp-mock-query"><span className="q-dot"></span>"동네이름 + 업종" 검색 결과는?</div>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar"></span><span className="lp-mock-chip">내 가게</span></div>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar"></span></div>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar short"></span></div>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar"></span></div>
            </div>
            <div className="lp-show-caption">
              <h3>광고 없이도 잡히는 지역 검색을<br />블로그·콘텐츠로 선점합니다</h3>
              <span>지역+업종 키워드 콘텐츠 · 검색 최적화</span>
            </div>
          </div>

          <div className="lp-show-card g3 scroll-animate stagger-3">
            <div className="lp-mock">
              <p className="lp-mock-head">이번 달 성과 리포트</p>
              <p className="lp-mock-big">유입 +41%<em> · 문의 +18건</em></p>
              <div className="lp-mock-row"><span className="lp-mock-dot" style={{background:'#fee500'}}></span><span className="lp-mock-bar"></span><span className="lp-mock-chip">플레이스</span></div>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar short"></span><span className="lp-mock-chip">블로그</span></div>
              <div className="lp-mock-row"><span className="lp-mock-dot"></span><span className="lp-mock-bar"></span><span className="lp-mock-chip">광고</span></div>
            </div>
            <div className="lp-show-caption">
              <h3>감이 아니라 숫자로 보고합니다<br />매월 채널별 성과 리포트</h3>
              <span>키워드·유입·문의 — 유지와 조정을 함께 결정</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingSection;
