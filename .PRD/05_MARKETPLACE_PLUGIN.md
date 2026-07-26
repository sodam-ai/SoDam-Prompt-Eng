# SoDam Prompt — 마켓플레이스 + 플러그인 "설치/작동" 설계

> **방향 전환 반영: 2026-06-29**
> B) 플러그인 전용 전환. "웹사이트 + 플러그인" 2층 구조에서 → "GitHub 저장소 = 마켓"으로 단순화.
> 이 문서는 설치 절차·작동 방식·안전 기준을 구체화합니다.

---

## 0. 핵심 개념 변경

| 항목 | 기존 (웹앱+플러그인) | 현재 (플러그인 전용) |
|------|-------------------|--------------------|
| 마켓플레이스 | 웹사이트 (Next.js) | **GitHub 저장소** |
| 발견 경로 | 웹 갤러리 카드 | README.md 표 |
| 미리보기 | 웹에서 샘플 결과 | README에 예시 결과 설명 |
| 놀이터 실행 | 웹에서 1회 실행 (로그인 후) | 설치 후 사용자 AI 도구에서 |
| 설치 방법 | Phase 2 계획 | **P1 완료 (3경로)** |

---

## 1. 발견 → 설치 → 작동 (사용자 여정)

```
[GitHub README 발견]
  → [ZIP 다운로드]
  → [설치 방법 선택: Claude.ai ZIP(★1) / Claude Code cp(★2) / Codex cp(★2)]
  → [스킬 작동: 자연어 자동 / /이름 값 / $이름]
```

핵심 원칙: **초보는 터미널 없이 Claude.ai 앱 ZIP(★1)으로 시작**, 개발자는 Claude Code/Codex로.

---

## 2. 설치 경로 (마찰 낮은 순)

| 순위 | 경로 | 절차 | 난이도 | 터미널 | 상태 |
|---|---|---|---|---|---|
| **1** | **Claude.ai 앱 GUI 업로드** | Code → Download ZIP → Claude.ai 앱 → Customize → Skills → + Create skill → ZIP 업로드 → 토글 ON | **★1** | 불필요 | ✅ P1 완료 |
| 2 | **Claude Code 수동 복사** | `cp -r skills/* ~/.claude/skills/` → `/이름 값` | ★2 | 터미널 | ✅ P1 완료 |
| 3 | **Codex 수동 복사** | `cp -r skills/* ~/.codex/skills/` → `$이름` | ★2 | 터미널 | ✅ P1 완료 |
| 4 | 수동 파일 복사 | 탐색기로 `skills/<이름>/SKILL.md` 복사 | ★3 | 파일탐색기 | ✅ P1 완료 |
| **Phase 2** | **Claude Code 마켓 등록** | `/plugin marketplace add sodam-ai/SoDam-Prompt-Eng` → `/plugin install sodam-prompt@sodam-prompt-marketplace` | ★1 | 터미널 | ✅ 완료 — 생성(2026-07-17)+실사용 라이브 재검증 2회(2026-07-18, CHECKPOINT.md B-1 참조). 단 `/plugin uninstall` 제거는 명령어만 존재, 실행 재확인은 안 됨 |
| — | **Codex `$skill-installer`** | `$skill-installer <이름>` | ★2 | 터미널(Codex) | 대상 없음(2026-07-16 조사 완료 — B-2, 아래 각주) |

> **현재(P1)**: README.md 경로 1~4가 모두 안내됨.
> **Phase 2**: `.claude-plugin/plugin.json`·`marketplace.json` 로컬 생성 완료 + 실사용 라이브 재검증 완료(2026-07-18, 10개 스킬 전부 `/sodam-prompt:` 네임스페이스 정상 등록 화면 확인). 남은 좁은 빈틈: `/plugin uninstall` 제거는 미실측. 안전 배지 자동화(B-3)는 아래 6번 참조.

---

## 3. 작동(실행) 방식 — 도구별

| 도구 | 설치 후 호출 | 자동 트리거 |
|---|---|---|
| Claude.ai 앱 | "독후감 써줘" 같은 자연어 → description 매칭으로 자동 사용 | ✅ (description 기반) |
| Claude Code | "독후감 써줘" 자연어 → description 매칭 자동 사용 | ✅ (description 기반) |
| Codex | `$book-report-helper "어린 왕자" "감동적"` | 자동 선택 가능 |
| Cursor·Gemini CLI | `skills/<이름>/SKILL.md` 복사 후 도구별 방식 | 도구마다 다름 |

---

## 4. SKILL.md 패키징 표준

```markdown
---
name: book-report-helper
description: 책 제목과 느낀 점을 주면 3문단 독후감을 써준다. "독후감 써줘", "독서감상문 도와줘" 일 때 사용.
argument-hint: [책 제목] [느낀 점]
---

당신은 친절한 국어 선생님입니다.

"$1"을 읽고 "$2"라고 느꼈다는 내용으로 독후감을 써주세요.

## 규칙
- 3문단 구조: 줄거리 요약 → 인상 깊은 장면 → 느낀 점
- 쉬운 말, 중학생도 이해할 수 있게
- 800자 이내
- 개인정보(이름·연락처) 포함하지 말 것
```

변수: `$1`(첫 인자)·`$2`(둘째 인자)·`$ARGUMENTS`(전체).

---

