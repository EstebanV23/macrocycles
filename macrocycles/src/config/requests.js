const requests = {
  production: 'https://macro-backend.up.railway.app/api',
  development: 'https://macro-backend.up.railway.app/api'
}

const env = process.env.NODE_ENV || 'development'
export const API_URL = requests[env]
