import { useEffect, useRef } from 'react'

function Partners() {
  const sectionRef = useRef(null)

  // 마케팅 플랫폼 목록
  const platforms = [
    { name: '네이버', color: 'bg-green-500' },
    { name: '스마트스토어', color: 'bg-green-600' },
    { name: '쿠팡', color: 'bg-red-500' },
    { name: '카카오', color: 'bg-yellow-400' },
    { name: 'Google Ads', color: 'bg-blue-500' },
    { name: 'Meta', color: 'bg-blue-600' },
    { name: '당근마켓', color: 'bg-orange-500' },
    { name: '오늘의집', color: 'bg-sky-500' },
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

  return (
    <section className="py-16 bg-white overflow-hidden" ref={sectionRef}>
      <div className="container-custom">
        {/* 섹션 헤더 */}
        <div className="text-center mb-12 scroll-animate">
          <span className="badge-primary mb-4">PLATFORMS</span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            다양한 마케팅 플랫폼의 광고를 책임집니다
          </h2>
          <p className="text-gray-600">
            주요 온라인 플랫폼에서 최적의 광고 성과를 만들어드립니다
          </p>
        </div>

        {/* 플랫폼 로고 롤링 */}
        <div className="relative mb-12">
          {/* 왼쪽 그라데이션 */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          {/* 오른쪽 그라데이션 */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="marquee-container">
            <div className="marquee-content">
              {[...platforms, ...platforms].map((platform, index) => (
                <div
                  key={index}
                  className="inline-flex items-center mx-8 group"
                >
                  <div className={`w-16 h-16 ${platform.color} rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-white font-bold text-xl">{platform.name.charAt(0)}</span>
                  </div>
                  <span className="ml-3 font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                    {platform.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 통계 배너 */}
        <div className="scroll-animate">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: '500+', label: '협력 기업' },
              { number: '1,000+', label: '성공 캠페인' },
              { number: '50억+', label: '총 광고 집행액' },
              { number: '8개', label: '운영 플랫폼' },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-primary-50 to-white rounded-xl border border-primary-100"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partners
