export function getApiUrl(endpoint: string): string {
  const devUrl = process.env.DEV_URL || 'http://localhost:3000'
  const prodUrl = process.env.PROD_URL
  const baseUrl = process.env.NODE_ENV === 'development' ? devUrl : prodUrl
  return `${baseUrl}${endpoint}`
}
