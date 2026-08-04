import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 allowedDevOrigins: ["192.168.1.67:3000", "192.168.1.67"],

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },

export default nextConfig;
