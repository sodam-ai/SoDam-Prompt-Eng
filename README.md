# SoDam Prompt — AI 글쓰기 스킬 10종 완전 가이드

> AI를 처음 쓰는 분도 빈칸만 채우면 바로 되는 한국어 글쓰기 도구 모음입니다.
> Claude Code · Claude.ai 앱 · Codex · Cursor · Gemini CLI 에서 동일하게 작동합니다.

라이선스: Apache-2.0 | 단계: SoDam Prompt (1단계) | 언어: 한국어 | 검수: ✅ 실사용 확인 완료 (2026-07-15)

---

## 목차

1. [한눈에 보기](#1-한눈에-보기)
2. [사전 준비물](#2-사전-준비물)
3. [필요 프로그램 설치](#3-필요-프로그램-설치)
4. [다운로드 방법](#4-다운로드-방법)
5. [빠른 시작](#5-빠른-시작)
6. [실행 방법 — 플랫폼별 상세](#6-실행-방법--플랫폼별-상세)
7. [스킬별 사용 방법 (10종 전부)](#7-스킬별-사용-방법-10종-전부)
8. [명령어 전체 목록](#8-명령어-전체-목록)
9. [워크플로우 — 내부 작동 흐름](#9-워크플로우--내부-작동-흐름)
10. [보안 · 데이터 흐름](#10-보안--데이터-흐름)
11. [아키텍처 — 파일 구조](#11-아키텍처--파일-구조)
12. [파일 · 문서 위치](#12-파일--문서-위치)
13. [문제 · 오류 대처 방법](#13-문제--오류-대처-방법)
14. [FAQ — 자주 묻는 질문](#14-faq--자주-묻는-질문)
15. [법률 · 저작권 · 라이선스 · 상업적 용도](#15-법률--저작권--라이선스--상업적-용도)
16. [연락처 · 저작권 고지](#16-연락처--저작권-고지)
17. [업데이트 내역](#17-업데이트-내역)

---

## 1. 한눈에 보기

SoDam Prompt는 학생·직장인·일반인이 AI에게 글쓰기를 요청할 때 쓰는 **10종 스킬 모음**입니다.
스킬 하나 = 미리 설계된 질문 틀 하나. 빈칸에 내 상황을 채우면 AI가 완성글을 만들어 줍니다.

| 번호 | 스킬 이름 | 필요한 정보 | 결과물 |
|------|-----------|------------|--------|
| 1 | 독후감-도우미 | 책 제목, 느낀 점 한 줄 | 3문단 독후감 |
| 2 | 정중한-메시지 | 받는 사람, 용건 한 줄 | 제목+본문 메시지 |
| 3 | 긴글-3줄요약 | 요약할 글 전체 | 핵심 3줄 요약 |
| 4 | 쉽게-설명해줘 | 개념, 듣는 사람 나이 | 비유+3문장 설명 |
| 5 | 공부-계획표 | 과목·목표, 기간 | 요일별 공부 계획표 |
| 6 | 자기소개-다듬기 | 내 소개 메모, 쓸 곳 | 완성된 자기소개 |
| 7 | sns-캡션 | 상황, 분위기 | 캡션 2개 + 해시태그 5개 |
| 8 | 영어-자연스럽게 | 한국어 문장 | 자연스러운 영어+이유 설명 |
| 9 | 발표-대본 | 주제, 발표 시간 | 도입-본론-마무리 대본 |
| 10 | 부탁-사과-메시지 | 상황, 상대 관계 | 정중한·친근한 2가지 버전 |

**비용**: $0 (AI 사용 요금은 각자 가입한 Claude/Codex 요금제 기준)
**서버**: 없음 (내 컴퓨터 + AI 회사 서버 사이에서만 작동)
**코드 실행**: 없음 (텍스트 질문·답변만 오갑니다)

**여기 없는 스킬을 직접 만들고 싶다면?** `skill-maker` 스킬로 대화하면서 새 스킬을 함께 설계할 수 있습니다.
(예: "새 스킬 만들고 싶어, 방 청소 계획 세워주는 스킬" 이라고 말해보세요.) 자세한 절차는
[CONTRIBUTING.md](./CONTRIBUTING.md)를 참고하세요.

---

## 2. 사전 준비물

스킬을 사용하려면 아래 중 **하나**만 있으면 됩니다. 전부 필요하지 않습니다.

| 방법 | 필요한 것 | 난이도 |
|------|-----------|--------|
| Claude.ai 앱 (가장 쉬움) | Claude.ai 계정 (무료) | ★☆☆ |
| Claude Code | Node.js 18+ · Claude Code CLI | ★★☆ |
| Codex | Codex 계정 · Codex CLI | ★★☆ |
| Cursor · Gemini CLI 등 | 해당 도구 설치 | ★★☆ |

### 계정 만들기 (Claude.ai 방법 기준)

1. 인터넷 브라우저(크롬, 엣지 등)를 엽니다
2. 주소창에 `claude.ai` 를 입력하고 Enter
3. **Sign up** 버튼 클릭 → 이메일 주소 입력 → 비밀번호 설정
4. 이메일로 온 인증 메일 확인 → 로그인 완료

> **만 14세 미만은 보호자와 함께 가입해야 합니다.**
> **대한민국 거주자를 대상으로 만든 도구입니다.**

---

## 3. 필요 프로그램 설치

### 방법 A — Claude.ai 앱 (터미널 불필요, 가장 쉬움)

별도 프로그램 설치 없이 **인터넷 브라우저만 있으면 됩니다.**
→ 4단계(다운로드)로 바로 이동하세요.

---

### 방법 B — Claude Code (개발자·고급 사용자)

**Node.js 설치 확인**

Node.js가 이미 설치되어 있는지 확인합니다.

Windows 기준:
1. 키보드 `Windows키` + `R` → `cmd` 입력 → Enter (검은 창이 열림)
2. 아래를 입력하고 Enter:
   ```
   node --version
   ```
3. `v18.0.0` 이상이 표시되면 OK. 아무것도 안 나오면 설치 필요.

**Node.js 설치 (없는 경우)**

1. 브라우저에서 `nodejs.org` 접속
2. **LTS** 버전 다운로드 버튼 클릭
3. 다운로드된 파일 더블클릭 → 설치 마법사 따라 Next → Finish

**Claude Code 설치**

검은 창(터미널)에 입력:
```bash
npm install -g @anthropic-ai/claude-code
```

설치 확인:
```bash
claude --version
```
버전 번호가 나오면 성공.

---

### 방법 C — Codex (OpenAI Codex 사용자)

Codex 공식 사이트에서 CLI를 설치하세요. (Codex 계정 필요)

---

## 4. 다운로드 방법

### 스킬 파일 다운로드

**방법 1: ZIP 다운로드 (가장 쉬움)**

1. 이 저장소 페이지에서 초록색 **Code** 버튼 클릭
2. **Download ZIP** 클릭
3. 내 컴퓨터의 원하는 폴더에 압축 풀기
4. `SoDam-Prompt-Eng-main` 폴더가 생깁니다

**방법 2: git clone (git이 설치된 경우)**

검은 창에서:
```bash
git clone https://github.com/sodam-ai/SoDam-Prompt-Eng.git
cd SoDam-Prompt-Eng
```

---

### 설치 전 확인 (안전 체크)

- ✅ **무코드 (★ Safe)** — 이 저장소의 스킬(`skills/`)과 슬래시 명령어용 사본(`commands/`) 전부 순수 텍스트입니다. 셸 명령·프로그램 실행·외부 도구 호출이 전혀 없습니다.
- ✅ **출처 확인** — 반드시 공식 저장소(`sodam-ai/SoDam-Prompt-Eng`)에서만 받으세요. 다른 곳에서 받은 파일은 내용이 다를 수 있습니다.
- ✅ **미리보기 가능** — 설치 전에 GitHub에서 `skills/<이름>/SKILL.md` 파일을 직접 클릭해 내용을 확인할 수 있습니다.

---

## 5. 빠른 시작

### Claude.ai 앱에서 5분 안에 시작하기

**Step 1**: `claude.ai` 로그인 → 우측 상단 프로필 → **Customize** 클릭

**Step 2**: 왼쪽 메뉴 **Skills** 탭 클릭 → **+ Create skill** 또는 **+ Add skill**

**Step 3**: 압축 푼 폴더 전체를 ZIP으로 다시 압축하거나, `skills` 폴더를 ZIP으로 압축 → 업로드

**Step 4**: 토글을 **ON** (파란색)으로 변경

**Step 5**: 채팅창에서 자연어로 말하기:
```
독후감 써줘. 책 제목은 "어린 왕자", 느낀 점은 "어른도 아이 마음이 필요하다" 야.
```

AI가 자동으로 `book-report-helper`(독후감-도우미) 스킬을 사용해 독후감을 만들어줍니다.

---

### Claude Code에서 시작하기

**Step 1**: 스킬 파일 복사

```bash
# 다운로드 폴더 기준 (Windows)
cp -r C:\Users\내이름\Downloads\SoDam-Prompt-Eng\skills\* ~/.claude/skills/
```

Mac/Linux:
```bash
cp -r ~/Downloads/SoDam-Prompt-Eng/skills/* ~/.claude/skills/
```

**Step 2**: Claude Code 실행

```bash
claude
```

**Step 3**: 슬래시 명령어로 사용

```
/book-report-helper "어린 왕자" "어른도 아이 마음이 필요하다"
```

또는 자연어:
```
독후감 도와줘. 책은 "해리 포터", 느낀 점은 "용기가 중요해"
```

---

## 6. 실행 방법 — 플랫폼별 상세

### Claude.ai 앱 (웹/앱)

**설치**:
1. 로그인 → Customize → Skills → + Create skill
2. ZIP 파일 업로드 → 토글 ON

**실행**:
- 자연어: `독후감 써줘. "어린 왕자", 느낀 점은 "성장"`
- 슬래시: `/book-report-helper "책제목" "느낀점"`

---

### Claude Code (터미널)

**설치**:
```bash
# skills 폴더 전체 복사
cp -r ./skills/* ~/.claude/skills/

# 개별 스킬만 설치하려면
cp -r ./skills/book-report-helper ~/.claude/skills/
```

**실행**:
```bash
claude
```
그 후 채팅에서:
```
/book-report-helper "책 제목" "느낀 점"
```

> 이 방법(폴더 복사)은 스킬이 이름만으로(`/book-report-helper`) 등록됩니다. 다른 곳에서 받은 같은 이름의 스킬이 있으면 겹칠 수 있습니다.

---

### Claude Code — 플러그인 정식 설치 (`sodam-prompt:스킬명` 형식)

`sodam-prompt:book-report-helper`처럼 **저장소 이름이 붙는 형식**으로 안정적으로 쓰고 싶다면, 폴더 복사 대신 Claude Code의 정식 플러그인 등록 기능을 쓰세요. 이 저장소는 `.claude-plugin/plugin.json`·`marketplace.json`에 더해 `commands/` 폴더(모든 스킬과 1:1 대응)를 갖추고 있어 바로 등록할 수 있습니다.

> **왜 `commands/` 폴더가 따로 있나요?** Claude Code에는 알려진 제한(공식 이슈 [#41842](https://github.com/anthropics/claude-code/issues/41842))이 있어서, `skills/` 폴더만으로는 `sodam-prompt:` 접두사가 붙은 슬래시 명령어로 안정적으로 등록되지 않습니다. `commands/` 폴더가 이 접두사 형식을 보장하는 검증된 방법입니다(같은 SoDam 계열의 다른 플러그인에서 실사용 확인됨).

**설치 — GitHub 저장소로 등록** (이 저장소는 PRIVATE이므로 접근 권한이 있는 계정 필요):
```
/plugin marketplace add sodam-ai/SoDam-Prompt-Eng
/plugin install sodam-prompt@sodam-prompt-marketplace
```

**설치 — 다운로드한 로컬 폴더로 등록** (GitHub 접근 없이도 가능):
```
/plugin marketplace add "다운로드한 SoDam-Prompt-Eng 폴더의 전체 경로"
/plugin install sodam-prompt@sodam-prompt-marketplace
```

설치 후에는 슬래시 명령어(`/sodam-prompt:book-report-helper`)와 자연어("독후감 써줘") 둘 다 됩니다.

**제거(재설치 테스트용)**:
```
/plugin uninstall sodam-prompt@sodam-prompt-marketplace
/plugin marketplace remove sodam-prompt-marketplace
```
터미널에서 직접 하려면: `claude plugin uninstall sodam-prompt --prune` (의존성까지 함께 정리)

깨끗하게 다시 설치하려면 위 제거 명령 2줄을 실행한 뒤, 설치 명령을 처음부터 다시 실행하세요.

> **정직한 안내**: 위 명령어는 이 저장소에 실제로 있는 `plugin.json`("name": "sodam-prompt")·`marketplace.json`("name": "sodam-prompt-marketplace") 값과, Claude Code 공식 문서(`/plugin uninstall`·`/plugin marketplace remove`)를 근거로 합니다. 다만 이 명령을 새 세션에서 직접 실행해 결과 화면을 눈으로 확인하는 것은 사람만 할 수 있는 검증입니다 — 이 문서의 "실사용 테스트" 방식대로 새 세션을 열어 직접 확인해 주세요.

---

### Codex

**설치**:
```bash
cp -r ./skills/* ~/.codex/skills/
```

**실행**:
```
$book-report-helper "책 제목" "느낀 점"
```

---

### Cursor · Gemini CLI · 기타 AI 도구

각 도구의 skills 폴더(또는 지시사항 폴더)에 원하는 스킬의 `SKILL.md` 파일을 복사하세요.

Cursor 예시:
1. `skills/book-report-helper/SKILL.md` 파일을 Cursor의 `.cursor/skills/` 폴더에 복사
2. Cursor 채팅에서: `독후감 써줘`

---

## 7. 스킬별 사용 방법 (10종 전부)

### 스킬 1: 독후감-도우미

**언제 쓰나요?** 책을 읽고 독후감을 써야 할 때

**필요한 정보**:
- `$1`: 책 제목
- `$2`: 느낀 점 한 줄

**예시**:
```
/book-report-helper "어린 왕자" "어른도 아이 마음이 필요하다"
```

**자연어로도 됩니다**:
```
독후감 도와줘. 어린 왕자 읽었고 어른도 아이 마음이 필요하다고 느꼈어.
```

**결과물**: 3문단 독후감 (①읽기 전 기대 ②핵심 내용 ③느낀 점과 배운 것)

---

### 스킬 2: 정중한-메시지

**언제 쓰나요?** 선생님·상사·어른에게 메시지를 보낼 때

**필요한 정보**:
- `$1`: 받는 사람 (예: 담임 선생님)
- `$2`: 용건 한 줄 (예: 결석 사유 전달)

**예시**:
```
/polite-message "담임 선생님" "내일 병원 진료로 결석합니다"
```

**결과물**: 제목 + 정중한 본문 메시지

---

### 스킬 3: 긴글-3줄요약

**언제 쓰나요?** 긴 글을 핵심 3줄로 정리하고 싶을 때

**필요한 정보**:
- `$ARGUMENTS`: 요약할 글 전체 (단일 입력 — `$1`/`$2`가 아니라 뒤에 오는 텍스트 전체가 한 번에 들어갑니다)

**예시**:
```
/long-text-summary [긴 글 전체 붙여넣기]
```

**결과물**: 핵심 내용 3줄 (• 기호로 정리)

---

### 스킬 4: 쉽게-설명해줘

**언제 쓰나요?** 어려운 개념을 누군가에게 쉽게 설명해야 할 때

**필요한 정보**:
- `$1`: 설명할 개념 (예: 광합성)
- `$2`: 듣는 사람 나이 (예: 10살)

**예시**:
```
/explain-simply "광합성" "10살"
```

**결과물**: 비유 1개 + 쉬운 말 3문장 설명

---

### 스킬 5: 공부-계획표

**언제 쓰나요?** 시험 준비나 공부 계획을 세울 때

**필요한 정보**:
- `$1`: 과목·목표 (예: 수학 중간고사 80점)
- `$2`: 기간 (예: 2주)

**예시**:
```
/study-planner "수학 중간고사 80점" "2주"
```

**결과물**: 요일별 공부 계획표 (하루 분량 포함)

---

### 스킬 6: 자기소개-다듬기

**언제 쓰나요?** 자기소개를 써야 하는데 어떻게 쓸지 모를 때

**필요한 정보**:
- `$1`: 내 소개 메모 (짧게라도 OK)
- `$2`: 쓸 곳 (예: 동아리 지원서)

**예시**:
```
/self-intro-polish "이름 김민준, 축구 좋아함, 성실함" "동아리 지원서"
```

**결과물**: 상황에 맞게 다듬어진 자기소개 완성본

---

### 스킬 7: sns-캡션

**언제 쓰나요?** 인스타그램·페이스북 등 SNS에 글을 올릴 때

**필요한 정보**:
- `$1`: 상황 (예: 친구들과 카페에서 공부)
- `$2`: 분위기 (예: 따뜻하고 즐거운)

**예시**:
```
/sns-caption "친구들과 카페에서 공부" "따뜻하고 즐거운"
```

**결과물**: 캡션 2가지 버전 + 해시태그 5개

---

### 스킬 8: 영어-자연스럽게

**언제 쓰나요?** 한국어를 자연스러운 영어로 바꾸고 싶을 때

**필요한 정보**:
- `$ARGUMENTS`: 한국어 문장 (단일 입력 — `$1`/`$2`가 아니라 뒤에 오는 텍스트 전체가 한 번에 들어갑니다)

**예시**:
```
/natural-english "나는 오늘 학교에서 발표를 잘 했어"
```

**결과물**: 자연스러운 영어 문장 + 왜 그렇게 표현하는지 한국어 설명

---

### 스킬 9: 발표-대본

**언제 쓰나요?** 발표 내용을 대본으로 정리해야 할 때

**필요한 정보**:
- `$1`: 발표 주제 (예: 환경 보호의 중요성)
- `$2`: 발표 시간 (예: 5분)

**예시**:
```
/presentation-script "환경 보호의 중요성" "5분"
```

**결과물**: 도입–본론–마무리 대본 (읽는 시간 포함)

---

### 스킬 10: 부탁-사과-메시지

**언제 쓰나요?** 부탁하거나 사과하는 메시지를 써야 할 때

**필요한 정보**:
- `$1`: 상황 (예: 숙제 제출이 늦었음)
- `$2`: 상대와의 관계 (예: 선생님)

**예시**:
```
/request-apology-message "숙제 제출이 하루 늦었음" "선생님"
```

**결과물**: 정중한 버전 + 친근한 버전 2가지

---

## 8. 명령어 전체 목록

### Claude Code / Claude.ai 앱 슬래시 명령어

```
/book-report-helper [책 제목] [느낀 점 한 줄]
/polite-message [받는 사람] [용건 한 줄]
/long-text-summary [요약할 글]
/explain-simply [개념] [듣는 사람 나이]
/study-planner [과목·목표] [기간]
/self-intro-polish [내 소개 메모] [쓸 곳]
/sns-caption [상황] [분위기]
/natural-english [한국어 문장]
/presentation-script [주제] [발표 시간]
/request-apology-message [상황] [상대 관계]
/skill-maker [어떤 스킬을 만들고 싶은지 한 줄 설명]
```

> `skill-maker`는 위 10개와 달리 결과 글을 바로 안 만들고, 새 스킬 파일 자체를 만들어줍니다. 자세한 건 [CONTRIBUTING.md](./CONTRIBUTING.md) 참고.

> **플러그인 정식 설치**(위 "Claude Code — 플러그인 정식 설치" 방법)로 설치했다면, 위 명령어 앞에 `sodam-prompt:`를 붙입니다. 예: `/sodam-prompt:book-report-helper [책 제목] [느낀 점 한 줄]`

### Codex 달러 명령어

```
$book-report-helper [책 제목] [느낀 점]
$polite-message [받는 사람] [용건]
$long-text-summary [글 전체]
$explain-simply [개념] [나이]
$study-planner [목표] [기간]
$self-intro-polish [메모] [용도]
$sns-caption [상황] [분위기]
$natural-english [한국어]
$presentation-script [주제] [시간]
$request-apology-message [상황] [관계]
$skill-maker [만들고 싶은 스킬 설명]
```

### 자연어 (명령어 없이도 됩니다)

스킬을 설치하면 AI가 상황에 맞는 스킬을 자동으로 선택합니다.
```
독후감 써줘. 책은 "해리 포터", 느낀 점은 "용기가 중요해".
선생님께 결석 사유 메시지 써줘.
이 긴 글 3줄로 요약해줘: [글 붙여넣기]
```

---

## 9. 워크플로우 — 내부 작동 흐름

```
사용자 입력
    │
    ▼
AI 도구 (Claude / Codex 등)
    │
    ├─── 슬래시 명령어? ─────────────────────┐
    │    /book-report-helper "어린 왕자" "느낀 점"  │
    │                                       │
    └─── 자연어? ──────────────────────────┐ │
         "독후감 써줘 어린 왕자"             │ │
                                          ▼ ▼
                              SKILL.md 파일 로드
                        (skills/book-report-helper/SKILL.md)
                                          │
                                          ▼
                         빈칸 채우기 ($1=책제목, $2=느낀점)
                                          │
                                          ▼
                        AI 모델이 지시사항 읽고 글 생성
                     (AI 회사 서버에서 처리 — 내 PC 아님)
                                          │
                                          ▼
                              결과 텍스트 반환
                                          │
                                          ▼
                              채팅창에 출력
```

**핵심 포인트**:
- `SKILL.md` 파일은 내 컴퓨터에만 있습니다 (서버 전송 없음)
- AI 모델 처리는 Claude/OpenAI 서버에서 이루어집니다
- 결과물은 채팅창에만 나타납니다 (자동 저장 없음)

---

## 10. 보안 · 데이터 흐름

### 무엇이 AI 서버로 전송되나요?

| 전송되는 것 | 전송 안 되는 것 |
|------------|---------------|
| 내가 입력한 텍스트 (책 제목, 느낀 점 등) | SKILL.md 파일 자체 |
| AI 모델 지시사항 (SKILL.md 내용) | 내 컴퓨터 다른 파일 |
| — | 비밀번호·계정 정보 |

### 개인정보 안전 원칙

- 이 스킬은 이름·전화번호·주소·학교명 등 **개인정보 입력을 유도하지 않습니다**
- 입력란에 개인정보를 넣지 마세요 — AI 서버 처리 기록에 남을 수 있습니다
- 스킬 자체는 코드를 실행하지 않습니다 (순수 텍스트 질문·답변)

### AI 서버 정책

- Claude 사용 시: Anthropic 개인정보 처리방침 적용 (`anthropic.com/privacy`)
- Codex 사용 시: OpenAI 개인정보 처리방침 적용 (`openai.com/privacy`)

### 이 도구 자체의 보안

- 서버 없음, DB 없음, 인증 없음
- 네트워크 통신: AI 도구가 직접 처리 (이 스킬이 별도 통신 없음)
- 스킬 파일은 내 컴퓨터 로컬에만 저장

---

## 11. 아키텍처 — 파일 구조

```
SoDam-Prompt-Eng/                       ← 저장소 루트
│
├── .claude-plugin/                 ← Claude Code 플러그인 정식 등록(2026-07-13)
│   ├── plugin.json                 ← 플러그인 메타데이터
│   └── marketplace.json            ← 로컬 마켓플레이스 정의(본인 여러 기기 설치용)
│
├── skills/                         ← 스킬 10개 폴더 (2026-07-13부터 영문 폴더명)
│   ├── book-report-helper/         ← 독후감-도우미
│   │   └── SKILL.md               ← 스킬 정의 파일 (자연어 자동매칭용)
│   ├── polite-message/             ← 정중한-메시지
│   │   └── SKILL.md
│   ├── long-text-summary/          ← 긴글-3줄요약
│   │   └── SKILL.md
│   ├── explain-simply/             ← 쉽게-설명해줘
│   │   └── SKILL.md
│   ├── study-planner/              ← 공부-계획표
│   │   └── SKILL.md
│   ├── self-intro-polish/          ← 자기소개-다듬기
│   │   └── SKILL.md
│   ├── sns-caption/                ← sns-캡션
│   │   └── SKILL.md
│   ├── natural-english/            ← 영어-자연스럽게
│   │   └── SKILL.md
│   ├── presentation-script/        ← 발표-대본
│   │   └── SKILL.md
│   ├── request-apology-message/    ← 부탁-사과-메시지
│   │   └── SKILL.md
│   └── skill-maker/                ← 새 스킬을 대화로 만들어주는 메타 스킬 (2026-07-27 추가, 11번째)
│       └── SKILL.md
│
├── commands/                       ← `/sodam-prompt:스킬명` 슬래시 명령어용 (2026-07-18 추가, skills/ 전체와 1:1 대응)
│   ├── book-report-helper.md       ← description만 있는 frontmatter + skills/ 본문과 동일한 내용
│   ├── polite-message.md
│   ├── long-text-summary.md
│   ├── explain-simply.md
│   ├── study-planner.md
│   ├── self-intro-polish.md
│   ├── sns-caption.md
│   ├── natural-english.md
│   ├── presentation-script.md
│   ├── request-apology-message.md
│   └── skill-maker.md
│
├── scripts/                        ← 개발자용 검증 스크립트 (2026-07-27 추가, 의존성 없음)
│   └── verify-skills.mjs           ← 새 스킬의 frontmatter·안전 패턴을 자동 확인
│
├── .github/                        ← GitHub PR 화면용 (2026-07-27 추가, CI 워크플로우는 의도적으로 없음)
│   └── PULL_REQUEST_TEMPLATE.md    ← 기여 시 로컬 검증·안전 체크리스트를 화면에 강제 표시
│
├── README.md / README.html         ← 이 문서 — 한국어 전체 안내서 (md·html 내용 동일)
├── README_EN.md / README_EN.html   ← 영문 전체 안내서
├── GUIDE.md / GUIDE.html           ← 한국어 왕초보 가이드
├── GUIDE_EN.md / GUIDE_EN.html     ← 영문 왕초보 가이드
├── CONTRIBUTING.md                 ← 새 스킬 기여 절차·안전 기준 (2026-07-27 추가)
├── CHECKPOINT.md                   ← 개발 진행 상태 기록 (유지보수용, 최종 사용자에겐 불필요)
├── P4_검수_가이드.md               ← 사람 검수용 체크리스트
├── PROMPTFOO_로컬_가이드.md         ← 로컬 자동 검증 실행 안내 (개발자용, 선택사항)
├── promptfooconfig.yaml            ← 스킬별 로컬 검증 설정 (CI 없음, $0 원칙 유지)
├── promptfoo-skill-prompt.js       ← 검증용 SKILL.md 로더 (실제 파일을 그대로 읽음, 사본 없음)
├── LICENSE                         ← Apache-2.0 라이선스
├── NOTICE                          ← 저작권 고지
└── .gitignore                      ← git 제외 목록
```

### SKILL.md 파일 구조

```
---
name: book-report-helper            ← 스킬 이름(폴더명과 동일해야 함)
description: 언제 사용하는지 설명     ← AI가 자동 선택할 때 읽는 부분
argument-hint: [책 제목] [느낀 점]   ← 입력 힌트
---

[AI 지시사항 본문]                   ← AI가 실행할 내용

$1 = 첫 번째 입력값 (책 제목)
$2 = 두 번째 입력값 (느낀 점)
```

---

## 12. 파일 · 문서 위치

### 설치 후 스킬 파일 위치

| 플랫폼 | 설치 경로 |
|--------|-----------|
| Claude Code (Windows) | `C:\Users\사용자명\.claude\skills\` |
| Claude Code (Mac) | `~/.claude/skills/` |
| Claude Code (Linux) | `~/.claude/skills/` |
| Codex | `~/.codex/skills/` |
| Claude.ai 앱 | 클라우드 저장 (로컬 없음) |

### 이 저장소 파일 위치

| 파일 | 설명 |
|------|------|
| `skills/*/SKILL.md` | 스킬 정의 파일 (핵심, 자연어 자동매칭용) |
| `commands/*.md` | `/sodam-prompt:스킬명` 슬래시 명령어 등록용(2026-07-18 추가, `skills/`와 내용 동일) |
| `.claude-plugin/plugin.json` · `marketplace.json` | Claude Code 플러그인·마켓플레이스 등록 정보 |
| `README.md` / `README.html` | 한국어 전체 가이드 (이 파일, md·html 내용 동일) |
| `README_EN.md` / `README_EN.html` | 영문 전체 가이드 |
| `GUIDE.md` / `GUIDE.html` | 한국어 왕초보 가이드 |
| `GUIDE_EN.md` / `GUIDE_EN.html` | 영문 왕초보 가이드 |
| `CONTRIBUTING.md` | 새 스킬 기여 절차·안전 기준(2026-07-27 추가) |
| `scripts/verify-skills.mjs` | 새 스킬 구조·안전 패턴 자동 검증(개발자용, 의존성 없음) |
| `.github/PULL_REQUEST_TEMPLATE.md` | 기여 PR 작성 시 자동으로 뜨는 체크리스트 |
| `CHECKPOINT.md` | 개발 진행 상태 기록 (유지보수용, 최종 사용자는 몰라도 됨) |
| `P4_검수_가이드.md` | 사람 검수용 체크리스트 |
| `PROMPTFOO_로컬_가이드.md` | 로컬 자동 검증 실행 안내 (개발자용, 선택사항) |
| `promptfooconfig.yaml` · `promptfoo-skill-prompt.js` | 로컬 자동 검증 설정·스크립트 (개발자용, 선택사항) |
| `LICENSE` | Apache-2.0 전문 |
| `NOTICE` | 저작권 고지 |

---

## 13. 문제 · 오류 대처 방법

### Q1. 슬래시 명령어 `/book-report-helper` 가 나타나지 않아요

**원인**: 스킬 파일이 올바른 위치에 없거나 Claude Code를 재시작해야 함

**해결**:
1. 스킬 파일 위치 확인:
   ```bash
   ls ~/.claude/skills/
   ```
   `book-report-helper` 폴더가 보여야 합니다.

2. 없으면 다시 복사:
   ```bash
   cp -r ./skills/* ~/.claude/skills/
   ```

3. Claude Code 종료 후 재시작:
   ```bash
   claude
   ```

---

### Q2. 자연어로 말했는데 스킬을 안 쓰고 일반 답변만 해요

**원인**: 자연어 매칭은 AI가 상황을 판단합니다. 더 구체적으로 말하면 됩니다.

**해결**: 더 직접적으로 요청하세요:
```
독후감 스킬 써서 독후감 써줘. 책: 어린 왕자, 느낀 점: 어른도 아이 마음이 필요해
```

또는 슬래시 명령어를 직접 쓰세요:
```
/book-report-helper "어린 왕자" "어른도 아이 마음이 필요해"
```

---

### Q3. Claude.ai 앱에서 ZIP 업로드가 안 돼요

**원인**: 파일 형식 또는 크기 문제

**해결**:
1. ZIP 파일이 올바르게 압축되었는지 확인
2. `skills` 폴더만 압축하거나 저장소 전체를 ZIP으로 다운로드해 업로드 시도
3. 브라우저 새로고침 후 재시도
4. 다른 브라우저(크롬→엣지) 시도

---

### Q4. 결과가 이상해요 / 기대와 달라요

**원인**: AI 결과물은 매번 조금씩 달라질 수 있습니다.

**해결**:
1. 더 구체적인 정보를 입력하세요 (짧은 힌트보다 상세한 내용이 좋습니다)
2. 마음에 안 들면 "다시 써줘" 또는 "더 쉽게 써줘" 요청
3. 같은 스킬을 다시 실행하면 다른 버전이 나올 수 있습니다

---

### Q5. `cp: no such file` 오류가 나요

**원인**: 경로가 틀렸거나 `.claude/skills` 폴더가 없음

**해결**:
```bash
# 폴더 먼저 만들기
mkdir -p ~/.claude/skills

# 다시 복사
cp -r ./skills/* ~/.claude/skills/
```

---

### Q6. Windows에서 `cp` 명령어가 안 돼요

**원인**: Windows 기본 터미널(PowerShell/CMD)은 `cp` 대신 `Copy-Item` 사용

**해결 (PowerShell)**:
```powershell
Copy-Item -Recurse .\skills\* $env:USERPROFILE\.claude\skills\
```

또는 파일 탐색기에서 직접 복사:
1. `skills` 폴더 안의 모든 폴더 선택 → Ctrl+C
2. `C:\Users\사용자명\.claude\skills\` 폴더 열기 → Ctrl+V

---

### Q7. 한글 폴더명이 깨져요

**원인**: 터미널 인코딩 문제

**해결**:
```bash
# UTF-8 설정 확인
chcp 65001   # Windows CMD 기준
```
또는 파일 탐색기를 사용해 직접 폴더를 복사하세요.

---

## 14. FAQ — 자주 묻는 질문

**Q: 무료로 쓸 수 있나요?**
A: 이 스킬 파일 자체는 무료(Apache-2.0)입니다. AI 사용 요금은 Claude·OpenAI 등 가입한 서비스의 요금제를 따릅니다. Claude 무료 플랜으로도 사용 가능합니다.

---

**Q: 인터넷이 없어도 되나요?**
A: 아니요. AI 모델이 인터넷(AI 회사 서버)에 연결되어야 합니다. SKILL.md 파일은 로컬에 있지만, 실제 글 생성은 서버에서 이루어집니다.

---

**Q: 스마트폰에서도 쓸 수 있나요?**
A: Claude.ai 앱(웹 버전)은 스마트폰 브라우저에서도 작동합니다. 다만 스킬 업로드는 컴퓨터에서 하는 것이 편합니다.

---

**Q: 10개 중 일부만 설치할 수 있나요?**
A: 네. 원하는 스킬 폴더만 골라서 복사하면 됩니다:
```bash
cp -r ./skills/book-report-helper ~/.claude/skills/
cp -r ./skills/polite-message ~/.claude/skills/
```

---

**Q: 새 스킬을 직접 만들 수 있나요?**
A: 네. `skills/` 폴더에 새 폴더를 만들고 `SKILL.md` 파일을 작성하면 됩니다. 형식은 기존 파일을 참고하세요.

---

**Q: 결과물을 상업적으로 사용해도 되나요?**
A: AI가 생성한 텍스트의 상업적 사용은 각 AI 서비스(Anthropic, OpenAI 등)의 이용약관을 따릅니다. 이 스킬 파일 자체의 수정·배포는 Apache-2.0 조건 하에 상업적으로도 허용됩니다. 자세한 내용은 15장 참조.

---

**Q: 이 스킬이 내 개인 데이터를 학습에 사용하나요?**
A: 이 스킬 파일 자체는 데이터를 수집하지 않습니다. AI 서비스의 학습 데이터 사용 정책은 각 서비스(Anthropic, OpenAI 등)의 정책에 따릅니다.

---

**Q: Windows · Mac · Linux 모두 되나요?**
A: 네. SKILL.md 파일은 텍스트 파일이므로 운영체제 무관합니다. 설치 명령어만 OS에 맞게 쓰면 됩니다.

---

**Q: 스킬을 삭제하고 싶어요**
A: 설치한 폴더를 지우면 됩니다:
```bash
rm -rf ~/.claude/skills/book-report-helper
```
Claude.ai 앱: Customize → Skills → 해당 스킬 → 삭제

---

**Q: 업데이트가 있으면 어떻게 알아요?**
A: GitHub 저장소(`sodam-ai/SoDam-Prompt-Eng`)에서 **Watch** 또는 **Star**를 눌러두면 업데이트 알림을 받을 수 있습니다.

---

**Q: 오류나 개선 사항을 어떻게 알려요?**
A: GitHub Issues 탭에서 새 이슈를 열어주세요. 한국어로 작성해도 됩니다.

---

**Q: 다른 언어(영어, 일본어 등)로도 쓸 수 있나요?**
A: 스킬 본문은 한국어 출력으로 설계되었습니다. 영어 입력에도 반응하지만, 결과는 한국어로 나올 수 있습니다. 다국어 버전은 별도 스킬로 만들어야 합니다.

---

## 15. 법률 · 저작권 · 라이선스 · 상업적 용도

### 라이선스 요약

이 저장소의 모든 스킬 파일 및 문서는 **Apache License 2.0** 으로 배포됩니다.

#### 할 수 있는 것

| 항목 | 설명 |
|------|------|
| 개인 사용 | 제한 없이 사용 |
| 상업적 사용 | 제품·서비스에 포함 가능 |
| 수정 | 스킬 내용 자유롭게 변경 가능 |
| 재배포 | 수정본 포함해 재배포 가능 |
| 서브라이선스 | 조건 내 가능 |

#### 반드시 해야 하는 것

| 항목 | 설명 |
|------|------|
| 저작권 표시 | `Copyright 2026 SoDam AI Studio` 표기 필수 |
| 라이선스 고지 | Apache-2.0 명시 필수 |
| 변경 사항 표시 | 수정했다면 변경 내용 명시 |
| NOTICE 파일 유지 | 배포 시 NOTICE 파일 포함 필수 |

#### 할 수 없는 것 (불허)

| 항목 | 설명 |
|------|------|
| 상표 사용 | "SoDam" 이름·로고 무단 사용 금지 |
| 보증 주장 | 이 소프트웨어가 특정 결과를 보장한다고 허위 주장 금지 |
| 저작자 사칭 | 원 저작자인 척 허위 표기 금지 |

---

### 상업적 사용 상세 안내

**이 스킬 파일(Apache-2.0)을 상업적으로 사용하려면:**

1. 저작권 표시: `Copyright 2026 SoDam AI Studio` 를 어딘가에 명시
2. 라이선스 고지: Apache-2.0 라이선스임을 밝힘
3. NOTICE 파일을 배포물에 포함
4. 수정했다면 "수정된 버전임"을 명시

**AI 생성 결과물(스킬 실행 후 나온 텍스트)의 상업적 사용:**

- Anthropic(Claude) 이용약관: `anthropic.com/legal/consumer-usage-policy`
- OpenAI(Codex) 이용약관: `openai.com/terms`
- 각 서비스 약관에서 AI 출력물의 소유권·상업적 사용을 확인하세요
- **유사 저작물 침해 가능성**: AI가 만든 결과물이 우연히 기존 저작물(책·노래·기사 등)과 비슷하게 나올 가능성을 이 프로젝트가 통제하거나 보장할 수 없습니다. 상업적으로 쓰기 전에 결과물이 실제로 남의 저작물과 겹치지 않는지, 출처 표기가 필요한 내용은 아닌지 사용자가 직접 확인하세요.

---

### 면책 조항

```
이 소프트웨어는 "있는 그대로(AS IS)" 제공됩니다.
명시적이든 묵시적이든 어떠한 보증도 하지 않습니다.
상품성, 특정 목적에의 적합성, 비침해성에 대한 묵시적 보증 포함.

AI가 생성한 결과물의 정확성, 완전성, 적합성을 보장하지 않습니다.
중요한 결정(의료, 법률, 금융 등)에 AI 결과를 그대로 사용하지 마세요.
```

---

### 법률 검토 상태 (엄격 고지)

이 프로젝트는 **아직 정식 법률 자문(변호사 검토)을 받지 않았습니다.** 특히 아래 2가지는 법적으로 확정되지 않은 미해결 사안입니다:

1. **AI 생성물의 저작권 귀속**: 스킬 실행으로 나온 결과물(독후감, 메시지 등)의 저작권이 누구에게 귀속되는지는 국가·서비스 약관마다 다르며 법적으로 아직 불확실한 영역입니다.
2. **"Claude"·"Anthropic"·"Codex"·"OpenAI" 등 명칭 언급**: 이 저장소는 호환성을 설명하기 위한 목적으로만 이들 명칭을 언급하며, 해당 기업과 제휴·후원·보증 관계가 없습니다(NOTICE 파일 참조). 상표 사용 정책은 각 기업의 공식 가이드라인을 별도로 확인하세요.
3. **배포 범위(현재 PRIVATE)**: 이 GitHub 저장소는 현재 **PRIVATE(비공개)**로 유지되고 있으며 제작자 개인 용도로 만들어졌습니다. 위 1·2번 항목은 이 저장소를 PUBLIC으로 전환하거나 별도로 재배포·상업화할 때 반드시 먼저 해소해야 하는 조건이며, 현재의 PRIVATE·개인용 범위에서는 위 미해결 사안이 실제 법적 노출로 이어지지 않습니다.
4. **`skill-maker`로 만든 새 스킬의 저작권**: `skill-maker`(2026-07-27 추가)로 직접 만든 새 스킬 파일의 저작권 귀속, 그리고 그걸 `CONTRIBUTING.md` 절차로 이 저장소에 기여했을 때 어떤 라이선스가 적용되는지는 아직 별도로 명시되어 있지 않은 미해결 사안입니다. 현재는 저장소가 PRIVATE라 실제 기여 사례가 없어 노출로 이어지지 않지만, 공개 전환·외부 기여를 받기 전에 반드시 먼저 정리해야 합니다.

**대규모 상업적 사용, 재배포, 유료 서비스 포함을 계획 중이시라면 반드시 별도로 법률 전문가의 확인을 받으시길 강력히 권장합니다.** 이 문서와 LICENSE/NOTICE 파일은 일반 정보 제공 목적이며 법적 자문을 대체하지 않습니다. (참고용·법적 효력 보장 안 함, 사용자 책임·변호사 확인 권장)

---

### 개인정보 처리

이 소프트웨어 자체는 개인정보를 수집·처리·저장하지 않습니다.
사용자가 AI 서비스(Claude, Codex 등)에 입력한 데이터는 해당 서비스의 개인정보 처리방침을 따릅니다.

---

### 미성년자 보호

- **만 14세 미만**: 보호자의 동의 및 지도 하에 사용 권장
- 스킬은 위험·폭력·성적 내용 생성을 유도하지 않도록 설계
- 실제 출력 모더레이션은 AI 서비스(Claude, Codex)가 처리

---

## 16. 연락처 · 저작권 고지

```
Copyright 2026 SoDam AI Studio

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at:

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

새 스킬을 추가하고 싶다면 [CONTRIBUTING.md](./CONTRIBUTING.md)를 참고하세요.

---

## 17. 업데이트 내역

<details open>
<summary><strong>2026-07-27 — Phase 3 기여 인프라 + skill-maker(11번째 스킬) 추가 (클릭해서 펼치기)</strong></summary>

- 새 스킬을 안전하게 추가할 수 있도록 `CONTRIBUTING.md`(기여 절차·안전 기준)와 `scripts/verify-skills.mjs`(frontmatter·변수·SEC-A1~A4 안전 패턴 자동 검증, 의존성 없음)를 추가
- `.github/PULL_REQUEST_TEMPLATE.md` 추가 — PR 작성 시 로컬 검증·안전 체크리스트를 화면에서 바로 확인하도록 강제
- **`skill-maker` 스킬 신설(11번째)** — 특정 주제를 미리 정해두는 대신, 사용자가 원하는 스킬을 대화로 함께 설계해 즉석에서 만들 수 있는 메타 스킬. "새 스킬 만들고 싶어"라고 말하면 사용
- `.github/workflows/`는 의도적으로 추가하지 않음 — 이 저장소는 서버·CI 비용 $0을 유지하는 것이 핵심 원칙(NFR-비용1·NFR-키1)

</details>

<details>
<summary><strong>2026-07-18 — commands/ 폴더 추가로 `sodam-prompt:` 슬래시 접두사 지원 + 로더 결함 수정 (클릭해서 펼치기)</strong></summary>

- Claude Code 공식 제한([anthropics/claude-code#41842](https://github.com/anthropics/claude-code/issues/41842)) 때문에 `skills/` 폴더만으로는 `/sodam-prompt:책이름` 같은 저장소 이름이 붙는 형태로 슬래시 명령어가 등록되지 않는 문제를 확인, `commands/` 폴더(스킬 10개와 1:1 대응, `skills/`와 본문 동일)를 추가해 해결
- 새 세션에서 두 차례(1차: `/plugin install` 직후, 2차: main 병합·push 이후 재설치) 실사용 재현으로 10개 스킬 전부 `/sodam-prompt:` 형식으로 정확히 표시됨을 화면 캡처로 확인
- `promptfoo-skill-prompt.js`(로컬 검증 도구)에서 사용자 입력값에 우연히 "$1"·"$2" 글자가 포함되면 정상적으로 만들어진 결과를 오탐으로 실패 처리하던 결함을 발견·수정, 회귀 테스트 17건(정상 10·예외 2·잘못된 입력 2·경계값 3) 전부 통과 확인 — 이 도구는 로컬 개발자 검증용이라 일반 사용자가 실제로 스킬을 쓰는 경로에는 영향 없음
- 이 README·GUIDE 문서들을 실제 파일 구조(`commands/` 폴더 반영)와 다시 대조해 누락 없이 갱신

</details>

<details>
<summary><strong>2026-07-14~15 — 실행테스트 10/10 완료 + 사람 검수 통과 + Phase 1.5 로컬 검증 체계 구축 (클릭해서 펼치기)</strong></summary>

- 나머지 6개 스킬(polite-message·explain-simply·study-planner·self-intro-polish·natural-english·presentation-script)을 실제 AI 모델로 추가 실행해 **10개 스킬 전부 명세와 일치하는 출력**을 확인(실행테스트 10/10 완료)
- 개인정보 유도·시스템 프롬프트 탈취·과장광고 유도 공격 테스트를 3개 스킬(book-report-helper·natural-english·presentation-script)에서 수행, 전부 방어 성공
- 바로 아래 2026-07-13 항목에서 "아직 남은 것"으로 남겨뒀던 사람 검수(자연어 자동매칭)를 **사용자 본인이 실사용하며 직접 확인 완료** — 이 저장소는 PRIVATE(본인 전용) 도구로 계속 사용 중이며, 이는 배포 범위를 뜻할 뿐 품질 기준을 낮춘다는 뜻은 아님
- `promptfooconfig.yaml`·`promptfoo-skill-prompt.js`·`PROMPTFOO_로컬_가이드.md`를 추가해 **로컬 전용(CI 없음, API 키는 사용자 본인 것만 사용)** 자동 검증 체계 구축 — 이 저장소의 "운영 비용 $0·AI 키 관리 없음" 원칙을 지키기 위해 GitHub Actions 자동화는 의도적으로 만들지 않음
- 문서(`CHECKPOINT.md`·이 README 포함) 간 서술이 실제 코드 상태와 어긋나지 않는지 재점검하고 정정

</details>

<details>
<summary><strong>2026-07-13 — 플러그인 정식 등록 + 스킬명 영문 전환 + 문서 정합·검증 (클릭해서 펼치기)</strong></summary>

- `.claude-plugin/plugin.json`·`marketplace.json`을 추가해 Claude Code 공식 플러그인으로 정식 등록(이전에는 자연어 자동매칭이 실사용 테스트에서 10/10 실패 — 원인은 정식 등록 누락으로 확인)
- 스킬 폴더 10개를 한글 이름에서 영문 슬러그로 전환(예: `독후감-도우미` → `book-report-helper`) — 실사용 중 관찰된 스킬명 인코딩 손상(`sns---`) 문제 대응
- PRD 설계 문서 5개, `CHECKPOINT.md`, 이 문서를 포함한 안내 문서 전체를 실제 코드 상태와 일치하도록 정정(한글 폴더명 잔재·낡은 완료 상태 등)
- 스킬 4개(book-report-helper·long-text-summary·request-apology-message·sns-caption)를 실제 AI 모델로 실행해 명세 일치 확인, 개인정보 유도·시스템 프롬프트 탈취·과장광고 유도 공격에 대한 방어 테스트 통과(나머지 6개는 정적 점검만 완료, 실행 테스트는 미실행)
- OWASP ASVS 기준 보안 점검 수행 — 시크릿 노출 0건(작업트리+전체 커밋 히스토리 확인), 취약점 0건
- **아직 남은 것**: Claude Code/Claude.ai 앱에서 자연어로 스킬이 실제로 자동 호출되는지는 이 시점까지 사람이 직접 새 세션에서 확인하지 않은 상태입니다 — 구조적으로 AI가 스스로 검증할 수 없는 유일한 항목입니다.

</details>

<details>
<summary><strong>2026-07-11 — 전환 마무리 정리 (클릭해서 펼치기)</strong></summary>

- Next.js+Supabase 웹앱 방향을 완전히 정리(git 추적 해제, 디스크는 보존)
- 저장소명을 `SoDam-Prompt-Eng`로 통일 (문서 전체 반영)
- 스킬 10개 정적 QA 수행 — 명세 이탈 3건 발견·수정(단일 입력 변수 표기, 개인정보 안내 누락, 계획표 출력 상한)
- README에 "공식 출처만 신뢰" 설치 안전 경고 + "무코드(★Safe)" 배지 추가
- `P4_검수_가이드.md`(사람 검수용 50항목 체크리스트) 신설
- `GUIDE.md`/`GUIDE_EN.md`(왕초보 가이드, MD+HTML, 한/영) 신설
- lint·타입체크·프로덕션 빌드 전부 통과 확인(종료코드 0), 민감정보 노출 0건 확인

</details>

<details>
<summary><strong>2026-06-29 — 스킬 10개 첫 공개</strong></summary>

- 독후감-도우미·정중한-메시지·긴글-3줄요약·쉽게-설명해줘·공부-계획표·자기소개-다듬기·sns-캡션·영어-자연스럽게·발표-대본·부탁-사과-메시지 10개 스킬 최초 공개
- Apache-2.0 라이선스로 배포, LICENSE·NOTICE 파일 추가</details>

> 이후 업데이트는 이 섹션에 계속 추가됩니다.

**문의 · 버그 리포트**: GitHub Issues (`sodam-ai/SoDam-Prompt-Eng`)
**이메일**: 저장소 Issues 탭을 우선 이용해 주세요

---

*SoDam Prompt — SoDam 6-Engine의 1단계. 가장 쉬운 AI 글쓰기 첫 입구.*
*Prompt → Context → Loop → Harness → Agentic (+ Reverse)*
