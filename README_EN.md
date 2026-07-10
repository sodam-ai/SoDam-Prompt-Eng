# SoDam Prompt — Complete Guide to 10 AI Writing Skills

> A collection of Korean writing tools — just fill in the blanks and AI does the rest.
> Works on Claude Code · Claude.ai App · Codex · Cursor · Gemini CLI.

License: Apache-2.0 | Level: SoDam Prompt (Step 1) | Language: Korean Output

---

## Table of Contents

1. [Overview](#1-overview)
2. [Prerequisites](#2-prerequisites)
3. [Installing Required Programs](#3-installing-required-programs)
4. [Download Instructions](#4-download-instructions)
5. [Quick Start](#5-quick-start)
6. [Running the Skills — Per Platform](#6-running-the-skills--per-platform)
7. [How to Use Each Skill (All 10)](#7-how-to-use-each-skill-all-10)
8. [Full Command Reference](#8-full-command-reference)
9. [Workflow — How It Works Internally](#9-workflow--how-it-works-internally)
10. [Security & Data Flow](#10-security--data-flow)
11. [Architecture — File Structure](#11-architecture--file-structure)
12. [File & Document Locations](#12-file--document-locations)
13. [Troubleshooting](#13-troubleshooting)
14. [FAQ](#14-faq)
15. [Legal · Copyright · License · Commercial Use](#15-legal--copyright--license--commercial-use)
16. [Contact & Copyright Notice](#16-contact--copyright-notice)

---

## 1. Overview

SoDam Prompt is a collection of **10 AI writing skill templates** for students, office workers, and general users.
Each skill = one pre-designed prompt template. Fill in the blanks with your situation, and AI writes the complete text.

| # | Skill Name (Korean) | Input Required | Output |
|---|---------------------|----------------|--------|
| 1 | 독후감-도우미 | Book title, one-line impression | 3-paragraph book report |
| 2 | 정중한-메시지 | Recipient, purpose (one line) | Formal message with subject + body |
| 3 | 긴글-3줄요약 | Full text to summarize | 3-line summary of key points |
| 4 | 쉽게-설명해줘 | Concept, listener's age | Analogy + 3-sentence explanation |
| 5 | 공부-계획표 | Subject/goal, duration | Day-by-day study schedule |
| 6 | 자기소개-다듬기 | Self-intro notes, purpose | Polished self-introduction |
| 7 | sns-캡션 | Situation, mood | 2 caption versions + 5 hashtags |
| 8 | 영어-자연스럽게 | Korean sentence | Natural English + explanation |
| 9 | 발표-대본 | Topic, presentation duration | Intro–body–conclusion script |
| 10 | 부탁-사과-메시지 | Situation, relationship | Formal + casual versions |

**Cost**: $0 (AI usage fees depend on your Claude/Codex plan)
**Server**: None (operates only between your computer and the AI provider's server)
**Code Execution**: None (pure text question and answer only)

---

## 2. Prerequisites

You only need **one** of the following — not all of them.

| Method | What You Need | Difficulty |
|--------|---------------|------------|
| Claude.ai App (easiest) | Claude.ai account (free) | ★☆☆ |
| Claude Code | Node.js 18+ · Claude Code CLI | ★★☆ |
| Codex | Codex account · Codex CLI | ★★☆ |
| Cursor · Gemini CLI, etc. | Respective tool installed | ★★☆ |

### Creating an Account (Claude.ai method)

1. Open a web browser (Chrome, Edge, etc.)
2. Type `claude.ai` in the address bar and press Enter
3. Click **Sign up** → Enter email address → Set password
4. Verify your email → Sign in

> **Users under 14 must sign up with a parent or guardian.**
> **This tool is designed for users residing in South Korea.**

---

## 3. Installing Required Programs

### Method A — Claude.ai App (No terminal required, easiest)

No additional software needed — **a web browser is all you need.**
→ Skip to Step 4 (Download).

---

### Method B — Claude Code (Developers / Power Users)

**Check if Node.js is already installed**

Windows:
1. Press `Windows key` + `R` → type `cmd` → Enter (a black window opens)
2. Type the following and press Enter:
   ```
   node --version
   ```
3. If `v18.0.0` or higher appears, you're good. If nothing shows, install it.

**Install Node.js (if not present)**

1. Go to `nodejs.org` in your browser
2. Click the **LTS** version download button
3. Double-click the downloaded file → follow the installer → Finish

**Install Claude Code**

In your terminal:
```bash
npm install -g @anthropic-ai/claude-code
```

Verify installation:
```bash
claude --version
```
If a version number appears, installation succeeded.

---

### Method C — Codex (OpenAI Codex users)

Install the Codex CLI from the official Codex site. (Codex account required)

---

## 4. Download Instructions

### Downloading the Skill Files

**Method 1: ZIP Download (easiest)**

1. On this repository page, click the green **Code** button
2. Click **Download ZIP**
3. Extract the ZIP to any folder on your computer
4. A folder named `SoDam-Prompt-Eng-main` or `SoDam-Prompt-Eng-main` will be created

**Method 2: git clone (if git is installed)**

In your terminal:
```bash
git clone https://github.com/sodam-ai/SoDam-Prompt-Eng.git
cd SoDam-Prompt-Eng
```

---

### Before You Install (Safety Check)

- ✅ **No-code (★ Safe)** — All 10 skills in this repository are pure text. No shell commands, program execution, or external tool calls of any kind.
- ✅ **Verify the source** — Only download from the official repository (`sodam-ai/SoDam-Prompt-Eng`). Files from other sources may differ in content.
- ✅ **Preview before installing** — Click any `skills/<name>/SKILL.md` file directly on GitHub to review its contents before you install.

---

## 5. Quick Start

### Start in 5 Minutes with the Claude.ai App

**Step 1**: Log in to `claude.ai` → click your profile icon (top right) → **Customize**

**Step 2**: Click the **Skills** tab → **+ Create skill** or **+ Add skill**

**Step 3**: Compress the extracted folder or just the `skills` folder as a ZIP → upload it

**Step 4**: Toggle the skill to **ON** (blue)

**Step 5**: In the chat window, type naturally:
```
Please write a book report. The book is "The Little Prince" and my impression is "Adults need a child's heart too."
```

AI will automatically use the `독후감-도우미` skill and produce the book report.

---

### Quick Start with Claude Code

**Step 1**: Copy skill files

```bash
# Windows (from your Downloads folder)
cp -r C:\Users\YourName\Downloads\SoDam-Prompt-Eng\skills\* ~/.claude/skills/
```

Mac/Linux:
```bash
cp -r ~/Downloads/SoDam-Prompt-Eng/skills/* ~/.claude/skills/
```

**Step 2**: Launch Claude Code

```bash
claude
```

**Step 3**: Use a slash command

```
/독후감-도우미 "The Little Prince" "Adults need a child's heart too"
```

Or in natural language:
```
Help me write a book report. The book is "Harry Potter" and I felt that courage matters.
```

---

## 6. Running the Skills — Per Platform

### Claude.ai App (Web/App)

**Install**:
1. Log in → Customize → Skills → + Create skill
2. Upload ZIP file → Toggle ON

**Run**:
- Natural language: `Write a book report. "The Little Prince", impression: "growth"`
- Slash command: `/독후감-도우미 "Book Title" "Impression"`

---

### Claude Code (Terminal)

**Install**:
```bash
# Copy entire skills folder
cp -r ./skills/* ~/.claude/skills/

# To install individual skills only
cp -r ./skills/독후감-도우미 ~/.claude/skills/
```

**Run**:
```bash
claude
```
Then in chat:
```
/독후감-도우미 "Book Title" "Impression"
```

---

### Codex

**Install**:
```bash
cp -r ./skills/* ~/.codex/skills/
```

**Run**:
```
$독후감-도우미 "Book Title" "Impression"
```

---

### Cursor · Gemini CLI · Other AI Tools

Copy the desired skill's `SKILL.md` file into the skills folder (or instructions folder) of your respective tool.

Cursor example:
1. Copy `skills/독후감-도우미/SKILL.md` to Cursor's `.cursor/skills/` folder
2. In Cursor chat: `Write a book report`

---

## 7. How to Use Each Skill (All 10)

### Skill 1: 독후감-도우미 (Book Report Helper)

**When to use**: After reading a book and needing to write a book report

**Required input**:
- `$1`: Book title
- `$2`: One-line impression

**Example**:
```
/독후감-도우미 "The Little Prince" "Adults need a child's heart too"
```

**Natural language also works**:
```
Help me with a book report. I read "Harry Potter" and felt that courage is important.
```

**Output**: 3-paragraph report (① Pre-reading expectations ② Key content ③ What I felt and learned)

---

### Skill 2: 정중한-메시지 (Formal Message)

**When to use**: When sending a message to a teacher, supervisor, or elder

**Required input**:
- `$1`: Recipient (e.g., homeroom teacher)
- `$2`: Purpose in one line (e.g., notifying absence for medical appointment)

**Example**:
```
/정중한-메시지 "Homeroom Teacher" "I will be absent tomorrow due to a medical appointment"
```

**Output**: Subject line + formal message body

---

### Skill 3: 긴글-3줄요약 (Long Text 3-Line Summary)

**When to use**: When you want to condense a long text into 3 key points

**Required input**:
- `$1`: Full text to summarize

**Example**:
```
/긴글-3줄요약 [paste full text here]
```

**Output**: 3 key points (formatted with • bullets)

---

### Skill 4: 쉽게-설명해줘 (Explain Simply)

**When to use**: When you need to explain a difficult concept in simple terms

**Required input**:
- `$1`: Concept to explain (e.g., photosynthesis)
- `$2`: Listener's age (e.g., 10 years old)

**Example**:
```
/쉽게-설명해줘 "photosynthesis" "10 years old"
```

**Output**: 1 analogy + 3-sentence plain explanation

---

### Skill 5: 공부-계획표 (Study Schedule)

**When to use**: When preparing for an exam or planning study sessions

**Required input**:
- `$1`: Subject and goal (e.g., Math midterm — score 80)
- `$2`: Duration (e.g., 2 weeks)

**Example**:
```
/공부-계획표 "Math midterm 80 points" "2 weeks"
```

**Output**: Day-by-day study schedule (with daily study amounts)

---

### Skill 6: 자기소개-다듬기 (Self-Introduction Polish)

**When to use**: When you need to write a self-introduction but don't know how

**Required input**:
- `$1`: Personal notes (brief is fine)
- `$2`: Where it will be used (e.g., club application form)

**Example**:
```
/자기소개-다듬기 "Name Kim Minjun, likes soccer, diligent" "Club application"
```

**Output**: Polished self-introduction tailored to the context

---

### Skill 7: sns-캡션 (SNS Caption)

**When to use**: When posting on Instagram, Facebook, or other social media

**Required input**:
- `$1`: Situation (e.g., studying at a café with friends)
- `$2`: Mood (e.g., warm and fun)

**Example**:
```
/sns-캡션 "studying at a café with friends" "warm and fun"
```

**Output**: 2 caption versions + 5 hashtags

---

### Skill 8: 영어-자연스럽게 (Natural English)

**When to use**: When you want to translate Korean into natural English

**Required input**:
- `$1`: Korean sentence

**Example**:
```
/영어-자연스럽게 "나는 오늘 학교에서 발표를 잘 했어"
```

**Output**: Natural English sentence + Korean explanation of why it's phrased that way

---

### Skill 9: 발표-대본 (Presentation Script)

**When to use**: When you need to prepare a script for a presentation

**Required input**:
- `$1`: Presentation topic (e.g., importance of environmental protection)
- `$2`: Presentation duration (e.g., 5 minutes)

**Example**:
```
/발표-대본 "importance of environmental protection" "5 minutes"
```

**Output**: Introduction–body–conclusion script (includes reading time estimate)

---

### Skill 10: 부탁-사과-메시지 (Request/Apology Message)

**When to use**: When you need to write a message asking a favor or apologizing

**Required input**:
- `$1`: Situation (e.g., submitted homework one day late)
- `$2`: Relationship with the recipient (e.g., teacher)

**Example**:
```
/부탁-사과-메시지 "submitted homework one day late" "teacher"
```

**Output**: 2 versions — formal + casual

---

## 8. Full Command Reference

### Claude Code / Claude.ai App Slash Commands

```
/독후감-도우미 [Book Title] [One-line Impression]
/정중한-메시지 [Recipient] [Purpose (one line)]
/긴글-3줄요약 [Full text to summarize]
/쉽게-설명해줘 [Concept] [Listener's Age]
/공부-계획표 [Subject/Goal] [Duration]
/자기소개-다듬기 [Personal Notes] [Where it's used]
/sns-캡션 [Situation] [Mood]
/영어-자연스럽게 [Korean Sentence]
/발표-대본 [Topic] [Presentation Duration]
/부탁-사과-메시지 [Situation] [Relationship]
```

### Codex Dollar Commands

```
$독후감-도우미 [Book Title] [Impression]
$정중한-메시지 [Recipient] [Purpose]
$긴글-3줄요약 [Full text]
$쉽게-설명해줘 [Concept] [Age]
$공부-계획표 [Goal] [Duration]
$자기소개-다듬기 [Notes] [Purpose]
$sns-캡션 [Situation] [Mood]
$영어-자연스럽게 [Korean text]
$발표-대본 [Topic] [Duration]
$부탁-사과-메시지 [Situation] [Relationship]
```

### Natural Language (No commands needed)

Once installed, AI automatically selects the right skill based on context:
```
Write me a book report. The book is "Harry Potter" and I felt courage matters.
Write a message to my teacher explaining my absence tomorrow.
Summarize this long text in 3 lines: [paste text]
```

---

## 9. Workflow — How It Works Internally

```
User Input
    │
    ▼
AI Tool (Claude / Codex / etc.)
    │
    ├─── Slash command? ────────────────────────────┐
    │    /독후감-도우미 "The Little Prince" "grown-ups" │
    │                                               │
    └─── Natural language? ────────────────────────┐│
         "Write me a book report about..."         ││
                                                   ▼▼
                                    SKILL.md file loaded
                             (skills/독후감-도우미/SKILL.md)
                                                   │
                                                   ▼
                              Fill variables ($1=title, $2=impression)
                                                   │
                                                   ▼
                            AI model reads instructions and generates text
                              (processed on AI provider's server, not PC)
                                                   │
                                                   ▼
                                      Return result text
                                                   │
                                                   ▼
                                    Display in chat window
```

**Key points**:
- `SKILL.md` files remain on your computer only (not sent as separate files)
- AI model processing happens on Claude/OpenAI servers
- Output appears in the chat window only (no automatic saving)

---

## 10. Security & Data Flow

### What gets sent to the AI server?

| Sent | Not Sent |
|------|----------|
| Text you typed (book title, impression, etc.) | SKILL.md file itself |
| AI model instructions (SKILL.md content) | Other files on your computer |
| — | Passwords · account info |

### Personal Information Safety Principles

- These skills do **not** prompt you to enter personal info (name, phone, address, school)
- Do not input personal information into the text fields — it may be retained in AI server logs
- Skills do not execute any code (pure text Q&A only)

### AI Server Privacy Policies

- When using Claude: Anthropic Privacy Policy applies (`anthropic.com/privacy`)
- When using Codex: OpenAI Privacy Policy applies (`openai.com/privacy`)

### Security of This Tool Itself

- No server, no database, no authentication required
- Network communication: handled entirely by the AI tool (this skill does not make separate network calls)
- Skill files are stored locally on your computer only

---

## 11. Architecture — File Structure

```
SoDam-Prompt-Eng/                       ← Repository root
│
├── skills/                         ← 10 skill folders
│   ├── 독후감-도우미/
│   │   └── SKILL.md               ← Skill definition file
│   ├── 정중한-메시지/
│   │   └── SKILL.md
│   ├── 긴글-3줄요약/
│   │   └── SKILL.md
│   ├── 쉽게-설명해줘/
│   │   └── SKILL.md
│   ├── 공부-계획표/
│   │   └── SKILL.md
│   ├── 자기소개-다듬기/
│   │   └── SKILL.md
│   ├── sns-캡션/
│   │   └── SKILL.md
│   ├── 영어-자연스럽게/
│   │   └── SKILL.md
│   ├── 발표-대본/
│   │   └── SKILL.md
│   └── 부탁-사과-메시지/
│       └── SKILL.md
│
├── README.md                       ← Korean guide (this file in Korean)
├── README_EN.md                    ← English guide (this file)
├── README.pdf                      ← PDF version (Korean)
├── README_EN.pdf                   ← PDF version (English)
├── LICENSE                         ← Apache-2.0 full text
├── NOTICE                          ← Copyright notice
└── .gitignore                      ← Git exclusion list
```

### SKILL.md File Structure

```
---
name: 독후감-도우미                  ← Skill name
description: When and how to use   ← Read by AI for auto-selection
argument-hint: [Book Title] [Impression]  ← Input hint
---

[AI instruction body]              ← What AI will execute

$1 = First input value (book title)
$2 = Second input value (impression)
```

---

## 12. File & Document Locations

### Skill File Location After Installation

| Platform | Install Path |
|----------|-------------|
| Claude Code (Windows) | `C:\Users\YourName\.claude\skills\` |
| Claude Code (Mac) | `~/.claude/skills/` |
| Claude Code (Linux) | `~/.claude/skills/` |
| Codex | `~/.codex/skills/` |
| Claude.ai App | Cloud storage (no local copy) |

### Repository File Locations

| File | Description |
|------|-------------|
| `skills/*/SKILL.md` | Skill definition files (core) |
| `README.md` | Korean guide |
| `README_EN.md` | English guide (this file) |
| `README.pdf` | PDF — Korean |
| `README_EN.pdf` | PDF — English |
| `LICENSE` | Apache-2.0 full text |
| `NOTICE` | Copyright notice |

---

## 13. Troubleshooting

### Q1. The slash command `/독후감-도우미` doesn't appear

**Cause**: Skill file is not in the correct location, or Claude Code needs to be restarted

**Solution**:
1. Check skill file location:
   ```bash
   ls ~/.claude/skills/
   ```
   You should see a `독후감-도우미` folder.

2. If missing, copy again:
   ```bash
   cp -r ./skills/* ~/.claude/skills/
   ```

3. Close and restart Claude Code:
   ```bash
   claude
   ```

---

### Q2. I typed naturally but AI responded without using the skill

**Cause**: Natural language matching depends on AI's judgment. Try being more specific.

**Solution**: Use more direct phrasing:
```
Use the book report skill to write a report. Book: The Little Prince, impression: adults need a child's heart
```

Or use the slash command directly:
```
/독후감-도우미 "The Little Prince" "adults need a child's heart"
```

---

### Q3. ZIP upload doesn't work in the Claude.ai App

**Cause**: File format or size issue

**Solution**:
1. Confirm the ZIP was compressed correctly
2. Try compressing only the `skills` folder, or download the full repository ZIP and upload
3. Refresh your browser and try again
4. Try a different browser (Chrome → Edge)

---

### Q4. The output is strange / not what I expected

**Cause**: AI outputs vary slightly each time — this is normal.

**Solution**:
1. Provide more specific input (detailed context gives better results)
2. Ask: "Rewrite it" or "Make it simpler"
3. Running the same skill again produces a different version

---

### Q5. I get a `cp: no such file` error

**Cause**: Incorrect path or `.claude/skills` folder doesn't exist

**Solution**:
```bash
# Create the folder first
mkdir -p ~/.claude/skills

# Copy again
cp -r ./skills/* ~/.claude/skills/
```

---

### Q6. `cp` command doesn't work on Windows

**Cause**: Windows (PowerShell/CMD) uses `Copy-Item` instead of `cp`

**Solution (PowerShell)**:
```powershell
Copy-Item -Recurse .\skills\* $env:USERPROFILE\.claude\skills\
```

Or copy directly in File Explorer:
1. Select all folders inside the `skills` folder → Ctrl+C
2. Open `C:\Users\YourName\.claude\skills\` → Ctrl+V

---

### Q7. Korean folder names appear corrupted

**Cause**: Terminal encoding issue

**Solution**:
```bash
# Set UTF-8 encoding
chcp 65001   # Windows CMD
```
Or use File Explorer to copy folders directly.

---

## 14. FAQ

**Q: Is it free?**
A: The skill files themselves are free (Apache-2.0). AI usage fees depend on your Claude or OpenAI plan. You can use it with a Claude free plan.

---

**Q: Does it work without internet?**
A: No. The AI model requires an internet connection (AI provider's server). The SKILL.md files are local, but the text generation happens on the server.

---

**Q: Can I use it on a smartphone?**
A: The Claude.ai web app works on smartphone browsers. However, uploading skills is more convenient from a computer.

---

**Q: Can I install only some of the 10 skills?**
A: Yes. Copy only the skill folders you want:
```bash
cp -r ./skills/독후감-도우미 ~/.claude/skills/
cp -r ./skills/정중한-메시지 ~/.claude/skills/
```

---

**Q: Can I create my own skills?**
A: Yes. Create a new folder inside `skills/` and write a `SKILL.md` file. Refer to existing files for the format.

---

**Q: Can I use the output commercially?**
A: Commercial use of AI-generated text is governed by each AI service's terms (Anthropic, OpenAI, etc.). The skill files themselves can be modified and redistributed commercially under Apache-2.0 conditions. See Section 15 for details.

---

**Q: Does this skill use my data for AI training?**
A: The skill files themselves do not collect any data. AI training data usage policies are determined by each AI service (Anthropic, OpenAI, etc.) according to their own policies.

---

**Q: Does it work on Windows, Mac, and Linux?**
A: Yes. SKILL.md files are plain text, so they work on any operating system. Just use the appropriate installation command for your OS.

---

**Q: How do I remove a skill?**
A: Delete the installed folder:
```bash
rm -rf ~/.claude/skills/독후감-도우미
```
Claude.ai App: Customize → Skills → select skill → Delete

---

**Q: How do I receive update notifications?**
A: Click **Watch** or **Star** on the GitHub repository (`sodam-ai/SoDam-Prompt-Eng`) to receive update alerts.

---

**Q: How do I report errors or suggest improvements?**
A: Open a new issue in the GitHub Issues tab. Korean is welcome.

---

**Q: Can I use it in other languages (English, Japanese, etc.)?**
A: Skills are designed for Korean output. They respond to English input but the result may be in Korean. Multi-language versions would need to be created as separate skills.

---

## 15. Legal · Copyright · License · Commercial Use

### License Summary

All skill files and documentation in this repository are distributed under **Apache License 2.0**.

#### What You CAN Do

| Item | Description |
|------|-------------|
| Personal use | Unlimited use |
| Commercial use | May be included in products and services |
| Modification | Freely change skill content |
| Redistribution | May redistribute including modified versions |
| Sublicensing | Allowed within license conditions |

#### What You MUST Do

| Item | Description |
|------|-------------|
| Copyright notice | Must include `Copyright 2026 SoDam AI Studio` |
| License notice | Must specify Apache-2.0 |
| Indicate changes | If modified, must note what was changed |
| Retain NOTICE file | Must include NOTICE file when distributing |

#### What You CANNOT Do

| Item | Description |
|------|-------------|
| Trademark use | Unauthorized use of "SoDam" name/logo is prohibited |
| Warranty claims | Falsely claiming this software guarantees specific results |
| Impersonation | Falsely presenting yourself as the original author |

---

### Commercial Use — Detailed Guide

**To use these skill files (Apache-2.0) commercially:**

1. Copyright notice: Include `Copyright 2026 SoDam AI Studio` somewhere visible
2. License notice: State that it uses the Apache-2.0 license
3. Include the NOTICE file in your distribution
4. If modified, indicate "This is a modified version"

**Commercial use of AI-generated output (text produced after running a skill):**

- Anthropic (Claude) Terms of Use: `anthropic.com/legal/consumer-usage-policy`
- OpenAI (Codex) Terms of Use: `openai.com/terms`
- Check each service's terms for ownership and commercial use of AI output

---

### Disclaimer

```
This software is provided "AS IS" without warranty of any kind,
express or implied, including but not limited to warranties of
merchantability, fitness for a particular purpose, and non-infringement.

We make no guarantees regarding the accuracy, completeness, or
suitability of AI-generated content.
Do not use AI output directly for critical decisions
(medical, legal, financial, etc.).
```

---

### Personal Information Handling

This software itself does not collect, process, or store personal information.
Data entered by users into AI services (Claude, Codex, etc.) is subject to each service's privacy policy.

---

### Minor Protection

- **Under 14 years old**: Recommended to use under parental consent and guidance
- Skills are designed not to generate dangerous, violent, or sexual content
- Output moderation is handled by the AI service (Claude, Codex)

---

## 16. Contact & Copyright Notice

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

**Bug reports / suggestions**: GitHub Issues (`sodam-ai/SoDam-Prompt-Eng`)
**Email**: Please use the repository Issues tab as the primary contact

---

*SoDam Prompt — Step 1 of the SoDam 6-Engine ladder. The easiest first entry point for AI writing.*
*Prompt → Context → Loop → Harness → Agentic (+ Reverse)*
