# SoDam Prompt — 작업 방향 (CHECKPOINT)

> 작성: 2026-06-28 · 갱신: 2026-06-29
> 근거: `.PRD/` 8개 문서 전수 정독 + 2개 독립 적대적 리뷰(보안·법무·비용 / 시니어 엔지니어, maker≠checker) + 6엔진 디렉토리 스캔
> 목적: Phase 1 MVP를 **핵심 누락·치명 오류 없이** 만들기 위한 권장 빌드 순서 + 리스크 선검토.
> 상태 표기: pending | in-progress | done | blocked · 작업 종류: **[코드]** / **[설정·결정]** / **[사람·콘텐츠]**

---

## 0. 현재 상태 (확인됨)
- 구현 경로에는 `.PRD/` 폴더뿐 — **소스코드 0, git 저장소 아님 = 완전 그린필드.**
- PRD 8문서는 내부 정합·요구 반영 검증 완료(직전 세션). 단, 아래 §1의 **설계 문구 5건은 구현 전 수정/확정 필요**.

---

## 1. 🚪 구현 전 반드시 닫을 게이트 (코드보다 먼저)
> 이걸 안 닫고 코드부터 짜면, 만든 뒤에 갈아엎어야 한다. 전부 "결정" 또는 "PRD 한 줄 수정"으로 닫힌다.

| # | 게이트 | 왜 치명 | 권장 결정 | 상태 |
|---|--------|---------|-----------|------|
| **G1** | **RLS ↔ service_role 모순** | service_role은 RLS를 **우회**. 사용자 데이터를 service_role로 일괄 처리 시 RLS 한 번도 작동 안 함 → IDOR 전량 유출. | **✅ 확정**: 사용자 데이터 읽기/쓰기는 **@supabase/ssr(anon key + JWT 쿠키 세션)** 경유. service_role은 모더레이션 후 Run 기록·pg_cron 삭제 등 최소 승격만. | **done** |
| **G2** | **프로젝트 라이선스 미정** | 미정 = 저작권 디폴트로 타인 사용 불가 → 출시 Blocker. | **✅ 확정**: **Apache-2.0** (6개 SoDam 엔진 전부 동일 — 스캔으로 확인됨). NOTICE 파일 생성 의무 포함. | **done** |
| **G3** | **"한국 한정" 차단 메커니즘** | 법적 단순화(GDPR/COPPA 회피)가 지오펜스에 의존. | **구현 내장** (M4): **Vercel Middleware geo KR 외 차단** + region_ok는 서버가 판정한 값. | **done** |
| **G4** | **스트리밍 ↔ 모더레이션 충돌** | Vercel AI SDK 기본은 토큰 스트리밍 → 원문이 이미 노출된 뒤라 안전 불변식 붕괴. | **구현 내장** (M5): `api/run` = **비스트리밍**(전체 생성→모더레이션→반환). | **done** |
| **G5** | **온보딩 순서 / 30일 삭제** | OAuth 먼저 성공하면 아동 PII 먼저 수집 꼴. 30일 삭제는 Postgres 기본 TTL 없음. | **구현 내장** (M2·M4): OAuth→인터스티셜→User 영속 생성 순서 + **pg_cron** 30일 삭제 스케줄. | **done** |

> **모든 게이트 해소됨 → M0 착수 가능.**

---

## 2. ⚠️ 리스크 레지스터 (선검토, 가장 심각한 것 먼저)
| ID | 심각도 | 리스크 | 완화 (어느 마일스톤에서) |
|----|--------|--------|--------------------------|
| R1 | ✅ 완화 | RLS↔service_role 모순 | G1 CLOSED + M2 RLS 단위테스트 + "타인 run_id=403" CI Blocker |
| R2 | 🔴 | 연령·지역 자기신고 미검증 → PIPA/COPPA/GDPR 회피 전제 붕괴 | 코드로 못 닫음 → **C-4 변호사 질의서 항목화** + 유해차단 연령무관 상시 |
| R3 | ✅ 완화 | "한국 한정" 미명세 | G3 done — M4 Vercel Middleware geo |
| R4 | 🟡 | 미성년 동의 유효성·국외이전 (라이선스는 해소됨) | G2 done(Apache-2.0) + 변호사 검토(M15) 잔존 |
| R_NEW | 🟡 | Apache-2.0 의존성 라이선스 비호환 | M15 `npx license-checker --onlyAllow Apache-2.0;MIT;ISC;...` |
| R5 | 🟡 | 일일 한도 레이스 컨디션 + MVP 실시간 전역 비용상한 부재 + 봇 | M5 **원자적 카운트** + 간이 전역 비용 카운터 + 신규계정 첫날 한도↓ |
| R6 | 🟡 | "유해 0건" KPI는 검증 불가(운영 함정), 한국어 금칙어 FN | KPI를 "검출·차단·신고 루프 + 사후검토 SLA"로 현실화. Report→사람 검토 큐 |
| R7 | 🟡 | 키 노출 경로: AI SDK provider를 클라 경계로 import | M5 **`server-only` import 강제** + gitleaks/번들 grep CI |
| R8 | 🟡 | 1인 운영 신고 SLA(야간 방치) + KPI측정↔데이터최소화 긴장 | Report 발생 시 알림 자동화, 익명 세션 집계로 KPI 근사 |
| R9 | 🟢 | 6~8주 솔로 일정 + strict CSP 마찰 | CSP report-only→strict 단계 전환, 문서화 일정 버퍼 |

