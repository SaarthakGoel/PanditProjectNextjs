/** @type {import('next').NextConfig} */

import nextPWA from 'next-pwa';

const nextConfig = {
  images: {
    domains: ['i.ytimg.com'],
  },
};

export default nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  // PWA-related settings go here
})(nextConfig); // Pass the nextConfig separately