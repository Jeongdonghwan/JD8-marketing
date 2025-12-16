import { useState, useEffect, useRef } from 'react'
import InquiryForm from '../components/common/InquiryForm'
import { Icon } from '../components/icons'

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

// 쿠팡 트래픽 부스트 데이터
const coupangProducts = [
  { name: '프라다', type: '프로그램', period: '30일', path: '모바일', timing: '익일', traffic: '600 유입' },
  { name: '헤르메스', type: '프로그램', period: '30일', path: '모바일', timing: '익일', traffic: '300 유입' },
  { name: '시그니처', type: '프로그램', period: '30일', path: '모바일', timing: '익일', traffic: '300~450 유입' },
  { name: '피에스타', type: '프로그램', period: '30일', path: '모바일', timing: '익일', traffic: '200 유입' },
  { name: '탑', type: '프로그램', period: '30일', path: '모바일', timing: '익일', traffic: '400 유입' },
]

// 스토어 트래픽 부스트 데이터
const storeProducts = [
  { name: 'STAY', type: '리워드', period: '10일(일할 가능)', path: '모바일', timing: '익일', traffic: '100 유입' },
  { name: '스캔들', type: '리워드', period: '10일(일할 가능)', path: '모바일', timing: '익일', traffic: '100~120 유입' },
  { name: '소보루', type: '리워드', period: '10일(일할 가능)', path: '모바일', timing: '익일', traffic: '100~150 유입' },
  { name: '블렌딩', type: '리워드', period: '10일(일할 가능)', path: '모바일', timing: '익일', traffic: '150~200 유입' },
  { name: '미니', type: '복합플', period: '10일', path: '모바일', timing: '익일', traffic: '100 유입' },
  { name: '1219', type: '복합플', period: '10일', path: '모바일', timing: '익일', traffic: '100 유입' },
]

// Pain Points
const painPoints = [
  '좋은 상품인데 검색에 노출이 안 된다?',
  '광고비만 쓰고 순위는 제자리?',
  '경쟁 상품에 밀려 매출이 정체?',
  '신규 상품 런칭 후 초기 노출이 어렵다?',
  '리뷰가 없어서 구매 전환이 안 된다?',
]

// 3가지 솔루션
const solutions = [
  {
    title: '트래픽 부스트',
    subtitle: '유입 솔루션',
    icon: 'trending-up',
    color: 'from-blue-400 to-blue-600',
    features: [
      '상품 페이지 유입량 증가',
      '플랫폼 알고리즘이 "인기 상품"으로 인식',
      '자연 검색 순위 상승',
    ],
  },
  {
    title: '세일즈 액셀러레이터',
    subtitle: '가구매 서비스',
    icon: 'shopping-cart',
    color: 'from-purple-400 to-purple-600',
    features: [
      '실제 구매 전환 발생',
      '판매량 지표 상승 → 순위 부스트',
      '쿠팡 로켓배송/스토어 모두 지원',
    ],
  },
  {
    title: '리뷰 빌딩',
    subtitle: '리뷰 작업 서비스',
    icon: 'star',
    color: 'from-orange-400 to-orange-600',
    features: [
      '신뢰도 높은 리뷰 확보',
      '구매 전환율 상승',
      '쿠팡/스토어 모두 지원',
    ],
  },
]

// 진행 프로세스
const processSteps = [
  { step: 1, title: '문의', desc: '상품 URL 및 현황 공유' },
  { step: 2, title: '분석', desc: '카테고리/경쟁상품 분석, 적합 솔루션 추천' },
  { step: 3, title: '솔루션 선택', desc: '예산과 목표에 맞는 서비스 선택' },
  { step: 4, title: '서비스 시작', desc: '익일부터 솔루션 적용' },
  { step: 5, title: '모니터링', desc: '순위 변동 실시간 체크' },
  { step: 6, title: '리포트', desc: '트래픽/순위 변화 리포트 제공' },
]

