import ServiceDetail from '../components/services/ServiceDetail'
import { services } from '../data/services'

function SmartStore() {
  const service = services.find((s) => s.id === 'smartstore')
  return <ServiceDetail service={service} />
}

export default SmartStore
