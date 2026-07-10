# RESEARCH_SOURCES

아래는 **Claude Code, Codex 등 AI 코딩 도구에서 설치/사용/적용 가능한 Prompt Engineering 관련 사이트·주소·자료·문서**를 정리한 목록입니다.

지금까지 정리한 흐름으로 보면, **Prompt Engineering → Context Engineering → Loop Engineering → Harness Engineering → Agentic Engineering** 순서로 확장됩니다.
Prompt Engineering은 가장 기본 단계이고, 핵심은 AI에게 **무엇을 할지, 어떤 기준으로 할지, 어떤 형식으로 결과를 낼지, 어떤 예시를 따를지**를 명확히 주는 것입니다. OpenAI는 Prompt Engineering을 “모델이 요구사항에 맞는 콘텐츠를 일관되게 생성하도록 효과적인 지시를 작성하는 과정”으로 설명하고, Anthropic은 Claude용 프롬프트에서 명확성, 예시, XML 구조, thinking, agentic system 구성을 강조합니다. ([OpenAI 개발자](https://developers.openai.com/api/docs/guides/prompt-engineering?utm_source=chatgpt.com))

## 1. Prompt Engineering 공식 핵심 문서

```text
https://developers.openai.com/api/docs/guides/prompt-engineering
https://developers.openai.com/api/docs/guides/prompt-guidance
https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api

https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering
https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/advanced-prompt-engineering

https://cloud.google.com/discover/what-is-prompt-engineering
```

OpenAI 공식 문서는 prompt를 바꿀 때 테스트와 평가를 같이 구축해야 한다고 설명하고, Microsoft 문서도 좋은 prompt가 항상 일반화되는 것은 아니기 때문에 결과 검증이 필요하다고 강조합니다. ([OpenAI 개발자](https://developers.openai.com/api/docs/guides/prompt-engineering?utm_source=chatgpt.com))

## 2. Codex 전용 Prompt Engineering 문서

```text
https://developers.openai.com/codex/prompting
https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide
https://developers.openai.com/codex/guides/agents-md
https://developers.openai.com/codex/skills
https://developers.openai.com/codex/noninteractive
https://developers.openai.com/codex/config-advanced
https://github.com/openai/codex
```

Codex에서는 프롬프트가 단순 대화가 아니라 **모델 호출 → 파일 읽기 → 수정 → 테스트 → 재시도** 루프 안에서 작동합니다. OpenAI Codex 문서는 prompt를 제출하면 Codex가 모델을 호출하고, 모델 출력에 따라 파일 읽기·수정 같은 작업을 수행하는 loop로 작동한다고 설명합니다. ([OpenAI 개발자](https://developers.openai.com/codex/prompting?utm_source=chatgpt.com))

## 3. Claude / Claude Code 적용 문서

```text
https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
https://code.claude.com/docs/en/best-practices
https://code.claude.com/docs/en/memory
https://code.claude.com/docs/en/context-window
https://code.claude.com/docs/en/skills
https://code.claude.com/docs/en/agent-sdk/slash-commands
https://code.claude.com/docs/ko/sub-agents
https://github.com/anthropics/claude-code
```

Claude Code에서는 프롬프트를 매번 새로 쓰기보다 `CLAUDE.md`, memory, slash commands, skills, subagents로 반복 가능한 지시 체계를 만드는 것이 중요합니다. Anthropic은 Claude 프롬프트에서 명확한 지시, 예시 제공, XML 태그 구조화, agentic system 설계를 다룹니다. ([Claude](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices?utm_source=chatgpt.com))

## 4. Prompt Engineering 대표 학습 사이트

```text
https://www.promptingguide.ai/
https://www.promptingguide.ai/kr
https://github.com/dair-ai/prompt-engineering-guide
https://academy.dair.ai/courses/introduction-prompt-engineering

https://learnprompting.org/
https://github.com/trigaten/Learn_Prompting
```

DAIR.AI의 Prompt Engineering Guide는 프롬프트 엔지니어링, 컨텍스트 엔지니어링, RAG, AI Agents까지 다루는 대표 자료이고, 한국어 페이지도 제공합니다. ([프롬프트 가이드](https://www.promptingguide.ai/?utm_source=chatgpt.com))

## 5. Claude Code / Codex에 설치·적용 가능한 Prompt Skill / Agent Skill

```text
https://github.com/ckelsoe/prompt-architect
https://github.com/VoltAgent/awesome-agent-skills
https://github.com/alirezarezvani/claude-skills
https://github.com/Orchestra-Research/AI-research-SKILLs
https://github.com/anthropics/skills
https://agentskills.io/home
https://cli.github.com/manual/gh_skill_install
```

`prompt-architect`는 prompt를 분석하고 개선하는 Agent Skills 호환 skill이고, `awesome-agent-skills`는 Claude Code, Codex, Gemini CLI, Cursor 등 여러 AI 코딩 에이전트에서 쓸 수 있는 1000개 이상 agent skills 모음입니다. ([GitHub](https://github.com/ckelsoe/prompt-architect?utm_source=chatgpt.com))

## 6. 프롬프트 모음 / 예시 라이브러리

```text
https://github.com/f/awesome-chatgpt-prompts
https://github.com/promptslab/awesome-prompt-engineering
https://github.com/ai-boost/awesome-prompts
https://github.com/dair-ai/prompt-engineering-guide
https://github.com/topics/prompt-collection
```

이쪽은 바로 복붙해서 쓰는 예시도 있지만, 단순 템플릿보다 **왜 이 프롬프트가 작동하는지 구조를 분석하는 용도**로 보는 것이 좋습니다. `awesome-prompts`는 단순 프롬프트 템플릿과 promptfoo, DSPy, Guidance 같은 엔지니어링형 접근을 구분해서 다룹니다. ([GitHub](https://github.com/ai-boost/awesome-prompts?utm_source=chatgpt.com))

## 7. Prompt 평가 / 테스트 / 자동 검증 도구

```text
https://github.com/promptfoo/promptfoo
https://www.promptfoo.dev/docs/intro/
https://github.com/promptfoo/promptfoo-action
https://www.promptfoo.dev/docs/integrations/github-action/

https://developers.openai.com/cookbook
https://developers.openai.com/cookbook/topic/evals
https://developers.openai.com/blog/eval-skills
```

Prompt Engineering을 실전에서 쓰려면 “좋아 보이는 프롬프트”가 아니라 **테스트 가능한 프롬프트**로 관리해야 합니다. `promptfoo`는 prompt, agent, RAG 앱을 평가하고 red teaming할 수 있는 오픈소스 CLI/라이브러리이며, GitHub Action으로 prompt 변경 시 자동 평가를 돌릴 수 있습니다. ([GitHub](https://github.com/promptfoo/promptfoo?utm_source=chatgpt.com))

## 8. Prompt Engineering 연구 / 논문 자료

```text
https://arxiv.org/abs/2302.11382
https://arxiv.org/abs/2402.14837
https://arxiv.org/abs/2311.05661
https://arxiv.org/abs/2504.07357
https://arxiv.org/abs/2509.11295
https://arxiv.org/abs/2601.17584
https://arxiv.org/abs/2307.12980
```

연구 자료로는 prompt pattern catalog, prompting technique 분류, 자동 prompt 개선, Claude Code 기반 prompt-driven development 사례가 유용합니다. 특히 Claude Code로 7,420줄 규모 TUI 프레임워크를 107개 prompt로 만든 사례 연구는 prompt-driven development가 실제 소프트웨어 개발 방법론으로 쓰일 수 있음을 보여줍니다. ([arXiv](https://arxiv.org/abs/2302.11382?utm_source=chatgpt.com))

## 9. Prompt Engineering과 이전 개념 연결 자료

```text
https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
https://addyosmani.com/blog/loop-engineering/
https://addyosmani.com/blog/agent-harness-engineering/
https://addyosmani.com/blog/agentic-engineering/
https://agents.md/
https://modelcontextprotocol.io/docs/getting-started/intro
```

이전까지 정리한 개념과 연결하면, Prompt Engineering은 **한 번의 지시를 잘 쓰는 기술**, Context Engineering은 **AI가 볼 정보를 설계하는 기술**, Loop Engineering은 **반복 실행 구조**, Harness Engineering은 **AI가 안전하게 작동하는 실행 환경**, Agentic Engineering은 **AI 에이전트 기반 개발 운영 방식 전체**입니다. Anthropic도 context engineering을 prompt engineering의 자연스러운 확장으로 설명합니다. ([Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents?utm_source=chatgpt.com))

## 10. Prompt 작성 실전 패턴 참고 자료

```text
https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
https://developers.openai.com/api/docs/guides/prompt-engineering
https://learn.microsoft.com/en-us/azure/foundry/openai/concepts/prompt-engineering
https://www.promptingguide.ai/techniques
https://www.promptingguide.ai/kr/techniques
```

실전 기준으로는 아래 구조가 Claude Code, Codex, ChatGPT, Gemini, Cursor 등에서 가장 무난합니다.

```text
1. 역할
너는 어떤 역할인지

2. 목표
무엇을 완성해야 하는지

3. 배경/맥락
현재 프로젝트, 파일, 상황, 제약

4. 작업 범위
어디까지 하고 어디부터는 하지 말아야 하는지

5. 출력 형식
표, 코드, 단계, 문서, 체크리스트 등

6. 검증 기준
성공 조건, 테스트 기준, 오류 확인 방식

7. 금지사항
하지 말아야 할 행동, 추측 금지, 삭제 금지 등

8. 반복 방식
먼저 분석 → 계획 → 실행 → 검증 → 수정 순서
```

## 11. 한국어로 보기 좋은 주소

```text
https://www.promptingguide.ai/kr
https://learn.microsoft.com/ko-kr/azure/ai-foundry/openai/concepts/prompt-engineering
https://wikidocs.net/365716
https://wikidocs.net/365718
https://wikidocs.net/365720
```

한국어 자료는 Prompting Guide 한국어판과 Microsoft Learn 한국어 문서부터 보면 좋습니다. WikiDocs 쪽은 OpenAI Cookbook/Codex 관련 번역 자료를 빠르게 훑을 때 참고용으로 볼 수 있습니다.

## 12. 조건부 / 주의해서 볼 자료

```text
https://www.reddit.com/r/ClaudeAI/
https://www.reddit.com/r/ClaudeCode/
https://www.reddit.com/r/codex/
https://medium.com/tag/prompt-engineering
https://dev.to/t/promptengineering
```

Reddit, Medium, dev.to는 최신 실사용 팁이 빠르게 올라오지만, 공식 문서와 다를 수 있습니다. 특히 Claude Code/Codex는 모델, 권한, context, skills, agent loop가 자주 바뀌므로 **공식 문서 → GitHub README → 실사용 글** 순서로 검증하는 것이 안전합니다.

## 최종 추천만 압축

```text
https://developers.openai.com/api/docs/guides/prompt-engineering
https://developers.openai.com/api/docs/guides/prompt-guidance
https://developers.openai.com/codex/prompting
https://developers.openai.com/cookbook/examples/gpt-5/codex_prompting_guide
https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview
https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
https://code.claude.com/docs/en/best-practices
https://code.claude.com/docs/en/skills
https://www.promptingguide.ai/
https://www.promptingguide.ai/kr
https://github.com/dair-ai/prompt-engineering-guide
https://github.com/ckelsoe/prompt-architect
https://github.com/VoltAgent/awesome-agent-skills
https://github.com/promptfoo/promptfoo
https://www.promptfoo.dev/docs/intro/
https://arxiv.org/abs/2302.11382
https://arxiv.org/abs/2402.14837
https://arxiv.org/abs/2601.17584
```

## 용도별로 보면 이렇게 보면 됩니다

```text
Prompt Engineering 개념:
https://www.promptingguide.ai/kr

OpenAI 공식 프롬프트:
https://developers.openai.com/api/docs/guides/prompt-engineering

Codex 프롬프트:
https://developers.openai.com/codex/prompting

Claude 공식 프롬프트:
https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices

Claude Code 적용:
https://code.claude.com/docs/en/best-practices
https://code.claude.com/docs/en/skills

설치형 Prompt Skill:
https://github.com/ckelsoe/prompt-architect

공통 Agent Skill:
https://github.com/VoltAgent/awesome-agent-skills

프롬프트 테스트:
https://github.com/promptfoo/promptfoo

GitHub Action 자동 평가:
https://github.com/promptfoo/promptfoo-action

프롬프트 연구:
https://arxiv.org/abs/2302.11382
https://arxiv.org/abs/2402.14837
```

## 검증 요약

1. **웹 검색 반영**: 공식 문서, GitHub, 연구 논문, 실전 도구를 최신 검색 기준으로 확인했습니다.
2. **이전 대화 흐름 반영**: 하네스·루프·에이전트·컨텍스트 엔지니어링과 연결해 Prompt Engineering 위치를 정리했습니다.
3. **Claude Code 적용성 확인**: Claude prompt docs, Claude Code best practices, skills, slash commands, memory/context 관련 문서를 포함했습니다.
4. **Codex 적용성 확인**: Codex prompting, Codex prompting guide, AGENTS.md, skills, noninteractive 관련 문서를 포함했습니다.
5. **설치/사용 가능 자료 포함**: `prompt-architect`, `awesome-agent-skills`, `promptfoo`, `promptfoo-action`처럼 실제 적용 가능한 도구를 포함했습니다.
6. **공식 자료 우선**: OpenAI, Anthropic, Microsoft, Google 공식 자료를 먼저 배치했습니다.
7. **학습 자료 포함**: Prompting Guide, DAIR.AI, Learn Prompting 계열 자료를 포함했습니다.
8. **평가/검증 도구 포함**: 프롬프트를 테스트하고 CI에서 검증하는 promptfoo 계열 자료를 포함했습니다.
9. **주의 자료 분리**: Reddit, Medium, dev.to 같은 비공식 자료는 조건부 참고용으로 분리했습니다.
10. **복사 편의성 반영**: 요청하신 방식대로 URL을 카테고리별 코드블럭으로 정리했습니다.
