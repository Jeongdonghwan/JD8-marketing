import ServiceDetail from '../components/services/ServiceDetail'
import { services } from '../data/services'

function MetaAd() {
  const service = services.find((s) => s.id === 'meta-ad')
  return <ServiceDetail service={service} />
}

export default MetaAd
