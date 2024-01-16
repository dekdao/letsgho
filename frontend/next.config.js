/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  swcMinify: false,
  reactStrictMode: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  }
  // async rewrites() {
  //   return [
  //     {
  //       source: "/__/auth/:path*",
  //       destination: `https://aicreatorhub-io.firebaseapp.com/__/auth/:path*`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
