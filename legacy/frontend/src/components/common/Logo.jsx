import { Link } from 'react-router-dom'

function Logo({ className = '', size = 'default' }) {
  const sizeClasses = {
    small: 'text-xl',
    default: 'text-2xl',
    large: 'text-3xl'
  }

  return (
    <Link to="/" className={`font-heading font-bold ${sizeClasses[size]} ${className}`}>
      <span className="gradient-text">JD8</span>
    </Link>
  )
}

export default Logo
