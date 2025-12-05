import { useState, useEffect, useRef } from 'react'
import InquiryForm from '../common/InquiryForm'
import { Icon } from '../icons'

// 서비스별 배경 이미지
const serviceImages = {
  'smartstore': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'coupang': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'place': 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'meta-ad': 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'search-ad': 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
  'review': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
}

// FAQ 아코디언 컴포넌트
function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-5 px-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <Icon
          name="chevron-down"
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}
      >
        <p className="px-6 text-gray-600 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

// 성과 카드 컴포넌트
function PerformanceCard({ data, color }) {
  const metrics = Object.entries(data.metrics)

  return (
    <div className="bg-white rounded-2xl shadow-medium overflow-hidden">
      {/* 헤더 */}
      <div className={`bg-gradient-to-r ${color} p-6`}>
        <div className="flex items-center justify-between text-white">
          <div>
            <span className="text-white/80 text-sm">{data.industry}</span>
            <h4 className="text-xl font-bold">{data.company}</h4>
          </div>
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
            {data.period}
          </span>
        </div>
      </div>

      {/* 지표들 */}
      <div className="p-6">
        <div className="space-y-4">
          {metrics.map(([key, value], index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-gray-500 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 line-through text-sm">{value.before}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="font-bold text-gray-900">{value.after}</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${color} text-white`}>
                {value.growth}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ServiceDetail({ service }) {
  const [openFAQ, setOpenFAQ] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${service.title} | JD8 마케팅`

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
  }, [service])

  return (
    <div ref={sectionRef}>
      {/* 1. Hero 섹션 - 문제점 강조 */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${serviceImages[service.id] || serviceImages['smartstore']}')`
            }}
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`} />
          <div className="pattern-dots absolute inset-0 opacity-20" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Icon name={service.icon} className="w-5 h-5 text-white" />
            <span className="text-white/90 text-sm font-medium">JD8 {service.title}</span>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
              <Icon name={service.icon} className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {service.heroMessage || service.title}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            {service.description}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['500+ 고객사 선택', '98% 만족도', '24시간 응대'].map((badge, index) => (
              <div key={index} className="flex items-center gap-2 text-white/70">
                <Icon name="check" className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium">{badge}</span>
              </div>
            ))}
          </div>

          <a
            href="#inquiry-form"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:shadow-glow transition-all duration-300"
          >
            무료 상담 신청하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs font-medium tracking-wider uppercase">Scroll</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* 2. Pain Points 섹션 */}
      {service.painPoints && service.painPoints.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12 scroll-animate">
              <span className="badge-primary mb-4">PAIN POINTS</span>
              <h2 className="section-title">
                이런 <span className="gradient-text">고민</span>이 있으신가요?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {service.painPoints.map((point, index) => (
                <div
                  key={index}
                  className="scroll-animate flex items-center gap-4 bg-white p-6 rounded-xl shadow-soft border-l-4 border-red-400"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-500 text-xl font-bold">?</span>
                  </div>
                  <p className="text-gray-700 font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Solution 섹션 */}
      {service.solution && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center scroll-animate">
              <span className="badge-primary mb-4">SOLUTION</span>
              <h2 className="section-title mb-6">
                JD8의 <span className="gradient-text">{service.solution.title}</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {service.solution.desc}
              </p>

              {/* Difference 포인트 */}
              {service.difference && service.difference.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                  {service.difference.map((item, index) => (
                    <div
                      key={index}
                      className={`scroll-animate p-8 rounded-2xl bg-gradient-to-br ${service.color} text-white`}
                      style={{ transitionDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 mx-auto">
                        <Icon name={index === 0 ? 'bar-chart' : 'search'} className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-white/80">{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. Features 섹션 - 핵심 서비스 */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-animate">
            <span className="badge-primary mb-4">SERVICES</span>
            <h2 className="section-title">
              <span className="gradient-text">{service.title}</span> 핵심 서비스
            </h2>
            <p className="section-subtitle">
              전문적인 마케팅 서비스로 비즈니스 성장을 도와드립니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.features?.map((feature, index) => (
              <div
                key={index}
                className="scroll-animate group bg-white rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${index * 0.05}s` }}
              >
                {/* 아이콘 */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon name={feature.icon || service.icon} className="w-7 h-7 text-white" />
                </div>

                {/* 텍스트 */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process 섹션 - 6단계 상세 프로세스 */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-animate">
            <span className="badge-primary mb-4">PROCESS</span>
            <h2 className="section-title">
              <span className="gradient-text">체계적인 6단계</span> 프로세스
            </h2>
            <p className="section-subtitle">
              단계별 전문 프로세스로 최적의 결과를 만들어드립니다
            </p>
          </div>

          {/* 데스크톱 - 가로 타임라인 */}
          <div className="hidden lg:block relative">
            <div className="absolute top-16 left-[8%] right-[8%] h-1 bg-gray-200 rounded-full">
              <div className={`h-full bg-gradient-to-r ${service.color} rounded-full`} style={{ width: '100%' }} />
            </div>

            <div className="grid grid-cols-6 gap-4">
              {service.process?.map((step, index) => (
                <div
                  key={index}
                  className="scroll-animate relative text-center group"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-lg font-bold relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {step.step || index + 1}
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 group-hover:bg-white group-hover:shadow-medium transition-all duration-300">
                    <h4 className="font-bold text-gray-900 mb-1">{step.title || step}</h4>
                    {step.desc && <p className="text-xs text-gray-500">{step.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 태블릿/모바일 - 세로 타임라인 */}
          <div className="lg:hidden relative">
            <div className={`absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b ${service.color}`} />

            <div className="space-y-6">
              {service.process?.map((step, index) => (
                <div
                  key={index}
                  className="scroll-animate relative flex items-start gap-6"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-lg font-bold relative z-10 shadow-lg`}>
                    {step.step || index + 1}
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-xl p-4 hover:bg-white hover:shadow-medium transition-all duration-300">
                    <h4 className="font-bold text-gray-900 mb-1">{step.title || step}</h4>
                    {step.desc && <p className="text-sm text-gray-500">{step.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Performance 섹션 - 성과 사례 */}
      {service.performance && service.performance.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16 scroll-animate">
              <span className="badge-primary mb-4">PERFORMANCE</span>
              <h2 className="section-title">
                실제 <span className="gradient-text">성과 사례</span>
              </h2>
              <p className="section-subtitle">
                JD8과 함께한 고객사들의 실제 성과입니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {service.performance.map((perf, index) => (
                <div key={index} className="scroll-animate" style={{ transitionDelay: `${index * 0.1}s` }}>
                  <PerformanceCard data={perf} color={service.color} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. FAQ 섹션 */}
      {service.faq && service.faq.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12 scroll-animate">
              <span className="badge-primary mb-4">FAQ</span>
              <h2 className="section-title">
                자주 묻는 <span className="gradient-text">질문</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto bg-gray-50 rounded-2xl overflow-hidden scroll-animate">
              {service.faq.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.q}
                  answer={item.a}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA 섹션 */}
      <section className={`relative py-20 overflow-hidden`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${service.color}`} />
        <div className="pattern-dots absolute inset-0 opacity-20" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">지금 바로 시작하세요!</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {service.title}로<br />비즈니스를 성장시키세요
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            무료 상담을 통해 맞춤형 마케팅 전략을 받아보세요
          </p>
          <a
            href="#inquiry-form"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:shadow-glow transition-all duration-300"
          >
            무료 상담 신청하기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* 9. 문의 폼 섹션 */}
      <section id="inquiry-form" className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* 왼쪽: 문의 안내 */}
              <div className="lg:sticky lg:top-32 scroll-animate">
                <span className="badge-primary mb-4">CONTACT US</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  <span className="gradient-text">{service.title}</span> 관련<br />
                  문의하기
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  {service.title} 전문 컨설턴트가 귀사의 상황을 분석하고
                  맞춤형 마케팅 전략을 제안해 드립니다.
                </p>

                {/* 연락처 정보 */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                      <Icon name="phone" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">전화 문의</p>
                      <a href="tel:1566-3046" className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors">
                        1566-3046
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">이메일 문의</p>
                      <a href="mailto:jdhwan227@naver.com" className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors">
                        jdhwan227@naver.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* 보장 배지 */}
                <div className="flex flex-wrap gap-3">
                  {['빠른 응대', '무료 컨설팅', '맞춤 전략'].map((badge, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 text-sm font-medium rounded-full"
                    >
                      <Icon name="check" className="w-4 h-4" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* 오른쪽: 문의 폼 */}
              <div className="bg-white rounded-2xl shadow-strong p-8 border border-gray-100 scroll-animate">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">문의하기</h3>
                  <p className="text-gray-600 text-sm">
                    아래 양식을 작성해 주시면 빠르게 연락드리겠습니다
                  </p>
                </div>
                <InquiryForm serviceType={service.title} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServiceDetail
