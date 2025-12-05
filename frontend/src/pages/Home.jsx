import { useEffect } from 'react'
import HeroBanner from '../components/home/HeroBanner'
import ServiceCards from '../components/home/ServiceCards'
import WhyUs from '../components/home/WhyUs'
import Process from '../components/home/Process'
import Partners from '../components/home/Partners'
import Testimonials from '../components/home/Testimonials'
import InquiryForm from '../components/common/InquiryForm'
import FloatingCTA from '../components/common/FloatingCTA'

function Home() {
  useEffect(() => {
    document.title = 'JD8 마케팅 | 스마트스토어, 쿠팡, 플레이스 마케팅 전문'

    // 메타 태그 업데이트
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', 'JD8 마케팅 대행사 - 스마트스토어, 쿠팡, 플레이스, 검색광고, 리뷰 마케팅 전문. 10년 경력 전문가가 직접 관리하는 맞춤형 마케팅 솔루션으로 매출 성장을 경험하세요.')
    }
  }, [])

  return (
    <div className="overflow-x-hidden">
      {/* 히어로 배너 */}
      <HeroBanner />

      {/* 파트너사 */}
      <Partners />

      {/* 서비스 소개 */}
      <ServiceCards />

      {/* 왜 JD8인가 */}
      <WhyUs />

      {/* 고객 후기 */}
      <Testimonials />

      {/* 진행 프로세스 */}
      <Process />

      {/* 문의 폼 섹션 */}
      <section id="inquiry-form" className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* 왼쪽: 문의 안내 */}
              <div className="lg:sticky lg:top-32">
                <span className="badge-primary mb-4">CONTACT US</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  <span className="gradient-text">무료 상담</span>으로<br />
                  시작하세요
                </h2>
                <p className="text-gray-600 mb-8 text-lg">
                  10년 경력의 마케팅 전문가가 귀사의 상황을 분석하고
                  맞춤형 마케팅 전략을 제안해 드립니다.
                </p>

                {/* 연락처 정보 */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">전화 문의</p>
                      <a href="tel:1566-3046" className="text-lg font-bold text-gray-900 hover:text-primary-600 transition-colors">
                        1566-3046
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">상담 가능 시간</p>
                      <p className="text-lg font-bold text-gray-900">평일 09:00 - 18:00</p>
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
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* 오른쪽: 문의 폼 */}
              <div className="bg-white rounded-2xl shadow-strong p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">문의하기</h3>
                  <p className="text-gray-600 text-sm">
                    아래 양식을 작성해 주시면 빠르게 연락드리겠습니다
                  </p>
                </div>
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 플로팅 CTA */}
      <FloatingCTA />
    </div>
  )
}

export default Home
