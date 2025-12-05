import { useEffect, useRef, useState } from 'react'
import { processSteps } from '../../data/services'
import { Icon } from '../icons'

function Process() {
  const sectionRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

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

  // 자동 슬라이드 효과
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50 overflow-hidden" ref={sectionRef}>
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16">
          <span className="badge-primary mb-4">PROCESS</span>
          <h2 className="section-title">
            <span className="gradient-text">체계적인 프로세스</span>로<br className="sm:hidden" /> 성공을 만들어갑니다
          </h2>
          <p className="section-subtitle">
            6단계 전문 프로세스로 귀사의 마케팅 성공을 책임집니다
          </p>
        </div>

        {/* 데스크톱 - 가로 타임라인 */}
        <div className="hidden lg:block relative">
          {/* 진행 바 배경 */}
          <div className="absolute top-20 left-[8%] right-[8%] h-1 bg-gray-200 rounded-full">
            {/* 진행 중인 바 */}
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-500"
              style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-6 gap-4">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className={`scroll-animate relative text-center cursor-pointer group`}
                style={{ transitionDelay: `${index * 0.1}s` }}
                onClick={() => setActiveStep(index)}
              >
                {/* 스텝 번호 */}
                <div
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-lg font-bold relative z-10 transition-all duration-500 ${
                    index <= activeStep
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg scale-110'
                      : 'bg-white border-2 border-gray-200 text-gray-400 group-hover:border-primary-300 group-hover:text-primary-500'
                  }`}
                >
                  <span className="relative">
                    {index < activeStep ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.step
                    )}
                  </span>
                </div>

                {/* 아이콘 */}
                <div className={`flex justify-center mb-3 transition-all duration-300 ${
                  index === activeStep ? 'scale-110' : 'group-hover:scale-105'
                }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    index <= activeStep ? 'bg-primary-100' : 'bg-gray-100 group-hover:bg-primary-50'
                  }`}>
                    <Icon
                      name={step.icon}
                      className={`w-6 h-6 transition-colors ${
                        index <= activeStep ? 'text-primary-600' : 'text-gray-400 group-hover:text-primary-500'
                      }`}
                    />
                  </div>
                </div>

                {/* 제목 */}
                <h3 className={`font-bold mb-2 transition-colors ${
                  index <= activeStep ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-700'
                }`}>
                  {step.title}
                </h3>

                {/* 설명 */}
                <p className={`text-sm transition-all duration-300 ${
                  index === activeStep ? 'text-gray-600 opacity-100' : 'text-gray-400 opacity-70'
                }`}>
                  {step.description}
                </p>

                {/* 활성 상태 표시 */}
                {index === activeStep && (
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>

          {/* 프로그레스 인디케이터 */}
          <div className="flex justify-center gap-2 mt-12">
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeStep
                    ? 'w-8 bg-primary-500'
                    : 'bg-gray-300 hover:bg-primary-300'
                }`}
                aria-label={`Step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* 모바일/태블릿 - 세로 타임라인 */}
        <div className="lg:hidden relative">
          {/* 연결선 */}
          <div className="absolute top-0 bottom-0 left-8 w-0.5 bg-gradient-to-b from-primary-500 via-primary-400 to-gray-200" />

          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <div
                key={index}
                className="scroll-animate relative flex items-start gap-6"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* 스텝 번호 */}
                <div
                  className={`w-16 h-16 flex-shrink-0 rounded-2xl flex items-center justify-center font-bold text-lg relative z-10 transition-all duration-300 ${
                    index <= activeStep
                      ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                  }`}
                >
                  {index < activeStep ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    step.step
                  )}
                </div>

                {/* 콘텐츠 카드 */}
                <div className={`flex-1 bg-white p-6 rounded-2xl shadow-soft border transition-all duration-300 ${
                  index === activeStep ? 'border-primary-200 shadow-medium' : 'border-gray-100'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      index <= activeStep ? 'bg-primary-100' : 'bg-gray-100'
                    }`}>
                      <Icon
                        name={step.icon}
                        className={`w-5 h-5 ${
                          index <= activeStep ? 'text-primary-600' : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <h3 className="font-bold text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16 scroll-animate">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center bg-gradient-to-r from-primary-50 to-accent-50 px-8 py-6 rounded-2xl">
            <div className="text-center sm:text-left">
              <p className="text-gray-900 font-bold text-lg mb-1">지금 바로 시작하세요!</p>
              <p className="text-gray-600 text-sm">무료 상담으로 맞춤 전략을 받아보세요</p>
            </div>
            <a
              href="#inquiry-form"
              className="btn-primary whitespace-nowrap"
            >
              무료 상담 신청
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
