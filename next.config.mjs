/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep dev and production artifacts separate. This prevents `next build`
  // from invalidating chunks while the development server is running.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
}

export default nextConfig
