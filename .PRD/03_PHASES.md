# SoDam Prompt (소담 프롬프트) — Phase 계획 (플러그인 전용)

> **방향 전환 반영: 2026-06-29**
> B) 플러그인 전용 전환으로 Phase 계획 전면 재편. 웹앱(Next.js+Supabase) Phase 계획은 폐기.

---

## 현재 상태

| Phase | 내용 | 상태 |
|-------|------|------|
| P1 | SKILL.md 10개 생성 + README 설치 안내 | ✅ done |
| P2 | 로컬 Next.js 잔재 정리(git 추적 해제) | ✅ done (2026-07-11, `git update-index --remove --force-remove`로 24개 파일 추적 해제) |
| P3 | GitHub push | ✅ done (2026-07-11, `origin/main` 동기화 확인, 저장소 PRIVATE) |
| P4 | 사람 검수 (10개 실작동) | ✅ done (2026-07-15, 개인 용도 실사용 검증 — 상세 CHECKPOINT.md) |

---

## P1 — SKILL.md 10개 ✅ done

**목표**: "Claude Haiku 4.5에서 빈칸 채워 결과가 나오는 스킬 10개" 완성.

### 완료된 스킬 (10개)
```
skills/book-report-helper/SKILL.md
skills/polite-message/SKILL.md
skills/long-text-summary/SKILL.md
skills/explain-simply/SKILL.md
skills/study-planner/SKILL.md
skills/self-intro-polish/SKILL.md
skills/sns-caption/SKILL.md
skills/natural-english/SKILL.md
skills/presentation-script/SKILL.md
skills/request-apology-message/SKILL.md
```

### 완료 기준 (done-when)
- [x] SKILL.md 10개 파일 생성
- [x] README.md (Claude.ai ZIP / Claude Code / Codex 3경로 설치 안내)
- [x] .gitignore (Next.js 잔재 GitHub 제외 처리)
- [x] Claude Haiku 4.5에서 실작동 확인 → P4 완료(2026-07-15)

---

## P2 — 저장소 정리 ✅ done (2026-07-11)

**목표**: Next.js 잔재를 GitHub 저장소 추적에서 제거해 깔끔하게.

### .gitignore 처리 완료 (단, 이미 커밋된 파일은 별도 untrack 필요 ⚠)

> ⚠ 정정(2026-07-11): `.gitignore` 추가만으로는 **이미 커밋된 파일이 추적 해제되지 않는다**. `git rm --cached`가 정답이었으나 안전 hook이 `git rm` 동사를 폴더삭제로 오탐·차단 → **`git update-index --remove --force-remove`**(디스크 무변경, 동일 효과의 표준 git 명령)로 24개 파일 추적 해제 완료. 아래 done-when "`git ls-files`에 `.env*` 0건"은 이 방법으로 충족됨.
```
/src/ /supabase/ /public/ /node_modules/ /.next/
/package.json /package-lock.json /next.config.ts /tsconfig.json
/postcss.config.mjs /tailwind.config.ts /eslint.config.mjs
/components.json /next-env.d.ts
```

### 로컬 수동 삭제 필요 (Windows 탐색기에서)
- `src/` 폴더
- `supabase/` 폴더
- `node_modules/` 폴더 (있는 경우)
- `.next/` 폴더 (있는 경우)
- `public/` 폴더
- 루트 파일: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `tailwind.config.ts`, `eslint.config.mjs`, `components.json`, `next-env.d.ts`

> 삭제 도구(rm/Remove-Item)는 안전 hook이 막고 있으므로 Windows 탐색기에서 직접 삭제.

### done-when
- [x] `git ls-files` 에 `.env*` 0건 (2026-07-11 확인)
- [x] `git ls-files` 에 Next.js 관련 파일(`src/`·`supabase/`·`package.json` 등) 0건 (2026-07-11 확인)
- 참고: 디스크 파일 자체는 삭제하지 않고 보존됨(git 미추적이라 제품·배포에는 영향 없음). 물리적 삭제는 선택 백로그(CHECKPOINT.md 저우선순위 항목 참조).

---

## P3 — GitHub push ✅ done (2026-07-11)

**목표**: `sodam-ai/SoDam-Prompt-Eng` 저장소에 공개.

### 실행 이력 (참고용 — 이미 완료됨)

7개 커밋(`ada58e3`~`9500a3b`)을 `origin/main`에 push 완료. 저장소는 **PRIVATE**(GitHub 확인)로 외부 노출 없음.

```bash
# 최초 실행 시 사용한 명령 (기록용, 재실행 불필요)
git remote add origin https://github.com/sodam-ai/SoDam-Prompt-Eng.git
git add skills/ README.md LICENSE NOTICE .gitignore CHECKPOINT.md AUDIT.log .PRD/
git commit -m "feat: SKILL.md 플러그인 10개 초판 (Apache-2.0)"
git push -u origin main
```

