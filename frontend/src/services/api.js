// Google Sheets Web App URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyRPunmDuOBhbaZqiUoiepOB9hUkB7w5i9j3ygh48uHfD7IMRdWmjg8JVoFZzKNTUJe/exec'

// 문의 제출 - Google Sheets로 전송 (GET 방식)
export const submitInquiry = async (data) => {
  const params = new URLSearchParams({
    name: data.name,
    phone: data.phone,
    message: data.message,
    service_type: data.service_type || '',
    page_url: window.location.href
  })

  // 이미지 태그로 GET 요청 (CORS 우회)
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({ success: true, message: '문의가 접수되었습니다.' })
    img.onerror = () => resolve({ success: true, message: '문의가 접수되었습니다.' })
    img.src = `${GOOGLE_SHEETS_URL}?${params.toString()}`
  })
}

// 문의 목록 조회 (관리용) - Google Sheets에서는 사용하지 않음
export const getInquiries = async () => {
  console.warn('getInquiries는 Google Sheets 모드에서 지원되지 않습니다.')
  return { inquiries: [] }
}
