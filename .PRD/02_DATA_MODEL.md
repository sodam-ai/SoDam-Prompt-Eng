# SoDam Prompt (소담 프롬프트) — 파일 구조 (플러그인 전용)

> **방향 전환 반영: 2026-06-29**
> 플러그인 전용 전환으로 DB(User/Run/Consent 등) 불필요. 이 문서는 SKILL.md 파일 구조와 표준을 정의합니다.
>
> 원래 DB 스키마(7테이블 RLS 구조)는 웹앱(Next.js+Supabase) 방향에 속하며 **폐기됨**.

---

## 저장소 파일 구조

```
SoDam-Prompt-Eng/
├── skills/                          ← 핵심 산출물
│   ├── book-report-helper/
│   │   └── SKILL.md
│   ├── polite-message/
│   │   └── SKILL.md
│   ├── long-text-summary/
│   │   └── SKILL.md
│   ├── explain-simply/
│   │   └── SKILL.md
│   ├── study-planner/
│   │   └── SKILL.md
│   ├── self-intro-polish/
│   │   └── SKILL.md
│   ├── sns-caption/
│   │   └── SKILL.md
│   ├── natural-english/
│   │   └── SKILL.md
│   ├── presentation-script/
│   │   └── SKILL.md
│   ├── request-apology-message/
│   │   └── SKILL.md
│   └── skill-maker/                 ← 11번째: 새 스킬을 대화로 만드는 메타 스킬 (시드 10개와 별개)
│       └── SKILL.md
├── commands/                        ← 스킬 11개와 1:1 복사본 (/sodam-prompt:<스킬> 슬래시 형식용, description만 있는 frontmatter)
├── .claude-plugin/
│   ├── plugin.json                  ← 플러그인 정보 (현재 v0.2.0)
│   └── marketplace.json             ← 마켓 등록 정보
├── scripts/
│   └── verify-skills.mjs            ← 스킬 형식 자동 점검 (11 스킬 = 11 명령 일치, 위험 패턴, argument-hint 따옴표)
├── promptfooconfig.yaml             ← 로컬 전용 품질 평가 설정 (한 번도 실행 안 됨 — CHECKPOINT 9차 갱신 참조)
├── promptfoo-skill-prompt.js        ← 위 설정이 SKILL.md를 읽는 로더
├── README.md · README_EN.md         ← 설치 안내 (한/영, 왕초보용)
├── README.html · README_EN.html     ← 위 두 문서를 브라우저용으로 변환한 것 (직접 수정 금지, README.md에서 재생성)
├── CONTRIBUTING.md                  ← 기여 안내 (새 스킬 형식·점검 방법)
├── AGENTS.md · CLAUDE.md            ← AI 작업 지침
├── P4_검수_가이드.md · PROMPTFOO_로컬_가이드.md  ← 사람 검수 절차 · 로컬 평가 절차
├── .github/PULL_REQUEST_TEMPLATE.md ← PR 양식
├── LICENSE                          ← Apache-2.0
├── NOTICE                           ← Apache-2.0 의무 공지
├── .gitignore                       ← .env* + Next.js 잔재 제외
├── AUDIT.log                        ← 의사결정 이벤트 스트림
└── .PRD/                            ← 설계 문서 (참고용)
    ├── README.md
    ├── CHECKPOINT.md                ← 마일스톤 추적 (정본, 루트에서 이동)
    ├── 01_PRD.md
    ├── 02_DATA_MODEL.md             ← 이 파일
    ├── 03_PHASES.md
    ├── 04_PROJECT_SPEC.md
    ├── 05_MARKETPLACE_PLUGIN.md
    ├── 06_SEED_PROMPTS.md
    └── RESEARCH_SOURCES.md
```

---

## SKILL.md 표준 구조

각 스킬은 `skills/<이름>/SKILL.md` 에 위치합니다.

### frontmatter 필드

| 필드 | 필수 | 설명 | 예시 |
|------|------|------|------|
| `name` | 권장 | 도구 식별자 (kebab-case) | `book-report-helper` |
| `description` | 필수 | 한 줄 설명 + 언제 사용하는지 | "책 제목·느낀 점을 주면 독후감을 써준다. '독후감 써줘' 일 때." |
| `argument-hint` | 권장 | 빈칸 설명 (초보 안내용) | `[책 제목] [느낀 점]` |

### 본문 구조

