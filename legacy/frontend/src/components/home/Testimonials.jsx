import { useState, useEffect, useRef } from 'react'
import { Icon } from '../icons'

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const sectionRef = useRef(null)

  const testimonials = [
    {
      id: 1,
      name: '김** 대표',
      company: '패션 쇼핑몰',
      service: '스마트스토어 마케팅',
      rating: 5,
      icon: 'shopping-bag',
      iconColor: 'from-pink-500 to-rose-500',
      iconBg: 'bg-pink-100',
      content: '스마트스토어 시작 3개월 만에 월 매출 500만원을 달성했습니다. JD8팀의 체계적인 마케팅 전략 덕분입니다. 특히 상위 노출 관리가 정말 탁월했어요.',
      stats: { before: '50만원', after: '500만원', growth: '900%' }
    },
    {
      id: 2,
      name: '이** 대표',
      company: '건강식품',
      service: '쿠팡 마케팅',
      rating: 5,
      icon: 'heart',
      iconColor: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-100',
      content: '쿠팡 광고를 직접 운영하다가 JD8에 맡겼는데, 같은 광고비로 ROAS가 3배 이상 올랐습니다. 데이터 기반의 최적화가 확실히 다릅니다.',
      stats: { before: 'ROAS 150%', after: 'ROAS 480%', growth: '3.2배' }
    },
    {
      id: 3,
      name: '박** 원장',
      company: '강남 피부과',
      service: '플레이스 마케팅',
      rating: 5,
      icon: 'building',
      iconColor: 'from-blue-500 to-indigo-500',
      iconBg: 'bg-blue-100',
      content: '네이버 플레이스 상위 노출 후 예약 문의가 2배 이상 늘었습니다. 리뷰 관리까지 꼼꼼하게 해주셔서 신규 환자분들의 신뢰도가 많이 높아졌어요.',
      stats: { before: '월 30건', after: '월 75건', growth: '150%' }
    },
    {
      id: 4,
      name: '최** 대표',
      company: '인테리어 업체',
      service: '검색광고',
      rating: 5,
      icon: 'home',
      iconColor: 'from-orange-500 to-amber-500',
      iconBg: 'bg-orange-100',
      content: '검색광고 비용은 줄이면서 전환율은 높아졌습니다. 매주 보내주시는 리포트로 광고 현황을 쉽게 파악할 수 있어 만족합니다.',
      stats: { before: '전환율 2%', after: '전환율 7%', growth: '3.5배' }
    },
    {
      id: 5,
      name: '정** 대표',
      company: '뷰티 브랜드',
      service: '리뷰 마케팅',
      rating: 5,
      icon: 'sparkles',
      iconColor: 'from-purple-500 to-violet-500',
      iconBg: 'bg-purple-100',
      content: '체험단 운영으로 자연스러운 리뷰가 쌓이니까 구매 전환율이 확실히 올랐어요. 전담 매니저님이 항상 빠르게 응대해주셔서 좋습니다.',
      stats: { before: '리뷰 50개', after: '리뷰 300개', growth: '500%' }
    },
  ]

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

    const items = sectionRef.current?.querySelectorAll('.scroll-animate')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  // 자동 슬라이드
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay, testimonials.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlay(false)
    setTimeout(() => setIsAutoPlay(true), 10000)
  }

  return (
    <section className="section-padding bg-gray-50 overflow-hidden" ref={sectionRef}>
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16 scroll-animate">
          <span className="badge-primary mb-4">TESTIMONIALS</span>
          <h2 className="section-title">
            고객님들의 <span className="gradient-text">생생한 후기</span>
          </h2>
          <p className="section-subtitle">
            JD8과 함께 성장한 고객사들의 실제 경험담입니다
          </p>
        </div>

        {/* 메인 후기 슬라이더 */}
        <div className="relative max-w-4xl mx-auto">
          {/* 슬라이더 컨테이너 */}
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0"
                >
                  <div className="bg-white p-8 md:p-12 rounded-3xl shadow-medium">
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* 프로필 - 업종 아이콘 */}
                      <div className="flex-shrink-0 text-center md:text-left">
                        {/* 업종 아이콘 */}
                        <div className={`w-20 h-20 mx-auto md:mx-0 mb-4 rounded-2xl bg-gradient-to-br ${testimonial.iconColor} flex items-center justify-center shadow-lg`}>
                          <Icon name={testimonial.icon} className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.company}</p>
                        <span className="inline-block mt-2 px-3 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
                          {testimonial.service}
                        </span>
                      </div>

                      {/* 콘텐츠 */}
                      <div className="flex-1">
                        {/* 별점 */}
                        <div className="flex gap-1 mb-4 justify-center md:justify-start">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* 인용문 */}
                        <div className="relative">
                          <svg className="absolute -top-4 -left-2 w-8 h-8 text-primary-100" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                          </svg>
                          <p className="text-gray-700 text-lg leading-relaxed pl-6">
                            {testimonial.content}
                          </p>
                        </div>

                        {/* 성과 통계 */}
                        <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl">
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">Before</p>
                            <p className="font-bold text-gray-700">{testimonial.stats.before}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">After</p>
                            <p className="font-bold text-primary-600">{testimonial.stats.after}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mb-1">성장률</p>
                            <p className="font-bold text-green-600">{testimonial.stats.growth}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 네비게이션 버튼 */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-xl transition-all"
            aria-label="이전"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary-600 hover:shadow-xl transition-all"
            aria-label="다음"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 도트 인디케이터 */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2 bg-primary-500'
                    : 'w-2 h-2 bg-gray-300 hover:bg-primary-300'
                }`}
                aria-label={`슬라이드 ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 scroll-animate">
          <p className="text-gray-600 mb-4">
            다음 성공 사례의 주인공이 되어보세요!
          </p>
          <a
            href="#inquiry-form"
            className="btn-primary inline-flex items-center gap-2"
          >
            무료 상담 신청하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
