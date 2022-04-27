/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/bibtex-normalizer' : '',
};

module.exports = nextConfig;
