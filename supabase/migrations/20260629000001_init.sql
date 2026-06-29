-- SoDamPrompt — MVP 초기 스키마 (M2)
-- 테이블: level, prompt, variable, verification, profiles(user), consent, run, report
-- RLS: 기본 deny-all / 공개 카탈로그 anon 읽기 / 사용자 자기 데이터만 / service_role 우회
-- PRD: 02_DATA_MODEL.md, 04_PROJECT_SPEC.md §RLS 필수 (출시 차단 기준)

-- ── 확장 ─────────────────────────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Level (사다리레벨) — 공개 카탈로그, 수동 입력 ─────────────────────────
CREATE TABLE level (
  id        TEXT     PRIMARY KEY,
  "order"   SMALLINT NOT NULL CHECK ("order" BETWEEN 1 AND 10),
  name      TEXT     NOT NULL,
  badge     TEXT     NOT NULL,
  one_liner TEXT     NOT NULL
);

-- ── Prompt — 공개 카탈로그 ──────────────────────────────────────────────
CREATE TABLE prompt (
  id             TEXT        PRIMARY KEY,
  title          TEXT        NOT NULL,
  result_preview TEXT        NOT NULL,  -- 비로그인 미리보기 샘플
  role           TEXT        NOT NULL,  -- 3요소 ①
  task_template  TEXT        NOT NULL,  -- {빈칸} 포함
  format         TEXT        NOT NULL,  -- 3요소 ③
  advanced       JSONB,                 -- 고급 5요소 (선택)
  level_id       TEXT        REFERENCES level(id),
  is_curated     BOOLEAN     NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Variable (빈칸) ──────────────────────────────────────────────────────
CREATE TABLE variable (
  id          TEXT    PRIMARY KEY,
  prompt_id   TEXT    NOT NULL REFERENCES prompt(id) ON DELETE CASCADE,
  label       TEXT    NOT NULL,        -- "책 제목"
  placeholder TEXT    NOT NULL,        -- "예: 어린 왕자"
  required    BOOLEAN NOT NULL DEFAULT true,
  input_type  TEXT    NOT NULL DEFAULT 'text'
    CHECK (input_type IN ('text', 'chip'))  -- voice는 Phase 2
);

-- ── Verification (검증결과·배지) ─────────────────────────────────────────
-- MVP: status='사람이검수함' 만 사용. tested_model/pass_rate는 Phase 2.
-- 숫자 pass_rate는 promptfoo 자동화 전까지 노출 금지 (PRD §허위신뢰 방지)
CREATE TABLE verification (
  id           TEXT        PRIMARY KEY,
  prompt_id    TEXT        NOT NULL REFERENCES prompt(id) ON DELETE CASCADE,
  status       TEXT        NOT NULL DEFAULT '사람이검수함',
  tested_model TEXT,
  pass_rate    SMALLINT    CHECK (pass_rate BETWEEN 0 AND 100),
  tested_at    TIMESTAMPTZ
);

-- ── profiles (User — auth.users 확장) ───────────────────────────────────
-- Supabase auth.users가 기본 인증 처리. 이 테이블은 앱 전용 필드 확장.
-- birth_year: 만 14세 미만 가입 차단은 앱 레이어에서 검증 (M4 구현)
-- region_ok: 한국 지역 확인 (M4 구현)
CREATE TABLE profiles (
  id              UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  auth_provider   TEXT        NOT NULL DEFAULT 'google',
  nickname        TEXT,
  birth_year      SMALLINT    NOT NULL CHECK (birth_year BETWEEN 1900 AND 2100),
  region_ok       BOOLEAN     NOT NULL DEFAULT false,
  daily_run_count SMALLINT    NOT NULL DEFAULT 0 CHECK (daily_run_count >= 0),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Consent (동의 — 로그인 시 1회) ─────────────────────────────────────
-- 14세 미만 차단으로 보호자 동의 엔티티는 MVP 없음 (Phase 3 글로벌 확장 시 도입)
CREATE TABLE consent (
  id                       UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id                  UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  terms_agreed             BOOLEAN     NOT NULL,
  privacy_agreed           BOOLEAN     NOT NULL,
  overseas_transfer_agreed BOOLEAN     NOT NULL,  -- 미국 AI 국외이전 동의
  consented_at             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)  -- 사용자당 1개
);

-- ── Run (실행기록 — 로그인 사용자만) ────────────────────────────────────
-- 30일 후 자동삭제 (처리방침 동기화). 삭제 job은 M5(Edge Function) 구현.
-- INSERT는 서버(service_role) api/run 엔드포인트가 처리 (RLS 우회)
CREATE TABLE run (
  id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  prompt_id     TEXT        NOT NULL REFERENCES prompt(id),
  user_id       UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  filled_input  JSONB       NOT NULL DEFAULT '{}',
  output        TEXT        NOT NULL,
  safety_status TEXT        NOT NULL DEFAULT '통과'
    CHECK (safety_status IN ('통과', '차단')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Report (신고) ────────────────────────────────────────────────────────
CREATE TABLE report (
  id         UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  run_id     UUID        NOT NULL REFERENCES run(id) ON DELETE CASCADE,
  user_id    UUID        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reason     TEXT        NOT NULL,
  status     TEXT        NOT NULL DEFAULT '접수'
    CHECK (status IN ('접수', '처리완료')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── 인덱스 ──────────────────────────────────────────────────────────────
CREATE INDEX idx_variable_prompt_id     ON variable(prompt_id);
CREATE INDEX idx_verification_prompt_id ON verification(prompt_id);
CREATE INDEX idx_run_prompt_id          ON run(prompt_id);
CREATE INDEX idx_run_user_id            ON run(user_id);
CREATE INDEX idx_run_created_at         ON run(created_at);  -- 30일 자동삭제용
CREATE INDEX idx_report_run_id          ON report(run_id);
CREATE INDEX idx_report_user_id         ON report(user_id);
CREATE INDEX idx_consent_user_id        ON consent(user_id);

-- ── RLS (Row Level Security) ─────────────────────────────────────────────
-- 원칙: 기본 deny-all + 서비스 레이어는 service_role(RLS 우회)로 처리
--       사용자는 자기 데이터만, 공개 카탈로그는 anon 포함 전체 읽기
ALTER TABLE level        ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompt       ENABLE ROW LEVEL SECURITY;
ALTER TABLE variable     ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent      ENABLE ROW LEVEL SECURITY;
ALTER TABLE run          ENABLE ROW LEVEL SECURITY;
ALTER TABLE report       ENABLE ROW LEVEL SECURITY;

-- 공개 카탈로그: anon 포함 전체 읽기 (비로그인 미리보기 지원)
CREATE POLICY "level_public_read"
  ON level FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "prompt_public_read"
  ON prompt FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "variable_public_read"
  ON variable FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "verification_public_read"
  ON verification FOR SELECT TO anon, authenticated USING (true);

-- profiles: 자기 행만 읽기·생성·수정 (인증 필수)
CREATE POLICY "profiles_self_select"
  ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "profiles_self_insert"
  ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_self_update"
  ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- consent: 자기 동의만 읽기·생성
CREATE POLICY "consent_self_select"
  ON consent FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "consent_self_insert"
  ON consent FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- run: 자기 실행기록만 읽기 (INSERT는 service_role api/run 엔드포인트)
CREATE POLICY "run_self_select"
  ON run FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- report: 자기 신고만 읽기·생성
CREATE POLICY "report_self_select"
  ON report FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "report_self_insert"
  ON report FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- ── 일일 한도 원자적 증가 함수 (레이스 컨디션 방지) ─────────────────────
-- FOR UPDATE 행 잠금 → 동시 요청이 한도를 초과하지 못하게 보장
-- SECURITY DEFINER + search_path 고정 = 스키마 인젝션 방지
CREATE OR REPLACE FUNCTION increment_daily_run(p_user_id uuid, p_limit int)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count int;
BEGIN
  SELECT daily_run_count INTO v_count
    FROM profiles
    WHERE id = p_user_id
    FOR UPDATE;

  IF v_count IS NULL THEN
    RETURN false;
  END IF;

  IF v_count >= p_limit THEN
    RETURN false;
  END IF;

  UPDATE profiles
    SET daily_run_count = daily_run_count + 1
    WHERE id = p_user_id;

  RETURN true;
END;
$$;

-- ── pg_cron: 30일 자동삭제 (처리방침 의무) ──────────────────────────────
-- 선결조건: Supabase 대시보드 → Database → Extensions → pg_cron 활성화
-- idx_run_created_at 인덱스로 대용량 테이블도 효율적으로 처리
SELECT cron.schedule(
  'delete-old-runs',
  '0 3 * * *',
  $$DELETE FROM run WHERE created_at < now() - interval '30 days'$$
);

-- ── 참고 ─────────────────────────────────────────────────────────────────
-- service_role(SUPABASE_SERVICE_ROLE_KEY)은 RLS를 우회함.
-- api/run: run INSERT → service_role 사용 (M5 구현)
-- 모더레이션, 신고 처리, 30일 자동삭제 → pg_cron (위 잡) + service_role (M5/M6)