// FAQ 데이터
const faqData = [
  {
    q: '트래픽 부스트란 무엇인가요?',
    a: '검색이나 카테고리를 통해 상품 페이지로 실제 방문자를 유입시키는 서비스입니다. 유입량 증가는 플랫폼 알고리즘에 반영되어 순위 상승으로 이어집니다.',
  },
  {
    q: '세일즈 액셀러레이터(가구매)는 어떻게 진행되나요?',
    a: '실제 결제가 이루어지며, 판매량 지표가 상승합니다. 신규 상품 런칭 시 초기 판매 실적 확보에 효과적입니다.',
  },
  {
    q: '리뷰 빌딩 서비스는 안전한가요?',
    a: '실구매 기반으로 진행되며, 자연스러운 리뷰를 확보합니다. 플랫폼 정책을 준수하여 안전하게 운영합니다.',
  },
  {
    q: '효과는 언제부터 나타나나요?',
    a: '트래픽 부스트는 익일부터 적용되며, 순위 변동은 보통 3-7일 내에 체감하실 수 있습니다.',
  },
  {
    q: '쿠팡/스토어 동시에 진행 가능한가요?',
    a: '네, 모든 서비스는 쿠팡과 스마트스토어 모두 지원합니다.',
  },
]

// 성과 데이터
const performanceData = [
  {
    platform: '쿠팡',
    company: 'L사',
    industry: '생활용품',
    period: '3개월',
    color: 'from-red-400 to-red-600',
    metrics: [
      { label: '카테고리 순위', before: '50위', after: '5위', growth: '45단계 상승' },
      { label: 'ROAS', before: '150%', after: '480%', growth: '3.2배' },
      { label: '월 매출', before: '800만', after: '6,400만', growth: '800%' },
    ],
  },
  {
    platform: '스마트스토어',
    company: 'H사',
    industry: '건강식품',
    period: '3개월',
    color: 'from-green-400 to-green-600',
    metrics: [
      { label: '일 방문자', before: '500명', after: '3,500명', growth: '600%' },
      { label: '리뷰 수', before: '50개', after: '527개', growth: '954%' },
      { label: '월 매출', before: '1,000만', after: '5,200만', growth: '520%' },
    ],
  },
]

