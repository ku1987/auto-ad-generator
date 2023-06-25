require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    openAiApiKey: process.env.OPENAI_API_KEY,
  },
};

module.exports = nextConfig;
