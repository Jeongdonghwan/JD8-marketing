import ServiceDetail from '../components/services/ServiceDetail'
import { services } from '../data/services'

function Review() {
  const service = services.find((s) => s.id === 'review')
  return <ServiceDetail service={service} />
}

export default Review