## 5. 설치 안전 (초보 보호)

> 공식 경고: "Plugins … can execute arbitrary code on your machine … Only install from sources you trust."

### SoDam Prompt의 안전 등급

- **무코드 (★ Safe)**: 셸·MCP·코드 실행 없는 순수 텍스트 → **현재 10개 전부**
- **코드포함 (⚠ Caution)**: 셸 명령·도구 호출 포함 → MVP에 없음, Phase 3 이후 추가 시 별도 배지

### 설치 전 확인 권고

- README의 "안전 원칙" 섹션 확인 — 순수 텍스트 명시됨
- SKILL.md 원문 미리보기 — GitHub에서 직접 파일 클릭
- 출처 확인: `sodam-ai/SoDam-Prompt-Eng` (공식 저장소)

---

## 6. Phase 매핑 (현재 → 로드맵)

| Phase | 마켓플레이스·플러그인 범위 | 상태 |
|---|---|---|
| **P1 (현재 완료)** | GitHub 저장소 = 마켓. README 설치 안내(3경로). ZIP 무코드 설치(★1) 우선. | ✅ done |
| **Phase 1.5** | promptfoo 작동률 검증 — **[2026-07-15 완료·로컬 전용으로 확정]** GitHub Actions 자동화는 NFR-비용1·NFR-키1과 충돌해 채택하지 않음. `promptfooconfig.yaml`+`promptfoo-skill-prompt.js`로 로컬에서 본인 API 키로만 수동 실행 | ✅ done (로컬 전용) |
| **Phase 2** | Claude Code 마켓 등록(`.claude-plugin/marketplace.json`) → `/plugin install @sodam` + Codex 지원 + 안전 배지 | 로컬 매니페스트 생성 ✅ 완료 · Claude Code 설치·네임스페이스 실사용 라이브 재검증 ✅ 완료(2026-07-18, 제거 `/plugin uninstall`은 명령어만 존재·미실측) · **Codex는 "마켓 등록" 자체가 대상 없음(2026-07-16 조사 완료 — 아래 각주)** · **안전 배지 자동화 = (b) 로컬 `promptfoo eval` 결과를 README 배지에 수동 반영하는 절차로 확정(2026-07-26, `PROMPTFOO_로컬_가이드.md` 참조 — CI 자동 계산은 도입하지 않음)** |
| **Phase 3** | 커뮤니티 기여: 스킬 수 확장. 안전 심사 통과해야 마켓 노출. | 기여 인프라(`CONTRIBUTING.md`·`scripts/verify-skills.mjs`·PR 템플릿) + `skill-maker`(11번째 스킬, 자가 생성 방식) 완료(2026-07-27). 다국어는 범위 미정 |

> **각주 (2026-07-16, Phase 2 "Codex 마켓" 조사 결과)**: 공식 문서(`learn.chatgpt.com/docs/build-skills`)와 제3자 실사용 가이드 다수를 교차 확인한 결과, **Codex에는 Claude Code의 `.claude-plugin/marketplace.json`에 대응하는 공식 마켓플레이스·플러그인 매니페스트 개념이 없다.** Codex의 스킬 배포는 `~/.codex/skills/`(개인)·`.codex/skills/`(프로젝트) 폴더에 SKILL.md를 두면 자동 탐지되는 방식뿐이며, 이는 이 저장소 README에 이미 안내된 방법과 정확히 일치한다(추가로 확인된 `.agents/skills` 계층 탐색은 별개 보조 경로로 보이며 기존 방법을 대체할 필요는 없음). **결론: "Codex 마켓 등록"이라는 별도 작업 자체가 존재하지 않으므로 이 항목은 추가 구현 불필요 — 이미 완료된 것으로 간주.** (확인 없이 임의 매니페스트를 만들었다면 존재하지 않는 표준을 따라가는 오류였을 것)

---

## 7. SoDam 6-Engine 시너지

```
Prompt (★1 지금 여기) → Context → Loop → Harness → Agentic
                                                    + Reverse (병렬 분석 트랙)
```

- **공통 SKILL.md 표준**: 6엔진 전부 같은 포맷 → 한 번 배우면 6개 다 사용
- **공통 마켓**: `sodam-ai/*` GitHub org → 동일 설치 패턴
- **사다리**: Prompt 이후 Context·Loop·Harness·Agentic 자연 성장 경로
- **경계**: 다른 엔진 기능을 Prompt P1으로 끌어오지 않음

---

## 결정 확정 (2026-06-29)

- [x] P1 설치 = **3경로 안내 완료** (ZIP·Claude Code·Codex)
- [x] 공개 마켓 repo = `sodam-ai/SoDam-Prompt-Eng` (P3 push 완료)
- [x] 초보 1순위 = **ZIP 무코드 설치(★1)**
- [x] 전체 스킬 = **순수 텍스트** (코드포함 없음)
- [x] Phase 1.5 promptfoo 작동률 검증 = 완료(2026-07-15, 로컬 전용·CI 없음)
- [x] Phase 2 마켓 등록 = 로컬 plugin.json/marketplace.json 생성 + 실사용 라이브 재검증 완료(2026-07-18)
- [x] 안전 배지 자동화(B-3) = (b) 로컬 `promptfoo eval` 결과 수동 반영 절차로 확정(2026-07-26, CI 자동화는 도입하지 않음)