---

## 3. 🧱 권장 빌드 순서 (M0–M15) — done-when 검증 포함
> 임계 경로: **M0→M2→M4→M5→M6→M8→M9→M15**. M1·M7·M11·M12는 병렬.

| M | 산출물 | done-when (테스트 가능) | 핵심 함정 | 종류 | 상태 |
|---|--------|--------------------------|-----------|------|------|
| **M0** | 레포 부트스트랩·git init·`.gitignore(.env*)`·`.env.example`·`LICENSE`(Apache-2.0 전문)·`NOTICE`·폴더골격 | `build && tsc --noEmit` 0에러 · `git ls-files`에 `.env.local` **0건** · LICENSE+NOTICE 존재 | `NEXT_PUBLIC_` 오용 금지 / NOTICE 누락 시 Apache-2.0 의무 위반 | [코드] | **done** ✅ a7e6048 |
| **M1** | 라이선스 확정·약관/처리방침/면책 확정본·**모더레이션 정책표**(1393 등) | `LICENSE` 존재 · 정책표가 M6 코드화 가능 수준 | 임의 법적 보장 문구 금지 | [설정·결정·콘텐츠] | blocked(G2) |
| **M2** | 스키마 **7테이블**(Level·User·Consent·Prompt·Variable·Verification·Run·Report) + **전 테이블 RLS 기본 deny** + pg_cron 30일삭제 + `increment_daily_run` 원자함수 | anon으로 타인 `Run` SELECT→0행 · **B가 A의 run_id 조회→거부** · pg_cron job 등록 확인 | `Run` 정책 한 줄 누락=전량 유출 / `getSession()` 사용 금지(`getUser()` 강제) | [코드] | **in-progress** — SQL 파일 완성, Supabase 프로젝트 생성 후 적용 필요 |
| **M3** | Anthropic Console 예산($50)+80%알림 · Haiku4.5·max_tokens 800·한도10 고정 | Console 한도·알림 활성 · env 값 적용 | 코드가드(M5)와 **별개 최후 안전망** | [설정·결정] | pending |
| **M4** | 구글OAuth + @supabase/ssr 쿠키 + 14세 + 한국 게이트 | 토큰 **localStorage 없음**(쿠키만) · 14세미만/한국외 차단 · 미인증 api/run→401 | ssr 서버/클라/미들웨어 3패턴·`getUser`(검증) 사용 | [코드] | blocked(G3) |
| **M5** | `api/run`: 키 서버격리·Zod 빈칸검증·max_tokens·타임아웃·per-user 한도 | 번들/응답 grep **키 0건** · `' OR 1=1--`·`<script>` 유출0 · 11번째→한도초과(서버) · 클라끊김 시 업스트림 abort | 한도 클라카운트/자유입력 금지·구분자 래핑 | [코드] | pending |
| **M6** | 출력 모더레이션(한국어 금칙어+위험주제 가드+자해→1393), 통과해야 반환 | 미통과 원문이 **네트워크 응답에 0** · 위험입력→차단+1393 | 표시 후 가리기/클라검사 금지 → 서버 통과 후 전송 | [코드] | pending |
| **M7** | 갤러리 + 비로그인 미리보기(정적 result_preview) | 로그아웃으로 갤러리·미리보기 OK · **비로그인 실행 경로 없음** | 미리보기 실시간 생성=비로그인 실행 붕괴 → 정적 샘플만 | [코드] | pending |
| **M8** | 빈칸 3칸 카드 + 실행 + 1클릭 복사 | 자유 textarea 없음(빈칸만) · 직접 친 글자 ≤20자 경로 · 복사 동작 · M6 통과분만 표시 | 빈칸→자유입력 전환 유혹 차단(인젝션 1위) | [코드] | pending |
| **M9** | 다듬기 칩(한도 공유) + 유해 신고 1탭 | 다듬기도 10회에 포함 · 신고→Report(본인만, RLS) · 타인 run_id 신고→거부 | 다듬기 별도 카운트=한도 우회 | [코드] | pending |
| **M10** | 5상태 카피 + 상시 AI 면책 배너 + WCAG AA + 375px | 5상태 트리거·카피 표시 · **에러에 스택/경로 0** · 키보드만으로 완주 | prod 에러에 내부정보 노출 금지 | [코드·콘텐츠] | pending |
| **M11** | 보안헤더(CSP nonce strict/HSTS 등 6종) + CORS 동일출처 | 헤더 6종 존재 · cross-origin api/run 거부 · `<script>` 실행0 | nonce CSP↔Next/shadcn 인라인 충돌 → 단계 완화, `unsafe-inline` 전체개방 금지 | [코드] | pending |
| **M12** | 검증 프롬프트 10개 자체작성+안전검수+**result_preview 실생성**+적재 | 10개 Haiku4.5 작동 · preview가 **실제 출력**(가짜 아님) · DB 시드 | 가짜 preview=허위 신뢰 배지(KPI 위반)·pass_rate 비노출 | [사람·콘텐츠] | pending |
| **M13** | SKILL.md 무코드 ZIP 내보내기(정적) | 유효 SKILL.md ZIP→Claude앱 업로드 동작 · 순수텍스트(무코드) | 사용자 입력값 미포함(개인정보·셸 금지) | [코드] | pending |
| **M14** | README/가이드(DOC-A~E, **구현 완료 후**) | 코드-문서 일치(미구현="예정") · 초보 첫성공 가능 · 라이선스 문구 일관 | 구현 중 작성=문서-코드 불일치 → 완료 후 작성 | [사람·콘텐츠] | pending |
| **M15** | 출시 Blocker 8종 수용테스트 + 배포 + 변호사 검토 | 8 Blocker green · `npm audit` 0 · `gitleaks` 0 · **휴대폰서 RLS·첫성공 재확인** · 변호사 완료 | 로컬 green인데 prod env 누락/키 혼용으로 깨짐 → prod 재검증 | [검증·사람] | pending |

