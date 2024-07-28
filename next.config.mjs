/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["w7.pngwing.com", "jvcqjrheljztbgffxgck.supabase.co"],
  },
};

export default nextConfig;
