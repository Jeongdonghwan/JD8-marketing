import ServiceDetail from '../components/services/ServiceDetail'
import { services } from '../data/services'

function Coupang() {
  const service = services.find((s) => s.id === 'coupang')
  return <ServiceDetail service={service} />
}

export default Coupang
