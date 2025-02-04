import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.devtool = 'source-map'; // Avoid 'eval-source-map'
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  reactStrictMode: true,
  env: {
    LOCATION_HQTRS_API_KEY: process.env.NEXT_PUBLIC_LOCATION_HQTRS_API_KEY,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/api/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
           {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000", // change in prod
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "true",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "Set-Cookie",
            value: "sessionId=abc123; HttpOnly; Secure; SameSite=Strict",
          },
          {
            key: "Permissions-Policy",
            value:
              "geolocation=(self), microphone=(), camera=(), interest-cohort=()",
          },
        ],
      },
      {
        source: "/sw.js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self'",
          },
        ],
      },
    ];
  },
};

const experimentalConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

// Validate required environment variables
const requiredEnvVars = ["NEXT_PUBLIC_LOCATION_HQTRS_API_KEY", "NEXT_PUBLIC_BASE_URL"];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is missing`);
  }
});

export default { ...nextConfig, ...experimentalConfig };
