import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// 비로그인 시 401 JSON 반환할 API 경로
const PROTECTED_API_PATHS = ['/api/run', '/api/refine', '/api/report', '/api/export']
// 지역 차단을 건너뛸 경로 (인증 플로우 자체는 허용)
const GEO_BYPASS_PATHS = ['/login', '/auth/', '/blocked-region', '/terms', '/privacy', '/gate']

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 세션 갱신 + 사용자 서버 검증 (getUser만 — getSession 금지)
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // 1. 지역 차단: KR 외 접근 차단 (PRD SEC-B)
  //    Vercel Fluid Compute는 x-vercel-ip-country 헤더로 국가 코드를 제공한다.
  //    로컬 개발은 DEV_GEO_COUNTRY 환경변수로 폴백 (기본값 'KR').
  const country =
    request.headers.get('x-vercel-ip-country') ??
    process.env.DEV_GEO_COUNTRY ??
    'KR'
  const isGeoBypassed = GEO_BYPASS_PATHS.some(p => pathname.startsWith(p))

  if (country !== 'KR' && !isGeoBypassed) {
    return NextResponse.redirect(new URL('/blocked-region', request.url))
  }

  // 2. 보호 API: 비로그인 → 401 JSON (리다이렉트 아님)
  if (PROTECTED_API_PATHS.some(p => pathname.startsWith(p)) && !user) {
    return new NextResponse(
      JSON.stringify({ error: 'unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
