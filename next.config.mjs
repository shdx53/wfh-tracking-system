// next.config.mjs
import { startCronJobs } from './app/lib/cronJobs.mjs';  // Import cron job starter function

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      startCronJobs();  // Start cron jobs when server initializes
    }
    return config;
  }
};

export default nextConfig;
