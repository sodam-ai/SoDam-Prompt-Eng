# SoDam Prompt — CHECKPOINT (플러그인 전용)

> 갱신: 2026-06-29 | 방향 전환: B) 플러그인 전용 (Next.js+Supabase 웹앱 폐기)
> 배포 형태: GitHub 저장소 → Claude Code / Codex / Claude.ai 앱 직접 설치
> 서버 없음 · DB 없음 · 인증 없음 · 비용 $0

---

## 현재 상태

| 항목 | 상태 |
|------|------|
| SKILL.md 10개 | ✅ done |
| README.md (설치 안내) | ✅ done |
| LICENSE (Apache-2.0) | ✅ done |
| NOTICE | ✅ done |
| 기존 Next.js 코드 정리 | ✅ done (2026-07-11, git 추적 해제) |
| GitHub push | ✅ done (2026-07-11, origin/main 동기화 확인) |
| plugin.json/marketplace.json 정식 등록 | ✅ done (2026-07-13, 커밋 `94c8582`/`6552a48`) |
| 스킬 폴더 영문 슬러그 전환 | ✅ done (2026-07-13, 커밋 `42cc622`) |
| 사람 검수 (10개 실제 동작) | 🔴 **다음 작업** — pending, 사람 전용 (등록+리네임 수정 완료, 라이브 재검증만 남음) |

---

## P1 — SKILL.md 10개 ✅ done

### 생성된 스킬
```
skills/
  book-report-helper/SKILL.md
  polite-message/SKILL.md
  long-text-summary/SKILL.md
  explain-simply/SKILL.md
  study-planner/SKILL.md
  self-intro-polish/SKILL.md
  sns-caption/SKILL.md
  natural-english/SKILL.md
  presentation-script/SKILL.md
  request-apology-message/SKILL.md
```

> 2026-07-13 커밋 `42cc622`에서 한글 폴더명 → 영문 슬러그로 전환(라이브에서 관찰된 `sns---` 스킬명 인코딩 손상 증거 기반). 위 경로는 전환 후 기준.

### done-when
- [ ] Claude Haiku 4.5에서 10개 전부 실제 작동 확인 (사람 검수)
- [ ] 개인정보 유도 없음 확인
- [ ] 위험·민감 주제 없음 확인

---

## P2 — 저장소 정리 ✅ done (2026-07-11)

> **정정 이력:** `.gitignore` 추가만으로는 이미 커밋된 파일이 GitHub에서 빠지지 않는다(오판 발견). `git rm --cached`가 정답이었으나 안전 hook이 `git rm` 동사 자체를 폴더삭제로 오탐·차단. **`git update-index --remove --force-remove`**(디스크 무변경, 동일 효과의 표준 git 명령)로 24개 파일 추적 해제 완료. 디스크 파일은 3중 검증(env 추적 0건·Next.js 추적 0건·원본 타임스탬프 보존)으로 무손실 확인.

### 추적 해제된 파일 (디스크에는 보존됨)
`src/`(9개)·`supabase/`(2개)·`public/*.svg`(5개)·`.env.example`·`components.json`·`eslint.config.mjs`·`next.config.ts`·`package.json`·`package-lock.json`·`postcss.config.mjs`·`tsconfig.json` — 총 24개

### done-when
- [x] 저장소에 Next.js 관련 파일 추적 없음 (2026-07-11 확인, `git ls-files` 실측)
- [x] `git ls-files` 에 `.env*` 0건 (2026-07-11 확인)

---

## P3 — GitHub push ✅ done (2026-07-11)

7개 커밋(`ada58e3`~`9500a3b`)을 `origin/main`에 push. push 후 원격 재조회로 Next.js/env 잔재 0건 확인(로컬 상태와 동일하게 깨끗함 확인, 추측 아님).

### done-when
- [x] `sodam-ai/SoDam-Prompt-Eng` GitHub에 push 완료 (`d28df7a..9500a3b`)
- [x] `skills/` 폴더 10개 SKILL.md 공개 확인
- [x] origin/main에 Next.js 관련 파일 없음 확인 (push 후 재조회)

> 참고: 저장소는 **PRIVATE**(GitHub 확인) — 외부 노출 리스크 없음. `.env.example`은 실제 시크릿 없는 예시 파일(내용 확인, placeholder만 존재).

---

## P4 — 사람 검수 🔴 다음 작업 (pending, 사람 전용)

