/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  async redirects () {
    return [
      {
        source: '/',
        destination: '/character',
        permanent: true,
      },
    ]
  }
}

export default nextConfig
