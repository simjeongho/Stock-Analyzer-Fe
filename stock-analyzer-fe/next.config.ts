// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // API 요청을 백엔드 서버로 프록시(Proxy)하도록 설정합니다.
  async rewrites() {
    return [
      {
        // Next.js에서 /api/v1/으로 시작하는 모든 요청을
        source: "/api/v1/:path*",
        // Spring Boot 서버의 해당 경로로 전달합니다.
        destination: "http://localhost:8080/api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