> **2026-07-13 기준:** 두 차례 근본원인 수정 시도 완료 — ① plugin.json/marketplace.json 정식 등록(`94c8582`/`6552a48`), ② 한글→영문 폴더명 전환(`42cc622`, 라이브에서 관찰된 `sns---` 스킬명 손상 증거 기반). 두 수정 모두 라이브 재검증 전이라 P4 done-when 조건은 변경 없음.

### 왜 이게 유일하게 남은 작업인가
P1(스킬 생성)·P2(저장소 정리)·P3(push) 전부 완료. PRD의 나머지 항목(Phase 1.5 promptfoo 자동화, Phase 2 마켓 등록)은 **P4 완료를 전제 조건으로 명시**(`.PRD/03_PHASES.md:146`) — P4 없이 다음 단계로 가면 순서 위반.

### 왜 AI(Claude)가 대신할 수 없는가 (구조적 한계, 보류 아님)
- **자기 확인 편향**: 내가 스킬을 스스로 실행해 채점하면, 이미 PRD 명세(정답)를 알고 있는 채로 자기 판단하는 순환 오류가 생겨 신뢰할 수 없다.
- **관찰 불가능한 제품 표면**: 실제 검증 대상은 "Claude.ai 앱에서 자연어만으로 스킬이 자동으로 불려나오는가"인데, 이는 이 대화 세션 밖의 별개 제품 화면이라 도구로 접근·관찰이 불가능하다.
- 2026-07-11 코드 차원 검증(lint·typecheck·build 전부 종료코드 0, 민감정보 노출 0건)은 이미 완료했으나, 이는 "코드가 깨지지 않았다"는 것이지 "제품이 실제로 작동한다"는 것과 다르다.

### 실행 방법
`P4_검수_가이드.md` 참조 — 10개 스킬 × 5항목(결과나옴·형식일치·개인정보유도X·위험주제X·자동매칭) = 50개 체크표. Claude.ai 앱 또는 Claude Code에서 자연어로 직접 말을 걸어 확인. 예상 소요 5분.

### done-when
- [ ] 50개 체크 항목 전부 통과
- [ ] README.md에 "✅ 사람 검수 완료 (날짜 · Claude Haiku 4.5)" 배지 추가
- [ ] 실패 항목 발견 시: 해당 SKILL.md 수정 → 재검수 (배지 추가 전까지 반복)

### 예상 위험/변수 (검토 완료, 낮음)
| 리스크 | 심각도 | 비고 |
|---|---|---|
| 자연어 자동매칭이 실제로 안 될 가능성 | 낮음 | description에 트리거 문구 포함 확인됨(정적 QA 완료), 실사용만 미검증 |
| 일부 스킬 출력이 명세와 다를 가능성 | 낮음 | 06_SEED 명세 정합 이미 3건 선제 수정(2026-07-11), 안전 blocker 0건 확인 |
| P4 중 새 결함 발견 시 범위 확대 유혹 | 중간 | 해당 SKILL.md만 최소 수정 — 관련없는 리팩토링 금지 (프로젝트 원칙) |
| 폐기된 Next.js 앱 코드가 디스크에 남아 향후 혼동 유발 | 낮음 | git 추적은 이미 제거됨, 필요시 사용자가 탐색기에서 직접 삭제 가능(선택사항) |

### P4 통과 후 다음 단계 (순서대로, 지금 착수 금지)
1. Phase 1.5 — promptfoo 자동 작동률 검증 + GitHub Actions CI
2. Phase 2 — Claude Code 마켓 등록(`.claude-plugin/plugin.json` 생성) + 안전 배지 자동화
3. Phase 3 — 스킬 수 확장(커뮤니티 기여)

---

## 취소된 마일스톤 (웹앱 방향 폐기로)

~~M7 갤러리 UI~~ · ~~M8 Mad Libs 카드~~ · ~~M9 다듬기+신고~~ · ~~M10 5상태 UX~~
~~M12 result_preview~~ · ~~M13 SKILL.md ZIP 내보내기~~ · ~~M14 가이드~~ · ~~M15 출시 게이트~~

> 이유: 서버/DB/인증 없이 GitHub 저장소가 배포 채널이 되므로 웹앱 불필요.

---

## 참고: SoDam 6-Engine 사다리

```
Prompt (★1 지금 여기) → Context → Loop → Harness → Agentic
                                                    + Reverse (병렬 분석 트랙)
```

이 저장소 = 1단계 Prompt. 가장 쉬운 첫 입구.
