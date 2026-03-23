/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    // Required for static export — optimization happens at runtime via CDN
    unoptimized: true,
  },
};

export default nextConfig;