function SpecSheet() {
  const [openFAQ, setOpenFAQ] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = '이커머스 랭킹 솔루션 | JD8'

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

  return (
    <div ref={sectionRef}>
      {/* 1. Hero 섹션 */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-purple-600 to-green-500 opacity-90" />
          <div className="pattern-dots absolute inset-0 opacity-20" />
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="text-white/90 text-sm font-medium">트래픽 부스트 | 구매 전환 | 리뷰 빌딩</span>
          </div>

          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white/20">
              <Icon name="rocket" className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            스마트스토어 & 쿠팡 랭킹 솔루션
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-8 leading-relaxed">
            쿠팡 & 스마트스토어 상품 순위를 전략적으로 끌어올리세요
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {['쿠팡 로켓배송 지원', '스마트스토어 지원', '익일 적용'].map((badge, index) => (
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
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 scroll-animate">
            <span className="badge-primary mb-4">WHY</span>
            <h2 className="section-title">
              이런 <span className="gradient-text">고민</span>이 있으신가요?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {painPoints.map((point, index) => (
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

      {/* 3. Solution - 3가지 핵심 솔루션 */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-animate">
            <span className="badge-primary mb-4">SOLUTION</span>
            <h2 className="section-title">
              <span className="gradient-text">3가지 핵심</span> 솔루션
            </h2>
            <p className="section-subtitle">
              순위 상승을 위한 통합 솔루션을 제공합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="scroll-animate group bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${solution.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon name={solution.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{solution.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{solution.subtitle}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                      <Icon name="check" className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 선순환 구조 다이어그램 */}
          <div className="scroll-animate max-w-4xl mx-auto bg-gradient-to-br from-primary-600 to-purple-700 rounded-3xl p-10 md:p-14 shadow-xl">
            <h3 className="text-center text-2xl md:text-3xl font-bold text-white mb-10">선순환 구조</h3>

            {/* 상단 플로우 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center mb-6">
              <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg border border-white/30 min-w-[140px]">
                <Icon name="trending-up" className="w-6 h-6 mx-auto mb-2" />
                트래픽 부스트
              </div>
              <div className="text-white/80 text-2xl font-bold">→</div>
              <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg border border-white/30 min-w-[140px]">
                <Icon name="bar-chart" className="w-6 h-6 mx-auto mb-2" />
                순위 상승
              </div>
              <div className="text-white/80 text-2xl font-bold">→</div>
              <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg border border-white/30 min-w-[140px]">
                <Icon name="eye" className="w-6 h-6 mx-auto mb-2" />
                노출 증가
              </div>
            </div>

            {/* 중앙 연결 화살표 */}
            <div className="flex justify-between items-center max-w-md mx-auto mb-6">
              <div className="text-white/80 text-2xl font-bold">↑</div>
              <div className="flex-1 border-t-2 border-dashed border-white/30 mx-4"></div>
              <div className="text-white/80 text-2xl font-bold">↓</div>
            </div>

            {/* 하단 플로우 */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
              <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg border border-white/30 min-w-[140px]">
                <Icon name="star" className="w-6 h-6 mx-auto mb-2" />
                리뷰 빌딩
              </div>
              <div className="text-white/80 text-2xl font-bold">←</div>
              <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg border border-white/30 min-w-[140px]">
                <Icon name="shopping-cart" className="w-6 h-6 mx-auto mb-2" />
                구매 증가
              </div>
              <div className="text-white/80 text-2xl font-bold">←</div>
              <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-4 rounded-xl font-bold text-lg shadow-lg border border-white/30 min-w-[180px]">
                <Icon name="rocket" className="w-6 h-6 mx-auto mb-2" />
                세일즈 액셀러레이터
              </div>
            </div>

            <p className="text-center text-white/70 mt-8 text-sm">
              모든 단계가 유기적으로 연결되어 지속적인 성장을 만들어냅니다
            </p>
          </div>
        </div>
      </section>

      {/* 4. 쿠팡 트래픽 부스트 */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 scroll-animate">
            <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="rocket" className="w-4 h-4" />
              COUPANG
            </span>
            <h2 className="section-title">
              쿠팡 <span className="text-red-500">트래픽 부스트</span>
            </h2>
            <p className="section-subtitle">
              쿠팡 로켓배송/로켓그로스 상품의 순위 상승을 위한 트래픽 솔루션
            </p>
          </div>

          {/* 특징 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 scroll-animate">
            {['안정적인 30일 트래픽 유입', '모바일 최적화', '익일 구동'].map((feature, index) => (
              <span key={index} className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm text-gray-700 shadow-soft">
                <Icon name="check" className="w-4 h-4 text-red-500" />
                {feature}
              </span>
            ))}
          </div>

          {/* 테이블 - 데스크톱 */}
          <div className="scroll-animate hidden md:block overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-medium">
              <thead>
                <tr className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">상품명</th>
                  <th className="px-6 py-4 text-left font-semibold">구분</th>
                  <th className="px-6 py-4 text-left font-semibold">기간</th>
                  <th className="px-6 py-4 text-left font-semibold">유입 경로</th>
                  <th className="px-6 py-4 text-left font-semibold">구동 일시</th>
                  <th className="px-6 py-4 text-left font-semibold">일일 트래픽</th>
                </tr>
              </thead>
              <tbody>
                {coupangProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-red-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">{product.type}</td>
                    <td className="px-6 py-4 text-gray-600">{product.period}</td>
                    <td className="px-6 py-4 text-gray-600">{product.path}</td>
                    <td className="px-6 py-4 text-gray-600">{product.timing}</td>
                    <td className="px-6 py-4">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        {product.traffic}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 카드 - 모바일 */}
          <div className="md:hidden space-y-4">
            {coupangProducts.map((product, index) => (
              <div key={index} className="scroll-animate bg-white rounded-xl p-4 shadow-soft border-l-4 border-red-500">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-gray-900">{product.name}</h4>
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.traffic}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-500">구분:</span> <span className="text-gray-700">{product.type}</span></div>
                  <div><span className="text-gray-500">기간:</span> <span className="text-gray-700">{product.period}</span></div>
                  <div><span className="text-gray-500">경로:</span> <span className="text-gray-700">{product.path}</span></div>
                  <div><span className="text-gray-500">구동:</span> <span className="text-gray-700">{product.timing}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 스토어 트래픽 부스트 */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12 scroll-animate">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="shopping-cart" className="w-4 h-4" />
              SMARTSTORE
            </span>
            <h2 className="section-title">
              스마트스토어 <span className="text-green-500">트래픽 부스트</span>
            </h2>
            <p className="section-subtitle">
              네이버 스마트스토어 상품의 검색 순위 상승을 위한 트래픽 솔루션
            </p>
          </div>

          {/* 특징 */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 scroll-animate">
            {['리워드 방식', '복합플 방식', '일할 가능'].map((feature, index) => (
              <span key={index} className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-700 shadow-soft">
                <Icon name="check" className="w-4 h-4 text-green-500" />
                {feature}
              </span>
            ))}
          </div>

          {/* 테이블 - 데스크톱 */}
          <div className="scroll-animate hidden md:block overflow-x-auto">
            <table className="w-full bg-white rounded-2xl overflow-hidden shadow-medium">
              <thead>
                <tr className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                  <th className="px-6 py-4 text-left font-semibold">브랜딩</th>
                  <th className="px-6 py-4 text-left font-semibold">구분</th>
                  <th className="px-6 py-4 text-left font-semibold">기간</th>
                  <th className="px-6 py-4 text-left font-semibold">유입 경로</th>
                  <th className="px-6 py-4 text-left font-semibold">구동 일시</th>
                  <th className="px-6 py-4 text-left font-semibold">일일 트래픽</th>
                </tr>
              </thead>
              <tbody>
                {storeProducts.map((product, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-green-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 text-gray-600">{product.type}</td>
                    <td className="px-6 py-4 text-gray-600">{product.period}</td>
                    <td className="px-6 py-4 text-gray-600">{product.path}</td>
                    <td className="px-6 py-4 text-gray-600">{product.timing}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {product.traffic}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 카드 - 모바일 */}
          <div className="md:hidden space-y-4">
            {storeProducts.map((product, index) => (
              <div key={index} className="scroll-animate bg-white rounded-xl p-4 shadow-soft border-l-4 border-green-500">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-gray-900">{product.name}</h4>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {product.traffic}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-500">구분:</span> <span className="text-gray-700">{product.type}</span></div>
                  <div><span className="text-gray-500">기간:</span> <span className="text-gray-700">{product.period}</span></div>
                  <div><span className="text-gray-500">경로:</span> <span className="text-gray-700">{product.path}</span></div>
                  <div><span className="text-gray-500">구동:</span> <span className="text-gray-700">{product.timing}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 세일즈 액셀러레이터 */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-animate bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl p-8 md:p-12 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Icon name="shopping-cart" className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">세일즈 액셀러레이터</h2>
                  <p className="text-white/80">가구매 서비스</p>
                </div>
              </div>

              <p className="text-white/90 text-lg mb-8">
                실제 구매 전환으로 판매량 지표를 높여 순위 상승을 가속화합니다
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="check-circle" className="w-5 h-5 text-green-300" />
                    지원 플랫폼
                  </h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• 쿠팡 (로켓배송/로켓그로스/일반)</li>
                    <li>• 스마트스토어</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="trending-up" className="w-5 h-5 text-green-300" />
                    주요 특징
                  </h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• 실제 결제 → 순위 알고리즘 반영</li>
                    <li>• 베스트셀러/인기 상품 노출</li>
                    <li>• 신규 상품 초기 부스트 효과</li>
                  </ul>
                </div>
              </div>

              <p className="text-center text-white/60 text-sm">
                * 상세 조건은 문의 시 안내드립니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 리뷰 빌딩 서비스 */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-animate bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl p-8 md:p-12 text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Icon name="star" className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold">리뷰 빌딩 서비스</h2>
                  <p className="text-white/80">리뷰 작업</p>
                </div>
              </div>

              <p className="text-white/90 text-lg mb-8">
                신뢰도 높은 리뷰 확보로 구매 전환율을 높이세요
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="check-circle" className="w-5 h-5 text-green-300" />
                    지원 플랫폼
                  </h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• 쿠팡 (로켓배송/일반)</li>
                    <li>• 스마트스토어</li>
                  </ul>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h4 className="font-bold mb-3 flex items-center gap-2">
                    <Icon name="clipboard-list" className="w-5 h-5 text-green-300" />
                    서비스 특징
                  </h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• 실구매 기반 자연스러운 리뷰</li>
                    <li>• 사진/텍스트 리뷰 선택 가능</li>
                    <li>• 리뷰 품질 가이드라인 준수</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Icon name="trending-up" className="w-5 h-5 text-green-300" />
                  기대 효과
                </h4>
                <ul className="space-y-2 text-white/80">
                  <li>• 리뷰 0개 → 첫 리뷰 확보로 구매 전환율 상승</li>
                  <li>• 경쟁 상품 대비 리뷰 수 우위 확보</li>
                </ul>
              </div>

              <p className="text-center text-white/60 text-sm">
                * 상세 조건은 문의 시 안내드립니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. 진행 프로세스 */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-animate">
            <span className="badge-primary mb-4">PROCESS</span>
            <h2 className="section-title">
              <span className="gradient-text">체계적인 6단계</span> 프로세스
            </h2>
          </div>

          {/* 데스크톱 - 가로 타임라인 */}
          <div className="hidden lg:block relative">
            <div className="absolute top-16 left-[8%] right-[8%] h-1 bg-gray-200 rounded-full">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '100%' }} />
            </div>

            <div className="grid grid-cols-6 gap-4">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="scroll-animate relative text-center group"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold relative z-10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.step}
                  </div>

                  <div className="bg-white rounded-xl p-4 group-hover:shadow-medium transition-all duration-300">
                    <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 모바일 - 세로 타임라인 */}
          <div className="lg:hidden relative">
            <div className="absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b from-blue-500 to-purple-500" />

            <div className="space-y-6">
              {processSteps.map((step, index) => (
                <div
                  key={index}
                  className="scroll-animate relative flex items-start gap-6"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold relative z-10 shadow-lg">
                    {step.step}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-4 hover:shadow-medium transition-all duration-300">
                    <h4 className="font-bold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. 기대 효과 */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 scroll-animate">
            <span className="badge-primary mb-4">PERFORMANCE</span>
            <h2 className="section-title">
              실제 <span className="gradient-text">성과 사례</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {performanceData.map((data, index) => (
              <div key={index} className="scroll-animate bg-white rounded-2xl shadow-medium overflow-hidden">
                <div className={`bg-gradient-to-r ${data.color} p-6`}>
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <span className="text-white/80 text-sm">{data.industry}</span>
                      <h4 className="text-xl font-bold">{data.company}</h4>
                    </div>
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      {data.period}
                    </span>
                  </div>
                  <div className="mt-2">
                    <span className="bg-white/30 px-2 py-1 rounded text-xs font-medium">{data.platform}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {data.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400 line-through text-sm">{metric.before}</span>
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <span className="font-bold text-gray-900">{metric.after}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${data.color} text-white`}>
                          {metric.growth}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12 scroll-animate">
            <span className="badge-primary mb-4">FAQ</span>
            <h2 className="section-title">
              자주 묻는 <span className="gradient-text">질문</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-2xl overflow-hidden scroll-animate shadow-soft">
            {faqData.map((item, index) => (
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

      {/* 11. CTA + 문의 폼 */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-green-600" />
        <div className="pattern-dots absolute inset-0 opacity-20" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/90 text-sm font-medium">지금 바로 시작하세요!</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            상품 순위를 끌어올리세요
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            무료 상담을 통해 최적의 솔루션을 찾아드립니다
          </p>
        </div>
      </section>

      {/* 문의 폼 */}
      <section id="inquiry-form" className="section-padding bg-gradient-to-b from-gray-50 to-white -mt-20 pt-32">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* 왼쪽: 문의 안내 */}
              <div className="lg:sticky lg:top-32 scroll-animate">
                <span className="badge-primary mb-4">CONTACT US</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  <span className="gradient-text">랭킹 솔루션</span> 관련<br />
                  문의하기
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  전문 컨설턴트가 귀사의 상황을 분석하고
                  맞춤형 솔루션을 제안해 드립니다.
                </p>

                {/* 보장 배지 */}
                <div className="flex flex-wrap gap-3">
                  {['빠른 응대', '무료 컨설팅', '맞춤 솔루션'].map((badge, index) => (
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
                <InquiryForm serviceType="이커머스 랭킹 솔루션" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SpecSheet
