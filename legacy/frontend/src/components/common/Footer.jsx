import { Link } from 'react-router-dom'
import Logo from './Logo'
import { services } from '../../data/services'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 회사 정보 */}
          <div>
            <Logo className="text-white mb-4" />
            <p className="text-sm text-gray-400 mb-4">
              온라인 마케팅 전문 대행사<br />
              JD8과 함께 성장하세요.
            </p>
            <div className="text-sm space-y-1">
              <p>전화: 1566-3046</p>
              <p>이메일: jdhwan227@naver.com</p>
            </div>
          </div>

          {/* 서비스 링크 */}
          <div>
            <h4 className="text-white font-semibold mb-4">서비스</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    to={service.path}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 상세 정보 */}
          <div>
            <h4 className="text-white font-semibold mb-4">회사 정보</h4>
            <ul className="text-sm space-y-2 text-gray-400">
              <li>상호: 주식회사 제이디에이치</li>
              <li>사업자등록번호: 503-87-03619</li>
              <li>주소: 경기도 용인시 기흥구 금화로 3, 제이 20호</li>
            </ul>
          </div>
        </div>

        {/* 저작권 */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} JD8. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
