# Phase 1.5 — promptfoo 로컬 실행 가이드 (CI 아님)

> 2026-07-15 결정: CI 자동화(GitHub Actions)는 보류하고 **로컬에서 본인이 원할 때만 수동 실행**한다.
> 이유: 자동 실행마다 실제 Anthropic API 비용이 발생하고 API 키를 GitHub Secret에 올려야 하는데,
> 이건 이 프로젝트의 원칙(운영 비용 $0·AI 키 관리 없음)을 처음 깨는 결정이라 자동화하지 않기로 함.
> 그래서 이 저장소엔 `.github/workflows/` 파일이 없다 — 있다면 그건 다시 만든 것.

## 언제 쓰나
- SKILL.md를 수정한 뒤, 10개가 여전히 정상 작동하는지 한 번에 다시 확인하고 싶을 때.
- P4 사람 검수를 이미 통과했지만, 이후 변경이 회귀를 만들지 않았는지 재확인하고 싶을 때.

## 준비물
- 본인 Anthropic API 키 (콘솔에서 발급: https://console.anthropic.com/)
- Node.js (설치돼 있으면 `npx`로 별도 설치 없이 실행 가능)

## 실행 방법
```bash
# 1) 본인 셸에만 키를 설정한다 (파일로 저장하거나 커밋하지 말 것)
export ANTHROPIC_API_KEY="여기에_본인_키"

# 2) 10개 스킬 전부 평가 실행
npx promptfoo eval

# 3) 결과를 브라우저로 확인
npx promptfoo view
```

## 비용 안내
- 매 실행마다 Haiku 4.5로 10회 호출 → 실제 소액 비용이 본인 Anthropic 계정에 청구됩니다.
- 필요할 때만 실행하세요. 자동으로 반복 실행되지 않습니다(CI 없음).

## 결과물 처리
- `npx promptfoo eval`이 만드는 `.promptfoo/` 캐시 폴더는 `.gitignore`에 이미 등록돼 커밋되지 않습니다
  (API 응답 원문이 로컬에 남을 수 있으므로 의도적으로 제외).

## 구조
- `promptfooconfig.yaml` — 10개 스킬 × 실제 예시 입력 + 최소 안전/형식 검증.
- `promptfoo-skill-prompt.js` — `skills/<이름>/SKILL.md` 원본을 그대로 읽어 렌더링(별도 사본 없음,
  드리프트 방지).
