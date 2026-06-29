# SoDam 학생 도우미 (SoDam-Prompt-Eng)

초·중·고 학생을 위한 **AI 글쓰기 도우미 10종** Claude Code 플러그인입니다.
**슬래시 커맨드**와 **자연어**, 두 가지 방식 모두 지원합니다.

## 설치

Claude Code 안에서 순서대로 입력하세요:

```
/plugin marketplace add sodam-ai/SoDam-Prompt-Eng
/plugin install sodam-student@sodam-marketplace
```

설치 후 Claude Code를 완전히 닫았다 다시 엽니다.

## 도우미 10종

| 커맨드 | 하는 일 |
|--------|---------|
| `/sodam-student:dokhugam-doumi` | 독후감 3문단 |
| `/sodam-student:english-natural` | 자연스러운 영작 + 이유 설명 |
| `/sodam-student:gingeul-3line-summary` | 긴 글 핵심 3줄 요약 |
| `/sodam-student:jeongjunghan-message` | 정중한 한국어 메시지 |
| `/sodam-student:presentation-script` | 발표 대본 (도입-본론-마무리) |
| `/sodam-student:request-apology-msg` | 부탁/사과 메시지 2가지 톤 |
| `/sodam-student:self-intro-refine` | 자기소개 글 다듬기 |
| `/sodam-student:shibge-explain` | 어려운 개념 비유로 쉽게 설명 |
| `/sodam-student:sns-caption` | SNS 캡션 2개 + 해시태그 |
| `/sodam-student:study-plan` | 요일별 공부 계획표 |

## 사용 예시

**슬래시 방식:**
```
/sodam-student:dokhugam-doumi "어린 왕자" "친구가 그리워졌어"
```

**자연어 방식:**
```
어린 왕자 읽었는데 독후감 써줘
```

## 안전·개인정보

- 모든 프롬프트는 이름·학교·전화번호 등 개인정보를 출력에 넣지 않도록 설계되었습니다.
- 광고·과장·허위 내용을 만들지 않습니다.

## 라이선스

Apache-2.0