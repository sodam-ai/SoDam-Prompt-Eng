-- SoDam-Prompt 초기 스키마
-- 02_DATA_MODEL.md 기준, 7테이블 + RLS 기본 deny + pg_cron 30일 삭제

-- ──────────────────────────────────────────────────────────
-- 1. Level (5단계 사다리 — 참조 테이블)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Level" (
  id        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_num smallint UNIQUE NOT NULL CHECK (order_num BETWEEN 1 AND 5),
  name      text NOT NULL,
  badge     text NOT NULL
);

ALTER TABLE "Level" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_level" ON "Level" FOR SELECT USING (true);

INSERT INTO "Level" (order_num, name, badge) VALUES
  (1, 'Prompt',  '🟢'),
  (2, 'Context', '🔵'),
  (3, 'Loop',    '🟡'),
  (4, 'Harness', '🔴'),
  (5, 'Agentic', '◆')
ON CONFLICT (order_num) DO NOTHING;

-- ──────────────────────────────────────────────────────────
-- 2. User (회원 — Supabase auth.users 연동)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "User" (
  id              uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  auth_provider   text NOT NULL DEFAULT 'google',
  birth_year      smallint NOT NULL,
  region_ok       boolean NOT NULL DEFAULT false,
  daily_run_count smallint NOT NULL DEFAULT 0,
  created_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_own_profile" ON "User"
  FOR ALL USING (auth.uid() = id);

-- ──────────────────────────────────────────────────────────
-- 3. Consent (동의)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Consent" (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  uuid NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  terms_agreed             boolean NOT NULL DEFAULT false,
  privacy_agreed           boolean NOT NULL DEFAULT false,
  overseas_transfer_agreed boolean NOT NULL DEFAULT false,
  consented_at             timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE "Consent" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_own_consent" ON "Consent"
  FOR ALL USING (auth.uid() = user_id);

-- ──────────────────────────────────────────────────────────
-- 4. Prompt (갤러리 항목)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Prompt" (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text NOT NULL,
  result_preview text,
  role           text NOT NULL,
  task_template  text NOT NULL,
  format         text NOT NULL,
  level_id       uuid REFERENCES "Level"(id),
  is_curated     boolean NOT NULL DEFAULT false,
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE "Prompt" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_prompt" ON "Prompt" FOR SELECT USING (true);

-- ──────────────────────────────────────────────────────────
-- 5. Variable (빈칸 정의)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Variable" (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id   uuid NOT NULL REFERENCES "Prompt"(id) ON DELETE CASCADE,
  label       text NOT NULL,
  placeholder text,
  required    boolean NOT NULL DEFAULT true,
  input_type  text NOT NULL DEFAULT 'text'
    CHECK (input_type IN ('text', 'textarea', 'select')),
  sort_order  smallint NOT NULL DEFAULT 0
);

ALTER TABLE "Variable" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_variable" ON "Variable" FOR SELECT USING (true);

-- ──────────────────────────────────────────────────────────
-- 6. Verification (검증 배지 — Phase 2 자동화)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Verification" (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id    uuid NOT NULL REFERENCES "Prompt"(id) ON DELETE CASCADE,
  status       text NOT NULL DEFAULT '정성'
    CHECK (status IN ('정성', '자동')),
  tested_model text,
  pass_rate    numeric(5, 2),
  tested_at    timestamptz
);

ALTER TABLE "Verification" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read_verification" ON "Verification"
  FOR SELECT USING (true);

-- ──────────────────────────────────────────────────────────
-- 7. Run (실행 기록 — 30일 자동삭제)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Run" (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id     uuid NOT NULL REFERENCES "Prompt"(id),
  user_id       uuid NOT NULL REFERENCES "User"(id),
  filled_input  jsonb NOT NULL DEFAULT '{}',
  output        text,
  safety_status text NOT NULL DEFAULT '통과'
    CHECK (safety_status IN ('통과', '차단')),
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE "Run" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_own_run" ON "Run"
  FOR ALL USING (auth.uid() = user_id);

-- ──────────────────────────────────────────────────────────
-- 8. Report (신고)
-- ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS "Report" (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id     uuid NOT NULL REFERENCES "Run"(id),
  user_id    uuid NOT NULL REFERENCES "User"(id),
  reason     text NOT NULL
    CHECK (reason IN ('유해함', '정상차단됨')),
  status     text NOT NULL DEFAULT '접수'
    CHECK (status IN ('접수', '완료')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE "Report" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "user_own_report" ON "Report"
  FOR ALL USING (auth.uid() = user_id);

-- ──────────────────────────────────────────────────────────
-- 일일 한도 원자적 증가 함수 (레이스 컨디션 방지)
-- ──────────────────────────────────────────────────────────
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
    FROM "User"
    WHERE id = p_user_id
    FOR UPDATE;

  IF v_count IS NULL THEN
    RETURN false;
  END IF;

  IF v_count >= p_limit THEN
    RETURN false;
  END IF;

  UPDATE "User"
    SET daily_run_count = daily_run_count + 1
    WHERE id = p_user_id;

  RETURN true;
END;
$$;

-- ──────────────────────────────────────────────────────────
-- pg_cron: 30일 자동삭제 (처리방침 의무)
-- 주의: Supabase 프로젝트에서 pg_cron 확장이 활성화돼 있어야 함
-- ──────────────────────────────────────────────────────────
SELECT cron.schedule(
  'delete-old-runs',
  '0 3 * * *',
  $$DELETE FROM "Run" WHERE created_at < now() - interval '30 days'$$
);