---

## 4. ✅ 출시 차단(Blocker) 8종 — M15 최종 게이트 (03_PHASES)
1. RLS 작동(기본 deny + 서버만) — 타인 입력/결과 열람 0건
2. AI·서비스롤 키 클라이언트 비노출(번들·네트워크 검사)
3. 로그인 게이트 + 14세 이상 + 한국 한정 작동
4. 서버 max_tokens 강제(기본 800) + Haiku 4.5
5. Console 예산 한도 + per-user 한도 + 80% 알림
6. 출력 모더레이션(Claude 거부 + 한국어 보조 + 위험주제 가드) 작동
7. 자유 입력 불가, 빈칸만 입력
8. 약관·처리방침·AI 면책 배너 + 신고 경로 작동

---

## 5. 다음 행동 (갱신 2026-06-29)

**모든 게이트 해소됨. M0 착수 가능.**

1. **새 세션에서 M0 착수** (컨텍스트 청결 — CLAUDE.md 원칙). 첫 마일스톤 시작 시 `AUDIT.log` 생성.
2. **M0 첫 명령어:**
   ```
   cd D:\AI_Dev_Work\2026y\26y_06m_28d_SoDam-Prompt-Eng
   git init
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   npx shadcn@latest init
   npm install @supabase/supabase-js @supabase/ssr ai @ai-sdk/anthropic zod server-only
   ```
3. **인간 작업 (병렬 진행):** C-4 변호사 검토 예약 · 10개 result_preview Haiku 실생성 준비 · 약관·처리방침 확정본 작성.

## 6. 6-Engine 시너지 아키텍처 (2026-06-29 추가)

> 6개 SoDam 엔진 전부 Apache-2.0 통일 확인(스캔). Prompt = 5단계 사다리 입문 입구.

### 5단계 사다리 (RESEARCH_SOURCES §9)
```
Prompt (★1 무코드) → Context → Loop → Harness → Agentic  +  Reverse(병렬)
     ↑
     가장 쉬운 첫 번째 문 — 웹 마켓에서 발견 → 빈칸 → 결과 → 다음 엔진으로
```

### 시너지 구현 포인트 (코드로 만들 것)

| 위치 | 구현 내용 |
|------|-----------|
| M0 `NOTICE` | Apache-2.0 의무 (6엔진 동일) |
| M10 결과 화면 | `"다음 단계: SoDam-Context 엔진 →"` 한 줄 |
| M13 내보내기 | Harness·Context·Agentic·Codex·Cursor 전부 읽는 **동일 SKILL.md 형식** |
| GitHub | `sodam-ai/sodam-prompt` (다른 엔진과 동일 org) |

### 경계 (스코프 크리프 방지)
- Prompt MVP는 Context·Loop·Harness 기능 포함 안 함
- 공유 = 표준(SKILL.md 형식)·철학(안전)·라이선스(Apache-2.0) 레벨만
- 각 엔진 독립 배포 — Prompt 설치가 다른 엔진 강제 안 함
