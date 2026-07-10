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
| 기존 Next.js 코드 정리 | 🟡 in-progress |
| GitHub push | pending |
| 사람 검수 (10개 실제 동작) | pending |

---

## P1 — SKILL.md 10개 ✅ done

### 생성된 스킬
```
skills/
  독후감-도우미/SKILL.md
  정중한-메시지/SKILL.md
  긴글-3줄요약/SKILL.md
  쉽게-설명해줘/SKILL.md
  공부-계획표/SKILL.md
  자기소개-다듬기/SKILL.md
  sns-캡션/SKILL.md
  영어-자연스럽게/SKILL.md
  발표-대본/SKILL.md
  부탁-사과-메시지/SKILL.md
```

### done-when
- [ ] Claude Haiku 4.5에서 10개 전부 실제 작동 확인 (사람 검수)
- [ ] 개인정보 유도 없음 확인
- [ ] 위험·민감 주제 없음 확인

---

## P2 — 저장소 정리 🟡 in-progress (untrack 방식으로 정정)

> **정정(2026-07-11):** `.gitignore` 추가만으로는 이미 커밋된 파일이 GitHub에서 빠지지 않는다. 실제로는 `git rm --cached`로 추적 해제해야 하며(디스크 파일은 보존), 안전 hook이 `git rm`을 차단하므로 **사용자가 직접 1회 실행**해야 P2가 완료된다. 명령·검증(`git ls-files`에 `.env*` 0건)은 루트 계획서 참조.

### 삭제 대상 (Next.js 잔재)
- `src/` 폴더
- `supabase/` 폴더
- `node_modules/` 폴더
- `package.json`, `package-lock.json`
- `next.config.ts`, `tsconfig.json`
- `postcss.config.mjs`, `tailwind.config.ts`, `eslint.config.mjs`
- `.env.example`

### 유지 대상
- `skills/` (새 핵심)
- `README.md` (새 설치 안내)
- `LICENSE` (Apache-2.0)
- `NOTICE`
- `.gitignore` (업데이트 필요)
- `CHECKPOINT.md`, `AUDIT.log`
- `.PRD/` (참고용 유지)

### done-when
- [ ] 저장소에 Next.js 관련 파일 없음
- [ ] `git ls-files` 에 `.env*` 0건

---

## P3 — GitHub push pending

```bash
git add skills/ README.md LICENSE NOTICE .gitignore
git commit -m "feat: SKILL.md 플러그인 10개 초판"
git push origin main
```

### done-when
- [ ] `sodam-ai/SoDam-Prompt-Eng` GitHub에 push 완료
- [ ] `skills/` 폴더 10개 SKILL.md 공개 확인

---

## P4 — 사람 검수 pending

각 스킬을 Claude Haiku 4.5에서 직접 실행:
- 빈칸 채워서 결과 확인
- 위험·민감 주제 없음 확인
- 개인정보 유도 없음 확인
- 출력 형식이 명세(PRD 06_SEED_PROMPTS.md)와 일치 확인

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
