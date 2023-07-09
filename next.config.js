require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "./",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    openAiApiKey: process.env.OPENAI_API_KEY,
    stabilityAiApiKey: process.env.STABILITY_API_KEY,
  },
};

module.exports = nextConfig;
