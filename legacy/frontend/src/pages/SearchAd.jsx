import ServiceDetail from '../components/services/ServiceDetail'
import { services } from '../data/services'

function SearchAd() {
  const service = services.find((s) => s.id === 'search-ad')
  return <ServiceDetail service={service} />
}

export default SearchAd
