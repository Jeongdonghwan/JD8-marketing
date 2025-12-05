import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { services } from '../../data/services'
import { Icon } from '../icons'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
  }, [location])

  const scrollToInquiry = () => {
    const inquirySection = document.getElementById('inquiry-form')
    if (inquirySection) {
      inquirySection.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/#inquiry-form'
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* 로고 */}
          <Logo />

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                location.pathname === '/'
                  ? 'text-primary-600'
                  : 'text-gray-700 hover:text-primary-600'
              }`}
            >
              메인
            </Link>

            {/* 서비스 드롭다운 */}
            <div
              className="relative"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className="font-medium text-gray-700 hover:text-primary-600 transition-colors flex items-center gap-1">
                서비스
                <svg
                  className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
              <>
                {/* 투명 브릿지 - 버튼과 드롭다운 사이 간격 채움 */}
                <div className="absolute top-full left-0 w-full h-3" />

                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-2 animate-fade-in">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={service.path}
                      className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                        location.pathname === service.path
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                      }`}
                    >
                      <Icon name={service.icon} className="w-4 h-4" />
                      {service.title}
                    </Link>
                  ))}
                </div>
              </>
              )}
            </div>

            <button
              onClick={scrollToInquiry}
              className="btn-primary"
            >
              문의하기
            </button>
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <nav className="px-4 py-4 space-y-2">
            <Link
              to="/"
              className={`block py-2 font-medium ${
                location.pathname === '/' ? 'text-primary-600' : 'text-gray-700'
              }`}
            >
              메인
            </Link>

            <div className="py-2">
              <p className="font-medium text-gray-500 mb-2">서비스</p>
              <div className="pl-4 space-y-2">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    to={service.path}
                    className={`flex items-center gap-2 py-1 ${
                      location.pathname === service.path
                        ? 'text-primary-600'
                        : 'text-gray-600'
                    }`}
                  >
                    <Icon name={service.icon} className="w-4 h-4" />
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToInquiry}
              className="w-full btn-primary mt-4"
            >
              문의하기
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
