# Phase 1.5 — promptfoo 로컬 실행 가이드 (CI 아님)

> 2026-07-15 결정: CI 자동화(GitHub Actions)는 보류하고 **로컬에서 본인이 원할 때만 수동 실행**한다.
> 이유: 자동 실행마다 실제 Anthropic API 비용이 발생하고 API 키를 GitHub Secret에 올려야 하는데,
> 이건 이 프로젝트의 원칙(운영 비용 $0·AI 키 관리 없음)을 처음 깨는 결정이라 자동화하지 않기로 함.
> 그래서 이 저장소엔 `.github/workflows/` 파일이 없다 — 있다면 그건 다시 만든 것.

> **현재 상태(2026-11-26)**: 설정과 절차는 만들어져 있지만 **`promptfoo eval`은 아직 한 번도 실행하지 않았다.**
> 통과 숫자나 작동률은 아직 없다.

## 언제 쓰나
- SKILL.md를 수정한 뒤, 11개 스킬의 출력 형식이 규칙대로인지 한 번에 다시 확인하고 싶을 때.
- P4 사람 검수(시드 10개)를 통과한 이후의 변경이 회귀를 만들지 않았는지 재확인하고 싶을 때.

## 이 검사가 알려 주는 것과 알려 주지 않는 것
- **알려 주는 것**: 각 SKILL.md "## 규칙" 중 기계로 분명히 판별되는 **출력 형식**(예: `•` 줄 요약, 표, 버전 2개, 해시태그 수)과
  전화번호 앞자리·주민등록번호 문구가 없는지.
- **알려 주지 않는 것**: 글의 품질, 말투, 내용의 정확성, Claude Haiku 4.5가 아닌 모델·도구에서의 작동.
  **11/11 통과는 "품질 검증"이 아니다.**
- `skill-maker`는 "되묻기" 또는 "완성된 스킬 파일" 둘 중 하나인지만 본다.
- ⚠️ **검사식에 오판이 확인돼 있다(2026-11-26).** 지어낸 표본 17개에서 규칙을 지킨 답을 떨어뜨리거나 어긴 답을 통과시켰다(`.PRD/CHECKPOINT.md` 12차 갱신). **통과·실패 숫자를 그대로 믿지 말고 11개 답을 직접 읽는다.**

