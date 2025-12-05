import { useEffect, useRef, useState } from 'react'
import { whyUsReasons } from '../../data/services'
import { Icon } from '../icons'

function WhyUs() {
  const sectionRef = useRef(null)
  const [countersVisible, setCountersVisible] = useState(false)

  const stats = [
    { number: 500, suffix: '+', label: '누적 고객사', color: 'from-blue-500 to-blue-600' },
    { number: 98, suffix: '%', label: '고객 만족도', color: 'from-green-500 to-green-600' },
    { number: 10, suffix: '년+', label: '업계 경험', color: 'from-purple-500 to-purple-600' },
    { number: 24, suffix: 'h', label: '빠른 응대', color: 'from-orange-500 to-orange-600' },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            if (entry.target.classList.contains('stats-section')) {
              setCountersVisible(true)
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = sectionRef.current?.querySelectorAll('.scroll-animate, .stats-section')
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  // 카운터 애니메이션 훅
  const useCounter = (end, duration = 2000, start = countersVisible) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
      if (!start) return

      let startTime = null
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, [end, duration, start])

    return count
  }

  return (
    <section className="section-padding bg-white overflow-hidden" ref={sectionRef}>
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="badge-primary mb-4">WHY JD8</span>
          <h2 className="section-title">
            왜 <span className="gradient-text">JD8</span>을 선택해야 할까요?
          </h2>
          <p className="section-subtitle">
            JD8만의 차별화된 서비스로 비즈니스 성장을 경험하세요
          </p>
        </div>

        {/* Why Us 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {whyUsReasons.map((reason, index) => (
            <div
              key={index}
              className="scroll-animate group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-medium transition-all duration-500"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {/* 배경 장식 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* 아이콘 */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Icon name={reason.icon} className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* 콘텐츠 */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>

              {/* 호버 시 화살표 */}
              <div className="absolute bottom-6 right-6 w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* 통계 섹션 */}
        <div className="stats-section scroll-animate relative overflow-hidden rounded-3xl">
          {/* 배경 */}
          <div className="absolute inset-0 gradient-bg" />
          <div className="absolute inset-0 pattern-dots opacity-30" />

          {/* 콘텐츠 */}
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12">
            {stats.map((stat, index) => (
              <StatCounter
                key={index}
                stat={stat}
                index={index}
                isVisible={countersVisible}
              />
            ))}
          </div>
        </div>

        {/* 비교 섹션 */}
        <div className="mt-20 scroll-animate">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              JD8 vs 일반 마케팅 대행사
            </h3>
            <p className="text-gray-600">
              차별화된 서비스 품질을 비교해보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* JD8 */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 border-2 border-primary-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">JD8</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">JD8 마케팅</h4>
                  <p className="text-sm text-primary-600">Premium Service</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  '10년+ 경력 전문가 직접 관리',
                  '24시간 내 신속한 응대',
                  '데이터 기반 맞춤 전략',
                  '투명한 실적 리포트 제공',
                  '합리적인 비용 구조',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 일반 대행사 */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">?</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">일반 대행사</h4>
                  <p className="text-sm text-gray-500">Standard Service</p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  '담당자 잦은 변경',
                  '늦은 응대 및 피드백',
                  '일률적인 마케팅 방식',
                  '불투명한 실적 보고',
                  '숨겨진 추가 비용',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-500">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// 통계 카운터 컴포넌트
function StatCounter({ stat, index, isVisible }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const stepValue = stat.number / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setCount(Math.floor(stepValue * currentStep))
      } else {
        setCount(stat.number)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, stat.number])

  return (
    <div
      className="text-center"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-white/70 font-medium">{stat.label}</div>
    </div>
  )
}

export default WhyUs
