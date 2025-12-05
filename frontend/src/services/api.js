import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// 문의 제출
export const submitInquiry = async (data) => {
  const response = await api.post('/inquiry', data)
  return response.data
}

// 문의 목록 조회 (관리용)
export const getInquiries = async () => {
  const response = await api.get('/inquiry')
  return response.data
}

export default api
