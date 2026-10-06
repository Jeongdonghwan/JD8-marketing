import { Link } from 'react-router-dom'
import { services } from '../../data/services'
import { useEffect, useRef } from 'react'
import { Icon } from '../icons'

function ServiceCards() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = sectionRef.current?.querySelectorAll('.scroll-animate')
    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  // 서비스별 특징 태그
  const serviceTags = {
    'smartstore': ['매출 상승', '상위 노출', 'SEO 최적화'],
    'coupang': ['로켓배송', '광고 최적화', '리뷰 관리'],
    'place': ['지역 1위', '방문 유도', '리뷰 마케팅'],
    'search-ad': ['키워드 분석', '광고 최적화', 'ROI 개선'],
    'review': ['신뢰도 향상', '구매 전환', '평점 관리'],
  }

  // 서비스별 목업 이미지
  const serviceImages = {
    'smartstore': 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 온라인 쇼핑 카트/이커머스
    'coupang': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 물류 창고/박스 배송
    'place': 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 카페/로컬 비즈니스 인테리어
    'meta-ad': 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 인스타그램/소셜 미디어 마케팅
    'search-ad': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 분석 대시보드/검색 마케팅
    'review': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    // 고객 리뷰/별점
  }

  return (
    <section id="services" className="section-padding bg-gradient-to-b from-gray-50 to-white" ref={sectionRef}>
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="badge-primary mb-4">SERVICES</span>
          <h2 className="section-title">
            <span className="gradient-text">전문 서비스</span>로<br className="sm:hidden" /> 비즈니스를 성장시키세요
          </h2>
          <p className="section-subtitle">
            10년 경력의 마케팅 전문가가 귀사의 매출 성장을 책임집니다
          </p>
        </div>

        {/* 서비스 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={service.id}
              to={service.path}
              className="scroll-animate group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-2"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* 상단 컬러 악센트 바 */}
              <div className={`h-1.5 bg-gradient-to-r ${service.color}`} />

              {/* 이미지 영역 */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={serviceImages[service.id]}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent`} />

                {/* 아이콘 오버레이 */}
                <div className={`absolute bottom-4 left-4 w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={service.icon} className="w-7 h-7 text-white" />
                </div>
              </div>

              {/* 콘텐츠 영역 */}
              <div className="p-6">
                {/* 제목 */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>

                {/* 설명 */}
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.shortDesc}
                </p>

                {/* 태그 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {serviceTags[service.id]?.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-primary-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    자세히 보기
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>

                  {/* 호버 시 나타나는 화살표 버튼 */}
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* 호버 그라데이션 오버레이 */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* 하단 CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            어떤 서비스가 필요한지 모르시겠나요?
          </p>
          <a
            href="#inquiry-form"
            className="btn-primary inline-flex items-center gap-2"
          >
            무료 컨설팅 받기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default ServiceCards
