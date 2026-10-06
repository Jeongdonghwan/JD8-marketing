import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Header from './components/common/Header'
import Footer from './components/common/Footer'

// 코드 스플리팅
const Home = lazy(() => import('./pages/Home'))
const SmartStore = lazy(() => import('./pages/SmartStore'))
const Coupang = lazy(() => import('./pages/Coupang'))
const Place = lazy(() => import('./pages/Place'))
const SearchAd = lazy(() => import('./pages/SearchAd'))
const Review = lazy(() => import('./pages/Review'))
const MetaAd = lazy(() => import('./pages/MetaAd'))
const SpecSheet = lazy(() => import('./pages/SpecSheet'))

// 로딩 스피너
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/smartstore" element={<SmartStore />} />
            <Route path="/coupang" element={<Coupang />} />
            <Route path="/place" element={<Place />} />
            <Route path="/search-ad" element={<SearchAd />} />
            <Route path="/review" element={<Review />} />
            <Route path="/meta-ad" element={<MetaAd />} />
            <Route path="/spec-sheet" element={<SpecSheet />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
