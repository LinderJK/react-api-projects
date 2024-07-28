/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/character/?page=1',

        permanent: true,
      },
    ]
  }
}

export default nextConfig
