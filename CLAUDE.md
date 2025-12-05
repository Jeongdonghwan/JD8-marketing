# JD8 마케팅 대행사 웹사이트

## 프로젝트 개요
JD8(제이디에잇)은 온라인 마케팅 대행 서비스를 제공하는 회사 웹사이트입니다.
회원가입/로그인 없이 서비스 소개와 문의 기능만 제공하는 심플한 구조입니다.

## 기술 스택

### Backend
- **Framework**: Flask (Python 3.11+)
- **Database**: SQLite (문의 저장용)
- **ORM**: SQLAlchemy
- **API**: RESTful JSON API

### Frontend
- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Animation**: Framer Motion (선택)

## 프로젝트 구조

```
jd8/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask 앱 팩토리
│   │   ├── config.py            # 설정
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── inquiry.py       # 문의 모델
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── inquiry.py       # 문의 API
│   │   └── utils/
│   │       └── __init__.py
│   ├── requirements.txt
│   ├── run.py                   # 실행 파일
│   └── instance/
│       └── jd8.db               # SQLite DB
│
├── frontend/
│   ├── public/
│   │   ├── images/              # 배너, 로고 등
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.jsx       # 네비게이션
│   │   │   │   ├── Footer.jsx       # 푸터
│   │   │   │   ├── Logo.jsx         # SVG 로고
│   │   │   │   └── InquiryForm.jsx  # 문의 폼
│   │   │   ├── home/
│   │   │   │   ├── HeroBanner.jsx   # 메인 배너
│   │   │   │   ├── ServiceCards.jsx # 서비스 카드 그리드
│   │   │   │   ├── WhyUs.jsx        # 왜 JD8인가
│   │   │   │   └── Process.jsx      # 진행 프로세스
│   │   │   └── services/
│   │   │       └── ServiceDetail.jsx # 서비스 상세 템플릿
│   │   ├── pages/
│   │   │   ├── Home.jsx             # 메인 페이지
│   │   │   ├── SmartStore.jsx       # 스마트스토어 마케팅
│   │   │   ├── Coupang.jsx          # 쿠팡 마케팅
│   │   │   ├── Place.jsx            # 플레이스 마케팅
│   │   │   ├── SearchAd.jsx         # 검색광고 마케팅
│   │   │   ├── Review.jsx           # 리뷰 마케팅
│   │   │   └── Inquiry.jsx          # 문의하기 (선택)
│   │   ├── hooks/
│   │   │   └── useInquiry.js        # 문의 제출 훅
│   │   ├── services/
│   │   │   └── api.js               # API 호출
│   │   ├── data/
│   │   │   └── services.js          # 서비스 정보 데이터
│   │   ├── styles/
│   │   │   └── index.css            # Tailwind + 커스텀 스타일
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── CLAUDE.md
```

## 페이지 구성

### 1. 메인 페이지 (/)
- **Hero Banner**: 풀스크린 배너, 슬로건, CTA 버튼
- **Service Cards**: 5개 서비스 카드 그리드 (클릭 시 상세 페이지 이동)
- **Why JD8**: 왜 JD8을 선택해야 하는지 (비교 섹션)
- **Process**: 진행 프로세스 (6단계)
- **Inquiry Form**: 간단 문의 폼
- **Footer**: 회사 정보

### 2. 서비스 상세 페이지
각 서비스별 URL:
- `/smartstore` - 스마트스토어 마케팅
- `/coupang` - 쿠팡 마케팅
- `/place` - 플레이스 마케팅
- `/search-ad` - 검색광고 마케팅
- `/review` - 리뷰 마케팅

각 페이지 구성:
- Hero 섹션 (서비스 타이틀 + 설명)
- 서비스 특징/장점
- 진행 방식
- 문의 폼

## 디자인 가이드

### 컬러 팔레트 (블루 계열)
```css
:root {
  /* Primary - Deep Blue */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-300: #93c5fd;
  --primary-400: #60a5fa;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  --primary-800: #1e40af;
  --primary-900: #1e3a8a;
  
  /* Accent - Cyan */
  --accent-400: #22d3ee;
  --accent-500: #06b6d4;
  --accent-600: #0891b2;
  
  /* Neutral */
  --gray-50: #f8fafc;
  --gray-100: #f1f5f9;
  --gray-200: #e2e8f0;
  --gray-700: #334155;
  --gray-800: #1e293b;
  --gray-900: #0f172a;
}
```

### 타이포그래피
- **한글**: Pretendard (메인), Noto Sans KR (백업)
- **영문**: Poppins (타이틀), Inter (본문)
- **폰트 사이즈**: Tailwind 기본 스케일 사용

### 로고
- 텍스트 로고: "JD8" 또는 "제이디에잇"
- SVG로 제작, 블루 그라데이션 적용

## API 엔드포인트

### 문의 API
```
POST /api/inquiry
Content-Type: application/json

Request:
{
  "name": "홍길동",
  "phone": "010-1234-5678",
  "message": "스마트스토어 마케팅 문의드립니다."
}

Response (201):
{
  "success": true,
  "message": "문의가 접수되었습니다.",
  "inquiry_id": 1
}
```

### 문의 목록 (관리용)
```
GET /api/inquiry
Authorization: (추후 관리자 기능 추가 시)

Response:
{
  "inquiries": [
    {
      "id": 1,
      "name": "홍길동",
      "phone": "010-1234-5678",
      "message": "...",
      "created_at": "2024-01-01T12:00:00"
    }
  ]
}
```

## DB 스키마

### inquiries 테이블
```sql
CREATE TABLE inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    service_type VARCHAR(50),  -- 어떤 서비스 페이지에서 문의했는지
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE
);
```

## 개발 실행 방법

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
# http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# http://localhost:5173
```

### 프로덕션 빌드
```bash
cd frontend
npm run build
# dist/ 폴더를 backend/static에 복사하거나 별도 서빙
```

## 주요 구현 사항

### 1. 반응형 디자인
- Mobile First 접근
- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)

### 2. 애니메이션
- 스크롤 시 fade-in 효과
- 카드 hover 시 scale + shadow
- 페이지 전환 애니메이션

### 3. SEO
- 각 페이지 적절한 title, meta description
- Open Graph 태그
- 시맨틱 HTML

### 4. 성능
- 이미지 lazy loading
- 코드 스플리팅 (React.lazy)
- Vite 빌드 최적화

## 참고 사이트
- https://keywordsolution.co.kr/ (전체 구조)
- https://keywordsolution.co.kr/smartstore/ (서비스 페이지)
- https://keywordsolution.co.kr/an-experience-group/ (체험단 페이지)

## 푸터 정보
(추후 입력 예정)
- 회사명
- 대표자
- 사업자등록번호
- 주소
- 연락처
- 이메일
