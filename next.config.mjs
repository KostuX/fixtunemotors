/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@tanstack/react-virtual"],
  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;
