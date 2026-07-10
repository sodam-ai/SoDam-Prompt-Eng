# SoDam Prompt (소담 프롬프트) — Phase 계획 (플러그인 전용)

> **방향 전환 반영: 2026-06-29**
> B) 플러그인 전용 전환으로 Phase 계획 전면 재편. 웹앱(Next.js+Supabase) Phase 계획은 폐기.

---

## 현재 상태

| Phase | 내용 | 상태 |
|-------|------|------|
| P1 | SKILL.md 10개 생성 + README 설치 안내 | ✅ done |
| P2 | 로컬 Next.js 잔재 정리 | 🟡 in-progress (.gitignore 처리 완료, 탐색기 수동 삭제 필요) |
| P3 | GitHub push | pending |
| P4 | 사람 검수 (10개 실작동) | pending |

---

## P1 — SKILL.md 10개 ✅ done

**목표**: "Claude Haiku 4.5에서 빈칸 채워 결과가 나오는 스킬 10개" 완성.

### 완료된 스킬 (10개)
```
skills/독후감-도우미/SKILL.md
skills/정중한-메시지/SKILL.md
skills/긴글-3줄요약/SKILL.md
skills/쉽게-설명해줘/SKILL.md
skills/공부-계획표/SKILL.md
skills/자기소개-다듬기/SKILL.md
skills/sns-캡션/SKILL.md
skills/영어-자연스럽게/SKILL.md
skills/발표-대본/SKILL.md
skills/부탁-사과-메시지/SKILL.md
```

### 완료 기준 (done-when)
- [x] SKILL.md 10개 파일 생성
- [x] README.md (Claude.ai ZIP / Claude Code / Codex 3경로 설치 안내)
- [x] .gitignore (Next.js 잔재 GitHub 제외 처리)
- [ ] Claude Haiku 4.5에서 실작동 확인 → P4

---

## P2 — 저장소 정리 🟡 in-progress

**목표**: Next.js 잔재를 로컬에서 제거해 저장소를 깔끔하게.

### .gitignore 처리 완료 (단, 이미 커밋된 파일은 별도 untrack 필요 ⚠)

> ⚠ 정정(2026-07-11): `.gitignore` 추가만으로는 **이미 커밋된 파일이 추적 해제되지 않는다**. GitHub에서 실제로 빼려면 `git rm --cached <파일>`이 필수다. 아래 done-when "`git ls-files`에 `.env*` 0건"도 untrack으로만 충족된다.
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
- [ ] `git ls-files` 에 `.env*` 0건
- [ ] 로컬에 Next.js 관련 파일 없음 (탐색기 확인)

---

## P3 — GitHub push pending

**목표**: `sodam-ai/SoDam-Prompt-Eng` 저장소에 공개.

### 실행 명령 (로컬 터미널에서)

```bash
# git init이 안 돼 있다면
git init
git remote add origin https://github.com/sodam-ai/SoDam-Prompt-Eng.git

# 스테이징 (Next.js 파일은 .gitignore가 제외)
git add skills/ README.md LICENSE NOTICE .gitignore CHECKPOINT.md AUDIT.log .PRD/

# 커밋
git commit -m "feat: SKILL.md 플러그인 10개 초판 (Apache-2.0)"

# 푸시
git push -u origin main
```

### done-when
- [ ] GitHub `sodam-ai/SoDam-Prompt-Eng` 에 push 완료
- [ ] `skills/` 10개 SKILL.md 공개 확인
- [ ] README.md 설치 안내 표시 확인
- [ ] Next.js 파일이 GitHub에 없음 확인 (`src/`, `supabase/` 등)

---

## P4 — 사람 검수 pending

**목표**: "거짓말하지 않기" — 실제로 작동하는 스킬만 공개.

### 검수 방법 (Claude Haiku 4.5에서)

> **핵심**: Claude Code와 Claude.ai 앱 모두 자연어(description 매칭)로 테스트.
> 슬래시 커맨드(`/독후감-도우미`)는 한글 폴더명 스캔 한계로 사용하지 않음.

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

### 검수 체크리스트 (10개 × 5항목 = 50개 확인)

각 스킬마다:
- [ ] 결과가 실제로 나옴 (오류 없음)
- [ ] 출력 형식이 명세와 일치 (06_SEED_PROMPTS.md 기준)
- [ ] 개인정보(이름·전화·주소) 유도 없음
- [ ] 위험·민감 주제 없음
- [ ] description 자연어로 Claude.ai 앱 자동 매칭됨

### done-when
- [ ] 10개 전부 작동 확인 → README "✅ 사람 검수 완료" 배지 추가
- [ ] 실작동 확인 날짜 + 모델명(Claude Haiku 4.5) 기록

---

## 이후 Phase (로드맵)

| Phase | 내용 | 전제 |
|-------|------|------|
| Phase 1.5 | promptfoo 자동 작동률 검증 + GitHub Actions CI | P4 완료 |
| Phase 2 | Claude Code 마켓 등록 (`/plugin install @sodam`) + 안전 배지 자동화 | P4 완료 |
| Phase 3 | 스킬 수 확장 (커뮤니티 기여 수용) + 다국어 | Phase 2 완료 |

---

## 취소된 웹앱 Phase (참고용)

다음은 웹앱(Next.js+Supabase) 방향의 Phase였으며 플러그인 전용 전환으로 **모두 폐기**:

~~Phase 1(웹 놀이터 6~8주): 갤러리·로그인·RLS·AI 실행·신고~~
~~Phase 1.5: 비용 정밀집계·캐싱~~
~~Phase 2(검증배지·플러그인): promptfoo+마켓~~
~~Phase 3(커뮤니티·글로벌): 업로드·수익화·COPPA~~

> 이유: "Supabase 같은 서버가 왜 필요하지?" → 플러그인 전용으로도 목적 달성 가능 (2026-06-29).