```markdown
---
name: 스킬-이름
description: 설명. "트리거 표현" 일 때 사용.
argument-hint: "[빈칸1] [빈칸2]"
---

당신은 [역할]입니다.

[할 일 + $1, $2 변수]

## 규칙
- 규칙 1
- 규칙 2
```

### 변수 치환

| 변수 | 의미 | 사용법 |
|------|------|--------|
| `$1` | 첫 번째 인자 (argument-hint의 첫 빈칸) | 본문 어디서나 |
| `$2` | 두 번째 인자 | 본문 어디서나 |
| `$ARGUMENTS` | 인자 전체 (한 덩어리) | 단순 1개 입력 시 |

---

## 스킬 목록 (MVP 시드 10개 + 메타 스킬 1개 = 현재 11개)

| # | 폴더명 | 빈칸 | 출력형식 |
|---|--------|------|----------|
| 1 | book-report-helper (독후감-도우미) | 책 제목 · 느낀 점 | 3문단 |
| 2 | polite-message (정중한-메시지) | 받는 사람 · 용건 | 제목+3~5문장 |
| 3 | long-text-summary (긴글-3줄요약) | 요약할 글 | 핵심 3줄 (•) |
| 4 | explain-simply (쉽게-설명해줘) | 개념 · 듣는 사람 나이 | 비유+3문장 |
| 5 | study-planner (공부-계획표) | 과목/목표 · 기간 | 요일별 표 |
| 6 | self-intro-polish (자기소개-다듬기) | 소개 메모 · 용도 | 완성 3~4문장 |
| 7 | sns-caption (sns-캡션) | 상황 · 분위기 | 캡션 2개 + 해시태그 5개 |
| 8 | natural-english (영어-자연스럽게) | 한국어 문장 | 영어 + 이유 설명 |
| 9 | presentation-script (발표-대본) | 주제 · 발표 시간 | 도입-본론-마무리 |
| 10 | request-apology-message (부탁-사과-메시지) | 상황 · 상대 | 정중/친근 2가지 버전 |
| (11) | skill-maker (스킬-만들기, **시드 아님·메타 스킬**) | 만들고 싶은 스킬 한 줄 설명 | 완성된 SKILL.md 내용 (2026-07-27 추가, 사람 검수 대상 10개에는 미포함) |

---

## 안전 원칙 (모든 스킬 공통)

- **순수 텍스트** — 셸 명령(`!cmd`)·MCP 훅·코드 실행 없음 → 무코드 배지 적용 가능
- **개인정보 유도 없음** — 이름·전화·주소·계좌 입력 유도 금지
- **연령 적합** — 만 14세 이상, 의료·법률·금융·자해·성인 주제 제외
- **출처 표기** — 시드 참고 자료(dair-ai MIT·Anthropic 라이브러리 구조 참고)는 본문 자체 작성 + 출처 표기

---

## 검증 체크 (P4 사람 검수 기준)

각 SKILL.md에 대해 Claude Haiku 4.5에서 직접 실행:

- [x] `/이름 값1 값2` 호출 시 결과 생성됨 (2026-07-13~14, 10/10 실행테스트 완료)
- [x] 출력 형식이 명세(`06_SEED_PROMPTS.md`)와 일치 (10/10 확인)
- [x] 개인정보 유도 없음 (10개 전부 문구 확인 + 공격 테스트 방어 성공)
- [x] 위험·민감 주제 없음 (10개 전부 확인, 0건)
- [x] `description` 자연어 트리거로 자동 매칭됨 — 2026-07-15 사용자 본인 사용으로 확인(Claude.ai 앱, 세부 기록 없음) + 2026-07-17 독립된 새 Claude Code 세션에서 10/10 실측(상세 기록 있음). Codex는 자연어 자동 매칭 미확인(2026-11-27에 `book-report-helper` 직접 호출 1회만 확인), Cursor·Gemini CLI는 미확인(README 2장 "도구별 확인 현황" 표 참조)

---

## 결정 확정 (2026-06-29)

- [x] DB 없음 — 플러그인 전용, 사용자 AI 도구가 실행 담당
- [x] 서버 없음 — 운영 비용 $0
- [x] SKILL.md 표준 — Claude Code·Codex·Claude.ai 앱 공통 포맷 (※ "공통 포맷으로 설계했다"는 뜻이며, 실제 작동 확인은 도구별로 다름 — 위 검증 체크 참조)
- [x] P4 사람 검수 — 2026-07-15 완료, 10개 실작동 확인(개인 용도 실사용 검증)