## 준비물
- 본인 Anthropic API 키 (콘솔에서 발급: https://console.anthropic.com/)
- Node.js 22.22.0 이상 (2026-11-26에 조회한 promptfoo 0.126.0의 요구 버전. `npx`가 처음 실행 때 promptfoo를 내려받는다)

## 실행 방법

키를 명령줄에 직접 적으면 **명령 기록 파일에 남을 수 있다.** 아래처럼 가린 채 입력받는다.

Windows PowerShell:
```powershell
# 저장소 폴더에서 실행
$env:PROMPTFOO_DISABLE_TELEMETRY = "1"
$secure = Read-Host "API key" -AsSecureString   # 여기까지 실행한 뒤 키를 붙여 넣고 Enter
```
키 입력을 취소했거나 아무것도 넣지 않았다면 **다음 묶음을 실행하지 않는다.**

```powershell
$env:ANTHROPIC_API_KEY = [System.Net.NetworkCredential]::new('', $secure).Password
npx promptfoo@latest eval -c promptfooconfig.yaml
npx promptfoo@latest view                        # 결과를 브라우저로 확인 (선택)
```
```powershell
Remove-Item Env:ANTHROPIC_API_KEY; Remove-Variable secure
```

Mac/Linux (bash·zsh):
```bash
printf "API key: "; read -rs ANTHROPIC_API_KEY; export ANTHROPIC_API_KEY; echo
```
키가 비어 있으면 여기서 멈춘다. 입력했다면:
```bash
npx promptfoo@latest eval -c promptfooconfig.yaml
npx promptfoo@latest view
unset ANTHROPIC_API_KEY
```

- 키는 파일에 저장하거나 커밋하지 않는다. 채팅이나 화면 캡처에도 넣지 않는다.

## 비용 안내
- 한 번 실행할 때마다 Haiku 4.5를 11회 호출한다. 비용은 본인 Anthropic 계정에 청구된다.
- 2026-11-26에 확인한 공식 가격은 100만 토큰당 입력 $1, 출력 $5이다. 1회 실행은 $0.1 미만으로 **추정**한다(실측 아님).
- 필요할 때만 실행한다. 자동으로 반복 실행되지 않는다(CI 없음).

## 결과물 처리
- 결과에는 API 응답 원문이 로컬에 남을 수 있다. `.promptfoo/` 폴더는 `.gitignore`에 등록돼 커밋되지 않는다.

## 구조
- `promptfooconfig.yaml` — 11개 스킬 × 예시 입력 + 안전/형식 검사.
- `promptfoo-skill-prompt.js` — `skills/<이름>/SKILL.md` 원본을 그대로 읽어 렌더링(별도 사본 없음,
  드리프트 방지).

## 실패가 나왔을 때

실패는 "스킬이 틀렸다"와 "검사가 틀렸다" 두 가지일 수 있다. **먼저 실제 답을 읽는다.**
- 답이 SKILL.md 규칙을 지켰는데 실패했다면 → 검사식을 고친다.
- 답이 규칙을 어겼다면 → 한 번 더 실행해 반복되는지 본다. 반복될 때만 SKILL.md 수정을 검토한다.
  SKILL.md를 고치면 사람 검수를 거친 결과가 달라지므로 **그 스킬은 다시 사람이 확인**해야 한다.

## 결과를 README 배지에 반영하는 방법 (B-3 확정 절차, 2026-07-26)

> **배경**: 원래 계획은 GitHub Actions가 `promptfoo eval` 결과를 자동 계산해 배지 숫자로 표시하는 것이었으나,
> CI 도입 자체가 이 저장소 원칙(NFR-비용1 운영비 $0·NFR-키1 AI 키 관리 없음)과 충돌해 채택하지 않기로
> 확정했다(위 첫 번째 인용문 참조). 그래서 "누가, 언제, 어떻게 배지를 갱신하나"를 대신 여기
> 절차로 못 박는다. **자동화 스크립트는 만들지 않는다** — 아래는 전부 사람이 직접 하는 수동 절차다.

> ⏸ **현재는 배지에 반영하지 않는다(2026-11-26).** 위의 확인된 오판을 고치기 전에는 `N/11` 숫자가 규칙 준수를 뜻하지 않는다. 아래 절차는 검사식을 고친 뒤에 쓴다.

1. 본인이 원할 때 위 "실행 방법"대로 실행한다 (본인 API 키, 본인 계정 비용).
2. 결과 화면에서 11개 테스트의 통과/실패 개수를 직접 확인한다.
3. `README.md`·`README_EN.md` 상단의 검수 배지 줄에 아래 형식을 **직접** 덧붙인다
   ("작동률"이라고 쓰지 않는다 — 형식 검사 결과이기 때문이다):
   ```
   promptfoo 출력 형식 검사 N/11 통과 (YYYY-MM-DD, Claude Haiku 4.5)
   ```
   - `N/11`은 화면에서 실제로 센 숫자를 그대로 적는다(지어내지 않는다).
   - 날짜는 `eval`을 실제로 돌린 날짜로 적는다.
4. 11/11 미만이면 배지를 먼저 갱신하지 말고, 위 "실패가 나왔을 때"를 먼저 처리한 뒤 다시 실행한다
   ("거짓말하지 않기" 원칙, .PRD/CHECKPOINT.md P4 참조).
5. 커밋 메시지는 `docs: promptfoo 출력 형식 검사 결과 반영 (N/11, YYYY-MM-DD)` 형식을 권장한다.

**의도적으로 하지 않는 것**: 이 결과를 자동으로 읽어 배지를 고치는 스크립트·GitHub Actions·pre-commit
훅은 만들지 않는다. 그런 자동화 한 줄이라도 추가하는 순간 "로컬 전용·CI 없음" 결정을 몰래 뒤집는
것이므로, 그 결정을 다시 논의하고 싶다면 이 문서가 아니라 .PRD/CHECKPOINT.md의 B-3 옵션 (c)부터 먼저
재검토해야 한다.
