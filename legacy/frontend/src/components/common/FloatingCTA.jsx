import { useState, useEffect } from 'react'

function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 스크롤이 300px 이상이면 표시
      setIsVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToInquiry = () => {
    const inquirySection = document.getElementById('inquiry-form')
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' })
    }
    setIsExpanded(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* 확장 메뉴 */}
      {isExpanded && (
        <div className="flex flex-col gap-2 animate-fade-in-up">
          {/* 카카오톡 */}
          <a
            href="https://pf.kakao.com/_Izxnxgn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-strong hover:shadow-glow transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.58 2 11c0 2.84 1.82 5.33 4.55 6.77l-.93 3.46c-.08.29.24.52.5.36l4.09-2.69c.6.08 1.2.1 1.79.1 5.5 0 10-3.58 10-8s-4.5-8-10-8z"/>
              </svg>
            </div>
            <span className="font-medium text-gray-700 group-hover:text-yellow-600 transition-colors">카카오톡 상담</span>
          </a>

          {/* 문의하기 */}
          <button
            onClick={scrollToInquiry}
            className="flex items-center gap-3 bg-white px-4 py-3 rounded-full shadow-strong hover:shadow-glow transition-all duration-300 group"
          >
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="font-medium text-gray-700 group-hover:text-primary-600 transition-colors">문의하기</span>
          </button>
        </div>
      )}

      {/* 메인 버튼 그룹 */}
      <div className="flex items-center gap-3">
        {/* 맨 위로 버튼 */}
        <button
          onClick={scrollToTop}
          className="w-12 h-12 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="맨 위로"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* 상담 버튼 */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
            isExpanded
              ? 'bg-gray-700 hover:bg-gray-800'
              : 'bg-gradient-to-br from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
          }`}
          aria-label="상담하기"
        >
          {/* 펄스 효과 */}
          {!isExpanded && (
            <span className="absolute inset-0 rounded-full bg-primary-500 animate-ping opacity-25" />
          )}

          {isExpanded ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {/* 라벨 */}
      {!isExpanded && (
        <div className="absolute -top-8 right-0 bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap animate-bounce-soft">
          무료 상담 받기
          <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-900 transform rotate-45" />
        </div>
      )}
    </div>
  )
}

export default FloatingCTA
