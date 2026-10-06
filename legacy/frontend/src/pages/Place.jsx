import ServiceDetail from '../components/services/ServiceDetail'
import { services } from '../data/services'

function Place() {
  const service = services.find((s) => s.id === 'place')
  return <ServiceDetail service={service} />
}

export default Place
