import { useState } from 'react'
import { useInquiry } from '../../hooks/useInquiry'
import { CheckCircleIcon } from '../icons'

function InquiryForm({ serviceType = '' }) {
  const { submit, loading, error, success, reset } = useInquiry()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '')
    if (value.length > 11) value = value.slice(0, 11)

    // 자동 하이픈 추가
    if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3')
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2')
    }

    setFormData((prev) => ({ ...prev, phone: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const result = await submit({
      ...formData,
      service_type: serviceType
    })

    if (result) {
      setFormData({ name: '', phone: '', message: '' })
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 rounded-xl p-8 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="w-16 h-16 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          문의가 접수되었습니다!
        </h3>
        <p className="text-green-600 mb-6">
          빠른 시일 내에 연락드리겠습니다.
        </p>
        <button
          onClick={reset}
          className="btn-primary"
        >
          새 문의하기
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="홍길동"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          연락처 <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handlePhoneChange}
          required
          placeholder="010-1234-5678"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          문의 내용 <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          placeholder="문의하실 내용을 입력해주세요."
          className="input-field resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            접수 중...
          </span>
        ) : (
          '문의하기'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center">
        문의 접수 후 영업일 기준 1일 이내 연락드립니다.
      </p>
    </form>
  )
}

export default InquiryForm
