import type { NextConfig } from "next";

const securityHeaders = [
  // HTTPS 강제 (1년)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  // MIME 타입 스니핑 방지
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // 클릭재킹 방지
  { key: 'X-Frame-Options', value: 'DENY' },
  // 참조 정보 최소화
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // 불필요한 브라우저 기능 비활성화
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  // CSP: report-only 모드 (Tailwind 인라인 스타일 충돌 확인 후 M15에서 enforce 전환)
  {
    key: 'Content-Security-Policy-Report-Only',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.anthropic.com",
      "frame-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
    ].join('; '),
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig;
