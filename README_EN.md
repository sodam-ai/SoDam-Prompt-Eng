# SoDam Prompt — Complete Guide to 10 AI Writing Skills

> A collection of Korean writing tools — just fill in the blanks and AI does the rest.
> Built on the shared `SKILL.md` format so it can be used on Claude Code · Claude.ai App · Codex · Cursor · Gemini CLI. However, **the detailed verification record is mainly for Claude Code**; for Codex there is only a single direct call of one skill — see [2. Prerequisites](#2-prerequisites) for per-tool status.

License: Apache-2.0 | Level: SoDam Prompt (Step 1) | Language: Korean Output | Verified: ✅ Confirmed via personal use (2026-07-15)

---

> 🌸 One of the seven siblings of [SoDam Family](https://github.com/sodam-ai/SoDam-Family).

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
17. [Update History](#17-update-history)

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

**Want a skill that's not here?** Use the `skill-maker` skill to design a new one together in conversation
(e.g. say "I want to make a new skill for planning room cleanups"). See [CONTRIBUTING.md](./CONTRIBUTING.md)
for the full process.

---

## 2. Prerequisites

You only need **one** of the following — not all of them.

| Method | What You Need | Difficulty |
|--------|---------------|------------|
| Claude.ai App (easiest) | Claude.ai account (free) | ★☆☆ |
| Claude Code | Node.js 18+ · Claude Code CLI | ★★☆ |
| Codex | Codex account · Codex CLI | ★★☆ |
| Cursor · Gemini CLI, etc. | Respective tool installed | ★★☆ |

**Per-tool verification status** (stated honestly — only what was actually run is marked "verified")

| Tool | Status | Basis |
|------|--------|-------|
| Claude Code | ✅ Verified | 2026-07-17: natural-language auto-trigger in a fresh session; 2026-07-18: `/sodam-prompt:` slash commands registered after `/plugin install`, confirmed on screen (pre-0.3.0 files). The 0.3.0 files were run on 2026-11-27 in headless mode (Haiku) for all 11 skills; natural-language auto-trigger was checked once with one skill. Not yet checked in the interactive UI |
| Claude.ai App | △ Owner confirmed once (no detailed record) | Recorded as confirmed by the owner's own use on 2026-07-15 (natural-language auto-trigger works), but there is no screen record, and the ZIP install procedure was not separately run |
| Codex | △ One direct call of one skill | 2026-11-27, Codex CLI 0.172.0 on Windows: calling the **already installed** `book-report-helper` with `$name` plus a sentence produced output that followed the 3-paragraph rules, and the session log shows the file under `$HOME/.agents/skills` was loaded automatically. Not verified: recognition after a fresh copy with the README commands, automatic selection from natural language, other skills |
| Cursor · Gemini CLI | ⚠️ Not verified | Designed to work since the format is shared, but not run directly. Check each tool's official docs for the skills folder location |

If you try one and it works (or doesn't), let us know and this table will be updated.

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
4. A folder named `SoDam-Prompt-Eng-main` will be created

> **Claude app users:** **do not upload the ZIP you just downloaded.** Extract it, then zip one skill folder as in [Section 5, Step 3](#5-quick-start).

> **Installing into Claude Code or Codex? Where you open the terminal matters.** Run the install commands from the **folder where you can see `skills` directly**. (After extracting, `SoDam-Prompt-Eng-main` may contain another folder with the same name.)
> - **Windows**: open that folder in File Explorer, type `powershell` in the address bar and press Enter (PowerShell, not `cmd`)
> - **Mac · Linux**: type `cd ` (with a trailing space) in the terminal, drag the folder onto it, press Enter. If dragging does not work, type the path in quotes, for example `cd "/Users/name/Downloads/SoDam-Prompt-Eng-main"`

**Method 2: git clone (if git is installed)**

In your terminal:
```bash
git clone https://github.com/sodam-ai/SoDam-Prompt-Eng.git
cd SoDam-Prompt-Eng
```

---

### Before You Install (Safety Check)

- ✅ **No-code (★ Safe)** — Every skill in this repository (`skills/`) and its slash-command copy (`commands/`, kept 1:1) is pure text. No shell commands, program execution, or external tool calls of any kind.
- ✅ **Verify the source** — Only download from the official repository (`sodam-ai/SoDam-Prompt-Eng`). Files from other sources may differ in content.
- ✅ **Preview before installing** — Click any `skills/<name>/SKILL.md` file directly on GitHub to review its contents before you install.

---

## 5. Quick Start

### Start with the Claude.ai App

**Step 1**: Log in to `claude.ai` → click your profile icon (top right) → **Customize**

**Step 2**: Click the **Skills** tab → **+ Create skill** or **+ Add skill**

**Step 3**: In the extracted folder, open `skills`, compress **one skill folder** you want (for example `book-report-helper`) into a ZIP and upload it.
- Windows: right-click the folder → **Compress to ZIP file** (Windows 10: **Send to → Compressed (zipped) folder**)
- Mac: right-click the folder → **Compress**
- When you open the ZIP, **that skill folder must be at the top level**. Do not rename the folder. Repeat for each additional skill.

> ⚠️ **We have not tested the ZIP upload ourselves (2026-11-26)**: this ZIP shape follows [Anthropic's official help article](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills). The same article says **Code execution** must be enabled in your Claude settings. We have not checked zipping the whole `skills` folder or the whole repository, so we do not recommend it.

**Step 4**: Toggle the skill to **ON** (blue)

**Step 5**: In the chat window, type naturally:
```
Please write a book report. The book is "The Little Prince" and my impression is "Adults need a child's heart too."
```

AI will automatically use the `book-report-helper` (독후감-도우미) skill and produce the book report.

---

### Quick Start with Claude Code

**Step 1**: Copy skill files — open a terminal where the `skills` folder is visible (see [Section 4](#4-download-instructions)), then run **only the block for your terminal**.

> ⚠️ **Skills with the same name are overwritten.** If you edited an installed skill, copy it somewhere else first.

**Windows (PowerShell)**
```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse -Force .\skills\* "$HOME\.claude\skills\"
```

**Mac · Linux · Git Bash**
```bash
mkdir -p ~/.claude/skills
cp -r ./skills/* ~/.claude/skills/
```

**Check the copy** — first make sure the copy showed no error, then run this **from the same folder (where `skills` is visible)**. PowerShell prints `True` and bash prints `OK` only when the installed file matches the source. (It compares one sample skill.) Whether your AI tool detects the skill is checked separately in Steps 2 and 3.
```powershell
(Test-Path .\skills\book-report-helper\SKILL.md) -and (Test-Path "$HOME\.claude\skills\book-report-helper\SKILL.md") -and ((Get-FileHash .\skills\book-report-helper\SKILL.md).Hash -eq (Get-FileHash "$HOME\.claude\skills\book-report-helper\SKILL.md").Hash)
```
```bash
cmp ./skills/book-report-helper/SKILL.md ~/.claude/skills/book-report-helper/SKILL.md && echo OK
```

> **What was checked (2026-11-26)**: these copy commands were run on Windows (PowerShell 5.1 and Git Bash) **against temporary folders**, and the file locations were checked. They were not run on Mac or Linux, and we did not re-check that Claude Code detects skills copied this way.

**Step 2**: Launch Claude Code

```bash
claude
```

**Step 3**: Use a slash command

```
/book-report-helper "The Little Prince" "Adults need a child's heart too"
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
2. Upload a ZIP of **one** skill folder ([Section 5, Step 3](#5-quick-start)) → Toggle ON

**Run**:
- Natural language: `Write a book report. "The Little Prince", impression: "growth"`
- Slash command: `/book-report-helper "Book Title" "Impression"` (we have no record of testing slash calls in the Claude app; if it does not work, use natural language)

---

### Claude Code (Terminal)

**Install** (from where `skills` is visible; run only the block for your terminal; same-named skills are overwritten):

**Windows (PowerShell)**
```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse -Force .\skills\* "$HOME\.claude\skills\"
```

**Mac · Linux · Git Bash**
```bash
mkdir -p ~/.claude/skills
cp -r ./skills/* ~/.claude/skills/
```

To install a single skill, replace `*` in the last line with the folder name (for example `book-report-helper`). **Do not skip the first line that creates the folder.** Copying into a missing folder can finish without an error and still put the file in the wrong place (`skills\SKILL.md`).

**Run**:
```bash
claude
```
Then in chat:
```
/book-report-helper "Book Title" "Impression"
```

> With this method (folder copy) skills are used by name only (`/book-report-helper`). After copying, check in a new session that the command appears. It may collide with a same-named skill from another source.

---

### Claude Code — Official Plugin Install (`sodam-prompt:skill-name` format)

If you want the **repository-name-prefixed format** (`sodam-prompt:book-report-helper`) reliably, use Claude Code's official plugin registration instead of a folder copy. This repository ships `.claude-plugin/plugin.json`, `marketplace.json`, and a `commands/` folder (one file per skill) that can be registered directly.

> **Why a separate `commands/` folder?** Claude Code has a known limitation (official issue [#41842](https://github.com/anthropics/claude-code/issues/41842)) where `skills/` alone does not reliably register as a `sodam-prompt:`-prefixed slash command. The `commands/` folder is the verified way to guarantee this prefix (confirmed working in another SoDam-family plugin).

**Install — register from the GitHub repository** (this repository is PUBLIC, so anyone can register it):
```
/plugin marketplace add sodam-ai/SoDam-Prompt-Eng
/plugin install sodam-prompt@sodam-prompt-marketplace
```

**Install — register from a downloaded local folder** (no GitHub access needed):
```
/plugin marketplace add "full path to your downloaded SoDam-Prompt-Eng folder"
/plugin install sodam-prompt@sodam-prompt-marketplace
```

After installing this way, both slash commands (`/sodam-prompt:book-report-helper`) and natural-language calls ("write a book report") work.

**Update (if you installed earlier)** — run these two lines in a terminal, then restart Claude Code:
```
claude plugin marketplace update sodam-prompt-marketplace
claude plugin update sodam-prompt@sodam-prompt-marketplace
```
**If you registered a downloaded local folder**, replace that folder's contents with the new files first, then run the two lines above.

If you installed by copying folders, download the new files and run the copy commands above again (same-named skills are overwritten).

**Uninstall (for clean reinstall testing)**:
```
/plugin uninstall sodam-prompt@sodam-prompt-marketplace
/plugin marketplace remove sodam-prompt-marketplace
```
From the terminal directly: `claude plugin uninstall sodam-prompt@sodam-prompt-marketplace` (we leave out `--prune`, which also removes auto-installed dependencies that are no longer needed)

To do a clean reinstall, run the two uninstall commands above, then run the install commands again from scratch.

> **Honest note**: the commands above use the exact `name` values already present in this repo's `plugin.json` ("sodam-prompt") and `marketplace.json` ("sodam-prompt-marketplace"), plus Claude Code's official docs for `/plugin uninstall` and `/plugin marketplace remove`. However, actually running this in a fresh session and watching the result on screen is a human-only verification step — please confirm it yourself in a new session, the same way as the "real-usage test" described in this document.

---

### Codex

**Install** (from where `skills` is visible; run only the block for your terminal; same-named skills are overwritten):

**Windows (PowerShell)**
```powershell
New-Item -ItemType Directory -Force "$HOME\.agents\skills" | Out-Null
Copy-Item -Recurse -Force .\skills\* "$HOME\.agents\skills\"
```

**Mac · Linux · Git Bash**
```bash
mkdir -p ~/.agents/skills
cp -r ./skills/* ~/.agents/skills/
```

> **The install location follows the [official OpenAI documentation](https://learn.chatgpt.com/docs/build-skills) (checked 2026-11-26): `$HOME/.agents/skills`.** We have not verified recognition after a fresh install with the commands above (only a direct call of one already installed skill, see the [table in Section 2](#2-prerequisites)). If a new skill does not appear, restart Codex.
> On our test PC, which has hundreds of skills installed, these skills were **not** in the list Codex received at session start, yet calling **one** of them, `book-report-helper`, with `$name` worked. We did not try the others. If a skill is not listed or not picked automatically, try naming it with `$name`.
> You **do not need to delete** files you copied to `~/.codex/skills` using our earlier instructions. On our test PC (Codex CLI 0.172.0), skills from that location also appeared in the list Codex received; we have not checked whether that is default behavior or due to that PC's settings. If skills with the same name are read from two places, both may appear in the list.

**Run**: in Codex, use `/skills` to see the list or type `$` to pick a skill, then describe what you need **in a sentence**.
```
$book-report-helper The book is "The Little Prince" and my impression is "Adults need a child's heart too." Write the book report.
```
> We did not find a way to pass quoted values in order in the official documentation. On 2026-11-27 we tried the sentence form once with `book-report-helper` (with a Korean test sentence, not the exact example above). Other skills were not tried.

---

### Cursor · Gemini CLI · Other AI Tools

Copy the desired skill's `SKILL.md` file into the skills folder (or instructions folder) of your respective tool.

Cursor example:
1. Copy `skills/book-report-helper/SKILL.md` to Cursor's `.cursor/skills/` folder
2. In Cursor chat: `Write a book report`

---

## 7. How to Use Each Skill (All 10)

> For skills with two values, type them in the order listed below. Quotes show where each value starts and ends. If a value is missing, the skill tells the AI to ask instead of making one up.
> **This input style starts with 0.3.0.** In earlier versions, calling `/name "value1" "value2"` shifted the values by one slot in the instructions. If you installed an older copy, see the update steps in Section 6.

### Skill 1: 독후감-도우미 (Book Report Helper)

**When to use**: After reading a book and needing to write a book report

**Required input**:
- First: Book title
- Then: One-line impression

**Example**:
```
/book-report-helper "The Little Prince" "Adults need a child's heart too"
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
- First: Recipient (e.g., homeroom teacher)
- Then: Purpose in one line (e.g., notifying absence for medical appointment)

**Example**:
```
/polite-message "Homeroom Teacher" "I will be absent tomorrow due to a medical appointment"
```

**Output**: Subject line + formal message body

---

### Skill 3: 긴글-3줄요약 (Long Text 3-Line Summary)

**When to use**: When you want to condense a long text into 3 key points

**Required input**:
- Full text to summarize (everything you type after the command is passed as is)

**Example**:
```
/long-text-summary [paste full text here]
```

**Output**: 3 key points (formatted with • bullets)

---

### Skill 4: 쉽게-설명해줘 (Explain Simply)

**When to use**: When you need to explain a difficult concept in simple terms

**Required input**:
- First: Concept to explain (e.g., photosynthesis)
- Then: Listener's age (e.g., 10 years old)

**Example**:
```
/explain-simply "photosynthesis" "10 years old"
```

**Output**: 1 analogy + 3-sentence plain explanation

---

### Skill 5: 공부-계획표 (Study Schedule)

**When to use**: When preparing for an exam or planning study sessions

**Required input**:
- First: Subject and goal (e.g., Math midterm — score 80)
- Then: Duration (e.g., 2 weeks)

**Example**:
```
/study-planner "Math midterm 80 points" "2 weeks"
```

**Output**: Day-by-day study schedule (with daily study amounts)

---

### Skill 6: 자기소개-다듬기 (Self-Introduction Polish)

**When to use**: When you need to write a self-introduction but don't know how

**Required input**:
- First: Personal notes (brief is fine)
- Then: Where it will be used (e.g., club application form)

**Example**:
```
/self-intro-polish "Name Kim Minjun, likes soccer, diligent" "Club application"
```

**Output**: Polished self-introduction tailored to the context

---

### Skill 7: sns-캡션 (SNS Caption)

**When to use**: When posting on Instagram, Facebook, or other social media

**Required input**:
- First: Situation (e.g., studying at a café with friends)
- Then: Mood (e.g., warm and fun)

**Example**:
```
/sns-caption "studying at a café with friends" "warm and fun"
```

**Output**: 2 caption versions + 5 hashtags

---

### Skill 8: 영어-자연스럽게 (Natural English)

**When to use**: When you want to translate Korean into natural English

**Required input**:
- Korean sentence (everything you type after the command is passed as is)

**Example**:
```
/natural-english "나는 오늘 학교에서 발표를 잘 했어"
```

**Output**: Natural English sentence + Korean explanation of why it's phrased that way

---

### Skill 9: 발표-대본 (Presentation Script)

**When to use**: When you need to prepare a script for a presentation

**Required input**:
- First: Presentation topic (e.g., importance of environmental protection)
- Then: Presentation duration (e.g., 5 minutes)

**Example**:
```
/presentation-script "importance of environmental protection" "5 minutes"
```

**Output**: Introduction–body–conclusion script (includes reading time estimate)

---

### Skill 10: 부탁-사과-메시지 (Request/Apology Message)

**When to use**: When you need to write a message asking a favor or apologizing

**Required input**:
- First: Situation (e.g., submitted homework one day late)
- Then: Relationship with the recipient (e.g., teacher)

**Example**:
```
/request-apology-message "submitted homework one day late" "teacher"
```

**Output**: 2 versions — formal + casual

---

## 8. Full Command Reference

### Claude Code / Claude.ai App Slash Commands

```
/book-report-helper [Book Title] [One-line Impression]
/polite-message [Recipient] [Purpose (one line)]
/long-text-summary [Full text to summarize]
/explain-simply [Concept] [Listener's Age]
/study-planner [Subject/Goal] [Duration]
/self-intro-polish [Personal Notes] [Where it's used]
/sns-caption [Situation] [Mood]
/natural-english [Korean Sentence]
/presentation-script [Topic] [Presentation Duration]
/request-apology-message [Situation] [Relationship]
/skill-maker [One-line description of the skill you want]
```

> Unlike the 10 above, `skill-maker` doesn't produce a finished piece of writing — it designs a brand-new skill file for you. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Codex Dollar Commands

> The `[ ]` items below are **the information to provide**. In Codex, write it as a sentence after `$skill-name` (tried once with `book-report-helper` only — see [Codex in Section 6](#codex)).

```
$book-report-helper The book is [Book Title] and my impression is [Impression].
$polite-message The recipient is [Recipient] and the purpose is [Purpose].
$long-text-summary Summarize this text: [Full text]
$explain-simply Explain [Concept] to someone aged [Age].
$study-planner My goal is [Goal] and I have [Duration].
$self-intro-polish My notes are [Notes] and the purpose is [Purpose].
$sns-caption The situation is [Situation] and the mood is [Mood].
$natural-english Put this into natural English: [Korean text]
$presentation-script The topic is [Topic] and the talk lasts [Duration].
$request-apology-message The situation is [Situation] and it is for [Relationship].
$skill-maker I want a skill that does this: [description]
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
    │    /book-report-helper "The Little Prince" "grown-ups" │
    │                                               │
    └─── Natural language? ────────────────────────┐│
         "Write me a book report about..."         ││
                                                   ▼▼
                                    SKILL.md file loaded
                             (skills/book-report-helper/SKILL.md)
                                                   │
                                                   ▼
                              Put your input into the $ARGUMENTS slot
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
- When you use a skill, **the content of `SKILL.md` is sent to the AI provider's server as instructions**. In the Claude app, the ZIP you upload is stored with your account (cloud)
- AI model processing happens on Claude/OpenAI servers
- Output appears in the chat window only (no automatic saving)

---

## 10. Security & Data Flow

### What gets sent to the AI server?

| Sent | Not requested by these skills |
|------|----------|
| Text you typed (book title, impression, etc.) | Reading other files on your computer |
| AI model instructions (SKILL.md content) | Passwords · account info |
| Claude app install: the skill files inside the ZIP you upload | — |

> This table describes **what the skill instructions ask for**. What the AI tool itself reads and stores depends on that tool's settings and privacy policy.

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
- Where skill files are stored: for Claude Code and Codex, the folder on your computer where you installed them; for the Claude app, your account (cloud) after upload

---

## 11. Architecture — File Structure

```
SoDam-Prompt-Eng/                       ← Repository root
│
├── .claude-plugin/                 ← Official Claude Code plugin registration (2026-07-13)
│   ├── plugin.json                 ← Plugin metadata
│   └── marketplace.json            ← Local marketplace definition (for installing on your own devices)
│
├── skills/                         ← 11 skill folders (English slugs since 2026-07-13)
│   ├── book-report-helper/         ← 독후감-도우미
│   │   └── SKILL.md               ← Skill definition file (used for natural-language auto-matching)
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
│   └── skill-maker/                ← Meta-skill that designs new skills with you (added 2026-07-27, 11th)
│       └── SKILL.md
│
├── commands/                       ← For `/sodam-prompt:skill-name` slash commands (added 2026-07-18, 1:1 with all of skills/)
│   ├── book-report-helper.md       ← description-only frontmatter + same body content as skills/
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
├── scripts/                        ← Developer verification scripts (added 2026-07-27, no dependencies)
│   └── verify-skills.mjs           ← Automatically checks new skills' frontmatter and safety patterns
│
├── .github/                        ← For the GitHub PR screen (added 2026-07-27, no CI workflow by design)
│   └── PULL_REQUEST_TEMPLATE.md    ← Forces the local-verification/safety checklist onto the PR screen
│
├── README.md / README.html         ← Korean full guide (md·html identical content), includes beginner guidance
├── README_EN.md / README_EN.html   ← English full guide (this file)
├── CONTRIBUTING.md                 ← New-skill contribution process and safety requirements (added 2026-07-27)
├── CHECKPOINT.md                   ← Development progress log (maintainer-facing, not needed by end users)
├── P4_검수_가이드.md               ← Human-verification checklist
├── PROMPTFOO_로컬_가이드.md         ← Local automated-verification instructions (developer-facing, optional)
├── promptfooconfig.yaml            ← Local verification config for all skills (no CI, keeps $0 principle)
├── promptfoo-skill-prompt.js       ← Verification loader (reads the real SKILL.md files directly, no copy)
├── LICENSE                         ← Apache-2.0 full text
├── NOTICE                          ← Copyright notice
└── .gitignore                      ← Git exclusion list
```

### SKILL.md File Structure

```
---
name: book-report-helper            ← Skill name (must match folder name)
description: When and how to use   ← Read by AI for auto-selection
---

[AI instruction body]              ← What AI will execute

$ARGUMENTS = everything you typed (exactly once in the body)
             List the items to find below it, e.g. "book title · impression"
```

> Numbered placeholders such as `$1` and `$2` are not used: Claude Code counts from 0, so `$1` is the second value. Do not add an `argument-hint` line either; the Claude app upload format does not allow it.

---

## 12. File & Document Locations

### Skill File Location After Installation

| Platform | Install Path |
|----------|-------------|
| Claude Code (Windows) | `C:\Users\YourName\.claude\skills\` |
| Claude Code (Mac) | `~/.claude/skills/` |
| Claude Code (Linux) | `~/.claude/skills/` |
| Codex | `~/.agents/skills/` |
| Claude.ai App | Cloud storage (no local copy) |

### Repository File Locations

| File | Description |
|------|-------------|
| `skills/*/SKILL.md` | Skill definition files (core, used for natural-language auto-matching) |
| `commands/*.md` | Used to register `/sodam-prompt:skill-name` slash commands (added 2026-07-18, same content as `skills/`) |
| `.claude-plugin/plugin.json` · `marketplace.json` | Claude Code plugin/marketplace registration |
| `README.md` / `README.html` | Korean full guide (md·html identical content) |
| `README_EN.md` / `README_EN.html` | English full guide (this file) |
| `CONTRIBUTING.md` | New-skill contribution process and safety requirements (added 2026-07-27) |
| `scripts/verify-skills.mjs` | Automated structure/safety check for new skills (developer-facing, no dependencies) |
| `.github/PULL_REQUEST_TEMPLATE.md` | Checklist that auto-populates the PR screen |
| `CHECKPOINT.md` | Development progress log (maintainer-facing, not needed by end users) |
| `P4_검수_가이드.md` | Human-verification checklist |
| `PROMPTFOO_로컬_가이드.md` | Local automated-verification instructions (developer-facing, optional) |
| `promptfooconfig.yaml` · `promptfoo-skill-prompt.js` | Local verification config/script (developer-facing, optional) |
| `LICENSE` | Apache-2.0 full text |
| `NOTICE` | Copyright notice |

---

## 13. Troubleshooting

### Q1. The slash command `/book-report-helper` doesn't appear

**Cause**: Skill file is not in the correct location, or Claude Code needs to be restarted

**Solution**:
1. Check skill file location:
   ```bash
   ls ~/.claude/skills/
   ```
   You should see a `book-report-helper` folder.

2. If only one skill is missing, use the **single-skill** commands in the [FAQ](#14-faq); if all are missing, use [Section 5, Step 1](#quick-start-with-claude-code) (include the line that creates the folder). A full copy overwrites every same-named skill.

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
/book-report-helper "The Little Prince" "adults need a child's heart"
```

---

### Q3. ZIP upload doesn't work in the Claude.ai App

**Cause**: File format or size issue

**Solution**:
1. Open the ZIP and confirm that **one skill folder** (for example `book-report-helper`) is at the top level with `SKILL.md` inside ([Section 5, Step 3](#5-quick-start) — based on the official help article; we have not tested the upload)
2. Confirm that **Code execution** is enabled in your Claude settings
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

### Q5. I get `cp: no such file` or `is not a directory`, or I copied but the skill is missing

**Cause**: (1) the command ran from a place where `skills` is not visible, or (2) the target folder (`.claude/skills`) was not created before copying. Case (2) can finish **without any error** and still put files in the wrong place.

**Solution**: open the terminal in the right folder ([Section 4](#4-download-instructions)), then run both lines in [Section 5, Step 1](#quick-start-with-claude-code) in order.

**Look for a bad copy**: the correct location is `.claude/skills/skill-name/SKILL.md`. A `SKILL.md` file **directly inside** `.claude/skills` may be left over from a bad copy. Even if its content matches a skill from this repository, that alone does not prove it was misplaced. **Do not delete it; move it to a folder outside `.claude`** and check the installation again.

---

### Q6. The install commands don't work on Windows

**Cause**: they do not work in Command Prompt (`cmd`). Also, putting a Windows path such as `C:\...` into a bash command breaks it, because bash removes the `\`.

**Solution**: use **PowerShell**.
```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse -Force .\skills\* "$HOME\.claude\skills\"
```

Or copy directly in File Explorer:
1. Select all folders inside the `skills` folder → Ctrl+C
2. Open `C:\Users\YourName\.claude\skills\` (create the `skills` folder if it is missing) → Ctrl+V

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
A: Yes. Copy only the skill folders you want, from **where the `skills` folder is visible** ([Section 4](#4-download-instructions)).

> ⚠️ A skill with the same name is overwritten. Copy any skill you edited somewhere else first.

**Windows (PowerShell)**
```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills" | Out-Null
Copy-Item -Recurse -Force .\skills\book-report-helper "$HOME\.claude\skills\"
```

**Mac · Linux · Git Bash**
```bash
mkdir -p ~/.claude/skills
cp -r ./skills/book-report-helper ~/.claude/skills/
```

For another skill, change `book-report-helper` to its folder name and run the last line again.

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
A: SKILL.md files are plain text, so the files themselves do not depend on the operating system. However, **the install copy commands were only tested on Windows (PowerShell 5.1 and Git Bash) with temporary folders**; they have not been checked on Mac or Linux.

---

**Q: How do I remove a skill?**
A: Delete **only that skill's folder**. Your own edits are deleted too and do not go to the recycle bin, so check the folder name and contents first. **If you installed into Codex using our earlier instructions, the copy may be in `~/.codex/skills`, so find where it actually is before deleting.** The commands below are for **Claude Code**; for Codex, change `.claude` to `.agents`. If the folder does not exist, you will see an error.

Windows (PowerShell):
```powershell
Remove-Item -Recurse "$HOME\.claude\skills\book-report-helper"
```
Mac · Linux · Git Bash:
```bash
rm -r ~/.claude/skills/book-report-helper
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
- **Risk of resembling existing works**: This project cannot control or guarantee that AI output won't accidentally resemble an existing copyrighted work (a book, song, article, etc.). Before commercial use, check for yourself whether the output actually overlaps with someone else's work and whether it needs attribution.

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

### Legal Review Status (Strict Disclosure)

This project **has not yet undergone formal legal review (attorney review).** Two items in particular remain legally unresolved:

1. **Copyright ownership of AI-generated output**: Who owns the copyright to text produced by running a skill (book reports, messages, etc.) varies by jurisdiction and by each AI service's terms, and remains a legally uncertain area.
2. **References to "Claude," "Anthropic," "Codex," "OpenAI," etc.**: This repository mentions these names solely to describe compatibility. There is no affiliation, sponsorship, or endorsement relationship with these companies (see the NOTICE file). Check each company's official trademark guidelines separately for their name/logo usage policy.
3. **Distribution scope (currently PUBLIC)**: This GitHub repository is currently **PUBLIC** (confirmed via GitHub on 2026-11-26; the creator decided to keep it public). Items 1 and 2 above are therefore no longer "conditions to resolve before going public" — they are **open issues in a repository that is already public**. The name-related part is only mitigated by the non-affiliation notice in NOTICE; it does not replace an attorney's review, and no attorney review has been obtained yet. Anyone planning redistribution or commercial use needs to check separately, as described below.
4. **Copyright of skills created with `skill-maker`**: Who owns a new skill file created with `skill-maker` (added 2026-07-27), and what license would apply if it were contributed back to this repository via the `CONTRIBUTING.md` process, is not yet explicitly defined. Because the repository is public and can receive outside contributions, this must be resolved before any contribution is actually accepted.

**If you plan large-scale commercial use, redistribution, or inclusion in a paid service, we strongly recommend obtaining independent legal counsel.** This document and the LICENSE/NOTICE files are provided for general informational purposes and do not substitute for legal advice. (For reference only — no legal guarantee is made; you are responsible for verifying with an attorney.)

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

Want to contribute a new skill? See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## 17. Update History

<details open>
<summary><strong>2026-11-27 — 0.3.0: input fix + upload readiness + stricter checks (click to expand)</strong></summary>

- **Fixed shifted input values**: the 8 two-value skills used `$1` and `$2`, but Claude Code counts from 0, so `/name "value1" "value2"` put the second value in the first slot and left `$2` as literal text (reproduced). The test model (Haiku) sometimes recovered the values from the typed command, so results were not always wrong. Skills now take the whole input in one `$ARGUMENTS` slot and look for the items in it. If a value is missing, they are told to look in the conversation or ask. The 2026-07-27 note that substitution simulated fine is not valid evidence, because that loader counted from 1.
- **Removed `argument-hint`**: it is not among the front-matter keys the Claude app upload format allows (checked against the official docs and Anthropic's local validator; an actual app upload has not been tried).
- **Stricter checks**: `verify-skills.mjs` used to pass malformed front matter such as an unclosed quote, an empty `description`, a quoted `argument-hint`, command files with no matching skill, and a misspelled `$ARGUMENTS`; it now rejects them. It does not parse all of YAML: front matter must follow a narrow one-`key: value`-per-line rule. We also fixed the evaluation loader leaving front matter in the prompt on Windows, and the `skill-maker` check that only passed the old format (still **no real `promptfoo` run**).
- Added the "zip one skill folder" step to the Claude app guidance in `skill-maker`.
- Also fixed what testing surfaced: skills are now told not to ask for personal data such as names when asking for a missing value, not to narrate how they read the input, and to explain English translations in Korean. Model answers vary, so we do not guarantee these instructions are always followed.
- Plugin version `0.2.0` → `0.3.0`. Mentions of `argument-hint` in older entries below are history.

</details>

<details>
<summary><strong>2026-11-26 — Corrected the PUBLIC status + fixed a skill-file format error (click to expand)</strong></summary>

- **One direct Codex call verified (2026-11-27)**: we called one already installed skill, `book-report-helper`, with `$name` plus a sentence and updated the Section 2 table and Section 6 notes to that scope only.
- **Codex location and ZIP guidance updated**: following the official documentation, the Codex install location is now `$HOME/.agents/skills` and values are given in a sentence. For the Claude app, zip **one skill folder**. At the time of writing, neither was verified by running it in the tool. Since then the Codex sentence form was tried once (see the 11-27 item above); recognition after a fresh install and the ZIP upload are still not verified.
- **Install commands fixed**: on a PC without the target folder, the old copy commands failed or copied to the wrong place without an error (reproduced with temporary folders). They now create the folder first (PowerShell and bash), say where to open the terminal, and warn about overwriting and deleting. Not run on Mac or Linux.
- Corrected the places that still said "PRIVATE" to match what GitHub actually reports (PUBLIC) — this README and `CONTRIBUTING.md`. The legal disclosure (section 15) now describes the open items as "unresolved while already public."
- Wrapped the `argument-hint` value of all 11 skills in double quotes so the frontmatter is valid YAML. Before the fix, `sns-caption` and others failed to parse as YAML, and `skill-maker`'s hint was read as a list instead of a string (measured with js-yaml). The `skill-maker` instructions and the doc examples now use the same form, and `scripts/verify-skills.mjs` gained a quoting check so the same error fails verification if it comes back.
- Added `skill-maker` to the plugin description and bumped the version `0.1.0` → `0.2.0` (with an unchanged version, an installed copy may not recognize the update).
- Corrected the top-of-page claim that it "works the same on every tool". Only Claude Code has a detailed verification record, so section 2 now has a per-tool status table (other tools are marked "not verified"). This describes the state at the time of writing; see the Section 2 table for the current status.
- Marked the ZIP installation steps (section 5 and Q3) as still being checked. We have never run the ZIP upload ourselves, and the official help article describes a ZIP with one skill folder at its top level.
- Tightened the local `promptfoo` checks. With the previous config, a sample refusal answer passed 7 of 11 tests; the new config rejects it in all 11 (only the check expressions were exercised, with no API calls — **no real evaluation has been run yet**). The guide now includes PowerShell steps and a hidden-input way to enter the key.

</details>

<details>
<summary><strong>2026-07-27 — Consolidated the GUIDE documents (click to expand)</strong></summary>

- Removed `GUIDE.md`/`GUIDE_EN.md` (+ `.html`) and folded the beginner-facing guidance into this README. Since the two documents always said the same thing, consolidating into one loses no information.

</details>

<details>
<summary><strong>2026-07-27 — Phase 3 contribution infrastructure + skill-maker (11th skill) (click to expand)</strong></summary>

- Added `CONTRIBUTING.md` (contribution process + safety requirements) and `scripts/verify-skills.mjs`
  (dependency-free automated check for frontmatter, variables, and SEC-A1~A4 safety patterns) so new
  skills can be added safely.
- Added `.github/PULL_REQUEST_TEMPLATE.md` — forces the local-verification and safety checklist to show
  up directly on the PR screen.
- **Added the `skill-maker` skill (11th)** — instead of pre-picking specific topics, this meta-skill lets
  a user design and generate a brand-new skill through conversation on demand. Trigger it by saying
  something like "I want to make a new skill."
- Deliberately did **not** add `.github/workflows/` — keeping $0 server/CI cost is a core principle of
  this repository (NFR-비용1 / NFR-키1).

</details>

<details>
<summary><strong>2026-07-18 — Added commands/ folder for the `sodam-prompt:` slash prefix + fixed a verification-loader bug (click to expand)</strong></summary>

- Confirmed a known Claude Code limitation ([anthropics/claude-code#41842](https://github.com/anthropics/claude-code/issues/41842)): `skills/` alone does not reliably register as a `sodam-prompt:`-prefixed slash command. Added a `commands/` folder (one file per skill, same body content as `skills/`) to fix this.
- Verified in two separate fresh sessions (once right after `/plugin install`, once again after merging to `main` and reinstalling) that all 10 skills correctly appear with the `/sodam-prompt:` prefix, confirmed via screen captures.
- Found and fixed a bug in `promptfoo-skill-prompt.js` (a local developer verification tool) where a correctly-rendered prompt could be falsely flagged as broken if the user's input happened to contain the literal characters "$1" or "$2." Fixed and re-verified with 17 regression tests (10 normal cases, 2 error cases, 2 invalid-input cases, 3 boundary cases) — all passing. This tool is developer-only and does not affect how end users actually use the skills.
- Re-checked this README and the GUIDE documents against the actual file structure (including the new `commands/` folder) and updated them for completeness.

</details>

<details>
<summary><strong>2026-07-14~15 — Live execution testing reached 10/10 + human verification passed + Phase 1.5 local verification setup (click to expand)</strong></summary>

- Ran the remaining 6 skills (polite-message, explain-simply, study-planner, self-intro-polish, natural-english, presentation-script) through real AI model execution — **all 10 skills now confirmed to match spec** (10/10 live execution tests complete)
- Ran adversarial tests for personal-info leakage, system-prompt extraction, and exaggerated-ad-copy injection on 3 skills (book-report-helper, natural-english, presentation-script) — all successfully blocked
- The human verification item (natural-language auto-matching) left as "still outstanding" in the 2026-07-13 entry below has now been **confirmed directly by the user through personal, hands-on use** — this repository continues to be used as a PRIVATE (personal-use only) tool; that describes distribution scope, not a lower quality bar
- Added `promptfooconfig.yaml`, `promptfoo-skill-prompt.js`, and `PROMPTFOO_로컬_가이드.md` to set up **local-only automated verification (no CI, uses only the user's own API key)** — GitHub Actions automation was deliberately not built, to preserve this repository's "$0 operating cost, no AI key management" principle
- Re-checked documentation (including `CHECKPOINT.md` and this README) for consistency with the actual current code state, and corrected drift where found

</details>

<details>
<summary><strong>2026-07-13 — Official plugin registration + English skill slugs + documentation reconciliation (click to expand)</strong></summary>

- Added `.claude-plugin/plugin.json` and `marketplace.json` to formally register this as a Claude Code plugin (previously, natural-language auto-matching failed 10/10 in live testing — root cause traced to missing formal registration)
- Renamed all 10 skill folders from Korean names to English slugs (e.g., `독후감-도우미` → `book-report-helper`) to address a skill-name encoding corruption issue (`sns---`) observed during live testing
- Corrected 5 PRD design documents, `CHECKPOINT.md`, and this guide to match the actual current code state (leftover Korean folder paths, stale completion status, etc.)
- Ran 4 skills (book-report-helper, long-text-summary, request-apology-message, sns-caption) through real AI model execution to confirm spec compliance; passed adversarial tests for personal-info leakage, system-prompt extraction, and exaggerated-ad-copy injection (the remaining 6 skills passed only static checks — live execution testing is not yet done)
- Performed a security review against OWASP ASVS — zero exposed secrets (checked working tree and full commit history), zero vulnerabilities found
- **Still outstanding**: whether skills actually auto-trigger from natural language inside Claude Code / the Claude.ai app has not yet been confirmed by a human opening a fresh session as of this entry — this is the one item AI cannot verify on its own by design.

</details>

<details>
<summary><strong>2026-07-11 — Finished the transition cleanup (click to expand)</strong></summary>

- Fully cleaned up the Next.js+Supabase web app direction (untracked from git, disk files preserved)
- Unified the repository name to `SoDam-Prompt-Eng` across all documents
- Ran static QA on all 10 skills — found and fixed 3 spec deviations (single-input variable syntax, missing PII notices, unbounded study-plan output)
- Added a "trust only the official source" install safety warning + a "No-code (★Safe)" badge to the README
- Created `P4_검수_가이드.md` (a 50-item human-verification checklist)
- Created `GUIDE.md`/`GUIDE_EN.md` (absolute-beginner guide, MD+HTML, Korean/English)
- Confirmed lint, typecheck, and production build all pass (exit code 0), and zero secrets are exposed

</details>

<details>
<summary><strong>2026-06-29 — First public release of the 10 skills</strong></summary>

- First release of 10 skills: Book Report Helper, Polite Message, 3-Line Summary, Explain Simply, Study Planner, Polish Self-Intro, SNS Caption, Natural English, Presentation Script, Request/Apology Message
- Distributed under the Apache-2.0 license; added LICENSE and NOTICE files

</details>

> Future updates will continue to be added to this section.

---

*SoDam Prompt — Step 1 of the SoDam 6-Engine ladder. The easiest first entry point for AI writing.*
*Prompt → Context → Loop → Harness → Agentic (+ Reverse)*
