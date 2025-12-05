import { useState } from 'react'
import { submitInquiry } from '../services/api'

export function useInquiry() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const submit = async (formData) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await submitInquiry(formData)
      setSuccess(true)
      return true
    } catch (err) {
      const message = err.response?.data?.message || '문의 접수에 실패했습니다. 다시 시도해주세요.'
      setError(message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setError(null)
    setSuccess(false)
  }

  return { submit, loading, error, success, reset }
}