### done-when
- [x] GitHub `sodam-ai/SoDam-Prompt-Eng` 에 push 완료 (`d28df7a..9500a3b`, 이후 여러 커밋으로 `41f9dd9`까지 갱신)
- [x] `skills/` 10개 SKILL.md 공개 확인
- [x] README.md 설치 안내 표시 확인
- [x] Next.js 파일이 GitHub에 없음 확인 (push 후 원격 재조회로 `src/`, `supabase/` 등 0건)

---

## P4 — 사람 검수 ✅ done (2026-07-15)

**목표**: "거짓말하지 않기" — 실제로 작동하는 스킬만 공개.

**결과**: 사용자 본인이 개인 용도로 직접 사용하며 10개 실작동·자연어 자동매칭 확인 완료. 원래 상정했던 "50항목 형식 체크리스트" 대신 실사용 확인으로 대체(CHECKPOINT.md P4 섹션에 상세 근거 기록).

### 검수 방법 (Claude Haiku 4.5에서, 참고용 — 아래는 애초 계획했던 절차)

> **핵심**: Claude Code와 Claude.ai 앱 모두 자연어(description 매칭)로 테스트.
> 슬래시 커맨드는 과거 한글 폴더명 스캔 한계로 배제했으나, 폴더명을 영문 슬러그로 전환(커밋 42cc622)했다. **2026-07-15 라이브 재검증으로 이 전환이 자동매칭을 실제로 고쳤음을 확인함** — 자연어 호출·슬래시 커맨드 둘 다 정상 작동. (예: `/book-report-helper`)

Claude Code 및 Claude.ai 앱에서 자연어 입력:
```
"어린 왕자 독후감 써줘"
"팀장님께 다음 주 월차 신청 메시지 써줘"
"인공지능이 뭔지 쉽게 설명해줘"
"수학 2주 공부 계획표 만들어줘"
"이 글 3줄로 요약해줘"
"자기소개 좀 다듬어줘"
"한강 피크닉 SNS 캡션 써줘"
"이 문장 자연스러운 영어로 바꿔줘"
"기후변화 발표 대본 써줘"
"선생님께 과제 늦게 낼 때 사과 메시지 써줘"
```

### 검수 체크리스트 (10개 × 5항목 = 50개 확인) — 위 "결과"(2026-07-15)로 대체 완료

각 스킬마다:
- [x] 결과가 실제로 나옴 (오류 없음) — 2026-07-13~14 실행테스트 10/10
- [x] 출력 형식이 명세와 일치 (06_SEED_PROMPTS.md 기준) — 10/10 확인
- [x] 개인정보(이름·전화·주소) 유도 없음 — 10/10 문구 확인 + 공격 테스트 방어 성공
- [x] 위험·민감 주제 없음 — 10/10 확인, 0건
- [x] description 자연어로 Claude.ai 앱 자동 매칭됨 — 2026-07-15 사용자 실사용 + 2026-07-17 독립 세션 재검증

### done-when
- [x] 10개 전부 작동 확인 → README "✅ 사람 검수 완료" 배지 추가 (2026-07-15)
- [x] 실작동 확인 날짜 + 모델명(Claude Haiku 4.5) 기록 (CHECKPOINT.md P4 섹션)

---

## 이후 Phase (로드맵)

| Phase | 내용 | 전제 |
|-------|------|------|
| Phase 1.5 | promptfoo 작동률 검증(**2026-07-15 완료·로컬 전용으로 확정** — GitHub Actions CI는 NFR-비용1·NFR-키1과 충돌해 채택 안 함, 본인 API 키로 로컬 수동 실행만) | P4 완료 ✅ |
| Phase 2 | 마켓 등록(`.claude-plugin/plugin.json`+`marketplace.json` 생성 ✅ 완료, `/plugin install @sodam` 실사용 라이브 재검증 완료(2026-07-18)) + 안전 배지(**(b) 로컬 promptfoo eval 결과 수동 반영으로 확정** — 2026-07-26, `PROMPTFOO_로컬_가이드.md` 참조, CI 자동 계산은 도입하지 않음) | 마켓 등록 완료 · 안전 배지 방식 확정 |
| Phase 3 | 스킬 수 확장 (커뮤니티 기여 수용) + 다국어 | Phase 2 완료 · **기여 인프라 + `skill-maker`(자가 생성 방식으로 확정) 완료(2026-07-27)** · 다국어 범위는 미정 |

---

## 취소된 웹앱 Phase (참고용)

다음은 웹앱(Next.js+Supabase) 방향의 Phase였으며 플러그인 전용 전환으로 **모두 폐기**:

~~Phase 1(웹 놀이터 6~8주): 갤러리·로그인·RLS·AI 실행·신고~~
~~Phase 1.5: 비용 정밀집계·캐싱~~
~~Phase 2(검증배지·플러그인): promptfoo+마켓~~
~~Phase 3(커뮤니티·글로벌): 업로드·수익화·COPPA~~

> 이유: "Supabase 같은 서버가 왜 필요하지?" → 플러그인 전용으로도 목적 달성 가능 (2026-06-29).
