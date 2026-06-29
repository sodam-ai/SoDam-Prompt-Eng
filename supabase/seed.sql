-- SoDamPrompt — Level (사다리레벨) 씨드 데이터
-- 실행: supabase db reset 또는 직접 psql
-- Level은 정적 카탈로그 — Phase 1에서 수동 관리

INSERT INTO level (id, "order", name, badge, one_liner) VALUES
  ('lvl-1', 1, 'Prompt(시키기)',  '🟢 초급',   'AI에게 한 번 잘 시키기'),
  ('lvl-2', 2, 'Context(설명하기)', '🔵 중급', 'AI가 상황을 이해하게 설명하기'),
  ('lvl-3', 3, 'Role(역할주기)',  '🟠 중급+',  'AI에게 역할을 맡겨 결과 바꾸기'),
  ('lvl-4', 4, 'Chain(연결하기)', '🔴 고급',   '여러 AI 지시를 연결해 복잡한 일 하기'),
  ('lvl-5', 5, 'System(설계하기)', '🟣 마스터', 'AI 시스템을 설계하고 자동화하기')
ON CONFLICT (id) DO NOTHING;
